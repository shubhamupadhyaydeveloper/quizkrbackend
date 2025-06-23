import { FastifyInstance } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import pdfParse from 'pdf-parse';

type postRoute = {
  Body: {
    name: string;
    email: string;
  };
};

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/upload', async (request, reply) => {
    const data: MultipartFile | undefined = await request.file();
    const createBuffer = await data?.toBuffer();

    const parsedData = await pdfParse(createBuffer!);

    const correctFormat = {
      numPages: parsedData?.numpages,
      title: parsedData?.info.Title,
      author: parsedData?.info.Author,
      text: parsedData?.text,
    };

    return { data: correctFormat };
  });

  fastify.get('/', (req, reply) => {
    reply.send('this is home user route');
  });

  fastify.post<postRoute>('/users', async (request, reply) => {
    const { name } = request.body;
    return { message: `User ${name} created` };
  });

  fastify.get('/notification', (req, reply) => {
    fastify.socket.emit('notification', { message: 'Hello, how are you developer?' });
    reply.send({ success: true });
  });

};

export default userRoutes;
