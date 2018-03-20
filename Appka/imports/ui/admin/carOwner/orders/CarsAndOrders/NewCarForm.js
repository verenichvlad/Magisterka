import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCarForCurrentUser } from './../../../../../actions/meteorSpecific';
import EmptyContainer from './../../../../EmptyContainer';
import CbGenerator from '../../../../../util/MeteorActionCallback';

import { Companies, Models, Years, Bodies, Colors } from '../../../../../api/other/CarsDS';

class NewCarForm extends Component {
  state = {
    company: '',
    companyDS: Companies,
    year: '',
    yearDS: Years,
    model: '',
    modelDS: Models,
    bodyType: '',
    bodyTypeDS: Bodies,
    color: '',
    colorDS: Colors,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      company, year, model, bodyType, color,
    } = this.state;
    const car = {
      company, year, model, bodyType, color,
    };

    this.props.dispatch(addCarForCurrentUser(car, CbGenerator({
      header: 'Adding car',
      message: 'Car was successfully added',
      errorMessage: 'There was a problem adding new car',
    })));
  };

  render() {
    return (
      <EmptyContainer>
        <div className="modal-body">
          <form noValidate>
            <div className="row">

              <div className="col-md-4">
                <div className="form-group">
                  <label>Car brand:</label>
                  <select
                    name="company"
                    className="form-control"
                    value={this.state.company}
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Choose option</option>
                    {this.state.companyDS.map(option =>
                      <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Body type:</label>
                  <select
                    name="bodyType"
                    className="form-control"
                    value={this.state.bodyType}
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Choose option</option>
                    {this.state.bodyTypeDS.map(option =>
                      <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Year:</label>
                  <select
                    name="year"
                    className="form-control"
                    value={this.state.year}
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Choose option</option>
                    {this.state.yearDS.map(option =>
                      <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Color:</label>
                  <select
                    name="color"
                    className="form-control"
                    value={this.state.color}
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Choose option</option>
                    {this.state.colorDS.map(option =>
                      <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Model:</label>
                  <select
                    name="model"
                    className="form-control"
                    value={this.state.model}
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Choose option</option>
                    {this.state.modelDS.map(option =>
                      <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>


        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success" onClick={this.handleSubmit} data-dismiss="modal">Save</button>
        </div>
      </EmptyContainer>
    );
  }
}

export default connect()(NewCarForm);
