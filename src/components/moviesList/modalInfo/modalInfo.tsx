import React, { CSSProperties } from 'react';
// Bootstrap
import {
  Row as BRow,
  Col as BCol,
  Badge as BBadge,
  Modal as BModal
} from 'react-bootstrap';
// Store
import { Movie } from '../../../store';
// CSS
import './modalInfo.scss';


// PROPS
type ModalInfoProps = {
  movie: Movie,
  show: boolean,

  // => Events
  onClose: () => void
};


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const ModalInfo = (props: ModalInfoProps) => {

  // Props
  const { movie, show, onClose } = props;

  const style: CSSProperties = {
    backgroundImage: `url(${movie.poster})`
  };


  // ===< RENDER FUNCTIONS >===
  // 
  const renderContent = () => {
    return (
      <div className="movie-info">
        <header className="movie-info__header">
          <h6 className="movie-info__header-title">Movie view</h6>
          <span className="movie-info__header-times" onClick={ onClose }>&times;</span>
        </header>
        <div className="movie-info__content">
          <BRow>
            <BCol sm="4">
              <div className="movie-info__poster-wrap">
                <div className="movie-info__poster" style={ style }></div>
              </div>
            </BCol>
            <BCol sm="8">
              <h3 className="movie-info__title">
                { movie.title }
              </h3>
              <p className="movie-info__description">
                { movie.plot }
              </p>
              <div className="mt-3 mb-4">
                <BBadge variant="success" className="mr-2">
                  { movie.year }
                </BBadge>
                <BBadge variant="success" className="mr-2">
                  { movie.runtime }
                </BBadge>
                <BBadge variant="success" className="mr-2">
                  { movie.genre }
                </BBadge>
              </div>
              <table className="table small">
                <tbody>
                  <tr>
                    <th>Production</th>
                    <td>{ movie.production }</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{ movie.country }</td>
                  </tr>
                  <tr>
                    <th>Director</th>
                    <td>{ movie.director }</td>
                  </tr>
                  <tr>
                    <th>Writer</th>
                    <td>{ movie.writer }</td>
                  </tr>
                  <tr>
                    <th>Actors</th>
                    <td>{ movie.actors }</td>
                  </tr>
                  <tr>
                    <th>Awards</th>
                    <td>{ movie.awards }</td>
                  </tr>
                </tbody>
              </table>
            </BCol>
          </BRow>
        </div>
      </div>
    );
  }


  // ===< RENDER >===
  // 
  return (
    <BModal
      show={ show }
      size="xl"
      contentClassName="movie-modal__content"
      onHide={ onClose }
    >
      <BModal.Body>
        { renderContent() }
      </BModal.Body>
    </BModal>
  );
}

export default ModalInfo;
