import TrackPlayer from "react-native-track-player";

export async function getTrackIndex(trackUri: string) {
  try {
    const queue = await TrackPlayer.getQueue();
    const trackIndex = queue.findIndex((track) => track.url === trackUri);
    return trackIndex;
  } catch (error) {
    console.error("Error saving active track:", error);
  }
}
