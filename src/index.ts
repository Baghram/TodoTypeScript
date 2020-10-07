import "reflect-metadata";
import 'dotenv/config';
import * as Hapi from '@hapi/hapi';
import * as Jwt from 'hapi-auth-jwt2'
import { createConnection, getConnection } from 'typeorm';
import userController from './Controller/userController';
import Controller from './Controller/Controller'
import { User } from './entity/User'


const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    server.register(Jwt);

    server.auth.strategy('jwt', 'jwt',
        {
            key: process.env.secret,
           
            verifyOptions: {
                algorithms: [
                    'HS256'
                ],
            },
            validate: async (decoded, request, response) => {
                const userDatabase = getConnection().getRepository(User);
                const account = await userDatabase.findOne({
                    where: {
                        username: decoded.email,
                    },
                });
                console.log(decoded);
                if(account) {
                    request.authenticated = account;
                    return {
                        isValid: true,
                    };
                }
                return {
                    isValid: false,
                };
            },
        });

    server.auth.default('jwt');

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
                console.log(request);
                return {
                    status: 200,
                    message: 'Home Domain Conneccccted!!'
                };
            },
            options: {
                auth: false
            }

        },
        {
            method: 'POST',
            path: '/register',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => userController.Register(request, response),
            options: {
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/login',
            handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => userController.Login(request, response),
            options: {
                auth: false,
            },
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
            method: 'PATCH',
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
