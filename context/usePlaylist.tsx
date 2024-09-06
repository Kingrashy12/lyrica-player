import {
  ContextProviderType,
  PlayListContextType,
  PlayListType,
} from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { generateId } from "@/utils";
import { Track } from "react-native-track-player";
import { ToastAndroid } from "react-native";

const PlaylistContext = createContext<PlayListContextType | undefined>(
  undefined
);

export const PlaylistProvider = ({ children }: ContextProviderType) => {
  const [playlists, setPlaylists] = useState<PlayListType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const all_list = "playlists";

  async function getPlaylists() {
    const storedList = SecureStorage.getItem(all_list);
    const parsedList = storedList ? JSON.parse(storedList) : [];
    setPlaylists(parsedList);
  }
  // Create new playlist
  async function createPlayList(name: string) {
    const newPlaylist = {
      name,
      id: generateId(),
      createdAt: new Date(),
      tracks: [],
    };

    if (newPlaylist.name) {
      setPlaylists((prevLists) => {
        const updatedLists = [...prevLists, newPlaylist];
        SecureStorage.setItem(all_list, JSON.stringify(updatedLists));
        return updatedLists;
      });
      ToastAndroid.show("Playlist created", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  }
  // Add music to playlist
  async function addToPlayList(track: Track, playId: string) {
    setPlaylists((prevList) => {
      const updatedPlaylist = prevList.map((list) =>
        list.id === playId
          ? {
              ...list,
              tracks: list.tracks.some((t) => t.url === track.url)
                ? list.tracks.map((t) => (t.url === track.url ? track : t))
                : [...list.tracks, track],
            }
          : list
      );
      SecureStorage.setItem(all_list, JSON.stringify(updatedPlaylist));
      return updatedPlaylist;
    });
    ToastAndroid.show("Music has been added to playlist", ToastAndroid.SHORT);
  }

  async function removeFromPlaylist(track: Track, playId: string) {
    const updatedPlaylists = playlists.map((list) => {
      if (list.id === playId) {
        return {
          ...list,
          tracks: list.tracks.filter((t) => t.url !== track.url),
        };
      }
      return list;
    });
    setPlaylists(updatedPlaylists);
    await SecureStorage.setItemAsync(
      all_list,
      JSON.stringify(updatedPlaylists)
    );
  }

  async function clearList() {
    const updatedList: PlayListType[] = [];
    setPlaylists(updatedList);
    await SecureStorage.setItemAsync(all_list, JSON.stringify(updatedList));
  }

  useEffect(() => {
    getPlaylists();
  }, []);

  async function refreshList() {
    setIsRefreshing(true);
    getPlaylists();
    setIsRefreshing(false);
  }

  return (
    <PlaylistContext.Provider
      value={{
        isRefreshing,
        addToPlayList,
        refreshList,
        createPlayList,
        playlists,
        removeFromPlaylist,
        clearList,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("Context not found");
  }
  return context;
};
