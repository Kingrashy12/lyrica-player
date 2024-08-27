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
import TrackPlayer, { Track, useActiveTrack } from "react-native-track-player";

type TrackItemProps = {
  track: Track;
  play: (index: number) => void;
  index: number;
};

const SearchItem = ({ track, index, play }: TrackItemProps) => {
  const isActiveTrack = useActiveTrack()?.url === track.url;
  const truncateTitle =
    track.title && track.title.length > 22
      ? track.title.slice(0, 22) + "..."
      : track.title;
  return (
    <TouchableOpacity style={TrackStyles.container} onPress={() => play(index)}>
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
            {truncateTitle || "Unknown audio"}
          </Text>
          <Text style={TrackStyles.tractArtistText}>
            {track.artist || "Unknown artist"}
          </Text>
        </View>
      </View>

      {/* <TouchableOpacity>
        <Entypo
          name="dots-three-vertical"
          size={24}
          color="white"
          className="z-10 relative"
        />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default SearchItem;

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
    borderRadius: 20,
    width: 70,
    height: 70,
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
