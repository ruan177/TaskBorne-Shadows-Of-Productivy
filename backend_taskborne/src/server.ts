import Fastify from 'fastify';
import cors from '@fastify/cors'
import { Routes } from './routes';
import * as path from 'node:path';
import fastifyStatic from'@fastify/static';
import multer from 'fastify-multer';

export const app = Fastify();

app.register(multer.contentParser);
app.register(cors)
app.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/images/',
  });


app.register(Routes)

app.listen({
    port: 3333,
}).then(()=>{
    console.log('HTTP Server Running')
});

