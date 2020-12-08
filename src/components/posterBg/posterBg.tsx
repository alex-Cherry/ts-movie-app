import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';
// Store
import { AppState } from '../../store';
// CSS
import './posterBg.scss';


const mapState = (state: AppState) => {
  return {
    posterBg: state.common.posterBg
  };
};

const connector = connect(mapState);
type PosterBgProps = ConnectedProps<typeof connector>;


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const PosterBg = (props: PosterBgProps) => {

  const { posterBg } = props;


  /**
   * Returns style for the root component
   */
  const getStyle = (): CSSProperties => {
    const style: CSSProperties = {};
    if (posterBg) {
      style.backgroundImage = `url(${posterBg})`
    }

    return style;
  }


  // ===< RENDER >===
  // 
  return (
    <div className="poster-bg" style={ getStyle() }></div>
  );
}

export default connector(PosterBg);
