import { FastifyInstance } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import pdfParse from 'pdf-parse';
import { request } from 'http';
import { recognize } from 'tesseract.js'

type postRoute = {
  Body: {
    name: string;
    email: string;
  };
};

const config = {
  lang: 'eng',  // Language of OCR
  oem: 1,       // OCR Engine mode
  psm: 3        // Page segmentation mode
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

    reply.send({ data: correctFormat })
  });

  fastify.post('/ocr', async (request, reply) => {
    try {
      const data = await request.file();
      if (data) {
        const buffer = await data.toBuffer();

        const { data: { text } } = await recognize(
          buffer,
          'eng',
        )

        reply.send({ data: text })
      }
    } catch (error) {
      console.error('OCR error:', error);
      return reply.status(500).send({ error: 'OCR processing failed' });
    }
  });


  fastify.get('/', (req, reply) => {
    reply.send('this is home user route');
  });


};

export default userRoutes;
