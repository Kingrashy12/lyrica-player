import React from "react";
import { FlatList, Text, View } from "react-native";
import TrackItem from "./TrackItem";
import { tracks } from "@/assets/data/tracks";

const TrackLists = () => {
  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: 120,
        paddingTop: 140,
        paddingHorizontal: 10,
        gap: 10,
      }}
      data={tracks}
      scrollEnabled={false}
      renderItem={({ item: track }) => <TrackItem track={track} />}
    />
  );
};

export default TrackLists;
