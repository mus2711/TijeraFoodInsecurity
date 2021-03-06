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
import { Order } from "./Order";
import { Review } from "./Review";
import { UserVideo } from "./UserVideo";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  firstname!: string;

  @Column()
  @Field()
  lastname!: string;

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
  income?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dependents?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dob?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  maxTokens?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  currentTokens?: number;

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

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => UserVideo, (uv) => uv.user)
  userConnection!: Promise<UserVideo[]>;

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
