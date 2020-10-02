import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

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
}