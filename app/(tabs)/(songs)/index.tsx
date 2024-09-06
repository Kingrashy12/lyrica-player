import Header from "@/components/Header";
import TrackLists from "@/components/music/TrackLists";
import { usePlayer } from "@/context/usePlayer";
import { defaultStyles } from "@/styles";
import React from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const Song = () => {
  const { refresh, isLoading } = usePlayer();
  return (
    <View className="flex-1 bg-black pb-5">
      <Header headerTitle="Songs" hasSearch onHome />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
      >
        <TrackLists />
      </ScrollView>
    </View>
  );
};

export default Song;
