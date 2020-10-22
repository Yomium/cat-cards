import React from 'react';
import { connect } from 'react-redux';
import Card from './Card.jsx';


const mapStateToProps = (state) => {
  const { cards: { byId, allIds } } = state;
  const cards = allIds.map((id) => byId[id])
  return { cards };
}


class Cards extends React.Component {
  renderCard = (card) => {
    return (
      <Card key={card.id} card={card}/>
    );
  };

  render() {
    const { cards } = this.props;

    if (cards.length === 0) {
      return null;
    }

    return cards.map(this.renderCard);
  };
}

export default connect(mapStateToProps)(Cards);
