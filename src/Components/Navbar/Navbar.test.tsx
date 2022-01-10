import {
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { Navbar, navbarDefaults } from './Navbar';
import { heightByScreenSize } from './Navbar.styles';
import { RequiredNavbarProps, NavbarProps } from './Navbar.types';

describe(`Navbar component tests`, () => {
  const text = 'text';

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

  describe(`behavior tests`, () => {
    it(`should render the component`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId(navbarDefaults.testID);

      expect(testInstance).toBeTruthy();
    });
  });

  describe(`style tests`, () => {
    it(`should have height equals '${heightByScreenSize.others}' when the screen is large`, () => {
      setup().renderJestDom();
      const container = screen.getByTestId(navbarDefaults.testID);

      expect(container).toHaveStyle({
        height: heightByScreenSize.others,
      });
    });

    // eslint-disable-next-line jest/no-commented-out-tests
    // it(`should have height equals '${heightByScreenSize.xs}' when the screen is small`, () => {
    //   setup().renderJestDom();
    //   const container = screen.getByTestId(navbarDefaults.testID);

    //   Object.defineProperty(window, 'innerWidth', {
    //     writable: true,
    //     configurable: true,
    //     value: 150,
    //   });

    //   window.dispatchEvent(new Event('resize'));

    //   expect(window.innerWidth).toBe(150);

    //   expect(container).toHaveStyle({
    //     height: heightByScreenSize.xs,
    //   });
    // });
  });

  describe(`snapshot tests`, () => {
    it(`should render correctly`, () => {
      const generatedJson = setup().renderRTR().toJSON();
      expect(generatedJson).toMatchSnapshot();
    });
  });
});
