import { StyleSheet, View, Image, TextInput, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = () => {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <View>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.headerRight}>
        {/* Search */}
        <TextInput placeholder="Tìm kiếm..." style={styles.searchInput} />

        {/* Cart button */}
        <Pressable>
          <AntDesign
            style={styles.headerCartIcon}
            name="shopping-cart"
            size={45}
            color="black"
          />
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
    backgroundColor: "#1DCED8",
  },

  logo: {
    marginLeft: 10,
    width: 50,
    height: 40,
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginLeft: 16,
    padding: 2,
  },

  headerCartIcon: {
    color: "red",
  },
});
