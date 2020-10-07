import 'dotenv/config';
import * as Hapi from '@hapi/hapi';
import "reflect-metadata";
import { getConnection } from "typeorm";
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt'
import * as JWT from 'jsonwebtoken'

class userController {
    static async Register(request: Hapi.Request, response: Hapi.ResponseToolkit) {
        let result = false;
        let pass;
        const salt = 10;
        const accountDatabase = getConnection().getRepository(User);
        const encryptPassword = await bcrypt.hash(request.payload.password, salt);
        const isExist = await accountDatabase.findOne({
            where: {
                username: request.payload.username,
            }
        });
        console.log(encryptPassword)
        console.log(isExist)
        if (isExist === undefined) {
            getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([
                    {
                        username: request.payload.username,
                        password: encryptPassword
                    }
                ])
                .execute()
                result = true
        }
        if(result) {
            return response.response({ message: 'Register Success!' }).code(201)
        }
        return response.response({ message: 'Email Registered' }).code(404)
    }

    static async Login(request, response) {
        console.log('masuk login')
        const accountDatabase = getConnection().getRepository(User);

        const account = await accountDatabase.findOne({
            where: {
                username: request.payload.username,
            }
        }).then(async (result) => {
            const compare = await bcrypt.compare(request.payload.password, result.password);
            if (compare) {
                return {
                    status: 1,
                    response: result,
                };
            }

            return {
                status: 0,
                response: result,
            };
        }).catch(err => {
            return {
                status: 0,
                response: err.toString(),
            };
        });
        
        if (account.status === 1) {
            console.log('MASUK IF SUKSES LOGIN')
            const token = JWT.sign({
                userId: account.response.id,
                email: account.response.username
            }, process.env.secret)
            return response.response({
                message: 'Success Login',
                Token: token
            });
        }

        return response.response({
            message: 'Login Failed'
        });
    }
}

export default userController;
