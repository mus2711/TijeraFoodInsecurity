import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  userBasket: [] as {
    merchantId: number;
    imageUrl: string;
    itemName: string;
    description: string;
    cost: number;
    itemID: number;
  }[],
  basketMerchant: 0,
  reviewRes: {} as {
    imageUrl: string;
    imageAlt: string;
    name: string;
    reviewCount: number;
    rating: number;
    cuisine?: string[];
    location?: string;
    merchantID?: number;
    avatarlogo?: string;
    key?: number;
    modal?: boolean;
    id: number;
  },
});

export { setGlobalState, useGlobalState };
