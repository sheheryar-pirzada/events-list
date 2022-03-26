import {extendTheme} from 'native-base';

export const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        rounded: 'xl',
        color: 'trueGray.200',
        _focus: {borderColor: 'white'},
        h: 50,
      },
    },
    Select: {
      baseStyle: {
        rounded: 'xl',
        color: 'trueGray.200',
        _focus: {borderColor: 'white'},
        h: 50,
      },
    },
    Button: {
      baseStyle: {
        rounded: 'xl',
        h: 50,
      },
      defaultProps: {
        backgroundColor: 'cyan.900',
      },
    },
  },
});
