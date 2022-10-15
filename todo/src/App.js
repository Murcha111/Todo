import React, { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || [] //получаем из локалсторадж items
  );

 const [editedValue, setEditedValue] = useState('')
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items)); //помещаем элементы в локалсторадж
    
    return () => {
      localStorage.clear();
    };
  }, [items]);

  const createNewItem = () => {
    if (value.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item: value,
        color: randomColor({
          luminosity: "light",
        }),
        positionDefault: {
          x: 600,
          y: -1000,
        },
      };
      setItems((items) => [...items, newItem]); //добавили в локал все существующие items плюс новый
      setValue("");
    } else {
      alert("Введите что-нибудь...");
      setValue("");
    }
  };

  const updatePosition = (data, index) => {
    //достаем из массива нужный по его индексу
    const newArr = [...items];
    newArr[index].positionDefault = { x: data.x, y: data.y }; //присваемваем новые координаты для item
    setItems(newArr);
  };
  const deleteItem = (id) => {
    setItems((items) => {
      return items.filter((el) => el.id !== id);
    });
  };

  const keyDownEnter = (event) => {
   
  if(event.keyCode === 13 || event.keyCode === 32){
    createNewItem()
    event.stopPropagation();
  }
  };

  // const editItem = (id) => {

  // }

  return (
    <div className="App">
      <div className="wrapper">
        <input
          onKeyDown={keyDownEnter}
          onChange={(event) => setValue(event.target.value)}
          className="input"
          type="text"
          value={value}
          placeholder="что-нибудь сюда..."
        ></input>
        <button className="btn_create" onClick={createNewItem}>
          добавить
        </button>
      </div>
    
      {items.map((item, index) => {
        return (
          <Draggable
            onStop={(_, data) => {
              updatePosition(data, index);
            }}
            key={index}
            defaultPosition={item.positionDefault}
          >
            <div style={{ backgroundColor: item.color }} className="todo_item">
              {`${item.item}`}
              <button onClick={() => deleteItem(item.id)} className="del">
              ❌
              </button>
              <button onClick={() => editItem(item.id)} className="updateButton" >
              🖍
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
