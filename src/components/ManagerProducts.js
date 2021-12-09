import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/_Common.module.css";
import cx from "classnames";
import jwt from "jsonwebtoken";
import { BsPlusLg } from "react-icons/bs";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function ManagerProducts() {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("appAuthData");

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
    if (!token) console.error("No app auth data");
    return jwt.decode(token).account_type == 2;
  }

  return (
    <div>
      {getIsManager() && (
        <div
          className={styles.floatingBigPlus}
          title="Add a New Product"
          onClick={() => (window.location.href = "/managers/products/create")}
        >
          <BsPlusLg size="3em" />
        </div>
      )}

      {data.length > 0 && (
        <>
          <div className={cx(styles.flex, styles.marginTop1)}>
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
          <table className={cx(styles.marginTop2)}>
            <tbody>
              {data
                .filter((d) => d.product_name.toLowerCase().includes(searchString.toLowerCase()))
                .map((d, index) => (
                  <tr key={index}>
                    <td>
                      {/* cannot use classNames={styles.textDecorNone} */}
                      <a href={`/managers/products/modify/${d.idproducts}`} style={{ textDecoration: "none" }}>
                        {/* <a href={`/managers/categories/modify/${d.idcategories}`} style={{ textDecoration: "none" }}> */}
                        <div className={styles.formwrapper}>
                          <input
                            disabled
                            type="text"
                            value={d.product_name}
                            className={cx(styles.formcontrol, styles.cursorPointer, styles.onHoverColor1)}
                          />
                        </div>
                      </a>
                    </td>
                    <td>
                      {/* cannot use classNames={styles.textDecorNone} */}
                      <a href={`/managers/products/modify/${d.idproducts}`} style={{ textDecoration: "none" }}>
                        <img src={`${API_ADDRESS}/images/${d.product_image}`}></img>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}

      {data.length <= 0 && <div className={cx(styles.marginTop2, styles.marginLeft1)}>(You have no products!)</div>}
    </div>
  );
}
