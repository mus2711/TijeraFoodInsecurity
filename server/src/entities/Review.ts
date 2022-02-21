import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Merchant } from "./Merchant";
import { User } from "./User";

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @PrimaryColumn()
  userId!: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @Field(() => User)
  user!: User;

  @PrimaryColumn()
  merchantId!: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.reviews)
  @Field(() => Merchant)
  merchant!: Merchant;

  @Column()
  @Field()
  comment!: string;

  @Column()
  @Field()
  rating!: number;

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
