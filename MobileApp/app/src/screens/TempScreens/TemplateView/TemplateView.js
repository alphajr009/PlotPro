import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './TemplateViewStyles';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import AxiosInstance from '../../../AxiosInstance';
const truncateText = (text, maxLength = 10) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const ClearLandIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="island"
    size={responsiveFontSize(2.8)}
    color="white"
  />
);

const PlantationIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="sprout"
    size={responsiveFontSize(2.8)}
    color="white"
  />
);

const FenceSetupIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="fence"
    size={responsiveFontSize(2.8)}
    color="white"
  />
);

const TypeIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="format-list-bulleted-type"
    size={responsiveFontSize(2.8)}
    color="grey"
  />
);
const PerimeterIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="vector-square"
    size={responsiveFontSize(2.8)}
    color="grey"
  />
);

const AreaIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="texture-box"
    size={responsiveFontSize(2.8)}
    color="grey"
  />
);

const CustomMapIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="map-marker-radius"
    size={responsiveFontSize(2.8)}
    color="grey"
  />
);

const CustomEditIcon = ({ navigation, item }) => (
  <MaterialCommunityIcons
    name="square-edit-outline"
    size={responsiveFontSize(2.8)}
    color={'white'}
    style={{ marginRight: responsiveWidth(3) }}
  />
);

const TemplateView = ({ route, navigation }) => {
  const { item } = route.params;
  const id = item._id;
  useEffect(() => {
    console.log('template view screen ', item._id);
  }, []);

  const handleEdit = (item) => {
    console.log(item);
    navigation.navigate('ResizeMap', {
      templateId: item._id,
      Area: item.area,
      Perimeter: item.perimeter,
    });
  };

  // check id exist in the databse
  const checkIdFence = async (id) => {
    try {
      const response = await AxiosInstance.get(`/api/fence/check-id/${id}`);
      if (response.data.exists) {
        console.log('ID exists');
        navigation.navigate('FenceDetails', { id: item._id, item: item });
      } else {
        console.log('ID does not exist');
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log('ID not found');
        navigation.navigate('Fence', {
          id: item._id,
          Area: item.area,
          Perimeter: item.perimeter,
          item: item,
        });
      } else {
        console.error('Error checking ID:', error);
        // Handle other errors
      }
    }
  };

  const checkIdClearLand = async (id) => {
    try {
      const response = await AxiosInstance.get(`/api/clearLand/check-id/${id}`);
      if (response.data.exists) {
        console.log('ID exists');
        navigation.navigate('EffortOutput', { id: item._id, item: item });
      } else {
        console.log('ID does not exist');
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log('ID not found');
        navigation.navigate('Clearland', {
          id: item._id,
          Area: item.Area,
          Perimeter: item.Perimeter,
          item: item,
        });
      } else {
        console.error('Error checking ID:', error);
        // Handle other errors
      }
    }
  };

  const checkIdPlantation = async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/plantation/check-id/${id}`
      );
      if (response.data.exists) {
        console.log('ID exists');
        navigation.navigate('PlantationDetails', { id: item._id, item: item });
      } else {
        console.log('ID does not exist');
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log('ID not found');
        navigation.navigate('Plantation', {
          id: item._id,
          area: item.area,
          perimeter: item.perimeter,
          item: item,
        });
      } else {
        console.error('Error checking ID:', error);
        // Handle other errors
      }
    }
  };

  return (
    <>
      <Appbar.Header style={styles.top_Bar} dark={true} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('SavedTemplatesScreen');
          }}
        />
        <Appbar.Content
          title={item.templateName}
          titleStyle={styles.title_text}
        />
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <CustomEditIcon />
        </TouchableOpacity>
      </Appbar.Header>
      <View style={styles.low_outer}>
        <View style={styles.imageView}>
          <Image
            source={{
              uri:
                item.imageUrl ||
                'https://i.pcmag.com/imagery/articles/01IB0rgNa4lGMBlmLyi0VP6-6..v1611346416.png',
            }}
            style={styles.imageStyling}
          />
        </View>
        {/* icons_block */}
        <View style={styles.iconBlockStyling}>
          <View style={styles.iconBlockInner}>
            <TouchableOpacity onPress={() => checkIdClearLand(item._id)}>
              <View style={styles.iconOuter_01}>
                <ClearLandIcon />
              </View>
            </TouchableOpacity>
            <Text>Clear land</Text>
          </View>

          <TouchableOpacity onPress={() => checkIdPlantation(item._id)}>
            <View style={styles.iconBlockInner}>
              <View style={styles.iconOuter_02}>
                <PlantationIcon />
              </View>
              <Text>Plantation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => checkIdFence(item._id)}>
            <View style={styles.iconBlockInner}>
              <View style={styles.iconOuter_03}>
                <FenceSetupIcon />
              </View>
              <Text>Fence setup</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* info_block */}
        <View style={styles.infoBlock}>
          <View>
            <Text style={styles.text02Styling}>Land Type</Text>
          </View>
          <View style={styles.rowView}>
            <View style={styles.firstDouble}>
              <View style={styles.blockView}>
                <TypeIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Type</Text>
                  <Text style={styles.text02Styling}>
                    {truncateText(item.landType)}
                  </Text>
                </View>
              </View>
              <View style={styles.blockView}>
                <PerimeterIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Perimeter </Text>
                  <Text style={styles.text02Styling}>
                    {parseFloat(item.perimeter).toFixed(3)} km
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.secondDouble}>
              <View style={styles.blockView}>
                <AreaIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Area</Text>
                  <Text style={styles.text02Styling}>
                    {parseFloat(item.area).toFixed(3)} perch
                  </Text>
                </View>
              </View>
              <View style={styles.blockView}>
                <CustomMapIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Location</Text>
                  <Text style={styles.text02Styling}>
                    {truncateText(item.location)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Description block */}
        <View style={styles.descriptionBlock}>
          <Text style={styles.text02Styling}>Description</Text>
          <View style={styles.subTextOuter}>
            <Text style={styles.subTextStyle}>{item.description}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default TemplateView;
