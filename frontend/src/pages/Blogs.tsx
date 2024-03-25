import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();

    console.log(blogs);
    if(loading){
        // add a skeleton here
        return <div>
            ...loading
        </div>
    }

    return<div>
        <Appbar/>
        <div className="flex justify-center">
            <div>
                {blogs && blogs.map(blog => <BlogCard id={blog.id} authorName={blog.author.name||"Anonymous"} title={blog.title} content={blog.content} publishedDate={blog.updatedAt.split('T')[0]}
                ></BlogCard>)}
            </div>
        </div>
    </div>
}