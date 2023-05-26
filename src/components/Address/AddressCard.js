import React from "react";

const AddressCard = ({
  address,
  isAddressPage,
  addressSelected,
  addressSelectHandler,
  addressDeleteHandler,
  setEditingAddress,
  setIsEditing,
}) => {
  const { id, name, phone, city, state, pin, addressText } = address;
  return (
    <div className="address-input-container">
      {!isAddressPage && (
        <input
          type="radio"
          id={id}
          value={id}
          checked={addressSelected?.id === id}
          onChange={addressSelectHandler}
          className="address-radio"
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
              EDIT
            </button>
            <button onClick={() => addressDeleteHandler(id)}>DELETE</button>
          </div>
        )}
      </label>
    </div>
  );
};

export default AddressCard;
