import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const editInputRef = useRef(null)
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || [] //получаем из локалсторадж items
  );


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
        value: value,
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

  //!срабатывание по нажатию на ENTER(13) и пробел(32)
  const keyDownEnter = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      createNewItem()
      
      event.stopPropagation();
    }
  };

  const editItem = (id, title) => {
    setEditValue(title);
    setEdit(id);
  };

 const saveItem = (id, title) => {
 const newItems = [...items].map(el => {
  if(el.id == id){ 
    el.value = editValue}
    return el
  
 })
   setItems(newItems)//обновленный список
   setEdit(null)//установим флаг на начал положение
 }

//функция установки фокуса на элементе после обновления зависимостей
 useEffect(()=> {
  if(edit ){
    editInputRef.current.focus()
  }
 }, [edit])

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
              {
                edit == item.id ? 
                <input
                ref={editInputRef}
                onChange={(event) => setEditValue(event.target.value)}
                value={editValue}
              /> :
                <>
                 {item.value}
                 </>
               
              }
              {edit == item.id ? (
                <>
                  {/* <input
                    onChange={(event) => setEditValue(event.target.value)}
                    value={editValue}
                  /> */}
                  <button
                    className="saveButton"
                    onClick={() => {
                      saveItem(item.id, item.value);
                     
                    }}
                  >
                    save
                  </button>
                </>
              ) : (
                <>
                  {/* {item.value} */}
                  <button
                    onClick={() => {
                      if (confirm("Точно???")) {
                        deleteItem(item.id);
                      }
                    }}
                    className="del"
                  >
                    ❌
                  </button>
                  <button
                    onClick={() => {
                      editItem(item.id, item.value);
                    }}
                    className="updateButton"
                  >
                    🖍
                  </button>
                </>
              )}
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
