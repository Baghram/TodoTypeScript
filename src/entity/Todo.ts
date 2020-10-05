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
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

    @ManyToOne(type => User, user=> user.id) @JoinTable()
    user: User
}