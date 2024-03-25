import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { parseSigned } from 'hono/utils/cookie';
import { use } from 'hono/jsx';
import { verify,decode,sign } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  }
}>();
app.use('/*', cors());
app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);


export default app
