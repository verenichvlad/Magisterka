import React from 'react';
import { Link } from 'react-router-dom';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Index = () => (
  <div>
    <p>
      <Link to="/authPage/cowner" className="btn btn-primary">Właściciel samochodu</Link>
    </p>
    <Link to="/authPage/tstation" className="btn btn-primary">Stacja naprawy</Link>
  </div>
);

export default Index;
