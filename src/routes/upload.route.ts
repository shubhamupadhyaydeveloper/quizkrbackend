import {FastifyInstance} from 'fastify'
import { MultipartFile } from '@fastify/multipart';
import pdfParse from 'pdf-parse'

type postRoute = {
      Body : {
         name : string,
         email : string
      }
}

const userRoutes = async (fastify:FastifyInstance) => {
   fastify.post('/upload',async (request,reply) => {
        console.log('data received')
        const data : MultipartFile | undefined = await request.file()
        const createBuffer = await data?.toBuffer()
        
        const parsedData = await pdfParse(createBuffer!)

        const correctFormat = {
            numPages : parsedData?.numpages,
            title : parsedData?.info.Title,
            author : parsedData?.info.Author,
            text : parsedData?.text 
        }
        
        return { data : correctFormat}
   })
 
   fastify.post<postRoute>("/users", async (request, reply) => {
    const { name } = request.body;
    return { message: `User ${name} created` }; 
  });
} 

export default userRoutes