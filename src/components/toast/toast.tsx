import React, { useState } from 'react';
// 
import classNames from 'classnames';
// Bootstrap
import {
  Toast as BToast
} from 'react-bootstrap';
// Store
import { ToastType } from '../../store';


// PROPS TYPE
type ToastProps = {
  text: string,
  headerText?: string,
  type?: ToastType

  // => Events
  onClose: () => void
};


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const Toast = (props: ToastProps) => {

  // STATE
  const [ show, setShow ] = useState(true);

  // PROPS
  const {
    text,
    headerText = 'Notification',
    type = 'info',
    onClose
  } = props;


  // ===< EVENT HANDLERS >===
  // 
  const onCloseHandler = () => {
    setShow(false);
    onClose();
  }


  // ===< UTILS >===
  // 
  /**
   * Returns classes for the header
   */
  const getClassesForHeader = () => {
    const classes = classNames(
      'justify-content-between',
      'project-toast__header',
      { 'project-toast__header--success': type === 'success' },
      { 'project-toast__header--danger': type === 'danger' }
    );

    return classes;
  }
  /**
   * Returns classes for the root element
   */
  const getClasses = (): string => {
    const classes = classNames(
      'project-toast',
      { 'project-toast--success': type === 'success' },
      { 'project-toast--danger': type === 'danger' }
    );

    return classes;
  }


  // ===< RENDER >===
  // 
  return (
    <BToast
      show={ show }
      autohide
      delay={ 5000 }
      className={ getClasses() }
      onClose={ onCloseHandler }
    >
      <BToast.Header className={ getClassesForHeader() }>
        { headerText }
      </BToast.Header>
      <BToast.Body>
        { text }
      </BToast.Body>
    </BToast>
  );
};

export default Toast;
