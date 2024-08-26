import { StackScreenWithSearchBar } from "@/constants/layout";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PlayListLayout = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "PlayLists",
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default PlayListLayout;
