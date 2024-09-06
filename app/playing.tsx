import NowPlaying from "@/components/music/NowPlaying";
import ScreenHeader from "@/components/ScreenHeader";
import { defaultStyles } from "@/styles";
import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const playing = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={{ gap: 20 }} className="w-full flex-col h-full px-5 py-2">
        <ScreenHeader
          headerTitlte="Now Playing"
          hasIconOnRight
          rightIcon={<Fontisto name="equalizer" size={20} color="white" />}
        />
        <NowPlaying />
      </View>
    </SafeAreaView>
  );
};

export default playing;
