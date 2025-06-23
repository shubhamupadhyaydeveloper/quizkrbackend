import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import {Server} from 'socket.io'

declare module 'fastify' {
    interface FastifyInstance  {
         socket : Server
    }
}