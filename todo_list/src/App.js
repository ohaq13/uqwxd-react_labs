import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");


  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);
  
  // Add the handlesubmit code here
  
  // This function is called when the user submits a new task to the todo list
function handleSubmit(e) {
    // Prevent the default form submission behavior of refreshing the page
    e.preventDefault();
    // Create a new todo object with a unique id, the todo text inputted by the user, and a default completed status of false
    const newTodo = {
    id: new Date().getTime(), // Using the current timestamp as the unique id
    text: todo.trim(), // The todo text inputted by the user, trimmed of any leading or trailing white space
    completed: false, // A new task is always incomplete by default
    };
    // Check if the todo text input is not empty
    if (newTodo.text.length > 0) {
    // If the input is valid, add the newTodo object to the current list of todos and update the state with the new list
    setTodos([...todos].concat(newTodo));
    // Clear the todo input field
    setTodo("");
    } else {
    // If the input is not valid (i.e. empty), show an alert message
    alert("Enter Valid Task");
    // Clear the todo input field
    setTodo("");
    }
    }
  // Add the deleteToDo code here
  function deleteToDo(inId){
    setTodos(todos.filter(key=>key.id !== inId ))
  }
  
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits (inId){
    let updatedTodos = todos.map((todo) => { if (todo.id  === inId) {
        todo.text= editingText 
         }
        return todo;
    });
    setTodos (updatedTodos);
    setTodoEditing(null);
}
  
return(
<div id="todo-list">
        <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
        />
        <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => <div className="todo" key={todo.id}>
        {todo.id === todoEditing ? (
           <div> {todo.text}<input type="text" onChange={(e) => setEditingText(e.target.value)} /></div>
            ) : (
            <div><input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>{todo.text}</div>
        )}

            <span className="todo-actions" align="right">
            {todo.id === todoEditing ? (
                <button type="button" onClick={()=>submitEdits(todo.id)}>Submit Edit</button> 
                ) : (
                    <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                    )}

                <button type="button" onClick={()=>deleteToDo(todo.id)}>delete</button>
        </span>
            
        </div>)}
        </div>
);
};
export default App;
