let uniqId = 0;

function TodoApp() {
  const [inputValue, setInputValue] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(todoList);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang reload khi submit form

    if (inputValue.trim()) {
      const todoList = [
        ...todos,
        {
          id: ++uniqId,
          text: inputValue,
          completed: false,
        },
      ];

      setTodos(todoList);
      localStorage.setItem("todos", JSON.stringify(todoList));
      setInputValue(""); // Reset input sau khi thêm todo
    }
  };

  const deleteTodo = (id) => {
    const todoList = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todoList));
    setTodos(todoList);
  };

  const toggleTodo = (id) => {
    const todoList = todos.map((todo) =>
      todo.id === id
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo
    );
    localStorage.setItem("todos", JSON.stringify(todoList));
    setTodos(todoList);
  };

  const total = todos.length;
  const completed = todos?.filter(todo => todo.completed).length;
  const remaining = total - completed;

  return (
    <>
      <h1>
        Todo List App
      </h1>
      <form className="todo-container" onSubmit={handleSubmit}>
        <div className="add-todo">
          <input
            type="text"
            id="todo-add"
            placeholder="Thêm mục mới..."
            value={inputValue}
            onChange={handleInputChange}
          />

          <button type="submit">Thêm</button>
        </div>

        {todos.length === 0 ? <div className="todo-empty">
          Chưa có task nào. Hãy thêm task đầu tiên!
        </div> : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                className={`todo-item ${todo.completed ? "completed" : ""}`}
                key={todo.id}
              >
                <div>
                  <input
                    type="checkbox"
                    id={todo.id}
                    name="todo"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label htmlFor={todo.id}>{todo.text}</label>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="todo-detele"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <div>
            <p><strong>Tổng:</strong> {total} task(s)</p>
            <p><strong>Hoàn thành:</strong> {completed} task(s)</p>
            <p><strong>Còn lại:</strong> {remaining} task(s)</p>
          </div>
        )}
      </form>
    </>
  );
}

const app = <TodoApp />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
