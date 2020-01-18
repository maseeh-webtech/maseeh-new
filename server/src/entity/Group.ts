import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permissions } from "./Permissions";
import { User } from "./User";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany((type) => User)
    public users: User[];

    @OneToOne((type) => Permissions)
    @JoinColumn()
    public permissions: Permissions;
}
