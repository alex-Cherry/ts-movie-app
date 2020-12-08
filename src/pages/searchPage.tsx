import React from 'react';
// Custom Components
import MoviesList from '../components/moviesList';


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const SearchPage = () => {
  return (
    <div>
      <MoviesList
        mode="search"
      />
    </div>
  );
}

export default SearchPage;
