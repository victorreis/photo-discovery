import { useState, forwardRef, ForwardRefRenderFunction } from 'react';

import { TestProps } from '../../Config/Tests/Test.types';
import { Input } from './TextInput.styles';
import { TextInputProps, DefaultTextInputProps } from './TextInput.types';

export const textInputDefaults: Required<DefaultTextInputProps> &
  Required<TestProps> = {
  testID: 'TextInput',
};

const TextInputComponent: ForwardRefRenderFunction<
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

  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (filterInputRegex) {
      newValue = newValue.replaceAll(filterInputRegex, '');
    }
    setValue(() => newValue);
    onChange(newValue);
  };

  return (
    <Input
      data-testid={testID}
      onChange={handleChange}
      ref={ref}
      type="text"
      value={value}
      {...others}
    >
      {children}
    </Input>
  );
};
export const TextInput = forwardRef(TextInputComponent);
