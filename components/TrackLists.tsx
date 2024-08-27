import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import TrackItem from "./TrackItem";
import { tracks } from "@/assets/data/tracks";
import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  Event,
  State,
} from "react-native-track-player";

const TrackLists = () => {
  const trackCount = tracks.length;
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackTitle, setTrackTitle] = useState<string | undefined>();
  const [trackArtist, setTrackArtist] = useState<string | undefined>();
  const [trackArtwork, setTrackArtwork] = useState<string | undefined>();

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      await TrackPlayer.add(tracks);
      await getTrackData();
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setupPlayerIfNeeded();
  // }, []);

  // const getdata = useCallback(async () => {
  //   await getTrackData();
  // }, []);

  useEffect(() => {
    setupPlayer();
  }, []);

  const getTrackData = async () => {
    try {
      const activeTrackIndex = await TrackPlayer.getActiveTrackIndex();
      const trackObject = await TrackPlayer.getTrack(
        activeTrackIndex ? activeTrackIndex : 0
      );

      setTrackIndex(activeTrackIndex ? activeTrackIndex : 0);
      setTrackTitle(trackObject?.title);
      setTrackArtist(trackObject?.artist);
      setTrackArtwork(trackObject?.artwork);
    } catch (error) {
      console.error("Error retrieving track data:", error);
    }
  };

  const playTrack = async (index: number) => {
    try {
      // Skip to the selected track
      await TrackPlayer.skip(index);

      // Start playing the selected track
      await TrackPlayer.play();
      await TrackPlayer.setVolume(1);
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  const pauseTrack = async () => {
    try {
      const currentState = (await TrackPlayer.getPlaybackState()).state;
      if (currentState === State.Playing) {
        await TrackPlayer.pause();
      }
    } catch (error) {
      console.error("Error pausing track:", error);
    }
  };

  // Example of how to call the playTrack function when you want to play a specific track
  const handlePlay = (index: number) => {
    playTrack(index);
  };

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: 120,
        paddingTop: 140,
        paddingHorizontal: 10,
        gap: 10,
      }}
      data={tracks}
      scrollEnabled={false}
      renderItem={({ item: track, index }) => (
        <TrackItem play={handlePlay} index={index} track={track} />
      )}
    />
  );
};

export default TrackLists;
