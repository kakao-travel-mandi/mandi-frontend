import type {Preview} from '@storybook/react';
import '../src/styles/globals.scss'; // 스토리북에서도 글로벌 스타일 적용

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;