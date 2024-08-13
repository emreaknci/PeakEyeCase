import React from 'react';
import { TextareaAutosize as TextArea } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/material';

interface CustomTextAreaComponentProps {
  formik: any,
  fieldName: string,
  label?: string,
  disabled?: boolean,
}

const CustomTextAreaComponent = (props: CustomTextAreaComponentProps) => {

  const theme = useTheme();

  return (
    <TextArea
      disabled={props.disabled}
      style={{
        width: '100%',
        padding: '.5rem',
        outline: 'none',
        resize: 'none',
        borderRadius: '.1rem',
        borderBottom: `.2rem solid ${theme.palette.divider}`,
        border: "none",
        backgroundColor: theme.palette.divider,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
      }}
      minRows={5}
      placeholder={props.label}
      value={props.formik.values[props.fieldName]}
      onChange={props.formik.handleChange}
      name={props.fieldName}
    />
  );
};

export default CustomTextAreaComponent;
