import"../chunks/CWj6FrbW.js";import"../chunks/i15LsdjO.js";import{h as T,d as L,a as u,f as h,s as r,c as t,r as s,g as a,Q as F}from"../chunks/b1ivaeLW.js";import{s as m}from"../chunks/DGNC1kIF.js";import{I as j,s as k,e as N,i as z}from"../chunks/BCaAQPrP.js";import{c as q}from"../chunks/afF-5YPM.js";import{s as B}from"../chunks/CLN_0dO1.js";import{C as A}from"../chunks/mfEp_dFr.js";import{F as D}from"../chunks/5Pfzk2iL.js";import{U as E}from"../chunks/B6r9eUcp.js";import{C as G}from"../chunks/ChyhUEDE.js";import{l as H,s as J}from"../chunks/COoU3Dwb.js";function K($,f){const b=H(f,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];j($,J({name:"trending-up"},()=>b,{get iconNode(){return n},children:(v,I)=>{var l=T(),o=L(l);k(o,f,"default",{}),u(v,l)},$$slots:{default:!0}}))}var O=h('<div class="flex items-center justify-between"><div><p class="text-sm text-muted-foreground"> </p> <p class="text-2xl font-bold"> </p></div> <!></div>'),R=h('<div class="flex items-center justify-between p-4 border rounded-lg"><div class="flex-1"><h3 class="font-medium"> </h3> <p class="text-sm text-muted-foreground"> </p></div> <div class="flex items-center gap-4"><div class="w-32 bg-secondary rounded-full h-2"><div class="bg-primary h-2 rounded-full transition-all"></div></div> <span class="text-sm font-medium w-12"> </span></div></div>'),S=h('<h2 class="text-xl font-semibold mb-4">최근 프로젝트</h2> <div class="space-y-4"></div>',1),V=h('<div class="p-6 space-y-6"><div><h1 class="text-3xl font-bold">대시보드</h1> <p class="text-muted-foreground">프로젝트 현황을 한눈에 확인하세요</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div> <!></div>');function ds($){const f=[{title:"진행 중인 프로젝트",value:"12",icon:D,color:"text-blue-600"},{title:"팀 멤버",value:"8",icon:E,color:"text-green-600"},{title:"이번 주 일정",value:"24",icon:G,color:"text-orange-600"},{title:"완료율",value:"84%",icon:K,color:"text-purple-600"}],b=[{name:"웹사이트 리뉴얼",status:"진행중",progress:75},{name:"모바일 앱 개발",status:"진행중",progress:45},{name:"API 서버 구축",status:"완료",progress:100},{name:"UI 디자인 시스템",status:"대기",progress:20}];var n=V(),v=r(t(n),2);N(v,5,()=>f,z,(l,o)=>{A(l,{class:"p-6",children:(g,y)=>{var c=O(),e=t(c),i=t(e),p=t(i,!0);s(i);var d=r(i,2),w=t(d,!0);s(d),s(e);var _=r(e,2);q(_,()=>a(o).icon,(P,x)=>{x(P,{get class(){return`h-8 w-8 ${a(o).color??""}`}})}),s(c),F(()=>{m(p,a(o).title),m(w,a(o).value)}),u(g,c)},$$slots:{default:!0}})}),s(v);var I=r(v,2);A(I,{class:"p-6",children:(l,o)=>{var g=S(),y=r(L(g),2);N(y,5,()=>b,z,(c,e)=>{var i=R(),p=t(i),d=t(p),w=t(d,!0);s(d);var _=r(d,2),P=t(_,!0);s(_),s(p);var x=r(p,2),C=t(x),M=t(C);s(C);var U=r(C,2),Q=t(U);s(U),s(x),s(i),F(()=>{m(w,a(e).name),m(P,a(e).status),B(M,`width: ${a(e).progress??""}%`),m(Q,`${a(e).progress??""}%`)}),u(c,i)}),s(y),u(l,g)},$$slots:{default:!0}}),s(n),u($,n)}export{ds as component};
