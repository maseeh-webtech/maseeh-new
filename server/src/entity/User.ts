import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group";
import { RosterEntry } from "./RosterEntry";
import { Permissions } from "../util";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public openid: string;

  @Column()
  public active: boolean;

  @Column()
  public username: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public room: number;

  @ManyToMany((type) => Group)
  @JoinTable()
  public groups: Group[];

  @OneToOne((type) => RosterEntry)
  @JoinTable()
  public rosterEntry: RosterEntry;

  public hasPermission = (permission: Permissions): boolean => {
    return true;
  }
}
