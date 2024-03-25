import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { BlogContent } from "../components/BlogContent";

// i should use recoil to store the blog
export const Blog=()=>{
    const {id} = useParams();
    const {loading,blog} = useBlog({id});
    if(loading||!blog){
        return <div>
            ...loading
        </div>
    }
    return <div>
        <BlogContent blog={blog}></BlogContent>
    </div>
}