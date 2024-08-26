import React from "react";
import { FlatList, Text, View } from "react-native";
import SearchItem from "./SearchItem";
import { Track } from "react-native-track-player";

type SearchedType = {
  tracks: TrackData[];
};

const SearchedTrack = ({ tracks }: { tracks: Track[] }) => {
  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: 120,
        paddingTop: 20,
        paddingHorizontal: 10,
        gap: 10,
      }}
      data={tracks}
      scrollEnabled={false}
      renderItem={({ item: track }) => <SearchItem track={track} />}
    />
  );
};

export default SearchedTrack;
