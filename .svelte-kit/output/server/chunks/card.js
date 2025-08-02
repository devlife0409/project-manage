import { X as spread_attributes, N as clsx, D as pop, A as push } from "./index2.js";
import { c as cn } from "./utils.js";
function Card($$payload, $$props) {
  push();
  let { class: className, children, $$slots, $$events, ...restProps } = $$props;
  $$payload.out.push(`<div${spread_attributes(
    {
      class: clsx(cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)),
      ...restProps
    }
  )}>`);
  if (children) {
    $$payload.out.push("<!--[-->");
    children($$payload);
    $$payload.out.push(`<!---->`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div>`);
  pop();
}
export {
  Card as C
};
