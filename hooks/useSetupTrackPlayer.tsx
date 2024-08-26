import { useEffect, useRef } from "react";
import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });
  await TrackPlayer.setVolume(1);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
  });
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitailized = useRef(false);
  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitailized.current = true;
        onLoad?.();
      })
      .catch((err) => console.log("Error setting player:", err));
  }, [onLoad]);
};
