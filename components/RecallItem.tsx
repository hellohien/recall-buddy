import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
export type RecallItemProps = {
  brandName: string;
  productDescription: string;
  date: string;
  recallReason: string;
  link: string;
  handleOnPress: () => void;
  styles: {};
};

export function RecallItem({
  brandName,
  productDescription,
  date,
  recallReason,
  handleOnPress,
  styles,
}: RecallItemProps) {
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles}>
      <ThemedText>{brandName}</ThemedText>
      <ThemedText>{productDescription}</ThemedText>
      <ThemedText>{recallReason}</ThemedText>
      <ThemedText>{date}</ThemedText>
    </TouchableOpacity>
  );
}
