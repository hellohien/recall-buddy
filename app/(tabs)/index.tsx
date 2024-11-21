import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { useEffect, useState } from "react";
import { screenWidth } from "@/constants/Layout";
import { RecallItem } from "@/components/RecallItem";
import { useRouter } from "expo-router";
import { BasicInput } from "@/components/BasicInput";

export default function HomeScreen() {
  const [recalls, setRecalls] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [recalls2, setRecalls2] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchRecalls();
  }, []);

  useEffect(() => {
    const formattedRecalls = recalls.map((item) => ({
      ...item,
      brandName2: item.brandName?.toLowerCase(),
      productDescription2: item.productDescription?.toLowerCase(),
    }));
    setRecalls2(formattedRecalls);
  }, [recalls]);

  const fetchRecalls = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/recalls`
      );
      setRecalls(Array.isArray(data) ? data : []);
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
    }
  };

  const handleOnPressRecallItem = async (url: string) => {
    const article = await extractArticle(url);
    const articleString = encodeURIComponent(JSON.stringify(article));
    router.push(`/recall-item?article=${articleString}`);
  };

  const renderItem3 = ({ item }: { item: any }) => {
    if (searchValue?.trim()) {
      const searchValueLower = searchValue.toLowerCase();
      const brandIndex = item.brandName2?.indexOf(searchValueLower) ?? -1;
      const descriptionIndex =
        item.productDescription2?.indexOf(searchValueLower) ?? -1;

      if (brandIndex < 0 && descriptionIndex < 0) return null;

      const highlightText = (text: string, index: number) => {
        if (index < 0) return text;
        return (
          <>
            {text.substring(0, index)}
            <ThemedText style={{ backgroundColor: "#FFC04C" }}>
              {text.substring(index, index + searchValue.length)}
            </ThemedText>
            {text.substring(index + searchValue.length)}
          </>
        );
      };

      return (
        <>
          <RecallItem
            brandName={highlightText(item.brandName, brandIndex)}
            productDescription={highlightText(
              item.productDescription,
              descriptionIndex
            )}
            recallReason={item.recallReason}
            date={item.date}
            link={item.link}
            style={styles.recallItem}
            handleOnPress={() => handleOnPressRecallItem(item.link)}
          />
          <View style={styles.line} />
        </>
      );
    }

    return (
      <>
        <RecallItem
          brandName={item.brandName}
          productDescription={item.productDescription}
          recallReason={item.recallReason}
          date={item.date}
          link={item.link}
          style={styles.recallItem}
          handleOnPress={() => handleOnPressRecallItem(item.link)}
        />
        <View style={styles.line} />
      </>
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
              ListEmptyComponent={<ThemedText>No recalls found.</ThemedText>}
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
  recallItem: {
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
});
