import { LyricaLogo } from "@/assets";
import { colors } from "@/constants/system";
import React from "react";
import { Image, Text, View } from "react-native";
import { useActiveTrack, useProgress } from "react-native-track-player";
import ActionButtons from "./ActionButtons";
import ProgressBar from "./ProgressBar";

const NowPlaying = () => {
  const currentTrack = useActiveTrack();
  const { title, artist, artwork, album, duration } = { ...currentTrack };
  const progress = useProgress();

  return (
    <View className="w-full flex flex-col h-full relative">
      <Image
        source={artwork ? { uri: artwork } : LyricaLogo}
        className="rounded-[25px] w-[320px] h-[320px]"
      />
      <View className="self-start mt-2">
        <Text className="font-poppins-bold text-2xl text-white">
          {title || "Unknown audio"}
        </Text>
        <Text
          style={{ color: colors.textMuted }}
          className="font-poppins-semi-bold text-base"
        >
          {artist || "Unkonwn artist"}
        </Text>
      </View>
      <View className="mt-1 w-full flex-1">
        <ProgressBar />
      </View>
      <ActionButtons />
    </View>
  );
};

export default NowPlaying;
