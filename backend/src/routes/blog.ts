import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClientExtends } from "@prisma/client/extension";
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@meeku18/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string;
    }
}>()

blogRouter.use('/*',async(c,next)=>{
    // extract the user id
    // send to the next function/route handler using next
    const authHeader = c.req.header('authorization');
    const token = authHeader?.split(' ')[1]||' ';
    try{
        const user = await verify(token,c.env.JWT_SECRET);

        if(user){
            c.set('userId',user.id);
            await next();
        }else{
            c.status(403); // unauthorized
            return c.json({
                msg:'Invalid Token'
            })
        }
    }catch(err){
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
})

blogRouter.post('/', async(c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Invalid input"
        })
    }
    const authorId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:parseInt(authorId)
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        console.log(e);
        c.status(411);
        return c.json({
            msg:"Error while posting"
        })
    }
})  

blogRouter.put('/', async(c) => {
   const body = await c.req.json();
   const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Invalid input"
        })
    }
   const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
   }).$extends(withAccelerate());
   try{
    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content :body.content
        }
    })
    return c.json({
        blog
    })
   }catch(e){
    c.status(411);
    return c.json({
        msg:'Error while updating'
    })
   }
})

// pagination => needed 
blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.blog.findMany({
            select:{
                id:true,
                content:true,
                title:true,
                updatedAt:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
            blog
        })
    }catch(e){
        return c.json({
            e
        })
    }
})

blogRouter.get('/:id',async(c)=>{
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id:Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                },
                updatedAt:true
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        c.status(411);
        return c.json({
            msg:e
        })
    }
})