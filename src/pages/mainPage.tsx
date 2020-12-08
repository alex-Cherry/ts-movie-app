import React from 'react';
// Custom Components
import MoviesList from '../components/moviesList';
import MoviesPagination from '../components/moviesPagination';


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const MainPage = () => {
  return (
    <div>
      <MoviesList />
      <MoviesPagination />
    </div>
  );
}

export default MainPage;
