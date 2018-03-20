import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import EmptyContainer from '../../../../EmptyContainer';
import OrderTile from '../CarsAndOrders/OrderTile';
import Cars from '../../../../../api/cars/cars';
import Orders from '../../../../../api/orders/orders';
import NewCarModal from './NewCarModal';
import OrderModal from './OrderModal';
import { setNewOrderPopup, setNewCarPopup } from '../../../../../actions/ui';

const carsAndOrdersBox = (props) => {
  props.cars.forEach((car) => {
    const currentCarOrders = [];
    props.orders.forEach((order) => {
      if (order.carId === car._id) {
        currentCarOrders.push(order);
      }
    });
    car.orders = currentCarOrders;
  });

  return (
    <EmptyContainer>
      <div id="orders" className="anchor" />
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Cars and orders</h3>
        </div>
        <ul className="timeline margin">
          {props.cars.map(car => (
            <EmptyContainer key={car._id}>
              <li className="time-label">
                <span className="bg-red">
                  {car.company} / {car.year} / {car.model}
                </span>
              </li>

              {car.orders.map(order => (<OrderTile order={order} key={order._id} />))}

              <li>
                <div className="timeline-item clearfix">
                  <button
                    className="btn btn-sm btn-success inline-b margin"
                    onClick={() => { props.dispatch(setNewOrderPopup(true, car._id)); }}
                  >
                  Add a new order
                  </button>

                  <p className="padding inline-b text-blue">
                  The application will be created in the context of the current car
                  </p>
                </div>
              </li>
            </EmptyContainer>
            ))}
        </ul>

        <button
          className="btn btn-sm btn-success margin"
          onClick={() => { props.dispatch(setNewCarPopup(true)); }}
        >
          Add new Car
        </button>

        {props.showNewCarPopup && <NewCarModal />}
        {props.newOrderPopup.active && <OrderModal carId={props.newOrderPopup.carId} /> }
        {props.editOrderPopup.active &&
          <OrderModal
            carId={props.editOrderPopup.carId}
            orderId={props.editOrderPopup.orderId}
          />}

      </div>
    </EmptyContainer>
  );
};


const trackedComponent = withTracker(() => {
  const carsSub = Meteor.subscribe('getCarsForCurrentUser');
  const ordersSub = Meteor.subscribe('getOrdersForCurrentUser');

  return {
    carsSubReady: carsSub.ready(),
    ordersSubReady: ordersSub.ready(),

    cars: Cars.find().fetch() || [],
    orders: Orders.find().fetch() || [],
  };
})(carsAndOrdersBox);

function mapStateToProps(state) {
  return {
    newOrderPopup: state.ui.newOrderPopup,
    editOrderPopup: state.ui.editOrderPopup,
    showNewCarPopup: state.ui.showNewCarPopup,
  };
}

export default connect(mapStateToProps)(trackedComponent);
