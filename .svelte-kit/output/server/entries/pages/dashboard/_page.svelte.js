import { G as sanitize_props, I as spread_props, J as slot, K as ensure_array_like, F as escape_html, U as stringify, V as attr_style } from "../../../chunks/index2.js";
import { C as Card } from "../../../chunks/card.js";
import { F as Folder_open } from "../../../chunks/folder-open.js";
import { U as Users } from "../../../chunks/users.js";
import { C as Calendar } from "../../../chunks/calendar.js";
import { I as Icon } from "../../../chunks/Icon.js";
function Trending_up($$payload, $$props) {
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
    ["path", { "d": "M16 7h6v6" }],
    ["path", { "d": "m22 7-8.5 8.5-5-5L2 17" }]
  ];
  Icon($$payload, spread_props([
    { name: "trending-up" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgN2g2djYiIC8+CiAgPHBhdGggZD0ibTIyIDctOC41IDguNS01LTVMMiAxNyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/trending-up
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
function _page($$payload) {
  const stats = [
    {
      title: "진행 중인 프로젝트",
      value: "12",
      icon: Folder_open,
      color: "text-blue-600"
    },
    {
      title: "팀 멤버",
      value: "8",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "이번 주 일정",
      value: "24",
      icon: Calendar,
      color: "text-orange-600"
    },
    {
      title: "완료율",
      value: "84%",
      icon: Trending_up,
      color: "text-purple-600"
    }
  ];
  const recentProjects = [
    { name: "웹사이트 리뉴얼", status: "진행중", progress: 75 },
    { name: "모바일 앱 개발", status: "진행중", progress: 45 },
    { name: "API 서버 구축", status: "완료", progress: 100 },
    { name: "UI 디자인 시스템", status: "대기", progress: 20 }
  ];
  const each_array = ensure_array_like(stats);
  $$payload.out.push(`<div class="p-6 space-y-6"><div><h1 class="text-3xl font-bold">대시보드</h1> <p class="text-muted-foreground">프로젝트 현황을 한눈에 확인하세요</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let stat = each_array[$$index];
    Card($$payload, {
      class: "p-6",
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="flex items-center justify-between"><div><p class="text-sm text-muted-foreground">${escape_html(stat.title)}</p> <p class="text-2xl font-bold">${escape_html(stat.value)}</p></div> <!---->`);
        stat.icon?.($$payload2, { class: `h-8 w-8 ${stringify(stat.color)}` });
        $$payload2.out.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
  }
  $$payload.out.push(`<!--]--></div> `);
  Card($$payload, {
    class: "p-6",
    children: ($$payload2) => {
      const each_array_1 = ensure_array_like(recentProjects);
      $$payload2.out.push(`<h2 class="text-xl font-semibold mb-4">최근 프로젝트</h2> <div class="space-y-4"><!--[-->`);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let project = each_array_1[$$index_1];
        $$payload2.out.push(`<div class="flex items-center justify-between p-4 border rounded-lg"><div class="flex-1"><h3 class="font-medium">${escape_html(project.name)}</h3> <p class="text-sm text-muted-foreground">${escape_html(project.status)}</p></div> <div class="flex items-center gap-4"><div class="w-32 bg-secondary rounded-full h-2"><div class="bg-primary h-2 rounded-full transition-all"${attr_style(`width: ${stringify(project.progress)}%`)}></div></div> <span class="text-sm font-medium w-12">${escape_html(project.progress)}%</span></div></div>`);
      }
      $$payload2.out.push(`<!--]--></div>`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----></div>`);
}
export {
  _page as default
};
