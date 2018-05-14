import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(`order-${params.storeId}`);

    this.state = {
      fishes: {},
      order: JSON.parse(localStorageRef) || {},
    };

    this.addFish = this.addFish.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.loadSampleFishes = this.loadSampleFishes.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    const { order } = this.state;
    localStorage.setItem(`order-${params.storeId}`, JSON.stringify(order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(fish) {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  }

  addToOrder(key) {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  loadSampleFishes() {
    this.setState({ fishes: sampleFishes });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

App.propTypes = {
  match: t.shape({
    params: t.shape({
      storeId: t.string.isRequired,
    }),
  }).isRequired,
};

export default App;
