import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface AppButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const AppButton = ({
  title,
  variant = "primary",
  size = "medium",
  onPress,
  disabled = false,
  loading = false,
  icon,
}: AppButtonProps) => {
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline,
    danger: styles.danger,
  };

  // Style theo size
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const textColors: Record<ButtonVariant, string> = {
    primary: "#FFFFFF",
    secondary: "#FFFFFF",
    outline: "#2563EB",
    danger: "#FFFFFF",
  };

  const indicatorColors: Record<ButtonVariant, string> = {
    primary: "#FFFFFF",
    secondary: "#FFFFFF",
    outline: "#2563EB",
    danger: "#FFFFFF",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColors[variant]} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              { color: textColors[variant] },
              icon ? styles.textWithIcon : undefined,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  primary: {
    backgroundColor: "#2563EB",
  },

  secondary: {
    backgroundColor: "#64748B",
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2563EB",
  },

  danger: {
    backgroundColor: "#DC2626",
  },

  small: {
    minHeight: 36,
    paddingHorizontal: 14,
  },

  medium: {
    minHeight: 44,
    paddingHorizontal: 20,
  },

  large: {
    minHeight: 52,
    paddingHorizontal: 28,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },

  textWithIcon: {
    marginLeft: 8,
  },

  pressed: {
    opacity: 0.7,
  },

  disabled: {
    opacity: 0.5,
  },
});
