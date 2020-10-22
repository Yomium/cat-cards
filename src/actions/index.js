import { createAction } from 'redux-actions';

export const toggleCardState = createAction('CARD_STATE_TOGGLE');
export const toggleUIHover = createAction('CARD_UI_HOVER_TOGGLE');

export const fetchCardsSuccess = createAction('CARDS_FETCH_SUCCESS');
export const fetchCardsRequest = createAction('CARDS_FETCH_REQUEST');
export const fetchCardsFailure = createAction('CARDS_FETCH_FAILURE');

export const fetchCards = (cards) => (dispatch) => {
  dispatch(fetchCardsRequest());
  try {
    dispatch(fetchCardsSuccess({ cards }));
  } catch (e) {
    dispatch(fetchCardsFailure());
    throw e;
  }
};
