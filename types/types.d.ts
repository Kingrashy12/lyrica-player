import { Track } from "react-native-track-player";

declare type HeaderType = {
  label: string;
  rightIcon: React.ReactElement;
  leftIcon?: React.ReactElement;
};

declare type TabIconType = {
  isfocused: boolean;
  icon: IntrinsicAttributes;
  color: string;
  size: number;
  name: string;
};

declare type SongType = {
  id: string;
  filename: string;
  duration: number;
  albumId?: string;
  modificationTime: number;
  uri: string;
  width: number;
  height: number;
  creationTime: number;
  mediaType: any;
};

declare type AudioMetadataType = {
  album: string | undefined;
  albumArtist: string | undefined;
  artist: string | undefined;
  artwork: string | undefined;
  name: string | undefined;
  track: number | undefined;
  year: number;
};

declare type TrackData = {
  url: string;
  title: string;
  artist?: string;
  artwork?: string;
};

declare type TrackType = {
  track: TrackData;
};

declare type ScreenHeaderType = {
  hasIconOnRight?: boolean;
  rightIcon?: React.ReactElement;
  headerTitlte: string;
  className?: string;
};

declare type ContextProviderType = {
  children: React.ReactNode;
};

declare type PlayerContextType = {
  tracks: Track[];
  isLoading: boolean;
  permissionResponse: boolean | null;
  trackIndex: number;
};
