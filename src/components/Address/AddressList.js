import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import AddressForm from "./AddressForm";
import { useDataContext } from "../../context/dataContext";
import { TYPE } from "../../utils/constants";

const AddressList = () => {
  const [addressSelected, setAddressSelected] = useState(null);
  const [formDisplay, setFormDisplay] = useState(false);
  const { addresses, dataDispatch } = useDataContext();

  const addressSelectHandler = (e) => {
    setAddressSelected(addresses.find(({ id }) => id === e.target.value));
  };

  const newAddressFormSubmitHandler = (address) => {
    dataDispatch({
      type: TYPE.ADD_ADDRESS,
      payload: { ...address, id: uuid() },
    });
  };

  return (
    <div className="checkout-container__address">
      <h3>{addresses.length > 0 && "Choose a delivery Address"}</h3>
      {addresses.map((address) => {
        const { id, name, phone, city, state, pin, addressText } = address;
        return (
          <div className="address-input-container" key={id}>
            <input
              type="radio"
              id={id}
              value={id}
              checked={addressSelected?.id === id}
              onChange={addressSelectHandler}
            />
            <label htmlFor={id}>
              <div className="address-details">
                <h4>{name}</h4>
                <p>{addressText}</p>
                <p>
                  {city}-{pin}
                </p>
                <p>{state}</p>
                <p>
                  <b>Phone:</b> {phone}
                </p>
              </div>
            </label>
          </div>
        );
      })}
      {!formDisplay && (
        <div
          className="checkout-container__new-address"
          onClick={() => setFormDisplay(true)}
        >
          <h3>+ Add New Address</h3>
        </div>
      )}
      {formDisplay && (
        <AddressForm
          setFormDisplay={setFormDisplay}
          onFormSubmit={newAddressFormSubmitHandler}
        />
      )}
    </div>
  );
};

export default AddressList;
