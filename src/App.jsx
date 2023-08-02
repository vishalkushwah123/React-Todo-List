import './App.css'
import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editMode, seteditMode] = useState(false)
  const [editId, seteditId] = useState(null)
  const [editValue, seteditValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const deleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updateTodos)
  }

  const enterEditMode = (id, text) => {
    seteditMode(true)
    seteditId(id)
    seteditValue(text)
  }

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue }
      }
      return todo;
    })
    setTodos(updatedTodos)
    seteditMode(false)
    seteditId(null)
    seteditValue('')
  }
  return (
    <div className="container">
      <div className='todo-container'>
        <h2>Todo List</h2>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        {
          editMode ? (
            <div>
              <input type='text' value={editValue} onChange={(e) => seteditValue(e.target.value)} />
              <button id='update' onClick={updateTodo}>Update</button>
            </div>
          ) : (
            <button id='add' onClick={addTodo}>Add</button>
          )

        }
        <ul>
          {
            todos.map((todo) => (
              <div className='todo-box'>
                <div className='text-item'>
                  <li key={todo.id}>{todo.text}</li>
                </div>

                <div className='btn-box'>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => enterEditMode(todo.id, todo.text)}>Edit</button>
                </div>

              </div>
            ))
          }
        </ul>
      </div >
    </div>
  )
}

export default App
