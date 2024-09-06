import { ConfirmDeleteType } from "@/types/types";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import Button from "../Button";

const ConfirmDelete = ({
  label,
  onConfirm,
  onCancel,
  header,
}: ConfirmDeleteType) => {
  return (
    <TouchableWithoutFeedback onPress={onCancel}>
      <View className="absolute h-full w-full bg-trans90 z-50 inset-0 flex flex-col items-center justify-center">
        <View
          style={{
            gap: 16,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="bg-black rounded-3xl border border-neutral-800 w-11/12 flex-col relative h-auto py-3 px-3 justify-center"
        >
          <View className="flex flex-col gap-2">
            <Text className="text-white text-center font-poppins-semi-bold text-xl">
              {header}
            </Text>
            <Text className="text-neutral-500 font-poppins-medium text-base">
              {label}
            </Text>
          </View>
          <View
            style={{ gap: 10 }}
            className="flex flex-row w-full items-center justify-between"
          >
            <Button onPress={onCancel}>Cancel</Button>
            <Button variant="danger" onPress={onConfirm}>
              Yes,Clear
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ConfirmDelete;
