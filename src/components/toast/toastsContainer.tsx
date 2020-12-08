import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
// Components
import Toast from './toast';
// Store
import { AppState, removeToast } from '../../store';
// CSS
import './toastsContainer.scss';


// MAP STATE
const mapState = (state: AppState) => {
  return {
    toasts: state.toasts.toasts
  };
};

// MAP DISPATCH
const mapDispatch = (dispatch: any) => {
  return {
    removeToast: (id: string) => dispatch(removeToast(id))
  }
};

// CONNECTOR
const connector = connect(mapState, mapDispatch);

// PROPS
type ToastsContainerProps = ConnectedProps<typeof connector>;


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const ToastsContainer = (props: ToastsContainerProps) => {

  // PROPS
  const { toasts, removeToast } = props;


  // ===< EVENT HANDLERS >===
  // 
  const onCloseToastHandler = (id: string) => {
    removeToast(id);
  }


  // ===< RENDER >===
  // 
  return (
    <div className="toast-container">
      {
        Object.keys(toasts).map(id => {
          return (
            <Toast
              key={ id }
              text={ toasts[id].text }
              type={ toasts[id].type }
              headerText={ toasts[id].headerText }
              onClose={ () => onCloseToastHandler(id) }
            />
          );
        })
      }
    </div>
  );
};

export default connector(ToastsContainer);
