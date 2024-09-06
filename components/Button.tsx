import { ButtonTypes } from "@/types/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const getVariantStyles = (varaint: ButtonTypes["variant"]) => {
  switch (varaint) {
    case "primary":
      return "bg-blue-600";
    case "danger":
      return "bg-red-600";
    case "ghost":
      return "rgb(37,99,235,.8) border-none";
  }
};

const getTextColor = (variant: ButtonTypes["variant"]) => {
  switch (variant) {
    case "primary":
      return "text-white";
    case "danger":
      return "text-white";
    case "ghost":
      return "text-blue-600";
  }
};

const Button = ({
  variant = "primary",
  children,
  onPress,
  className,
  style,
}: ButtonTypes) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      className={`${className} w-[45%] relative rounded-full flex flex-row items-center justify-center
      px-2 py-3 ${getVariantStyles(variant)}
      `}
    >
      <Text className={`${getTextColor(variant)} text-sm font-poppins-regular`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
