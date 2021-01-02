import React from 'react'
import {  Modal,Button } from "react-bootstrap";

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {

  const {_task , action} = props

  const task = ()=>{
     if(_task){
       return (
         <Button variant={props.color ? props.color : "primary"} onClick={action}>
           {_task}
          </Button>
       )
     }
  }

  return(
    <Modal  size = {props.size} show={props.show} handleClose={props.handleClose} onHide={props.handleClose}>
        <Modal.Header >
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
            {props.children}
        </Modal.Body>
        <Modal.Footer>
         <Button variant="secondary" onClick={props.handleClose}> Close </Button>
           {task()}
           </Modal.Footer>
      </Modal>
   )

 }

export default NewModal