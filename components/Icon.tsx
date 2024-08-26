import React from "react";
import { TouchableOpacity } from "react-native";

const Icon = ({ icon }: { icon: React.ReactElement }) => {
  return <TouchableOpacity>{icon}</TouchableOpacity>;
};

export default Icon;
