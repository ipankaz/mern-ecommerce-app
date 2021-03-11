import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import createCategoryList from "../../helpers/createCategoryList";
import createPageAction from "../../actions/page.action";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/UI/Card";
import "./style.css";

/**
 * @author
 * @function NewPage
 **/

let element = true;

const NewPage = (props) => {
  const [show, setShow] = useState(false);
  const [pageName, setPageName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const linearCategory = createCategoryList(category.categories);

  useEffect(() => {
   if(element){
    setCategories(linearCategory);
    element=false;
   }
  },[category,linearCategory]);

  useEffect(() => {
    if (!page.loading) {
      setShow(false);
      setPageName("");
      setCategoryId("");
      setDescription("");
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const _category = categories.find(
      (category) => category.value === e.target.value
    );
    setCategoryId(e.target.value);
    setType(_category.type);
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const submitCreatePageForm = (e) => {
    if (
      pageName === "" ||
      description === "" ||
      type === "" ||
      categoryId === "" ||
      banners.length === 0 ||
      products.length === 0
    ) {
      alert("Empty Fields");
      return;
    }
    const form = new FormData();
    form.append("title", pageName);
    form.append("category", categoryId);
    form.append("type", type);
    form.append("description", description);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    dispatch(createPageAction(form));
    setShow(false);
  };

  const renderNewPageModal = () => {
    return (
      <Modal
        modalTitle={"Create New Page"}
        show={show}
        handleClose={handleClose}
        onHide={handleClose}
        action={submitCreatePageForm}
        _task={"Create Page"}
      >
        <Container>
          <Row>
            <Col>
              <Input
                type="text"
                label={"Page Name"}
                value={pageName}
                placeholder="Enter Page Name"
                onChange={(e) => setPageName(e.target.value)}
                className="form-control form-control-sm"
              />
            </Col>
            <Col>
              <label>Choose a Category</label>
              {/* <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option>Select Category</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select> */}

              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={linearCategory}
                placeholder={"Choose a Category"}
                className={"form-control form-control-sm"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type="text"
                label={"Description"}
                value={description}
                placeholder="Enter Page Description"
                onChange={(e) => setDescription(e.target.value)}
                className="form-control form-control-sm"
              />
            </Col>
          </Row>

          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                label={"Banners"}
                className="form-control form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>

          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                label={"Products"}
                className="form-control form-control-sm"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <Container>
          <p>please wait.......creating New Page</p>
        </Container>
      ) : (
        <>
          <Container>
          <div className="brandHeader">
               <span className="brandHeading">Brands Endorsed</span>
                <Button className="brandButton" onClick={handleShow}>Create Page</Button>
          </div>

            {page.brandPages.map((brandPage, index) => (
              <Card key={index} headerleft={brandPage.title}>
                <div className="cardContainer">
                <div className="branddescription">
                  <p>Description : {brandPage.description}</p>
                </div>

                <div className="banners">
                  <p>Banners</p>
                  <div className="bannerImages">
                    {brandPage.banners.map((banner, index) => (
                      <img key={index} src={banner.img} alt="brand" />
                    ))}
                  </div>
                </div>
                </div>

              </Card>
            ))}
          </Container>
          {renderNewPageModal()}
        </>
      )}
    </Layout>
  );
};

export default NewPage;
