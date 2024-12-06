import { useRef } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../config";

export function Signup(){
    const emailRef=useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)
    const navigate=useNavigate()
    async function  handleSignup(){
        const username=emailRef.current?.value;
        const password=passwordRef.current?.value;
        await axios.post("http://localhost:3000/api/v1/signup",{username,password})
        navigate("/signin");
    }
    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-200">
            <div className="bg-white rounded-xl h-64 min-w-72 sm:min-w-96 flex flex-col gap-4 px-2 py-4 justify-center border-2 border-gray-300 shadow-md">
                <input className="border-2 border-gray-200 p-2" type="text" placeholder="email..." ref={emailRef}/>
                <input className="border-2 border-gray-200 p-2" type="text" placeholder="password" ref={passwordRef}/>
                <Button variant="primary" text="signup" size="md" onClick={handleSignup}/>
            </div>
        </div>
    )
}