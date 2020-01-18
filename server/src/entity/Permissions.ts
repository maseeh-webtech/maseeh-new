import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public resident: boolean;

  @Column()
  public superuser: boolean;

  @Column()
  public voter: boolean;
}
