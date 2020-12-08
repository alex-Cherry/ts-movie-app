import React from 'react';
// Bootstrap
import { Spinner as BSpinner } from 'react-bootstrap';
// CSS
import './loader.scss';


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const Loader = () => {

  return (
    <div className="movie-loader">
      <BSpinner animation="grow" variant="light" role="status">
        <span className="sr-only">Loading...</span>
      </BSpinner>
    </div>
  );
};

export default Loader;
