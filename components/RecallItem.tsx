import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export type RecallItemProps = {
  brandName: string;
  productDescription: string;
  date: string;
  recallReason: string;
  link: string;
  styles: {};
};

export function RecallItem({
  brandName,
  productDescription,
  date,
  recallReason,
  styles,
}: RecallItemProps) {
  return (
    <TouchableOpacity style={styles}>
      <ThemedText>{brandName}</ThemedText>
      <ThemedText>{productDescription}</ThemedText>
      <ThemedText>{recallReason}</ThemedText>
      <ThemedText>{date}</ThemedText>
    </TouchableOpacity>
  );
}
