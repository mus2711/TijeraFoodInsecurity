import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  userBasket: [] as {
    picture: string;
    title: string;
    desc: string;
    price: number;
    itemID: string;
  }[],
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
  },
});

export { setGlobalState, useGlobalState };
