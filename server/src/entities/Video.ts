import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
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
}
