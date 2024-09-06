import { TextInputProps, ViewStyle } from "react-native";
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
  refresh: () => void;
};

declare type MenuListContextType = {
  isOpen: boolean;
  onOpen: (track: Track) => void;
  onClose: () => void;
  track?: Track;
};

declare type FavouriteContextType = {
  favourites: Track[];
  addTofavourite: (track?: Track) => void;
  removeFrom: (track?: Track) => void;
  refresh: () => void;
  isRefreshing: boolean;
  clearTracks: () => void;
};

declare type ConfirmDeleteType = {
  header: string;
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
};

declare type ButtonTypes = {
  children: string;
  variant?: "primary" | "danger" | "ghost";
  className?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

declare type PlayListType = {
  id: string;
  tracks: Track[];
  name: string;
  createdAt: Date;
};

declare type PlayListContextType = {
  playlists: PlayListType[];
  addToPlayList: (track: Track, playId: string) => void;
  removeFromPlaylist: (track: Track, playId: string) => void;
  refreshList: () => void;
  isRefreshing: boolean;
  createPlayList: (name: string) => void;
  clearList: () => void;
};

declare type PlayListModalType = {
  isOpen: boolean;
  onOpen: (track?: Track) => void;
  onClose: () => void;
  track?: Track;
};

declare type NewPlayListModalType = {
  isOpen: boolean;
  onOpen: (track?: Track) => void;
  onClose: () => void;
  name: string;
  track?: Track;
  onTextChange: (val: string) => void;
  resetName: () => void;
};
