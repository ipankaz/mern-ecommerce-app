import React ,{useEffect} from "react";
import getParams from "../../../utils/getParams";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPage } from "../../../actions/product.action";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../components/UI/Card";

/**
 * @author
 * @function ProductPage
 **/
let element=true;

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const params = getParams(props.location.search);
  const product = useSelector((state) => state.product);
  const { page } = product;

  useEffect(()=>{
    if(element){
      const payload ={params}
      dispatch(getProductsPage(payload))
    }
   element=false;
  })

  return (
    <>
      <div>
        <h3>{page.title}</h3>
        <Carousel renderThumbs={() => {}}>
          {page.banners &&
            page.banners.map((banner, index) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                key={index}
                style={{ display: "block" }}
                href={banner.navigateTo}
              >
                <img src={banner.img} alt="" />
              </a>
            ))}
        </Carousel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "10px 0px",
          }}
        >
          {page.products &&
            page.products.map((pro, index) => (
              <Card
                style={{
                  height: "400px",
                  width: "200px",
                  margin: "5px",
                }}
                key={index}
              >
                <img
                  src={pro.img}
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
