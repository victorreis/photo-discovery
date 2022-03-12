---
name: 'component'
root: '.'
output: 'src/Components/'
ignore: ['.', 'src/Components/**/*']
questions:
  value: 'Please, enter the component name:'
---

# `{{ inputs.value | pascal }}/index.ts`

```ts:
export * from './{{ inputs.value | pascal }}.types';
export * from './{{ inputs.value | pascal }}';

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.types.ts`

```ts:
import { TestProps } from '../../Config/Tests/Test.types';
import { TypographyVariant } from '../../Theme/Types/Typographies.types';

export interface Required{{ inputs.value | pascal }}Props {
  /**
   * Component's children.
   */
  children: React.ReactNode;
}

export interface Default{{ inputs.value | pascal }}Props {
  /**
   * Sets the component variant. It changes the HTML tag and the styles.
   * @default 'body1'.
   */
  variant?: TypographyVariant;
}

export interface Optional{{ inputs.value | pascal }}Props {
  /**
   * Sets the component styles.
   */
  style?: React.CSSProperties;
}

export type {{ inputs.value | pascal }}Props = Required{{ inputs.value | pascal }}Props &
  Default{{ inputs.value | pascal }}Props &
  Optional{{ inputs.value | pascal }}Props &
  TestProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>;

export type {{ inputs.value | pascal }}StyleProps = Required<Default{{ inputs.value | pascal }}Props>;

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.tsx`

```tsx:
import { TestProps } from '../../Config/Tests/Test.types';
import { typographyVariantToTag } from '../../Theme/Types/Typographies.types';
import { {{ inputs.value | pascal }}Container } from './{{ inputs.value | pascal }}.styles';
import { {{ inputs.value | pascal }}Props, Default{{ inputs.value | pascal }}Props } from './{{ inputs.value | pascal }}.types';

export const {{ inputs.value | camel }}Defaults: Required<Default{{ inputs.value | pascal }}Props> &
  Required<TestProps> = {
  testID: '{{ inputs.value | pascal }}',
  variant: 'body1',
};

export const {{ inputs.value | pascal }}: React.FC<{{ inputs.value | pascal }}Props> = (props): JSX.Element => {
  const {
    testID = {{ inputs.value | camel }}Defaults.testID,
    children,
    variant = {{ inputs.value | camel }}Defaults.variant,
    style,
    ...others
  } = props;

  return (
    <{{ inputs.value | pascal }}Container
      as={typographyVariantToTag[variant]}
      data-testid={testID}
      style={style}
      variant={variant}
      {...others}
    >
      {children}
    </{{ inputs.value | pascal }}Container>
  );
};

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.styles.ts`

```ts:
import styled from 'styled-components';

import { {{ inputs.value | pascal }}StyleProps } from './{{ inputs.value | pascal }}.types';

export const {{ inputs.value | pascal }}Container = styled.span<{{ inputs.value | pascal }}StyleProps>`
  color: ${({ theme }) => theme.colors.font.default};
  ${({ variant, theme }) => theme.typographies[variant]};
`;

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.test.tsx`

```tsx:
import {
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { themes } from '../../Theme/CustomThemeProvider';
import { hexToRgb } from '../../Utils/Transform/hexToRgb.util';
import { {{ inputs.value | pascal }}, {{ inputs.value | camel }}Defaults } from './{{ inputs.value | pascal }}';
import { Required{{ inputs.value | pascal }}Props, {{ inputs.value | pascal }}Props } from './{{ inputs.value | pascal }}.types';

describe('{{ inputs.value | camel }} component tests', () => {
  const text = 'text';
  const newVariant = 'h1';

  const requiredProps: Required{{ inputs.value | pascal }}Props = {
    children: text,
  };

  const setup = (props?: {{ inputs.value | pascal }}Props) => {
    const renderRTR = () =>
      renderRTRCreator<{{ inputs.value | pascal }}Props>({{ inputs.value | pascal }}, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<{{ inputs.value | pascal }}Props>({{ inputs.value | pascal }}, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe('behavior tests', () => {
    it(`should render the component`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId({{ inputs.value | camel }}Defaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it(`should render the text`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const element = screen.getByText(text);

      expect(element).toBeInTheDocument();
    });

    it(`should render '${ {{ inputs.value | camel }}Defaults.variant}' as the default variant`, () => {
      expect.assertions(1);
const instance =
      setup().renderRTR().root;
      const element = instance.findByProps({
        variant: {{ inputs.value | camel }}Defaults.variant,
      });

      expect(element).toBeTruthy();
    });

    it(`should override the default variant when it is passed as prop`, () => {
      expect.assertions(1);
const instance =

      setup({
        ...requiredProps,
        variant: newVariant,
      }).renderRTR().root;
      const element = instance.findByProps({ variant: newVariant });

      expect(element).toBeTruthy();
    });
  });

  describe('style tests', () => {
    it(`should have style the Container component`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const container = screen.getByTestId({{ inputs.value | camel }}Defaults.testID);

      expect(container).toHaveStyle({
        color: hexToRgb(themes.default.colors.font.default),
        ...themes.default.typographies[{{ inputs.value | camel }}Defaults.variant],
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

```
