import { G as sanitize_props, I as spread_props, J as slot, S as copy_payload, T as assign_payload, D as pop, A as push, F as escape_html, K as ensure_array_like, W as maybe_selected, O as attr, P as store_get, Q as unsubscribe_stores, V as attr_style, M as attr_class, U as stringify, N as clsx, R as head } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { C as Card } from "../../../../../../chunks/card.js";
import { B as Button } from "../../../../../../chunks/button.js";
import { p as projects, g as getStatusColor, a as getPriorityColor } from "../../../../../../chunks/projects.js";
import { D as Dialog, P as Plus, T as Table } from "../../../../../../chunks/dialog.js";
import { L as Label, I as Input } from "../../../../../../chunks/label.js";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { c as cn } from "../../../../../../chunks/utils.js";
import { g as goto } from "../../../../../../chunks/client.js";
import { C as Calendar } from "../../../../../../chunks/calendar.js";
import { C as Chart_column } from "../../../../../../chunks/x.js";
function Arrow_left($$payload, $$props) {
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
    ["path", { "d": "m12 19-7-7 7-7" }],
    ["path", { "d": "M19 12H5" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTIgMTktNy03IDctNyIgLz4KICA8cGF0aCBkPSJNMTkgMTJINSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/arrow-left
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
function Chevron_down($$payload, $$props) {
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
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-down" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiA5IDYgNiA2LTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chevron-down
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
function Chevron_left($$payload, $$props) {
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
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUgMTgtNi02IDYtNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevron-left
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
function Chevron_right($$payload, $$props) {
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
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
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
function Chevron_up($$payload, $$props) {
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
  const iconNode = [["path", { "d": "m18 15-6-6-6 6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-up" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTggMTUtNi02LTYgNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevron-up
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
function Search($$payload, $$props) {
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
    ["path", { "d": "m21 21-4.34-4.34" }],
    ["circle", { "cx": "11", "cy": "11", "r": "8" }]
  ];
  Icon($$payload, spread_props([
    { name: "search" },
    $$sanitized_props,
    {
      /**
       * @component @name Search
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMjEgMjEtNC4zNC00LjM0IiAvPgogIDxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/search
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
function Square_pen($$payload, $$props) {
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
    [
      "path",
      {
        "d": "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }
    ],
    [
      "path",
      {
        "d": "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "square-pen" },
    $$sanitized_props,
    {
      /**
       * @component @name SquarePen
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi03IiAvPgogIDxwYXRoIGQ9Ik0xOC4zNzUgMi42MjVhMSAxIDAgMCAxIDMgM2wtOS4wMTMgOS4wMTRhMiAyIDAgMCAxLS44NTMuNTA1bC0yLjg3My44NGEuNS41IDAgMCAxLS42Mi0uNjJsLjg0LTIuODczYTIgMiAwIDAgMSAuNTA2LS44NTJ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/square-pen
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
function Trash_2($$payload, $$props) {
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
    ["path", { "d": "M10 11v6" }],
    ["path", { "d": "M14 11v6" }],
    ["path", { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
  ];
  Icon($$payload, spread_props([
    { name: "trash-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Trash2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTF2NiIgLz4KICA8cGF0aCBkPSJNMTQgMTF2NiIgLz4KICA8cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2IiAvPgogIDxwYXRoIGQ9Ik0zIDZoMTgiIC8+CiAgPHBhdGggZD0iTTggNlY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/trash-2
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
function Task_form_modal($$payload, $$props) {
  push();
  var $$store_subs;
  let { open, projectId, task = null, onClose } = $$props;
  let formData = {
    name: "",
    description: "",
    assignee: "",
    status: "planned",
    priority: "medium",
    startDate: "",
    endDate: "",
    progress: 0
  };
  const currentProject = () => {
    return store_get($$store_subs ??= {}, "$projects", projects).find((p) => p.id === projectId);
  };
  const teamMembers = () => {
    return currentProject?.members || [];
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Dialog($$payload2, {
      open,
      onClose,
      children: ($$payload3) => {
        $$payload3.out.push(`<div class="space-y-6"><div><h2 class="text-lg font-semibold">${escape_html(task ? "작업 편집" : "새 작업 추가")}</h2> <p class="text-sm text-muted-foreground">작업 정보를 입력하세요</p></div> <form class="space-y-4"><div class="grid grid-cols-2 gap-4"><div class="space-y-2">`);
        Label($$payload3, {
          for: "name",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->작업명 *`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        Input($$payload3, {
          id: "name",
          placeholder: "작업명을 입력하세요",
          required: true,
          get value() {
            return formData.name;
          },
          set value($$value) {
            formData.name = $$value;
            $$settled = false;
          }
        });
        $$payload3.out.push(`<!----></div> <div class="space-y-2">`);
        Label($$payload3, {
          for: "assignee",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->담당자 *`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        if (teamMembers.length > 0) {
          $$payload3.out.push("<!--[-->");
          const each_array = ensure_array_like(teamMembers);
          $$payload3.out.push(`<select id="assignee" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>`);
          $$payload3.select_value = formData.assignee;
          $$payload3.out.push(`<option value=""${maybe_selected($$payload3, "")}>담당자를 선택하세요</option><!--[-->`);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let member = each_array[$$index];
            $$payload3.out.push(`<option${attr("value", member.name)}${maybe_selected($$payload3, member.name)}>${escape_html(member.name)} (${escape_html(member.role)})</option>`);
          }
          $$payload3.out.push(`<!--]-->`);
          $$payload3.select_value = void 0;
          $$payload3.out.push(`</select>`);
        } else {
          $$payload3.out.push("<!--[!-->");
          Input($$payload3, {
            id: "assignee",
            placeholder: "담당자명을 입력하세요",
            required: true,
            get value() {
              return formData.assignee;
            },
            set value($$value) {
              formData.assignee = $$value;
              $$settled = false;
            }
          });
          $$payload3.out.push(`<!----> <p class="text-xs text-muted-foreground">팀원을 추가하면 드롭다운에서 선택할 수 있습니다</p>`);
        }
        $$payload3.out.push(`<!--]--></div></div> <div class="space-y-2">`);
        Label($$payload3, {
          for: "description",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->설명`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        Input($$payload3, {
          id: "description",
          placeholder: "작업 설명을 입력하세요",
          get value() {
            return formData.description;
          },
          set value($$value) {
            formData.description = $$value;
            $$settled = false;
          }
        });
        $$payload3.out.push(`<!----></div> <div class="grid grid-cols-2 gap-4"><div class="space-y-2">`);
        Label($$payload3, {
          for: "status",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->상태`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> <select id="status" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">`);
        $$payload3.select_value = formData.status;
        $$payload3.out.push(`<option value="planned"${maybe_selected($$payload3, "planned")}>계획됨</option><option value="in-progress"${maybe_selected($$payload3, "in-progress")}>진행중</option><option value="completed"${maybe_selected($$payload3, "completed")}>완료</option><option value="on-hold"${maybe_selected($$payload3, "on-hold")}>보류</option>`);
        $$payload3.select_value = void 0;
        $$payload3.out.push(`</select></div> <div class="space-y-2">`);
        Label($$payload3, {
          for: "priority",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->우선순위`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> <select id="priority" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">`);
        $$payload3.select_value = formData.priority;
        $$payload3.out.push(`<option value="low"${maybe_selected($$payload3, "low")}>낮음</option><option value="medium"${maybe_selected($$payload3, "medium")}>보통</option><option value="high"${maybe_selected($$payload3, "high")}>높음</option>`);
        $$payload3.select_value = void 0;
        $$payload3.out.push(`</select></div></div> <div class="grid grid-cols-2 gap-4"><div class="space-y-2">`);
        Label($$payload3, {
          for: "startDate",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->시작일 *`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        Input($$payload3, {
          id: "startDate",
          type: "date",
          required: true,
          get value() {
            return formData.startDate;
          },
          set value($$value) {
            formData.startDate = $$value;
            $$settled = false;
          }
        });
        $$payload3.out.push(`<!----></div> <div class="space-y-2">`);
        Label($$payload3, {
          for: "endDate",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->종료일 *`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        Input($$payload3, {
          id: "endDate",
          type: "date",
          required: true,
          get value() {
            return formData.endDate;
          },
          set value($$value) {
            formData.endDate = $$value;
            $$settled = false;
          }
        });
        $$payload3.out.push(`<!----></div></div> <div class="space-y-2">`);
        Label($$payload3, {
          for: "progress",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->진행률 (${escape_html(formData.progress)}%)`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> <input id="progress" type="range" min="0" max="100"${attr("value", formData.progress)} class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"/></div> <div class="flex gap-2 pt-4">`);
        Button($$payload3, {
          type: "submit",
          class: "flex-1",
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->${escape_html(task ? "수정" : "추가")}`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----> `);
        Button($$payload3, {
          type: "button",
          variant: "outline",
          onclick: onClose,
          children: ($$payload4) => {
            $$payload4.out.push(`<!---->취소`);
          },
          $$slots: { default: true }
        });
        $$payload3.out.push(`<!----></div></form></div>`);
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Gantt_chart($$payload, $$props) {
  push();
  var $$store_subs;
  let { projectId } = $$props;
  let showTaskForm = false;
  let editingTask = null;
  const currentProject = () => {
    return store_get($$store_subs ??= {}, "$projects", projects).find((p) => p.id === projectId);
  };
  const tasks = () => {
    return currentProject?.tasks || [];
  };
  function openAddTask() {
    editingTask = null;
    showTaskForm = true;
  }
  function closeTaskForm() {
    showTaskForm = false;
    editingTask = null;
  }
  function getPositionStyle(task, index) {
    const left = index * 10;
    const width = 20 + index * 15;
    return `left: ${left}%; width: ${width}%;`;
  }
  const each_array = ensure_array_like(tasks);
  $$payload.out.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h3 class="text-lg font-medium">작업 일정</h3> <div class="flex items-center gap-2">`);
  Button($$payload, {
    onclick: openAddTask,
    size: "sm",
    class: "gap-2",
    children: ($$payload2) => {
      Plus($$payload2, { class: "h-4 w-4" });
      $$payload2.out.push(`<!----> 작업 추가`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----> <div class="text-sm text-muted-foreground">2024년 8월 - 9월</div></div></div> <div class="border rounded-lg overflow-hidden"><div class="bg-muted border-b"><div class="grid grid-cols-12 gap-0"><div class="col-span-3 p-3 border-r font-medium">작업명</div> <div class="col-span-9 p-3"><div class="grid grid-cols-9 gap-0 text-center text-sm"><div class="py-1">8/1</div> <div class="py-1">8/5</div> <div class="py-1">8/10</div> <div class="py-1">8/15</div> <div class="py-1">8/20</div> <div class="py-1">8/25</div> <div class="py-1">8/30</div> <div class="py-1">9/1</div> <div class="py-1">9/5</div></div></div></div></div> <!--[-->`);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let task = each_array[index];
    $$payload.out.push(`<div class="grid grid-cols-12 gap-0 border-b last:border-b-0 hover:bg-muted/50 group"><div class="col-span-3 p-3 border-r"><div class="flex items-center justify-between"><div><div class="font-medium">${escape_html(task.name)}</div> <div class="text-sm text-muted-foreground">${escape_html(task.startDate)} ~ ${escape_html(task.endDate)}</div> <div class="text-xs text-muted-foreground">${escape_html(task.assignee)}</div></div> <div class="opacity-0 group-hover:opacity-100 flex gap-1"><button class="p-1 hover:bg-accent rounded-sm" title="편집">`);
    Square_pen($$payload, { class: "h-3 w-3" });
    $$payload.out.push(`<!----></button> <button class="p-1 hover:bg-destructive hover:text-destructive-foreground rounded-sm" title="삭제">`);
    Trash_2($$payload, { class: "h-3 w-3" });
    $$payload.out.push(`<!----></button></div></div></div> <div class="col-span-9 p-3 relative"><div class="grid grid-cols-9 gap-0 h-8 relative"><div class="absolute inset-y-0 flex items-center"${attr_style(getPositionStyle(task, index))}><div${attr_class(`w-full h-4 ${stringify(task.color || getStatusColor(task.status))} rounded-sm relative overflow-hidden cursor-pointer`)}><div class="absolute inset-0 bg-white/20"${attr_style(`width: ${stringify(task.progress)}%`)}></div> <div class="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">${escape_html(task.progress)}%</div></div></div></div></div></div>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="flex gap-4 text-sm"><div class="flex items-center gap-2"><div class="w-3 h-3 bg-gray-500 rounded"></div> <span>계획됨</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 bg-blue-500 rounded"></div> <span>진행중</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 bg-green-500 rounded"></div> <span>완료</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 bg-yellow-500 rounded"></div> <span>보류</span></div></div> `);
  Task_form_modal($$payload, {
    open: showTaskForm,
    projectId,
    task: editingTask,
    onClose: closeTaskForm
  });
  $$payload.out.push(`<!----></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Event_calendar($$payload, $$props) {
  push();
  var $$store_subs;
  let { projectId } = $$props;
  let showTaskForm = false;
  let editingTask = null;
  let currentDate = /* @__PURE__ */ new Date();
  const currentProject = () => {
    return store_get($$store_subs ??= {}, "$projects", projects).find((p) => p.id === projectId);
  };
  const tasks = () => {
    return currentProject?.tasks || [];
  };
  const currentMonth = () => currentDate.getMonth();
  const currentYear = () => currentDate.getFullYear();
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ];
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }
  const daysInMonth = () => getDaysInMonth(currentYear, currentMonth);
  const firstDay = () => getFirstDayOfMonth(currentYear, currentMonth);
  const calendarDays = () => {
    return Array.from({ length: 42 }, (_, i) => {
      const dayNumber = i - firstDay + 1;
      return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
    });
  };
  function getTasksForDay(day) {
    if (!day) return [];
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((task) => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.endDate);
      const currentDay = new Date(dateStr);
      return currentDay >= taskStart && currentDay <= taskEnd;
    });
  }
  function openAddTask() {
    editingTask = null;
    showTaskForm = true;
  }
  function closeTaskForm() {
    showTaskForm = false;
    editingTask = null;
  }
  function isToday(day) {
    if (!day) return false;
    const today = /* @__PURE__ */ new Date();
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  }
  const each_array = ensure_array_like(dayNames);
  const each_array_1 = ensure_array_like(calendarDays);
  $$payload.out.push(`<div class="space-y-4"><div class="flex items-center justify-between"><h2 class="text-xl font-semibold">${escape_html(currentYear)}년 ${escape_html(monthNames[currentMonth])}</h2> <div class="flex items-center gap-2">`);
  Button($$payload, {
    onclick: openAddTask,
    size: "sm",
    class: "gap-2",
    children: ($$payload2) => {
      Plus($$payload2, { class: "h-4 w-4" });
      $$payload2.out.push(`<!----> 작업 추가`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----> <div class="flex gap-2"><button class="p-1 hover:bg-secondary rounded-md">`);
  Chevron_left($$payload, { class: "h-4 w-4" });
  $$payload.out.push(`<!----></button> <button class="p-1 hover:bg-secondary rounded-md">`);
  Chevron_right($$payload, { class: "h-4 w-4" });
  $$payload.out.push(`<!----></button></div></div></div> <div class="border rounded-lg overflow-hidden"><div class="grid grid-cols-7 bg-muted"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let dayName = each_array[$$index];
    $$payload.out.push(`<div class="p-3 text-center font-medium border-r last:border-r-0">${escape_html(dayName)}</div>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="grid grid-cols-7"><!--[-->`);
  for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
    let day = each_array_1[$$index_2];
    const dayTasks = getTasksForDay(day);
    $$payload.out.push(`<div${attr_class(`min-h-32 p-2 border-r border-b last:border-r-0 hover:bg-muted/50 group ${stringify(isToday(day) ? "bg-accent/30" : "")}`)}>`);
    if (day) {
      $$payload.out.push("<!--[-->");
      const each_array_2 = ensure_array_like(dayTasks.slice(0, 2));
      $$payload.out.push(`<div class="text-sm font-medium mb-1">${escape_html(day)}</div> <div class="space-y-1"><!--[-->`);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let task = each_array_2[$$index_1];
        $$payload.out.push(`<div class="relative group/task"><div${attr_class(`text-xs p-1 rounded ${stringify(task.color || getStatusColor(task.status))} text-white truncate cursor-pointer`)}${attr("title", task.name)}>${escape_html(task.name)}</div> <div class="absolute top-0 right-0 opacity-0 group-hover/task:opacity-100 flex gap-1"><button class="p-0.5 bg-black/50 hover:bg-black/70 rounded text-white" title="편집">`);
        Square_pen($$payload, { class: "h-2 w-2" });
        $$payload.out.push(`<!----></button> <button class="p-0.5 bg-red-500/80 hover:bg-red-500 rounded text-white" title="삭제">`);
        Trash_2($$payload, { class: "h-2 w-2" });
        $$payload.out.push(`<!----></button></div></div>`);
      }
      $$payload.out.push(`<!--]--> `);
      if (dayTasks.length > 2) {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<div class="text-xs text-muted-foreground">+${escape_html(dayTasks.length - 2)}개 더</div>`);
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div>`);
  }
  $$payload.out.push(`<!--]--></div></div> <div class="space-y-2"><h3 class="font-medium">이번 달 작업 현황</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-gray-500"></div> <span>계획됨</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-blue-500"></div> <span>진행중</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-green-500"></div> <span>완료</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-yellow-500"></div> <span>보류</span></div></div></div> `);
  Task_form_modal($$payload, {
    open: showTaskForm,
    projectId,
    task: editingTask,
    onClose: closeTaskForm
  });
  $$payload.out.push(`<!----></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Data_table($$payload, $$props) {
  push();
  var $$store_subs;
  let { projectId, searchable = true, class: className } = $$props;
  let showTaskForm = false;
  let editingTask = null;
  const currentProject = () => {
    return store_get($$store_subs ??= {}, "$projects", projects).find((p) => p.id === projectId);
  };
  const data = () => {
    return currentProject?.tasks || [];
  };
  const columns = [
    { key: "name", label: "작업명", sortable: true, width: "200px" },
    { key: "assignee", label: "담당자", sortable: true },
    { key: "status", label: "상태", sortable: true },
    { key: "priority", label: "우선순위", sortable: true },
    { key: "startDate", label: "시작일", sortable: true },
    { key: "endDate", label: "종료일", sortable: true },
    { key: "progress", label: "진행률(%)", sortable: true },
    { key: "actions", label: "작업", sortable: false, width: "100px" }
  ];
  let searchTerm = "";
  let sortColumn = null;
  let sortDirection = "asc";
  const filteredData = () => {
    let filtered = data;
    if (searchTerm) {
      filtered = filtered.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())));
    }
    return filtered;
  };
  function openAddTask() {
    editingTask = null;
    showTaskForm = true;
  }
  function closeTaskForm() {
    showTaskForm = false;
    editingTask = null;
  }
  function formatValue(task, key) {
    switch (key) {
      case "status":
        return getStatusText(task.status);
      case "priority":
        return getPriorityText(task.priority);
      case "progress":
        return `${task.progress}%`;
      case "actions":
        return null;
      default:
        return task[key];
    }
  }
  function getStatusText(status) {
    switch (status) {
      case "planned":
        return "계획됨";
      case "in-progress":
        return "진행중";
      case "completed":
        return "완료";
      case "on-hold":
        return "보류";
      default:
        return status;
    }
  }
  function getPriorityText(priority) {
    switch (priority) {
      case "high":
        return "높음";
      case "medium":
        return "보통";
      case "low":
        return "낮음";
      default:
        return priority;
    }
  }
  function getStatusBadgeClass(status) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(columns);
    const each_array_1 = ensure_array_like(filteredData);
    $$payload2.out.push(`<div${attr_class(clsx(cn("space-y-4", className)))}><div class="flex items-center justify-between gap-4">`);
    if (searchable) {
      $$payload2.out.push("<!--[-->");
      $$payload2.out.push(`<div class="relative flex-1 max-w-sm">`);
      Search($$payload2, {
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
      });
      $$payload2.out.push(`<!----> `);
      Input($$payload2, {
        placeholder: "검색...",
        class: "pl-10",
        get value() {
          return searchTerm;
        },
        set value($$value) {
          searchTerm = $$value;
          $$settled = false;
        }
      });
      $$payload2.out.push(`<!----></div>`);
    } else {
      $$payload2.out.push("<!--[!-->");
    }
    $$payload2.out.push(`<!--]--> `);
    Button($$payload2, {
      onclick: openAddTask,
      size: "sm",
      class: "gap-2",
      children: ($$payload3) => {
        Plus($$payload3, { class: "h-4 w-4" });
        $$payload3.out.push(`<!----> 작업 추가`);
      },
      $$slots: { default: true }
    });
    $$payload2.out.push(`<!----></div> <div class="border rounded-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-muted"><tr><!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let column = each_array[$$index];
      $$payload2.out.push(`<th${attr_class(clsx(cn("px-4 py-3 text-left text-sm font-medium text-muted-foreground", column.sortable && "cursor-pointer hover:bg-muted/80 select-none", column.width && `w-[${column.width}]`)))}><div class="flex items-center gap-2">${escape_html(column.label)} `);
      if (column.sortable) {
        $$payload2.out.push("<!--[-->");
        $$payload2.out.push(`<div class="flex flex-col">`);
        Chevron_up($$payload2, {
          class: cn("h-3 w-3 transition-colors", sortColumn === column.key && sortDirection === "asc" ? "text-foreground" : "text-muted-foreground/50")
        });
        $$payload2.out.push(`<!----> `);
        Chevron_down($$payload2, {
          class: cn("h-3 w-3 -mt-1 transition-colors", sortColumn === column.key && sortDirection === "desc" ? "text-foreground" : "text-muted-foreground/50")
        });
        $$payload2.out.push(`<!----></div>`);
      } else {
        $$payload2.out.push("<!--[!-->");
      }
      $$payload2.out.push(`<!--]--></div></th>`);
    }
    $$payload2.out.push(`<!--]--></tr></thead><tbody><!--[-->`);
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      let task = each_array_1[index];
      const each_array_2 = ensure_array_like(columns);
      $$payload2.out.push(`<tr${attr_class(clsx(cn("border-t hover:bg-muted/50 transition-colors", index % 2 === 0 ? "bg-background" : "bg-muted/20")))}><!--[-->`);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let column = each_array_2[$$index_1];
        $$payload2.out.push(`<td class="px-4 py-3 text-sm">`);
        if (column.key === "status") {
          $$payload2.out.push("<!--[-->");
          $$payload2.out.push(`<span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusBadgeClass(task.status))}`)}>${escape_html(formatValue(task, column.key))}</span>`);
        } else {
          $$payload2.out.push("<!--[!-->");
          if (column.key === "priority") {
            $$payload2.out.push("<!--[-->");
            $$payload2.out.push(`<span${attr_class(clsx(getPriorityColor(task.priority)))}>${escape_html(formatValue(task, column.key))}</span>`);
          } else {
            $$payload2.out.push("<!--[!-->");
            if (column.key === "progress") {
              $$payload2.out.push("<!--[-->");
              $$payload2.out.push(`<div class="flex items-center gap-2"><div class="w-16 bg-secondary rounded-full h-2"><div class="bg-primary h-2 rounded-full transition-all"${attr_style(`width: ${stringify(task.progress)}%`)}></div></div> <span class="text-xs">${escape_html(task.progress)}%</span></div>`);
            } else {
              $$payload2.out.push("<!--[!-->");
              if (column.key === "actions") {
                $$payload2.out.push("<!--[-->");
                $$payload2.out.push(`<div class="flex gap-1"><button class="p-1 hover:bg-accent rounded-sm" title="편집">`);
                Square_pen($$payload2, { class: "h-3 w-3" });
                $$payload2.out.push(`<!----></button> <button class="p-1 hover:bg-destructive hover:text-destructive-foreground rounded-sm" title="삭제">`);
                Trash_2($$payload2, { class: "h-3 w-3" });
                $$payload2.out.push(`<!----></button></div>`);
              } else {
                $$payload2.out.push("<!--[!-->");
                $$payload2.out.push(`${escape_html(formatValue(task, column.key))}`);
              }
              $$payload2.out.push(`<!--]-->`);
            }
            $$payload2.out.push(`<!--]-->`);
          }
          $$payload2.out.push(`<!--]-->`);
        }
        $$payload2.out.push(`<!--]--></td>`);
      }
      $$payload2.out.push(`<!--]--></tr>`);
    }
    $$payload2.out.push(`<!--]--></tbody></table></div> `);
    if (filteredData.length === 0) {
      $$payload2.out.push("<!--[-->");
      $$payload2.out.push(`<div class="text-center py-8 text-muted-foreground"><p>데이터가 없습니다.</p></div>`);
    } else {
      $$payload2.out.push("<!--[!-->");
    }
    $$payload2.out.push(`<!--]--></div> <div class="flex justify-between items-center text-sm text-muted-foreground"><p>총 ${escape_html(filteredData.length)}개의 항목</p> `);
    if (searchTerm) {
      $$payload2.out.push("<!--[-->");
      $$payload2.out.push(`<p>"${escape_html(searchTerm)}" 검색 결과</p>`);
    } else {
      $$payload2.out.push("<!--[!-->");
    }
    $$payload2.out.push(`<!--]--></div> `);
    Task_form_modal($$payload2, {
      open: showTaskForm,
      projectId,
      task: editingTask,
      onClose: closeTaskForm
    });
    $$payload2.out.push(`<!----></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const projectId = store_get($$store_subs ??= {}, "$page", page).params.id;
  const viewType = store_get($$store_subs ??= {}, "$page", page).params.view;
  const projects2 = {
    "1": { name: "웹사이트 리뉴얼", description: "회사 웹사이트를 새로운 디자인으로 리뉴얼" },
    "2": { name: "모바일 앱 개발", description: "iOS/Android 앱 개발 프로젝트" },
    "3": { name: "API 서버 구축", description: "RESTful API 서버 구축 및 배포" }
  };
  const project = projects2[projectId] || { name: "알 수 없는 프로젝트" };
  function getViewInfo(view) {
    switch (view) {
      case "gantt":
        return { title: "간트차트 뷰", icon: Chart_column, color: "text-blue-500" };
      case "calendar":
        return { title: "캘린더 뷰", icon: Calendar, color: "text-green-500" };
      case "table":
        return { title: "테이블 뷰", icon: Table, color: "text-purple-500" };
      default:
        return { title: "알 수 없는 뷰", icon: Table, color: "text-gray-500" };
    }
  }
  const viewInfo = getViewInfo(viewType);
  function goBack() {
    goto();
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(project.name)} - ${escape_html(viewInfo.title)}</title>`;
  });
  $$payload.out.push(`<div class="p-6 space-y-6"><div class="flex items-center gap-4">`);
  Button($$payload, {
    variant: "ghost",
    size: "icon",
    onclick: goBack,
    children: ($$payload2) => {
      Arrow_left($$payload2, { class: "h-4 w-4" });
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----> <div><h1 class="text-3xl font-bold flex items-center gap-3"><!---->`);
  viewInfo.icon?.($$payload, { class: `h-8 w-8 ${stringify(viewInfo.color)}` });
  $$payload.out.push(`<!----> ${escape_html(project.name)}</h1> <p class="text-muted-foreground">${escape_html(viewInfo.title)}</p></div></div> `);
  if (viewType === "gantt") {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="space-y-4">`);
    Card($$payload, {
      class: "p-4",
      children: ($$payload2) => {
        $$payload2.out.push(`<h2 class="text-xl font-semibold mb-4">📊 프로젝트 일정 간트차트</h2> <p class="text-muted-foreground mb-6">작업 일정과 의존성을 시각적으로 확인하세요</p> `);
        Gantt_chart($$payload2, { projectId });
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!----></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
    if (viewType === "calendar") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="space-y-4">`);
      Card($$payload, {
        class: "p-4",
        children: ($$payload2) => {
          $$payload2.out.push(`<h2 class="text-xl font-semibold mb-4">📅 프로젝트 캘린더</h2> <p class="text-muted-foreground mb-6">프로젝트 일정과 마일스톤을 달력으로 확인하세요</p>`);
        },
        $$slots: { default: true }
      });
      $$payload.out.push(`<!----> `);
      Event_calendar($$payload, { projectId });
      $$payload.out.push(`<!----></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      if (viewType === "table") {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<div class="space-y-4">`);
        Card($$payload, {
          class: "p-4",
          children: ($$payload2) => {
            $$payload2.out.push(`<h2 class="text-xl font-semibold mb-4">📋 작업 목록 테이블</h2> <p class="text-muted-foreground mb-6">프로젝트의 모든 작업을 상세하게 관리하세요</p> `);
            Data_table($$payload2, { projectId });
            $$payload2.out.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$payload.out.push(`<!----></div>`);
      } else {
        $$payload.out.push("<!--[!-->");
        Card($$payload, {
          class: "p-8",
          children: ($$payload2) => {
            $$payload2.out.push(`<div class="text-center space-y-4"><!---->`);
            viewInfo.icon?.($$payload2, { class: `h-16 w-16 mx-auto ${stringify(viewInfo.color)}` });
            $$payload2.out.push(`<!----> <div><h2 class="text-2xl font-semibold">${escape_html(viewInfo.title)}</h2> <p class="text-muted-foreground mt-2">지원하지 않는 뷰 타입입니다.</p></div></div>`);
          },
          $$slots: { default: true }
        });
      }
      $$payload.out.push(`<!--]-->`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
