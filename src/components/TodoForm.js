import React, { useState, useEffect } from 'react'
import shortid from 'shortid';

const TodoForm = () => {
    const [text, setText] = useState("")
    const [todos, setTodos] = useState([])
    const [todoEditing, setTodoEditing] = useState(null)
    const [editingText, setEditingText] = useState("")

    useEffect(()=> {
        const temp = localStorage.getItem("todos")
        const loadedTodos = JSON.parse(temp)

        if (loadedTodos) {
            setTodos(loadedTodos)
        }
    }, [])

    useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const addTodo = t => {
        setTodos([{
            todo: t,
            id: shortid.generate(),
            completed: false,
        }, ...todos])
    }
    
    const strikeThrough = id => {
        const newTodos = [...todos].map((todo)=> {
            if (todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })
    
        setTodos(newTodos)
    }

    const removeTodo = id => {
        const newTodos = [...todos]
        setTodos(newTodos.filter(todo => todo.id  !== id))
        
    }

    const editTodo = id => {
        const newTodos = [...todos].map((todo)=>{
            if(todo.id === id){
                todo.todo = editingText
            }
            return todo
        })
        setTodos(newTodos)
        setTodoEditing(null)
        setEditingText("")
    }


  return (
    <div className='grid justify-center '>
    <div>
        <input 
        value={text}
        className='"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"' placeholder="Enter Todo"
        onChange={(e)=> {
            setText(e.target.value)
        }}
        ></input>
        <button 
        disabled={text.length > 0 ? "" : "true"}
        className='mt-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold w-16 h-10 rounded-sm ml-10'
        onClick={()=> {
            addTodo(text)
            setText('')
        }}
        >Add
        </button>
        </div>
        {todos.map(t => (
            <div className='flex justify-between'>

            {todoEditing === t.id ? (<input 
            className='"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
            value={editingText}
            placeholder = "Update Todo"
            onChange={(e) => setEditingText(e.target.value)}></input>)
            :
            (<div 
            onClick={()=> strikeThrough(t.id)}
            style={{
                textDecoration: t.completed ? "line-through" : ""
            }}
            className='text-xl text-center mb-3 ' 
            key={t.id}>
            {t.todo} 
            </div>)}
            
            {todoEditing === t.id ? (
                <div>
            <button 
            onClick={()=> removeTodo(t.id)}
            className='bg-red-500 hover:bg-red-700 text-white font-bold w-8 rounded h-8 mr-2'
            >X</button>
            <button 
            disabled = {editingText.length > 0 ? "": "true"}
            onClick={()=> editTodo(t.id)}
            className='bg-green-500 hover:bg-green-700 text-white font-bold w-8 rounded h-8 mr-2'
            >✔</button>
            </div>
            ) :
            <div>
            <button 
            onClick={()=> removeTodo(t.id)}
            className='bg-red-500 hover:bg-red-700 text-white font-bold w-8 rounded h-8 mr-2'
            >X</button>
            <button 
            onClick={()=> setTodoEditing(t.id)}
            class="inline-flex items-center justify-center w-9 h-9 mr-2 text-gray-700 transition-colors duration-150 bg-yellow-300 rounded-full focus:shadow-outline hover:bg-yellow-500">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            
            </div>
            }
            
            
            </div>
            
        ))}

        {/* <button onClick={()=> {console.log(todos)}}>Test</button> */}
        </div>
  )
}

export default TodoForm

