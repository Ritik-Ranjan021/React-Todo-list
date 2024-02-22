import React from 'react'
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";



function App() {


  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString  = localStorage.getItem("todos")
    if(todoString){
      let todos =JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  

  const saveToLs = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setShowFinished(!ShowFinished)
  }
  
  

  const handelEdit =  (e, id) => {
    let t = todos.filter(i=>i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    
    setTodos(newTodos)
    saveToLs()

  };



  const handeldelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    
    setTodos(newTodos)
    saveToLs()
  };




  const handleAdd = (e,) => {
    setTodos([...todos, {id: uuidv4(),todo, isCompleted: false}])
    setTodo("");
  };
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
    saveToLs()
  }

  const handleCheckbox =(e) => {    
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs()
  }
  
  return (
    <>
      <Navbar />
      <div className="mx-3 container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>Timely task manager</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full px-5 py-1 "
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<=1}
            className="bg-violet-800 disabled:bg-violet-400 hover:bg-violet-950 text-white p-2 py-1 text-sm font-bold rounded-md  mx-2"
          >
            Save
          </button>
          </div>
        </div>
        <input id='show' className='my-4' type="checkbox" onChange={toggleFinished} checked={ShowFinished} />
        <label className='mx-2' htmlFor="show"> Show finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to Display</div>}
        {todos.map(item=>{
            return (ShowFinished || !item.isCompleted) &&<div key={item.id} className="todo flex justify-between md:w-1/2 my-3">
             <div className='flex '> 
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id=''/>
                <div className={item.isCompleted?"line-through":""} >
                  {item.todo}
                </div></div> 
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {handelEdit(e,item.id)}}
                    className="bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 text-sm font-bold rounded-md mx-1"
                  >
                    <FaRegEdit />

                  </button>
                  <button
                    onClick={(e) => {handeldelete(e,item.id)}}
                    className="bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 text-sm font-bold rounded-md mx-1"
                  >
                    <RiDeleteBin5Fill />

                  </button>
                </div>
              </div>
        
          })}
        </div>
      </div>
    </>
  );
}

export default App;
