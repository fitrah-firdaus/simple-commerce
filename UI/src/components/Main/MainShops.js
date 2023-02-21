import React from "react";
import { useNavigate } from "react-router-dom";
import MainShop from "./MainShop";

import "./MainShops.css";
import { apiActions } from "../../store/productApiSlice";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const APIKEY = process.env.REACT_APP_API_KEY;

const MainShops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productListHandler = async (productCategory) => {
    dispatch(uiActions.openSpinner());
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/products?limit=6&page=1&keyword=${productCategory}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Fetching data failed!");
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

      dispatch(
        apiActions.apiData({
          items: apiDataObj,
        })
      );
      dispatch(uiActions.closeSpinner());
      navigate(`/${productCategory}`);
    } catch (error) {
      alert(error);
    }
  };

  const productListOne = () => {
    productListHandler("keyboards");
  };

  const productListTwo = () => {
    productListHandler("headphones");
  };

  const productListThree = () => {
    productListHandler("kitchen");
  };

  const productListFour = () => {
    productListHandler("shoes");
  };

  return (
    <div className="mainShops">
      <div className="mainShops__container">
        <MainShop
          mainTitle="Keyboards"
          image="https://media.kohlsimg.com/is/image/kohls/4300298?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListOne}
        />
        <MainShop
          mainTitle="Headphones"
          image="https://media.kohlsimg.com/is/image/kohls/3996548_Black?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListTwo}
        />
        <MainShop
          mainTitle="Kitchen"
          image="https://media.kohlsimg.com/is/image/kohls/5413509?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListThree}
        />
        <MainShop
          mainTitle="Shoes"
          image="https://media.kohlsimg.com/is/image/kohls/2958262_Black_White?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListFour}
        />
      </div>
    </div>
  );
};

export default MainShops;
