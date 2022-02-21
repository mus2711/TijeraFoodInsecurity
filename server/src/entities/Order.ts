import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Merchant } from "./Merchant";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  userId!: number;

  @Column()
  @Field()
  merchantId!: number;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Merchant, (merchant) => merchant.orders)
  @Field(() => Merchant)
  merchant!: Merchant;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cost?: number;

  @Column()
  @Field()
  isComplete!: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems!: OrderItem[];

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
