import { TextInput } from "react-native";

export type BasicInputProps = {
  style?: {};
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
};

export function BasicInput({
  style,
  value,
  onChangeText,
  placeholder,
}: BasicInputProps) {
  return (
    <TextInput
      style={style}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}
