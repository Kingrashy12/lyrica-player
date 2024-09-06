import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "expo-dev-client";
import TrackPlayer from "react-native-track-player";
import { PlayerProvider } from "@/context/usePlayer";
import { MenuListProvider } from "@/context/useMenu";
import { FavouriteTrackProvider } from "@/context/useFavourite";
import { PlaylistProvider } from "@/context/usePlaylist";
import { PlayListModalProvider } from "@/context/usePlaylistModal";
import { NewPlaylistModalProvider } from "@/context/useNewPlaylistModal";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => require("@/hooks/service"));

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PlayerProvider>
      <PlaylistProvider>
        <NewPlaylistModalProvider>
          <PlayListModalProvider>
            <FavouriteTrackProvider>
              <MenuListProvider>
                <SafeAreaView className="bg-black flex-1 w-full h-full">
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="search"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="[currentplayId]"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="playing"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                  <StatusBar style="auto" backgroundColor="black" />
                </SafeAreaView>
              </MenuListProvider>
            </FavouriteTrackProvider>
          </PlayListModalProvider>
        </NewPlaylistModalProvider>
      </PlaylistProvider>
    </PlayerProvider>
  );
}
