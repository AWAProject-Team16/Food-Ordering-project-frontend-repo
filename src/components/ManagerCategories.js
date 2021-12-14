import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "../css/_Common.module.css";
import cx from "classnames";
import jwt from "jsonwebtoken";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ManagerCategories() {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }
    axios
      .get(`${API_ADDRESS}/categories/myCategories`, {
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
        <Link to="/managers/categories/create" className={styles.floatingBigPlus} title="Add a New Category">
          <BsPlusLg size="3em" />
        </Link>
      )}

      {data.length > 0 && (
        <div className={cx(styles.marginLeft2, styles.flexColumn)}>
          <div className={styles.componentTitle}>MY CATEGORIES</div>
          <div className={cx(styles.flex, styles.marginTop1)}>
            <div>
              <b>Search for categories: &nbsp;</b>
            </div>
            <input
              className={cx(styles.formcontrol, styles.width300)}
              type="search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <table className={cx(styles.marginTop2)}>
            <thead>
              <tr>
                <td className={cx(styles.center, styles.uppercase, styles.fontSize15, styles.pb1)}>Category</td>
                <td className={cx(styles.center, styles.uppercase, styles.fontSize15, styles.pb1)}>Belongs to</td>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((d) => d.category_name.toLowerCase().includes(searchString.toLowerCase()))
                .map((d, index) => (
                  <tr key={index}>
                    <td className={styles.width400}>
                      <Link
                        to={`/managers/categories/modify/${d.idcategories}`}
                        className={cx(styles.onHoverColor1, styles.textDecorNone)}
                      >
                        <div className={styles.formwrapper}>
                          <input
                            disabled
                            type="text"
                            value={d.category_name}
                            className={cx(styles.formcontrol, styles.cursorPointer, styles.onHoverColor1)}
                          />
                        </div>
                      </Link>
                    </td>
                    <td className={styles.width400}>
                      <Link
                        to={`/managers/restaurants/${d.restaurants_idrestaurants}`}
                        className={cx(styles.onHoverColor1, styles.textDecorNone)}
                      >
                        <div className={styles.formwrapper}>
                          <input
                            disabled
                            type="text"
                            value={d.restaurant_name}
                            className={cx(styles.formcontrol, styles.cursorPointer, styles.onHoverColor1)}
                          />
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length <= 0 && <div className={cx(styles.marginTop2, styles.marginLeft1)}>(You have no categories!)</div>}
    </div>
  );
}
