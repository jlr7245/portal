import React, { ReactElement } from 'react';
import { Field, FieldHookConfig, useField } from 'formik';
import './TextInput.scss';

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
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
}

export default TextInput;
