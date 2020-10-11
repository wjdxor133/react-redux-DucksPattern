import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// 액션 타입 정의하기
const CHANGE_INPUT = "todos/CHANGE_INPUT"; // 인풋 값을 변경함
const INSERT = "todos/INSERT"; // 새로운 todo를 등록
const TOGGLE = "todos/TOGGLE"; // todo를 체크 / 체크 해제
const REMOVE = "todos/REMOVE"; // todo 제거

// 액션 생성 함수 만들기
export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3; // insert가 호출될 때마다 1씩 더해진다.

export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, (id) => id);

export const remove = createAction(REMOVE, (id) => id);

// 초기 상태 및 리듀서 함수 만들기
const initialState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "리덕스 기초 배우기",
      done: true,
    },
    {
      id: 2,
      text: "리액트와 리덕스 사용하기",
      done: false,
    },
  ],
};

// 리듀서
// 액셩 생성 함수는 액션에 필요한 추가 데이터를 모두 payload라는 이음으로 사용해야 하기 때문에
// action.id, action.todo를 조회하는 대신 모두 공통적으로 action.payload 값을 조회하도록 리듀서를 구현해야 한다.

/* 적용하기 전,
function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}
*/
/* 적용 후,
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
    [INSERT]: (state, action) => ({
      ...state,
      todos: state.todos.concat(action.payload),
    }),
    [TOGGLE]: (state, action) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      ),
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.id),
    }),
  },
  initialState
);
*/

// 하지만, 모든 추가 데이터 값을 action.payload로 사용하기 때문에 나중에 리듀서 코드를 다시 볼 때 헷갈릴 수 있다.
// 그럴 경우 비구조화 할당 문법으로 action 값의 payload 이름을 새로 설정해 주면,
// action.payload가 정확히 어떤 값을 의미하는지 쉽게 파악 가능
// 이로 인해 코드의 가독성이 더 높아짐
/*
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    [TOGGLE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
  },
  initialState
);
*/

// immer룰 적용한 예시
// immer룰 사용하는 이유는 리듀서에서 상태를 업데이트할 때는 불변성을 지켜야 하기 때문에
// 앞에서 spread 연산자(...)와 배열의 내장 함수를 활용했다.
// 그러나 모듈의 상태가 복잡해질수록 불변성을 지키기가 까다로워진다.
// 객체의 구조가 복잡해지거나 객체로 이루어진 배열을 다룰 경우, immer를 사용하면 훨씬 편리하게 상태를 관리할 수 있다.

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState
);

export default todos;
