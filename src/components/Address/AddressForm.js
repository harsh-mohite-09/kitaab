import React, { useState } from "react";

const AddressForm = ({ setFormDisplay, onFormSubmit }) => {
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pin: "",
    addressText: "",
  });

  const usernameChangeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      name: e.target.value,
    });
  };

  const phoneChangeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      phone: e.target.value,
    });
  };

  const addressTextChangeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      addressText: e.target.value,
    });
  };

  const cityChangeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      city: e.target.value,
    });
  };

  const stateChangeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      state: e.target.value,
    });
  };

  const pinChangeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      pin: e.target.value,
    });
  };

  const addressFormSubmitHandler = (e) => {
    e.preventDefault();
    onFormSubmit(newAddress);
    setFormDisplay(false);
  };

  return (
    <div className="address-form">
      <p>Add new address</p>
      <form onSubmit={addressFormSubmitHandler}>
        <div>
          <label htmlFor="username">Name: </label>
          <input
            type="text"
            id="username"
            onChange={usernameChangeHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="addressText">Address: </label>
          <input
            type="text"
            id="addressText"
            onChange={addressTextChangeHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input type="text" id="city" onChange={cityChangeHandler} required />
        </div>
        <div>
          <label htmlFor="state">State: </label>
          <input
            type="text"
            id="state"
            onChange={stateChangeHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="pin">Pincode: </label>
          <input type="text" id="pin" onChange={pinChangeHandler} required />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            id="phone"
            onChange={phoneChangeHandler}
            required
          />
        </div>
        <button>Save Address</button>
      </form>
    </div>
  );
};

export default AddressForm;
