import { useState } from 'react';

import { TestProps } from '../../Config/Tests/Test.types';
import { Input } from './TextInput.styles';
import { TextInputProps, DefaultTextInputProps } from './TextInput.types';

export const textInputDefaults: Required<DefaultTextInputProps> &
  Required<TestProps> = {
  testID: 'TextInput',
};

export const TextInput: React.FC<TextInputProps> = (props): JSX.Element => {
  const {
    testID = textInputDefaults.testID,
    children,
    value: initialValue,
    onChange,
    ...others
  } = props;

  const [value, setvalue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(() => event.target.value);
    onChange(event.target.value);
  };

  return (
    <Input
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
