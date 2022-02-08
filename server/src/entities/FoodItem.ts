import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Merchant } from "./Merchant";
import { OrderItem } from "./OrderItem";

@ObjectType()
@Entity()
export class FoodItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  itemName!: string;

  @Column()
  @Field()
  imageUrl!: string;

  @Column()
  @Field()
  imageAlt!: string;

  @Column()
  @Field(() => Float)
  cost!: number;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  stock!: number;

  @Column()
  @Field()
  merchantId!: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.menulist)
  @Field(() => Merchant)
  merchant!: Merchant;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems!: OrderItem[];
}
