import { S as copy_payload, T as assign_payload, D as pop, A as push, R as head } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "clsx";
import "../../../chunks/state.svelte.js";
import { B as Button } from "../../../chunks/button.js";
import { L as Label, I as Input } from "../../../chunks/label.js";
import { C as Card } from "../../../chunks/card.js";
function _page($$payload, $$props) {
  push();
  let email = "";
  let password = "";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>로그인 - Project Management</title>`;
    });
    $$payload2.out.push(`<div class="min-h-screen flex items-center justify-center bg-background px-4">`);
    Card($$payload2, {
      class: "w-full max-w-md p-6 space-y-6",
      children: ($$payload3) => {
        $$payload3.out.push(`<div class="text-center space-y-2"><h1 class="text-2xl font-bold">로그인</h1> <p class="text-muted-foreground">프로젝트 관리 도구에 접속하세요</p></div> <form class="space-y-4"><div class="space-y-2">`);
        Label($$payload3, {
          for: "email",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->이메일`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        Input($$payload3, {
          id: "email",
          type: "email",
          placeholder: "이메일을 입력하세요",
          get value() {
            return email;
          },
          set value($$value) {
            email = $$value;
            $$settled = false;
          }
        });
        $$payload3.out.push(`<!----></div> <div class="space-y-2">`);
        Label($$payload3, {
          for: "password",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->비밀번호`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        Input($$payload3, {
          id: "password",
          type: "password",
          placeholder: "비밀번호를 입력하세요",
          get value() {
            return password;
          },
          set value($$value) {
            password = $$value;
            $$settled = false;
          }
        });
        $$payload3.out.push(`<!----></div> `);
        Button($$payload3, {
          type: "submit",
          class: "w-full",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->로그인`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----></form> <div class="text-center"><p class="text-sm text-muted-foreground">테스트용: 로그인 버튼을 클릭하면 바로 접속됩니다</p></div>`);
      },
      $$slots: { default: true }
    });
    $$payload2.out.push(`<!----></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
