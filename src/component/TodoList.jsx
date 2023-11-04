import React, { useState,useEffect } from "react";
import "./todoList.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AiFillDelete,
  AiOutlineUndo,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const TodoList = () => {

    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const initialTodos = JSON.parse(localStorage.getItem(`tasks_${currentUser.username}`)) || [];

    const [todos, setTodos] = useState(initialTodos);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedItem, setSelectedItem] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    
  

  useEffect(() => {
    if (!isLoggedIn) {
        navigate("/login");
        return null;
      }
    // Load tasks from local storage for the current user
    const userTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.username}`)) || [];
    setTodos(userTasks);
  }, [currentUser.username,isLoggedIn,navigate]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //Add Item
  const handleAddTodo = () => {
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
    toast.success('Item is added in the list !!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  //Delete Todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success('Item is deleted from the list !!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    
  };

  //Move the item up

  const moveItemUp = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index > 0) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index - 1];
      updatedTodos[index - 1] = temp;
      setTodos(updatedTodos);
    }
  };

  //Move the item up down

  const moveItemDown = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index < todos.length - 1) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index + 1];
      updatedTodos[index + 1] = temp;
      setTodos(updatedTodos);
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleSelectedItem = (id) => {
    setSelectedItem(id === selectedItem ? null : id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    } else if (e.key === "Delete") {
      if (selectedItem) {
        handleDeleteTodo(selectedItem);
      }
    }
    
  };

  // Filtering the items

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
      // console.log(todo.completed)
    } else if (filter === "incomplete") {
      return !todo.completed;
    }
    return true;
    // console.log(todo.completed);
  });

  // Edit and Update the Items

  const handleEditTodo = (id, text) => {
    setEditIndex(id);
    setEditValue(text);
  };

  const handleUpdateTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: editValue };
        }
        return todo;
      })
    );
    setEditIndex(null);
    setEditValue("");
    toast.success('Item is updated in the list !!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  //Clear all the items
  
  const handleClearAll = ()=>{
    setTodos([])
    toast.success('All the items deleted from the list !!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  //Total count of Items

  const completedCount = todos.filter((todo) => todo.completed).length;
  


  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`tasks_${currentUser.username}`, JSON.stringify(todos));
  }, [todos, currentUser.username]);
 

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container">
      <ToastContainer />
      <h2 style={{textAlign:"center",color:"red",fontSize:"1.8em"}}>Welcome, {currentUser.username} !</h2>
      <div className="todo-app">
        <h1 style={{color:"blue"}}>Todo App</h1>

        {/* Input Section for add items  */}
        <div className="add-todo">
          <input
            className="add"
            type="text"
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Add new todo"
          />
          <button className="addBtn" onClick={handleAddTodo}>
            Add
          </button>
        </div>
        
        {/* Filtering the items  */}

        <div className="filter-container">
          <button
            // className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            // className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            // className={filter === "incomplete" ? "active" : ""}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>

          <button onClick={handleClearAll} style={{"color":"white"}} className="clearBtn">Clear All</button>
        </div>

        {/* Display the list of items  */}

        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <div
              className={`todo-item ${todo.completed ? "completed" : ""}`}
          //  ${todo.id === selectedItem ? "selected" : ""}`}
              onClick={() => handleSelectedItem(todo.id)}
              onKeyDown={handleKeyPress}
            >
              {editIndex === todo.id ? (
                <input
                  className="editAdd"
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span className="todo-text">{todo.text}</span>
              )}

              {/* Todos actions like delete,completed, edit etc.  */}

              <div className="todo-actions">
                <button
                  className="toggle"
                  onClick={() => handleToggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <AiOutlineUndo size={18} />
                  ) : (
                    <MdDoneAll size={18} />
                  )}
                </button>
                <button
                  className="delete"
                  onKeyDown={handleKeyPress}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <AiFillDelete size={18} />
                </button>
                <button className="up" onClick={() => moveItemUp(todo.id)}>
                  <AiOutlineArrowUp size={18} />
                </button>
                <button className="up" onClick={() => moveItemDown(todo.id)}>
                  <AiOutlineArrowDown size={18} />
                </button>

                {editIndex === todo.id ? (
                  <button
                    className="update"
                    onClick={() => handleUpdateTodo(todo.id)}
                  >
                    <GrUpdate className="updteBtn" size={18} />
                  </button>
                ) : (
                  <button
                    className="edit"
                    onClick={() => {
                      handleEditTodo(todo.id, todo.text);
                    }}
                  >
                    <BiEditAlt size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total counts of Todos items  */}

        <div className="todo-stats">
          <p>
            Total: {todos.length} | Completed: {completedCount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TodoList
