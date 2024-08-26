import { StackScreenWithSearchBar } from "@/constants/layout";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const FavouriteLayout = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Favourites",
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default FavouriteLayout;
