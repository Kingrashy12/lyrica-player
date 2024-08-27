import { colors } from "@/constants/system";
import { formatSecondsToMinutes } from "@/utils";
import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";

const ProgressBar = () => {
  const { duration, position } = useProgress(250);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  return (
    <View className="flex-1 flex relative">
      <Slider
        style={styles.progressBar}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#fff"
        onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
      />
      <View style={styles.progressLevelDuraiton}>
        <Text style={styles.progressLabelText}>{trackElapsedTime}</Text>
        <Text style={styles.progressLabelText}>
          {"-"} {trackRemainingTime}
        </Text>
      </View>
      <View className="w-full justify-between items-center">
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    marginTop: 20,
  },
  progressLevelDuraiton: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#FFF",
  },
});
