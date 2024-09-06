import MusicMenu from "@/components/music/MusicMenu";
import { ContextProviderType, MenuListContextType } from "@/types/types";
import { createContext, useContext, useState } from "react";
import { Track } from "react-native-track-player";

const MenuContext = createContext<MenuListContextType | undefined>(undefined);

export const MenuListProvider = ({ children }: ContextProviderType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState<Track>();

  function onOpen(track: Track) {
    setIsOpen(true);
    setTrack(track);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <MenuContext.Provider value={{ isOpen, track, onClose, onOpen }}>
      {children}
      {isOpen && <MusicMenu music={track} />}
    </MenuContext.Provider>
  );
};

export const useMusicMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("Context provider not found");
  }
  return context;
};
