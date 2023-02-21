import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiActions } from "../../store/productApiSlice";
import { uiActions } from "../../store/uiSlice";
import Product from "./Product";

const APIKEY = process.env.REACT_APP_API_KEY;

const Products = () => {
  const keyword = useSelector((state) => state.productApi.keyword);
  const processBoolean = useSelector(
    (state) => state.productApi.fetchApiProcess
  );
  const apiData = useSelector((state) => state.productApi.apiData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(uiActions.openSpinner());
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/products?limit=6&page=1&keyword=${keyword}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Fetch data failed");
      }
      const data = await response.json();
      dispatch(apiActions.stopApiProcess());
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
      dispatch(uiActions.closeSpinner());
      dispatch(
        apiActions.apiData({
          items: apiDataObj,
        })
      );
    };

    if (processBoolean === true) {
      fetchData().catch((error) => alert(error));
    }
  }, [keyword, processBoolean, dispatch]);

  return (
    <div>
      {apiData.map((data) => (
        <Product
          id={data.id}
          title={data.title}
          image={data.image}
          price={data.price}
          rating={data.rating}
          webID={data.webID}
        />
      ))}
    </div>
  );
};

export default Products;
