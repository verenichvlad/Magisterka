import React, { Component } from 'react';

import EmptyContainer from '../../EmptyContainer';

export default class Clients extends Component {
  render() {
    return (
      <EmptyContainer>
        <h3>Clients</h3>
        <div id="rate" className="anchor" />
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Clients</h3>
          </div>
          <div className="box-body">
          Clients
          </div>
        </div>
      </EmptyContainer>
    );
  }
}
