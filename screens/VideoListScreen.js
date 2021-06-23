import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image, ListItem } from 'react-native-elements';
import React, {useEffect, useState} from "react";

import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { BaseRouter } from "@react-navigation/native";
import { getVideos } from '../api/YTServer';

const VideoListScreen = ({ navigation }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos((data) => {
      console.log('received: ', data.items[0].snippet.title);
      setVideos(data.items);
    });
  }, []);

  const renderVideo = ({index, item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Video Viewer", item);
        }}
      >
        <ListItem key={index}>
          <Image 
            source={{uri: item.snippet.thumbnails.default.url}}
            style={{width: 100, height: 55}}
          />
          <ListItem.Content>
            <ListItem.Title> {item.snippet.title} </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList 
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        extraData={videos}
        renderItem={renderVideo} // {index: i, item: {...}}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
});

export default VideoListScreen;