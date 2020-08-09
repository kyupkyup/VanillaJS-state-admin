export default class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(events, callback) {
    // 구독 이벤트
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      // 인자로 받은 events가 없다면
      self.events[event] = []; // 빈 배열을 만들고
    }

    return self.events[event].push(callback); // 해당 이벤트가 존재하면 콜백 함수 푸쉬
  }

  publish(event, data = {}) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      //  이벤트가 발생했는지 확인하고 없으면
      return []; // 빈 배열 리턴
    }

    return self.events[event].map((callback) => callback(data));
    // 이벤트가 있다면 해당 콜백 함수를 실행해서 event에 저장
  }
}
