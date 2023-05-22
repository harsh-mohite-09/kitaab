import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import AddressForm from "./AddressForm";
import { useDataContext } from "../../context/dataContext";
import { TYPE } from "../../utils/constants";
import { toast } from "react-toastify";

const AddressList = ({
  isAddressPage,
  addressSelected,
  setAddressSelected,
}) => {
  const [formDisplay, setFormDisplay] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
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

  const addressDeleteHandler = (addressId) => {
    dataDispatch({ type: TYPE.DELETE_ADDRESS, payload: addressId });
    toast.error("Deleted Address", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const addressEditHandler = (address) => {
    dataDispatch({ type: TYPE.EDIT_ADDRESS, payload: address });
  };

  return (
    <div className="checkout-container__address">
      {addresses.length > 0 && !isAddressPage && (
        <h3>Choose a delivery Address</h3>
      )}
      {!isEditing &&
        addresses.map((address) => {
          const { id, name, phone, city, state, pin, addressText } = address;
          return (
            <div className="address-input-container" key={id}>
              {!isAddressPage && (
                <input
                  type="radio"
                  id={id}
                  value={id}
                  checked={addressSelected?.id === id}
                  onChange={addressSelectHandler}
                />
              )}
              <label htmlFor={id} className="address-label">
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
                {isAddressPage && (
                  <div className="address-manage-btn-group">
                    <button
                      onClick={() => {
                        setEditingAddress(address);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => addressDeleteHandler(id)}>
                      Delete
                    </button>
                  </div>
                )}
              </label>
            </div>
          );
        })}
      {isEditing && (
        <AddressForm
          onFormEdit={addressEditHandler}
          setIsEditing={setIsEditing}
          editingAddress={editingAddress}
          editingForm
        />
      )}
      {!formDisplay && !isEditing && (
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
