import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  userBasket: [] as string[],
});

export { setGlobalState, useGlobalState };
