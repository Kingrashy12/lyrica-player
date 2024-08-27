export const formatDuration = (durationInMillis: number): string => {
  const totalSeconds = Math.floor(durationInMillis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Ensure seconds are always two digits (e.g., "02" instead of "2")
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};

export const formatSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

// export const generateTracksListId = (trackListName: string, search?: string) => {
// 	return `${trackListName}${`-${search}` || ''}`
// }
