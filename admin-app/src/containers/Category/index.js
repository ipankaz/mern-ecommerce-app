import { Container, Row, Col } from "react-bootstrap";
import React, {  useState } from "react";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories , addCategory} from "../../actions/category.action";
import Input from "../../components/UI/Input";
import Modal from '../../components/UI/Modal';

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
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
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  function handleCategoryImage(e){
setCategoryImage(e.target.files[0])
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
              <button onClick={getCategories}>Get</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>
       <Modal 
       show={show}
       handleClose={handleClose}
       modalTitle={"Add new Category"}
       createCategory={createCategory}
       task={"addNewCategory"}
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
      
    </Layout>
  );
};

export default Category;
