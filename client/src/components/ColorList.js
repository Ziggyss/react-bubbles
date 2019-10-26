import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../axios/axios";

const colorsApi = "http://localhost:5000/api/colors/";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`${colorsApi}${colorToEdit.id}`, colorToEdit)
      .then(response => {
        updateColors([...colors, response.data]);
        setEditing(false);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`${colorsApi}${color.id}`)
      .then(response => {
        updateColors(colors.filter(item => item.id !== color.id));
      })
      .catch(error => {
        alert("delete color error");
      });
  };

  // const addColor = () => {
  //   axiosWithAuth()
  //   .post(`${colorsApi}`, {
  //     color: "",
  //     code: ""

  //   })
  // }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color} 
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* //It must be possible to re-use the same form? */}
    </div>
  );
};

export default ColorList;
