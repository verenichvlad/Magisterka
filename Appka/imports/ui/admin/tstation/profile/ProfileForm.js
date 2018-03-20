import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

import CKEditor from './CkEditor';
import EmptyContainer from '../../../EmptyContainer';
import CbGenerator from '../../../../util/MeteorActionCallback';
import { updateStationProfile } from '../../../../actions/meteorSpecific';

class ProfileForm extends Component {
  state = {
    name: '',
    stationPhone: '',
    about: '',
    address: '',
    workTime: '',
    geoPosition: { lat: 50.45466, lng: 30.5238 },
    mapZoom: 11,
    init: false,
  };

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
      language: 'ru',
      componentRestrictions: { country: 'ua' },
    });

    this.googleACEvent = this.autocomplete.addListener('place_changed', this.handlePlaceChange);
  }

  componentWillUnmount() {
    this.googleACEvent.remove();
  }

  handlePlaceChange = () => {
    const place = this.autocomplete.getPlace();

    const geoPosition = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    this.setState({
      geoPosition, mapZoom: 16, address: place.formatted_address,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCkEditorChange = (html) => {
    this.setState({
      about: html,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      name, stationPhone, about, address, workTime, geoPosition,
    } = this.state;
    const userData = {
      name, stationPhone, about, address, workTime, geoPosition,
    };

    this.props.dispatch(updateStationProfile(userData, CbGenerator({
      header: 'Управление профилем',
      message: 'Профиль был успешно записан',
      errorMessage: 'Профиль НЕ был записан',
    })));
  };

  handleInit = () => {
    if (this.props.profile && !this.state.init) {
      const {
        name, stationPhone, about, address, workTime, geoPosition,
      } = this.props.profile;

      this.setState({
        name, stationPhone, about, address, workTime, geoPosition, init: true,
      });
    }
  };

  render() {
    this.handleInit();

    return (
      <EmptyContainer>
        <div className="box-body">

          <div className="row">
            <div className="col-md-6">
              <div className="row">

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-phone" />
                      </span>
                      <input
                        name="stationPhone"
                        type="text"
                        className="form-control"
                        value={this.state.stationPhone}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Working hours</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-clock-o" />
                      </span>
                      <input
                        name="workTime"
                        type="text"
                        className="form-control"
                        value={this.state.workTime}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Location</label>
                    <input
                      name="address"
                      id="autocomplete"
                      type="text"
                      placeholder="Введите адрес"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group ">
                    <label>Description</label>
                    <CKEditor value={this.state.about} onChange={this.handleCkEditorChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="map">
                <GoogleMapReact
                  defaultCenter={this.state.geoPosition}
                  defaultZoom={this.state.mapZoom}
                  center={this.state.geoPosition}
                  zoom={this.state.mapZoom}
                  bootstrapURLKeys={{
                    key: 'AIzaSyDCsvfAfJhoPWpfyU81xAP36jn0HqPolTU',
                    language: 'ru',
                    region: 'ua',
                  }}
                >
                  <div
                    className="map-marker"
                    lat={this.state.geoPosition.lat}
                    lng={this.state.geoPosition.lng}
                   />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Save</button>
        </div>
      </EmptyContainer>
    );
  }
}

export default connect()(ProfileForm);
