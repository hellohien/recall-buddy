import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { useEffect, useState } from "react";
import { screenWidth } from "@/constants/Layout";
import { RecallItem } from "@/components/RecallItem";
import { useRouter } from "expo-router";

export type RecallItemProps = {
  item: {
    brandName: string;
    productDescription: string;
    date: string;
    recallReason: string;
    link: string;
  };
};

export default function HomeScreen() {
  const [recalls, setRecalls] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchRecalls = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/recalls`
      );
      console.log("recalls", JSON.stringify(data, null, 2));
      setRecalls(data);
    } catch (error) {
      console.error("Error fetching recalls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecalls();
  }, []);

  const handleOnPressRecallItem = () => {
    router.push("/recall-item");
  };

  return (
    <ThemedView style={styles.root}>
      <ThemedView style={styles.container}>
        <SafeAreaView>
          <ThemedText style={styles.logo}>Recall Buddy</ThemedText>
          <ThemedView style={styles.content}></ThemedView>
          <ThemedText type="subtitle">Recent Recalls</ThemedText>
          <View style={styles.line} />
          <ThemedView style={styles.recallsContainer}>
            <FlatList
              data={recalls}
              renderItem={({ item }: RecallItemProps) => (
                <>
                  <RecallItem
                    brandName={item.brandName}
                    productDescription={item.productDescription}
                    recallReason={item.recallReason}
                    date={item.date}
                    link={item.link}
                    styles={styles.recallItem}
                    handleOnPress={handleOnPressRecallItem}
                  />
                  <View style={styles.line} />
                </>
              )}
            />
          </ThemedView>
        </SafeAreaView>
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
  logo: {
    marginTop: 24,
  },
  content: {
    marginVertical: 10,
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginVertical: 10,
    width: screenWidth,
    alignSelf: "center",
  },
  recallsContainer: {
    width: screenWidth,
    alignSelf: "center",
  },
  recallItem: {
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
});
