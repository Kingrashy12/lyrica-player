import { ScreenHeaderType } from "@/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ScreenHeader = ({
  headerTitlte,
  hasIconOnRight,
  rightIcon,
}: ScreenHeaderType) => {
  return (
    <View
      style={{ gap: hasIconOnRight ? 1 : 80 }}
      className={`flex flex-row items-center ${
        hasIconOnRight && "justify-between"
      }`}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center"
      >
        <MaterialIcons name="keyboard-arrow-left" size={25} color="black" />
      </TouchableOpacity>
      <Text className="text-white font-poppins-medium text-base">
        {headerTitlte}
      </Text>
      {hasIconOnRight && <TouchableOpacity>{rightIcon}</TouchableOpacity>}
    </View>
  );
};

export default ScreenHeader;
