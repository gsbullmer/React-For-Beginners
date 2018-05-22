import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';

class EditFishForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.currentTarget;
    const updatedFish = {
      ...this.props.fish,
      [name]: (name === 'price') ? parseFloat(value) : value,
    };

    this.props.updateFish(this.props.index, updatedFish);
  }

  render() {
    const { fish, index, deleteFish } = this.props;
    return (
      <div className="fish-edit">
        <input name="name" type="text" onChange={this.handleChange} value={fish.name} />
        <input name="price" type="number" onChange={this.handleChange} value={fish.price} />
        <select name="status" type="text" onChange={this.handleChange} value={fish.status} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" type="text" onChange={this.handleChange} value={fish.desc} />
        <input name="image" type="text" onChange={this.handleChange} value={fish.image} />
        <button onClick={() => deleteFish(index)}>Remove Fish</button>
      </div>
    );
  }
}

EditFishForm.propTypes = {
  fish: t.shape({
    name: t.string,
    price: t.number,
    status: t.string,
    desc: t.string,
    image: t.string,
  }).isRequired,
  index: t.string.isRequired,
  updateFish: t.func.isRequired,
  deleteFish: t.func.isRequired,
};

export default EditFishForm;
