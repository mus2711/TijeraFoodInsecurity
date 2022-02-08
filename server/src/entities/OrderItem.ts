import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { FoodItem } from "./FoodItem";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryColumn()
  @Field()
  orderId!: number;

  @PrimaryColumn()
  @Field()
  foodItemId!: number;

  @Column()
  @Field()
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: "CASCADE" })
  @Field(() => Order)
  order!: Order;

  @ManyToOne(() => FoodItem, (foodItem) => foodItem.orderItems, {
    onDelete: "CASCADE",
  })
  @Field(() => FoodItem)
  foodItem!: FoodItem;
}
