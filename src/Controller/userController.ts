import * as Hapi from '@hapi/hapi';
import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { User } from '../entity/User';

class userController {
    static Register(request: Hapi.Request, response: Hapi.ResponseToolkit) {
        let account;

        const accountDatabase = getConnection().getRepository(User)
        account = accountDatabase.find({
            where: {
                username: request.headers.username
            }
        })
        if (account === {}) {
            getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([
                    {
                        username: request.headers.username,
                        password: request.headers.password
                    }
                ])
                .execute()
            return response.response({ message: 'Register Success!' }).code(201)
        };
        return response.response({ message: 'Email Registered' }).code(404)
    }
    static Login(request, response) {
    }
}

export default userController;