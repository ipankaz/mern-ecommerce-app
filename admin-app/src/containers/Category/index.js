import { Container, Row, Col,Button } from "react-bootstrap";
import React, {  useState } from "react";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories , addCategory , updateCategory, deleteCategoryAction} from "../../actions/category.action";
import Input from "../../components/UI/Input";
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {IoIosCheckboxOutline , IoIosCheckbox , IoIosArrowForward , IoIosArrowDown} from 'react-icons/io'

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked,setChecked] = useState([])
  const [expanded,setExpanded] = useState([])
  const [checkedArray,setCheckedArray] = useState([])
  const [expandedArray,setExpandedArray] = useState([])
  const [updateCategoryModal,setUpdateCategoryModal] = useState(false)
  const [deleteCategoryModal,setDeleteCategoryModal] = useState(false)

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  // useEffect(() => {
  //   dispatch(getAllCategories);
  // }, []);

  function getCategories() {
    dispatch(getAllCategories());
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)

  const createCategory = () => {
    
    const form = new FormData()
    
    form.append('name',categoryName)
    form.append('parentId',parentCategoryId)
    form.append('categoryImage',categoryImage)
    dispatch(addCategory(form))
    setCategoryName('');
    setParentCategoryId('');
    setShow(false)
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label:category.name,
        value:category._id,
        children:category.children.length>0 && renderCategories(category.children)
      }
       
      );
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name , parentId:category.parentId});
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  function handleCategoryImage(e){
setCategoryImage(e.target.files[0])
  }

const _updateCategory =()=>{
  checkedAndExpandArray()
  setUpdateCategoryModal(true)
 console.log(checkedArray,expandedArray)
} 

const checkedAndExpandArray = () =>{
  const categories = createCategoryList(category.categories)
   const checkedArray = []
   const expandedArray = []
   checked.length>0 && checked.forEach((categoryId,index)=>{
     const category = categories.find((_category,_index)=>categoryId===_category.value)
     category && checkedArray.push(category)
   })
   expanded.length>0 && expanded.forEach((categoryId,index)=>{
     const category = categories.find((_category,_index)=>categoryId===_category.value)
     category && expandedArray.push(category)
   })
   setCheckedArray(checkedArray)
   setExpandedArray(expandedArray)
}

const updateCategoryForm = () => {
    
  const form = new FormData()

  expandedArray.forEach((item,index)=>{
    form.append('_id',item.value)
    form.append('name',item.name)
    form.append('parentId',item.parentId ? item.parentId : "")
    form.append('type',item.type)
  })
  checkedArray.forEach((item,index)=>{
    form.append('_id',item.value)
    form.append('name',item.name)
    form.append('parentId',item.parentId ? item.parentId : "")
    form.append('type',item.type)
  })
  dispatch(updateCategory(form)).then(result=>{
    if(result){
      dispatch(getAllCategories())
    }
  })
  setUpdateCategoryModal(false)
};

const handleCategoryInput = (key,value,index,type)=>{
if(type==="checked"){
  const updatedCheckedArray = checkedArray.map((item,_index)=>_index===index ? {...item , [key]:value} : item)
  setCheckedArray(updatedCheckedArray)
}else if (type==="expanded"){
  const updatedExpandedArray = expandedArray.map((item,_index)=>_index===index ? {...item , [key]:value} : item)
  setExpandedArray(updatedExpandedArray)
}
}

const renderAddCategoryModal = ()=>{
  return (
    <Modal 
       show={show}
       handleClose={handleClose}
       modalTitle={"Add new Category"}
       action={createCategory}
       _task={"Add Category"}
       >
       <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={"Enter Category Name"}
          />

          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <input className="form-control" type="file" name="categoryImage" onChange={handleCategoryImage}></input>
       </Modal>
  )
}

const renderUpdateCategoryModal = ()=>{
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
          value=""
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
          <select className="form-control" value=""
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
const deleteCategoryForm = ()=>{
  const checkedIdsArray = checkedArray.map((item,index)=>({_id:item.value}))
  const expandedIdsArray = expandedArray.map((item,index)=>({_id:item.value}))
  const idsArray = checkedIdsArray.concat(expandedIdsArray)
  dispatch(deleteCategoryAction(idsArray)).then(result=>{
    if(result){
      dispatch(getAllCategories())
    }
  })
  setDeleteCategoryModal(false)
}

const _deleteCategory = ()=>{
  checkedAndExpandArray()
  setDeleteCategoryModal(true)
  console.log(checkedArray,expandedArray)
}

const renderDeleteCategoryModal = ()=>{
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
  )
}

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <Button onClick={handleShow}>Add</Button>
              <Button onClick={getCategories}>Get</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked( checked )}
                onExpand={expanded => setExpanded( expanded )}
                icons={{
                  check: <IoIosCheckbox/>,
                  uncheck:<IoIosCheckboxOutline/> ,
                  halfCheck: <IoIosCheckboxOutline/>,
                  expandClose: <IoIosArrowForward/>,
                  expandOpen: <IoIosArrowDown/> 
                  
                }}
            />
          </Col>
        </Row>
        <Row>
           <Col> <Button onClick={_updateCategory}>Edit</Button></Col>
          <Col><Button onClick={_deleteCategory}>Delete</Button></Col>
          </Row>
      </Container>

          {/* Add Category Modal  */}
          {renderAddCategoryModal()}
       
          {/* Update Categories Modal  */}
          {renderUpdateCategoryModal()}

          {/* delete Category Modal  */}
         {renderDeleteCategoryModal()}

       
       </Layout>
  );
};

export default Category;
