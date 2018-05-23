import React, { Component } from 'react';
import { PropTypes as t } from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      owner: null,
    };

    this.authHandler = this.authHandler.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  async authHandler(authData) {
    // 1. Look  up the current store in the firebase databse
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, { data: authData.user.uid });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  }

  authenticate(provider) {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  async logout() {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    });
  }

  render() {
    const {
      addFish, loadSampleFishes, fishes, updateFish, deleteFish,
    } = this.props;
    const { owner, uid } = this.state;
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // 1. check if they are logged in
    if (!uid) return <Login authenticate={this.authenticate} />;
    // 2. check if they are not the owner
    if (uid !== owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    // 3. they must be the owner, render inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
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
  }
}

Inventory.propTypes = {
  addFish: t.func.isRequired,
  loadSampleFishes: t.func.isRequired,
  updateFish: t.func.isRequired,
  deleteFish: t.func.isRequired,
  fishes: t.shape().isRequired,
  storeId: t.string.isRequired,
};

export default Inventory;
