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
