import React, { useEffect, useState } from "react";

const AddressForm = ({
  setFormDisplay,
  onFormSubmit,
  onFormEdit,
  setIsEditing,
  editingForm,
  editingAddress,
}) => {
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pin: "",
    addressText: "",
  });

  useEffect(() => {
    if (editingAddress) {
      setNewAddress(editingAddress);
    }
  }, [editingAddress]);

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

    if (editingForm) {
      onFormEdit(newAddress);
      setIsEditing(false);
    } else {
      onFormSubmit(newAddress);
      setFormDisplay(false);
    }
  };

  return (
    <div className="address-form-container">
      <h4>Add new address</h4>
      <form onSubmit={addressFormSubmitHandler} className="address-form">
        <div>
          <input
            type="text"
            id="username"
            value={newAddress.name}
            placeholder="Enter Name"
            onChange={usernameChangeHandler}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="addressText"
            placeholder="Enter Address"
            value={newAddress.addressText}
            onChange={addressTextChangeHandler}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="city"
            value={newAddress.city}
            placeholder="Enter City"
            onChange={cityChangeHandler}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="state"
            value={newAddress.state}
            placeholder="Enter State"
            onChange={stateChangeHandler}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="pin"
            value={newAddress.pin}
            placeholder="Enter Pincode"
            onChange={pinChangeHandler}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="phone"
            value={newAddress.phone}
            placeholder="Enter Phone Number"
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
