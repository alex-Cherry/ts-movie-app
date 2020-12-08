import React from 'react';
// Bootstrap
import {
  Modal as BModal,
  Button as BButton
} from 'react-bootstrap';


// PROPS
type ModalConfirmProps = {
  show: boolean,
  header: string,
  text: string,

  // Events
  onClose: () => void,
  onConfirm: () => void
};


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const ModalConfirm = (props: ModalConfirmProps) => {

  // ===< PROPS >===
  // 
  const {
    show,
    header,
    text,
    onClose,
    onConfirm
  } = props;


  // ===< RENDER >===
  // 
  return (
    <BModal
      show={ show }
      onHide={ onClose }
    >
      <BModal.Header closeButton>
        { header }
      </BModal.Header>

      <BModal.Body>
        <p>{ text }</p>
      </BModal.Body>

      <BModal.Footer>
        <BButton
          variant="secondary"
          onClick={ onClose }
        >
          Отмена
        </BButton>
        <BButton
          variant="primary"
          onClick={ onConfirm }
        >
          ОК
        </BButton>
      </BModal.Footer>

    </BModal>
  );
};

export default ModalConfirm;
