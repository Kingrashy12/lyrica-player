import { usePlaylist } from "@/context/usePlaylist";
import React from "react";
import { FlatList, Text } from "react-native";
import PlayListItem from "./PlayListItem";

const Playlists = () => {
  const { playlists } = usePlaylist();
  return (
    <FlatList
      data={playlists}
      style={{
        gap: 1,
        paddingHorizontal: 10,
        paddingBottom: 120,
        paddingTop: 20,
      }}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <PlayListItem
          tracks={item.tracks}
          name={item.name}
          id={item.id}
          createdAt={item.createdAt}
        />
      )}
    />
  );
};

export default Playlists;
