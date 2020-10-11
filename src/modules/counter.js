import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성 함수 만들기
// createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언할 수 있다.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기 상태
const initialState = {
  number: 0,
};

// 리듀서
// 리듀서 함수 또한 handleActions를 사용하면 더 간단하고 가독성 높게 작성이 가능하다.
// handleActions 함수의 첫 번째 파라미터에는 각 액션에 대한 업데이트 함수를 넣어 주고,
// 두 번째 파라미터에는 초기 상태를 넣어준다.
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
