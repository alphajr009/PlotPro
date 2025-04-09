import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';

const Headersection = ({ navigation, title }) => {
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="white"
        />
        <View style={{marginTop:40,left:10,width:"70%"}}>
        <Text style={styles.headerText}>{title}</Text>
        </View>
      </Appbar.Header>
    </View>
  );
};

const styles = {
  header: {
    height: 45,
    backgroundColor: "#007BFF",

    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  headerText: {
   
    fontSize: 18,
    textAlign: "center",
    color: "white",
    position: "absolute",
    bottom: 7,
    left: 0,
    right: 0,
  },
};

export default Headersection;
