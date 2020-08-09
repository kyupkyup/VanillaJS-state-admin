import store from "./store/index.js";
import Count from "./components/count.js";
import List from "./components/list.js";
import Status from "./components/status.js";

const formElement = document.querySelector("./js-form");
const inputElement = document.querySelector("#new-item-field");

console.log("메인 출력 확인");

formElement.addEventListener("submit", (evt) => {
  // 해당 인풋에서 제출이 되면 작동하는 함수
  evt.preventDefault();

  let value = inputElement.value.trim();

  if (value.length) {
    store.dispatch("addItem", value);
    // dispatch 실행
    inputElement.value = "";
    inputElement.focus();
  }
});

const countIntance = new Count();
const listInstance = new List();
const statusInstance = new Status();

countIntance.render();
listInstance.render();
statusInstance.render();
