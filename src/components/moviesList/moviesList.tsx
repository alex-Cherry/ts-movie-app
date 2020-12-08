import React, { useState, useEffect, useRef } from 'react';
// Router
import { withRouter, RouteComponentProps } from 'react-router-dom';
// Bootstrap
import {
  Row as BRow,
  Col as BCol
} from 'react-bootstrap';
// Redux
import { connect, ConnectedProps } from 'react-redux';
// Store
import {
  AppState,
  ToastType,
  // Actions
  deleteMovie,
  setCurrentPage,
  searchMovies,
  pushToast
} from '../../store';
// Custom Components
import MovieItem from './movieItem';
import Loader from '../loader';
import ModalConfirm from '../modalConfirm';
import ModalInfo from './modalInfo';
// Utils
import { getParamFromQueryParams } from '../../utils/getQueryParams';
// CSS
import './movieList.scss';


// MAP STATE
const mapState = (state: AppState) => {
  return {
    movies: state.movies.movies,
    moviesLoading: state.movies.moviesLoading
  }
};

// MAP DISPATCH
const mapDsipatch = (dispatch: any) => {
  return {
    setCurrentPage: (page: number): Promise<void> => dispatch(setCurrentPage(page)),
    searchMovies: (text: string): Promise<void> => dispatch(searchMovies(text)),
    deleteMovie: (movieId: string): Promise<void> => dispatch(deleteMovie(movieId)),
    pushToast: (text: string, header: string = 'Notification', type: ToastType = 'info') => dispatch(pushToast(text, header, type))
  }
};

// CONNECTOR
const connector = connect(mapState, mapDsipatch);

// PROPS
type MoviesListProps = ConnectedProps<typeof connector>
  & RouteComponentProps
  & {
    mode?: 'search' | 'view'
  };


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const MoviesList = (props: MoviesListProps) => {

  // Refs
  const selectedId = useRef('');
  // State
  // const [ loading, setLoading ] = useState(true);
  const [ showModalInfo, setShowModalInfo ] = useState(false);
  const [ showModalConfirmDelete, setShowModalConfirmDelete ] = useState(false);
  // Props
  const {
    mode = 'view',
    movies,
    moviesLoading,
    // Actions
    setCurrentPage,
    deleteMovie,
    pushToast,
    searchMovies,
    // Router
    location
  } = props;
  

  // ===< HOOKS >===
  // 
  useEffect(() => {    
    
    if (mode === 'search') {
      // Get the query text from the query string
      const queryText = getParamFromQueryParams(location.search, 'q') || '';
      // Get movies for the specified query text
      searchMovies(queryText)
        .catch((err: Error) => {
          pushToast(err.message, 'Ошибка', 'danger');
        });

    } else {

      // Get the "page" param from the query string
      const pageFromQuery = +getParamFromQueryParams(location.search, 'page') || 1;
      // Get movies for the specified page
      setCurrentPage(pageFromQuery)
        .catch(err => {
          pushToast(err.message, 'Ошибка', 'danger');
        });

    }

  }, [ location.search, mode, setCurrentPage, pushToast, searchMovies ]);


  // ===< UTILS >===
  // 
  const setSelectedId = (id: string) => {
    selectedId.current = id;
  }
  const clearSelectedId = (): void => {
    setSelectedId('');
  }


  // ===< EVENT HANDLERS >===
  // 
  /**
   * Modal Confirm Delete => "onConfirm"
   */
  const onConfirmModalConfirmDeleteHandler = () => {
    setShowModalConfirmDelete(false);

    if (!selectedId.current) {
      return null;
    }

    const movieId = selectedId.current;
    const titleMovieToDelete = movies[movieId].title;
    clearSelectedId();

    // Here delete the movie
    deleteMovie(movieId)
      .then(() => {
        pushToast(`Фильм "${titleMovieToDelete}" удален из коллекции`, 'Оповещение', 'success');
      })
      .catch(err => {
        pushToast(err.message, 'Ошибка', 'danger');
      });  
  }
  /**
   * Modal Confirm Delete => "onClose"
   */
  const onCloseModalConfirmDeleteHandler = () => {
    setShowModalConfirmDelete(false);
    clearSelectedId();
  }
  /**
   * Modal Info => "onClose"
   */
  const onCloseModalInfoHandler = () => {
    clearSelectedId();
    setShowModalInfo(false);
  }
  /**
   * Button "Info" => "onClick"
   */
  const onClickInfoHandler = (movieId: string) => {
    setSelectedId(movieId);
    setShowModalInfo(true);
  }
  /**
   * Button "Delete" => "onClick"
   */
  const onClickDeleteHandler = (movieId: string) => {
    setSelectedId(movieId);
    setShowModalConfirmDelete(true);
  }
  
  

  // ===< RENDER FUNCTIONS >===
  // 
  /**
   * Renders cards with movies
   */
  const renderItems = () => {
    // If there are no movies,
    //  renders the empty block
    if (Object.keys(movies).length === 0) {
      return renderEmpty();
    }

    // Render movie items
    return (
      <BRow>
        {
          Object.keys(movies).map(id => (
            <BCol lg={ 3 } key={ id }>
              <MovieItem
                movie={ movies[id] }
                mode={ mode }
                onClickInfo={ () => onClickInfoHandler(id) }
                onClickDelete={ () => onClickDeleteHandler(id) }
              />
            </BCol>
          ))
        }
      </BRow>
    );
  }
  /**
   * Renders the empty block
   */
  const renderEmpty = () => {
    return (
      <div>Empty list</div>
    );
  }
  /**
   * Renders the modal window with movie info
   */
  const renderModalInfo = () => {
    if (!selectedId.current) {
      return null;
    }
    // Get the movie by its id
    const movie = movies[selectedId.current];

    return (
      <ModalInfo
        show={ showModalInfo }
        movie={ movie }
        onClose={ onCloseModalInfoHandler }
      />
    );
  }
  /**
   * Renders the modal window to confirm to delete a movie
   */
  const renderModalConfirmDelete = () => {
    let title = '';
    // Get the movie by its id
    const movie = movies[selectedId.current];
    if (movie) {
      title = movie.title;
    }

    const confirmHeader = 'Подтверждение удаления';
    const confirmText = `Вы действительно хотите удалить "${title}"?`;

    return (
      <ModalConfirm
        show={ showModalConfirmDelete }
        header={ confirmHeader }
        text={ confirmText }

        onClose={ onCloseModalConfirmDeleteHandler }
        onConfirm={ onConfirmModalConfirmDeleteHandler }
      />
    );
  }



  // If loading is active, display the loader
  if (moviesLoading) {
    return (<Loader />);
  }

  // ===< RENDER >===
  // 
  return (
    <>
      {/* Header */}
      <h3 className="movie-list__title">IMDB Top 250</h3>
      {/* Movie Cards */}
      { renderItems() }
      {/* Modal Info */}
      { renderModalInfo() }
      {/* Modal Confirm to Delete */}
      { renderModalConfirmDelete() }
    </>
  );
};

export default withRouter(connector(MoviesList));
