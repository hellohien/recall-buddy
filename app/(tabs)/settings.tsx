import { StyleSheet, Switch, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import BasicContainer from "@/components/BasicContainer";
import { useState } from "react";
import { screenWidth } from "@/constants/Layout";

export default function settingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <BasicContainer>
      <ThemedView style={styles.row}>
        <ThemedText style={styles.general}>General</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.notifContainer, styles.row]}>
        <ThemedText>Notifications</ThemedText>
        <Switch
          trackColor={{ false: "#767577", true: "#01BD00" }}
          thumbColor="#fff"
          ios_backgroundColor="#adb2b7"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </ThemedView>
      <View style={styles.line} />
    </BasicContainer>
  );
}

const styles = StyleSheet.create({
  notifContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Adjust the scaling factor as needed
  },
  row: {
    marginTop: 10,
  },
  general: {
    marginVertical: 10,
    fontWeight: 600,
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginVertical: 12,
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
});
