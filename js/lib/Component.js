import Store from "../store/store";
export default class Component {
  constructor(props = {}) {
    let self = this;

    this.render = this.render || function () {};
    // render 함수가 넘어올 경우 그 함수로 할당 or 없음
    if (props.store instanceof Store) {
      props.store.events.subscribe("stateChange", () => self.render());
      // store를 임포트 한 이유
      // props.store 가 Store 의 클래스 형태인지 확인하기 위함
    }
    if (props.hasOwnProperty("element")) {
      this.element = props.element;
    }
  }
}
