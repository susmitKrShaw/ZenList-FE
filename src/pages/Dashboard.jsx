import { useEffect, useRef, useState } from "react";
import { MyDayIcon,ImportantIcon, Planned, TasksIcon, MenuIcon} from "./Icons";
import ZenListLogo from '../assets/ZenListLogo.svg'  
import axios from "axios";

export function Dashboard(){
    const [todo, setTodo] = useState([]);
    const [username, setUsername] = useState("");
    const inputRef = useRef();

    useEffect(()=>{
        async function fetchTodos() {
            const response = await axios.get("http://localhost:3000/todos",{
                headers:{
                    "Authorization" : localStorage.getItem("token")
                }
            })
            console.log("Response data:", response.data)
            setTodo( response.data.todos);
            console.log(response.data.username);
            
            setUsername(response.data.username) ;
        }
        fetchTodos();
    },[])
  
    const addTodo = async () => {
        if(inputRef.current.value === ""){
            alert("Add a task");
            return;
        }else {
            try {
                const response = await axios.post("http://localhost:3000/addtodo",{
                title :  inputRef.current.value
            },{
                headers:{
                    "Authorization" : localStorage.getItem("token")
                }
            })
            setTodo([...todo, response.data.newTodo]);
            inputRef.current.value = ""
            inputRef.current.focus();
            } catch (error) {
                alert(error.response?.data?.message || "Error adding todo");
            }
        }
    }    

    const deleteTodo = async (todoToDelete) => {
        const newtodo = todo.filter(item => item._id !== todoToDelete) 
        setTodo(newtodo); 
        const response = await axios.delete("http://localhost:3000/deletetodo",{
            data: {_id : todoToDelete},
            headers:{
                "Authorization" : localStorage.getItem("token")
            }
        })
         
        }
     
    const onKeyPress = (event) => {
        if(event.key === "Enter"){
            addTodo();
        }
    }    
      

    return(
    <div>
        <div className="w-full h-12 bg-orange-500 text-white text-2xl flex items-center pl-10">
        <img src={ZenListLogo} alt="ZenList Logo" className="h-10"/>
        ZenList
        </div> 
        <div className="flex">
            {/*SideBar*/}
            <div className="h-screen w-72 bg-blue-400 pl-4">
                <div>
                    <div className="pl-6 pb-4 pt-4  cursor-pointer">
                    {<MenuIcon/>}
                    </div>
                    <SideBarItem icon={<MyDayIcon/>} text={"My Day"} />
                    <SideBarItem icon={<ImportantIcon/>} text={"Important"} />
                    <SideBarItem icon={<Planned/>} text={"Planned"} />
                    <SideBarItem icon={<TasksIcon/>} text={"Tasks"} />
                </div>
            </div>
            {/*MainComp*/}
            <div className="bg-gray-200 w-full pl-8 "> 
                <div className="text-3xl mb-4">
                    Hello, {username}
                </div>
                <input ref={inputRef}  onKeyPress={onKeyPress} type="text" placeholder="Add a Task.."className='bg-red-200 w-4/5 h-10 rounded-s-lg pl-3 mb-8' />
                <button onClick={addTodo}className="bg-orange-500 h-10 px-2 rounded-e-lg">Add Todo</button>
                <div >
                    {todo.map((TodoItem)=> {
                    return (
                        <div className="flex" key={TodoItem._id} >
                        <div className="bg-slate-200 w-4/5 h-12 rounded-s-lg mb-6 pl-3 text-lg flex items-center">
                            {TodoItem.title}
                        </div>
                        <button onClick={() => deleteTodo(TodoItem._id)} className="bg-orange-500 px-6 h-12 rounded-e-lg">Done</button>
                        </div>
                    )})}
                </div>
            </div>
        </div>   
        
    </div>
    )
}

function SideBarItem({icon, text}){
    return(
        <div className="flex text-lg items-center gap-4 mb-4 pb-1 pl-6 cursor-pointer transition-all hover:bg-slate-200 w-52 rounded-md">
            <div>
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}