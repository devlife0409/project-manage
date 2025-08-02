import { G as sanitize_props, I as spread_props, J as slot, P as store_get, R as head, K as ensure_array_like, M as attr_class, F as escape_html, U as stringify, Q as unsubscribe_stores, D as pop, A as push } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { p as projects } from "../../../../chunks/projects.js";
import { C as Card } from "../../../../chunks/card.js";
import { B as Button } from "../../../../chunks/button.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "clsx";
import "../../../../chunks/state.svelte.js";
import { U as Users } from "../../../../chunks/users.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function Arrow_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.535.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "m12 5 7 7-7 7" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJtMTIgNSA3IDctNyA3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/arrow-right
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const projectId = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("project") || "1";
  const currentProject = store_get($$store_subs ??= {}, "$projects", projects).find((p) => p.id === projectId);
  const allProjects = store_get($$store_subs ??= {}, "$projects", projects);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>팀 관리 - Project Manager</title>`;
  });
  $$payload.out.push(`<div class="p-6 space-y-6"><div class="space-y-2"><h1 class="text-3xl font-bold flex items-center gap-3">`);
  Users($$payload, { class: "h-8 w-8 text-blue-500" });
  $$payload.out.push(`<!----> 팀 관리</h1> <p class="text-muted-foreground">프로젝트별 팀원을 관리하고 협업을 효율적으로 진행하세요</p></div> `);
  Card($$payload, {
    class: "p-4",
    children: ($$payload2) => {
      const each_array = ensure_array_like(allProjects);
      $$payload2.out.push(`<div class="space-y-4"><h2 class="text-lg font-semibold">프로젝트 선택</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let project = each_array[$$index];
        $$payload2.out.push(`<button${attr_class(`p-4 border rounded-lg text-left hover:bg-accent transition-colors ${stringify(projectId === project.id ? "border-primary bg-accent" : "")}`)}><div class="flex items-center justify-between"><div><h3 class="font-medium">${escape_html(project.name)}</h3> <p class="text-sm text-muted-foreground">${escape_html(project.description)}</p> <p class="text-xs text-muted-foreground mt-2">팀원 ${escape_html(project.members?.length || 0)}명 · 작업 ${escape_html(project.tasks.length)}개</p></div> `);
        Arrow_right($$payload2, { class: "h-4 w-4 text-muted-foreground" });
        $$payload2.out.push(`<!----></div></button>`);
      }
      $$payload2.out.push(`<!--]--></div></div>`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----> `);
  if (currentProject) {
    $$payload.out.push("<!--[-->");
    Card($$payload, {
      class: "p-6",
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="space-y-4"><div class="flex items-center justify-between"><div><h2 class="text-xl font-semibold">${escape_html(currentProject.name)}</h2> <p class="text-muted-foreground">${escape_html(currentProject.description)}</p></div> <div class="text-sm text-muted-foreground">상태: <span class="font-medium">${escape_html(currentProject.status)}</span></div></div></div>`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!----> `);
    Card($$payload, {
      class: "p-6",
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="space-y-4"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold">팀원 목록</h3> `);
        Button($$payload2, {
          class: "gap-2",
          children: ($$payload3) => {
            Users($$payload3, { class: "h-4 w-4" });
            $$payload3.out.push(`<!----> 팀원 추가`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----></div> `);
        if (currentProject.members && currentProject.members.length > 0) {
          $$payload2.out.push("<!--[-->");
          const each_array_1 = ensure_array_like(currentProject.members);
          $$payload2.out.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let member = each_array_1[$$index_1];
            $$payload2.out.push(`<div class="p-4 border rounded-lg"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">${escape_html(member.name.charAt(0))}</div> <div><h4 class="font-medium">${escape_html(member.name)}</h4> <p class="text-sm text-muted-foreground">${escape_html(member.role)}</p> <p class="text-xs text-muted-foreground">${escape_html(member.email)}</p></div></div></div>`);
          }
          $$payload2.out.push(`<!--]--></div>`);
        } else {
          $$payload2.out.push("<!--[!-->");
          $$payload2.out.push(`<div class="text-center py-8 text-muted-foreground">`);
          Users($$payload2, { class: "h-16 w-16 mx-auto mb-4" });
          $$payload2.out.push(`<!----> <p>아직 팀원이 없습니다.</p> <p class="text-sm">첫 번째 팀원을 추가해보세요!</p></div>`);
        }
        $$payload2.out.push(`<!--]--></div>`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!---->`);
  } else {
    $$payload.out.push("<!--[!-->");
    Card($$payload, {
      class: "p-8",
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="text-center space-y-4">`);
        Users($$payload2, { class: "h-16 w-16 mx-auto text-muted-foreground" });
        $$payload2.out.push(`<!----> <div><h3 class="text-lg font-semibold">프로젝트를 선택하세요</h3> <p class="text-muted-foreground">팀원을 관리할 프로젝트를 선택해주세요</p></div></div>`);
      },
      $$slots: { default: true }
    });
  }
  $$payload.out.push(`<!--]--></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
