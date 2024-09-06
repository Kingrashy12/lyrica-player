import PlayListModal from "@/components/modal/PlayListModal";
import { ContextProviderType, PlayListModalType } from "@/types/types";
import { createContext, useContext, useState } from "react";
import { Track } from "react-native-track-player";

const PlayListModalContext = createContext<PlayListModalType | undefined>(
  undefined
);

export const PlayListModalProvider = ({ children }: ContextProviderType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState<Track>();

  function onOpen(track?: Track) {
    setIsOpen(true);
    setTrack(track);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <PlayListModalContext.Provider value={{ track, isOpen, onClose, onOpen }}>
      {children}
      {isOpen && <PlayListModal />}
    </PlayListModalContext.Provider>
  );
};

export const usePlaylistModal = () => {
  const context = useContext(PlayListModalContext);
  if (context === undefined) {
    throw new Error("Context not found");
  }
  return context;
};
