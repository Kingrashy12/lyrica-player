import { useNewPlaylistModal } from "@/context/useNewPlaylistModal";
import { usePlaylist } from "@/context/usePlaylist";
import { usePlaylistModal } from "@/context/usePlaylistModal";
import React from "react";
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Track } from "react-native-track-player";

const PlayListModal = () => {
  const { onClose, track } = usePlaylistModal();
  const { onOpen } = useNewPlaylistModal();
  const { playlists, addToPlayList } = usePlaylist();

  function onNew(track?: Track) {
    onClose();
    onOpen(track);
  }

  function add(playId: string) {
    const t = track && track;
    if (t) {
      addToPlayList(t, playId);
      onClose();
    } else {
      ToastAndroid.show("Music not found or valid", ToastAndroid.SHORT);
      onClose();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View
        className="absolute flex bottom-0 flex-col items-center justify-end w-full bg-trans70 z-50 h-full"
        onTouchStart={(e) => e.stopPropagation()}
      >
        <View
          style={{ gap: 30 }}
          className="relative flex flex-col border border-neutral-800 z-[100] p-6 bg-black w-11/12 rounded-3xl h-auto"
        >
          <TouchableOpacity onPress={() => onNew(track)}>
            <Text className="text-white font-poppins-medium text-base">
              New
            </Text>
          </TouchableOpacity>
          {playlists.map((list, index) => (
            <TouchableOpacity onPress={() => add(list.id)} key={index}>
              <Text className="text-white font-poppins-semi-bold text-base">
                {list.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlayListModal;
