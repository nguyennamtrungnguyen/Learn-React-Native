import { Text, View, StyleSheet } from "react-native";

interface UserCardProps {
  name: string;
  age: number;
  isAdmin: boolean;
}
export const UserCard = ({ name, age, isAdmin }: UserCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.age}>Tuổi: {age}</Text>
      {isAdmin ? (
        <Text style={styles.admin}>Quản trị viên</Text>
      ) : (
        <Text style={styles.member}>Thành viên</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  age: {
    marginTop: 6,
  },
  admin: {
    marginTop: 6,
    fontWeight: "bold",
  },
  member: {
    marginTop: 6,
  },
});
