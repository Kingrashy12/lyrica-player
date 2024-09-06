import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const StateBar = () => {
  return (
    <View className="w-full flex-row gap-2 items-center mt-2">
      <TouchableOpacity
        className="bg-blue-500 p-2 w-1/2 rounded-xl flex flex-col gap-1"
        onPress={() => router.push("/(tabs)/favourite")}
      >
        <MaterialIcons name="favorite" size={24} color="white" />
        <Text className="text-white font-poppins-medium text-base">
          Favourite
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 p-2 w-1/2 rounded-xl flex flex-col gap-1"
        onPress={() => router.push("/(tabs)/playlist")}
      >
        <Ionicons name="albums" size={24} color="white" />
        <Text className="text-white font-poppins-medium text-base">
          Playlist
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StateBar;
