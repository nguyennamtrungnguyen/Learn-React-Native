import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Todo } from "../interfaces/Todo";
import { Button, Card } from "react-native-paper";

type Props = {
  data: Todo;
};
const TodoCard = ({ data }: Props) => {
  return (
    <Card>
      <Card.Title title={data.isCompleted} />
      <Card.Content>
        <Text>{data.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" buttonColor="blue">
          Cập nhập
        </Button>
        <Button mode="contained" buttonColor="red">
          Xóa
        </Button>
        <Button mode="contained" buttonColor="gray">
          Hoàn thành
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TodoCard;

const styles = StyleSheet.create({});
