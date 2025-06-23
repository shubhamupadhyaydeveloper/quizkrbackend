import { Server as SocketIoServer } from "socket.io";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";

const socketIoPlugin = fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

  const io = new SocketIoServer(fastify.server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  })

  fastify.decorate('socket', io)

  io.on('connection',(socket) =>{
      console.log('connection establasied ',socket.id)
      socket.on('Listen' , message => {
         console.log('listen message',message)
      })
  })

  fastify.addHook('onClose', (fastify, done) => {
    io.close()
    done()
  })
})

export default socketIoPlugin