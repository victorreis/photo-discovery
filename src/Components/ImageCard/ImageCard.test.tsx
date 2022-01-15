import {
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { themes } from '../../Theme/CustomThemeProvider';
import { toPx } from '../../Utils/Transform';
import { ImageCard, imageCardDefaults } from './ImageCard';
import { ImageCardProps, RequiredImageCardProps } from './ImageCard.types';

describe(`ImageCard component tests`, () => {
  const id = '1';
  const thumbnailUrl = 'https://via.placeholder.com/600/771796';
  const imageUrl = 'https://via.placeholder.com/150/771796';
  const title = 'teste';

  const requiredProps: RequiredImageCardProps = {
    id,
    thumbnailUrl,
    imageUrl,
    title,
  };

  const setup = (props?: ImageCardProps) => {
    const renderRTR = () =>
      renderRTRCreator<ImageCardProps>(ImageCard, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<ImageCardProps>(ImageCard, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe(`behavior tests`, () => {
    it(`should render the component`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId(imageCardDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it(`should render the text`, () => {
      setup().renderJestDom();
      const element = screen.getByText(title);

      expect(element).toBeInTheDocument();
    });
  });

  describe(`style tests`, () => {
    it(`should have style the Container component`, () => {
      setup().renderJestDom();
      const container = screen.getByTestId(imageCardDefaults.testID);

      expect(container).toHaveStyle({
        backgroundColor: themes.default.colors.background.default.darker,
        borderRadius: toPx(themes.default.borders.radius.MD),
      });
    });
  });

  describe(`snapshot tests`, () => {
    it(`should render correctly`, () => {
      const generatedJson = setup().renderRTR().toJSON();
      expect(generatedJson).toMatchSnapshot();
    });
  });
});
