import React from 'react';

import CarsAndOrdersBox from './orders/CarsAndOrders/CarsAndOrdersBox';
import Evaluations from './orders/Evaluations/Evaluations';

const carOwnerOrders = () => (
  <div className="row">
    <div className="col-md-9">
      <h3>My Orders</h3>
      <CarsAndOrdersBox />
      <Evaluations />
    </div>
  </div>
);

export default carOwnerOrders;

