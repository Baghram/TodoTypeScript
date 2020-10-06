import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, TableForeignKey, ManyToOne, JoinTable } from "typeorm";
import {User} from './User'

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number

    @Column("varchar", {
        length: 100
    })
    title: string;

    @Column("varchar", {
        length: 250
    })
    description: string;

    @Column("varchar", {
        length: 100
    })
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => User, user=> user.id)
    user: User

    @JoinTable({name: 'username'})
    userDetail: User
}