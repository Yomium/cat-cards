import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import cn from 'classnames';

const mapStateToProps = (state) => {
  const { cards: { byId, allIds }, cardsUIState } = state;
  const cards = allIds.map((id) => byId[id])
  return { cards, cardsUIState };
}

const actionCreators = {
  toggleCardState: actions.toggleCardState,
  toggleUIHover: actions.toggleUIHover,
}

class Cards extends React.Component {
  toggleCardState = (id) => () => {
    const { toggleCardState } = this.props;
    toggleCardState({ id });
  }

  toggleUIHover = (id) => () => {
    const { toggleUIHover } = this.props;
    toggleUIHover({ id });
  }

  renderLink = (id, type, state) => {
    const typeToLink = {
      'с фуа-гра': 'Печень утки разварная с артишоками.',
      'с рыбой': 'Головы щучьи с чесноком да свежайшая сёмгушка.',
      'с курой' : 'Филе из цыплят с трюфелями в бульоне.',
    };

    switch(state) {
      case 'default': {
        return <p className="link">Чего сидишь? Порадуй котэ, <button className="button" onClick={this.toggleCardState(id)}>купи.</button></p>;
      }
      case 'selected': {
        return <p className="link">{typeToLink[type]}</p>
      }
      case 'disabled': {
        return <p className="link disabled">Печалька, {type} закончился</p>
      }
      default: {
        return null;
      }
    }
  }

  renderCard = (card) => {
    const { cardsUIState } = this.props;

    const stateToTitle = {
      selected: 'Котэ не одобряет?',
      selectedHovered: 'Котэ не одобряет?',
      default: 'Сказочное заморское яство',
      defaultHovered: 'Сказочное заморское яство',
      disabled: 'Сказочное заморское яство',
    };

    const currentState = cardsUIState[card.id].state;

    const descriptionClasses = cn({
      card: true,
      borders: true,
      [currentState]: true,
    });

    const weightClasses = cn({
      weight: true,
      [currentState]: true,
    })

    return (
      <div key={card.id} className="option">
        <div className={descriptionClasses} onClick={this.toggleCardState(card.id)} onMouseLeave={this.toggleUIHover(card.id)}>
          <div className="description">
            <p className="note">{stateToTitle[cardsUIState[card.id].state]}</p>
            <div className="title">
              <p>Нямушка</p>
              <span>{card.type}</span>
            </div>
            <p className="quantity">{card.description.join('\n')}</p>
          </div>
          <div className="image">
            <div className={weightClasses}>
              <p>{card.weight}<span>кг</span></p>
            </div>
          </div>
        </div>
        {this.renderLink(card.id, card.type, card.state)}
      </div>);
  }

  render() {
    const { cards } = this.props;

    if (cards.length === 0) {
      return null;
    }

    return cards.map(this.renderCard);
  };
}

export default connect(mapStateToProps, actionCreators)(Cards);
