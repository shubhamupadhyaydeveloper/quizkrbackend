import {FastifyInstance} from 'fastify'
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
        const data = await request.file()
        const createBuffer = await data?.toBuffer()

        
        const parsedData = await pdfParse(createBuffer!)

        console.log('this is parsed data',parsedData)
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