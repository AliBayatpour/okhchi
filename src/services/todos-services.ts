import todosRepositories from "../repositories/todos-repositories";

class TodosServices {
  getTodosByUserId = async (userId: string) => {
    const todos = await todosRepositories.getTodosByUserId(userId);
    return todos;
  };

  createTodo = async (newTodo: any) => {
    const todo = await todosRepositories.createTodo(newTodo);
    return todo;
  };

  updateTodo = async (newTodo: any) => {
    const todo = await todosRepositories.updateTodo(newTodo);
    return todo;
  };

  deleteTodo = async (id: string, userId: string) => {
    const todo = await todosRepositories.deleteTodo(id, userId);
    return todo;
  };
}

export default new TodosServices();
