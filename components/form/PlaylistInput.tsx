import { useNewPlaylistModal } from "@/context/useNewPlaylistModal";
import React from "react";
import {
  Keyboard,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const PlaylistInput = () => {
  const { name, onTextChange } = useNewPlaylistModal();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <TouchableHighlight>
          <TouchableOpacity>
            <TextInput
              className="bg-neutral-600 rounded-full w-full py-3 px-3 text-white font-poppins-medium text-base focus:outline-blue-600"
              cursorColor="white"
              onChangeText={onTextChange}
              value={name}
            />
          </TouchableOpacity>
        </TouchableHighlight>
      </>
    </TouchableWithoutFeedback>
  );
};

export default PlaylistInput;
