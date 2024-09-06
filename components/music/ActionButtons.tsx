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
  const [mode, setMode] = useState<number>(RepeatMode.Off);
  const [icon, setIcon] = useState<any>("repeat-off");
  const { tracks } = usePlayer();

  async function handleMode(mode: number) {
    setMode(mode);
    await TrackPlayer.setRepeatMode(mode);
  }

  useEffect(() => {
    TrackPlayer.getRepeatMode().then((currentMode) => handleMode(currentMode));

    if (mode === RepeatMode.Off) {
      setIcon("repeat-off");
    } else if (mode === RepeatMode.Track) {
      setIcon("repeat-once");
    } else if (mode === RepeatMode.Queue) {
      setIcon("repeat");
    }
  }, [mode]);

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
    try {
      if (mode === RepeatMode.Off) {
        setMode(RepeatMode.Track);
        setIcon("repeat-once");
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        ToastAndroid.show("Repeat current track", ToastAndroid.SHORT);
      } else if (mode === RepeatMode.Track) {
        setMode(RepeatMode.Queue);
        setIcon("repeat");
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        ToastAndroid.show("Repeat tracks", ToastAndroid.SHORT);
      } else if (mode === RepeatMode.Queue) {
        setMode(RepeatMode.Off);
        setIcon("repeat-off");
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        ToastAndroid.show("Repeat off", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error setting repeat mode:", error);
    }
  }

  // async function shuffle() {

  // }

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
