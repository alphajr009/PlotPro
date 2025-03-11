import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

export const usePermissions = () => {
  const checkPermissions = async () => {
    const camera = await Camera.getCameraPermissionsAsync();
    const location = await Location.getForegroundPermissionsAsync();
    const media = await MediaLibrary.getPermissionsAsync();

    return camera.granted && location.granted && media.granted;
  };

  const requestAllPermissions = async () => {
    await Camera.requestCameraPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
    await MediaLibrary.requestPermissionsAsync();
  };

  return { checkPermissions, requestAllPermissions };
};
