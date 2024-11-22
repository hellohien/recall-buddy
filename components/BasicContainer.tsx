import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { screenWidth } from "@/constants/Layout";

interface BasicContainerProps {
  children: React.ReactNode;
}

export default function BasicContainer({ children }: BasicContainerProps) {
  return (
    <ThemedView style={styles.root}>
      <ThemedView style={styles.container}>
        <SafeAreaView>{children}</SafeAreaView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
});
