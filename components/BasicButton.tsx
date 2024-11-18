import { Button, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export type BasicButtonProps = {
  title: string;
  color?: string;
  accessibilityLabel: string;
  handleOnPress: () => void;
};

export default function BasicButton({
  title,
  color = "#fff",
  accessibilityLabel,
  handleOnPress,
}: BasicButtonProps) {
  return (
    <ThemedView style={styles.button}>
      <Button
        onPress={handleOnPress}
        title={title}
        color={color}
        accessibilityLabel={accessibilityLabel}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#CD4631",
    borderRadius: 6,
  },
});