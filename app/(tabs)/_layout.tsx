import { Ionicons, Octicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { BlurView } from "expo-blur";
import {} from "react-native";
import { fontSize } from "@/constants/system";
import { defaultStyles } from "@/styles";
import FloatingPlayer from "@/components/FloatingPlayer";

const TabIcon = ({ icon, isfocused, color, size, name }: TabIconType) => (
  <View className="flex flex-col items-center relative z-10">
    <Ionicons
      name={icon}
      color={isfocused ? "blue" : color}
      size={isfocused ? size + 2 : size}
      className="relative z-10"
    />
    {/* {isfocused ? (
      <Octicons name="dot-fill" size={24} color="blue" />
    ) : ( */}
    <Text style={{ color }}>{name}</Text>
    {/* )} */}
  </View>
);

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            height: 60,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={55}
              tint="dark"
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Music",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                color={color}
                icon="musical-notes"
                size={24}
                isfocused={focused}
                name="Songs"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favourite"
          options={{
            title: "Favourites",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                color={color}
                icon="heart"
                size={24}
                isfocused={focused}
                name="Favourites"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            title: "Playlist",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                color={color}
                icon="albums"
                size={24}
                isfocused={focused}
                name="Playlist"
              />
            ),
          }}
        />
      </Tabs>

      <FloatingPlayer />
    </>
  );
}
