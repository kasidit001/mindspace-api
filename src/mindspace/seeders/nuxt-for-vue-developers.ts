import type { SeedCourse } from "./types";

const course: SeedCourse = {
    slug: "nuxt-for-vue-developers",
    title: "Nuxt",
    descriptionEn:
      "The Vue meta-framework this platform's own frontend is built with: file-based routing, universal rendering, the Nitro server engine, auto-imports, and the module ecosystem that make it the standard way to build production Vue applications.",
        descriptionTh:
      "เมตาเฟรมเวิร์กของ Vue ที่ฟรอนต์เอนด์ของแพลตฟอร์มนี้เองถูกสร้างขึ้นด้วย: file-based routing, universal rendering, เอนจิน Nitro, auto-imports และระบบนิเวศของ module ที่ทำให้มันเป็นมาตรฐานสำหรับการสร้างแอปพลิเคชัน Vue ระดับโปรดักชัน",
lessons: [
      {
        slug: "what-is-nuxt",
        titleEn: "What Is Nuxt?",
        titleTh: "Nuxt คืออะไร?",
        order: 1,
        contentEn: `Nuxt is a meta-framework built on top of Vue — it takes the pieces every real Vue application eventually needs (routing, server-side rendering, a build pipeline, a place to put backend code) and provides them as conventions instead of decisions you make from scratch. This platform's own frontend, mindspace-web, is a Nuxt application.

Plain Vue gives you components and reactivity; it doesn't ship a router, a way to render on the server, or an opinion about project structure. Nuxt adds all three, plus a few more:

- **Universal rendering (SSR) by default** — pages render to HTML on the server first, then Vue "hydrates" that HTML in the browser to make it interactive. Users see content immediately instead of a blank page while JavaScript downloads, and search engine crawlers get real HTML to index instead of an empty \`<div id="app">\`.
- **File-based routing** — the files in \`app/pages/\` become your routes automatically; there's no router config file to maintain by hand.
- **Nitro**, Nuxt's own server engine — it powers both the SSR rendering and an optional backend (\`server/api/\`), and produces output that can run on a Node server, most serverless platforms, or the edge, from the same codebase.
- **Auto-imports** — components, composables, and utility functions are available in any file without an explicit \`import\` line, based purely on where they live in the project.
- **A module ecosystem** — features like Tailwind CSS integration, state management (Pinia), or i18n are added as one-line entries in \`nuxt.config.ts\` rather than hand-wired build configuration.

None of this is magic Nuxt invents from nothing — under the hood it's still Vue, Vite, and Vue Router, configured and wired together with sensible defaults. The rest of this course covers those pieces in the order you'd actually meet them building something real.

## Conclusion

Nuxt is a meta-framework that layers file-based routing, SSR by default, the Nitro server engine, auto-imports, and a module system on top of plain Vue, Vite, and Vue Router — trading manual setup for conventions. The rest of the course walks through each of those pieces in turn, starting from project structure.`,
        contentTh: `Nuxt เป็นเมตาเฟรมเวิร์ก (meta-framework) ที่สร้างขึ้นบนพื้นฐานของ Vue — มันนำเอาส่วนประกอบที่แอปพลิเคชัน Vue จริงทุกตัวต้องการในที่สุด (routing, server-side rendering, build pipeline, ที่สำหรับใส่โค้ดฝั่ง backend) มาให้ในรูปแบบของ convention แทนที่จะให้คุณต้องตัดสินใจเองตั้งแต่ศูนย์ ฟรอนต์เอนด์ของแพลตฟอร์มนี้เอง คือ mindspace-web ก็เป็นแอปพลิเคชัน Nuxt

Vue เพียวๆ ให้คุณแค่ component และ reactivity — มันไม่มี router มาให้ ไม่มีวิธี render บนฝั่งเซิร์ฟเวอร์ และไม่มีความเห็นเรื่องโครงสร้างโปรเจกต์ Nuxt เพิ่มทั้งสามอย่างนี้ให้ พร้อมกับอีกสองสามอย่าง:

- **Universal rendering (SSR) เป็นค่าเริ่มต้น** — หน้าเพจจะถูก render เป็น HTML บนเซิร์ฟเวอร์ก่อน จากนั้น Vue จะ "hydrate" HTML นั้นในเบราว์เซอร์เพื่อทำให้มันโต้ตอบได้ ผู้ใช้จะเห็นเนื้อหาทันทีแทนที่จะเจอหน้าว่างเปล่าระหว่างที่ JavaScript กำลังดาวน์โหลด และ crawler ของเสิร์ชเอนจินก็ได้ HTML จริงๆ ไปทำ index แทนที่จะเจอ \`<div id="app">\` ว่างๆ
- **File-based routing** — ไฟล์ใน \`app/pages/\` จะกลายเป็นเส้นทาง (route) ของคุณโดยอัตโนมัติ ไม่ต้องมีไฟล์ config ของ router ให้ดูแลเอง
- **Nitro** เอนจินเซิร์ฟเวอร์ของ Nuxt เอง — มันขับเคลื่อนทั้ง SSR rendering และ backend ที่เป็นออปชัน (\`server/api/\`) และสร้างผลลัพธ์ที่รันได้บน Node server, แพลตฟอร์ม serverless ส่วนใหญ่ หรือ edge จาก codebase เดียวกัน
- **Auto-imports** — component, composable และฟังก์ชัน utility ต่างๆ พร้อมใช้งานในทุกไฟล์โดยไม่ต้องมีบรรทัด \`import\` ชัดเจน เพียงแค่ดูจากตำแหน่งที่มันอยู่ในโปรเจกต์
- **ระบบนิเวศของ module** — ฟีเจอร์อย่างการผสาน Tailwind CSS, state management (Pinia) หรือ i18n ถูกเพิ่มเข้ามาด้วยการเขียนแค่บรรทัดเดียวใน \`nuxt.config.ts\` แทนที่จะต้องต่อ build configuration ด้วยมือ

ทั้งหมดนี้ไม่ใช่เวทมนตร์ที่ Nuxt สร้างขึ้นมาจากความว่างเปล่า — ภายใต้ผิวของมันยังคงเป็น Vue, Vite และ Vue Router ที่ถูกกำหนดค่าและเชื่อมต่อเข้าด้วยกันด้วยค่าเริ่มต้นที่สมเหตุสมผล ส่วนที่เหลือของคอร์สนี้จะครอบคลุมส่วนประกอบเหล่านั้นตามลำดับที่คุณจะเจอมันจริงๆ เมื่อสร้างอะไรสักอย่างขึ้นมาจริงจัง

## สรุป

Nuxt คือเมตาเฟรมเวิร์กที่เพิ่ม file-based routing, SSR เป็นค่าเริ่มต้น, เอนจิน Nitro, auto-imports และระบบ module เข้าไปบน Vue, Vite และ Vue Router ธรรมดา — แลก convention กับการตั้งค่าด้วยมือ ส่วนที่เหลือของคอร์สนี้จะพาไล่ดูแต่ละส่วนประกอบเหล่านั้นทีละอย่าง เริ่มจากโครงสร้างโปรเจกต์`,
      },
      {
        slug: "project-structure",
        titleEn: "Project Structure & app.vue",
        titleTh: "โครงสร้างโปรเจกต์และ app.vue",
        order: 2,
        contentEn: `A fresh Nuxt project has a predictable shape, and Nuxt uses the *location* of a file to decide what it does — there's very little explicit registration.

\`\`\`
my-app/
├── app/
│   ├── pages/         # file-based routes
│   ├── components/    # auto-imported Vue components
│   ├── composables/   # auto-imported composable functions
│   ├── layouts/       # page layout wrappers
│   ├── middleware/    # route guards, run before navigation
│   ├── plugins/       # code that runs once on app init
│   ├── utils/         # auto-imported plain helper functions
│   └── app.vue        # the app's root component
├── server/             # Nitro backend — API routes, server middleware
├── public/             # static files served as-is (favicon, robots.txt)
└── nuxt.config.ts      # the project's central configuration file
\`\`\`

Newer Nuxt projects (Nuxt 4's default layout) nest almost everything application-side under \`app/\` — pages, components, composables, layouts, and so on all live there, while \`server/\` and \`public/\` stay at the project root alongside \`nuxt.config.ts\`. This is a change from Nuxt 3, where those same folders (\`pages/\`, \`components/\`, \`composables/\`...) sat directly at the project root; Nuxt 4 groups them under \`app/\` specifically so the root of the repo isn't a flat mix of frontend code, backend code, and config.

\`app.vue\` is the application's single root component — everything else renders inside it. A minimal one is just:

\`\`\`vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
\`\`\`

\`<NuxtPage />\` is where the currently matched route's page component renders; \`<NuxtLayout>\` wraps it in whichever layout applies (the next lesson covers layouts). Anything else you put in \`app.vue\` — a header, a footer, global CSS — renders on every single page, since every page renders inside this one root component.

## Conclusion

A Nuxt project's structure is convention-driven: Nuxt 4 nests \`pages/\`, \`components/\`, \`composables/\`, \`layouts/\`, \`middleware/\`, \`plugins/\`, and \`utils/\` under \`app/\`, while \`server/\`, \`public/\`, and \`nuxt.config.ts\` stay at the project root — a change from Nuxt 3, where those app-side folders sat at the root directly. \`app.vue\` is the single root component every page renders inside of, typically just \`<NuxtLayout><NuxtPage /></NuxtLayout>\`.`,
        contentTh: `โปรเจกต์ Nuxt ใหม่แกะกล่องจะมีรูปร่างที่คาดเดาได้ และ Nuxt ใช้ *ตำแหน่งที่ตั้ง* ของไฟล์ในการตัดสินใจว่ามันทำหน้าที่อะไร — แทบไม่มีการลงทะเบียนอย่างชัดเจนเลย

\`\`\`
my-app/
├── app/
│   ├── pages/         # file-based routes
│   ├── components/    # auto-imported Vue components
│   ├── composables/   # auto-imported composable functions
│   ├── layouts/       # page layout wrappers
│   ├── middleware/    # route guards, run before navigation
│   ├── plugins/       # code that runs once on app init
│   ├── utils/         # auto-imported plain helper functions
│   └── app.vue        # the app's root component
├── server/             # Nitro backend — API routes, server middleware
├── public/             # static files served as-is (favicon, robots.txt)
└── nuxt.config.ts      # the project's central configuration file
\`\`\`

โปรเจกต์ Nuxt รุ่นใหม่ๆ (โครงสร้างเริ่มต้นของ Nuxt 4) จะเนสต์แทบทุกอย่างที่เกี่ยวกับฝั่งแอปพลิเคชันไว้ใต้ \`app/\` — pages, components, composables, layouts และอื่นๆ ทั้งหมดอยู่ในนั้น ในขณะที่ \`server/\` และ \`public/\` ยังคงอยู่ที่ root ของโปรเจกต์เคียงข้างกับ \`nuxt.config.ts\` นี่คือการเปลี่ยนแปลงจาก Nuxt 3 ที่โฟลเดอร์เดียวกันเหล่านี้ (\`pages/\`, \`components/\`, \`composables/\`...) เคยอยู่ที่ root ของโปรเจกต์โดยตรง Nuxt 4 จัดกลุ่มมันไว้ใต้ \`app/\` โดยเฉพาะ เพื่อไม่ให้ root ของ repo เป็นส่วนผสมแบบแบนราบระหว่างโค้ดฝั่งหน้าบ้าน โค้ดฝั่งหลังบ้าน และ config

\`app.vue\` คือ root component เดียวของแอปพลิเคชัน — ทุกอย่างที่เหลือ render อยู่ข้างในนี้ แบบง่ายที่สุดก็แค่:

\`\`\`vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
\`\`\`

\`<NuxtPage />\` คือจุดที่ page component ของ route ที่จับคู่ได้ในปัจจุบันจะ render; \`<NuxtLayout>\` จะห่อมันไว้ด้วย layout ที่เกี่ยวข้อง (บทเรียนถัดไปจะพูดถึง layout) อะไรก็ตามที่คุณใส่เพิ่มใน \`app.vue\` — header, footer, CSS ระดับ global — จะ render บนทุกหน้า เพราะทุกหน้า render อยู่ภายใน root component เดียวนี้

## สรุป

โครงสร้างโปรเจกต์ Nuxt ขับเคลื่อนด้วย convention: Nuxt 4 เนสต์ \`pages/\`, \`components/\`, \`composables/\`, \`layouts/\`, \`middleware/\`, \`plugins/\` และ \`utils/\` ไว้ใต้ \`app/\` ในขณะที่ \`server/\`, \`public/\` และ \`nuxt.config.ts\` ยังอยู่ที่ root ของโปรเจกต์ — ต่างจาก Nuxt 3 ที่โฟลเดอร์ฝั่งแอปเหล่านั้นเคยอยู่ที่ root โดยตรง \`app.vue\` คือ root component เดียวที่ทุกหน้า render อยู่ภายใน ปกติก็แค่ \`<NuxtLayout><NuxtPage /></NuxtLayout>\``,
      },
      {
        slug: "file-based-routing",
        titleEn: "File-Based Routing",
        titleTh: "File-Based Routing",
        order: 3,
        contentEn: `Every \`.vue\` file under \`app/pages/\` becomes a route automatically, named after its path relative to that folder — there's no router file to hand-maintain. \`app/pages/index.vue\` is \`/\`, \`app/pages/about.vue\` is \`/about\`, and \`app/pages/settings/profile.vue\` is \`/settings/profile\`.

Square brackets mark a dynamic segment. \`app/pages/courses/[id].vue\` matches \`/courses/anything\`, and inside that page \`useRoute().params.id\` gives you the matched value. Double brackets make a segment optional — \`app/pages/[[slug]].vue\` matches both \`/\` and \`/anything\`. A catch-all uses three dots: \`app/pages/[...slug].vue\` matches any depth of path under it (\`/a\`, \`/a/b\`, \`/a/b/c\`), with every captured segment collected into \`params.slug\` as an array.

\`\`\`
app/pages/index.vue              →  /
app/pages/about.vue               →  /about
app/pages/courses/[id].vue        →  /courses/:id
app/pages/courses/[...slug].vue   →  /courses/* (catch-all)
\`\`\`

Nesting works two ways. A plain subfolder (\`app/pages/settings/profile.vue\`) just builds a longer path, same as any file-based router. *Nested layouts within a route* are different: if both \`app/pages/parent.vue\` and \`app/pages/parent/child.vue\` exist, visiting \`/parent/child\` renders \`child.vue\` *inside* \`parent.vue\`, wherever \`parent.vue\` places a \`<NuxtPage />\` of its own — the same parent/child relationship \`<NuxtLayout>\` and \`<NuxtPage>\` have in \`app.vue\`, one level down.

Navigate declaratively with \`<NuxtLink to="/courses">Courses</NuxtLink>\` — it renders a real \`<a>\` tag and uses Vue Router's client-side navigation instead of a full page reload. For navigation triggered from code (after a form submits, inside a composable), use \`await navigateTo('/courses')\` rather than manipulating \`window.location\` — it goes through the same router and respects any navigation middleware in place (the subject of the next lesson).

A page can declare metadata about itself with \`definePageMeta()\` at the top of its \`<script setup>\` block — which layout it uses, whether it requires auth, custom route matching options — read by Nuxt at build time before the page's own code runs.

## Conclusion

Routes come straight from the files in \`app/pages/\`: plain files map to static paths, \`[id].vue\` captures a dynamic segment, \`[[slug]].vue\` makes it optional, and \`[...slug].vue\` catches everything below it as an array. \`<NuxtLink>\` and \`navigateTo()\` handle navigation through the same router, and \`definePageMeta()\` is where a page declares things like its layout or middleware.`,
        contentTh: `ทุกไฟล์ \`.vue\` ภายใต้ \`app/pages/\` จะกลายเป็น route โดยอัตโนมัติ โดยตั้งชื่อตาม path ของมันเทียบกับโฟลเดอร์นั้น — ไม่มีไฟล์ router ให้ดูแลเอง \`app/pages/index.vue\` คือ \`/\`, \`app/pages/about.vue\` คือ \`/about\`, และ \`app/pages/settings/profile.vue\` คือ \`/settings/profile\`

วงเล็บเหลี่ยมใช้ระบุ segment แบบ dynamic \`app/pages/courses/[id].vue\` จะจับคู่กับ \`/courses/อะไรก็ได้\` และภายในหน้านั้น \`useRoute().params.id\` จะให้ค่าที่จับคู่ได้มา วงเล็บเหลี่ยมคู่ทำให้ segment เป็นออปชัน — \`app/pages/[[slug]].vue\` จับคู่ได้ทั้ง \`/\` และ \`/อะไรก็ได้\` ส่วน catch-all ใช้จุดสามจุด: \`app/pages/[...slug].vue\` จับคู่กับ path ทุกความลึกที่อยู่ใต้มัน (\`/a\`, \`/a/b\`, \`/a/b/c\`) โดยทุก segment ที่จับได้จะถูกรวบรวมไว้ใน \`params.slug\` เป็น array

\`\`\`
app/pages/index.vue              →  /
app/pages/about.vue               →  /about
app/pages/courses/[id].vue        →  /courses/:id
app/pages/courses/[...slug].vue   →  /courses/* (catch-all)
\`\`\`

การเนสต์ทำงานได้สองแบบ ซับโฟลเดอร์ธรรมดา (\`app/pages/settings/profile.vue\`) แค่สร้าง path ที่ยาวขึ้น เหมือนกับ file-based router ทั่วไป *Nested layout ภายใน route* เป็นคนละเรื่องกัน — ถ้ามีทั้ง \`app/pages/parent.vue\` และ \`app/pages/parent/child.vue\` การเข้า \`/parent/child\` จะ render \`child.vue\` *ภายใน* \`parent.vue\` ตรงจุดที่ \`parent.vue\` วาง \`<NuxtPage />\` ของตัวเองไว้ — ความสัมพันธ์แบบ parent/child เดียวกันกับที่ \`<NuxtLayout>\` และ \`<NuxtPage>\` มีใน \`app.vue\` เพียงแต่ลึกลงไปอีกหนึ่งชั้น

Navigate แบบ declarative ด้วย \`<NuxtLink to="/courses">Courses</NuxtLink>\` — มันจะ render เป็นแท็ก \`<a>\` จริงๆ และใช้การ navigate แบบฝั่ง client ของ Vue Router แทนการโหลดหน้าใหม่ทั้งหมด สำหรับการ navigate ที่ถูกเรียกจากโค้ด (หลัง form ถูก submit, ภายใน composable) ให้ใช้ \`await navigateTo('/courses')\` แทนการไปจัดการ \`window.location\` เอง — มันจะผ่าน router ตัวเดียวกันและเคารพ navigation middleware ที่มีอยู่ (หัวข้อของบทเรียนถัดไป)

หน้าหนึ่งสามารถประกาศ metadata เกี่ยวกับตัวเองได้ด้วย \`definePageMeta()\` ที่ด้านบนของบล็อก \`<script setup>\` — ว่าใช้ layout ไหน ต้องมีการยืนยันตัวตนหรือไม่ ตัวเลือกการจับคู่ route แบบกำหนดเอง — ซึ่ง Nuxt จะอ่านตอน build time ก่อนที่โค้ดของหน้านั้นจะรันจริง

## สรุป

Route มาจากไฟล์ใน \`app/pages/\` โดยตรง: ไฟล์ธรรมดาแมปไปเป็น path แบบ static, \`[id].vue\` จับ segment แบบ dynamic, \`[[slug]].vue\` ทำให้มันเป็นออปชัน และ \`[...slug].vue\` จับทุกอย่างที่อยู่ใต้มันเป็น array \`<NuxtLink>\` และ \`navigateTo()\` จัดการ navigation ผ่าน router ตัวเดียวกัน และ \`definePageMeta()\` คือจุดที่หน้าเพจประกาศสิ่งต่างๆ เช่น layout หรือ middleware ของตัวเอง`,
        labs: [
          {
            id: "page-path-to-route",
            title: "Convert a File Path to a Route",
            instructions: "Complete `pagePathToRoute` so it mirrors Nuxt's own file-based routing rules — see the examples in the code.",
            starterCode: `function pagePathToRoute(pagePath: string): string {
  // Examples:
  //   "index.vue"                -> "/"
  //   "about.vue"                 -> "/about"
  //   "settings/profile.vue"      -> "/settings/profile"
  //   "courses/[id].vue"          -> "/courses/:id"
  return "";
}`,
            testCode: `check(pagePathToRoute("index.vue"), "/", '"index.vue" is the root route');
check(pagePathToRoute("about.vue"), "/about", "a plain file becomes a path segment");
check(pagePathToRoute("settings/profile.vue"), "/settings/profile", "folders build a longer path");
check(pagePathToRoute("courses/[id].vue"), "/courses/:id", "a [param] segment becomes :param");`,
            hint: "Strip `.vue`, split on `/`, then handle the `index` and `[param]` cases.",
          },
        ],
      },
      {
        slug: "layouts-and-middleware",
        titleEn: "Layouts & Route Middleware",
        titleTh: "Layouts และ Route Middleware",
        order: 4,
        contentEn: `A layout is a wrapper component — a persistent header, sidebar, or footer — shared across multiple pages, so individual pages only need to contain what's actually unique to them. Layouts live in \`app/layouts/\`; \`app/layouts/default.vue\` is used automatically for any page that doesn't specify another one.

\`\`\`vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
</template>
\`\`\`

The \`<slot />\` is where the current page's content renders. A page opts into a different layout — or into \`false\` to render with no layout at all — with \`definePageMeta\`:

\`\`\`vue
<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>
\`\`\`

Route middleware runs *before* a navigation completes, which makes it the right place for guards: checking auth, redirecting, or blocking a route entirely. Named middleware lives in \`app/middleware/\` as a file exporting \`defineNuxtRouteMiddleware\`:

\`\`\`ts
// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()
  if (!user.value) {
    return navigateTo('/login')
  }
})
\`\`\`

A page opts in with \`definePageMeta({ middleware: 'auth' })\`. Naming a middleware file with a \`.global.ts\` suffix (\`app/middleware/analytics.global.ts\`) instead runs it on *every* route automatically, with no per-page opt-in needed — useful for things like analytics or a maintenance-mode check that should apply everywhere, but easy to overuse for things that should really be scoped to a few pages.

## Conclusion

Layouts in \`app/layouts/\` wrap page content in shared chrome via a \`<slot />\`, selected per-page with \`definePageMeta({ layout: '...' })\` and falling back to \`default.vue\`. Route middleware in \`app/middleware/\` runs before a navigation completes, making it the right place for guards like auth checks — either opted into per-page or run on every route with a \`.global.ts\` filename.`,
        contentTh: `Layout คือ wrapper component — header, sidebar หรือ footer ที่คงอยู่ถาวร — ใช้ร่วมกันในหลายหน้า เพื่อให้แต่ละหน้าต้องมีแค่สิ่งที่เป็นของตัวเองจริงๆ เท่านั้น Layout อยู่ใน \`app/layouts/\`; \`app/layouts/default.vue\` จะถูกใช้โดยอัตโนมัติสำหรับหน้าใดก็ตามที่ไม่ได้ระบุ layout อื่นไว้

\`\`\`vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
</template>
\`\`\`

\`<slot />\` คือจุดที่เนื้อหาของหน้าปัจจุบันจะ render หน้าหนึ่งสามารถเลือกใช้ layout อื่น — หรือใช้ \`false\` เพื่อ render โดยไม่มี layout เลย — ด้วย \`definePageMeta\`:

\`\`\`vue
<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>
\`\`\`

Route middleware จะรัน *ก่อน* ที่การ navigate จะเสร็จสมบูรณ์ ทำให้มันเป็นที่ที่เหมาะสำหรับ guard: ตรวจสอบการยืนยันตัวตน, redirect หรือบล็อก route ทั้งหมด Named middleware อยู่ใน \`app/middleware/\` เป็นไฟล์ที่ export \`defineNuxtRouteMiddleware\`:

\`\`\`ts
// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()
  if (!user.value) {
    return navigateTo('/login')
  }
})
\`\`\`

หน้าหนึ่งเลือกใช้มันด้วย \`definePageMeta({ middleware: 'auth' })\` การตั้งชื่อไฟล์ middleware ด้วยส่วนท้าย \`.global.ts\` (\`app/middleware/analytics.global.ts\`) จะทำให้มันรันบน *ทุก* route โดยอัตโนมัติ โดยไม่ต้องเลือกใช้ทีละหน้า — มีประโยชน์สำหรับอะไรอย่าง analytics หรือการตรวจสอบโหมดปิดปรับปรุงที่ควรใช้กับทุกหน้า แต่ก็ใช้เกินความจำเป็นได้ง่ายกับสิ่งที่ควรจำกัดขอบเขตไว้แค่บางหน้าเท่านั้น

## สรุป

Layout ใน \`app/layouts/\` ห่อเนื้อหาของหน้าเพจด้วย chrome ที่ใช้ร่วมกันผ่าน \`<slot />\` เลือกได้ต่อหน้าด้วย \`definePageMeta({ layout: '...' })\` และใช้ \`default.vue\` เป็นค่า fallback Route middleware ใน \`app/middleware/\` รันก่อนที่การ navigate จะเสร็จสมบูรณ์ ทำให้มันเป็นที่ที่เหมาะสำหรับ guard อย่างการตรวจสอบ auth — เลือกใช้เป็นรายหน้าได้ หรือรันบนทุก route ด้วยการตั้งชื่อไฟล์แบบ \`.global.ts\``,
      },
      {
        slug: "data-fetching",
        titleEn: "Data Fetching: useFetch & useAsyncData",
        titleTh: "Data Fetching: useFetch และ useAsyncData",
        order: 5,
        contentEn: `Fetching data naively in a component's setup code causes a real problem under SSR: the request runs once on the server to render the initial HTML, then runs *again* in the browser during hydration, because the client has no idea the server already did the work. That's a wasted request at best, and a source of hydration mismatches (server HTML built from one response, client state built from a second, slightly different one) at worst.

\`useFetch\` and \`useAsyncData\` exist specifically to solve this. When the server fetches data to render a page, it serializes the result into the page's payload; the client reads that payload on hydration instead of re-fetching. The same composable call produces exactly one network request per navigation, not two.

\`\`\`vue
<script setup lang="ts">
// useFetch: a thin, URL-based wrapper — good for "just call this endpoint"
const { data: course, status, error } = await useFetch(\`/api/courses/\${id}\`)

// useAsyncData: same SSR/payload behavior, but you supply the async logic
// yourself — for anything beyond a single URL (SDK calls, multiple requests,
// custom transforms before the result is cached).
const { data } = await useAsyncData('dashboard', () =>
  Promise.all([$fetch('/api/courses'), $fetch('/api/progress')])
)
</script>
\`\`\`

Both return the same shape: \`data\` (a ref holding the result), \`status\` (\`'idle' | 'pending' | 'success' | 'error'\`), \`error\`, and a \`refresh()\`/\`execute()\` function to re-run the fetch on demand. Useful options on either one: \`key\` to control payload/cache identity explicitly, \`server: false\` to skip the server-side fetch entirely (client-only data), \`lazy: true\` (or the \`useLazyFetch\`/\`useLazyAsyncData\` shorthand) to let navigation complete without waiting on the fetch, and \`watch: [someRef]\` to automatically re-run when a reactive value changes.

Reach for plain \`$fetch\` instead — the underlying HTTP client both composables use — when there's no SSR concern to begin with: a button click, a form submission, anything that only ever happens after the page has already loaded in the browser.

## Conclusion

\`useFetch\` and \`useAsyncData\` solve SSR's double-fetch problem by serializing the server's result into the payload the client reads on hydration, both returning the same \`data\`/\`status\`/\`error\`/\`refresh\` shape with options like \`key\`, \`server\`, \`lazy\`, and \`watch\` to control that behavior. Plain \`$fetch\` is the right tool instead whenever a request is triggered by a client-only event, like a button click, rather than a page load.`,
        contentTh: `การ fetch ข้อมูลแบบตรงไปตรงมาใน setup code ของ component ก่อให้เกิดปัญหาจริงภายใต้ SSR: request จะรันครั้งหนึ่งบนเซิร์ฟเวอร์เพื่อ render HTML เริ่มต้น แล้วรัน *อีกครั้ง* ในเบราว์เซอร์ระหว่าง hydration เพราะฝั่ง client ไม่รู้เลยว่าเซิร์ฟเวอร์ทำงานนี้ไปแล้ว อย่างดีที่สุดก็เสีย request ไปฟรีๆ อย่างแย่ที่สุดก็เป็นต้นตอของ hydration mismatch (HTML จากเซิร์ฟเวอร์สร้างจาก response หนึ่ง แต่ state ฝั่ง client สร้างจาก response ที่สอง ซึ่งต่างกันเล็กน้อย)

\`useFetch\` และ \`useAsyncData\` มีไว้เพื่อแก้ปัญหานี้โดยเฉพาะ เมื่อเซิร์ฟเวอร์ fetch ข้อมูลเพื่อ render หน้าเพจ มันจะ serialize ผลลัพธ์ลงใน payload ของหน้านั้น ฝั่ง client จะอ่าน payload นี้ตอน hydration แทนที่จะ fetch ซ้ำ การเรียก composable ตัวเดียวกันจะสร้าง network request แค่หนึ่งครั้งต่อการ navigate ไม่ใช่สองครั้ง

\`\`\`vue
<script setup lang="ts">
// useFetch: a thin, URL-based wrapper — good for "just call this endpoint"
const { data: course, status, error } = await useFetch(\`/api/courses/\${id}\`)

// useAsyncData: same SSR/payload behavior, but you supply the async logic
// yourself — for anything beyond a single URL (SDK calls, multiple requests,
// custom transforms before the result is cached).
const { data } = await useAsyncData('dashboard', () =>
  Promise.all([$fetch('/api/courses'), $fetch('/api/progress')])
)
</script>
\`\`\`

ทั้งสองตัวคืนค่ารูปแบบเดียวกัน: \`data\` (ref ที่เก็บผลลัพธ์), \`status\` (\`'idle' | 'pending' | 'success' | 'error'\`), \`error\` และฟังก์ชัน \`refresh()\`/\`execute()\` สำหรับสั่ง fetch ใหม่ตามต้องการ ออปชันที่มีประโยชน์ของทั้งสองตัว: \`key\` เพื่อควบคุม identity ของ payload/cache อย่างชัดเจน, \`server: false\` เพื่อข้ามการ fetch ฝั่งเซิร์ฟเวอร์ไปเลย (ข้อมูลแบบ client-only), \`lazy: true\` (หรือใช้ตัวย่อ \`useLazyFetch\`/\`useLazyAsyncData\`) เพื่อให้การ navigate เสร็จสิ้นได้โดยไม่ต้องรอ fetch และ \`watch: [someRef]\` เพื่อสั่ง fetch ใหม่โดยอัตโนมัติเมื่อค่า reactive เปลี่ยนแปลง

ให้ใช้ \`$fetch\` ธรรมดาแทน — HTTP client ที่ composable ทั้งสองตัวใช้อยู่เบื้องหลัง — เมื่อไม่มีประเด็นเรื่อง SSR ให้ต้องกังวลตั้งแต่แรก: การคลิกปุ่ม, การ submit form, อะไรก็ตามที่เกิดขึ้นหลังจากหน้าเพจโหลดเสร็จในเบราว์เซอร์แล้วเท่านั้น

## สรุป

\`useFetch\` และ \`useAsyncData\` แก้ปัญหา double-fetch ของ SSR ด้วยการ serialize ผลลัพธ์จากเซิร์ฟเวอร์ลงใน payload ที่ client อ่านตอน hydration โดยทั้งคู่คืนค่ารูปแบบ \`data\`/\`status\`/\`error\`/\`refresh\` เดียวกัน พร้อมออปชันอย่าง \`key\`, \`server\`, \`lazy\` และ \`watch\` ไว้ควบคุมพฤติกรรมนั้น ส่วน \`$fetch\` ธรรมดาคือเครื่องมือที่ถูกต้องแทน เมื่อ request ถูกสั่งจาก event ฝั่ง client ล้วนๆ อย่างการคลิกปุ่ม ไม่ใช่ตอนโหลดหน้าเพจ`,
      },
      {
        slug: "auto-imports-and-composables",
        titleEn: "Auto-Imports & Composables",
        titleTh: "Auto-Imports และ Composables",
        order: 6,
        contentEn: `Nuxt auto-imports based on where a file lives, not on any registration step. A component in \`app/components/CourseCard.vue\` can be used in any page or component as \`<CourseCard />\` with no \`import\` statement; a function exported from \`app/composables/useAuth.ts\` is callable as \`useAuth()\` anywhere, again with no import. This is why Nuxt code looks like it's using globals — they're not globals, they're just resolved automatically from the file tree at build time, and your editor's TypeScript tooling still knows exactly where each one is defined.

A composable is simply a function that uses Vue's Composition API (\`ref\`, \`computed\`, lifecycle hooks) to package up reusable stateful logic — the Vue equivalent of a custom hook. Nuxt auto-imports anything exported from \`app/composables/\`:

\`\`\`ts
// app/composables/useCounter.ts
export function useCounter() {
  const count = ref(0)
  function increment() { count.value++ }
  return { count, increment }
}
\`\`\`

One Nuxt-specific composable is worth calling out on its own: \`useState\`. On the server, a plain module-level \`ref\` is a trap — Nitro can (and typically does) handle multiple requests concurrently in the same process, so state stored outside a request's own scope leaks between unrelated users' requests. \`useState(key, initFn)\` is SSR-safe shared state scoped correctly per-request on the server and persisted correctly across the payload to the client, which is why it — not a bare top-level \`ref\` — is Nuxt's recommended way to share reactive state across components without a state-management library.

\`\`\`ts
// Shared, SSR-safe — every component calling useState('cart') gets the same ref
const cart = useState<string[]>('cart', () => [])
\`\`\`

For state that needs more structure than a single ref — actions, getters, multiple related pieces of state — Nuxt projects commonly reach for Pinia (added via the \`@pinia/nuxt\` module) instead of hand-rolling it with \`useState\`, but the underlying SSR-safety concern \`useState\` addresses is the same one Pinia's Nuxt integration handles for you.

## Conclusion

Nuxt auto-imports components, composables, and utilities purely based on where a file lives — \`app/components/\`, \`app/composables/\`, \`app/utils/\` — with no explicit \`import\` needed anywhere. \`useState\` is the SSR-safe way to share reactive state across components, since a plain module-level \`ref\` can leak between concurrent requests on the server; Pinia is the usual next step once state needs more structure than a single ref.`,
        contentTh: `Nuxt ทำ auto-import ตามตำแหน่งที่ไฟล์นั้นอยู่ ไม่ใช่จากขั้นตอนการลงทะเบียนใดๆ component ใน \`app/components/CourseCard.vue\` สามารถใช้ได้ในทุกหน้าหรือ component เป็น \`<CourseCard />\` โดยไม่ต้องมีคำสั่ง \`import\`; ฟังก์ชันที่ export จาก \`app/composables/useAuth.ts\` เรียกใช้ได้เป็น \`useAuth()\` ได้ทุกที่ ก็ไม่ต้อง import เช่นกัน นี่คือเหตุผลที่โค้ด Nuxt ดูเหมือนใช้ global — จริงๆ แล้วมันไม่ใช่ global แต่ถูก resolve โดยอัตโนมัติจาก file tree ตอน build time และ TypeScript tooling ในเอดิเตอร์ของคุณก็ยังรู้แน่ชัดว่าแต่ละตัวถูกประกาศไว้ที่ไหน

Composable คือฟังก์ชันที่ใช้ Composition API ของ Vue (\`ref\`, \`computed\`, lifecycle hook) เพื่อรวบรวม logic แบบมี state ที่ใช้ซ้ำได้ — เทียบเท่ากับ custom hook ในโลกของ Vue Nuxt จะ auto-import ทุกอย่างที่ export จาก \`app/composables/\`:

\`\`\`ts
// app/composables/useCounter.ts
export function useCounter() {
  const count = ref(0)
  function increment() { count.value++ }
  return { count, increment }
}
\`\`\`

มี composable เฉพาะของ Nuxt ตัวหนึ่งที่ควรพูดถึงแยกต่างหาก: \`useState\` บนฝั่งเซิร์ฟเวอร์ \`ref\` ธรรมดาระดับ module เป็นกับดัก — Nitro สามารถ (และมักจะ) จัดการหลาย request พร้อมกันในโปรเซสเดียวกันได้ ดังนั้น state ที่เก็บไว้นอก scope ของ request ตัวเองจะรั่วไหลข้ามไปยัง request ของผู้ใช้คนอื่นที่ไม่เกี่ยวข้องกัน \`useState(key, initFn)\` คือ shared state ที่ปลอดภัยสำหรับ SSR ถูกจำกัด scope อย่างถูกต้องต่อ request บนเซิร์ฟเวอร์ และคงอยู่อย่างถูกต้องผ่าน payload ไปยัง client นี่คือเหตุผลที่มัน — ไม่ใช่ \`ref\` เปล่าๆ ที่ระดับบนสุด — เป็นวิธีที่ Nuxt แนะนำให้แชร์ reactive state ข้าม component โดยไม่ต้องใช้ state-management library

\`\`\`ts
// Shared, SSR-safe — every component calling useState('cart') gets the same ref
const cart = useState<string[]>('cart', () => [])
\`\`\`

สำหรับ state ที่ต้องการโครงสร้างมากกว่า ref เดียว — action, getter, ข้อมูล state ที่เกี่ยวข้องกันหลายส่วน — โปรเจกต์ Nuxt มักจะหันไปใช้ Pinia (เพิ่มผ่าน module \`@pinia/nuxt\`) แทนที่จะเขียนเองด้วย \`useState\` แต่ประเด็นเรื่องความปลอดภัยของ SSR ที่ \`useState\` แก้ไขอยู่ก็เป็นประเด็นเดียวกับที่การผสาน Pinia เข้ากับ Nuxt จัดการให้คุณ

## สรุป

Nuxt ทำ auto-import ของ component, composable และ utility โดยดูจากตำแหน่งที่ไฟล์อยู่ล้วนๆ — \`app/components/\`, \`app/composables/\`, \`app/utils/\` — ไม่ต้องมี \`import\` ที่ไหนเลย \`useState\` คือวิธีแชร์ reactive state ข้าม component แบบปลอดภัยสำหรับ SSR เพราะ \`ref\` เปล่าๆ ระดับ module อาจรั่วไหลข้าม request ที่เกิดพร้อมกันบนเซิร์ฟเวอร์ได้ Pinia คือขั้นถัดไปตามปกติเมื่อ state ต้องการโครงสร้างมากกว่า ref เดียว`,
        labs: [
          {
            id: "counter-composable",
            title: "Build a Counter Composable",
            instructions: "Complete `useCounter` so it returns an object exposing a running `value`, plus `increment`/`decrement` methods.",
            starterCode: `function useCounter(start: number = 0) {
  // TODO: implement this — no external library, just plain state on the
  // returned object (increment/decrement can use \`this\`).
  return {
    value: start,
    increment() {},
    decrement() {}
  };
}`,
            testCode: `const counter = useCounter();
check(counter.value, 0, "starts at 0 by default");
counter.increment();
counter.increment();
check(counter.value, 2, "increment() increases the value");
counter.decrement();
check(counter.value, 1, "decrement() decreases the value");

const counter2 = useCounter(10);
check(counter2.value, 10, "accepts a custom starting value");`,
            hint: "`increment()` and `decrement()` can just do `this.value++`/`this.value--`.",
          },
          {
            id: "toggle-composable",
            title: "Build a Toggle Composable",
            instructions: "Complete `useToggle` so `toggle()` flips `value` between `true` and `false`.",
            starterCode: `function useToggle(initial: boolean = false) {
  // TODO: implement this
  return {
    value: initial,
    toggle() {}
  };
}`,
            testCode: `const t = useToggle();
check(t.value, false, "starts false by default");
t.toggle();
check(t.value, true, "toggle() flips it to true");
t.toggle();
check(t.value, false, "toggle() flips it back to false");

const t2 = useToggle(true);
check(t2.value, true, "accepts a custom starting value");`,
            hint: "`toggle()` should do `this.value = !this.value`.",
          },
        ],
      },
      {
        slug: "server-routes-with-nitro",
        titleEn: "Server Routes with Nitro",
        titleTh: "Server Routes กับ Nitro",
        order: 7,
        contentEn: `Nitro is the engine that renders your pages on the server — and it can also serve as your application's backend. Any file under \`server/api/\` becomes an HTTP endpoint, with the file's path becoming the route and an optional suffix on the filename selecting the HTTP method.

\`\`\`ts
// server/api/hello.get.ts  →  GET /api/hello
export default defineEventHandler((event) => {
  return { message: 'Hello World' }
})

// server/api/courses/[id].get.ts  →  GET /api/courses/:id
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  return { id }
})

// server/api/courses.post.ts  →  POST /api/courses
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // ...create the course...
  return { created: true }
})
\`\`\`

\`defineEventHandler\` wraps a request handler; \`event\` carries the request, and helpers from H3 (the HTTP library Nitro is built on) read out of it — \`getRouterParam\` for dynamic path segments, \`getQuery\` for the query string, \`readBody\` for a parsed JSON/form body. A file with no method suffix (\`server/api/hello.ts\`) matches every HTTP method.

\`server/routes/\` works the same way but without the automatic \`/api\` prefix — useful for things like a webhook URL or a non-API endpoint. \`server/middleware/\` holds handlers that run on *every* incoming request before its route handler, for logging, auth-token verification, or similar cross-cutting concerns — a server middleware should inspect or annotate the request rather than send its own response, and let the matched route handler produce the actual reply.

Because Nitro serves both your pages and your \`/api\` routes from the same process on the same origin, calling \`useFetch('/api/courses')\` from a page needs no CORS configuration and no separate base URL in development — it's a same-origin request by construction. That stops being true the moment your API is deployed as a genuinely separate service (as this platform's own API, mindspace-api, is — a standalone Express server, not Nitro routes) — at that point the frontend needs an explicit base URL and the API needs CORS configured for the frontend's origin, exactly the tradeoff \`server/api/\` exists to let you skip for projects that don't need a separately deployable backend.

## Conclusion

Nitro turns any file under \`server/api/\` into an HTTP endpoint, with the file path and an optional method suffix (\`.get.ts\`, \`.post.ts\`) determining the route and HTTP method, while H3 helpers like \`getRouterParam\`, \`getQuery\`, and \`readBody\` read the incoming request. Because pages and \`/api\` routes share the same origin, calling them from \`useFetch\` needs no CORS setup — a convenience that disappears once the backend is deployed as a genuinely separate service, as mindspace-api is.`,
        contentTh: `Nitro คือเอนจินที่ render หน้าเพจของคุณบนเซิร์ฟเวอร์ — และมันยังทำหน้าที่เป็น backend ของแอปพลิเคชันคุณได้ด้วย ไฟล์ใดก็ตามภายใต้ \`server/api/\` จะกลายเป็น HTTP endpoint โดย path ของไฟล์จะกลายเป็น route และส่วนต่อท้ายชื่อไฟล์ที่เป็นออปชันจะเลือก HTTP method

\`\`\`ts
// server/api/hello.get.ts  →  GET /api/hello
export default defineEventHandler((event) => {
  return { message: 'Hello World' }
})

// server/api/courses/[id].get.ts  →  GET /api/courses/:id
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  return { id }
})

// server/api/courses.post.ts  →  POST /api/courses
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // ...create the course...
  return { created: true }
})
\`\`\`

\`defineEventHandler\` ห่อ request handler ไว้; \`event\` เก็บข้อมูลของ request และ helper จาก H3 (ไลบรารี HTTP ที่ Nitro สร้างขึ้นบนพื้นฐานของมัน) อ่านค่าออกมาจากมัน — \`getRouterParam\` สำหรับ dynamic path segment, \`getQuery\` สำหรับ query string, \`readBody\` สำหรับ body แบบ JSON/form ที่ถูก parse แล้ว ไฟล์ที่ไม่มีส่วนต่อท้ายบอก method (\`server/api/hello.ts\`) จะจับคู่กับทุก HTTP method

\`server/routes/\` ทำงานแบบเดียวกันแต่ไม่มี prefix \`/api\` อัตโนมัติ — มีประโยชน์สำหรับสิ่งอย่าง webhook URL หรือ endpoint ที่ไม่ใช่ API \`server/middleware/\` เก็บ handler ที่รันบน *ทุก* request ขาเข้าก่อน route handler ของมัน สำหรับ logging, การยืนยัน auth-token หรือประเด็นแบบ cross-cutting อื่นๆ ที่คล้ายกัน — server middleware ควรตรวจสอบหรือ annotate request มากกว่าจะส่ง response ของตัวเอง แล้วปล่อยให้ route handler ที่จับคู่ได้เป็นผู้สร้างคำตอบจริงๆ

เพราะ Nitro ให้บริการทั้งหน้าเพจของคุณและ route \`/api\` จากโปรเซสเดียวกันบน origin เดียวกัน การเรียก \`useFetch('/api/courses')\` จากหน้าเพจไม่ต้องตั้งค่า CORS และไม่ต้องมี base URL แยกต่างหากตอน development เลย — มันเป็น same-origin request โดยธรรมชาติ สิ่งนี้จะไม่จริงอีกต่อไปทันทีที่ API ของคุณถูก deploy เป็น service แยกต่างหากจริงๆ (เหมือนที่ API ของแพลตฟอร์มนี้เอง คือ mindspace-api เป็น — Express server แบบ standalone ไม่ใช่ Nitro routes) — ณ จุดนั้น frontend จำเป็นต้องมี base URL ที่ชัดเจน และ API ต้องตั้งค่า CORS สำหรับ origin ของ frontend ซึ่งเป็น tradeoff ที่ \`server/api/\` มีไว้ให้คุณข้ามได้พอดีสำหรับโปรเจกต์ที่ไม่ต้องการ backend ที่ deploy แยกต่างหาก

## สรุป

Nitro เปลี่ยนไฟล์ใดก็ตามภายใต้ \`server/api/\` ให้เป็น HTTP endpoint โดย path ของไฟล์และส่วนต่อท้ายบอก method ที่เป็นออปชัน (\`.get.ts\`, \`.post.ts\`) เป็นตัวกำหนด route และ HTTP method ส่วน helper ของ H3 อย่าง \`getRouterParam\`, \`getQuery\` และ \`readBody\` ใช้อ่าน request ที่เข้ามา เพราะหน้าเพจกับ route \`/api\` ใช้ origin เดียวกัน การเรียกมันจาก \`useFetch\` จึงไม่ต้องตั้งค่า CORS เลย — ความสะดวกนี้จะหายไปทันทีที่ backend ถูก deploy เป็น service แยกต่างหากจริงๆ อย่างที่ mindspace-api เป็น`,
        labs: [
          {
            id: "dispatch-by-method",
            title: "Dispatch by HTTP Method",
            instructions: "Complete `dispatch` so it finds the handler matching `method` and runs it, or returns `\"404\"` if none match.",
            starterCode: `interface Handler {
  method: "GET" | "POST" | "DELETE";
  run: () => string;
}

function dispatch(method: string, handlers: Handler[]): string {
  // TODO: implement this — the same idea as server/api/bookmarks.get.ts
  // vs .post.ts picking a handler by filename.
  return "404";
}`,
            testCode: `const handlers: { method: "GET" | "POST" | "DELETE"; run: () => string }[] = [
  { method: "GET", run: () => "list" },
  { method: "POST", run: () => "created" }
];
check(dispatch("GET", handlers), "list", "dispatches to the GET handler");
check(dispatch("POST", handlers), "created", "dispatches to the POST handler");
check(dispatch("DELETE", handlers), "404", "returns 404 when no handler matches the method");`,
            hint: "Use `.find()` to locate the handler whose `method` matches.",
          },
        ],
      },
      {
        slug: "rendering-modes",
        titleEn: "Rendering Modes: SSR, SPA, SSG & Hybrid",
        titleTh: "Rendering Modes: SSR, SPA, SSG และ Hybrid",
        order: 8,
        contentEn: `Nuxt supports several rendering strategies, and — unusually for a framework — lets you mix them per route in the same app rather than forcing one choice for the whole project.

**Universal rendering (SSR)** is the default: each request renders full HTML on the server, sends it to the browser, and Vue hydrates it into an interactive app. Content is visible immediately and crawlable by search engines, at the cost of needing a running server process.

**Client-side rendering (SPA)** ships a near-empty HTML shell and lets the browser do all rendering after downloading the JavaScript bundle — set globally with \`ssr: false\` in \`nuxt.config.ts\`. It's simpler to reason about (no server/client code-path differences to worry about) and deployable to plain static hosting, but the user sees a blank page for longer, and a crawler has to execute JavaScript to see any content at all — a real cost for anything that needs to be indexed, and a non-issue for something like an internal dashboard that isn't.

**Static site generation (SSG)** — \`nuxt generate\` — prerenders every route to a static HTML file at build time, so there's no server needed at runtime at all, just files on a CDN.

**Hybrid rendering** applies different rules to different routes with \`routeRules\` in \`nuxt.config.ts\`, so one app can use the right strategy per route instead of one strategy for everything:

\`\`\`ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },        // static at build time — rarely changes
    '/blog/**': { swr: 3600 },       // serve cached, regenerate in the background hourly
    '/dashboard/**': { ssr: false }, // client-only — behind a login, no SEO need
  }
})
\`\`\`

| Mode | Renders | Needs a server? | Best for |
| --- | --- | --- | --- |
| SSR (default) | Per-request, on the server | Yes | Content that changes often and needs SEO |
| SPA (\`ssr: false\`) | In the browser only | No | Logged-in apps, dashboards, tools |
| SSG (\`nuxt generate\`) | Once, at build time | No | Content that rarely changes (marketing, docs) |
| Hybrid (\`routeRules\`) | Mixed, per route | Depends on the mix | Real apps with both kinds of route |

The practical default is: leave SSR on everywhere until a specific route gives you a reason not to (an admin panel with no SEO value, a page whose content truly never changes), then carve out an exception for that route with \`routeRules\` instead of dropping SSR for the whole app.

## Conclusion

Nuxt lets one app mix rendering strategies per route with \`routeRules\` instead of picking just one: SSR by default for content that needs SEO, SPA (\`ssr: false\`) for logged-in tools with no indexing need, SSG (\`nuxt generate\`) for content that rarely changes, and hybrid rules like \`swr\` in between. The practical default is SSR everywhere, with exceptions carved out per route only when a specific one calls for it.`,
        contentTh: `Nuxt รองรับกลยุทธ์การ render หลายแบบ และ — ซึ่งไม่ค่อยเจอในเฟรมเวิร์กทั่วไป — ให้คุณผสมมันได้ต่อ route ในแอปเดียวกัน แทนที่จะบังคับให้เลือกแบบเดียวสำหรับทั้งโปรเจกต์

**Universal rendering (SSR)** เป็นค่าเริ่มต้น: แต่ละ request จะ render HTML เต็มรูปแบบบนเซิร์ฟเวอร์ ส่งไปยังเบราว์เซอร์ แล้ว Vue จะ hydrate มันให้กลายเป็นแอปที่โต้ตอบได้ เนื้อหามองเห็นได้ทันทีและ crawler ของเสิร์ชเอนจินสามารถทำ index ได้ โดยแลกกับการที่ต้องมีโปรเซสเซิร์ฟเวอร์รันอยู่

**Client-side rendering (SPA)** ส่ง HTML shell ที่แทบว่างเปล่าไป แล้วให้เบราว์เซอร์ทำ render ทั้งหมดหลังจากดาวน์โหลด JavaScript bundle เสร็จ — ตั้งค่าแบบ global ด้วย \`ssr: false\` ใน \`nuxt.config.ts\` มันเข้าใจง่ายกว่า (ไม่ต้องกังวลเรื่องความแตกต่างของ code path ระหว่างเซิร์ฟเวอร์กับ client) และ deploy ไปยัง static hosting ธรรมดาได้ แต่ผู้ใช้จะเห็นหน้าว่างเปล่านานขึ้น และ crawler ต้องรัน JavaScript เพื่อจะเห็นเนื้อหาใดๆ เลย — เป็นต้นทุนที่แท้จริงสำหรับอะไรก็ตามที่ต้องการให้ถูก index แต่ไม่ใช่ปัญหาสำหรับอะไรอย่าง dashboard ภายในที่ไม่จำเป็นต้องถูก index

**Static site generation (SSG)** — \`nuxt generate\` — จะ prerender ทุก route เป็นไฟล์ HTML แบบ static ตอน build time ดังนั้นจึงไม่ต้องมีเซิร์ฟเวอร์ตอน runtime เลย มีแค่ไฟล์บน CDN

**Hybrid rendering** ใช้กฎที่ต่างกันกับแต่ละ route ด้วย \`routeRules\` ใน \`nuxt.config.ts\` ทำให้แอปเดียวใช้กลยุทธ์ที่เหมาะสมต่อ route แทนที่จะใช้กลยุทธ์เดียวกับทุกอย่าง:

\`\`\`ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },        // static at build time — rarely changes
    '/blog/**': { swr: 3600 },       // serve cached, regenerate in the background hourly
    '/dashboard/**': { ssr: false }, // client-only — behind a login, no SEO need
  }
})
\`\`\`

| Mode | Renders | Needs a server? | Best for |
| --- | --- | --- | --- |
| SSR (default) | Per-request, on the server | Yes | Content that changes often and needs SEO |
| SPA (\`ssr: false\`) | In the browser only | No | Logged-in apps, dashboards, tools |
| SSG (\`nuxt generate\`) | Once, at build time | No | Content that rarely changes (marketing, docs) |
| Hybrid (\`routeRules\`) | Mixed, per route | Depends on the mix | Real apps with both kinds of route |

ค่าเริ่มต้นที่ใช้ได้จริงคือ: เปิด SSR ไว้ทุกที่จนกว่า route ใดจะมีเหตุผลให้ไม่ทำแบบนั้น (admin panel ที่ไม่มีคุณค่าด้าน SEO, หน้าที่เนื้อหาไม่เคยเปลี่ยนแปลงจริงๆ) แล้วค่อยแยก exception ให้ route นั้นด้วย \`routeRules\` แทนที่จะปิด SSR สำหรับทั้งแอป

## สรุป

Nuxt ให้แอปเดียวผสม rendering strategy ได้ต่อ route ด้วย \`routeRules\` แทนที่จะเลือกแค่แบบเดียว: SSR เป็นค่าเริ่มต้นสำหรับเนื้อหาที่ต้องการ SEO, SPA (\`ssr: false\`) สำหรับเครื่องมือหลัง login ที่ไม่ต้องการ index, SSG (\`nuxt generate\`) สำหรับเนื้อหาที่แทบไม่เปลี่ยน และกฎแบบ hybrid อย่าง \`swr\` อยู่ตรงกลาง ค่าเริ่มต้นที่ใช้ได้จริงคือเปิด SSR ไว้ทุกที่ แล้วค่อยแยก exception ต่อ route เมื่อ route นั้นมีเหตุผลจริงๆ เท่านั้น`,
      },
      {
        slug: "configuration-and-modules",
        titleEn: "Configuration & Modules",
        titleTh: "Configuration และ Modules",
        order: 9,
        contentEn: `\`nuxt.config.ts\`, at the project root, is the single place project-wide behavior gets configured — built with the \`defineNuxtConfig\` helper, which is auto-imported and mainly exists to give the config object accurate TypeScript types.

\`\`\`ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/main.css'],
  app: {
    head: {
      title: 'My App',
      meta: [{ name: 'description', content: 'A Nuxt app' }]
    }
  },
  routeRules: {
    '/admin/**': { ssr: false }
  },
  runtimeConfig: {
    apiSecret: '',           // server-only — never sent to the browser
    public: {
      apiBase: 'http://localhost:8080'  // exposed to client code too
    }
  }
})
\`\`\`

\`runtimeConfig\` is where environment-specific values live, and it draws a hard line between two kinds of values. Anything under \`public\` is bundled into the client build and readable from browser code — safe only for values that were never secret to begin with, like an API's public base URL. Anything at the top level *outside* \`public\` stays server-only and is stripped from what ships to the browser — the right place for API keys, database URLs, anything that would be a real problem to leak. Both halves can be overridden per-environment with matching env vars at runtime, without touching the config file: \`NUXT_API_SECRET\` overrides the private \`apiSecret\`, and \`NUXT_PUBLIC_API_BASE\` overrides \`public.apiBase\` — the naming convention mirrors the config's own nesting. This platform's frontend uses exactly this pattern: its \`public.apiBase\` is what every page's \`useFetch\` calls resolve against, overridden per deploy target through that same \`NUXT_PUBLIC_API_BASE\` environment variable rather than a hardcoded URL.

\`modules\` is how Nuxt is extended — each entry is a package that hooks into the build process to add functionality: \`@pinia/nuxt\` adds Pinia store auto-imports, \`@nuxtjs/tailwindcss\` wires up Tailwind's build step, \`@nuxtjs/i18n\` adds internationalization routing. Adding a module is normally just installing the package and adding its name to this array — the module itself handles whatever config wiring it needs, which is the whole point: complex build-tool integration reduced to a one-line, documented decision.

## Conclusion

\`nuxt.config.ts\` centralizes project-wide settings, with \`runtimeConfig\` drawing a hard line between \`public\` values (bundled into the client) and everything else (server-only), each overridable per environment via matching \`NUXT_\`/\`NUXT_PUBLIC_\` env vars. The \`modules\` array is how features like Pinia or Tailwind get wired in, usually as a one-line addition rather than manual build configuration.`,
        contentTh: `\`nuxt.config.ts\` ที่ root ของโปรเจกต์ คือที่เดียวที่ใช้กำหนดค่าพฤติกรรมของทั้งโปรเจกต์ — สร้างขึ้นด้วย helper \`defineNuxtConfig\` ซึ่งถูก auto-import มาให้ และมีไว้หลักๆ เพื่อให้ config object มี TypeScript type ที่ถูกต้อง

\`\`\`ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/main.css'],
  app: {
    head: {
      title: 'My App',
      meta: [{ name: 'description', content: 'A Nuxt app' }]
    }
  },
  routeRules: {
    '/admin/**': { ssr: false }
  },
  runtimeConfig: {
    apiSecret: '',           // server-only — never sent to the browser
    public: {
      apiBase: 'http://localhost:8080'  // exposed to client code too
    }
  }
})
\`\`\`

\`runtimeConfig\` คือที่ที่ค่าเฉพาะของแต่ละ environment อยู่ และมันขีดเส้นแบ่งชัดเจนระหว่างค่าสองประเภท อะไรก็ตามภายใต้ \`public\` จะถูก bundle เข้าไปใน client build และอ่านได้จากโค้ดฝั่งเบราว์เซอร์ — ปลอดภัยเฉพาะสำหรับค่าที่ไม่เคยเป็นความลับตั้งแต่แรกอยู่แล้ว เช่น public base URL ของ API อะไรก็ตามที่ระดับบนสุด *นอก* \`public\` จะอยู่ฝั่งเซิร์ฟเวอร์เท่านั้นและถูกตัดออกจากสิ่งที่ส่งไปยังเบราว์เซอร์ — เป็นที่ที่เหมาะสำหรับ API key, database URL, อะไรก็ตามที่จะเป็นปัญหาใหญ่ถ้ารั่วไหล ทั้งสองส่วนสามารถ override ได้ต่อ environment ด้วย env var ที่ตรงกันตอน runtime โดยไม่ต้องแตะไฟล์ config เลย: \`NUXT_API_SECRET\` จะ override \`apiSecret\` ที่เป็นส่วนตัว และ \`NUXT_PUBLIC_API_BASE\` จะ override \`public.apiBase\` — รูปแบบการตั้งชื่อสะท้อนโครงสร้างการเนสต์ของ config เอง ฟรอนต์เอนด์ของแพลตฟอร์มนี้ใช้ pattern นี้เป๊ะๆ: \`public.apiBase\` ของมันคือสิ่งที่การเรียก \`useFetch\` ของทุกหน้า resolve ไปหา โดยถูก override ต่อ deploy target ผ่าน environment variable \`NUXT_PUBLIC_API_BASE\` ตัวเดียวกันนี้แทนที่จะ hardcode URL ไว้

\`modules\` คือวิธีที่ Nuxt ถูกขยายความสามารถ — แต่ละรายการคือ package ที่ hook เข้ากับ build process เพื่อเพิ่มฟังก์ชันการทำงาน: \`@pinia/nuxt\` เพิ่ม auto-import สำหรับ Pinia store, \`@nuxtjs/tailwindcss\` ต่อ build step ของ Tailwind ให้, \`@nuxtjs/i18n\` เพิ่มการทำ routing สำหรับ internationalization การเพิ่ม module ปกติแล้วก็แค่ install package แล้วเพิ่มชื่อมันเข้าไปใน array นี้ — ตัว module เองจะจัดการเรื่องการต่อ config ที่มันต้องการทั้งหมด ซึ่งนั่นคือประเด็นสำคัญ: การผสาน build-tool ที่ซับซ้อนถูกลดทอนลงเหลือแค่การตัดสินใจบรรทัดเดียวที่มีเอกสารรองรับ

## สรุป

\`nuxt.config.ts\` รวมการตั้งค่าทั้งโปรเจกต์ไว้ที่เดียว โดย \`runtimeConfig\` ขีดเส้นแบ่งชัดเจนระหว่างค่าใน \`public\` (ถูก bundle เข้า client) กับค่าที่เหลือ (server-only เท่านั้น) แต่ละส่วน override ได้ต่อ environment ผ่าน env var \`NUXT_\`/\`NUXT_PUBLIC_\` ที่ตรงกัน ส่วน array \`modules\` คือวิธีต่อฟีเจอร์อย่าง Pinia หรือ Tailwind เข้ามา ปกติแค่เพิ่มบรรทัดเดียวแทนการต่อ build configuration ด้วยมือ`,
      },
      {
        slug: "seo-meta-and-deployment",
        titleEn: "SEO, Meta Tags & Deployment",
        titleTh: "SEO, Meta Tags และ Deployment",
        order: 10,
        contentEn: `Because SSR sends real HTML to the browser (and to crawlers) on first load, Nuxt pages can set their own \`<title>\` and meta tags per-route, and that content is what search engines and link-preview cards actually see — unlike a pure SPA, where a crawler that doesn't execute JavaScript sees only whatever static shell \`index.html\` contains.

\`useSeoMeta\` is the composable for the common case — title, description, Open Graph and Twitter card fields — as plain reactive properties, with no need to know the underlying tag names:

\`\`\`vue
<script setup lang="ts">
useSeoMeta({
  title: 'TypeScript for JS Programmers',
  description: 'A fast on-ramp to TypeScript for developers who already know JavaScript.',
  ogImage: '/og/typescript-course.png'
})
</script>
\`\`\`

For anything \`useSeoMeta\` doesn't cover directly — a \`<link rel="canonical">\`, a custom \`<script type="application/ld+json">\` block, arbitrary \`<head>\` content — \`useHead\` takes the same kind of object with full control over every tag. Both are reactive: passing a \`computed\` or a ref's \`.value\` means the tags update automatically if the underlying data (say, a course title loaded via \`useFetch\`) changes. Site-wide defaults that every page should inherit unless it overrides them belong in \`nuxt.config.ts\` under \`app.head\`, rather than repeated in every page.

Deployment is where Nitro's output format pays off: \`nuxt build\` produces a \`.output/\` directory whose shape adapts to a \`preset\` — the default Node.js server preset runs anywhere \`node .output/server/index.mjs\` can run, but the same source code can target Vercel, Netlify, Cloudflare Workers, AWS Lambda, or plain static hosting (for a prerendered/SSG build) by changing the preset, with no application code changes required. This platform's own API isn't Nuxt/Nitro — it's a separate Express service — but the frontend, mindspace-web, is exactly this kind of Nuxt app, and is deployed as a standard Node server build with its \`NUXT_PUBLIC_API_BASE\` runtime config pointed at that API's deployed URL, the same public/private split from the previous lesson doing the actual environment-to-environment wiring.

## Conclusion

\`useSeoMeta\` and \`useHead\` set per-route \`<title>\` and meta tags reactively, which crawlers actually see because SSR sends real HTML on first load — with site-wide defaults belonging in \`nuxt.config.ts\`'s \`app.head\` instead of being repeated per page. Nitro's \`preset\` system lets the same \`nuxt build\` output target a Node server, serverless platforms, or static hosting, which is how this platform's own frontend gets deployed as a standard Node server pointed at its API via \`NUXT_PUBLIC_API_BASE\`.`,
        contentTh: `เพราะ SSR ส่ง HTML จริงไปยังเบราว์เซอร์ (และไปยัง crawler) ตั้งแต่การโหลดครั้งแรก หน้าเพจของ Nuxt จึงตั้งค่า \`<title>\` และ meta tag ของตัวเองได้ต่อ route และเนื้อหานั้นคือสิ่งที่เสิร์ชเอนจินและการ์ด link-preview เห็นจริงๆ — ต่างจาก SPA แท้ๆ ที่ crawler ซึ่งไม่รัน JavaScript จะเห็นแค่ static shell ของ \`index.html\` เท่านั้น

\`useSeoMeta\` คือ composable สำหรับกรณีทั่วไป — title, description, ฟิลด์ Open Graph และ Twitter card — ในรูปแบบ reactive property ธรรมดาๆ โดยไม่ต้องรู้ชื่อ tag ที่อยู่เบื้องหลัง:

\`\`\`vue
<script setup lang="ts">
useSeoMeta({
  title: 'TypeScript for JS Programmers',
  description: 'A fast on-ramp to TypeScript for developers who already know JavaScript.',
  ogImage: '/og/typescript-course.png'
})
</script>
\`\`\`

สำหรับอะไรก็ตามที่ \`useSeoMeta\` ไม่ได้ครอบคลุมโดยตรง — \`<link rel="canonical">\`, บล็อก \`<script type="application/ld+json">\` แบบกำหนดเอง, เนื้อหา \`<head>\` ใดๆ — \`useHead\` รับ object แบบเดียวกันแต่ควบคุม tag ได้เต็มรูปแบบทุกตัว ทั้งสองตัวเป็น reactive: การส่ง \`computed\` หรือค่า \`.value\` ของ ref เข้าไปหมายความว่า tag จะอัปเดตอัตโนมัติถ้าข้อมูลที่อยู่เบื้องหลัง (เช่น course title ที่โหลดผ่าน \`useFetch\`) เปลี่ยนแปลง ค่าเริ่มต้นระดับทั้งไซต์ที่ทุกหน้าควรสืบทอด เว้นแต่จะ override มัน ควรอยู่ใน \`nuxt.config.ts\` ภายใต้ \`app.head\` แทนที่จะเขียนซ้ำในทุกหน้า

Deployment คือจุดที่รูปแบบผลลัพธ์ของ Nitro ให้ผลตอบแทน: \`nuxt build\` จะสร้างไดเรกทอรี \`.output/\` ที่รูปร่างของมันปรับตาม \`preset\` — preset เริ่มต้นแบบ Node.js server รันได้ทุกที่ที่ \`node .output/server/index.mjs\` รันได้ แต่ source code เดียวกันนี้สามารถเล็งไปที่ Vercel, Netlify, Cloudflare Workers, AWS Lambda หรือ static hosting ธรรมดา (สำหรับ build แบบ prerendered/SSG) ได้ด้วยการเปลี่ยน preset โดยไม่ต้องแก้โค้ดแอปพลิเคชันเลย API ของแพลตฟอร์มนี้เองไม่ใช่ Nuxt/Nitro — มันเป็น Express service แยกต่างหาก — แต่ frontend คือ mindspace-web นั้นเป็นแอป Nuxt แบบนี้เป๊ะๆ และถูก deploy เป็น Node server build มาตรฐาน โดยมี runtime config \`NUXT_PUBLIC_API_BASE\` ชี้ไปยัง URL ที่ deploy ของ API นั้น เป็นการแบ่ง public/private แบบเดียวกับบทเรียนก่อนหน้าที่ทำหน้าที่เชื่อมต่อจาก environment หนึ่งไปยังอีก environment หนึ่งจริงๆ

## สรุป

\`useSeoMeta\` และ \`useHead\` ตั้งค่า \`<title>\` และ meta tag ต่อ route แบบ reactive ซึ่ง crawler เห็นจริงๆ เพราะ SSR ส่ง HTML จริงตั้งแต่โหลดครั้งแรก โดยค่าเริ่มต้นระดับทั้งไซต์ควรอยู่ใน \`app.head\` ของ \`nuxt.config.ts\` แทนที่จะเขียนซ้ำในทุกหน้า ระบบ \`preset\` ของ Nitro ให้ผลลัพธ์จาก \`nuxt build\` เดียวกันเล็งไปที่ Node server, แพลตฟอร์ม serverless หรือ static hosting ได้ ซึ่งเป็นวิธีที่ frontend ของแพลตฟอร์มนี้เองถูก deploy เป็น Node server มาตรฐานที่ชี้ไปยัง API ผ่าน \`NUXT_PUBLIC_API_BASE\``,
      },
      {
        slug: "project-bookmarks-api",
        titleEn: "Project: A Bookmarks API with server/api",
        titleTh: "Project: สร้าง Bookmarks API ด้วย server/api",
        order: 11,
        contentEn: `The last few lessons covered routing, data fetching, and server routes separately — this one and the next put them together by building one small, real feature end to end: a bookmarks list with an API (this lesson) and the UI that talks to it (the next lesson).

Storage first, kept deliberately simple so the lesson stays about Nuxt, not about a database: an in-memory array in a server-only utility, seeded with a couple of rows.

\`\`\`ts
// server/utils/bookmarks.ts
export interface Bookmark { id: string; title: string; url: string }

export const bookmarks: Bookmark[] = [
  { id: '1', title: 'Nuxt Docs', url: 'https://nuxt.com' }
]
\`\`\`

Anything under \`server/utils/\` auto-imports into other server files the same way \`app/utils/\` auto-imports into the app — so every \`server/api/\` route below can use \`bookmarks\` with no explicit import. This storage is intentionally not durable: it resets on every server restart and wouldn't be safe shared across multiple server instances. That's a fine tradeoff for learning the routing and request-handling pieces in isolation; a real project would swap this file for a repository backed by an actual database, the same layered idea mindspace-api itself uses, without changing a single line of the routes below.

**List and create**, both on \`server/api/bookmarks.ts\` — one file, two methods, selected by filename suffix:

\`\`\`ts
// server/api/bookmarks.get.ts
export default defineEventHandler(() => bookmarks)

// server/api/bookmarks.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{ title?: string; url?: string }>(event)

  if (!body.title || !body.url) {
    throw createError({ statusCode: 400, statusMessage: 'title and url are required' })
  }

  const bookmark = { id: crypto.randomUUID(), title: body.title, url: body.url }
  bookmarks.push(bookmark)
  return bookmark
})
\`\`\`

\`createError\` is H3's way of turning a failure into a proper HTTP error response — \`throw\`ing it stops the handler and sends the given status code and message back to the client, instead of the generic 500 an uncaught exception would produce. This is the correct way to signal "the caller did something wrong" (400), distinct from an unexpected server bug.

**Delete by id** uses a dynamic route file, matching the \`[id].vue\` pattern from file-based routing, one level down in \`server/api/\`:

\`\`\`ts
// server/api/bookmarks/[id].delete.ts
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const index = bookmarks.findIndex((b) => b.id === id)

  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Bookmark not found' })
  }

  bookmarks.splice(index, 1)
  return { deleted: true }
})
\`\`\`

Three routes, three files, no router configuration written by hand anywhere — \`GET /api/bookmarks\`, \`POST /api/bookmarks\`, and \`DELETE /api/bookmarks/:id\` all exist purely because of where these files live and how they're named. The next lesson builds the page that calls them.

## Conclusion

This lesson built a real backend for a bookmarks feature purely from file placement: \`server/api/bookmarks.get.ts\` and \`.post.ts\` for listing and creating, \`server/api/bookmarks/[id].delete.ts\` for deleting, backed by a simple in-memory store in \`server/utils/\`, with \`createError\` turning bad input into a proper 400/404 response instead of a generic server error. The next lesson builds the page that calls these three routes.`,
        contentTh: `บทเรียนไม่กี่บทที่ผ่านมาครอบคลุมเรื่อง routing, data fetching และ server routes แยกกัน — บทนี้กับบทถัดไปจะเอาทั้งหมดมารวมกันโดยสร้างฟีเจอร์เล็กๆ ที่ใช้งานได้จริงแบบ end to end หนึ่งอย่าง: รายการ bookmark พร้อม API (บทนี้) และ UI ที่คุยกับมัน (บทถัดไป)

เริ่มจาก storage ก่อน จงใจทำให้เรียบง่ายเพื่อให้บทเรียนยังคงเน้นเรื่อง Nuxt ไม่ใช่เรื่องฐานข้อมูล: array แบบ in-memory ใน server-only utility ที่ seed ไว้สักสองสามแถว

\`\`\`ts
// server/utils/bookmarks.ts
export interface Bookmark { id: string; title: string; url: string }

export const bookmarks: Bookmark[] = [
  { id: '1', title: 'Nuxt Docs', url: 'https://nuxt.com' }
]
\`\`\`

อะไรก็ตามภายใต้ \`server/utils/\` จะถูก auto-import เข้าไปในไฟล์ server อื่นๆ แบบเดียวกับที่ \`app/utils/\` ถูก auto-import เข้าไปในแอป — ดังนั้นทุก route \`server/api/\` ด้านล่างจึงใช้ \`bookmarks\` ได้โดยไม่ต้อง import ชัดเจน storage นี้จงใจไม่ให้คงทน: มันรีเซ็ตทุกครั้งที่เซิร์ฟเวอร์ restart และไม่ปลอดภัยที่จะแชร์ข้ามหลาย instance ของเซิร์ฟเวอร์ นั่นเป็น tradeoff ที่โอเคสำหรับการเรียนรู้ส่วน routing และ request-handling แบบแยกเดี่ยว โปรเจกต์จริงจะเปลี่ยนไฟล์นี้เป็น repository ที่มีฐานข้อมูลจริงหนุนหลัง เป็นแนวคิดแบบ layered เดียวกับที่ mindspace-api เองก็ใช้ โดยไม่ต้องเปลี่ยนโค้ดของ route ด้านล่างนี้แม้แต่บรรทัดเดียว

**List และ create** ทั้งสองอยู่ที่ \`server/api/bookmarks.ts\` — ไฟล์เดียว สอง method เลือกด้วยส่วนต่อท้ายชื่อไฟล์:

\`\`\`ts
// server/api/bookmarks.get.ts
export default defineEventHandler(() => bookmarks)

// server/api/bookmarks.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{ title?: string; url?: string }>(event)

  if (!body.title || !body.url) {
    throw createError({ statusCode: 400, statusMessage: 'title and url are required' })
  }

  const bookmark = { id: crypto.randomUUID(), title: body.title, url: body.url }
  bookmarks.push(bookmark)
  return bookmark
})
\`\`\`

\`createError\` คือวิธีของ H3 ในการเปลี่ยนความล้มเหลวให้เป็น HTTP error response ที่ถูกต้อง — การ \`throw\` มันจะหยุด handler และส่ง status code กับข้อความที่กำหนดกลับไปยัง client แทนที่จะเป็น 500 ทั่วไปที่ exception ที่ไม่ถูกจับจะสร้างขึ้น นี่คือวิธีที่ถูกต้องในการส่งสัญญาณว่า "ผู้เรียกทำอะไรผิดพลาด" (400) ซึ่งต่างจากบั๊กของเซิร์ฟเวอร์ที่ไม่คาดคิด

**Delete by id** ใช้ไฟล์ route แบบ dynamic ตาม pattern \`[id].vue\` จาก file-based routing เพียงแต่ลึกลงไปหนึ่งชั้นใน \`server/api/\`:

\`\`\`ts
// server/api/bookmarks/[id].delete.ts
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const index = bookmarks.findIndex((b) => b.id === id)

  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Bookmark not found' })
  }

  bookmarks.splice(index, 1)
  return { deleted: true }
})
\`\`\`

สาม route สามไฟล์ ไม่มีการเขียน router configuration ด้วยมือที่ไหนเลย — \`GET /api/bookmarks\`, \`POST /api/bookmarks\` และ \`DELETE /api/bookmarks/:id\` มีอยู่ได้ก็เพราะตำแหน่งที่ไฟล์เหล่านี้อยู่และวิธีตั้งชื่อมันล้วนๆ บทเรียนถัดไปจะสร้างหน้าเพจที่เรียกใช้มัน

## สรุป

บทเรียนนี้สร้าง backend จริงสำหรับฟีเจอร์ bookmarks ได้ล้วนๆ จากตำแหน่งไฟล์: \`server/api/bookmarks.get.ts\` กับ \`.post.ts\` สำหรับ list และ create, \`server/api/bookmarks/[id].delete.ts\` สำหรับ delete หนุนหลังด้วย in-memory store แบบง่ายใน \`server/utils/\` โดย \`createError\` เปลี่ยน input ที่ผิดพลาดให้เป็น response 400/404 ที่ถูกต้อง แทนที่จะเป็น server error ทั่วไป บทเรียนถัดไปจะสร้างหน้าเพจที่เรียกใช้ทั้งสาม route นี้`,
        labs: [
          {
            id: "bookmark-handlers",
            title: "Implement the Bookmark Handlers",
            instructions: "Complete `addBookmark` (validate input, then append immutably) and `removeBookmark` (filter out the matching id) — the same logic the lesson's server/api/bookmarks* routes use.",
            starterCode: `interface Bookmark { id: string; title: string; url: string }

function addBookmark(bookmarks: Bookmark[], input: { title?: string; url?: string }): Bookmark[] {
  // TODO: if title or url is missing, throw new Error("title and url are required").
  // Otherwise return a NEW array with a new bookmark appended (any unique id
  // is fine, e.g. String(bookmarks.length + 1)). Don't mutate \`bookmarks\`.
  return bookmarks;
}

function removeBookmark(bookmarks: Bookmark[], id: string): Bookmark[] {
  // TODO: return a NEW array without the bookmark whose id matches \`id\`.
  // Don't mutate \`bookmarks\`.
  return bookmarks;
}`,
            testCode: `const seed: Bookmark[] = [{ id: "1", title: "Nuxt Docs", url: "https://nuxt.com" }];

const afterAdd = addBookmark(seed, { title: "Vue", url: "https://vuejs.org" });
check(afterAdd.length, 2, "adds a new bookmark to the list");
check(seed.length, 1, "does not mutate the original array");

let threw = false;
try {
  addBookmark(seed, { title: "No URL" });
} catch {
  threw = true;
}
check(threw, true, "throws when url is missing");

const afterRemove = removeBookmark(seed, "1");
check(afterRemove.length, 0, "removes the bookmark with the matching id");
check(seed.length, 1, "removeBookmark does not mutate the original array either");`,
            hint: "addBookmark should throw before doing anything else if a field is missing; both functions should return a new array — try `.filter()` and `[...bookmarks, newOne]`.",
          },
        ],
      },
      {
        slug: "project-bookmarks-ui",
        titleEn: "Project: The Bookmarks UI",
        titleTh: "Project: สร้าง UI ของ Bookmarks",
        order: 12,
        contentEn: `With the API in place, the page is a matter of connecting the composables from earlier lessons to it: \`useFetch\` for the initial list (server-rendered, no double-fetch), and plain \`$fetch\` for the two mutations, since creating and deleting only ever happen after a user click — exactly the "event-based interaction" case where \`$fetch\` was the right tool, not \`useFetch\`.

\`\`\`vue
<!-- app/pages/bookmarks/index.vue -->
<script setup lang="ts">
const { data: bookmarks, refresh } = await useFetch('/api/bookmarks')

const title = ref('')
const url = ref('')
const submitting = ref(false)

async function addBookmark() {
  submitting.value = true
  try {
    await $fetch('/api/bookmarks', {
      method: 'POST',
      body: { title: title.value, url: url.value }
    })
    title.value = ''
    url.value = ''
    await refresh()
  } finally {
    submitting.value = false
  }
}

async function removeBookmark(id: string) {
  await $fetch(\`/api/bookmarks/\${id}\`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <form @submit.prevent="addBookmark">
    <input v-model="title" placeholder="Title" required>
    <input v-model="url" placeholder="https://..." required>
    <button type="submit" :disabled="submitting">Add</button>
  </form>

  <ul>
    <li v-for="bookmark in bookmarks" :key="bookmark.id">
      <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
      <button @click="removeBookmark(bookmark.id)">Delete</button>
    </li>
  </ul>
</template>
\`\`\`

\`refresh()\` — returned by \`useFetch\` alongside \`data\` — re-runs the same request and updates \`bookmarks\` in place, which is why the list reflects a new or deleted bookmark right after the mutation without a full page reload or any manual array manipulation. Calling it explicitly after each mutation, rather than trying to keep the local list in sync by hand (pushing to \`bookmarks.value\` after a create, splicing it after a delete), keeps the page's list always a true reflection of what the server actually has — worth the one extra round-trip for a feature this size, since a hand-maintained local copy would drift the moment two mutations happen close together or a request fails partway through.

The \`required\` attributes give free client-side validation before a request is even sent; the server-side check in the previous lesson's \`POST\` handler is what actually protects the data, since client-side validation alone can always be bypassed by anyone calling the API directly. Both layers matter, and they're not redundant — one is for user experience, the other is the real guarantee.

This page would typically live inside a layout (from the layouts lesson) and be reached via a \`<NuxtLink to="/bookmarks">\` somewhere in the site's navigation — nothing about it needs to be a special case once it's just another route under \`app/pages/\`.

## Conclusion

The bookmarks page connected \`useFetch\` for the server-rendered initial list with plain \`$fetch\` for the click-triggered create and delete mutations, calling \`refresh()\` after each one so the list always reflects what the server actually holds rather than a hand-maintained local copy. It also showed why client-side \`required\` validation and the server's own check aren't redundant — one is UX, the other is the actual guarantee.`,
        contentTh: `เมื่อมี API พร้อมแล้ว หน้าเพจก็เป็นแค่เรื่องของการเชื่อม composable จากบทเรียนก่อนหน้าเข้ากับมัน: \`useFetch\` สำหรับรายการเริ่มต้น (render บนเซิร์ฟเวอร์ ไม่ fetch ซ้ำสอง) และ \`$fetch\` ธรรมดาสำหรับสอง mutation เพราะการสร้างและลบเกิดขึ้นหลังจากผู้ใช้คลิกเท่านั้น — เป็นกรณี "event-based interaction" แบบเป๊ะๆ ที่ \`$fetch\` เป็นเครื่องมือที่ถูกต้อง ไม่ใช่ \`useFetch\`

\`\`\`vue
<!-- app/pages/bookmarks/index.vue -->
<script setup lang="ts">
const { data: bookmarks, refresh } = await useFetch('/api/bookmarks')

const title = ref('')
const url = ref('')
const submitting = ref(false)

async function addBookmark() {
  submitting.value = true
  try {
    await $fetch('/api/bookmarks', {
      method: 'POST',
      body: { title: title.value, url: url.value }
    })
    title.value = ''
    url.value = ''
    await refresh()
  } finally {
    submitting.value = false
  }
}

async function removeBookmark(id: string) {
  await $fetch(\`/api/bookmarks/\${id}\`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <form @submit.prevent="addBookmark">
    <input v-model="title" placeholder="Title" required>
    <input v-model="url" placeholder="https://..." required>
    <button type="submit" :disabled="submitting">Add</button>
  </form>

  <ul>
    <li v-for="bookmark in bookmarks" :key="bookmark.id">
      <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
      <button @click="removeBookmark(bookmark.id)">Delete</button>
    </li>
  </ul>
</template>
\`\`\`

\`refresh()\` — ที่ \`useFetch\` คืนมาพร้อมกับ \`data\` — จะรัน request เดิมซ้ำและอัปเดต \`bookmarks\` ในที่เดิม นี่คือเหตุผลที่รายการสะท้อน bookmark ที่ถูกสร้างหรือลบทันทีหลัง mutation โดยไม่ต้องโหลดหน้าใหม่ทั้งหมดหรือจัดการ array ด้วยมือเลย การเรียกมันอย่างชัดเจนหลังแต่ละ mutation แทนที่จะพยายามซิงก์รายการในเครื่องด้วยมือ (push เข้า \`bookmarks.value\` หลังสร้าง, splice ออกหลังลบ) ทำให้รายการของหน้าเพจเป็นภาพสะท้อนที่ตรงกับสิ่งที่เซิร์ฟเวอร์มีอยู่จริงเสมอ — คุ้มค่ากับ round-trip พิเศษอีกหนึ่งครั้งสำหรับฟีเจอร์ขนาดนี้ เพราะสำเนาในเครื่องที่จัดการด้วยมือจะคลาดเคลื่อนทันทีที่ mutation สองครั้งเกิดขึ้นใกล้กันหรือ request ล้มเหลวกลางคัน

attribute \`required\` ให้ client-side validation ฟรีๆ ก่อนที่ request จะถูกส่งออกไปด้วยซ้ำ ส่วนการตรวจสอบฝั่งเซิร์ฟเวอร์ใน handler \`POST\` ของบทเรียนก่อนหน้าคือสิ่งที่ปกป้องข้อมูลจริงๆ เพราะ client-side validation เพียงอย่างเดียวสามารถถูกข้ามได้เสมอโดยใครก็ตามที่เรียก API โดยตรง ทั้งสองชั้นสำคัญทั้งคู่ และไม่ได้ซ้ำซ้อนกัน — ชั้นหนึ่งเพื่อประสบการณ์ผู้ใช้ อีกชั้นคือการรับประกันที่แท้จริง

หน้าเพจนี้โดยทั่วไปจะอยู่ภายใน layout (จากบทเรียนเรื่อง layout) และเข้าถึงได้ผ่าน \`<NuxtLink to="/bookmarks">\` ที่ไหนสักแห่งใน navigation ของไซต์ — ไม่มีอะไรเกี่ยวกับมันที่ต้องเป็นกรณีพิเศษเลย เมื่อมันก็แค่ route อีกอันหนึ่งภายใต้ \`app/pages/\`

## สรุป

หน้า bookmarks เชื่อม \`useFetch\` สำหรับรายการเริ่มต้นที่ render บนเซิร์ฟเวอร์เข้ากับ \`$fetch\` ธรรมดาสำหรับ mutation สร้างและลบที่เกิดจากการคลิก โดยเรียก \`refresh()\` หลังแต่ละครั้งเพื่อให้รายการสะท้อนสิ่งที่เซิร์ฟเวอร์มีอยู่จริงเสมอ แทนที่จะเป็นสำเนาในเครื่องที่ดูแลเอง มันยังแสดงให้เห็นว่าทำไม client-side validation ด้วย \`required\` กับการตรวจสอบฝั่งเซิร์ฟเวอร์ถึงไม่ได้ซ้ำซ้อนกัน — อย่างหนึ่งเพื่อ UX อีกอย่างคือการรับประกันที่แท้จริง`,
        labs: [
          {
            id: "can-submit",
            title: "Validate Before Submitting",
            instructions: "Complete `canSubmit` so it only allows submission when both `title` and `url` have real (non-whitespace) content.",
            starterCode: `function canSubmit(title: string, url: string): boolean {
  // TODO: implement this
  return false;
}`,
            testCode: `check(canSubmit("Nuxt", "https://nuxt.com"), true, "true when both fields have content");
check(canSubmit("", "https://nuxt.com"), false, "false when title is empty");
check(canSubmit("Nuxt", "   "), false, "false when url is only whitespace");
check(canSubmit("  Nuxt  ", "https://nuxt.com"), true, "trims whitespace before checking");`,
            hint: "`.trim().length > 0` on both `title` and `url`.",
          },
        ],
      },
      {
        slug: "project-loading-errors-and-next-steps",
        titleEn: "Project: Loading States, Errors & Where to Go Next",
        titleTh: "Project: Loading State, Error และก้าวต่อไป",
        order: 13,
        contentEn: `Two things the bookmarks page glossed over: what the user sees while a request is in flight, and what happens when one fails. Both are answered by state \`useFetch\` already gives back — \`status\` and \`error\` — rather than anything that needs to be built by hand.

\`\`\`vue
<script setup lang="ts">
const { data: bookmarks, status, error, refresh } = await useFetch('/api/bookmarks')
</script>

<template>
  <p v-if="status === 'pending'">Loading bookmarks…</p>
  <p v-else-if="error">Couldn't load bookmarks: {{ error.statusMessage }}</p>
  <ul v-else>
    <li v-for="bookmark in bookmarks" :key="bookmark.id">{{ bookmark.title }}</li>
  </ul>
</template>
\`\`\`

Because the initial \`useFetch\` is \`await\`ed, this particular \`pending\` branch won't actually show on first load — the page doesn't finish rendering until the data (or the error) is already resolved, on the server. It matters once \`refresh()\` runs later, client-side, or if the same pattern is reused with \`lazy: true\`, where the page does render before the fetch resolves. The \`error\` case matters immediately, though: the \`POST\` and \`DELETE\` handlers from the last two lessons \`throw createError(...)\` on bad input or a missing id, and that status code and message are exactly what shows up in \`error.value\` here — the same error-handling path serves both a malformed request and a genuinely failed one, with no separate try/catch needed on the reading side.

**Where this project is deliberately incomplete**, and what closing the gap would actually involve:

- **Storage.** The in-memory array resets on every restart and isn't safe across multiple server instances. Swapping it for a real database means replacing \`server/utils/bookmarks.ts\` with calls into a database client or ORM — the three route handlers don't need to change at all, since they only ever talk to that one file's exports.
- **Auth.** Nothing here checks who's making the request. A real version would add a \`server/middleware/\` handler (from the layouts & middleware lesson) that verifies a session and rejects unauthenticated requests before they reach any \`server/api/bookmarks*\` handler.
- **Validation.** The \`POST\` handler checks that \`title\` and \`url\` exist, but not that \`url\` is actually a valid URL, or that \`title\` isn't absurdly long. A library like Zod, given a schema, would replace that hand-written \`if\` with something that validates the whole shape at once and produces a specific error message per field.

None of these are Nuxt-specific gaps — they're the same concerns any backend has, which is really the point: \`server/api/\` gives a small project a backend without a second codebase to run and deploy, but everything you'd want from a "real" API is still something you build on top of it, the same way this course's earlier lessons on rendering modes, SEO, and deployment are things you'd layer onto this same small project as it grows into something worth shipping.

## Conclusion

\`status\` and \`error\` from \`useFetch\` covered the loading and failure states without any hand-built logic, with the same \`createError\` calls from the API lessons flowing straight through to \`error.value\` on the page. This closing lesson also named where the bookmarks project stays deliberately incomplete — in-memory storage, no auth, and shallow validation — and what closing each gap would actually involve.`,
        contentTh: `สองสิ่งที่หน้า bookmarks ข้ามไป: ผู้ใช้เห็นอะไรระหว่างที่ request กำลังทำงาน และเกิดอะไรขึ้นเมื่อมันล้มเหลว ทั้งสองอย่างตอบได้ด้วย state ที่ \`useFetch\` คืนมาให้อยู่แล้ว — \`status\` และ \`error\` — ไม่ต้องสร้างอะไรขึ้นมาเองเพิ่ม

\`\`\`vue
<script setup lang="ts">
const { data: bookmarks, status, error, refresh } = await useFetch('/api/bookmarks')
</script>

<template>
  <p v-if="status === 'pending'">Loading bookmarks…</p>
  <p v-else-if="error">Couldn't load bookmarks: {{ error.statusMessage }}</p>
  <ul v-else>
    <li v-for="bookmark in bookmarks" :key="bookmark.id">{{ bookmark.title }}</li>
  </ul>
</template>
\`\`\`

เพราะ \`useFetch\` เริ่มต้นถูก \`await\` ไว้ branch \`pending\` นี้จึงไม่ได้แสดงจริงๆ ในการโหลดครั้งแรก — หน้าเพจจะไม่ render เสร็จจนกว่าข้อมูล (หรือ error) จะถูก resolve แล้วบนเซิร์ฟเวอร์ มันจะมีผลก็ต่อเมื่อ \`refresh()\` รันในภายหลังฝั่ง client หรือถ้า pattern เดียวกันถูกใช้ซ้ำกับ \`lazy: true\` ที่หน้าเพจ render ก่อนที่ fetch จะ resolve อย่างไรก็ตาม กรณี \`error\` มีผลทันที: handler \`POST\` และ \`DELETE\` จากสองบทเรียนที่แล้ว \`throw createError(...)\` เมื่อ input ไม่ถูกต้องหรือไม่มี id และ status code กับข้อความนั้นคือสิ่งที่ปรากฏใน \`error.value\` ที่นี่พอดี — เส้นทางจัดการ error เดียวกันนี้ให้บริการทั้ง request ที่ผิดรูปแบบและ request ที่ล้มเหลวจริงๆ โดยไม่ต้องมี try/catch แยกต่างหากฝั่งที่อ่านข้อมูลเลย

**จุดที่โปรเจกต์นี้ไม่สมบูรณ์โดยเจตนา** และการปิดช่องว่างนั้นจะต้องทำอะไรบ้างจริงๆ:

- **Storage** array แบบ in-memory รีเซ็ตทุกครั้งที่ restart และไม่ปลอดภัยข้ามหลาย instance ของเซิร์ฟเวอร์ การเปลี่ยนมันเป็นฐานข้อมูลจริงหมายถึงการแทนที่ \`server/utils/bookmarks.ts\` ด้วยการเรียก database client หรือ ORM — route handler ทั้งสามตัวไม่ต้องเปลี่ยนเลย เพราะมันคุยกับ export ของไฟล์นั้นไฟล์เดียวเท่านั้น
- **Auth** ไม่มีอะไรตรวจสอบว่าใครเป็นคนส่ง request เวอร์ชันจริงจะเพิ่ม handler \`server/middleware/\` (จากบทเรียน layouts & middleware) ที่ตรวจสอบ session และปฏิเสธ request ที่ไม่ได้ยืนยันตัวตนก่อนที่มันจะไปถึง handler \`server/api/bookmarks*\` ใดๆ
- **Validation** handler \`POST\` ตรวจแค่ว่า \`title\` และ \`url\` มีอยู่ แต่ไม่ตรวจว่า \`url\` เป็น URL ที่ถูกต้องจริงๆ หรือ \`title\` ไม่ยาวเกินไป ไลบรารีอย่าง Zod เมื่อกำหนด schema ให้ จะแทนที่ \`if\` ที่เขียนด้วยมือนั้นด้วยสิ่งที่ validate ทั้งรูปร่างพร้อมกันและสร้างข้อความ error เฉพาะต่อฟิลด์ได้

ไม่มีข้อไหนเลยที่เป็นช่องว่างเฉพาะของ Nuxt — มันเป็นประเด็นเดียวกับที่ backend ไหนๆ ก็มี ซึ่งนั่นคือประเด็นสำคัญจริงๆ: \`server/api/\` ให้ backend กับโปรเจกต์เล็กๆ โดยไม่ต้องมี codebase ที่สองให้รันและ deploy แต่ทุกอย่างที่คุณอยากได้จาก API "จริงจัง" ก็ยังเป็นสิ่งที่คุณต้องสร้างเพิ่มบนมัน เหมือนกับที่บทเรียนก่อนหน้าของคอร์สนี้เรื่อง rendering mode, SEO และ deployment ก็เป็นสิ่งที่คุณจะเพิ่มเข้ามาบนโปรเจกต์เล็กๆ ชิ้นเดียวกันนี้เมื่อมันเติบโตขึ้นเป็นอะไรที่คุ้มค่าจะ ship จริงๆ

## สรุป

\`status\` และ \`error\` จาก \`useFetch\` ครอบคลุม state ของการโหลดและความล้มเหลวได้โดยไม่ต้องเขียน logic เอง โดยการเรียก \`createError\` เดียวกันจากบทเรียนเรื่อง API ก็ไหลตรงมาถึง \`error.value\` บนหน้าเพจพอดี บทเรียนปิดท้ายนี้ยังระบุจุดที่โปรเจกต์ bookmarks ยังไม่สมบูรณ์โดยเจตนา — storage แบบ in-memory, ไม่มี auth และ validation ที่ตื้นเกินไป — พร้อมสิ่งที่ต้องทำจริงๆ เพื่อปิดแต่ละช่องว่างนั้น`,
      },
    ],
  };

export default course;
