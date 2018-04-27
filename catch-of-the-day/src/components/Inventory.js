import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';
import AddFishForm from './AddFishForm';

class Inventory extends Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish} />
      </div>
    );
  }
}

Inventory.propTypes = {
  addFish: t.func.isRequired,
};

export default Inventory;
