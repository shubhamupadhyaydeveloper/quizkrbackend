
import fastify from "fastify";
import 'dotenv/config'
import { winstonLogger } from "./utils/logger";
import userRoutes from "./routes/upload.route";
import fastifyMultipart from "@fastify/multipart";

const app = fastify()
const logger = winstonLogger('Initialize the app', 'info')

app.register(fastifyMultipart,{limits : {fileSize : 10 * 1024 * 1024}})
app.register(userRoutes,{prefix : '/user'})

const startApp = async () => {

//    await connectToDatabase() 

   app.get("/", (request, response) => {
      response.send("hello welcome to fastify app")
   })

   app.get('/api',(req,res) => {
       res.send("hi this is api")
   })

   app.listen({ port: 3002,host :'0.0.0.0' }, () => {
      logger.info("🚀 app is listening on port 3002")
   })
} 

startApp(); 