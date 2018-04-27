import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addToOrder(this.props.index);
  }

  render() {
    const {
      name, image, desc, price, status,
    } = this.props.details;
    const isAvailable = status === 'available';

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button onClick={this.handleClick} disabled={!isAvailable}>
          {isAvailable ? 'Add To Cart' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

Fish.propTypes = {
  index: t.string.isRequired,
  details: t.shape({
    name: t.string.isRequired,
    image: t.string.isRequired,
    desc: t.string.isRequired,
    price: t.number.isRequired,
    status: t.string.isRequired,
  }).isRequired,
  addToOrder: t.func.isRequired,
};

export default Fish;
