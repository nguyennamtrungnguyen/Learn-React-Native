import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { bookImage } from "../../interface/BookInterface";

const BadgeSaleImage = ({ prop }: bookImage) => {
  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}>
        <Image source={{ uri: prop }} style={styles.image} />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>- 20%</Text>
        </View>
      </View>
    </View>
  );
};

export default BadgeSaleImage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  coverContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 4,
  },

  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "red",
    padding: 10,
    width: 100,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  badgeText: {
    color: "white",
  },
});
