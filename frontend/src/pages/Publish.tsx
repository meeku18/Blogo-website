import {  useState } from "react"
import { Appbar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Publish = ()=>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();
    async function onClick(){
        try{
            const response =await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content:description
               },{
               headers:{
                   Authorization : `Bearer ${localStorage.getItem('token')}`
               }
           })
           navigate(`/blog/${response.data.blog.id}`);
        }catch(e){
            alert('Unable to post the blog')
        }
        
    }
    return <div>
        <Appbar/>
            <div>
                <input onChange={(e)=> setTitle(e.target.value)} type="text" id="first_name" className="m-4 max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required />
                <textarea onChange={(e)=>setDescription(e.target.value)} id="message" rows={4} className="m-4 max-w-screen-lg   block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Content..."></textarea>
                <button onClick={onClick} type="button" className=" m-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
            </div>
    </div>
}