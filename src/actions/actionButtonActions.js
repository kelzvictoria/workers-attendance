import { OPEN_ACTIONS_BUTTON, CLOSE_ACTIONS_BUTTON } from "./types";

export const openActionsButton = () => {
  return {
    type: OPEN_ACTIONS_BUTTON,
  };
};

export const closeActionsButton = () => {
  return {
    type: CLOSE_ACTIONS_BUTTON,
  };
};
