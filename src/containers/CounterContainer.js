import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};
/*
// mapDispatchToProps, mapDispatchToProps에서 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달된다.
// mapStateToProps, 현재 스토어가 지니고 있는 상태를 가리킴
const mapStateToProps = (state) => ({
  number: state.counter.number,
});

// mapDispatchToProps, store의 내장 함수 dispatch를 파라미터로 받아 사용
const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});
*/

/* 
// connect를 통해서 해당 컴포넌트를 연결시키고,
// mapStateToProps, mapDispatchToProps안에 있는 값들을 해당 컴포넌트의 props로 전달
// 전달된 number, increase, decrease를 사용
const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    console.log("increase");
  },
  decrease: () => {
    console.log("decrease");
  },
});
*/
// 액션 생성 함수의 개수가 많아질 경우, 리덕스에서 제공하는 bindAcrionCreators 유틸 함수를 사용
/* 
이전 예시
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
  })
)(CounterContainer);

bindActionCreators가 적용된 예시
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        increase,
        decrease,
      },
      dispatch
    )
)(CounterContainer);
*/
// bindActionCreators보다 더 편한 방법은 connect 함수가 내부적으로 bindActionCreators 작업을 대신해준다.
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  {
    increase,
    decrease,
  }
)(CounterContainer);
