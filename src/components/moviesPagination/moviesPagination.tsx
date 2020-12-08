import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
// Store
import { AppState, setPosterBg } from '../../store';
// Custom components
import Pagination from '../pagination';


// MAP STATE
const mapState = (state: AppState) => {
  return {
    currentPage: state.movies.currentPage,
    moviesPerPage: state.movies.moviesPerPage,
    numberMovies: state.movies.IDS.length,
    moviesLoading: state.movies.moviesLoading
  }
};

// MAP DISPATCH
const mapDispatch = (dispatch: any) => {
  return {
    setPosterBg: (path: string) => dispatch(setPosterBg(path))
  }
};

// CONNECTOR
const connector = connect(mapState, mapDispatch);

// PROPS TYPE
type MoviesPaginationProps = ConnectedProps<typeof connector>
  & RouteComponentProps;


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const MoviesPagination = (props: MoviesPaginationProps) => {

  // ===< PROPS >===
  // 
  const {
    currentPage,
    moviesPerPage,
    numberMovies,
    moviesLoading,
    // Actions
    setPosterBg,
    // Router
    history
  } = props;


  // ===< HOOKS >===
  // 
  // useEffect(() => {
  //   console.log('MoviesPagination - creation');
  // }, []);


  // ===< EVENT HANDLERS >===
  // 
  const onPageChangedHandler = (page: number) => {
    setPosterBg('');
    history.push(`/?page=${page}`);
  }


  // ===< RENDER FUCNTIONS >===
  // 
  const renderPagination = () => {
    if (moviesLoading) {
      return null;
    }

    return (
      <Pagination
        currentPage={ currentPage }
        perPage={ moviesPerPage }
        totalItems={ numberMovies }

        onPageChanged={ onPageChangedHandler }
      />
    );
  }


  // ===< RENDER >===
  // 
  return renderPagination();
};

export default withRouter(connector(MoviesPagination));
