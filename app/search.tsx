import { tracks } from "@/assets/data/tracks";
import SearchInput from "@/components/form/SearchInput";
import SearchedTrack from "@/components/search/SearchedTrack";
import { defaultStyles } from "@/styles";
import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const search = () => {
  const [query, setQuery] = useState("");

  const filteredTrack = tracks.filter((track) => {
    const title = track.title.toLowerCase();
    const queried = query.toLowerCase();
    return query && title.includes(queried);
  });
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 15,
        ...defaultStyles.container,
        width: "100%",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SearchInput query={query} setQuery={setQuery} />
      </TouchableWithoutFeedback>
      <ScrollView>
        <SearchedTrack tracks={filteredTrack} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default search;
