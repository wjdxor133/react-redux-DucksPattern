import React, { useCallback } from "react";
//connect 함수를 사용하는 대신 react-redux에서 제공하는 Hooks를 사용할 수도 있다.
import { useSelector, useDispatch } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = () => {
  // useSelector Hook을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있다.
  // 여기서 상태 선택 함수는 mapStateToProps와 형태가 똑같다.
  const number = useSelector((state) => state.counter.number);

  // 컨테이너 컴포넌트에서 액션을 디스패치해야 한다면 이 Hook을 사용하면 된다.
  const dispatch = useDispatch();

  // useCallback()을 사용하는 이유는
  // 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어진다.
  // 성능 최적화를 위해 useCallback으로 디스패치를 감싸주면 불필요한 렌더링을 막을 수 있다.
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
