import "reflect-metadata";
import * as Hapi from '@hapi/hapi';
import { createConnection } from 'typeorm';
import userController from './Controller/userController';
import Controller from './Controller/Controller'

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
                console.log(request.headers);
                return {
                    status: 200,
                    message: 'Home Domain Conneccccted!!'
                };
            }
        },
        {
            method: 'POST',
            path: '/register',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => userController.Register(request, response),
        },
        {
            method: 'POST',
            path: '/login',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => userController.Login(request, response)
        },
        {
            method: 'GET',
            path: '/todos',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => Controller.getData(request, response)
        },
        {
            method: 'POST',
            path: '/todos/add',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => Controller.addData(request, response)
        },
        {
            method: 'UPDATE',
            path: `/todos/update/{id}`,
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => Controller.updateData(request, response)
        },
        {
            method: 'DELETE',
            path: `/todos/delete/{id}`,
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => Controller.deleteData(request, response)
        }
    ]);

    const connection = createConnection();
    (await connection).synchronize;

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
