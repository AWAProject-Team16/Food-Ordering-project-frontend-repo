import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "../css/_Common.module.css";
import cx from "classnames";
import jwt from "jsonwebtoken";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function ManagerProducts() {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }
    axios
      .get(`${API_ADDRESS}/products/myProducts`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  function getIsManager() {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return false;
    }
    return jwt.decode(token).account_type == 2;
  }

  return (
    <div>
      {getIsManager() && (
        <Link to="/managers/products/create" className={styles.floatingBigPlus} title="Add a New Product">
          <BsPlusLg size="3em" />
        </Link>
      )}

      {data.length > 0 && (
        <>
          <div className={styles.componentTitle}>MY PRODUCTS</div>
          <div className={cx(styles.flex, styles.marginTop1, styles.marginLeft2)}>
            <div>
              <b>Search for products: &nbsp;</b>
            </div>
            <input
              className={cx(styles.formcontrol, styles.width300)}
              type="search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <div className={styles.productContainer}>
            {data
              .filter((d) => d.product_name.toLowerCase().includes(searchString.toLowerCase()))
              .map((d, index) => {
                return (
                  <div key={index} className={styles.flexColumn}>
                    <Link to={`/managers/products/modify/${d.idproducts}`}>
                      <div className={styles.imgZoom}>
                        <img src={`${API_ADDRESS}/images/${d.product_image}`}></img>
                      </div>
                    </Link>
                    <Link to={`/managers/products/modify/${d.idproducts}`} className={cx(styles.textDecorNone)}>
                      <div className={styles.formwrapper}>
                        <input
                          disabled
                          type="text"
                          value={d.product_name}
                          className={cx(styles.formcontrol, styles.cursorPointer, styles.onHoverColor1, styles.myProductsName)}
                        />
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </>
      )}

      {data.length <= 0 && <div className={cx(styles.marginTop2, styles.marginLeft1)}>(You have no products!)</div>}
    </div>
  );
}
