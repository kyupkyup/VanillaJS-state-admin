import Component from "../lib/Component";
import store from "../store/index.js";

export default class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".js-items"),
      // css 선택자를 찾는다. (js-items라는 클래스 찾음)
    });
  }

  render() {
    let self = this;
    console.log(self);

    if (store.state.items.length === 0) {
      self.element.innerHTML = `<p class="no-items"> nothing </p>`;
      return;
    }
    // store에 아무것도 저장되있지 않으면 innerHTML을 표시 (아무것도 없음)

    self.element.innerHTML =
      // 기본적으로 store 아이템을 모두 매핑함
      `
        <ul class="app__items">
            ${store.state.items
              .map((items) => {
                return `
                        <li ${items} <button aria-label="Delete this item">x</button></li>
                    `;
              })
              .join("")}
        </ul>
    `;
    self.element.querySelectorAll("button").forEach((button, index) => {
      button.addEventListener("click", () => {
        store.dispatch("clearItem", { index });
      });
    });
    // element 내에 있는 모든 내용을 가져옴
  }
}
