import React, { Component } from 'react';
import Select from 'react-select';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { GithubPicker } from 'react-color';
import { Collapse } from 'react-collapse';

import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

import { startFromYear } from '../../../../actions/stoOrders';
import { Years, Bodies, Colors, Parts } from '../../../../api/other/CarsDS';

export default class Filters extends Component {
  state = {
    filtersCollapsed: false,
    selectedParts: '',
    selectedBodies: '',
    selectedColor: '',
    selectedModelQuery: '',
    moderatedOnly: false,
    selectedYear: 0,
    maxAnswers: 5,
    selectedDeadline: moment(),
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      case 'selectedYear': this.props.dispatch(startFromYear(e.target.value)); break;
      default: break;
    }
  };

  handleCBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };

  handleAnswersSlideChange = (e) => {
    this.setState({
      maxAnswers: e.target.value,
    });
  };

  handlePartsSelectChange = (value) => {
    this.setState({ selectedParts: value });
  }

  handleBodiesSelectChange = (value) => {
    this.setState({ selectedBodies: value });
  }

  handleDateChange = (m) => {
    this.setState({ selectedDeadline: m });
  };

  arrayToSelectOptions = (arr) => {
    let result = [];
    arr.forEach((value) => {
      result.push({ label: value, value });
    });

    return result;
  };


  handleColorChange = (color, event) => {
    this.setState({ selectedColor: color.hex });
  };

  render() {
    return (
      <div>
        <h4 className="modal-title margin-top vertical-align flex-between">
          <span>Total applications for evaluation:&nbsp;
            <span className="label bg-black">{this.props.ordersCount}</span>
          </span>

          <a
            className="btn btn-app"
            onClick={() => { this.setState({ filtersCollapsed: !this.state.filtersCollapsed }); }}
            role="button"
          >
            <i className="fa fa-edit" /> Show filter
          </a>
        </h4>
        <Collapse isOpened={this.state.filtersCollapsed}>
          <hr />

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Car brands:</label>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-search" /></span>
                  <input
                    name="selectedModelQuery"
                    className="form-control"
                    placeholder="Enter the car brand"
                    value={this.state.selectedModelQuery}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Part (s) of the body with defects in repair:</label>
                <Select
                  multi
                  onChange={this.handlePartsSelectChange}
                  options={this.arrayToSelectOptions(Parts)}
                  placeholder="Enter the name of the car body part"
                  removeSelected
                  simpleValue
                  value={this.state.selectedParts}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Body types:</label>
                <Select
                  multi
                  onChange={this.handleBodiesSelectChange}
                  options={this.arrayToSelectOptions(Bodies)}
                  placeholder="Enter body types"
                  removeSelected
                  simpleValue
                  value={this.state.selectedBodies}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Year of manufacture (From):</label>
                <select
                  name="selectedYear"
                  className="form-control"
                  value={this.state.selectedYear}
                  onChange={this.handleChange}
                >
                  <option disabled value="">Year of manufacture (From)</option>
                  {Years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
            ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Body color:</label>
                <GithubPicker
                  colors={Colors}
                  onChangeComplete={this.handleColorChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group hide-calendar-options">
                <label>Desired dates to: {this.state.selectedDeadline.format('D MMMM YYYY')}</label>
                <DatePicker
                  selected={this.state.selectedDeadline}
                  onChange={this.handleDateChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {this.state.maxAnswers > 0 ?
                  <label>No more than {this.state.maxAnswers} answers:</label> :
                  <label>Only those without evaluation:</label>}
                <div>
                  <ReactBootstrapSlider
                    value={this.state.maxAnswers}
                    slideStop={this.handleAnswersSlideChange}
                    step={1}
                    max={10}
                    min={0}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Only verified:</label>
                <div className="checkbox">
                  <label>
                    <input
                      name="moderatedOnly"
                      type="checkbox"
                      onChange={this.handleCBoxChange}
                      defaultChecked={this.state.moderatedOnly}
                    /> Verified Only
                  </label>
                </div>
              </div>
            </div>
          </div>

        </Collapse>
        <hr />
      </div>
    );
  }
}
