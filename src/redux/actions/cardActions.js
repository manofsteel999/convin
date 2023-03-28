import axios from 'axios';
import {FETCH_CARDS_SUCCESS,ADD_CARD_TO_HISTORY_SUCCESS, FETCH_HISTORY_SUCCESS, FETCH_HISTORY_FAILURE, ADD_CARD_TO_HISTORY_FAILURE, FETCH_CARDS_FAILURE, ADD_CARD_SUCCESS, ADD_CARD_FAILURE, EDIT_CARD_FAILURE, EDIT_CARD_SUCCESS, DELETE_CARD_SUCCESS, DELETE_CARD_FAILURE, MOVE_CARD_SUCCESS, MOVE_CARD_FAILURE} from '../actionTypes';

// Action creators for fetching cardsr
const fetchCardsSuccess = (cards) => {
  return {
    type: FETCH_CARDS_SUCCESS,
    payload: cards
  };
};

const fetchCardsFailure = (error) => {
  return {
    type: FETCH_CARDS_FAILURE,
    error: error
  };
};

export const fetchCards = (bucketID) => {
  return dispatch => {
    axios.get(`https://convin-test-api.onrender.com/cards?bucketId=${bucketID}`)
      .then(response => {
        dispatch(fetchCardsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchCardsFailure(error.message));
      });
  };
};

// Action creators for adding a card
const addCardSuccess = (card) => {
  return {
    type: ADD_CARD_SUCCESS,
    payload: card
  };
};

const addCardFailure = (error) => {
  return {
    type: ADD_CARD_FAILURE,
    error: error
  };
};

export const addCard = (bucketId, cardName, cardUrl) => {
  return dispatch => {
    const newCard = {
      name: cardName,
      url: cardUrl,
      bucketId: bucketId
    };
    axios.post('https://convin-test-api.onrender.com/cards/', newCard)
      .then(response => {
        console.log(response.data); 
        dispatch(addCardSuccess(response.data));
      })
      .catch(error => {
        dispatch(addCardFailure(error.message));
      });
  };
};

const addCardToHistorySuccess = (history) => {
  return {
    type: ADD_CARD_TO_HISTORY_SUCCESS,
    payload: history
  };
};

const addCardToHistoryFailure = (error) => {
  return {
    type: ADD_CARD_TO_HISTORY_FAILURE,
    payload: error
  };
};

export const addCardToHistory = (card, time) => {
  return (dispatch) => {
    axios.post('https://convin-test-api.onrender.com/history', { name: card.name, url: card.url, time: time })
      .then((response) => {
        dispatch(addCardToHistorySuccess(response.data));
      })
      .catch((error) => {
        dispatch(addCardToHistoryFailure(error.message));
      });
  };
};

export const fetchHistorySuccess = (history) => {
  return {
    type: FETCH_HISTORY_SUCCESS,
    payload: history
  };
};

export const fetchHistoryFailure = (error) => {
  return {
    type: FETCH_HISTORY_FAILURE,
    payload: error
  };
};

export const fetchHistory = () => {
  return (dispatch) => {
    axios.get('https://convin-test-api.onrender.com/history')
    .then((response) => {
      dispatch(fetchHistorySuccess(response.data)); 
    })
    .catch((error) => {
      dispatch(fetchHistoryFailure(error.message)); 
    });

  }; 
}; 




// Action creators for editing a card
const editCardSuccess = (card) => {
  return {
    type: EDIT_CARD_SUCCESS,
    payload: card
  };
};

const editCardFailure = (error) => {
  return {
    type: EDIT_CARD_FAILURE,
    error: error
  };
};

export const editCard = (card) => {
  return dispatch => {
    axios.put(`https://convin-test-api.onrender.com/cards/${card.id}`, card)
      .then(response => {
        dispatch(editCardSuccess(response.data));
      })
      .catch(error => {
        dispatch(editCardFailure(error.message));
      });
  };
};

// Action creators for deleting a card
const deleteCardSuccess = (id) => {
  return {
    type: DELETE_CARD_SUCCESS,
    payload: id
  };
};

const deleteCardFailure = (error) => {
  return {
    type: DELETE_CARD_FAILURE,
    error: error
  };
};

export const deleteCard = (id) => {
  return dispatch => {
    axios.delete(`https://convin-test-api.onrender.com/cards/${id}`)
      .then(() => {
        console.log("Card Deleted"); 
        dispatch(deleteCardSuccess(id));
      })
      .catch(error => {
        dispatch(deleteCardFailure(error.message));
      });
  };
};

// Action creators for moving a card to a different bucket
const moveCardSuccess = (card) => {
  return {
    type: MOVE_CARD_SUCCESS,
    card: card
  };
};

const moveCardFailure = (error) => {
  return {
    type: MOVE_CARD_FAILURE,
    error: error
  };
};
// Not implemented in the UI. Written action handlers
export const moveCard = (card, newBucketId) => {
  const updatedCard = { ...card, bucketId: newBucketId };
  return dispatch => {
    axios.put(`https://convin-test-api.onrender.com/cards/${updatedCard.id}`, updatedCard)
      .then(response => {
        dispatch(moveCardSuccess(response.data));
      })
      .catch(error => {
        dispatch(moveCardFailure(error.message));
      });
  };
};
