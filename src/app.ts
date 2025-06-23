import fastify from "fastify";
import 'dotenv/config'
import { winstonLogger } from "./utils/logger";
import userRoutes from "./routes/upload.route";
import fastifySensible from "@fastify/sensible";
import fastifyMultipart from "@fastify/multipart";
import cors from '@fastify/cors'
import fastifyJwt from "@fastify/jwt";
import socketIoPlugin from "./plugins/socket";

const app = fastify({ logger: true })
const logger = winstonLogger('Initialize the app', 'info')

// Register your plugins and routes
app.register(fastifySensible)
app.register(fastifyMultipart)
app.register(fastifyJwt, { secret: process.env.JWT_TOKEN as string })
app.register(socketIoPlugin)
app.register(userRoutes, { prefix: '/user' })
app.register(cors, { origin: "*" })

app.get('/', async (req, reply) => {
   return { message: 'Fastify + Socket.IO is running!' };
});

app.get('/api', async (req, reply) => {
   reply.send("hi this is api")
});

// Start Fastify server and get the underlying HTTP server
const start = async () => {
   try {
      const address = await app.listen({ port: 3002 ,  })
   } catch (err) {
      app.log.error(err)
      process.exit(1)
   }
}

start();
