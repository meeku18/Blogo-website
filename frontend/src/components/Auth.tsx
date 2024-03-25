import { ChangeEvent, useState } from "react";
import { SignupInput } from "@meeku18/medium-common";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import axios from "axios";
export const Auth = ({type}:{type:"signin"|"signup"})=>{
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        username:"",
        password:"",
        name:""
    })
    async function sendRequest(){
       try{
        console.log(postInputs);
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=='signin'?'signin':'signup'}`,postInputs);
        const jwt = response.data.jwt;
        localStorage.setItem('token',jwt);
        navigate('/blogs');
       }catch(e){
            alert('Error while signing up')
        console.log(e);
       }
    }
    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-bold">
                       { type==='signin'?'Login your account':'Create an Account'}
                    </div>
                    <div className="text-slate-400 ml-2">
                       {type==="signin"?"Don't have an account?":" Already have an account?" }
                        <Link className="pl-2 underline" to={type==='signup'?'/signin':'/'}>
                           {type==="signin"?'Sign up':'Sign in'}
                        </Link>
                    </div>
                </div>
                <div>
                    {type=='signup' &&<LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=>{
                            setPostInputs((c)=>({
                                ...c,
                                name:e.target.value
                            }))
                        }}>
                    </LabelledInput>}
                    <LabelledInput label="Username" placeholder="hrishabhjais18@gmail.com" onChange={(e)=>{
                            setPostInputs((c)=>({
                                ...c,
                                username:e.target.value
                            }))
                        }}>
                    </LabelledInput>
                    <LabelledInput label="Password" placeholder="123456" type="password" onChange={(e)=>{
                            setPostInputs((c)=>({
                                ...c,
                                password:e.target.value
                            }))
                        }}>
                    </LabelledInput>
                </div>
                <div className="mt-8 flex justify-center">
                    <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        {type==='signin'?"Sign in":"Sign up"}
                    </button>
                </div>
            </div>
        </div>
    </div>
}
interface LabelledInputType {
    label : string;
    placeholder : string;
    onChange: (e:ChangeEvent<HTMLInputElement>)=> void;
    type?:string;
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType) {
    return <div>
        <label className=" mt-4 block mb-2  font-semibold text-gray-900">{label}</label>
        <input onChange={onChange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}