import React from 'react'
import Modal from '../../../components/UI/Modal';

const RenderDeleteCategoryModal = (props)=>{
const {
    deleteCategoryModal,
    setDeleteCategoryModal,
    deleteCategoryForm,
    expandedArray,
    checkedArray
      } = props

    return (
      <Modal
      show={deleteCategoryModal}
      handleClose={()=>setDeleteCategoryModal(false)}
      modalTitle = {"Confirm"}
      _task = {"Delete"}
      action={deleteCategoryForm}
      color={"danger"}
      >
        <div style={{marginBottom:"20px"}}>
        <h6>Expanded</h6>
         {expandedArray.map((item,index)=> <span key={index}>{item.name} </span>)}
        </div>
        <div>
        <h6>Checked</h6>
        {checkedArray.map((item,index)=> <span key={index}>{item.name} </span>)}
        </div>
      </Modal>
)}
export default RenderDeleteCategoryModal