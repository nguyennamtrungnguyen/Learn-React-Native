import { StyleSheet, View, Image, TextInput, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.headerRight}>
        <TextInput placeholder="Tìm kiếm..." style={styles.searchInput} />

        <Pressable>
          <AntDesign name="shopping-cart" size={45} color="#6B3E24" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FDFAF6",
  },

  logo: {
    marginLeft: 10,
    width: 40,
    height: 50,
  },

  headerRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },

  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 10,
    padding: 10,
  },
});
