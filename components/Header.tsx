import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import StateBar from "./StateBar";

type HeaderType = {
  headerTitle: string;
  hasSearch?: boolean;
  onHome?: boolean;
  hasBackIcon?: boolean;
  className?: string;
  onBinPress?: () => void;
  disableBin?: boolean;
  showAddIcon?: boolean;
  onAddPress?: () => void;
};

const Header = ({
  headerTitle,
  hasSearch,
  onHome,
  hasBackIcon,
  className,
  onBinPress,
  disableBin,
  showAddIcon,
  onAddPress,
}: HeaderType) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className={`${className} flex justify-between ${
          hasBackIcon ? "py-2 mb-1" : "py-6"
        } px-5 bg-trans70 relative z-50 w-full`}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3 items-center">
            {hasBackIcon && (
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center"
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            )}
            <Text className="font-poppins-semi-bold text-2xl text-white">
              {headerTitle}
            </Text>
          </View>
          {hasSearch ? (
            <TouchableOpacity
              onPress={() => router.push("/search")}
              style={{
                gap: 8,
              }}
              // className="flex flex-row items-center bg-neutral-800 rounded-full px-4 py-2 w-full h-12 mt-3"
            >
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <View style={{ gap: 18 }} className="flex flex-row items-center">
              <TouchableOpacity onPress={onBinPress} disabled={disableBin}>
                <AntDesign
                  name="delete"
                  size={24}
                  color={disableBin ? "gray" : "white"}
                />
              </TouchableOpacity>
              {showAddIcon && (
                <TouchableOpacity onPress={onAddPress}>
                  <MaterialIcons name="playlist-add" size={30} color="white" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        {onHome && <StateBar />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
