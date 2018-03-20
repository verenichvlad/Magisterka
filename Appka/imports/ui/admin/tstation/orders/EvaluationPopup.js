import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import { jQuery } from 'meteor/jquery';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Collapse } from 'react-collapse';
import { Carousel } from 'react-responsive-carousel';
import { Player, BigPlayButton } from 'video-react';

import 'react-select/dist/react-select.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'video-react/dist/video-react.css';

import { setEvaluationPopup } from '../../../../actions/ui';
import UserFiles from '../../../../api/userFiles/userFiles';
import EmptyContainer from '../../../EmptyContainer';
import { createValuation, createClaim, increaseStationRating } from '../../../../actions/meteorSpecific';
import CbGenerator from '../../../../util/MeteorActionCallback';

class EvaluationPopup extends React.Component {
  state = {
    isSaving: false,
    claimCollapseOpened: false,
    claimOptions: [
      { label: 'Do not see the defect in the photo / video', value: 'Do not see the defect in the photo / video' },
      { label: 'Impossible requirement', value: 'Impossible requirement' },
      { label: 'Not enough information', value: 'Not enough information' },
    ],
    claims: '',
    problematicMediaIds: [],
    claimComment: '',

    selectedParts: '',
    evaluatedParts: [],
    totalPrice: 0,
    totalTerm: 0,
    evaluationComment: '',
  };

  componentDidMount() {
    jQuery('#evaluationModal').modal('toggle');
    jQuery('#evaluationModal').on('hidden.bs.modal', this.handleClose);
  }

  setSavingStatus = (isSaving) => {
    this.setState({ isSaving });
  };

  handleClose = () => {
    setTimeout(() => {
      this.props.dispatch(setEvaluationPopup(false, null, null));
    }, 200);
  };

