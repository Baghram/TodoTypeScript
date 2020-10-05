import "reflect-metadata";
import { getConnection } from "typeorm";
import { Todo } from '../entity/Todo';

class Controller {
    static async getData(request, response) {
        const todoDatabase = getConnection().getRepository(Todo);
        console.log(request.authenticated);
        const Todos = await todoDatabase.find({
            where: {
                userId: request.authenticated.id
            }
        });
        if (Todos) {
            return response.response({
                message: 'Get Data Success',
                data: Todos,
            }).code(200);
        }
        return response.response({
            message: 'Failed Get Data'
        }).code(404)


    };
    static updateData(request, response) {

    };
    static deleteData(request, response) {

    };
    static addData(request, response) {

    };
}

export default Controller;