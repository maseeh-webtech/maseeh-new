import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roster")
export class RosterEntry {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public room: number;
}
