import { ADD_CARD_SUCCESS,ADD_CARD_TO_HISTORY_SUCCESS, DELETE_CARD_SUCCESS, EDIT_CARD_SUCCESS, FETCH_CARDS_SUCCESS, FETCH_HISTORY_SUCCESS } from "../actionTypes";

const initialState = {
  cards: [],
  history:[]
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    case EDIT_CARD_SUCCESS:
      const updatedCards = state.cards.map((card) =>
        card.id === action.payload.id ? { ...card, name: action.payload.name, link: action.payload.link, bucketId: action.payload.bucketId } : card
      );
      return {
        ...state,
        cards: updatedCards,
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload,
      };

    case ADD_CARD_TO_HISTORY_SUCCESS: 
    return {
      ...state, 
      history: [...state.history, action.payload]
    };

    case FETCH_HISTORY_SUCCESS:
      return {
        ...state, 
        history: action.payload
      }
    default:
      return state;
  }
};

export default cardReducer;
