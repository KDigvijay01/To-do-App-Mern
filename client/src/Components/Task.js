import React, {useEffect, useState} from 'react';
import moment from 'moment';
import './Task.css'

const API_BASE='http://localhost:8000';


const Task=()=> {

    const [todos, setTodos]=useState([]);
    const [newTodo, setNewTodo]=useState("");

    useEffect(()=>{
         GetAlltask()
    },[]);
    const GetAlltask= async ()=>{
         await fetch(API_BASE + '/task')
        .then(response=>response.json())
        .then(data=>setTodos(data))
        .catch(error=>console.error("this is the error",error))
    };


    const addTodo = async ()=>{
        const data = await fetch(API_BASE + '/add',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({item:newTodo})
        }).then(res=>res.json());
        if(data.item.length>=3){
        setTodos([...todos,data])
        setNewTodo("");
        }

    }
    const deleteTodo = async function(todo){
        await fetch(API_BASE + '/delete',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({id:todo.id})   
        }).then(res=>res.json())
        .then(data=>setTodos(todos=>todos.filter(todo=>todo.id !==data.id)))
        .catch(error=>console.error("this is the error in del",error))
       
    }

    return (
        <div>
            <h1><span style={{color:"yellow"}}>WELCOME TO MY TODO APP</span></h1>
            <div className="ui input">
                <input type="text" className="ui basic yellow button" onChange={(e)=>{setNewTodo(e.target.value)}} value={newTodo}></input>
            </div>
            <button type="button" className="ui basic green button" style={{marginLeft:"10px"}} onClick={addTodo}>Submit</button>
            <hr></hr>

            <div className="ui basic green cards">
            {todos.length > 0 ? todos.map(todo=>(
                <div className="card" key={todo.id}>
                    <span style={{color:"green"}}>{moment(todo.created_at).fromNow()}</span>
                    <div className="ui basic blue button" style={{fontSize:"25px"}}>
                        {todo.item}
                    </div>
                    
                    <div className="extra content">
                        <div className="ui two buttons"> 
                            <div className="ui basic yellow button" onClick={()=>deleteTodo(todo)}>Delete</div>
                        </div>
                    
                    </div>
                </div>
                )):""}
            </div>
            <div class="ui olive inverted segment" style={{fontSize:"20px"}}>You Currently  Have {todos.length} Tasks.</div>
        </div>

          
    )
}

export default Task








//  {todos.length > 0 ? todos.map(todo=>(<h3>{todo.item} <hr></hr></h3>)):""}\




// {moment(post.createdAt).fromNow()}