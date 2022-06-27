import { gql, useMutation } from '@apollo/client';
import { Field, FieldHookConfig, useField } from 'formik';
import React, { ChangeEvent, ChangeEventHandler } from 'react';

const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`;

interface OtherProps {
  label: string;
}

function UploadFileController<FormValues>(
  props: OtherProps & FieldHookConfig<FormValues>,
) {
  const [uploadImage] = useMutation(UPLOAD_IMAGE_MUTATION);
  const [field, meta] = useField(props);

  const handleFileUpload: ChangeEventHandler = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.validity.valid) {
      const imageResult = await uploadImage({
        variables: { file: event.target.files?.[0] },
      });
      console.log(imageResult);
      // i am 100% positive there's some fancy hook to use in formik that would let you have
      // a hidden image_url input or what have you but this works for now
      if (!imageResult.data) {
        meta.error = 'Issue uploading file';
        return;
      }
      localStorage.setItem('photo_url', imageResult.data.uploadImage.url);
    }
  };


  return (
    <div className="uploadinput-holder">
      <label htmlFor={props.id || props.name} className="uploadinput-label">
        {props.label}
      </label>
      <Field
        type="file"
        {...field}
        {...props}
        onChange={(event: ChangeEvent) => {
          handleFileUpload(event);
          field.onChange(event);
        }}
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
}

export default UploadFileController;
