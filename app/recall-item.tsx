// app/recall-item.tsx
import BasicContainer from "@/components/BasicContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";

export type recallDetailsProps = {
  announcementDate: string;
  brandName: string;
  company: string;
  contactInfo: string | null;
  link: string;
  productDescription: string;
  productType: string;
};

export default function RecallItemScreen() {
  const router = useRouter();
  const { article } = useLocalSearchParams();

  const [recallDetails, setRecallDetails] = useState<recallDetailsProps | null>(
    null
  );

  useEffect(() => {
    const parsedArticle = article
      ? JSON.parse(decodeURIComponent(article as string))
      : null;
    setRecallDetails(parsedArticle[0]);
  }, []);

  return (
    <BasicContainer>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText>Back</ThemedText>
          </TouchableOpacity>
        }
        containerStyle={{
          borderBottomWidth: 0,
          paddingHorizontal: 0,
          margin: 0,
        }}
        backgroundColor="transparent"
      />
      {recallDetails && (
        <ThemedView>
          <ThemedView>
            {Object.keys(recallDetails).map((key, index) => {
              const typedKey = key as keyof recallDetailsProps;
              return (
                <ThemedView key={index}>
                  <ThemedText type="small" style={styles.articleTitle}>
                    {(typedKey === "announcementDate" && "Notice Date") ||
                      (typedKey === "brandName" && "Brand") ||
                      (typedKey === "productType" && "Type") ||
                      (typedKey === "productDescription" && "Description") ||
                      (typedKey === "link" && "Link To Article") ||
                      (typedKey === "contactInfo" && "Contact Info") ||
                      typedKey}
                  </ThemedText>
                  <ThemedText type="small" style={styles.articleDetail}>
                    {recallDetails[typedKey]}
                  </ThemedText>
                </ThemedView>
              );
            })}
          </ThemedView>
        </ThemedView>
      )}
    </BasicContainer>
  );
}

const styles = StyleSheet.create({
  articleTitle: {
    fontWeight: 600,
    lineHeight: 16,
    textTransform: "capitalize",
  },
  articleDetail: { paddingBottom: 8 },
});
