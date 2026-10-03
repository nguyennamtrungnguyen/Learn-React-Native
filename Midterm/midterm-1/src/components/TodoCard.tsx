import { Text } from "react-native";
import { Todo } from "../interfaces/Todo";
import { Button, Card } from "react-native-paper";

type Props = {
  data: Todo;
  onPressDeleteBtn: (id: string) => void;
};
const TodoCard = ({ data, onPressDeleteBtn }: Props) => {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title
        title={`${data.isCompleted ? "Hoàn thành" : "Chưa Hoàn Thành"}`}
      />
      <Card.Content>
        <Text style={{ fontWeight: "bold" }}>{data.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" buttonColor="blue">
          Cập nhập
        </Button>
        <Button
          mode="contained"
          buttonColor="red"
          onPress={() => onPressDeleteBtn(data.id)}
        >
          Xóa
        </Button>
        <Button mode="contained" buttonColor="green">
          Hoàn thành
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TodoCard;
