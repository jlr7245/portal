import React, { FormEvent, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import './AddressInput.scss';
import Error from './Error';

interface AddressInputProps {
  label: string;
  googleKey: string;
  setAddress: Function;
  address: string;
  id?: string;
  name?: string;
}

interface PlaceType {
  formatted_address: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

function AddressInput({
  label,
  googleKey,
  setAddress,
  address,
  ...props
}: AddressInputProps) {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const [formErr, setFormErr] = useState('');
  return (
    <div className="addressinput-holder">
      <label htmlFor={props.id || props.name} className="textinput-label">
        {label}
      </label>
      <Autocomplete
        className="text-input"
        apiKey={googleKey}
        onPlaceSelected={(place: PlaceType, input) => {
          const { formatted_address } = place;
          setAddress(formatted_address);
        }}
        onChange={(evt: FormEvent<HTMLInputElement>) => {
          //@ts-ignore
          setAddress(evt.target.value);
          setFormErr('');
        }}
        onBlur={(evt) => {
          setHasBeenTouched(true);
          if (!evt.target.value.includes(',')) {
            setFormErr('Required');
          } else {
            setFormErr('');
          }
        }}
        options={{
          types: ['address'],
        }}
      />
      <Error touched={hasBeenTouched} error={formErr} />
    </div>
  );
}

export default AddressInput;
