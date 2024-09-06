import NewPlayListModal from "@/components/modal/NewPlayListModal";
import { ContextProviderType, NewPlayListModalType } from "@/types/types";
import { createContext, useContext, useState } from "react";
import { TextInputProps } from "react-native";
import { Track } from "react-native-track-player";

const NewPlayListModalContext = createContext<NewPlayListModalType | undefined>(
  undefined
);

export const NewPlaylistModalProvider = ({ children }: ContextProviderType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [track, setTrack] = useState<Track>();

  function onOpen(track?: Track) {
    setIsOpen(true);
    setTrack(track);
  }
  function onClose() {
    setIsOpen(false);
  }

  function onTextChange(val: string) {
    setName(val);
  }

  function resetName() {
    setName("");
  }

  return (
    <NewPlayListModalContext.Provider
      value={{ isOpen, onClose, onOpen, track, onTextChange, name, resetName }}
    >
      {isOpen && <NewPlayListModal />}
      {children}
    </NewPlayListModalContext.Provider>
  );
};

export const useNewPlaylistModal = () => {
  const context = useContext(NewPlayListModalContext);
  if (context === undefined) {
    throw new Error("Context not found");
  }
  return context;
};
