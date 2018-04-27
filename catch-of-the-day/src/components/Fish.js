import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
  render() {
    const {
      name, image, desc, price, status,
    } = this.props.details;

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button>Add To Cart</button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: t.shape({
    name: t.string.isRequired,
    image: t.string.isRequired,
    desc: t.string.isRequired,
    price: t.number.isRequired,
    status: t.string.isRequired,
  }).isRequired,
};

export default Fish;
