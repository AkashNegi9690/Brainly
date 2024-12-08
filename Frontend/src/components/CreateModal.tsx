import { useRef } from "react";
import { Button } from "./Button";
import axios from "axios";
enum ContentType {
    Youtube="youtube",
    Twitter="twitter"
  }
interface Modalprops{
    onclick:()=>void,
    type:ContentType,
    setType:React.Dispatch<React.SetStateAction<ContentType>>
}
export function Modal(props:Modalprops){
    const titleref=useRef<HTMLInputElement | null>(null);
    const linkref=useRef<HTMLInputElement | null>(null);
    async function addContent(){
        const title=titleref.current?.value;
        const link=linkref.current?.value;
        const type=props.type;
        await axios.post("http://localhost:3000/api/v1/content",{
            title,link,type
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        props.onclick();
    }
    return <div className="fixed top-0 left-0 flex justify-center items-center bg-white/20 backdrop-blur-sm w-full h-screen z-50    ">
        <div className="flex flex-col justify-center items-center gap-5 bg-white h-96 min-w-72 rounded-lg border-2 border-gray-300 shadow-md">
        <div className="" onClick={props.onclick}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black" className="dark:fill:white"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></div>
        <div className=""><input ref={titleref} className="border-2 border-gray-200 p-2 rounded-md " type="text" placeholder="title..."/></div>
        <div><input ref={linkref} className="border-2 border-gray-200 p-2 rounded-md" type="text" placeholder="link..." /></div>
        <div className="flex gap-2">
            <Button text="Youtube" size="md" variant={props.type === ContentType.Youtube ? 
                "primary":"secondary"} onClick={()=>{
                    props.setType(ContentType.Youtube)
                }}/>
                 <Button text="Twitter" size="md" variant={props.type === ContentType.Twitter ? 
                "primary":"secondary"} onClick={()=>{
                    props.setType(ContentType.Twitter)
                }}/>
        </div>
        <Button variant="primary" text="create" size="md" onClick={addContent}/>
        </div>
    </div>
}