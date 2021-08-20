import React, { useEffect, useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { fetchColorService } from "../services/fetchColorService";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
      .then((response) => {
        //console.log(response);
        setColors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //console.log(colors);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    return colors.map((color) => {
      if (color.id === editColor.id) {
        axiosWithAuth()
          .put(`/colors/${editColor.id}`, editColor)
          .then((response) => {
            setColors(
              colors.map((color) => {
                if (color.id === Number(response.data.id)) {
                  return response.data;
                } else {
                  return color;
                }
              })
            );
            setEditing(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return console.log(color);
      }
    });
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      .then((response) => {
        setColors(
          colors.filter((color) => Number(color.id) != Number(response.data))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <ColorList
        colors={colors}
        editing={editing}
        toggleEdit={toggleEdit}
        saveEdit={saveEdit}
        deleteColor={deleteColor}
      />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
