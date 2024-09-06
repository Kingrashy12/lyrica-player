import { LyricaLogo } from "@/assets";
import { PlayListType } from "@/types/types";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PlayListItem = ({ tracks, id, createdAt, name }: PlayListType) => {
  const image = tracks[0]?.artwork;

  return (
    <TouchableOpacity
      className="flex flex-row items-center w-full"
      onPress={() => router.push(`/${[id]}`)}
    >
      <View className="flex-row gap-3 mb-4 flex items-center">
        <Image
          source={image ? { uri: image } : LyricaLogo}
          alt="Playlist"
          className="w-16 h-16 rounded-xl"
        />
        <Text className="text-white font-poppins-semi-bold text-lg">
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlayListItem;
