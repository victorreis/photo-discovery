import { TestProps } from '../../Config/Tests/Test.types';

export interface RequiredNavbarProps {}

export interface DefaultNavbarProps {}

export interface OptionalNavbarProps {}

export type NavbarProps = RequiredNavbarProps &
  DefaultNavbarProps &
  OptionalNavbarProps &
  TestProps;

export type NavbarStyleProps = Required<DefaultNavbarProps>;
