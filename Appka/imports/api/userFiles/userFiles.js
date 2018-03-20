import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { FilesCollection } from 'meteor/ostrio:files';
import stream from 'stream';
import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import SimpleSchema from 'simpl-schema';


const UserFiles = new FilesCollection({
  debug: false,
  storagePath: 'assets/app/uploads/uploadedFiles',
  collectionName: 'userFiles',
  allowClientCode: false,
  chunkSize: 1024 * 1024,
});

if (Meteor.isServer) {
  // If runs on heroku, load its S3 env var, else run app with --settings
  if (process.env.S3) {
    Meteor.settings.s3 = JSON.parse(process.env.S3).s3;
  }

  const s3Conf = Meteor.settings.s3;

  if (!s3Conf || !s3Conf.key) {
    throw new Meteor.Error('Cant find S3 configuration');
  }

  const bound = Meteor.bindEnvironment(callback => callback());

  const s3 = new S3({
    secretAccessKey: s3Conf.secret,
    accessKeyId: s3Conf.key,
    region: s3Conf.region,
    httpOptions: {
      timeout: 6000,
      agent: false,
    },
  });

  UserFiles.on('afterUpload', function (fileRef) {
    _.each(fileRef.versions, (vRef, version) => {
      const filePath = `files/${Random.id()}-${version}.${fileRef.extension}`;

      const s3UploadCb = (error) => {
        bound(() => {
          if (error) {
            throw new Meteor.Error(error);
          }

          const upd = { $set: {} };
          upd.$set[`versions.${version}.meta.pipePath`] = filePath;

          const collectionUpdateCb = (updError) => {
            if (updError) {
              throw new Meteor.Error(updError);
            }
            this.unlink(this.collection.findOne(fileRef._id), version);
          };

          this.collection.update({
            _id: fileRef._id,
          }, upd, collectionUpdateCb);
        });
      };

      s3.putObject({
        StorageClass: 'STANDARD',
        Bucket: s3Conf.bucket,
        Key: filePath,
        Body: fs.createReadStream(vRef.path),
        ContentType: vRef.type,
      }, s3UploadCb);
    });
  });

  UserFiles.interceptDownload = (http, fileRef, version) => {
    const pipePathExists =
      fileRef
      && fileRef.versions
      && fileRef.versions[version]
      && fileRef.versions[version].meta
      && fileRef.versions[version].meta.pipePath;

    if (pipePathExists) {
      const path = fileRef.versions[version].meta.pipePath;
      const opts = {
        Bucket: s3Conf.bucket,
        Key: path,
      };

      if (http.request.headers.range) {
        const vRef = fileRef.versions[version];
        let range = _.clone(http.request.headers.range);
        const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
        const start = parseInt(array[1]);
        let end = parseInt(array[2]);
        if (isNaN(end)) {
          end = (start + this.chunkSize) - 1;
          if (end >= vRef.size) {
            end = vRef.size - 1;
          }
        }
        opts.Range = `bytes=${start}-${end}`;
        http.request.headers.range = `bytes=${start}-${end}`;
      }

      s3.getObject(opts, function (error) {
        if (error) {
          if (!http.response.finished) {
            http.response.end();
          }
          throw new Meteor.Error(error);
        }

        if (http.request.headers.range && this.httpResponse.headers['content-range']) {
          http.request.headers.range = this.httpResponse.headers['content-range']
            .split('/')[0].replace('bytes ', 'bytes=');
        }

        const dataStream = new stream.PassThrough();
        UserFiles.serve(http, fileRef, fileRef.versions[version], version, dataStream);
        dataStream.end(this.data.Body);
      });

      return true;
    }
    return false;
  };


  const _origRemove = UserFiles.remove;

  UserFiles.remove = (search) => {
    const cursor = UserFiles.collection.find(search);

    cursor.forEach((fileRef) => {
      _.each(fileRef.versions, (vRef) => {
        if (!vRef || !vRef.meta || !vRef.meta.pipePath) { return; }

        const deleteObjectCb = (error) => {
          bound(() => {
            if (error) {
              throw new Meteor.Error(error);
            }
          });
        };

        s3.deleteObject({
          Bucket: s3Conf.bucket,
          Key: vRef.meta.pipePath,
        }, deleteObjectCb);
      });
    });

    _origRemove.call(UserFiles, search);
  };

  UserFiles.denyClient();

  // PUBLICATIONS
  Meteor.publish('getUserFilesForOrder', orderId => UserFiles.find({ 'meta.orderId': orderId }).cursor);
  Meteor.publish('getAllImages', () => UserFiles.find({ isImage: true }).cursor);
}

const modifiedSchema = FilesCollection.schema;
modifiedSchema.meta = new SimpleSchema({
  orderId: {
    type: String,
  },
});

UserFiles.collection.attachSchema(modifiedSchema);

export default UserFiles;
