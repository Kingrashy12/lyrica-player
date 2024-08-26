import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type SearchInputType = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ query, setQuery }: SearchInputType) => {
  return (
    <View className="flex-row flex items-center justify-between w-full">
      <View
        style={{
          gap: 8,
        }}
        className="flex flex-row items-center bg-neutral-800 rounded-full px-4 py-2 w-[80%] h-12 mt-3"
      >
        <Feather name="search" size={24} color="white" />
        <TextInput
          placeholder="Search for song"
          placeholderTextColor="white"
          className="w-full text-white outline-none border-none font-poppins-medium mt-1"
          value={query}
          onChangeText={(value) => setQuery(value)}
          cursorColor="white"
        />
      </View>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-blue-500 font-poppins-medium text-sm mt-4">
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
