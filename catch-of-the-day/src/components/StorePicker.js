import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  render() {
    console.log(this);
    return (
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit Store ➡</button>
      </form>
    );
  }
}

export default StorePicker;
