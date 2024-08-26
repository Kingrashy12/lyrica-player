import { LyricaLogo } from "@/assets";
import { colors, fontSize } from "@/constants/system";
import { defaultStyles } from "@/styles";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Track } from "react-native-track-player";

const TrackItem = ({ track }: { track: Track }) => {
  const isActiveTrack = false;
  const truncateTitle =
    track.title && track?.title.length > 22
      ? track?.title.slice(0, 22) + "..."
      : track.title;
  return (
    <TouchableOpacity style={TrackStyles.container}>
      <View className="flex flex-row gap-3 items-center">
        <Image
          source={track.artwork ? { uri: track.artwork } : LyricaLogo}
          style={{
            ...TrackStyles.trackArtworkImage,
            opacity: isActiveTrack ? 0.6 : 1,
            borderWidth: !track.artwork ? 1 : 0,
            borderColor: !track.artwork ? "white" : "black",
          }}
        />
        <View style={{ width: "auto" }}>
          <Text
            numberOfLines={1}
            style={{
              ...TrackStyles.trackTitleText,
              color: isActiveTrack ? colors.primary : colors.text,
            }}
          >
            {truncateTitle || "Unkown audio"}
          </Text>
          <Text style={TrackStyles.tractArtistText}>
            {track.artist || "Unkown artist"}
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Entypo
          name="dots-three-vertical"
          size={24}
          color="white"
          className="z-10 relative"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrackItem;

const TrackStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
  trackArtworkImage: {
    borderRadius: 25,
    width: 85,
    height: 85,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  tractArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});
