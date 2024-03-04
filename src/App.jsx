import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState([])      // input text
  const [todos, setTodos] = useState([])    // hold todos array
  const [showFinished, setshowFinished] = useState(true)

  //for local storage
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLocalStorage()

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    // console.log(`ID : ${id}`);
    saveToLocalStorage()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos);
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  return (
    <>
      {/* <Navbar /> */}

      {/* <div className="md:container mx-3 my-5 md:mx-auto rounded-xl p-5 bg-violet-300 min-h-[80vh] md:w-1/2"> */}
      <div className="md:container mx-3 my-5 md:mx-auto rounded-xl p-5 bg-slate-800  min-h-[80vh] md:w-1/2 ">
        <h1 className='text-center font-bold text-2xl font-serif italic underline text-white '>Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4 ">
          <h2 className='text-xl font-bold text-white'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder='Enter your Task' className='w-full rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='text-sm bg-violet-800 hover:bg-violet-950 p-2 py-1 disabled:bg-slate-500 text-white rounded-md  font-bold'>Save</button>
        </div>
        <input onChange={toggleFinished} className='my-3' type="checkbox" checked={showFinished} /> <span className='text-white'>ShowFinished</span> <hr />
        <h2 className='text-xl mt-2 font-bold text-white'>Your Todos</h2>
        <div className="todos ">
          {todos.length == 0 && <div className='m-5 text-white'>No Todos to Display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo md:1/2 flex w-1/2 my-3 justify-between">
              <div className='flex gap-5 text-white'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='text-sm bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='text-sm bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1'><MdDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
     
    </>
  )
}

export default App
