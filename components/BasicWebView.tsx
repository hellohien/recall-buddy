import { StyleSheet, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { screenHeight, screenWidth } from "@/constants/Layout";
import { Header } from "react-native-elements";

export type basicWebViewProps = {
  uri: string;
  setOpenArticle: (value: boolean) => void;
};

export default function BasicWebView({
  uri,
  setOpenArticle,
}: basicWebViewProps) {
  return (
    <ThemedView style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => setOpenArticle(false)}>
            <ThemedText style={{ width: 200 }}>Close</ThemedText>
          </TouchableOpacity>
        }
        containerStyle={styles.header}
        backgroundColor="transparent"
      />
      <WebView
        source={{ uri }}
        limitsNavigationsToAppBoundDomains={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    alignSelf: "center",
    marginTop: -64,
    width: screenWidth,
  },
  header: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    margin: 0,
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
});
