import { LyricaLogo } from "@/assets";
import { colors } from "@/constants/system";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

const FloatingPlayer = () => {
  const track = useActiveTrack();
  const { playing } = useIsPlaying();

  const truncateTitle =
    track?.title && track.title.length > 20
      ? track.title.slice(0, 20) + "..."
      : track?.title;
  const truncateArtist =
    track?.artist && track.artist.length > 25
      ? track.artist.slice(0, 25) + "..."
      : track?.artist;

  if (!track?.url) {
    return null;
  }

  async function play() {
    if (playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }

  return (
    <TouchableOpacity
      style={{
        bottom: 5,
        position: "absolute",
        height: 150,
        width: "100%",
        justifyContent: "space-between",
        zIndex: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: "center",
      }}
      className="bg-trans90 flex-row items-center px-6 py-2 border border-t-neutral-900"
      onPress={() => router.push("/playing")}
    >
      <>
        <View className="flex-row gap-2 items-center -translate-y-6">
          <Image
            source={track.artwork ? { uri: track.artwork } : LyricaLogo}
            style={{
              borderColor: track.artwork ? "" : "white",
              borderWidth: track.artwork ? 0 : 1,
            }}
            className="w-[70px] h-[70px] rounded-[20px]"
          />
          <View>
            <Text className="font-poppins-semi-bold text-white text-base">
              {truncateTitle || "Unknown audio"}
            </Text>
            <Text style={{ color: colors.textMuted }}>
              {truncateArtist || "Unknown artist"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={play}
          className="bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center -translate-y-6"
        >
          <FontAwesome6
            name={playing ? "pause" : "play"}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;
