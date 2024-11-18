import BasicButton from "@/components/BasicButton";
import BasicContainer from "@/components/BasicContainer";
import BasicWebView from "@/components/BasicWebView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { screenWidth } from "@/constants/Layout";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
  const [openArticle, setOpenArticle] = useState<boolean>(false);

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
          {openArticle && (
            <BasicWebView
              uri={recallDetails.link}
              setOpenArticle={setOpenArticle}
            />
          )}

          <ThemedView>
            {Object.keys(recallDetails).map((key, index) => {
              const typedKey = key as keyof recallDetailsProps;
              return (
                <ThemedView key={index}>
                  {typedKey === "link" ? (
                    <ThemedView style={styles.linkToArticleButton}>
                      <BasicButton
                        title="Link to Article"
                        accessibilityLabel="Link to Article"
                        handleOnPress={() => setOpenArticle(!openArticle)}
                      />
                    </ThemedView>
                  ) : (
                    <ThemedView>
                      <ThemedText type="small" style={styles.articleTitle}>
                        {(typedKey === "announcementDate" && "Notice Date") ||
                          (typedKey === "brandName" && "Brand") ||
                          (typedKey === "productType" && "Type") ||
                          (typedKey === "productDescription" &&
                            "Description") ||
                          (typedKey === "contactInfo" && "Contact Info") ||
                          typedKey}
                      </ThemedText>
                      <ThemedText type="small">
                        {recallDetails[typedKey] || "-"}
                      </ThemedText>
                    </ThemedView>
                  )}
                  {(typedKey === "contactInfo" ||
                    typedKey === "productType") && (
                    <ThemedView style={styles.line} />
                  )}
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
    paddingTop: 6,
    paddingBottom: 2,
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginVertical: 14,
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
  linkToArticleButton: {
    marginTop: 10,
  },
});
