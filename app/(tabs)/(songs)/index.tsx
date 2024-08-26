import Header from "@/components/Header";
import TrackLists from "@/components/TrackLists";
import { defaultStyles } from "@/styles";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Song = () => {
  return (
    <View className="flex-1 bg-black pb-5">
      <Header headerTitle="Songs" hasSearch />
      <ScrollView>
        <TrackLists />
      </ScrollView>
    </View>
  );
};

export default Song;
