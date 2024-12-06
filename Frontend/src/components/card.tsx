
interface CardProps {
    title: string,
    type: "youtube" | "document" | "twitter",
    url:string
}
export function Card({ title, type,url }: CardProps) {
  

    return (
        <div className=" w-80 border-2 border-gray-200 min-h-96 rounded-2xl p-5 flex flex-col gap-4 justify-start">
            <div>Created on </div>
            <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m380-300 280-180-280-180v360ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" /></svg>
                    <div className="">{title}</div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
            </div>
            <div>
                {type === "youtube" && <iframe className="w-full" src={url.replace("watch","embed").replace("?v=","/")}
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
                     picture-in-picture;
                     web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={url.replace("x.com","twitter.com")}></a>
                </blockquote>}
            </div>
            <div className="">
                Created on 
            </div>
        </div>
    )
}