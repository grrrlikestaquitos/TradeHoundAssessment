import React, { useState } from 'react';

import {
  Button,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

// Views

const ItemSeparatorComponent = () => {
  return (
    <View style={styles.itemSeparator} />
  );
};

const FlatListItemImage = ({ item }: ListRenderItemInfo<ImagePicker.ImageInfo>) => {
  return (
    <View>
      <Image
        source={{ uri: item.uri }}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  )
}

function App(): React.JSX.Element {
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImageInfo[] | null>(null);

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
      setSelectedImages(images);

      console.log(images);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>
        Selection Results
      </Text>

      <FlatList
        data={selectedImages}
        horizontal={true}
        contentContainerStyle={styles.flatListContainer}
        renderItem={FlatListItemImage}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(item) => item.fileName || ''}
      />

      <Button title="Select Multiple Images" onPress={onPressSelectImages} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingHorizontal: 16,
  },
  itemSeparator: {
    padding: 8,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default App;
