import Component from "../lib/Component";
import store from "../store/index.js";

export default class Count extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".js-count"),
    });
  }

  render() {
    let suffix = store.state.items.length !== 1 ? "s" : "";
    // 아이템 개수가 1이상이면 s 붙여주기
    let emoji = store.state.items.length > 0 ? "&#x1f64c;" : "&#x1f622;";
    // 뭐냐 이건?

    this.element.innerHTML = `
        <small> You've done </small>
        ${store.state.items.length}
        <small>thing${suffix} today ${emoji}</small>
        
    `;
  }
}
