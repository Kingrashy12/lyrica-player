import Header from "@/components/Header";
import ConfirmDelete from "@/components/modal/ConfirmDelete";
import Playlists from "@/components/playlist/Playlists";
import { useNewPlaylistModal } from "@/context/useNewPlaylistModal";
import { usePlaylist } from "@/context/usePlaylist";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const PlayList = () => {
  const { playlists, refreshList, isRefreshing, clearList } = usePlaylist();
  const { onOpen } = useNewPlaylistModal();
  const [clear, setClear] = useState(false);

  function clear_list() {
    clearList();
    setClear(false);
  }

  return (
    <View className="flex-1 bg-black w-full h-full">
      <Header
        headerTitle="Playlists"
        hasBackIcon
        showAddIcon
        onAddPress={onOpen}
        disableBin={playlists.length < 1}
        onBinPress={() => setClear(true)}
      />
      {clear && (
        <ConfirmDelete
          header="Are you sure?"
          label="This would clear all your playlists"
          onConfirm={clear_list}
          onCancel={() => setClear(false)}
        />
      )}
      {playlists.length >= 1 ? (
        <ScrollView
          className="w-full h-full"
          refreshControl={
            <RefreshControl onRefresh={refreshList} refreshing={isRefreshing} />
          }
        >
          <Playlists />
        </ScrollView>
      ) : (
        <View className="flex items-center flex-col h-1/2 justify-center">
          <Ionicons name="albums" size={100} color="blue" />
          <Text className="text-neutral-500 font-poppins-semi-bold">
            Your playlists will be displayed here
          </Text>
        </View>
      )}
    </View>
  );
};

export default PlayList;
