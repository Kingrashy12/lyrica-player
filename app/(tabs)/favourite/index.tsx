import FavouriteTracks from "@/components/favourite/FavouriteTracks";
import Header from "@/components/Header";
import ConfirmDelete from "@/components/modal/ConfirmDelete";
import { useFavourite } from "@/context/useFavourite";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const Favourite = () => {
  const { favourites, isRefreshing, refresh, clearTracks } = useFavourite();
  const [clear, setClear] = useState(false);

  function clear_list() {
    clearTracks();
    setClear(false);
  }

  return (
    <View className="flex-1 bg-black w-full h-full pb-5">
      <Header
        headerTitle="Favourites"
        className="py-1"
        hasBackIcon
        onBinPress={() => setClear(true)}
        disableBin={favourites.length < 1}
      />
      {clear && (
        <ConfirmDelete
          header="Are you sure?"
          label="This would clear all your favourites tracks"
          onConfirm={clear_list}
          onCancel={() => setClear(false)}
        />
      )}
      {favourites.length >= 1 ? (
        <ScrollView
          className="w-full h-full"
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
          }
        >
          <FavouriteTracks />
        </ScrollView>
      ) : (
        <View className="flex items-center flex-col h-1/2 justify-center">
          <Ionicons name="heart" size={100} color="red" />
          <Text className="text-neutral-500 font-poppins-semi-bold">
            Your favourites songs will be displayed here
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favourite;
