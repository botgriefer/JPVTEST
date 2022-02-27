import { n as noop, a as safe_not_equal, c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, f as each } from "../../chunks/index-b3dad0a6.js";
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $data, $$unsubscribe_data;
  let $current, $$unsubscribe_current;
  const data = writable({});
  $$unsubscribe_data = subscribe(data, (value) => $data = value);
  const current = writable("");
  $$unsubscribe_current = subscribe(current, (value) => $current = value);
  let code = "";
  $$unsubscribe_data();
  $$unsubscribe_current();
  return `<h1>Enter code:</h1>
<form><input type="${"text"}"${add_attribute("value", code, 0)}>
	<button type="${"submit"}">Submit</button></form>
${$data.name ? `<p>${escape($data.name)}</p>` : ``}
${$data.img ? `<img alt="${"img"}"${add_attribute("src", $data.img, 0)}>` : ``}
${$data.video ? `${each($data.video, (vid) => {
    return `<button>${escape(vid.label)} ${escape(vid.file == $current ? "Active" : "")}</button>`;
  })}` : ``}
${$current ? `<iframe title="${"video"}"${add_attribute("src", $current, 0)} allowfullscreen></iframe>` : ``}`;
});
export { Routes as default };
