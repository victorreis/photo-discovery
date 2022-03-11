---
name: 'page'
root: '.'
output: 'src/Pages/'
ignore: ['.', 'src/Pages/**/*']
questions:
  value: 'Please, enter the page name:'
---

# `{{ inputs.value | pascal }}/index.ts`

```ts:
export * from './{{ inputs.value | pascal }}';

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.tsx`

```tsx:
import { PageContainer } from '../../App.styles';
import { TestProps } from '../../Config/Tests/Test.types';

export const {{ inputs.value | camel }}Defaults: Required<TestProps> = {
  testID: '{{ inputs.value | pascal }}',
};

export const {{ inputs.value | pascal }}: React.FC = (): JSX.Element => {
  return (
    <PageContainer data-testid={ {{ inputs.value | camel }}Defaults.testID}>
      teste
    </PageContainer>
  );
};

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.styles.ts`

```ts:
import styled from 'styled-components';

export const {{ inputs.value | pascal }}Container = styled.div`
  color: ${({ theme }) => theme.colors.font.default};
`;

```
