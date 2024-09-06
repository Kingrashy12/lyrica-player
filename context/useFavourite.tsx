import { ContextProviderType, FavouriteContextType } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { Track } from "react-native-track-player";
import * as SecureStorage from "expo-secure-store";
import { ToastAndroid } from "react-native";

const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined
);

export const FavouriteTrackProvider = ({ children }: ContextProviderType) => {
  const key = "favourite_tracks";
  const [favourites, setFavourites] = useState<
    FavouriteContextType["favourites"]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function getFav() {
    const favorite_tracks = await SecureStorage.getItemAsync(key);
    const parsedTracks = favorite_tracks ? JSON.parse(favorite_tracks) : [];
    setFavourites(parsedTracks);
  }

  useEffect(() => {
    getFav();
  }, []);

  async function addTofavourite(track?: Track) {
    setFavourites((prevTracks: any) => {
      const updatedTracks = [...prevTracks, track];
      SecureStorage.setItemAsync(key, JSON.stringify(updatedTracks));

      return updatedTracks;
    });
    ToastAndroid.show("Added to favourite ❤", ToastAndroid.SHORT);
  }

  async function removeFrom(track?: Track) {
    setFavourites(() => {
      const updatedFavourite = favourites.filter(
        (music) => music.url !== track?.url
      );
      SecureStorage.setItem(key, JSON.stringify(updatedFavourite));
      return updatedFavourite;
    });
    ToastAndroid.show("Removed from favourite ❤", ToastAndroid.SHORT);
  }

  async function clearTracks() {
    setFavourites(() => {
      const updatedTracks: Track[] = [];
      SecureStorage.setItem(key, JSON.stringify(updatedTracks));
      return updatedTracks;
    });
    ToastAndroid.show("❤ Favourites list cleared", ToastAndroid.SHORT);
  }

  async function refresh() {
    setIsRefreshing(true);
    await getFav();
    setIsRefreshing(false);
  }

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        addTofavourite,
        removeFrom,
        refresh,
        isRefreshing,
        clearTracks,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => {
  const context = useContext(FavouriteContext);
  if (context === undefined) {
    throw new Error("Favourite context not found");
  }
  return context;
};
