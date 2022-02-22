// Join table used to resolve many-many relationship between User and Video

import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
@ObjectType()
export class UserVideo extends BaseEntity {
  @PrimaryColumn()
  @Field(() => Int)
  userId!: number;

  @PrimaryColumn()
  @Field(() => Int)
  videoId!: number;

  @ManyToOne(() => User, (user) => user.userConnection, {
    primary: true,
  })
  @JoinColumn({ name: "userId" })
  user!: Promise<User>;

  @ManyToOne(() => Video, (video) => video.videoConnection, {
    primary: true,
  })
  @JoinColumn({ name: "videoId" })
  video!: Promise<Video>;

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
