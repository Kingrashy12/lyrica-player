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
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import LoaderKit from "react-native-loader-kit";
import MusicMenu from "./MusicMenu";
import { useMusicMenu } from "@/context/useMenu";

type TrackItemProps = {
  track: Track;
  play: (index: number, queried?: Track) => void;
  index: number;
};

const TrackItem = ({ track, play, index }: TrackItemProps) => {
  const isActiveTrack = useActiveTrack()?.url === track.url;
  const { playing } = useIsPlaying();
  const { onOpen } = useMusicMenu();

  const truncateTitle =
    track.title && track?.title.length > 22
      ? track?.title.slice(0, 22) + "..."
      : track.title;
  const truncateArtist =
    track?.artist && track.artist.length > 25
      ? track.artist.slice(0, 25) + "..."
      : track?.artist;
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
            {truncateArtist || "Unknown artist"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          onOpen(track);
        }}
      >
        <Entypo
          name="dots-three-horizontal"
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
