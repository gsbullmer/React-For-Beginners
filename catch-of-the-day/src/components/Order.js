import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';
import { formatPrice } from '../helpers';

class Order extends Component {
  constructor(props) {
    super(props);

    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';

    // Make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      return <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>;
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(fish.price * count)}
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(key => this.renderOrder(key))}
        </ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  order: t.shape().isRequired,
  fishes: t.shape().isRequired,
  removeFromOrder: t.func.isRequired,
};

export default Order;
