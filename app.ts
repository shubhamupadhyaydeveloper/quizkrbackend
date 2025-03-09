
import fastify from "fastify";
import 'dotenv/config'
import { winstonLogger } from "./src/utils/logger";
import userRoutes from "./src/routes/upload.route";
import fastifyMultipart from "@fastify/multipart";
// import { connectToDatabase } from "@src/utils/connect";

const app = fastify()
const logger = winstonLogger('Initialize the app', 'info')

app.register(fastifyMultipart,{limits : {fileSize : 10 * 1024 * 1024}})
app.register(userRoutes,{prefix : '/user'})

const startApp = async () => {

//    await connectToDatabase() 

   app.get("/", (request, response) => {
      response.send("hello welcome to fastify app")
   })

   app.listen({ port: 3002,host :'0.0.0.0' }, () => {
      logger.info("🚀 app is listening on port 3002")
   })
} 

startApp(); 