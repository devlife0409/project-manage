import { A as push, K as ensure_array_like, F as escape_html, U as stringify, D as pop, M as attr_class, V as attr_style } from "../../../../chunks/index2.js";
import { C as Card } from "../../../../chunks/card.js";
import { B as Button } from "../../../../chunks/button.js";
import { g as goto } from "../../../../chunks/client.js";
import { D as Dialog, T as Table, P as Plus } from "../../../../chunks/dialog.js";
import { C as Chart_column } from "../../../../chunks/x.js";
import { C as Calendar } from "../../../../chunks/calendar.js";
import { U as Users } from "../../../../chunks/users.js";
function Project_view_modal($$payload, $$props) {
  push();
  let { open, projectName, onClose } = $$props;
  function handleViewSelect(viewType) {
    goto();
    onClose();
  }
  const viewOptions = [
    {
      type: "gantt",
      title: "간트차트로 보기",
      description: "프로젝트 일정을 타임라인으로 확인",
      icon: Chart_column,
      color: "text-blue-500"
    },
    {
      type: "calendar",
      title: "캘린더로 보기",
      description: "달력 형태로 일정 확인",
      icon: Calendar,
      color: "text-green-500"
    },
    {
      type: "table",
      title: "테이블로 보기",
      description: "상세 정보를 표 형태로 확인",
      icon: Table,
      color: "text-purple-500"
    }
  ];
  Dialog($$payload, {
    open,
    onClose,
    children: ($$payload2) => {
      const each_array = ensure_array_like(viewOptions);
      $$payload2.out.push(`<div class="space-y-4"><div class="space-y-2"><h2 class="text-lg font-semibold">${escape_html(projectName)}</h2> <p class="text-sm text-muted-foreground">보기 방식을 선택하세요</p></div> <div class="grid gap-3"><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let option = each_array[$$index];
        Button($$payload2, {
          variant: "outline",
          class: "h-auto p-4 justify-start",
          onclick: () => handleViewSelect(option.type),
          children: ($$payload3) => {
            $$payload3.out.push(`<div class="flex items-center gap-3 w-full"><!---->`);
            option.icon?.($$payload3, { class: `h-5 w-5 ${stringify(option.color)}` });
            $$payload3.out.push(`<!----> <div class="text-left"><div class="font-medium">${escape_html(option.title)}</div> <div class="text-sm text-muted-foreground">${escape_html(option.description)}</div></div></div>`);
          },
          $$slots: { default: true }
        });
      }
      $$payload2.out.push(`<!--]--></div></div>`);
    },
    $$slots: { default: true }
  });
  pop();
}
function _page($$payload) {
  const projects = [
    {
      id: 1,
      name: "웹사이트 리뉴얼",
      description: "회사 웹사이트를 새로운 디자인으로 리뉴얼",
      status: "진행중",
      dueDate: "2024-03-15",
      members: 5,
      progress: 75
    },
    {
      id: 2,
      name: "모바일 앱 개발",
      description: "iOS/Android 앱 개발 프로젝트",
      status: "진행중",
      dueDate: "2024-04-20",
      members: 3,
      progress: 45
    },
    {
      id: 3,
      name: "API 서버 구축",
      description: "RESTful API 서버 구축 및 배포",
      status: "완료",
      dueDate: "2024-02-28",
      members: 4,
      progress: 100
    }
  ];
  let selectedProject = null;
  let showModal = false;
  function handleProjectClick(project) {
    selectedProject = { id: project.id, name: project.name };
    showModal = true;
  }
  function closeModal() {
    showModal = false;
    selectedProject = null;
  }
  function getStatusColor(status) {
    switch (status) {
      case "완료":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "진행중":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "대기":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  }
  const each_array = ensure_array_like(projects);
  $$payload.out.push(`<div class="p-6 space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold">프로젝트</h1> <p class="text-muted-foreground">모든 프로젝트를 관리하세요</p></div> `);
  Button($$payload, {
    class: "gap-2",
    children: ($$payload2) => {
      Plus($$payload2, { class: "h-4 w-4" });
      $$payload2.out.push(`<!----> 새 프로젝트`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let project = each_array[$$index];
    Card($$payload, {
      class: "p-6 hover:shadow-md transition-shadow cursor-pointer",
      onclick: () => handleProjectClick(project),
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="space-y-4"><div class="flex items-start justify-between"><h3 class="text-lg font-semibold">${escape_html(project.name)}</h3> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(project.status))}`)}>${escape_html(project.status)}</span></div> <p class="text-sm text-muted-foreground">${escape_html(project.description)}</p> <div class="space-y-2"><div class="flex items-center gap-2 text-sm">`);
        Calendar($$payload2, { class: "h-4 w-4" });
        $$payload2.out.push(`<!----> <span>마감: ${escape_html(project.dueDate)}</span></div> <div class="flex items-center gap-2 text-sm">`);
        Users($$payload2, { class: "h-4 w-4" });
        $$payload2.out.push(`<!----> <span>${escape_html(project.members)}명</span></div></div> <div class="space-y-2"><div class="flex justify-between text-sm"><span>진행률</span> <span>${escape_html(project.progress)}%</span></div> <div class="w-full bg-secondary rounded-full h-2"><div class="bg-primary h-2 rounded-full transition-all"${attr_style(`width: ${stringify(project.progress)}%`)}></div></div></div></div>`);
      },
      $$slots: { default: true }
    });
  }
  $$payload.out.push(`<!--]--></div> `);
  if (selectedProject) {
    $$payload.out.push("<!--[-->");
    Project_view_modal($$payload, {
      open: showModal,
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      onClose: closeModal
    });
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div>`);
}
export {
  _page as default
};
