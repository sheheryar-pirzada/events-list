import {extendTheme} from 'native-base';

export const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        rounded: 'xl',
        color: 'trueGray.400',
        _focus: {borderColor: 'white'},
        h: 50,
      },
    },
    Select: {
      baseStyle: {
        rounded: 'xl',
        color: 'trueGray.400',
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

export const selectProps = {
  h: 50,
  p: 4,
  borderRadius: 12,
  fontSize: 'md',
  _actionSheetContent: {
    backgroundColor: 'gray.900',
  },
  _item: {
    p: 4,
    _text: {color: 'gray.100'},
    backgroundColor: 'transparent',
  },
  _selectedItem: {
    bg: 'gray.300',
    _text: {color: 'gray.900'},
  },
};

export const outlineButtonProps = {
  variant: 'outline',
  borderColor: 'trueGray.300',
  _text: {color: 'trueGray.300'},
  backgroundColor: 'transparent',
};
