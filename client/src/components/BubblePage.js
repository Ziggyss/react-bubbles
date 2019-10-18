import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from "../axios/axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const colorsApi = "http://localhost:5000/api/colors";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get(colorsApi)
      .then(response => {
        setColorList(response.data);
      })
      .catch(error => {
        alert(error.message);
      });
  });

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
