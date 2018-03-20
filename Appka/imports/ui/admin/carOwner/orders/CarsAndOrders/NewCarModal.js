import React from 'react';
import { jQuery } from 'meteor/jquery';
import { connect } from 'react-redux';

import { setNewCarPopup } from './../../../../../actions/ui';
import NewCarForm from './NewCarForm';


class NewCarModal extends React.Component {
  componentDidMount() {
    jQuery('#newCarModal').modal('toggle');
    jQuery('#newCarModal').on('hidden.bs.modal', this.handleClose);
  }

  handleClose = () => {
    setTimeout(() => { this.props.dispatch(setNewCarPopup(false)); }, 200);
  };

  render() {
    return (
      <div className="modal fade" id="newCarModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">Add new car</h4>
            </div>

            <NewCarForm />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(NewCarModal);
