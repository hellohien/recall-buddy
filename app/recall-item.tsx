// app/recall-item.tsx
import BasicContainer from "@/components/BasicContainer";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";

export default function RecallItemScreen() {
  const router = useRouter();

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
      <ThemedText>Recall Item Screen</ThemedText>
    </BasicContainer>
  );
}
