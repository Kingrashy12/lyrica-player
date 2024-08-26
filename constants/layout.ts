import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";
import { colors, fontSize } from "./system";

export const StackScreenWithSearchBar = {
  headerLargeTitle: true,
  headerLargeStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitleStyle: {
    color: colors.text,
    fontSize: 35,
  },
  headerShadowVisible: false,
  headerTintColor: colors.text,
  headerBlurEffect: "prominent",
  headerTransparent: true,
};
