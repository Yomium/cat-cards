import { createAction } from 'redux-actions';

export const toggleCardState = createAction('CARD_STATE_TOGGLE');
export const toggleUIHover = createAction('CARD_UI_HOVER_TOGGLE');

export const fetchCardsSuccess = createAction('CARDS_FETCH_SUCCESS');
export const fetchCardsRequest = createAction('CARDS_FETCH_REQUEST');
export const fetchCardsFailure = createAction('CARDS_FETCH_FAILURE');

export const fetchCards = () => (dispatch) => {
  const cards = [
  		{id: 1, type: "с фуа-гра", description:["10 порций", "мышь в подарок"], weight:"0.5", state:"default",},
  		{id: 2, type: "с рыбой", description: ["40 порций", "2 мыши в подарок"], weight:"2", state: "default",},
  		{id: 3, type: "с курой", description: ["100 порций", "5 мышей в подарок", "заказчик доволен"], weight: "5", state: "disabled",},
  	];

  dispatch(fetchCardsRequest());
  try {
    dispatch(fetchCardsSuccess({ cards }));
  } catch (e) {
    dispatch(fetchCardsFailure());
    throw e;
  }
};
