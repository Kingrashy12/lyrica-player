import { useFavourite } from "@/context/useFavourite";
import React from "react";
import { FlatList, Text, View } from "react-native";
import TrackItem from "../music/TrackItem";
import TrackPlayer, { Track } from "react-native-track-player";

const FavouriteTracks = () => {
  const { favourites } = useFavourite();

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
    <FlatList
      className=""
      style={{ paddingHorizontal: 10, gap: 1, paddingBottom: 120 }}
      data={favourites}
      renderItem={({ item, index }) => (
        <TrackItem track={item} play={playTrack} index={index} />
      )}
      scrollEnabled={false}
    />
  );
};

export default FavouriteTracks;
