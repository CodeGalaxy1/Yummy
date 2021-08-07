import React, { useState, useEffect } from 'react';

//Tags
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';

//Expo - vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Expo - camera
import { Camera } from 'expo-camera';

//Expo - image-picker
import * as ImagePicker from 'expo-image-picker';


//Functional Component(Add)
export default function Add(props, { navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  //Permissions
  useEffect(() => {
    (async () => {
      //Permission to camera
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      //Permission to gallery
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
  }, []);

  const takePicture = async () => {
      if (camera) {
          const data = await camera.takePictureAsync({
            quality: 0.1, //Specify the quality of compression
            base64: true //Format
          });
          setImage(data.base64);
      }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //MediaTypeOptions.Images - gives only the images.
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: true
    });

    if (!result.cancelled) {
      setImage(result.base64);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
          <View style={styles.cameraContainer}>
              <Camera 
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio} 
              type={type} 
              ratio={'1:1'} />
          </View>
          <View style={{ marginTop: 460, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button
              title="Flip Image"
              onPress={() => {
                  setType(
                      type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                  );
              }}>
          </Button>
          <MaterialCommunityIcons name="circle-slice-8" color={'#fff'} size={70} onPress={() => takePicture()} />
          <Button title="Gallery" onPress={() => pickImage()} />
          </View>
          {image === null ? 
          <View style={{ margin: 1, marginBottom: 40, flex: 1,  flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Button title="Next" onPress={() => Alert.alert('You must take a picture')} />
          </View> : 
          <View style={{ margin: 1, marginBottom: 40, flex: 1,  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Image source={{ uri: `data:image/image;base64,${image}` }} style={{ flex: 0.2, aspectRatio: 1}} />
            <Button title="Next" onPress={() => props.navigation.navigate("Save", { image })} />
        </View>}
      </View>
  );
}

//Css
const styles = StyleSheet.create({
    cameraContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 0.7
    }
})