import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';
// Bootstrap
import {
  Button as BButton
} from 'react-bootstrap';
// Store
import {
  Movie,
  // Actions
  setPosterBg
} from '../../../store';
// CSS
import './movieItem.scss';


// MAP DISPATCH
const mapDispatch = (dispatch: any) => {
  return {
    setPosterBg: (path: string) => dispatch(setPosterBg(path))
  }
};
const connector = connect(null, mapDispatch);

// PROPS TYPE
type MovieItemProps = {
  movie: Movie,
  mode?: 'search' | 'view',

  // => Events
  onClickInfo: () => void,
  onClickDelete: () => void
} & ConnectedProps<typeof connector>;


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const MovieItem = (props: MovieItemProps) => {
  
  // ===< PROPS >===
  // 
  const {
    movie,
    mode = 'view',
    setPosterBg
  } = props;


  const style: CSSProperties = {
    backgroundImage: `url(${movie.poster})`
  };


  // ===< EVENT HANDLERS >===
  // 
  const onMouseEnterHandler = () => {
    setPosterBg(movie.poster);
  }
  const onClickInfoHandler = () => {
    props.onClickInfo();
  }
  const onClickDeleteHandler = () => {
    props.onClickDelete();
  }


  // ===< RENDER >===
  // 
  return (
    <div
      className="movie-item mb-3"
      onMouseEnter={ onMouseEnterHandler }
    >
      {/* Poster */}
      <div className="movie-item__poster" style={ style }></div>
      {/* Content */}
      <div className="movie-item__inner d-flex flex-column justify-content-between">
        <div className="movie-item__info">
          <h3 className="movie-item__title">{ movie.title }</h3>
          <span className="movie-item__year">{ movie.year }</span>
        </div>
        {/* Controls */}
        {
          mode === 'view' && (
            <div className="movie-item__controls row no-gutters">
              <div className="col pr-2">
                <BButton
                  size="sm"
                  block
                  variant="outline-light"
                  onClick={ onClickInfoHandler }
                >
                  Info
                </BButton>
              </div>
              <div className="col pl-2">
                <BButton
                  size="sm"
                  block
                  variant="outline-light"
                  onClick={ onClickDeleteHandler }
                >
                  Remove
                </BButton>
              </div>
            </div>
          )
        }
        
      </div>
    </div>
  );
}

export default connector(MovieItem);
