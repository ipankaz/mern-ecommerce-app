import React from 'react'
import {  Modal,Button } from "react-bootstrap";

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {

  const task = ()=>{
     if(props.task==="addNewProduct" || props.task==="addNewCategory"){
       return (
         <Button variant="primary" onClick={(props.createCategory)?props.createCategory:props.createProduct}>
            Add
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
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          {task()}
          
        </Modal.Footer>
      </Modal>
   )

 }

export default NewModal