import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { APIDream } from '../../utils/api';
import { defaultDepartureValue, defaultArrivalValue } from '../../data/selectDefault';

const SelectAirportComponent = ({ name, placeholder, onChange, isDisabled }) => {
  let [selectedOption, setSelectedOption] = useState('');

  let fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        APIDream.get(
          `v1/tiketcom/flight/airports?city=${inputValue}&airport=${inputValue}&country=${inputValue}`
        )
          .then(({ data }) => {
            const tempArray = [];
            data.data.airports.forEach((element) => {
              tempArray.push({
                value: element.airport_code,
                label: element.airport_name,
                city_code: element.city_code,
                city_name: element.city_name,
                country_name: element.country_name,
              });
            });
            callback(tempArray);
          })
          .catch((error) => {
            console.log(error, 'catch the hoop');
          });
      }, 1000);
    }
  };

  const options =
    name === 'departure'
      ? defaultDepartureValue.map((el) => {
          return {
            value: el.airport_code,
            label: el.airport_name,
            airport_code: el.airport_code,
            airport_name: el.airport_name,
            city_code: el.city_code,
            city_name: el.city_name,
            country_name: el.country_name,
          };
        })
      : defaultArrivalValue.map((el) => {
          return {
            value: el.airport_code,
            label: el.airport_name,
            airport_code: el.airport_code,
            airport_name: el.airport_name,
            city_code: el.city_code,
            city_name: el.city_name,
            country_name: el.country_name,
          };
        });

  const formatOptionLabel = (
    { value, label, city_code, city_name, country_name },
    { context }
  ) => {
    if (context === 'value') {
      return (
        <>
          <span>
            {label} - {city_name}
          </span>
        </>
      );
    } else {
      return (
        <>
          <div style={{ display: 'flex' }}>
            <div>{label}</div>
            <div style={{ marginLeft: '10px', color: '#ccc' }}>{value}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '10px', color: '#ccc' }}>
              {city_name}, {country_name}
            </div>
          </div>
        </>
      );
    }
  };

  let onSearchChange = (selected) => {
    if (selected) {
      onChange(selected.value);
      setSelectedOption(selected);
    }
  };

  return (
    <>
      <AsyncSelect
        name={name}
        value={selectedOption}
        loadOptions={fetchData}
        placeholder={placeholder}
        formatOptionLabel={formatOptionLabel}
        onChange={(e) => {
          onSearchChange(e);
        }}
        defaultOptions={options}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default SelectAirportComponent;