  closeModal = () => {
    jQuery('#evaluationModal').modal('toggle');
    this.handleClose();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClaimCollapse = () => {
    this.setState({
      claimCollapseOpened: !this.state.claimCollapseOpened,
    });
  };

  handleClaimsSelectChange = (value) => {
    this.setState({ claims: value });
  };

  handleCheckedClaimMedias = (e, fileId) => {
    if (e.target.checked) {
      this.setState({ problematicMediaIds: [...this.state.problematicMediaIds, fileId] });
    } else {
      let newArr = this.state.problematicMediaIds.slice();
      let index = newArr.indexOf(fileId);
      newArr.splice(index, 1);
      this.setState({ problematicMediaIds: newArr });
    }
  }

  handleSelectedPartsChange = (value) => {
    const partNames = value.split(',');
    const evaluatedPartsClone = JSON.parse(JSON.stringify(this.state.evaluatedParts));

    partNames.forEach((partName) => {
      if (partName) {
        let partAlreadyAdded = this.state.evaluatedParts
          .filter(part => part.name === partName).length > 0;

        if (!partAlreadyAdded) {
          const part = { name: partName, price: 0, term: 0 };
          evaluatedPartsClone.push(part);
        }
      }
    });

    const filteredParts = evaluatedPartsClone
      .filter(part => partNames.indexOf(part.name) > -1);

    this.setState({ selectedParts: value });
    this.setState({ evaluatedParts: filteredParts }, this.handleTotals);
  };

  handleEvaluationPartFieldsChange = (e, partName) => {
    const evaluatedPartsClone = JSON.parse(JSON.stringify(this.state.evaluatedParts));

    const index = evaluatedPartsClone.findIndex(part => part.name === partName);

    if (e.target.name === 'partPrice') {
      evaluatedPartsClone[index].price = +e.target.value;
    } else {
      evaluatedPartsClone[index].term = +e.target.value;
    }

    this.setState({ evaluatedParts: evaluatedPartsClone }, this.handleTotals);
  }

  handleInputKeyPress = (e) => {
    if (!(e.charCode >= 48 && e.charCode <= 57)) {
      e.preventDefault();
    }
  }

  handleTotals = () => {
    let totalPrice = 0;
    let totalTerm = 0;

    this.state.evaluatedParts.forEach((part) => {
      totalPrice += part.price;
      totalTerm += part.term;
    });

    this.setState({ totalPrice, totalTerm });
  };

  handleClaimSubmit = (e) => {
    e.preventDefault();

    const { claims, problematicMediaIds, claimComment } = this.state;
    const claim = {
      claims,
      problematicMediaIds,
      orderId: this.props.order._id,
      comment: claimComment,
      issuedByTechStation: true,
    };

    const cbData = {
      header: 'Complaint status',
      message: 'Registered',
      errorMessage: 'Cant register, check fields',
    };

    this.props.dispatch(createClaim(claim, CbGenerator(cbData, this.closeModal)));
    this.handleClaimCollapse();
  };

  handleEvaluationSubmit = (e) => {
    e.preventDefault();

    const {
      evaluatedParts, evaluationComment, totalPrice, totalTerm,
    } = this.state;
    const valuation = {
      evaluatedParts,
      totalPrice,
      totalTermDays: totalTerm,
      orderId: this.props.order._id,
      comment: evaluationComment,
    };

    const cbData = {
      header: 'Status of your evaluation',
      message: 'Your evaluation has been registered',
      errorMessage: 'Your evaluation has NOT been registered',
    };

    const ratingCb = {
      header: 'Rating account',
      message: 'Your rating has been successfully increased',
      errorMessage: 'Error registering rating',
    };

    this.props.dispatch(createValuation(valuation, CbGenerator(cbData)));
    this.props.dispatch(increaseStationRating(1.5, CbGenerator(ratingCb, this.closeModal)));
  };

  render() {
    const {
      company, model, year, color,
    } = this.props.car;
    const {
      deadline, creationDate, comment, parts,
    } = this.props.order;

    const partsSelectOptions = [];

    parts.split(',').forEach((part) => {
      partsSelectOptions.push({ label: part, value: part });
    });

    return (
      <div className="modal fade" id="evaluationModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                <i className="fa fa-car" /> {company} / {model} / {year} - Order evaluation
              </h4>
            </div>

            <div className="modal-body">
              <span className="label bg-green moderation-label margin-bottom">Order data</span>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <label>Desired dates:</label>
                    <span> {moment(deadline).format('D MMMM YYYY, hh:mm')}</span>
                  </p>
                  <p>
                    <label>Car color:</label>
                    <span> {color}</span>
                  </p>
                  <p>
                    <label>The application was received:</label>
                    <span> {moment(creationDate).fromNow()}</span>
                  </p>
                  <p>
                    <label>Priority:</label>
                    <span> TODO</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <label>Body parts: </label>
                    <span> {parts}</span>
                  </p>
                  <div className="form-group">
                    <label>Order comment:</label>
                    <p>
                      {comment}
                    </p>
                  </div>
                </div>
              </div>

              <hr />
              <span className="label bg-green moderation-label margin-bottom">View photo / video material</span>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <Carousel emulateTouch showThumbs={false} dynamicHeight>
                      {this.props.userFiles.map((file) => {
                      let fileCursor = UserFiles.findOne({ _id: file._id });
                      return (
                        <EmptyContainer key={file._id}>
                          {file.isImage &&
                          <div>
                            <img className="carousel__image" src={fileCursor.link()} />
                          </div>}
                          {file.isVideo &&
                          <div>
                            <Player playsInline src={`${fileCursor.link()}?download=true`}>
                              <BigPlayButton position="center" />
                            </Player>
                          </div>}
                        </EmptyContainer>
                      );
                    })}
                    </Carousel>
                  </div>
                </div>
              </div>
              <hr />
              <button className="btn btn-sm btn-danger presto-align-center" onClick={this.handleClaimCollapse}>
                Complaint
              </button>

              <Collapse isOpened={this.state.claimCollapseOpened}>
                <hr />
                <form noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Selecting the cause of the complaint:</label>
                        <Select
                          multi
                          onChange={this.handleClaimsSelectChange}
                          options={this.state.claimOptions}
                          placeholder="Enter the cause"
                          removeSelected
                          simpleValue
                          value={this.state.claims}
                        />
                      </div>
                      <div className="form-group">
                        <label>Distressed photos / videos, numbers:</label>
                        <p>
                          {this.props.userFiles.map((file, i) => (
                            <label key={file._id}>
                              <input
                                type="checkbox"
                                onChange={e => this.handleCheckedClaimMedias(e, file._id)}
                                checked={this.state.problematicMediaIds.indexOf(file._id) !== -1}
                              /> {i + 1} &nbsp;
                            </label>
                          ))}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Comment</label>
                        <textarea
                          name="claimComment"
                          className="form-control"
                          rows="3"
                          value={this.state.claimComment}
                          onChange={this.handleChange}
                        />
                      </div>
                      <button className="btn btn-sm btn-danger" onClick={this.handleClaimSubmit}>
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </Collapse>

              <hr />
              <span className="label bg-green moderation-label margin-bottom">Costs evaluation</span>
              <hr />
              <form noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Choose parts:</label>
                      <Select
                        multi
                        onChange={this.handleSelectedPartsChange}
                        options={partsSelectOptions}
                        placeholder="Enter the name of the car body part"
                        removeSelected
                        simpleValue
                        value={this.state.selectedParts}
                      />
                    </div>

                    {this.state.selectedParts.split(',').map((partName) => {
                      const partIndex = this.state.evaluatedParts
                        .findIndex(part => part.name === partName);

                      return (
                        <EmptyContainer key={partIndex}>
                          {partIndex > -1 &&
                          <div className="form-group">
                            <label>{partName} - work cost</label>
                            <input
                              name="partPrice"
                              type="text"
                              className="form-control"
                              value={this.state.evaluatedParts[partIndex].price}
                              onKeyPress={this.handleInputKeyPress}
                              onChange={e => this.handleEvaluationPartFieldsChange(e, partName)}
                            />
                            <span className="input-group-addon">usd</span>
                          </div>}

                          {partIndex > -1 &&
                          <div className="form-group">
                            <label>{partName} - terms</label>
                            <input
                              name="partTerm"
                              type="text"
                              className="form-control"
                              value={this.state.evaluatedParts[partIndex].term}
                              onKeyPress={this.handleInputKeyPress}
                              onChange={e => this.handleEvaluationPartFieldsChange(e, partName)}
                            />
                            <span className="input-group-addon">days</span>
                          </div>}
                        </EmptyContainer>
                    );
                  })}

                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Comment:</label>
                      <textarea
                        name="evaluationComment"
                        className="form-control"
                        rows="8"
                        value={this.state.evaluationComment}
                        onChange={this.handleChange}
                      />
                    </div>

                    <p>
                      <label>Total cost:</label>
                      <span> {this.state.totalPrice} usd</span>
                    </p>
                    <p>
                      <label>Total term (days)</label>
                      <span> {this.state.totalTerm}</span>
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={this.handleEvaluationSubmit}>Complete valuation</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const trackedComponent = withTracker(({ order }) => {
  const userFilesSub = Meteor.subscribe('getUserFilesForOrder', order._id);

  return {
    userFilesReady: userFilesSub.ready(),
    userFiles: UserFiles.find({ 'meta.orderId': order._id }).fetch(),
  };
})(EvaluationPopup);

export default connect()(trackedComponent);
