import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export type RecallItemProps = {
  brandName: React.ReactNode;
  productDescription: React.ReactNode;
  date: string;
  recallReason: string;
  link: string;
  handleOnPress: () => void;
  style: {};
};

export function RecallItem({
  brandName,
  productDescription,
  date,
  recallReason,
  handleOnPress,
  style,
}: RecallItemProps) {
  return (
    <TouchableOpacity onPress={handleOnPress} style={style}>
      <ThemedText style={styles.bold} numberOfLines={1}>
        {brandName}
      </ThemedText>
      <ThemedText style={styles.bold}>{productDescription}</ThemedText>
      <ThemedText type="small">{recallReason}</ThemedText>
      <ThemedText type="small">{date}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "700",
  },
  recallItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
});
