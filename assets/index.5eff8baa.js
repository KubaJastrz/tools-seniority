var e=Object.assign;import{m as t,c as a,a as o,r,g as n,u as l,b as s,d as c,e as m,D as i,H as d}from"./vendor.a36c357a.js";var p,u;!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const o=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,n)=>{const l=new URL(e,o);if(self[t].moduleMap[l])return a(self[t].moduleMap[l]);const s=new Blob([`import * as m from '${l}';`,`${t}.moduleMap['${l}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){n(new Error(`Failed to import: ${e}`)),r(c)},onload(){a(self[t].moduleMap[l]),r(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/"),(u=p||(p={}))[u.Uncategorized=0]="Uncategorized",u[u.Beginner=1]="Beginner",u[u.SelfSufficient=2]="SelfSufficient",u[u.Advanced=3]="Advanced",u[u.Mastery=4]="Mastery";const g={tools:[{label:"React",category:0},{label:"Vue",category:0},{label:"Angular",category:0}]},f=o({name:"tools",initialState:g,reducers:{changeCategory(t,a){t.tools=t.tools.map((t=>t.label===a.payload.label?e(e({},t),{category:a.payload.newCategory}):t))},addTool(e,t){e.tools.push({label:t.payload,category:0})}}});function y(){const[e,o]=r.useReducer(f.reducer,g),l=n((e=>e.category),e.tools),s=function(e,o){return t((t=>a(e,t)),o)}(o,f.actions);return{state:e,lists:{uncategorized:l[0]||[],beginner:l[1]||[],selfSufficient:l[2]||[],advanced:l[3]||[],mastery:l[4]||[]},actions:s}}function h({tool:e}){const[,t]=c((()=>({item:{id:e.label,type:"tool",category:e.category}})));return r.createElement("li",{ref:t,className:s("inline-block px-1 text-sm rounded-sm border select-none m-0.75 cursor-move","border-green-200 text-green-700 bg-green-100")},e.label)}function b({tools:e,category:t,onDrop:a,placeholder:o=""}){const[{isOver:n,canDrop:c},m]=l((()=>({accept:"tool",drop(e){a(e,t)},canDrop:e=>e.category!==t,collect:e=>({isOver:e.isOver(),canDrop:e.canDrop()})})));return r.createElement("div",{ref:m,className:s("border-2 border-dashed p-2",c&&!n&&"border-red-400 bg-yellow-50",c&&n&&"border-blue-500 bg-blue-50")},e.length>0?r.createElement("ul",{className:"flex flex-wrap -m-0.75"},e.map((e=>r.createElement(h,{key:e.label,tool:e})))):r.createElement("div",{className:"text-sm text-gray-500 select-none leading-22px"},c&&n?"drop here":o))}function E(){const{state:e,lists:t,actions:a}=y(),o=(e,t)=>{a.changeCategory({label:e.id,newCategory:t})};return r.createElement("div",{className:"p-8 space-y-6 max-w-5xl mx-auto"},r.createElement("p",null,"Drag tools from the list on the left and drop them to one of the categories on the right."),r.createElement("div",{className:"grid grid-cols-2 gap-8"},r.createElement("section",{className:"space-y-3"},r.createElement("header",null,r.createElement("h2",{className:"section-title"},"Tools")),r.createElement(b,{placeholder:"you did it 🎉",category:p.Uncategorized,onDrop:o,tools:t.uncategorized}),r.createElement(w,{onSubmit:t=>{t.preventDefault();const o=t.currentTarget.elements["new-tool"],r=o.value;e.tools.find((e=>e.label===r))?window.alert(`Tool "${r}" already exists!`):(a.addTool(r),o.value="")}})),r.createElement("div",{className:"space-y-5"},r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Beginner"),r.createElement("p",{className:"text-sm"},"Heard or used once or twice. Requires a mentor to use effectively."),r.createElement(b,{placeholder:"nothing there yet",category:p.Beginner,onDrop:o,tools:t.beginner})),r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Self-sufficient"),r.createElement("p",{className:"text-sm"},"Used multiple times. Had some paint points in the past and starts to understand best practices."),r.createElement(b,{placeholder:"pick something from the list",category:p.SelfSufficient,onDrop:o,tools:t.selfSufficient})),r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Advanced"),r.createElement("p",{className:"text-sm"},"Knows best practices for the tool and can extend it for their use case. Can mentor less experienced team members."),r.createElement(b,{placeholder:"c’mon, you can do it!",category:p.Advanced,onDrop:o,tools:t.advanced})),r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Mastery"),r.createElement("p",{className:"text-sm"},"Can list risks associated with the tool. Knows when to and when not to use it over the alternatives. Can easily pin point use cases to the documentation and explain the complexity to beginners."),r.createElement(b,{placeholder:"wow, such empty",category:p.Mastery,onDrop:o,tools:t.mastery})))))}function w({onSubmit:e}){return r.createElement("form",{onSubmit:e},r.createElement("label",{className:"flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2"},r.createElement("span",{className:"flex-shrink-0"},"Add new tool"),r.createElement("input",{type:"text",name:"new-tool",placeholder:"eg. bash",className:"border border-gray px-2 py-1 rounded shadow-sm min-w-0",autoComplete:"off"}),r.createElement("button",{type:"submit",className:"h-6 w-6 flex-shrink-0"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})))))}m.render(r.createElement(r.StrictMode,null,r.createElement(i,{backend:d},r.createElement(E,null))),document.getElementById("root"));
