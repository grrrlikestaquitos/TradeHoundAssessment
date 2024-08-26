import React, { useState } from 'react';

import {
  Button,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

function App(): React.JSX.Element {
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImageInfo[] | null>(null);

  const onPressRequestImageGalleryAccess = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(result);
  };

  const onPressSelectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      const images: ImagePicker.ImageInfo[] = result.selected;
      console.log(images)
      setSelectedImages(images);
    }
  };

  // Views

  const ItemSeparatorComponent = () => {
    return (
      <View style={styles.itemSeparator}/>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appText}>
        Trade Hound Assessment
      </Text>

      <View>
        <Text>
          Selection Results
        </Text>
      </View>

      <FlatList
        data={selectedImages}
        horizontal={true}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.uri }}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        )}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />

      <Button title="Select Multiple Images" onPress={onPressSelectImages}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appText: {
    textAlign: 'center',
  },
  itemSeparator: {
    padding: 8,
  },
  image: {
    height: 100,
    width: 100,
  },
  flatListContainer: {
    padding: 8,
  },
});

export default App;
