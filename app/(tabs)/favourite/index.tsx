import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Favourite = () => {
  return (
    <View className="flex-1 bg-black w-full h-full items-center justify-center">
      <Header headerTitle="Favourites" />
      <View className="flex items-center">
        <Ionicons name="heart" size={100} color="red" />
        <Text className="text-neutral-500 font-poppins-semi-bold">
          Your favourites songs will be displayed here
        </Text>
      </View>
    </View>
  );
};

export default Favourite;
