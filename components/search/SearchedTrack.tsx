import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import SearchItem from "./SearchItem";
import TrackPlayer, { Capability, Track } from "react-native-track-player";
import { State } from "react-native-gesture-handler";
import { usePlayer } from "@/context/usePlayer";
import LoaderKit from "react-native-loader-kit";

type SearchedType = {
  tracks: Track[];
  query: string;
};

const SearchedTrack = ({ tracks, query }: SearchedType) => {
  const { permissionResponse, isLoading } = usePlayer();

  const playTrack = async (index: number) => {
    try {
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      await TrackPlayer.setVolume(1);
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  const handlePlay = (index: number) => {
    playTrack(index);
  };

  if (permissionResponse === null) {
    return null; // Render nothing while waiting for permission check
  }

  if (permissionResponse === false) {
    return (
      <View className="w-full h-full items-center justify-center mt-36 flex-1">
        <Text className="text-red font-poppins-medium text-base">
          Permission to access media library was denied
        </Text>
      </View>
    );
  }

  return (
    <>
      {isLoading ? (
        <View className="w-full h-full items-center justify-center pt-48 pb-48">
          <LoaderKit
            name="BallSpinFadeLoader"
            color="blue"
            style={{ width: 50, height: 50, position: "absolute", top: 280 }}
          />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 120,
            paddingTop: 20,
            paddingHorizontal: 10,
            gap: 10,
          }}
          ListEmptyComponent={() => (
            <View className="w-full items-center justify-center h-full flex-1">
              <Text className="text-neutral-500 font-poppins-semi-bold text-base">
                No music found
              </Text>
            </View>
          )}
          data={tracks}
          scrollEnabled={false}
          renderItem={({ item: track, index }) => (
            <SearchItem play={handlePlay} index={index} track={track} />
          )}
        />
      )}
    </>
  );
};

export default SearchedTrack;
