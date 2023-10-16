import "./App.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./component/Todo";
import { addToTodos, removeFromTodos } from "./store/slice";
import { BsPlusCircle } from "react-icons/bs";

const App = () => {
  // A hook to access the redux dispatch function.
  // This is the only way to trigger a state change.
  const dispatch = useDispatch();

  // A hook to access the redux store's state.
  // This hook takes a selector function as an argument.
  // The selector is called with the store state.
  // state.todos.todos - todos is the name of the reducer and the name of the variable in the initialState.
  const todos = useSelector((state) => state.todos.todos);

  // A variable used by the input field to store the text.
  const [text, setText] = useState("");

  // A function to handle the add button.
  const handleAdd = () => {
    // If the input field is empty, return.
    if (text === "") {
      return;
    }

    // Dispatch an action to add a todo.
    dispatch(
      addToTodos({
        id: Math.floor(Math.random() * 1000),
        text,
        status: "incomplete",
      })
    );
  };

  // A function to handle the edit button.
  const handleEdit = (id) => {
    // Find the todo with the given id.
    const existingTodo = todos.find((todo) => todo.id === id);
    // Set the text in the input field to the text of the todo.
    setText(existingTodo.text);
    // Dispatch an action to remove the todo.
    dispatch(removeFromTodos(id));
  };

  return (
    <div className="app">
      <div className="content">
        <div className="header">
          <span className="title">Todo List</span>
        </div>
        <div className="add">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
          />
          <button onClick={handleAdd}>
            <BsPlusCircle />
            <span>Add</span>
          </button>
        </div>
        <div className="main">
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} handleEdit={handleEdit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
