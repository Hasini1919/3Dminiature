import React, { useState } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';

const Autocomplete = () => {
  const [selectedAddress, setSelectedAddress] = useState('');

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 6.9271, lng: () => 79.8612 }, // Colombo center
      radius: 20 * 1000, // 20 km radius
      componentRestrictions: { country: 'lk' }, // Sri Lanka only
    },
    debounce: 300,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (description: string) => {
    setValue(description, false); // fill input box with selected
    clearSuggestions();
    setSelectedAddress(description); // save to selectedAddress state
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter your address"
        style={{ width: '300px', padding: '8px', border: '1px solid #ccc' }}
      />

      {status === 'OK' && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 8, border: '1px solid #ddd', borderRadius: '4px' }}>
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              style={{
                padding: '6px 10px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                backgroundColor: '#fff',
              }}
            >
              {description}
            </li>
          ))}
        </ul>
      )}

      {/* Display selected address */}
      {selectedAddress && (
        <div style={{ marginTop: '16px', fontWeight: 'bold' }}>
          Selected Address: <span style={{ color: '#333' }}>{selectedAddress}</span>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;