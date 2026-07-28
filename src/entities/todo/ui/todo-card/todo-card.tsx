import { Card, Checkbox, Typography } from "antd";

import type { Todo } from "../../model/todo.types";

import styles from "./todo-card.module.scss";

const { Text } = Typography;

type TodoCardProps = {
  todo: Todo;
  disabled?: boolean;
  onCompletedChange?: (completed: boolean) => void;
};

export function TodoCard({
  todo,
  disabled = false,
  onCompletedChange,
}: TodoCardProps) {
  return (
    <Card className={styles.card} size="small">
      <div className={styles.content}>
        <Checkbox
          checked={todo.completed}
          disabled={disabled || !onCompletedChange}
          onChange={(event) => onCompletedChange?.(event.target.checked)}
        >
          <Text className={styles.title} delete={todo.completed}>
            {todo.title}
          </Text>
        </Checkbox>

        <Text type="secondary">#{todo.id}</Text>
      </div>
    </Card>
  );
}