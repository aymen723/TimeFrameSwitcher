import {StyleSheet} from 'react-native';

export const Colors = {
  primaryblue: '#0067DA',
  primaryblue70: '#00AAC3',
  primarywhite: '#FFFFFF',
  gray: '#F6F6F6',
  primaryblack: '#232323',
  darkgray: '#DFDFDF',
  diabletext: '#d9d9d9',
  white: '#ffffff',
};

export const GlobalStyle = StyleSheet.create({
  headerText: {
    fontSize: 14,
    color: Colors.primaryblack,
    lineHeight: 17,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
});
