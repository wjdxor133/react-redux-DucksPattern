import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../components/Todos";
import { useActions } from "../lib/useActions";

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  // const dispatch = useDispatch();
  // const onChangeInput = useCallback((input) => dispatch(changeInput(input)), [
  //   dispatch,
  // ]);
  // const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  // const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  // const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

  // useActions Hook은 액션 생성 함수를 액션을 디스패치하는 함수로 자동으로 변환해 준다.
  // 첫번째 파라미터에는 액션 생성 함수들로 이루어진 배열
  // 두번째 파라미터에는 첫번째 파라미터에 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만듬
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

/* 
connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우, 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 
해당 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화된다.

반면에, connect 함수 대신 useSelector를 사용하여 리덕스 상태를 조회했을 경우
자동으로 최적화 작업이 이루어지지 않기 때문에, 성능 최적화를 위해서는 
React,memo를 컨테이너에 사용해주어야 한다.

*/
export default React.memo(TodosContainer);

// 물론 지금과 같은 경우에는 TodosContainer의 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 일이 없으므로 불필요한 성능 최적화이다.
