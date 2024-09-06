import { useNewPlaylistModal } from "@/context/useNewPlaylistModal";
import { usePlaylistModal } from "@/context/usePlaylistModal";
import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PlaylistInput from "../form/PlaylistInput";
import Button from "../Button";
import { usePlaylist } from "@/context/usePlaylist";

const NewPlayListModal = () => {
  const { onClose, name, resetName } = useNewPlaylistModal();
  const { createPlayList } = usePlaylist();

  function addPlayList() {
    createPlayList(name);
    onClose();
    resetName();
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
          <View>
            <Text className="text-white font-poppins-medium text-base text-center">
              Playlist Name
            </Text>
            <Text className="text-neutral-400 font-poppins-medium text-sm text-center">
              Enter playlist name
            </Text>
          </View>
          <PlaylistInput />
          <View className="flex-row justify-between items-center">
            <Button variant="ghost" onPress={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onPress={addPlayList}>
              Add
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewPlayListModal;
