import {
  fireEvent,
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { modalDefaults } from '../Modal/Modal';
import { Navbar, navbarDefaults } from './Navbar';
import { heightByScreenSize } from './Navbar.styles';
import { RequiredNavbarProps, NavbarProps } from './Navbar.types';

describe('navbar component tests', () => {
  const text = 'text';
  const themeSwitcherIconId = `${navbarDefaults.testID}_ThemeSwitcherIcon`;
  const modalBackdropId = `${modalDefaults.testID}_ModalBackdropContainer`;

  const requiredProps: RequiredNavbarProps = {
    children: text,
  };

  const setup = (props?: NavbarProps) => {
    const renderRTR = () =>
      renderRTRCreator<NavbarProps>(Navbar, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<NavbarProps>(Navbar, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe('behavior tests', () => {
    it(`should render the component`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId(navbarDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it(`should open the modal when the '${themeSwitcherIconId}' is clicked`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const themeSwitcherIcon = screen.getByTestId(themeSwitcherIconId);

      fireEvent.click(themeSwitcherIcon);
      const modal = screen.getByTestId(modalDefaults.testID);

      expect(modal).toBeInTheDocument();
    });

    it(`should close the modal when the '${themeSwitcherIconId}' is clicked and then the '${modalBackdropId}' is clicked`, () => {
      expect.assertions(2);
      setup().renderJestDom();
      const themeSwitcherIcon = screen.getByTestId(themeSwitcherIconId);

      fireEvent.click(themeSwitcherIcon);
      const modal = screen.getByTestId(modalDefaults.testID);
      const modalBackdrop = screen.getByTestId(modalBackdropId);

      expect(modal).toBeInTheDocument();

      fireEvent.click(modalBackdrop);

      expect(modal).not.toBeInTheDocument();
    });
  });

  describe('style tests', () => {
    it(`should have height equals '${heightByScreenSize.others}' when the screen is large`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const container = screen.getByTestId(navbarDefaults.testID);

      expect(container).toHaveStyle({
        height: heightByScreenSize.others,
      });
    });
  });

  describe('snapshot tests', () => {
    it(`should render correctly`, () => {
      expect.assertions(1);
      const generatedJson = setup().renderRTR().toJSON();

      expect(generatedJson).toMatchSnapshot();
    });
  });
});
