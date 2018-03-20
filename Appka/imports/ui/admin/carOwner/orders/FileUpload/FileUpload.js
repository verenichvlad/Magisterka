import React from 'react';
import EmptyContainer from '../../../../EmptyContainer';
import ClickableDrop from './ClickableDrop';
import UploadsViewer from './UploadsViewer';

export default props => (
  <EmptyContainer>
    <ClickableDrop orderId={props.orderId} />
    <UploadsViewer orderId={props.orderId} />
  </EmptyContainer>
);

