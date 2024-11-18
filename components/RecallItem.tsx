import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export type RecallItemProps = {
  brandName: string;
  productDescription: string;
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
      <ThemedText type="small" style={styles.bold}>
        {productDescription}
      </ThemedText>
      <ThemedText type="small">{recallReason}</ThemedText>
      <ThemedText type="small">{date}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 700,
  },
});
