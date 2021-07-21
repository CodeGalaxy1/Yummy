import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
  }, []);

  const takePicture = async () => {
      if (camera) {
          const data = await camera.takePictureAsync({
            quality: 1,
            base64: true
          });
          setImage(data.base64);
      }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
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
      <View style={{ flex: 1 }}>
          <View style={styles.cameraContainer}>
              <Camera 
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio} 
              type={type} 
              ratio={'1:1'} />
          </View>

        <View style=
        {{ 
            flex: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            alignSelf: 'center', 
            marginBottom: 30,
        }}>
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
          <Button title="Take Picture" onPress={() => takePicture()} />
          <Button title="Gallery" onPress={() => pickImage()} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
        {image && <Image source={{ uri: `data:image/image;base64,${image}` }} style={{ flex: 0.5, aspectRatio: 1}} />}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Next" onPress={() => navigation.navigate("Save", {image})} />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    cameraContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})