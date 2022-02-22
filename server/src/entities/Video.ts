import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserVideo } from "./UserVideo";

@ObjectType()
@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  videoUrl!: string;

  @Column()
  @Field()
  tokens!: number;

  @OneToMany(() => UserVideo, (uv) => uv.video)
  videoConnection!: Promise<UserVideo[]>;

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
