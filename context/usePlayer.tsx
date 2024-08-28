import { ContextProviderType, PlayerContextType } from "@/types/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as MediaLibrary from "expo-media-library";
import TrackPlayer, {
  Capability,
  State,
  Track,
  useActiveTrack,
} from "react-native-track-player";
import { getAudioMetadata } from "@missingcore/audio-metadata";

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const isSupportedFile = (fileUri: string): boolean => {
  const supportedExtensions = [".flac", ".mp3", ".m4a"]; // Add more as needed
  return supportedExtensions.some((ext) => fileUri.endsWith(ext));
};

export const PlayerProvider = ({ children }: ContextProviderType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const activeTrack = useActiveTrack();
  const [permissionResponse, setPermissionResponse] = useState<boolean | null>(
    null
  );

  const updateTrackArtist = async () => {
    try {
      // Get the current track index
      const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

      if (currentTrackIndex !== null) {
        // Get the current track details
        const currentTrack = await TrackPlayer.getTrack(currentTrackIndex || 0);

        if (currentTrack) {
          if (!currentTrack.artist || currentTrack.artist === "") {
            await TrackPlayer.updateMetadataForTrack(currentTrackIndex || 0, {
              ...currentTrack,
              artist: "Unknown artist",
            });
          }
          if (!currentTrack.title || currentTrack.title === "") {
            await TrackPlayer.updateMetadataForTrack(currentTrackIndex || 0, {
              ...currentTrack,
              title: "Unknown audio",
            });
          }
        }
      } else {
        console.log("No track is currently playing.");
      }
    } catch (error) {
      console.error("Error updating track artist:", error);
    }
  };

  useEffect(() => {
    updateTrackArtist();
  }, [activeTrack]);

  // Setup audio permission
  const getMusics = useCallback(async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      setPermissionResponse(true);
      setIsLoading(true);
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        sortBy: MediaLibrary.SortBy.default,
      });

      const musicFilesWithMetadata = await Promise.all(
        media.assets.map(async (asset) => {
          try {
            const fileUri = asset.uri;

            if (!isSupportedFile(fileUri)) {
              return undefined;
            }

            const wantedTags = [
              "album",
              "albumArtist",
              "artist",
              "name",
              "track",
              "year",
              "artwork",
            ] as const;

            const metadata = await getAudioMetadata(fileUri, wantedTags);
            const { name, artist, artwork, album, albumArtist } =
              metadata.metadata;

            const track: Track = {
              title: name,
              artist: artist,
              artwork: artwork,
              album: album,
              albumArtist: albumArtist,
              url: fileUri,
            };

            return track;
          } catch (error) {
            console.error("Error fetching or parsing metadata:", error);
            return undefined;
          }
        })
      );

      const validTracks = musicFilesWithMetadata.filter(
        (track): track is Track => track !== undefined
      );

      setTracks(validTracks);
      setIsLoading(false);
    } else {
      setPermissionResponse(false);
    }
  }, []);

  useEffect(() => {
    getMusics();
  }, [getMusics]);

  const setupPlayer = async () => {
    try {
      if (State.None) {
        await TrackPlayer.setupPlayer();
      }
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
      // await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const getTrackData = async () => {
    try {
      const activeTrackIndex = await TrackPlayer.getActiveTrackIndex();
      const trackObject = await TrackPlayer.getTrack(
        activeTrackIndex ? activeTrackIndex : 0
      );

      setTrackIndex(activeTrackIndex ? activeTrackIndex : 0);
    } catch (error) {
      console.error("Error retrieving track data:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && tracks.length >= 1) {
      setupPlayer();
    }
  }, [tracks, isLoading]);

  return (
    <PlayerContext.Provider
      value={{ isLoading, trackIndex, tracks, permissionResponse }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer can't be called outside PlayerProvider");
  }
  return context;
};
