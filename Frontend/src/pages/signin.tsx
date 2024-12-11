import { useRef } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../config";

export function Signin(){
    const emailRef=useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)
    const navigate=useNavigate();
    async function  handleSignin(){
        const username= emailRef.current?.value;
        const password=passwordRef.current?.value;
        if(!username || !password){
            alert("username and password required")
            return;
        }
        try {
            const response= await axios.post("http://localhost:3000/api/v1/signin",{username,password});
            if(response.data.message === "Sign-in successful"){
                const jwt=response.data.token;
                localStorage.setItem("token",jwt);
                 navigate("/dashboard");
            }
        } catch (error:any) {
            if(error.response.status === 404){
                alert("wrong email or username");
            }
            if(error.response.status === 401){
                alert("wrong password");
            }

          
        }
      
    }

    return (<>
    <h1>username:akash12@gmail.com</h1><br />
    <h1>password:Akash@123</h1>
        <div className="flex justify-center items-center w-full h-screen bg-gray-200">
            <div className="bg-white rounded-xl h-64 min-w-72 sm:min-w-96 flex flex-col gap-4 px-2 py-4 justify-center border-2 border-gray-300 shadow-md">
                <input className="border-2 border-gray-200 p-2" type="text" placeholder="email..." ref={emailRef}/>
                <input className="border-2 border-gray-200 p-2" type="password" placeholder="password" ref={passwordRef}/>
                <Button variant="primary" text="signin" size="md" onClick={handleSignin}/>
            </div>
        </div>
        </>
    )
}