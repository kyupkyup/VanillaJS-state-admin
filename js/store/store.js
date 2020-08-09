import PubSub from "../lib/PubSub";

export default class Store {
  constructor(params) {
    let self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = "resting";
    // store 가 기본적으로 가지고 있는 속성 actions, mutations, state, status
    self.events = new PubSub();
    // event에 PubSub 객체 할당

    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
      // ***받아온 파라미터에 actions 속성이 있다면 그 action을 그대로 할당해줌
    }
    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutaions;
      // 받아온 파라미터에 mutations 속성이 있다면 그 mutations을 그대로 할당해줌
    }

    self.state = new Proxy(params.state || {}, {
      // state를 프록시로 재정의
      // 오브젝트의 변화를 감지하는 것!
      set: function (state, key, value) {
        state[key] = value;
        console.log(`stateChange: ${key}: ${value}`);
        self.events.publish("stateChange", self.state);

        if (self.status !== "mutation") {
          console.log(`you should use mutation to use ${key}`);
        }
        self.status = "resting";
        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    let self = this;

    if (typeof self.actions[actionsKey] !== "function") {
      // store의 actions 객체 중 actionkey에 맞는 객체가 함수라면 아래 실행
      console.error(`ACtion ${actionKey} doesn't exist`);
      return false;
    }
    console.groupCollapsed(`ACTION: ${actionKey}`);
    //?? 무슨 함수지?
    self.status = "action";
    // action 상태로 변경
    self.actions[actionKey](self, payload);
    // action 함수 실행 (self, payload를 매개 변수로 하여)
    console.groupEnd();
    //??? 뭐지

    return true;
  }

  commit(mutationKey, payload) {
    let self = this;
    if (typeof self.acitions[actionKey] !== "function") {
      console.error(`Mutation ${mutationKey} doesn't exist`);
      return false;
    }

    self.status = "mutation";
    let newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);
    // dispatch와 차이점
    // 현재 상태에 새로운 상태를 할당해줌
    return true;
  }
}
