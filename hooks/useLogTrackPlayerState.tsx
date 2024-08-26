import { Event, useTrackPlayerEvents } from "react-native-track-player";

const event = [
  Event.PlaybackState,
  Event.PlaybackActiveTrackChanged,
  Event.PlaybackError,
];

export const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(event, async (event) => {
    if (event.type === Event.PlayerError) {
      console.warn("An error occurred:", event);
    }

    if (event.type === Event.PlaybackState) {
      console.log("Playback status:", event.state);
    }

    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log("Track changed", event.index);
    }
  });
};
