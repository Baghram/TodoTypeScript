import { decode } from "punycode";
import "reflect-metadata";
import { getConnection, Repository } from "typeorm";
import { Todo } from '../entity/Todo';
import {User} from '../entity/User'

class Controller {
    static async getData(request, response) { //tested
        const todoDatabase = getConnection().getRepository(Todo);
        const Todos = await todoDatabase.find({
            where: {
                userId: request.authenticated.id
            },
            relations: ['user']
        });
        let Data = Todos
        for(let i = 0; i < Todos.length; i++) {
            delete Data[i].user.password
            delete Data[i].user.id
        }      
        if (Todos) {
            return response.response({
                message: 'Get Data Success',
                data: Data,
            }).code(200);
        }
        return response.response({
            message: 'Failed Get Data'
        }).code(404)


    };
    static async addData(request, response) { //tested success(cannot add data if 1 missing)
        console.log('masuk add Data')
        const todoDatabase = getConnection().getRepository(Todo);
        const addTodos = await todoDatabase.insert({
            userId: request.authenticated.id,
            title: request.payload.title,
            description: request.payload.description,
            status: request.payload.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log(addTodos);
        return response.response({
            message: 'add Task Success!'
        }).code(201);

    };
    static async updateData(request, response) { //tested
        const todoDatabase = getConnection().getRepository(Todo);
        const getTodos = await todoDatabase.findOne({
            where: {
                id: request.params.id,
            }
        });
        if(getTodos.userId === request.authenticated.id){
            const updateTodos = await todoDatabase.update(request.params.id , {
                title: request.payload.title,
                description: request.payload.description,
                status: request.payload.status,
                createdAt: getTodos.createdAt,
                updatedAt: new Date()
            });
            return response.response({
                message: 'Update Success!!'
            }).code(200)
        }
        return response.response({
            message: 'Update Error!!'
        }).code(404)

    };
    static async deleteData(request, response) { //tested
        const todoDatabase = getConnection().getRepository(Todo);
        const getTodos = await todoDatabase.findOne({
            where: {
                id: request.params.id,
            }
        });
        if(getTodos.userId === request.authenticated.id) {
            const deleteTodos = await todoDatabase.delete(request.params.id)
            return response.response({
                message: 'Delete Success!!'
            }).code(200)
        };
        return response.response({
            message: 'Delete Error!!'
        }).code(404)
        
    };
}

export default Controller;