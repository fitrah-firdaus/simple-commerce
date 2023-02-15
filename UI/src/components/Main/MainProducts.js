import React from "react";
import { useNavigate } from "react-router-dom";

import { apiActions } from "../../store/productApiSlice";
import { useDispatch } from "react-redux";
import MainProduct from "./MainProduct";
import { uiActions } from "../../store/uiSlice";

const APIKEY = process.env.REACT_APP_API_KEY;

const MainProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productHandler = async (productCategory, productID) => {
    dispatch(uiActions.openSpinner());
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/products?limit=6&page=1&keyword=${productCategory}`,
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

  const productOne = () => {
    productHandler("sweat", "971a4692-aca6-4958-8de8-62ecb84ed1b5");
  };

  const productTwo = () => {
    productHandler("wallet", "12a05838-48d2-4cf7-ae8f-94b3b43d217b");
  };

  const productThree = () => {
    productHandler("jacket", "95ab0a96-7a6b-4952-a618-8320529230f0");
  };

  const productFour = () => {
    productHandler("shoes", "fedcf3ea-062f-4705-8a4d-b77d1d1b4e79");
  };

  return (
    <div className="mainShops">
      <div className="mainShops__container">
        <MainProduct
          mainTitle="Sweat"
          image="https://media.kohlsimg.com/is/image/kohls/4552010_Radiant_Navy?wid=180&hei=180&op_sharpen=1"
          title="Big & Tall Lands' End Serious Sweats"
          onProductHandler={productOne}
        />
        <MainProduct
          mainTitle="Wallet"
          image="https://media.kohlsimg.com/is/image/kohls/3028377_Brown?wid=180&hei=180&op_sharpen=1"
          title="Men's Dockers® RFID-Blocking"
          onProductHandler={productTwo}
        />
        <MainProduct
          mainTitle="Jacket"
          image="https://media.kohlsimg.com/is/image/kohls/4936325_Zinnia?wid=180&hei=180&op_sharpen=1"
          title="Boys 4-20 ZeroXposur Thruster"
          onProductHandler={productThree}
        />
        <MainProduct
          mainTitle="Adidas"
          image="https://media.kohlsimg.com/is/image/kohls/4484489_Core_Black_White?wid=180&hei=180&op_sharpen=1"
          title="Adidas Cloudfoam Puremotion"
          onProductHandler={productFour}
        />
      </div>
    </div>
  );
};

export default MainProducts;
