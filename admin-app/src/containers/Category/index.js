import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategoryAction,
} from "../../actions/category.action";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCreate,
  IoIosCheckmark
} from "react-icons/io";
import RenderUpdateCategoryModal from "./components/UpdateCategoryModal";
import RenderAddCategoryModal from "./components/AddCategoryModal";
import RenderDeleteCategoryModal from "./components/DeleteCategoryModal";
import './style.css'

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  function getCategories() {
    dispatch(getAllCategories());
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const createCategory = () => {
    if(categoryName===""){
      alert("Fields Empty in Category Creation")
      return
    }

    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type:category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  function handleCategoryImage(e) {
    setCategoryImage(e.target.files[0]);
  }

  const _updateCategory = () => {
    checkedAndExpandArray();
    setUpdateCategoryModal(true);
    console.log(checkedArray, expandedArray);
  };

  const checkedAndExpandArray = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (_category, _index) => categoryId === _category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (_category, _index) => categoryId === _category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const updateCategoryForm = () => {

    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategory(form))
    setUpdateCategoryModal(false);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        _index === index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        _index === index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const deleteCategoryForm = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    // const expandedIdsArray = expandedArray.map((item, index) => ({
    //   _id: item.value,
    // }));
    // const idsArray = checkedIdsArray.concat(expandedIdsArray)

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoryAction(checkedIdsArray))
    }
    setDeleteCategoryModal(false);
  };

  const _deleteCategory = () => {
    checkedAndExpandArray();
    setDeleteCategoryModal(true);
    console.log(checkedArray, expandedArray);
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
              <Button variant="success" onClick={handleShow}><IoIosAdd/><span>Add</span></Button>
              <Button variant="dark" onClick={getCategories}><IoIosCheckmark/><span>Get</span></Button>
              <Button onClick={_updateCategory}><IoIosCreate/><span>Edit</span></Button>
              <Button variant="danger" onClick={_deleteCategory}><IoIosTrash/><span>Delete</span></Button>
              </div>
              
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
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>

      {/* Add Category Modal  */}

      <RenderAddCategoryModal
        show={show}
        handleClose={handleClose}
        createCategory={createCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        createCategoryList={createCategoryList}
        handleCategoryImage={handleCategoryImage}
        category={category}
      />

      {/* Update Categories Modal  */}
      <RenderUpdateCategoryModal
        updateCategoryModal={updateCategoryModal}
        setUpdateCategoryModal={setUpdateCategoryModal}
        updateCategoryForm={updateCategoryForm}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        createCategoryList={createCategoryList}
        category={category}
      />

      {/* delete Category Modal  */}
      <RenderDeleteCategoryModal
        deleteCategoryModal={deleteCategoryModal}
        setDeleteCategoryModal={setDeleteCategoryModal}
        deleteCategoryForm={deleteCategoryForm}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
};

export default Category;
