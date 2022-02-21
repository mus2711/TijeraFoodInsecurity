import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FoodItem } from "./FoodItem";
import { MerchantTag } from "./MerchantTag";
import { Order } from "./Order";
import { Review } from "./Review";

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  cplogo?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageAlt?: string;

  @Column("float", { nullable: true })
  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Column("float", { nullable: true })
  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address1?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address2?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  postcode?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country?: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @Column({ type: "int", default: 0 })
  @Field()
  reviewCount!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  averageRating?: number;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => FoodItem, (fooditem) => fooditem.merchant)
  menulist!: FoodItem[];

  @OneToMany(() => MerchantTag, (mt) => mt.merchant)
  merchantConnection!: Promise<MerchantTag[]>;

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
