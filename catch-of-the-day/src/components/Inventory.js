import React from 'react';
import { PropTypes as t } from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

const Inventory = (props) => {
  const {
    addFish, loadSampleFishes, fishes, updateFish, deleteFish,
  } = props;
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {Object.keys(fishes).map(key => (
        <EditFishForm
          key={key}
          index={key}
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish}
        />
      ))}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

Inventory.propTypes = {
  addFish: t.func.isRequired,
  loadSampleFishes: t.func.isRequired,
  updateFish: t.func.isRequired,
  deleteFish: t.func.isRequired,
  fishes: t.shape().isRequired,
};

export default Inventory;
