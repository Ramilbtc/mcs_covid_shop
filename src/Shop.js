import React, { useState, useEffect } from "react";
import Item from "./Item.js";
import "./index.css";

export default function Shop() {
  const [items, setItems] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await fetch(
          "https://learn.guidedao.xyz/api/student/products"
        );
        const data = await response.json();
        if (data) {
          setItems(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  if (loader) {
    return <p>...идет загрузка</p>;
  }

  return (
    <>
      <div>
        <h3>Товары:</h3>
        <ul>
          {items &&
            items.flat(2).map((item) => (
              <li key={item.id}>
                <Item info={item} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
