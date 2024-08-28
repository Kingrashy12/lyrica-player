import { LyricaLogo } from "@/assets";
import { colors, fontSize } from "@/constants/system";
import { defaultStyles } from "@/styles";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import TrackPlayer, {
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import LoaderKit from "react-native-loader-kit";

type TrackItemProps = {
  track: Track;
  play: (index: number, track: Track) => void;
  index: number;
};

const SearchItem = ({ track, index, play }: TrackItemProps) => {
  const isActiveTrack = useActiveTrack()?.url === track.url;
  const { playing } = useIsPlaying();
  const truncateTitle =
    track.title && track.title.length > 22
      ? track.title.slice(0, 22) + "..."
      : track.title;
  return (
    <TouchableOpacity
      style={TrackStyles.container}
      onPress={() => play(index, track)}
    >
      <View className="flex flex-row gap-3 items-center">
        <View>
          <Image
            source={track.artwork ? { uri: track.artwork } : LyricaLogo}
            style={{
              ...TrackStyles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
              borderWidth: !track.artwork ? 1 : 0,
              borderColor: !track.artwork ? "white" : "black",
            }}
          />

          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={TrackStyles.trackPlayingIndicator}
                name="LineScalePulseOut"
                color="blue"
              />
            ) : (
              <FontAwesome6
                style={TrackStyles.trackPausedIndicator}
                name="play"
                size={40}
                color="blue"
              />
            ))}
        </View>
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
    padding: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
  trackArtworkImage: {
    borderRadius: 20,
    width: 80,
    height: 80,
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
  trackPlayingIndicator: {
    position: "absolute",
    width: 50,
    height: 50,
    left: 18,
    top: 15,
  },
  trackPausedIndicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 29,
    top: 20,
  },
});
