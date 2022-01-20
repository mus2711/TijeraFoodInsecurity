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
  location?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageAlt?: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @Column({ type: "int", default: 0 })
  @Field()
  reviewCount!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  averageRating?: number;

  // @OneToMany(() => FoodItem, (fooditem) => fooditem.merchant)
  // menulist!: FoodItem[];

  // tags

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
