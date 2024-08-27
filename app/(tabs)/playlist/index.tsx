import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const PlayList = () => {
  return (
    <View className="flex-1 bg-black w-full h-full items-center justify-center">
      <Header headerTitle="Playlists" />
      <View className="flex items-center">
        <Ionicons name="albums" size={100} color="blue" />
        <Text className="text-neutral-500 font-poppins-semi-bold">
          Your playlists will be displayed here
        </Text>
      </View>
    </View>
  );
};

export default PlayList;
