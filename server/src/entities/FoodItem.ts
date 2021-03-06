import { Field, Float, Int, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class FoodItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  itemName!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageAlt?: string;

  @Column("float")
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

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
