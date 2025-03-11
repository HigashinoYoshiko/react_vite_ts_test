import { useState } from 'react'
import './App.css'

//https://www.youtube.com/watch?v=ANcopd8Bmao
function App() {

  const [inputValue, setInputValue] = useState("");

  // useState<Todo[]> --- Todoの配列だけをもってくる
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // テキストが入力されたときに呼ばれるイベント
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // サブミットイベント
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //リロードを回避
    e.preventDefault();

    //新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");

  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h2>Todoリスト with Typescript</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          // value={inputValue}を指定すると、submitした後のsetInputValue("");が反映される
          value={inputValue}
          onChange={(e) => handleChange(e)}
          className="inputText"
        />
        <input type="submit" value="作成" className='submitButton' />
      </form>
      <ul className="todoList">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              className="inputText"
              value={todo.inputValue}
              disabled={todo.checked}
            />
            <input
              type="checkbox"
              onChange={() => handleChecked(todo.id, todo.checked)} />
            <button onClick={() => handleDelete(todo.id)}>消</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
