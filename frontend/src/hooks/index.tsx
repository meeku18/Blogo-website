import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface blog{
    id:number,
    title :string,
    content:string,
    author:{
        name:string
    },
    updatedAt:string 
}
export const useBlog= ({id}:{id:string|undefined})=>{

    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response)=>{
            setBlog(response.data.blog);
            setLoading(false);
        })
    },[id])
    return {
        loading,
        blog
    }
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
    const [blogs,setblogs] = useState<blog[]>([]);

    useEffect(()=>{
        // api call krna hai
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then((response)=>{
                setblogs(response.data.blog);
                console.log(blogs);
                setLoading(false);
            })
    },[])
    return {
        loading,
        blogs
    }
}