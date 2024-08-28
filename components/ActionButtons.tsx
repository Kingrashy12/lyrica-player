import { usePlayer } from "@/context/usePlayer";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { ComponentProps, useEffect, useState } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import TrackPlayer, {
  RepeatMode,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import {
  getRepeatMode,
  setRepeatMode,
} from "react-native-track-player/lib/src/trackPlayer";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const ActionButtons = () => {
  const { playing } = useIsPlaying();
  const activeTrack = useActiveTrack();
  const [trackIndex, setTrackIndex] = useState(0);
  const [disablePrev, setDisablePrev] = useState(false);
  const [mode, setMode] = useState<number>(RepeatMode.Queue);
  const [icon, setIcon] = useState<IconName>("repeat");
  const { tracks } = usePlayer();

  async function handleMode(mode: number) {
    setMode(mode);
    setRepeatMode(mode);
  }

  useEffect(() => {
    getRepeatMode().then((mode) => handleMode(mode));
    if (mode === 0) {
      setIcon("repeat-off");
      setRepeatMode(RepeatMode.Track);
    } else if (mode === 1) {
      setIcon("repeat-once");
      setRepeatMode(RepeatMode.Queue);
    } else if (mode === 2) {
      setIcon("repeat");
      setRepeatMode(RepeatMode.Off);
    }
  }, []);

  const getTrackData = async () => {
    try {
      const activeTrackIndex = await TrackPlayer.getActiveTrackIndex();

      setTrackIndex(activeTrackIndex ? activeTrackIndex : 0);
    } catch (error) {
      console.error("Error retrieving track data:", error);
    }
  };

  useEffect(() => {
    getTrackData();
  }, [activeTrack?.url]);

  async function play() {
    if (playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }

  async function next() {
    if (trackIndex >= tracks.length - 1) {
      await TrackPlayer.skip(0);
      await TrackPlayer.play();
    } else {
      await TrackPlayer.skipToNext();
    }
  }

  async function prev() {
    await TrackPlayer.skipToPrevious();
  }

  useEffect(() => {
    if (trackIndex === 0) {
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
    }
  }, [trackIndex]);

  async function repeat() {
    if (mode === 0) {
      setMode(RepeatMode.Track);
      setRepeatMode(mode);
      setIcon("repeat-once");
      ToastAndroid.show("Repeat current track", 3000);
    } else if (mode === 1) {
      setMode(RepeatMode.Queue);
      setRepeatMode(mode);
      setIcon("repeat");
      ToastAndroid.show("Repeat tracks", 3000);
    } else if (mode === 2) {
      setMode(RepeatMode.Off);
      setRepeatMode(mode);
      setIcon("repeat-off");
      ToastAndroid.show("Repeat off", 3000);
    }
  }

  return (
    <View className="flex items-center flex-row w-full absolute bottom-20 bg-black justify-between z-50">
      <TouchableOpacity>
        <FontAwesome6 name="shuffle" size={24} color="#A8A8A8" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={prev}
        disabled={disablePrev}
        className={`bg-neutral-900 ${
          disablePrev && "opacity-50"
        } w-[44px] h-[44px] rounded-full items-center justify-center`}
      >
        <Ionicons
          name="play-skip-back"
          size={24}
          color={disablePrev ? "gray" : "white"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={play}
        className="bg-white w-[70px] h-[70px] rounded-full items-center justify-center"
      >
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={next}
        className="bg-neutral-900 w-[44px] h-[44px] rounded-full items-center justify-center"
      >
        <Ionicons name="play-skip-forward" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={repeat}>
        <MaterialCommunityIcons name={icon} size={26} color="#A8A8A8" />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
