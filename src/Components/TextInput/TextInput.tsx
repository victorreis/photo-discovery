import React, { useState } from 'react';

import { TestProps } from '../../Config/Tests/Test.types';
import { Input } from './TextInput.styles';
import { TextInputProps, DefaultTextInputProps } from './TextInput.types';

export const textInputDefaults: Required<DefaultTextInputProps> &
  Required<TestProps> = {
  testID: 'TextInput',
};

const TextInputComponent: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (props, ref) => {
  const {
    testID = textInputDefaults.testID,
    children,
    value: initialValue,
    onChange,
    filterInputRegex,
    ...others
  } = props;

  const [value, setvalue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (filterInputRegex) {
      newValue = newValue.replaceAll(filterInputRegex, '');
    }
    setvalue(() => newValue);
    onChange(newValue);
  };

  return (
    <Input
      ref={ref}
      data-testid={testID}
      onChange={handleChange}
      type="text"
      value={value}
      {...others}
    >
      {children}
    </Input>
  );
};
export const TextInput = React.forwardRef(TextInputComponent);
