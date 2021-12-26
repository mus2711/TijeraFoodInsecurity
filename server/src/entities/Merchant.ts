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

@Entity()
@ObjectType()
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ unique: true })
  @Field()
  cpname!: string;

  @Column({ unique: true })
  @Field()
  username!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  password!: string;

  // @OneToMany(() => Post, (post) => post.creator)
  // @Field(() => Post)
  // posts!: Post[];

  // @OneToMany(() => Upvote, (upvote) => upvote.user)
  // upvotes!: Upvote[];

  // @OneToMany(() => Upvote, (upvote) => upvote.user)
  // comments!: Comment[];

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
