import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName :string,
    title:string,
    content :string,
    publishedDate:string,
    id:number
}
export const BlogCard =({
    authorName,
    title,
    content,
    publishedDate,
    id
 }:BlogCardProps)=>{

    return <Link to={`/blog/${id}`}>
        <div className="p-4 w-screen max-w-screen-lg cursor-pointer">
            <div className="border-b border-slate-300">
                <div className="flex">
                    <div >
                        <Avatar name={authorName} size={"small"}/>
                    </div>
                    <div className="pl-2 flex flex-col justify-center text-sm text-slate-600">
                        {authorName}
                    </div>
                    <div className="pl-2 flex flex-col justify-center ">
                        <div className="h-0.5 w-0.5 rounded-full bg-gray-500">
                        </div>
                    </div>
                    <div className="flex flex-col justify-center pl-1 text-sm text-slate-500 font-extralight">
                        {publishedDate}
                    </div>
                </div>
                <div className="pt-2 text-lg font-extrabold">
                {title}
                </div>
                <div className="pt-1 text-base">
                    {content.slice(0,200)+"..."}
                </div>
                <div className="pt-5 text-sm font-extralight text-slate-400">
                    {` ${Math.ceil(content.length/100)}  min read`}
                </div>
            </div>
        </div>
    </Link>

}
export function Avatar ({name,size}:{name:string,size:"big"|"small"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?'w-6 h-6':'w-10 h-10'} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-medium text-gray-600 dark:text-gray-300 text-${size==="small"?"xs":"lg"}`}>{name[0].toLocaleUpperCase()}</span>
    </div>
}