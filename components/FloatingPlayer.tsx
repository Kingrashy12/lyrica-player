import { LyricaLogo } from "@/assets";
import { colors } from "@/constants/system";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FloatingPlayer = () => {
  return (
    <View
      style={{
        bottom: 65,
        position: "absolute",
        borderRadius: 25,
        height: "auto",
        // width: "100%",
        justifyContent: "space-between",
        left: 10,
        right: 20,
        zIndex: 10,
      }}
      className="bg-trans90 flex-row items-center px-6 py-2"
    >
      <View className="flex-row gap-2 items-center">
        <Image
          source={LyricaLogo}
          style={{ borderColor: "white", borderWidth: 1 }}
          className="w-[70px] h-[70px] rounded-[20px]"
        />
        <View>
          <Text className="font-poppins-semi-bold text-white text-base">
            Title
          </Text>
          <Text style={{ color: colors.textMuted }}>Artisit</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center">
        <FontAwesome6 name="play" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;
