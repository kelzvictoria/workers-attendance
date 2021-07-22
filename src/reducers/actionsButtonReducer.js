import { OPEN_ACTIONS_BUTTON, CLOSE_ACTIONS_BUTTON } from "../actions/types";

const initialState = {
  actions: [
    {
      isActionsOpen: false,
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_ACTIONS_BUTTON:
      return {
        ...state,
        actions: state.actions.isActionsOpen,
      };
    case CLOSE_ACTIONS_BUTTON:
      return {
        ...state,
      };
    default:
      return state;
  }
}
