import { blog } from "../hooks"
import { Appbar } from "./AppBar"

export const BlogContent = ({blog}:{blog:blog})=>{
    return<div>
        <Appbar></Appbar>
        <div className="grid grid-cols-1 lg:grid-cols-12 px-20 pt-10 ">
            <div className="col-span-8">
                <div className="text-6xl font-bold">
                    {blog.title}
                </div>
                <div className="pt-2 text-slate-400">{`Posted on ${blog.updatedAt.split('T')[0]}`}</div>
                <div className="pt-3">
                   {blog.content}
                </div>
            </div>
            <div className="col-span-4 pl-4 pt-20 lg:pt-0 ">
                <div className="text-sm text-slate-600">Author</div>
                <div className="flex">
                    <div className="flex flex-col justify-center">
                        <div className="rounded-full w-7 h-7 bg-zinc-200"></div>
                    </div>
                    <div className="pl-4">
                        <div className="font-semibold text-xl">{blog.author.name||"anonymous"}</div>
                        <div className="text-sm text-slate-400">Master of mirth,purveyor of puns, and the funniest person in the kingdom</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}