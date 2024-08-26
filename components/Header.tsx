import { Feather } from "@expo/vector-icons";
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

type HeaderType = {
  headerTitle: string;
  hasSearch?: boolean;
};

const Header = ({ headerTitle, hasSearch }: HeaderType) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex flex-col py-6 px-5 bg-trans70 absolute top-0 z-50 w-full">
        <Text className="font-poppins-semi-bold text-2xl text-white">
          {headerTitle}
        </Text>
        {hasSearch && (
          <TouchableOpacity
            onPress={() => router.push("/search")}
            style={{
              gap: 8,
            }}
            className="flex flex-row items-center bg-neutral-800 rounded-full px-4 py-2 w-full h-12 mt-3"
          >
            <Feather name="search" size={24} color="white" />
            <TextInput
              placeholder="Search song"
              placeholderTextColor="white"
              className="w-full text-white outline-none border-none font-poppins-medium mt-1"
              cursorColor="white"
              onPress={() => router.push("/search")}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
