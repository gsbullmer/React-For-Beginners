import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';

class AddFishForm extends Component {
  constructor(props) {
    super(props);

    this.nameRef = React.createRef();
    this.priceRef = React.createRef();
    this.statusRef = React.createRef();
    this.descRef = React.createRef();
    this.imageRef = React.createRef();
    this.createFish = this.createFish.bind(this);
  }

  createFish(event) {
    // 1. stop the form from submitting
    event.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value,
    };

    this.props.addFish(fish);
    // refresh the form
    event.currentTarget.reset();
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
        <select name="status" ref={this.statusRef} type="text" placeholder="Status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} type="text" placeholder="Desc" />
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

AddFishForm.propTypes = {
  addFish: t.func.isRequired,
};

export default AddFishForm;
