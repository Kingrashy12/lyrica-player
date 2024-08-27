import { ContextProviderType, PlayerContextType } from "@/types/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as MediaLibrary from "expo-media-library";
import TrackPlayer, { Capability, Track } from "react-native-track-player";
import { LyricaLogo, NextIcon, PrevIcon } from "@/assets";
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
  const [permissionResponse, setPermissionResponse] = useState<boolean | null>(
    null
  );

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
              id: asset.id, // Ensure every track has a unique id
              title: name,
              artist: artist,
              artwork: artwork,
              album: album,
              albumArtist: albumArtist,
              duration: asset.duration,
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

  useEffect(() => {
    if (permissionResponse === true) {
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
            icon: LyricaLogo,
            nextIcon: NextIcon,
            previousIcon: PrevIcon,
          });
          await TrackPlayer.add(tracks);
          await getTrackData();
        } catch (error) {
          console.log(error);
        }
      };

      setupPlayer();
    }
  }, [tracks, permissionResponse]);

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
