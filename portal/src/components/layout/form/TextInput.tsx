import React, { ReactElement } from 'react';
import { Field, FieldHookConfig, useField } from 'formik';
import './TextInput.scss';
import Error from './Error';

interface OtherProps {
  label: string;
  type: "text" | "email" | "password" | "number";
}

function TextInput<FormValues>({
  label,
  ...props
}: OtherProps & FieldHookConfig<FormValues>): ReactElement {
  const [field, meta] = useField(props);
  return (
    <div className="textinput-holder">
      <label htmlFor={props.id || props.name} className="textinput-label">{label}</label>
      <Field className="text-input" {...field} {...props} />
      <Error {...meta} /> 
    </div>
  );
}

export default TextInput;
