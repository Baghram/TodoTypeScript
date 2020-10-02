import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Todo { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    title: string;

    @Column({
        length: 250
    })
    description: string;

    @Column({
        length: 100
    })
    status: string

    @CreateDateColumn()
    createdAt: string
}