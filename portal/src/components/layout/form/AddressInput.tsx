import { Field, FieldHookConfig, FieldMetaProps, FieldProps, useField } from 'formik';
import React, { useRef } from 'react';
import Autocomplete from 'react-google-autocomplete';
import './AddressInput.scss';

interface OtherProps {
  label: string;
  googleKey: string;
}

interface PlaceType {
  formatted_address: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

function AddressInput<FormValues>({
  label,
  googleKey,
  ...props
}: OtherProps & FieldHookConfig<FormValues>) {
  return (
    <Field name={props.id || props.name}>
      {({ field, meta }: { field: FieldProps; meta: FieldMetaProps<string> }) => (
        <div className="addressinput-holder">
          <label htmlFor={props.id || props.name} className="textinput-label">
            {label}
          </label>
          <Autocomplete
            className="text-input"
            apiKey={googleKey}
            onPlaceSelected={(place: PlaceType, input) => {
              console.log(field, meta);
              const { formatted_address } = place;
              console.log(formatted_address);
            }}
            options={{
              types: ['address'],
            }}
            {...field}
          />
          {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
      )}
    </Field>
  );
}

export default AddressInput;
