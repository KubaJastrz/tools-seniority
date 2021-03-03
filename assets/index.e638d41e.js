var e=Object.assign;import{m as t,c as a,a as o,r,g as n,u as s,b as l,d as c,e as m,D as i,H as d}from"./vendor.a36c357a.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const o=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,n)=>{const s=new URL(e,o);if(self[t].moduleMap[s])return a(self[t].moduleMap[s]);const l=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){n(new Error(`Failed to import: ${e}`)),r(c)},onload(){a(self[t].moduleMap[s]),r(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/tools-seniority/assets/");const p={getItem:function(e,t){try{const a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(a){return console.error(a),t}},setItem:function(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch(a){console.error(a)}}};var u,g;(g=u||(u={}))[g.Uncategorized=0]="Uncategorized",g[g.Beginner=1]="Beginner",g[g.SelfSufficient=2]="SelfSufficient",g[g.Advanced=3]="Advanced",g[g.Mastery=4]="Mastery";const f={tools:p.getItem("tools",[])},h=o({name:"tools",initialState:f,reducers:{changeCategory(t,a){t.tools=t.tools.map((t=>t.label===a.payload.label?e(e({},t),{category:a.payload.newCategory}):t)),p.setItem("tools",t.tools)},addTool(e,t){e.tools.push({label:t.payload,category:0}),p.setItem("tools",e.tools)}}});function y(){const[e,o]=r.useReducer(h.reducer,f),s=n((e=>e.category),e.tools),l=function(e,o){return t((t=>a(e,t)),o)}(o,h.actions);return{state:e,lists:{uncategorized:s[0]||[],beginner:s[1]||[],selfSufficient:s[2]||[],advanced:s[3]||[],mastery:s[4]||[]},actions:l}}function E({tool:e}){const[,t]=c((()=>({item:{id:e.label,type:"tool",category:e.category}})));return r.createElement("li",{ref:t,className:l("inline-block px-1 text-sm rounded-sm border select-none m-0.75 cursor-move","border-green-200 text-green-700 bg-green-100")},e.label)}function b({tools:e,category:t,onDrop:a,placeholder:o=""}){const[{isOver:n,canDrop:c},m]=s((()=>({accept:"tool",drop(e){a(e,t)},canDrop:e=>e.category!==t,collect:e=>({isOver:e.isOver(),canDrop:e.canDrop()})})));return r.createElement("div",{ref:m,className:l("border-2 border-dashed p-2",c&&!n&&"border-red-400 bg-yellow-50",c&&n&&"border-blue-500 bg-blue-50")},e.length>0?r.createElement("ul",{className:"flex flex-wrap -m-0.75"},e.map((e=>r.createElement(E,{key:e.label,tool:e})))):r.createElement("div",{className:"text-sm text-gray-500 select-none leading-22px"},c&&n?"drop here":o))}function w(){const{state:e,lists:t,actions:a}=y(),o=(e,t)=>{a.changeCategory({label:e.id,newCategory:t})};return r.createElement("div",{className:"p-8 space-y-6 max-w-5xl mx-auto"},r.createElement("p",null,"Drag tools from the list on the left and drop them to one of the categories on the right."),r.createElement("div",{className:"grid grid-cols-2 gap-8"},r.createElement("section",{className:"space-y-3"},r.createElement("header",null,r.createElement("h2",{className:"section-title"},"Tools")),r.createElement(b,{placeholder:"you did it 🎉",category:u.Uncategorized,onDrop:o,tools:t.uncategorized}),r.createElement(x,{onSubmit:t=>{t.preventDefault();const o=t.currentTarget.elements["new-tool"],r=o.value;0!==r.trim().length&&(e.tools.find((e=>e.label===r))?window.alert(`Tool "${r}" already exists!`):(a.addTool(r),o.value=""))}})),r.createElement("div",{className:"space-y-5"},r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Beginner"),r.createElement("p",{className:"text-sm"},"Heard or used once or twice. Requires a mentor to use effectively."),r.createElement(b,{placeholder:"nothing there yet",category:u.Beginner,onDrop:o,tools:t.beginner})),r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Self-sufficient"),r.createElement("p",{className:"text-sm"},"Used multiple times. Had some paint points in the past and starts to understand best practices."),r.createElement(b,{placeholder:"pick something from the list",category:u.SelfSufficient,onDrop:o,tools:t.selfSufficient})),r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Advanced"),r.createElement("p",{className:"text-sm"},"Knows best practices for the tool and can extend it for their use case. Can mentor less experienced team members."),r.createElement(b,{placeholder:"c’mon, you can do it!",category:u.Advanced,onDrop:o,tools:t.advanced})),r.createElement("header",{className:"space-y-1"},r.createElement("h2",{className:"section-title"},"Mastery"),r.createElement("p",{className:"text-sm"},"Can list risks associated with the tool. Knows when to and when not to use it over the alternatives. Can easily pin point use cases to the documentation and explain the complexity to beginners."),r.createElement(b,{placeholder:"wow, such empty",category:u.Mastery,onDrop:o,tools:t.mastery})))))}function x({onSubmit:e}){return r.createElement("form",{onSubmit:e},r.createElement("label",{className:"flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2"},r.createElement("span",{className:"flex-shrink-0"},"Add new tool"),r.createElement("input",{type:"text",name:"new-tool",placeholder:"eg. bash",className:"border border-gray px-2 py-1 rounded shadow-sm min-w-0",autoComplete:"off"}),r.createElement("button",{type:"submit",className:"h-6 w-6 flex-shrink-0"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})))))}m.render(r.createElement(r.StrictMode,null,r.createElement(i,{backend:d},r.createElement(w,null))),document.getElementById("root"));