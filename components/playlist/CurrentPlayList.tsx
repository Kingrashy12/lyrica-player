import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import ScreenHeader from "../ScreenHeader";
import { usePlaylist } from "@/context/usePlaylist";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { LyricaLogo } from "@/assets";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrackItem from "../music/TrackItem";
import TrackPlayer, { Track } from "react-native-track-player";
import { usePlayer } from "@/context/usePlayer";

const CurrentPlayList = () => {
  const { playlists } = usePlaylist();
  const route = useRoute();
  const { currentplayId }: any = route.params;
  const playlist = playlists.find((list) => list.id === currentplayId);
  const image = playlist?.tracks[0]?.artwork;
  const { tracks } = usePlayer();

  const playTrack = async (index: number, queried?: Track) => {
    try {
      // Get the current queue
      const queue = await TrackPlayer.getQueue();

      // Find the correct index for the queried track
      const correctIndex = queue.findIndex(
        (track) => track.url === queried?.url
      );

      // Skip to the correct track
      if (correctIndex !== -1) {
        await TrackPlayer.skip(correctIndex);
        await TrackPlayer.play();
        await TrackPlayer.setVolume(1);
      } else {
        console.error("Track not found in queue:", queried);
      }
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  return (
    <View style={{ gap: 20, paddingBottom: 50 }} className="w-full h-full">
      <View className="w-full flex-col px-5 py-2 rounded-b-2xl">
        <ScreenHeader headerTitlte="PlayList" className="rounded-b-lg" />
      </View>
      <View className="w-full h-full">
        <Image
          source={image ? { uri: image } : LyricaLogo}
          className="w-full h-64"
        />
        <View className="flex-row items-center justify-between w-full px-5 py-3">
          <Text className="text-white font-poppins-bold text-2xl">
            {playlist?.name}
          </Text>
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="playlist-music"
              size={24}
              color="white"
            />
            <Text className="font-poppins-medium text-neutral-400 text-sm">
              {playlist?.tracks.length}
            </Text>
          </View>
        </View>
        <FlatList
          data={playlist?.tracks}
          // data={tracks}
          style={{ gap: 2, paddingHorizontal: 10, marginBottom: 50 }}
          renderItem={({ index, item }) => (
            <TrackItem track={item} index={index} play={playTrack} />
          )}
        />
      </View>
    </View>
  );
};

export default CurrentPlayList;
