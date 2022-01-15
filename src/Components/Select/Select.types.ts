import { TestProps } from '../../Config/Tests/Test.types';

export type SelectOption = {
  id: string | number;
  value: string | number;
  text: string;
};

export interface RequiredSelectProps {
  /**
   * Array of options to be chosen.
   */
  options: SelectOption[];

  /**
   * Callcack function that is called when some option is selected.
   */
  onChange: (selected: string) => void;
}

export interface DefaultSelectProps {
  /**
   * Number of visible characters in the compoenent dropdown.
   * @default 25
   */
  numberOfVisibleCharacters?: number;

  /**
   * Placeholder text to be shown in the component.
   * @default 'Selec an option...'
   */
  placeholder?: string;
}

export interface OptionalSelectProps {}

export type SelectProps = RequiredSelectProps &
  DefaultSelectProps &
  OptionalSelectProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLSelectElement>, 'onChange'>;

export type SelectStyleProps = Required<DefaultSelectProps>;
