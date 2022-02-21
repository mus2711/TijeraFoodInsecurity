import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Merchant } from "./Merchant";
import { Tag } from "./Tag";

// Join table used to resolve many-many relationship between Merchant and Tag
@Entity()
@ObjectType()
export class MerchantTag extends BaseEntity {
  @PrimaryColumn()
  @Field(() => Int)
  merchantId!: number;

  @PrimaryColumn()
  @Field(() => Int)
  tagId!: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.merchantConnection, {
    primary: true,
  })
  @JoinColumn({ name: "merchantId" })
  merchant!: Promise<Merchant>;

  @ManyToOne(() => Tag, (tag) => tag.tagConnection, {
    primary: true,
  })
  @JoinColumn({ name: "tagId" })
  tag!: Promise<Tag>;

  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;
}
