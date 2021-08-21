import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { todosAsyncActions } from "./reducers/todos";
import { RootState } from "./store";
import { ITodosReducersState } from "./types/todo";

function App() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState<null | number>(null);
  const { list, loading, current, error } = useSelector<
    RootState,
    ITodosReducersState
  >((state) => state.todos);

  useEffect(() => {
    dispatch(todosAsyncActions.fetchTodos());
  }, []);

  useEffect(() => {
    if (currentId || currentId === 0) {
      dispatch(todosAsyncActions.fetchCurrentTodo(currentId));
    }
  }, [currentId]);

  return (
    <div className="App">
      <input onChange={(e) => setCurrentId(+e.target.value)} />
      <span style={{ color: "red" }}>{error?.message}</span>
      <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 5 }}>
        {current ? (
          <pre>{JSON.stringify(current, null, 2)}</pre>
        ) : (
          <span>No value</span>
        )}
      </div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        list.map((item, idx) => (
          <pre key={idx}>{JSON.stringify(item, null, 2)}</pre>
        ))
      )}
    </div>
  );
}

export default App;
