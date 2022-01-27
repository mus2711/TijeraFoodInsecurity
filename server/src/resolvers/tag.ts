import { Tag } from "../entities/Tag";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Merchant } from "../entities/Merchant";
import { MerchantTag } from "../entities/MerchantTag";

// Function that capitalises each word in the Tag name
function toTitle(str: string): string {
  return str.replace(
    /\w\S*/g,
    (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()
  );
}

@Resolver(Tag)
export default class TagResolver {
  @Query(() => [Tag])
  tags(): Promise<Tag[]> {
    return Tag.find();
  }

  @Mutation(() => Tag)
  async createTag(@Arg("tagName", () => String) tagName: string): Promise<Tag> {
    const existingTag = await Tag.findOne({ tagName: toTitle(tagName) });
    if (existingTag) throw new Error("Tag already exists.");
    return await Tag.create({ tagName: toTitle(tagName) }).save();
  }

  @Mutation(() => Boolean)
  async deleteTag(
    @Arg("tagName", () => String) tagName: string
  ): Promise<boolean> {
    const tag = await Tag.findOne({ tagName: toTitle(tagName) });
    if (!tag) return false;

    await tag!.remove();
    return true;
  }

  // Returns the merchants with a given tag
  @Query(() => [Merchant])
  async tagMerchants(@Arg("tagId", () => Int) tagId: number) {
    const merchantTags = await MerchantTag.find({
      tagId: tagId,
    });

    let merchants: Merchant[] = [];
    for (const mt of merchantTags) {
      const merchant = await Merchant.findOne({ id: mt.merchantId });
      if (merchant) {
        merchants.push(merchant);
      }
    }

    return merchants;
  }
}
