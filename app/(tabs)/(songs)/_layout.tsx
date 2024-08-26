import { StackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/system";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SongsLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Songs",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default SongsLayout;
