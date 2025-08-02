import { A as push, X as spread_attributes, N as clsx, D as pop } from "./index2.js";
import { c as cn } from "./utils.js";
function Input($$payload, $$props) {
  push();
  let { class: className, $$slots, $$events, ...restProps } = $$props;
  $$payload.out.push(`<input${spread_attributes(
    {
      class: clsx(cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)),
      ...restProps
    }
  )}/>`);
  pop();
}
function Label($$payload, $$props) {
  push();
  let { class: className, children, $$slots, $$events, ...restProps } = $$props;
  $$payload.out.push(`<label${spread_attributes(
    {
      class: clsx(cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)),
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
  $$payload.out.push(`<!--]--></label>`);
  pop();
}
export {
  Input as I,
  Label as L
};
