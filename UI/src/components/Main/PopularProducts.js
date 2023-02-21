import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { apiActions } from "../../store/productApiSlice";
import { uiActions } from "../../store/uiSlice";
import PopularProduct from "./PopularProduct";
import "./PopularProducts.css";

const APIKEY = process.env.REACT_APP_API_KEY;

const popularProductData = [
  {
    id: 0,
    title: "Redragon Gaming Keyboard & Mouse Combo",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4300306?wid=180&hei=180&op_sharpen=1",
    price: 39.99,
    webID: "046f9ef0-e444-435a-8c5c-8198ef516c13",
  },
  {
    id: 1,
    title: "Redragon K582 SURARA RGB Backlit Gaming Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4300298?wid=180&hei=180&op_sharpen=1",
    price: 59.99,
    webID: "ce3f40ec-3337-4b47-b403-49583813c5db",
  },
  {
    id: 2,
    title: "Adesso Tru-Form 150 - 3-Color Illuminated Ergonomic Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4657448?wid=180&hei=180&op_sharpen=1",
    price: 49.99,
    webID: "60b63c05-3a7f-4bcc-8a7c-76dd34a0cd66",
  },
  {
    id: 3,
    title: "Verbatim Slimline Corded USB Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4650265?wid=180&hei=180&op_sharpen=1",
    price: 10.99,
    webID: "26206d88-3d6a-4b17-b41b-c5a6502f6aea",
  },
  {
    id: 4,
    title: "Verbatim Slimline Corded USB Keyboard & Mouse",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4650259?wid=180&hei=180&op_sharpen=1",
    price: 17.99,
    webID: "413eb40c-9c95-48cb-9696-3dbaa14df70d",
  },
  {
    id: 5,
    title: "Redragon K552 KUMARA Backlit Gaming Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4300299?wid=180&hei=180&op_sharpen=1",
    price: 44.99,
    webID: "580ff7b6-01d4-40d4-875f-1935fa5798fe",
  },
];

const PopularProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkProductLogic = async (productCategory, productID) => {
    dispatch(uiActions.openSpinner());
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/products?limit=6&page=1&keyword=Keyboards",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Could not get product.");
      }

      const data = await response.json();
      const formedData = data.data || [];
      const apiDataObj = formedData.map((data, index) => {
        return {
          id: index,
          title: data.product_title,
          image: data.image_url,
          price: data.price,
          webID: data.web_id,
          rating: data.rating,
        };
      });
      console.log(apiDataObj);
      dispatch(
        apiActions.apiData({
          items: apiDataObj,
        })
      );
      dispatch(uiActions.closeSpinner());
      navigate(`/${productCategory}/${productID}`);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="popularProducts">
      <h2>Popular sellers in Keyboards</h2>
      <div className="popularProducts__data">
        {popularProductData.map((data) => (
          <PopularProduct
            key={data.id}
            webID={data.webID}
            title={data.title}
            price={data.price}
            image={data.image}
            onLinkProductLogic={linkProductLogic}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
