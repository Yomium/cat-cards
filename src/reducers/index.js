import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const cards = handleActions({
  [actions.fetchCardsSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.cards, 'id'),
      allIds: payload.cards.map((card) => card.id),
    };
  },
  [actions.toggleCardState](state, { payload: { id } }) {
    const card = state.byId[id];
    const mapping = {
      default: 'selected',
      selected: 'default',
      disabled: 'disabled',
    }
    
    return {
      ...state,
      byId: { ...state.byId, [card.id]: { ...card, state: mapping[card.state] } },
    }
  }
}, { byId: {}, allIds: [] });

const cardsUIState = handleActions({
  [actions.fetchCardsSuccess](state, { payload }) {
    return _.keyBy(payload.cardsUIState, 'id');
  },
  [actions.toggleCardState](state, { payload: { id } }) {
    const currentState = state[id].state;
    const mapping = {
      default: 'selected',
      selected: 'default',
      disabled: 'disabled',
      defaultHovered: 'selected',
      selectedHovered: 'default',
    }

    return {
      ...state,
      [id]: { ...state[id], state: mapping[currentState] },
    };
  },
  [actions.toggleUIHover](state, { payload: { id } }) {
    const currentState = state[id].state;
    const mapping = {
      default: 'defaultHovered',
      selected: 'selectedHovered',
      defaultHovered: 'default',
      selectedHovered: 'selected',
      disabled: 'disabled',
    }

    return {
      ...state,
      [id]: { ...state[id], state: mapping[currentState] },
    };
  }
}, {});

export default combineReducers({
  cards,
  cardsUIState,
});
