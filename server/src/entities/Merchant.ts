import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  // OneToMany,
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

  @Column()
  @Field()
  cplogo!: string;

  @Column()
  @Field()
  location!: string;

  @Column({ unique: true })
  @Field()
  username!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  password!: string;
  
  @Column()
  @Field()
  imageUrl!: string;

  @Column()
  @Field()
  imageAlt!: string;

  // @OneToMany(() => Review, (review) => review.user)
  // reviews!: Review[];

  // @OneToMany(() => FoodItem, (fooditem) => fooditem.merchant)
  // menulist!: FoodItem[];

  // tags, route
  
  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
