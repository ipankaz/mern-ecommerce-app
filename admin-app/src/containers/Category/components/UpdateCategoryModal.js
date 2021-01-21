import React from 'react'
import {  Row, Col } from "react-bootstrap";
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';


const RenderUpdateCategoryModal = (props)=>{

    const {
        updateCategoryModal,
        setUpdateCategoryModal,
        updateCategoryForm,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        createCategoryList,
        category
    } = props
    return (
      <Modal 
         show={updateCategoryModal}
         handleClose={()=>setUpdateCategoryModal(false)}
         modalTitle={"Update Category"}
         action={updateCategoryForm}
         _task={"Update Category"}
         size={"lg"}
         >
           <Row>
             <Col>
             <h6>Expanded</h6>
             </Col>
           </Row>
  
           { expandedArray.length > 0 && expandedArray.map((item,index)=>
            <Row key={index}>
            <Col>
            <Input
             value={item.name}
             onChange={(e) => handleCategoryInput('name',e.target.value,index,'expanded')}
             placeholder={"Enter Category Name"}
           />
            </Col>
            <Col>
            <select
             className="form-control"
             value={item.parentId}
             onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'expanded')}
           >
             <option>Select Category</option>
             {createCategoryList(category.categories).map((option) => (
               <option key={option.value} value={option.value}>
                 {option.name}
               </option>
             ))}
           </select>
            </Col>
            <Col>
            <select className="form-control" 
            value={item.type}
            onChange={(e) => handleCategoryInput('type',e.target.value,index,'expanded')}
            >
              <option value="">Select Type</option>
              <option value="page">Page</option>
              <option value="store">Store</option>
              <option value="product">Product</option>
            </select>
            </Col>
          </Row>
           )
          }
  
            <Row>
             <Col>
             <h6>Checked</h6>
             </Col>
           </Row>
  
           { checkedArray.length > 0 && checkedArray.map((item,index)=>
            <Row key={index}>
            <Col>
            <Input
             value={item.name}
             onChange={(e) => handleCategoryInput('name',e.target.value,index,'checked')}
             placeholder={"Enter Category Name"}
           />
            </Col>
            <Col>
            <select
             className="form-control"
             value={item.parentId}
             onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'checked')}
           >
             <option>Select Category</option>
             {createCategoryList(category.categories).map((option) => (
               <option key={option.value} value={option.value}>
                 {option.name}
               </option>
             ))}
           </select>
            </Col>
            <Col>
            <select 
            className="form-control" 
            value={item.type}
            onChange={(e) => handleCategoryInput('type',e.target.value,index,'checked')}
            >
              <option value="">Select Type</option>
              <option value="page">Page</option>
              <option value="store">Store</option>
              <option value="product">Product</option>
            </select>
            </Col>
          </Row>
           )
          }
  
  
       {/* <input className="form-control" type="file" name="categoryImage" onChange={handleCategoryImage}></input> */}
         </Modal>
    )
  }

  export default RenderUpdateCategoryModal