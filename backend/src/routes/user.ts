import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign} from "hono/jwt";
import { signupInput ,signinInput } from "@meeku18/medium-common";

export const userRouter  = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()

userRouter.post('/signup', async(c) => {
    const body = await c.req.json();
    const {success}  = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:'Inputs not correct'
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    // zod, hashed the password
    // zod validation
    try{
      const response = await prisma.user.create({
        data:{
          username:body.username,
          password:body.password,
          name:body.name
        }
      })
    const token = await sign({id:response.id},c.env.JWT_SECRET);
    return c.json({jwt:token});
    }catch(e){
      c.status(411);
      return c.text('Invalid')
    } 
})
  
userRouter.post('/signin', async(c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:'Invalid Inputs'
        })
    }
    try{
      const response = await prisma.user.findUnique({
        where:{
          username:body.username,
          password:body.password
        }
      })
      if(!response){
        c.status(403);
        return c.text('Invalid');
      }
      const token = await sign({id:response.id},c.env.JWT_SECRET);
      return c.json({
        jwt:token
      })
    }catch(e){
      c.status(411);
      console.log(e);
      return c.text('Invalid');
    }
})
  