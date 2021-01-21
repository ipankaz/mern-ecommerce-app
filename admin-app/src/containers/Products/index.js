import Layout from "../../components/layout/index";
import { Container, Row, Col, Table, Button} from "react-bootstrap";
import React, { useState } from "react";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { generatePublicUrl } from '../../urlConfig';
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.action";
import { IoIosAdd,} from "react-icons/io";
import './style.css';

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const createProduct = () => {
if(productName==="" || quantity==="" || categoryId === "" || 
productPrice==="" || productImage.length===0){
  alert("Fields Empty")
  return;
}

    const form = new FormData();
    form.append("name", productName);
    form.append("quantity", quantity);
    form.append("category", categoryId);
    form.append("description", description);
    form.append("price", productPrice);
    for (let pic of productImage) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form));
    setProductName("");
    setCategoryId("");
    setProductPrice("");
    setDescription("");
    setQuantity("");
    setProductImage("");
    setShow(false);
  };

  function handleProductImage(e) {
    setProductImage([...productImage, e.target.files[0]]);
  }

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        onHide={handleClose}
        modalTitle={"Add New Product"}
        action={createProduct}
        _task={"Add Product"}
      >
        <Input
          label="Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder={"Enter Product Name"}
        />
        <Input
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={"Enter Quantity"}
        />
        <select
          label="Category"
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"Enter Description"}
        />
        <Input
          label="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder={"Enter Price"}
        />
        {productImage.length > 0
          ? productImage.map((pic, index) => <div key={index}>{pic.name}</div>)
          : null}
        <input
          className="form-control"
          type="file"
          name="productImage"
          onChange={handleProductImage}
        ></input>
      </Modal>
    );
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => (
                <tr
                  style={{cursor:"pointer"}}
                  onClick={() => showProductDetailsModal(product)}
                  key={product._id}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  }

  const renderProductDetailsModal = () => {

    if(!productDetails){
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
        onHide={handleCloseProductDetailsModal}
        task={"showProduct"}
        
        
      >
        <Row >
          <Col md="6">
            <label className="key">Name</label>
            <p  className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p  className="value">{productDetails.price}</p>
          </Col>
        </Row>
         <Row >
          <Col md="6">
            <label className="key">Quantity</label>
            <p  className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p  className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row >
          <Col md="12">
            <label className="key">Description</label>
            <p  className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row >
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture,index) => (
                <div key={index} className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="app-pic" />
                </div>
              ))}
            </div>
          </Col>
        </Row> 
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div  style={{display: "flex", justifyContent : "space-between", marginBottom:"20px", marginTop:"10px"}} >
              <h3>Products</h3>
              <div className="actionBtnContainer">
              <Button variant="success" onClick={handleShow}><IoIosAdd/><span>Add</span></Button>
              </div>
              
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>

      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
