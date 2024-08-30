import express from 'express';
import { router } from './router';

const server = express();

server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ limit: '10mb', extended: true }));
server.use(express.json());
server.use(router);

export default server;
