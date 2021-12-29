import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  userBasket: [] as {
    picture: string;
    title: string;
    desc: string;
    price: number;
    itemID: string;
  }[],
});

export { setGlobalState, useGlobalState };
