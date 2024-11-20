import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { useEffect, useState } from "react";
import { screenWidth } from "@/constants/Layout";
import { RecallItem } from "@/components/RecallItem";
import { useRouter } from "expo-router";
import { BasicInput } from "@/components/BasicInput";

export type RecallItemProps = {
  item: {
    brandName: string;
    productDescription: string;
    date: string;
    recallReason: string;
    link: string;
    brandName2?: string;
    productDescription2?: string;
  };
};

export default function HomeScreen() {
  const [recalls, setRecalls] = useState<RecallItemProps["item"][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [recalls2, setRecalls2] = useState<RecallItemProps["item"][]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchRecalls();
  }, []);

  useEffect(() => {
    const arr = recalls.map((ele) => {
      if (typeof ele === "object" && ele !== null) {
        return {
          ...ele,
          brandName2: ele.brandName?.toLowerCase(),
          productDescription2: ele.productDescription?.toLowerCase(),
        };
      }
      return ele;
    });
    setRecalls2(arr || []);
  }, [recalls]);

  const fetchRecalls = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/recalls`
      );
      if (Array.isArray(data)) {
        setRecalls(data);
      } else {
        console.error("Invalid data format received:", data);
      }
    } catch (error) {
      console.error("Error fetching recalls:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractArticle = async (url: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/article`,
        { url }
      );
      return data;
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnPressRecallItem = async (url: string) => {
    const article = await extractArticle(url);
    const articleString = encodeURIComponent(JSON.stringify(article));
    router.push(`/recall-item?article=${articleString}`);
  };

  const renderItem3 = ({ item }: { item: RecallItemProps["item"] }) => {
    if (!searchValue || searchValue.trim().length < 1) {
      return (
        <ThemedView>
          <ThemedText>{item.brandName}</ThemedText>
          <ThemedText numberOfLines={4}>{item.productDescription}</ThemedText>
        </ThemedView>
      );
    }

    const searchValueLower = searchValue.toLowerCase();
    const indx = item.brandName2?.indexOf(searchValueLower) ?? -1;
    const indx2 = item.productDescription2?.indexOf(searchValueLower) ?? -1;
    const length = searchValue.length;

    if (indx < 0 && indx2 < 0) return null;

    return (
      <View>
        {indx < 0 ? (
          <ThemedText>{item.brandName}</ThemedText>
        ) : (
          <ThemedText>
            {item.brandName.substr(0, indx)}
            <ThemedText style={{ backgroundColor: "#FFC04C" }}>
              {item.brandName.substr(indx, length)}
            </ThemedText>
            <ThemedText>{item.brandName.substr(indx + length)}</ThemedText>
          </ThemedText>
        )}
        {indx2 < 0 ? (
          <ThemedText numberOfLines={4}>{item.productDescription}</ThemedText>
        ) : (
          <ThemedText numberOfLines={4}>
            {item.productDescription.substr(0, indx2)}
            <ThemedText style={{ backgroundColor: "#FFC04C" }}>
              {item.productDescription.substr(indx2, length)}
            </ThemedText>
            <ThemedText>
              {item.productDescription.substr(indx2 + length)}
            </ThemedText>
          </ThemedText>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.root}>
      <ThemedView style={styles.container}>
        <SafeAreaView>
          <ThemedText style={styles.logo}>Recall Buddy</ThemedText>
          <BasicInput
            style={styles.searchInput}
            value={searchValue}
            placeholder="Search..."
            onChangeText={(txt) => setSearchValue(txt)}
          />
          <ThemedView style={styles.content}></ThemedView>
          <ThemedText type="subtitle">Recent Recalls</ThemedText>
          <View style={styles.line} />
          <ThemedView style={styles.recallsContainer}>
            <FlatList
              data={recalls2}
              renderItem={renderItem3}
              keyExtractor={(item, index) => item.link || index.toString()}
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
  searchInput: {
    width: "100%",
    height: 32,
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
});
