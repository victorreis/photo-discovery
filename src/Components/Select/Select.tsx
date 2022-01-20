import { useState } from 'react';

import { TestProps } from '../../Config/Tests/Test.types';
import { SelectContainer } from './Select.styles';
import { SelectProps, DefaultSelectProps } from './Select.types';

export const selectDefaults: Required<DefaultSelectProps> &
  Required<TestProps> = {
  testID: 'Select',
  numberOfVisibleCharacters: 25,
  placeholder: 'Select an option',
};

export const Select: React.FC<SelectProps> = (props): JSX.Element => {
  const {
    testID = selectDefaults.testID,
    options,
    onChange,
    numberOfVisibleCharacters = selectDefaults.numberOfVisibleCharacters,
    placeholder = selectDefaults.placeholder,
    ...others
  } = props;

  const [selectedId, setSelectedId] = useState<string>();

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value || '');
    setSelectedId(event.target.value);
  };

  const selectedOption = options.find((option) => option.id === selectedId);

  return (
    <SelectContainer
      data-testid={testID}
      onChange={handleSelection}
      title={String(selectedOption?.value)}
      value={selectedId}
      {...others}
    >
      <option defaultValue="" hidden value="">
        {placeholder}
      </option>
      <option />
      {options.map(({ text, id }) => (
        <option key={id} title={text} value={id}>
          {text.substring(0, Math.min(numberOfVisibleCharacters, text.length))}
          {text.length > numberOfVisibleCharacters && '...'}
        </option>
      ))}
    </SelectContainer>
  );
};
