import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const screenWidth = Dimensions.get('window').width;
const marginLeft = screenWidth * 0.8;

export const styles = StyleSheet.create({
  testingText: {
    color: 'red',
  },
  low_outer: {
    width: '90%',
    height: responsiveHeight(90),
  },
  top_Text_Styling: {
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  top_Bar_Whole: {
    height: responsiveHeight(6.5),
    backgroundColor: '#007BFF',
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  top_Bar_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: responsiveWidth(5),
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  imageStyling: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    borderRadius: 20,
  },
  iconBlockStyling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 35,
  },
  iconBlockInner: {
    alignItems: 'center',
  },
  iconOuter_01: {
    backgroundColor: '#655757',
    borderRadius: 1000,
    padding: 10,
  },
  iconOuter_02: {
    backgroundColor: '#3AA859',
    borderRadius: 100,
    padding: 10,
  },
  iconOuter_03: {
    backgroundColor: '#5452CC',
    borderRadius: 100,
    padding: 10,
  },
  infoBlock: {
    backgroundColor: 'white',
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveWidth(5),
    borderRadius: 10,
    padding: responsiveWidth(1),
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
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  descriptionBlock: {
    marginTop: responsiveHeight(2),
    backgroundColor: 'white',
    height: responsiveHeight(20),
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  subTextOuter: {
    marginTop: responsiveHeight(1),
  },
  subTextStyle: {
    textAlign: 'justify',
  },
  inputBlock: {
    marginTop: responsiveHeight(1.7),
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: responsiveHeight(2),
    flexDirection: 'row',
    paddingVertical: responsiveHeight(1),
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    height: responsiveHeight(5),
    width: '65%',
    marginHorizontal: responsiveWidth(1),
    fontSize: responsiveFontSize(2),
  },
  textInput02: {
    backgroundColor: 'white',
    height: responsiveHeight(5),
    width: '65%',
    marginLeft: responsiveWidth(1),
    fontSize: responsiveFontSize(2),
  },
  descriptionInput: {
    backgroundColor: 'white',
    width: '95%',
  },
  editIconStyle: {
    marginLeft: responsiveWidth(79),
    marginTop: responsiveHeight(1),
  },
  scrollViewCenter: {
    alignItems: 'center',
  },
});
