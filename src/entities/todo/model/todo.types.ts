export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UpdateTodoRequest {
  id: number;
  userId: number;
  completed: boolean;
}