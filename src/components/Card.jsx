import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import cn from 'classnames';

const mapStateToProps = (state) => {
  const { cardsUIState } = state;
  return { cardsUIState };
}

const actionCreators = {
  toggleCardState: actions.toggleCardState,
  toggleUIHover: actions.toggleUIHover,
}

class Card extends React.Component {
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
  };

  render() {
    const { card, cardsUIState } = this.props;

    const stateToTitle = {
      selected: 'Котэ не одобряет?',
      default: 'Сказочное заморское яство',
      disabled: 'Сказочное заморское яство',
    };

    const currentUIState = cardsUIState[card.id].state;

    const descriptionClasses = cn({
      card: true,
      borders: true,
      [currentUIState]: true,
    });

    const weightClasses = cn({
      weight: true,
      [currentUIState]: true,
    })

    return (
      <div className="option">
        <div className={descriptionClasses} onClick={this.toggleCardState(card.id)} onMouseLeave={this.toggleUIHover(card.id)}>
          <div className="description">
            <p className="note">{stateToTitle[card.state]}</p>
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
}

export default connect(mapStateToProps, actionCreators)(Card);
