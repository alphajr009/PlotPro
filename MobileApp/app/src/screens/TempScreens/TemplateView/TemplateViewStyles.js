import { StyleSheet, Platform } from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  testingText: {
    color: 'red',
  },
  title_text: {
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(-5),
  },

  top_Bar: {
    height: responsiveHeight(6.5),
    backgroundColor: '#007BFF',

    ...Platform.select({
      android: {
        marginTop: responsiveHeight(3),
      },
    }),
  },

  headerText: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    bottom: responsiveHeight(1),
    left: responsiveWidth(40),
    right: responsiveWidth(40),
  },

  low_outer: {
    height: '100%',
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    marginTop: responsiveHeight(2),
  },
  imageStyling: {
    width: responsiveWidth(82),
    height: responsiveHeight(35),
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  iconBlockStyling: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
  },
  iconBlockInner: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconOuter_01: {
    backgroundColor: '#655757',
    borderRadius: 1000,
    padding: responsiveWidth(2.5),
  },
  iconOuter_02: {
    backgroundColor: '#3AA859',
    borderRadius: 100,
    padding: responsiveWidth(2.5),
  },
  iconOuter_03: {
    backgroundColor: '#5452CC',
    borderRadius: 100,
    padding: responsiveWidth(2.5),
  },
  infoBlock: {
    backgroundColor: 'white',
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveWidth(9),
    borderRadius: 10,
    padding: responsiveWidth(3),
  },
  landInfoView: {
    backgroundColor: 'red',
  },
  infoView: {
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoTop: {},
  infoBottom: {},
  blockView: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(1),
  },
  textView: {
    marginLeft: responsiveWidth(2),
  },
  text01Styling: {
    color: '#65676B',
    fontWeight: 'bold',
  },
  text02Styling: {
    color: 'black',
    fontWeight: 'bold',
  },
  firstDouble: {},
  secondDouble: {},
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  descriptionBlock: {
    marginHorizontal: responsiveWidth(13),
    marginTop: responsiveHeight(2),
    height: responsiveHeight(20),
  },
  subTextOuter: {
    marginTop: responsiveHeight(1),
    marginTop: responsiveHeight(1),
  },
  subTextStyle: {
    textAlign: 'justify',
  },
});
