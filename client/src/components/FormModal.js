import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function FormModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/*<Modal.Header closeButton>*/}
      {/*  <Modal.Title id="contained-modal-title-vcenter">*/}
      {/*    Modal heading*/}
      {/*  </Modal.Title>*/}
      {/*</Modal.Header>*/}
      <Modal.Body>
        <h4>Message has been sent!</h4>
        <p>
          Thanks for reaching out. A response will be sent out shortly.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}