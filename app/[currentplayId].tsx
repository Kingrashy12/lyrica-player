import CurrentPlayList from "@/components/playlist/CurrentPlayList";
import { defaultStyles } from "@/styles";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

const playlist = () => {
  return (
    <SafeAreaView style={defaultStyles.container} className="h-full w-full">
      <CurrentPlayList />
    </SafeAreaView>
  );
};

export default playlist;
