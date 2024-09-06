import { useFavourite } from "@/context/useFavourite";
import { useMusicMenu } from "@/context/useMenu";
import { usePlaylistModal } from "@/context/usePlaylistModal";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Track } from "react-native-track-player";

interface MusicMenuProps {
  music?: Track;
}

const MusicMenu = ({ music }: MusicMenuProps) => {
  const { onClose } = useMusicMenu();
  const { addTofavourite, favourites, removeFrom } = useFavourite();
  const { onOpen } = usePlaylistModal();

  const onPlaylist = false;

  const isInFavourite = favourites.find((track) => track.url === music?.url);
  const title = music?.title;
  const truncatedTitle =
    title?.length && title.length > 35 ? title.slice(0, 35) + "..." : title;

  function fav(music?: Track) {
    if (isInFavourite) {
      removeFrom(music);
    } else {
      addTofavourite(music);
    }
  }

  function openList(music?: Track) {
    onClose();
    onOpen(music);
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="absolute flex bottom-0 flex-col items-center justify-end w-full bg-trans70 z-50 h-full">
        <View
          style={{ gap: 30 }}
          className="relative flex flex-col border border-neutral-800 z-[100] p-6 bg-black w-11/12 rounded-3xl h-auto"
        >
          <Text className="text-white font-poppins-semi-bold text-base mb-4 text-center">
            {truncatedTitle || "Unknown audio"}
          </Text>
          <TouchableOpacity
            className="flex flex-row gap-2 items-center"
            onPress={() => fav(music)}
          >
            <MaterialIcons
              name={isInFavourite ? "favorite" : "favorite-outline"}
              size={24}
              color="red"
            />
            <Text className="text-white font-poppins-semi-bold text-base">
              {isInFavourite ? "Remove from favourite" : "Add to favourite"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row gap-2 items-center"
            onPress={() => openList(music)}
          >
            <Ionicons name="albums" size={24} color="white" />
            <Text className="text-white font-poppins-semi-bold text-base">
              Add to playlist
            </Text>
          </TouchableOpacity>
          {onPlaylist ? (
            <TouchableOpacity
              className="flex flex-row gap-2 items-center"
              // onPress={() => openList(music)}
            >
              <Ionicons name="albums" size={24} color="white" />
              <Text className="text-white font-poppins-semi-bold text-base">
                Remove from this playlist
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity className="flex flex-row gap-2 items-center">
            <AntDesign name="delete" size={24} color="white" />
            <Text className="text-white font-poppins-semi-bold text-base">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MusicMenu;
