import React from "react";
import Input from "../../../components/UI/Input";
import {  Row, Col } from "react-bootstrap";
import Modal from "../../../components/UI/Modal";

const RenderAddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    createCategory,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    createCategoryList,
    handleCategoryImage,
    category,
  } = props;
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={"Add New Category"}
      action={createCategory}
      _task={"Add Category"}
    >
      <Row>
        <Col>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={"Enter Category Name"}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            className="form-control form-control-sm"
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
        </Col>
      </Row>
      <Row>
        <input
          className="form-control"
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        ></input>
      </Row>
    </Modal>
  );
};

export default RenderAddCategoryModal;
