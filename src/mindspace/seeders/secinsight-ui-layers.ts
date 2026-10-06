import type { SeedCourse } from "./types";

const course: SeedCourse = {
    slug: "secinsight-ui-layers",
    title: "SecInsight UI: Tracing the Codebase by Layers",
    descriptionEn: `The frontend counterpart to the SecInsight API course (Nuxt 3 / Vue 3 / Pinia). Every path, snippet, and line number was checked against real source -- nothing guessed. The first 8 lessons are onboarding; the last 5 are advanced (CSR-only architecture, the module-level modal resolver, the reCAPTCHA load sequence, and a real security boundary + debt audit, not just theory).`,
    descriptionTh: `คู่ฉบับของคอร์ส SecInsight API สำหรับฝั่ง frontend (Nuxt 3 / Vue 3 / Pinia) ทุกข้อความ, path, บรรทัดโค้ดเช็กกับ source จริงมาแล้ว -- ไม่มีอะไรเดา 8 บทเรียนแรกคือ onboarding ส่วน 5 บทเรียนสุดท้ายคือ advanced (CSR-only architecture, modal resolver ระดับ module, ลำดับการโหลด reCAPTCHA, และ security boundary + audit หาหนี้ทางเทคนิคจริงในโค้ด ไม่ใช่แค่ทฤษฎี)`,
    published: false,
    lessons: [
      {
        slug: "the-fixed-chain-ui",
        titleEn: "The Fixed Chain",
        titleTh: "The Fixed Chain (สายที่ตายตัว)",
        order: 1,
        contentEn: `Nuxt has no separate route-config layer — the \`pages/\` folder is the router (file-based routing). From there, data flows through the same 6 stops, always — starting from the component that actually renders, not just the page.

**Component → Page → Composable → Service → $api plugin → Backend**

| Layer | Job | Why it exists | What breaks if you skip it | Directory |
| --- | --- | --- | --- | --- |
| Component | Renders UI from props, emits an event up for the Page to handle — or sometimes calls a composable directly itself | UI reuses across pages (e.g. \`EventTable\` is used at both \`/events\` and \`/system-admin/events\`) — the Page never needs to know rendering detail | The Page bloats with render logic, cross-page reuse becomes impossible, markup gets copy-pasted | \`components/\` |
| Page | Renders the route, owns page-level state (filters, pagination, sort), wires composables to template events | The folder path under \`pages/\` IS the URL — no separate route-config file to go hunting through | Composables would need to know about routes/params directly; multiple pages needing the same data duplicate fetch+loading logic inline | \`pages/\` |
| Composable | Owns the standard \`data\`/\`isLoading\`/\`pagination\` ref trio for one operation, calls one Service method, exposes state + a trigger function | Lets multiple pages share the same fetch operation without re-writing the try/finally + isLoading boilerplate | Every page duplicates its own \`isLoading\` ref and try/finally around a raw service call — easy to forget the reset | \`composables/\` |
| Service | A thin class wrapping \`this.api\` (= \`useNuxtApp().$api\`), one method per endpoint, holds only the URL prefix | Endpoint paths + HTTP verbs live in exactly one place per domain — composables never hardcode a URL string | URL strings scatter into composables/pages and silently drift from the real backend routes | \`services/\` |
| $api plugin | The app's one global \`$fetch\` instance — attaches the Authorization header, unwraps the success envelope, translates any error response into a thrown \`ApiError\` | Every Service method gets auth + envelope handling for free — no composable ever touches a raw Response itself | Auth-header and envelope-unwrap logic would be copy-pasted into every Service, error handling would fragment across composables | \`plugins/api.ts\` |

**Note: the Pinia Store is not part of this chain.** \`authStore\` (Pinia) doesn't sit in-line — both the Component and the Page read/write it directly, in parallel with calling composables (\`authStore.isSystemAdmin\` is read in \`pages/events/index.vue\` and inside \`EventTable.vue:269\` itself — the Page doesn't monopolize the read), and \`plugins/api.ts\` itself reads \`authStore.getAccessToken\` directly to set the header. It's cross-cutting state, not a chain node — forcing it into the sequence would misrepresent the real code.

## Conclusion

Six stops, starting from the Component that actually renders (not just the Page): Component → Page → Composable → Service → \`$api\` → Backend. The Pinia auth store sits outside this chain entirely — it's read directly by several layers in parallel, which is a deliberate exception worth remembering rather than a gap in the model.`,
        contentTh: `Nuxt ไม่มี "route config" แยกต่างหาก — โฟลเดอร์ \`pages/\` คือ router (file-based routing) จากนั้นข้อมูลไหลผ่าน 6 สถานีเสมอ เริ่มจาก component ที่ render จริง (ไม่ใช่แค่ page)

**Component → Page → Composable → Service → $api plugin → Backend**

| Layer | หน้าที่ | ทำไมต้องมีเลเยอร์นี้ | ถ้าข้ามเลเยอร์นี้ จะพังตรงไหน | Directory |
| --- | --- | --- | --- | --- |
| Component | render UI จาก props, emit event ขึ้นให้ Page จัดการ — หรือบางครั้งเรียก composable ตรงเองเลย | reuse UI ข้ามหน้าได้ (เช่น \`EventTable\` ใช้ทั้งที่ \`/events\` และ \`/system-admin/events\`) — Page ไม่ต้องรู้ markup รายละเอียด | Page บวม logic การ render เอง reuse ข้ามหน้าไม่ได้ ต้อง copy markup | \`components/\` |
| Page | render route, ถือ state ระดับหน้า (filter/pagination/sort), ผูก composable เข้ากับ template event | โฟลเดอร์ใน \`pages/\` = URL ตรงตัว (file-based routing) — ไม่มี route-config ให้ไล่หาแยก | composable ต้องรู้เรื่อง route/param เอง หลายหน้าที่ใช้ data เดียวกันต้อง copy fetch+loading logic ซ้ำ | \`pages/\` |
| Composable | ถือ ref สามตัวมาตรฐาน (data/isLoading/pagination) ของ operation เดียว เรียก Service หนึ่งตัว คืน state + trigger function | ให้หลายหน้าใช้ fetch operation เดียวกันได้โดยไม่ต้อง copy try/finally + isLoading ซ้ำทุกที่ | ทุกหน้า copy \`isLoading\` ref + try/finally รอบ raw service call เอง เสี่ยงลืม reset | \`composables/\` |
| Service | class บางๆ ห่อ \`this.api\` (= \`useNuxtApp().$api\`) หนึ่ง method ต่อหนึ่ง endpoint ถือแค่ URL prefix | path + HTTP verb ของแต่ละ domain อยู่จุดเดียว — composable ไม่ hardcode URL string เอง | URL string กระจายเข้าไปใน composable/page เอง ไดร์ฟจาก backend route จริงได้เงียบๆ | \`services/\` |
| $api plugin | \`$fetch\` instance เดียวของทั้งแอป — ใส่ Authorization header, แกะ envelope ตอนสำเร็จ, แปลง error response เป็น \`ApiError\` ที่ throw ได้ | ทุก Service method ได้ auth + envelope handling ฟรี ไม่มี composable ไหนต้องแตะ raw Response เอง | auth header + envelope-unwrap logic ต้อง copy ไปทุก Service, error handling กระจัดกระจาย | \`plugins/api.ts\` |

**หมายเหตุ: Pinia Store ไม่ได้อยู่ใน chain นี้** \`authStore\` (Pinia) ไม่ได้เรียงต่อในสายนี้ — ทั้ง Component และ Page อ่าน/เขียนมันตรงๆ ขนานไปกับการเรียก composable (\`authStore.isSystemAdmin\` ถูกอ่านทั้งใน \`pages/events/index.vue\` และใน \`EventTable.vue:269\` เอง — ไม่ใช่ Page ผูกขาดการอ่าน) และ \`plugins/api.ts\` เองก็อ่าน \`authStore.getAccessToken\` ตรงๆ เพื่อใส่ header ถือเป็น cross-cutting state ไม่ใช่ node ในสาย — ใส่เป็น node ให้ดูเป็นสายเดียวจะไม่ตรงกับโค้ดจริง

## สรุป

หกสถานี เริ่มจาก Component ที่ render จริง (ไม่ใช่แค่ Page): Component → Page → Composable → Service → \`$api\` → Backend Pinia auth store อยู่นอกสายนี้ทั้งหมด — ถูกอ่านตรงๆ จากหลาย layer พร้อมกัน ซึ่งเป็นข้อยกเว้นที่ตั้งใจ ควรจำไว้ ไม่ใช่ช่องโหว่ของโมเดล`,
      },
      {
        slug: "how-to-jump-one-stop-ui",
        titleEn: "How to Jump One Stop, at Each Layer",
        titleTh: "วิธีกระโดดข้ามสถานี ทีละ Layer",
        order: 2,
        contentEn: `Each stop hands off with a predictable, greppable signal.

| Hop | Signal |
| --- | --- |
| Component → Page | Grep \`defineEmits\` in the component file — the declared event names are exactly what the page must listen for with \`@kebab-case-event\` in its template (Vue auto-converts camelCase → kebab-case). Not every component just emits — some call a composable directly themselves (\`EventDetailCard.vue\`, see the security-boundary lesson). Always check for an \`import { use...\` in the component file first. |
| Page → Composable | Page destructures straight from \`use<Domain><Op>()\` near the top of \`<script setup>\` — the composable name already states domain + operation. Grep for \`const { ... } = use\`. |
| Composable → Service | The composable does \`new services.<Domain>Service()\` then calls one method — the class name is the file name in \`services/<Domain>Service.ts\`, directly. |
| Service → $api | Every Service constructor does \`this.api = useNuxtApp().$api\`, then each method calls \`this.api<T>(url, { method })\` — same single destination, \`plugins/api.ts\`. |

**try/finally, never try/catch.** \`$api\` already handles errors globally — a composable only needs to reset \`isLoading\` in \`finally\`. A \`catch\` wrapping a service call anywhere is a wrong signal. Confirmed real in both \`useEventService.ts\` and \`useSystemAdminService.ts\`.

## Conclusion

Every hand-off has one greppable signal: \`defineEmits\`, a destructured \`use<Domain><Op>()\`, a \`new services.<X>Service()\`, or \`this.api<T>(...)\`. And a composable wrapping a service call in \`try/finally\` — never \`try/catch\` — is the tell that it's correctly trusting \`$api\`'s global error handling instead of re-implementing it.`,
        contentTh: `แต่ละสถานีส่งไม้ต่อด้วยสัญญาณที่ grep เจอได้แน่นอน

| การกระโดด | สัญญาณ |
| --- | --- |
| Component → Page | grep \`defineEmits\` ในไฟล์ component — ชื่อ event ที่ประกาศคือสิ่งที่ page ต้องฟังด้วย \`@kebab-case-event\` ใน template (Vue แปลง camelCase → kebab-case ให้อัตโนมัติ) ไม่ใช่ทุก component จบที่ emit — บางตัวเรียก composable เองตรงๆ เลย (\`EventDetailCard.vue\`, ดูบทเรียนเรื่อง security boundary) เช็ก \`import { use...\` ในไฟล์ component ก่อนเสมอ |
| Page → Composable | Page destructure ค่าจาก \`use<Domain><Op>()\` ตรงๆ ในต้น \`<script setup>\` — ชื่อ composable บอกทั้ง domain และ operation อยู่แล้ว grep หา \`const { ... } = use\` |
| Composable → Service | composable ทำ \`new services.<Domain>Service()\` แล้วเรียก method เดียว — ชื่อ class คือชื่อไฟล์ \`services/<Domain>Service.ts\` ตรงตัว |
| Service → $api | constructor ของ Service ทุกตัวทำ \`this.api = useNuxtApp().$api\` แล้ว method เรียก \`this.api<T>(url, { method })\` — ปลายทางเดียวกันหมดคือ \`plugins/api.ts\` |

**try/finally เท่านั้น ไม่ใช่ try/catch** \`$api\` เป็น global error handler อยู่แล้ว composable แค่ต้อง reset \`isLoading\` ใน \`finally\` — เห็น \`catch\` รอบ service call ที่ไหนคือผิดสัญญาณ ยืนยันจริงทั้ง \`useEventService.ts\` และ \`useSystemAdminService.ts\`

## สรุป

ทุกการส่งไม้ต่อมีสัญญาณที่ grep เจอได้หนึ่งอย่าง: \`defineEmits\`, \`use<Domain><Op>()\` ที่ destructure ไว้, \`new services.<X>Service()\`, หรือ \`this.api<T>(...)\` และ composable ที่ห่อ service call ด้วย \`try/finally\` — ไม่ใช่ \`try/catch\` — คือสัญญาณว่ามันเชื่อใจ global error handling ของ \`$api\` ถูกทาง ไม่ได้เขียนมันขึ้นมาเองซ้ำ`,
      },
      {
        slug: "worked-example-a-read-path-ui",
        titleEn: "Worked Example A — Read Path (Events List Page)",
        titleTh: "ตัวอย่างจริง A — เส้นทางอ่าน (หน้ารายการ Events)",
        order: 3,
        contentEn: `One real endpoint: the \`/events\` page loading the event list.

**1 - Component** — \`pages/events/index.vue:10-32\` (template). Two real components alternate by role — a \`v-if\` picks the right one. Both share the same \`:dataList="events"\` prop, sourced from the composable (next step).

\`\`\`html
<div v-if="!isAdmin">
  <EventUserList :dataList="events" :isLoading="isEventListLoading"
    :pagination="pagination" @update-page="handlePaginationChange" />
</div>
<div v-else>
  <EventTable :dataList="events" :isLoading="isEventListLoading"
    :pagination="pagination" @delete-event="handleDeleteEvent" />
</div>
\`\`\`

The Component only renders — it doesn't call the composable itself, data flows down purely via props (contrast with a Component calling a composable directly, see the security-boundary lesson's \`EventDetailCard.vue\`).

**2 - Page** — \`pages/events/index.vue:50-58\`. Destructures straight from the composable, calls it in \`onMounted\`.

\`\`\`ts
const {
  listEvents: events,
  isEventListLoading,
  pagination,
  fetchEvents,
} = useEventList();
// ...later:
onMounted(() => { fetchAllEvents(); });
\`\`\`

**3 - Composable** — \`composables/event/useEventService.ts:9-33\`. Owns \`listEvents\`, \`isEventListLoading\`, \`pagination\` — creates \`new services.EventService()\` once at setup, calls \`eventService.getAll(params)\`.

\`\`\`ts
export const useEventList = () => {
  const listEvents = ref<IEvent[]>([]);
  const isEventListLoading = ref(false);
  const pagination = reactive<IPaginationState>(createPaginationState());
  const eventService = new services.EventService();
  const fetchEvents = async (params) => {
    isEventListLoading.value = true;
    try {
      const response = await eventService.getAll(params);
      listEvents.value = response.rows;
      pagination.total = response.pagination.totalItems;
    } finally {
      isEventListLoading.value = false;
    }
  };
  return { listEvents, isEventListLoading, pagination, fetchEvents };
};
\`\`\`

**4 - Service** — \`services/EventService.ts:10-32\`. Holds only the \`/events\` prefix — \`getAll\` forwards query params straight through \`this.api\`.

\`\`\`ts
class EventService {
  private readonly prefix: string = '/events';
  private readonly api;
  constructor() {
    this.api = useNuxtApp().$api;
  }
  async getAll(params?: IGetEventsRequest): Promise<IEventsResponse> {
    return await this.api<IEventsResponse>(this.prefix, {
      method: 'GET',
      params: params,
    });
  }
}
\`\`\`

**5 - $api plugin → Backend** — \`plugins/api.ts\`. \`$fetch.create\` at \`baseURL: config.public.apiURL + '/api/v1'\` attaches the header and actually fires \`GET /api/v1/events\` against secinsight-api (a separate repo) — the success envelope is unwrapped in \`onResponse\` before it reaches the Service.

## Conclusion

Five hops for a read: Component (renders via props) → Page (\`onMounted\` + destructured composable) → Composable (owns loading state, calls one Service method) → Service (thin, one prefix) → \`$api\` (auth + envelope, then the real HTTP call). This exact shape repeats for every read page in the app.`,
        contentTh: `endpoint จริงหนึ่งเส้น: หน้า \`/events\` ดึงรายการ event

**1 · Component** — \`pages/events/index.vue:10-32\` (template) มี 2 component จริงสลับกันตาม role — \`v-if\` เลือกให้ตรง ทั้งคู่ใช้ prop \`:dataList="events"\` เดียวกัน ที่มาจาก composable (step ถัดไป)

\`\`\`html
<div v-if="!isAdmin">
  <EventUserList :dataList="events" :isLoading="isEventListLoading"
    :pagination="pagination" @update-page="handlePaginationChange" />
</div>
<div v-else>
  <EventTable :dataList="events" :isLoading="isEventListLoading"
    :pagination="pagination" @delete-event="handleDeleteEvent" />
</div>
\`\`\`

Component แค่ render ไม่เรียก composable เอง — ข้อมูลไหลลงมาทาง prop เท่านั้น (contrast กับ Component ที่เรียก composable ตรง ดูบทเรียนเรื่อง security boundary ของ \`EventDetailCard.vue\`)

**2 · Page** — \`pages/events/index.vue:50-58\` destructure ตรงจาก composable แล้วเรียกใน \`onMounted\`

\`\`\`ts
const {
  listEvents: events,
  isEventListLoading,
  pagination,
  fetchEvents,
} = useEventList();
// ...later:
onMounted(() => { fetchAllEvents(); });
\`\`\`

**3 · Composable** — \`composables/event/useEventService.ts:9-33\` ถือ \`listEvents\`, \`isEventListLoading\`, \`pagination\` — ตั้ง \`new services.EventService()\` ครั้งเดียวตอน setup แล้วเรียก \`eventService.getAll(params)\`

\`\`\`ts
export const useEventList = () => {
  const listEvents = ref<IEvent[]>([]);
  const isEventListLoading = ref(false);
  const pagination = reactive<IPaginationState>(createPaginationState());
  const eventService = new services.EventService();
  const fetchEvents = async (params) => {
    isEventListLoading.value = true;
    try {
      const response = await eventService.getAll(params);
      listEvents.value = response.rows;
      pagination.total = response.pagination.totalItems;
    } finally {
      isEventListLoading.value = false;
    }
  };
  return { listEvents, isEventListLoading, pagination, fetchEvents };
};
\`\`\`

**4 · Service** — \`services/EventService.ts:10-32\` holds แค่ prefix \`/events\` — \`getAll\` ส่ง query params ตรงๆ ผ่าน \`this.api\`

\`\`\`ts
class EventService {
  private readonly prefix: string = '/events';
  private readonly api;
  constructor() {
    this.api = useNuxtApp().$api;
  }
  async getAll(params?: IGetEventsRequest): Promise<IEventsResponse> {
    return await this.api<IEventsResponse>(this.prefix, {
      method: 'GET',
      params: params,
    });
  }
}
\`\`\`

**5 · $api plugin → Backend** — \`plugins/api.ts\` \`$fetch.create\` ที่ \`baseURL: config.public.apiURL + '/api/v1'\` ต่อ header แล้วยิงจริงไปที่ \`GET /api/v1/events\` บน secinsight-api (คนละ repo) — envelope สำเร็จถูกแกะใน \`onResponse\` ก่อนคืนให้ Service

## สรุป

ห้าจุดสำหรับการอ่าน: Component (render ผ่าน prop) → Page (\`onMounted\` + composable ที่ destructure ไว้) → Composable (ถือ loading state, เรียก Service method เดียว) → Service (บางๆ, prefix เดียว) → \`$api\` (auth + envelope แล้วค่อยยิง HTTP จริง) รูปแบบนี้ซ้ำเหมือนกันทุกหน้าที่เป็นการอ่านข้อมูลในแอป`,
      },
      {
        slug: "worked-example-b-write-destructive-path-ui",
        titleEn: "Worked Example B — Write + Destructive Path (Delete Event)",
        titleTh: "ตัวอย่างจริง B — เส้นทางเขียน/ทำลาย (Delete Event)",
        order: 4,
        contentEn: `The delete-event button in the admin table — a path with a password-confirmation modal gating the composable call.

**1 - Component — where the action actually starts** — \`components/Shared/Event/EventTable.vue:403-409\`. A row's delete click really starts here — the component owns \`selectedEventIds\` itself (checkbox multi-select) and decides whether to emit a single ID or an array based on the selection, then hands it up to the Page via an event.

\`\`\`ts
const emit = defineEmits<{
  (e: 'deleteEvent', eventId: number | number[]): void;
  // ...sortChange, rowClick, selectTag, update:pagination
}>();
const handleOpenDeleteEventModal = (eventId) => {
  if (selectedEventIds.value.length > 1) {
    emit('deleteEvent', selectedEventIds.value); // bulk delete
  } else {
    emit('deleteEvent', eventId); // single delete
  }
};
\`\`\`

The script emits \`deleteEvent\` (camelCase) but the page's template listens with \`@delete-event\` (kebab-case) — Vue converts this automatically, matching \`naming-conventions.md\` ("component event names use kebab-case").

**2 - Page — confirm before act** — \`pages/events/index.vue:126-152\`. \`handleDeleteEvent\` opens \`UserModal\` via \`useAppModal().open<string>()\` to collect \`actorPassword\` from the user first — no confirm, nothing happens (\`if (!confirmed) return;\`).

\`\`\`ts
const handleDeleteEvent = async (eventId) => {
  const ids = Array.isArray(eventId) ? eventId : [eventId];
  if (!ids.length) return;
  const { confirmed, data: password } = await modal.open<string>({
    component: UserModal,
    props: { title: t('...deleteEvent.title'), type: 'warning' /*...*/ },
  });
  if (!confirmed) return;
  try {
    modal.setLoading(true);
    await Promise.all(ids.map((id) => deleteEvent({ id, actorPassword: password })));
    await fetchAllEvents();
    toast.success(t('...deleteEventSuccess'));
    modal.close();
  } finally {
    modal.setLoading(false);
  }
};
\`\`\`

**3 - Composable** — \`composables/systemAdmin/useSystemAdminService.ts:27-41\`. \`useSystemAdminDeleteEvent\` is very thin — it knows nothing about the modal/password, only forwards the request to the Service.

\`\`\`ts
export const useSystemAdminDeleteEvent = () => {
  const isLoading = ref(false);
  const systemAdminService = new services.SystemAdminService();
  const deleteEvent = async (request: IDeleteEventRequest): Promise<void> => {
    isLoading.value = true;
    try {
      await systemAdminService.deleteEvent(request);
    } finally {
      isLoading.value = false;
    }
  };
  return { isLoading, deleteEvent };
};
\`\`\`

**4 - Service → $api → Backend** — \`services/SystemAdminService.ts:297-305\`. \`DELETE /system-admin/events/:id\` sends \`actorPassword\` in the body — the actual password check happens on the backend (secinsight-api's \`DeleteEventUseCase\`), not this repo. The UI only collects the value from the modal and forwards it — it never validates or verifies it itself.

\`\`\`ts
async deleteEvent(request: IDeleteEventRequest): Promise<IMessageResponse> {
  return await this.api<IMessageResponse>(
    \`\${this.prefix}/events/\${request.id}\`,
    { method: 'DELETE', body: { actorPassword: request.actorPassword } }
  );
}
\`\`\`

## Conclusion

A destructive UI path adds one thing a read path never needs: a confirmation modal gating the composable call, living at the Page (or Component) layer, never inside the composable itself. The composable and Service stay exactly as thin as the read path — the UI never validates the password, it just collects and forwards it; the real check happens on the backend.`,
        contentTh: `ปุ่มลบ event ในตาราง admin — เส้นทางที่มี modal ยืนยันรหัสผ่านคั่นก่อนเรียก composable

**1 · Component — จุดที่ action เริ่มจริงๆ** — \`components/Shared/Event/EventTable.vue:403-409\` แถวในตารางกด delete จริงๆ เริ่มที่นี่ — component เก็บ \`selectedEventIds\` เอง (multi-select checkbox) แล้วตัดสินใจว่าจะ emit ID เดียวหรือ array ตาม selection แล้วส่งขึ้นให้ Page ผ่าน event

\`\`\`ts
const emit = defineEmits<{
  (e: 'deleteEvent', eventId: number | number[]): void;
  // ...sortChange, rowClick, selectTag, update:pagination
}>();
const handleOpenDeleteEventModal = (eventId) => {
  if (selectedEventIds.value.length > 1) {
    emit('deleteEvent', selectedEventIds.value); // bulk delete
  } else {
    emit('deleteEvent', eventId); // single delete
  }
};
\`\`\`

script ใช้ \`deleteEvent\` (camelCase) แต่ template ของ page ฟังด้วย \`@delete-event\` (kebab-case) — Vue แปลงให้อัตโนมัติ ตรงตาม \`naming-conventions.md\` ("component event names ใช้ kebab-case")

**2 · Page — confirm ก่อนลงมือทำ** — \`pages/events/index.vue:126-152\` \`handleDeleteEvent\` เปิด \`UserModal\` ผ่าน \`useAppModal().open<string>()\` เพื่อเก็บ \`actorPassword\` จากผู้ใช้ก่อน — ไม่กด confirm ก็ไม่มีอะไรเกิดขึ้น (\`if (!confirmed) return;\`)

\`\`\`ts
const handleDeleteEvent = async (eventId) => {
  const ids = Array.isArray(eventId) ? eventId : [eventId];
  if (!ids.length) return;
  const { confirmed, data: password } = await modal.open<string>({
    component: UserModal,
    props: { title: t('...deleteEvent.title'), type: 'warning' /*...*/ },
  });
  if (!confirmed) return;
  try {
    modal.setLoading(true);
    await Promise.all(ids.map((id) => deleteEvent({ id, actorPassword: password })));
    await fetchAllEvents();
    toast.success(t('...deleteEventSuccess'));
    modal.close();
  } finally {
    modal.setLoading(false);
  }
};
\`\`\`

**3 · Composable** — \`composables/systemAdmin/useSystemAdminService.ts:27-41\` \`useSystemAdminDeleteEvent\` บางๆ มาก — ไม่รู้เรื่อง modal/password เลย รู้แค่ forward request ไป Service

\`\`\`ts
export const useSystemAdminDeleteEvent = () => {
  const isLoading = ref(false);
  const systemAdminService = new services.SystemAdminService();
  const deleteEvent = async (request: IDeleteEventRequest): Promise<void> => {
    isLoading.value = true;
    try {
      await systemAdminService.deleteEvent(request);
    } finally {
      isLoading.value = false;
    }
  };
  return { isLoading, deleteEvent };
};
\`\`\`

**4 · Service → $api → Backend** — \`services/SystemAdminService.ts:297-305\` \`DELETE /system-admin/events/:id\` ส่ง \`actorPassword\` เป็น body — การตรวจรหัสผ่านจริงเกิดที่ backend (secinsight-api, \`DeleteEventUseCase\`) ไม่ใช่ repo นี้ ฝั่ง UI แค่เก็บค่าจาก modal แล้วส่งต่อ ไม่ validate/verify เอง

\`\`\`ts
async deleteEvent(request: IDeleteEventRequest): Promise<IMessageResponse> {
  return await this.api<IMessageResponse>(
    \`\${this.prefix}/events/\${request.id}\`,
    { method: 'DELETE', body: { actorPassword: request.actorPassword } }
  );
}
\`\`\`

## สรุป

เส้นทาง UI แบบทำลายข้อมูลเพิ่มสิ่งเดียวที่เส้นทางอ่านไม่มี: modal ยืนยันที่คั่นก่อนเรียก composable อยู่ที่ layer ของ Page (หรือ Component) ไม่เคยอยู่ใน composable เอง composable และ Service ยังคงบางเท่าเดิมเหมือนเส้นทางอ่าน — ฝั่ง UI ไม่เคย validate password เอง แค่เก็บค่าแล้วส่งต่อ การตรวจจริงเกิดที่ backend`,
      },
      {
        slug: "error-and-security-propagation-ui",
        titleEn: "Error & Security Propagation",
        titleTh: "การไหลของ Error และ Security",
        order: 5,
        contentEn: `These flow across the layers, not down the chain.

### Error: one place formats every error

\`plugins/api.ts\` is the one place that turns an HTTP error into an \`ApiError\` (a real class — \`utils/errors.ts:3\`). Composables never catch it, they let the page decide (and in the worked example above, the page doesn't catch either — it propagates to Nuxt's error boundary).

\`\`\`ts
async onResponseError({ response }) {
  if (response._data?.status === RESPONSE_STATUS.ERROR) {
    if (response.status === 401) {
      await authStore.logout();
    }
    throw createApiError(response._data.result.message, response.status);
  }
  throw createApiError('An error occurred, Please try again later.', response.status);
}
\`\`\`

### Security: where the token lives, what the route guard checks

\`authStore\` (Pinia) persists exactly the fields listed in \`pick\` — confirming \`accessToken\`/\`refreshToken\` really do sit in \`localStorage\` (not an httpOnly cookie). That's why this repo's \`v-html\`/DOMPurify rule is strict — XSS means the token is directly stealable.

\`\`\`ts
// stores/auth.ts:17-31
persist: {
  pick: ['roleId', 'userId', 'orgId', 'teamId', 'mfaVerified',
    'mfaEnrolled', 'isConsent', 'accessToken', 'refreshToken', 'type'],
  storage: piniaPluginPersistedstate.localStorage(),
}
\`\`\`

\`middleware/auth.ts\` checks exactly 2 things before letting a page load: is there an \`accessToken\`, and is MFA enrolled+verified — no role/permission check lives here (role gating is split into separate \`system-admin.ts\`/\`org-admin.ts\`/\`team-admin.ts\` middleware files).

\`\`\`ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  if (!authStore.accessToken) return navigateTo('/login');
  if (!authStore.isMfaEnrolled || !authStore.isMfaVerified) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } });
  }
  return;
});
\`\`\`

## Conclusion

Every HTTP error becomes an \`ApiError\` in exactly one place — \`plugins/api.ts\` — and a 401 specifically triggers an immediate logout, not a silent retry. Auth tokens live in \`localStorage\` (not an httpOnly cookie), which is the real reason the app's \`v-html\` sanitization rule is strict; and the base \`auth\` route guard checks only session-presence and MFA status, with role-based gating deliberately split into its own separate middleware files.`,
        contentTh: `สองเรื่องนี้ไหลข้ามเลเยอร์ ไม่ได้ไหลลงตามสาย

### Error: จุดเดียวที่ format error ทั้งแอป

\`plugins/api.ts\` คือจุดเดียวที่แปลง HTTP error เป็น \`ApiError\` (จริง — \`utils/errors.ts:3\`) composable ไม่เคย catch มัน แค่ปล่อยให้ page จัดการ (page เองก็ไม่ catch เช่นกันในตัวอย่างข้างบน — error หลุดไปให้ Nuxt error boundary)

\`\`\`ts
async onResponseError({ response }) {
  if (response._data?.status === RESPONSE_STATUS.ERROR) {
    if (response.status === 401) {
      await authStore.logout();
    }
    throw createApiError(response._data.result.message, response.status);
  }
  throw createApiError('An error occurred, Please try again later.', response.status);
}
\`\`\`

### Security: token อยู่ใน localStorage, route guard คืออะไร

\`authStore\` (Pinia) persist เฉพาะ field ที่ระบุใน \`pick\` — เห็นชัดว่า \`accessToken\`/\`refreshToken\` ลง \`localStorage\` จริง (ไม่ใช่ httpOnly cookie) นี่คือเหตุผลที่กฎ \`v-html\`/DOMPurify ของ repo นี้เข้มงวด (XSS = ขโมย token ได้ตรงๆ)

\`\`\`ts
// stores/auth.ts:17-31
persist: {
  pick: ['roleId', 'userId', 'orgId', 'teamId', 'mfaVerified',
    'mfaEnrolled', 'isConsent', 'accessToken', 'refreshToken', 'type'],
  storage: piniaPluginPersistedstate.localStorage(),
}
\`\`\`

\`middleware/auth.ts\` เช็กแค่ 2 อย่างก่อนปล่อยเข้าเพจ: มี \`accessToken\` ไหม และ MFA enroll+verify แล้วหรือยัง — ไม่มีการเช็ก role/permission ในนี้ (role gate แยกไปที่ \`system-admin.ts\`/\`org-admin.ts\`/\`team-admin.ts\` middleware คนละไฟล์)

\`\`\`ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  if (!authStore.accessToken) return navigateTo('/login');
  if (!authStore.isMfaEnrolled || !authStore.isMfaVerified) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } });
  }
  return;
});
\`\`\`

## สรุป

HTTP error ทุกตัวกลายเป็น \`ApiError\` ที่จุดเดียวเท่านั้น — \`plugins/api.ts\` — และ 401 โดยเฉพาะจะสั่ง logout ทันที ไม่ใช่ silent retry auth token อยู่ใน \`localStorage\` (ไม่ใช่ httpOnly cookie) ซึ่งเป็นเหตุผลจริงที่กฎ sanitize \`v-html\` ของแอปเข้มงวด และ middleware \`auth\` พื้นฐานเช็กแค่ว่ามี session กับสถานะ MFA เท่านั้น ส่วนการเช็ก role ถูกแยกไปเป็น middleware คนละไฟล์โดยตั้งใจ`,
      },
      {
        slug: "naming-conventions-real-gap",
        titleEn: "Naming Conventions — Real, Plus One Real Gap",
        titleTh: "Naming Conventions — ของจริง พร้อมช่องว่างจริงหนึ่งจุด",
        order: 6,
        contentEn: `Table pulled from \`.claude/rules/naming-conventions.md\`, matched against real examples from the events flow traced in earlier lessons.

| Prefix | Usage | Real example found |
| --- | --- | --- |
| \`handle*\` | UI event handler | \`handleDeleteEvent\`, \`handleSearch\` (\`pages/events/index.vue\`) |
| \`fetch*\` | Data fetch from API | \`fetchEvents\` (\`useEventService.ts\`), \`fetchAllEvents\` (page-local wrapper) |
| \`is*\` | Boolean flag | \`isEventListLoading\` (ref), \`isAdmin\` (computed) |
| \`list*\` | Array of entities | \`listEvents\` (\`useEventService.ts:10\`) — the page then aliases it: \`listEvents: events\` |
| \`*State\` | Grouped state object | \`filterState\`, \`sortState\` (\`pages/events/index.vue\`) |
| \`use<Domain><Op>\` | Composable — never carries "Service" | \`useEventList\`, \`useSystemAdminDeleteEvent\` |

**Where the real code doesn't 100% match the rule on a fast read.** The rule's own example composable file is named \`event/useEventService.ts\` (has "Service" in it), while the Function Naming rule says a composable function must never carry "Service." Real code satisfies both simultaneously: the file is \`useEventService.ts\` (grouped by service domain), but every exported function — \`useEventList\`, \`useEventDetail\`, \`useThaiEventList\` — carries zero "Service" in its name. Not a real contradiction, just two different naming rules (file vs. function) that read as conflicting at a glance.

## Conclusion

Six real prefixes with real examples: \`handle*\`, \`fetch*\`, \`is*\`, \`list*\`, \`*State\`, \`use<Domain><Op>\`. The one place a fast read looks contradictory — a composable *file* named \`useEventService.ts\` next to a rule banning "Service" from composable *function* names — resolves once you notice the rule is about the function, not the file grouping it lives in.`,
        contentTh: `ตารางจาก \`.claude/rules/naming-conventions.md\` จับคู่กับตัวอย่างจริงจาก events flow ที่ไล่มาในบทเรียนก่อนหน้า

| Prefix | ใช้กับ | ตัวอย่างจริงที่เจอ |
| --- | --- | --- |
| \`handle*\` | UI event handler | \`handleDeleteEvent\`, \`handleSearch\` (\`pages/events/index.vue\`) |
| \`fetch*\` | ดึงข้อมูลจาก API | \`fetchEvents\` (\`useEventService.ts\`), \`fetchAllEvents\` (page-local wrapper) |
| \`is*\` | boolean flag | \`isEventListLoading\` (ref), \`isAdmin\` (computed) |
| \`list*\` | array ของ entity | \`listEvents\` (\`useEventService.ts:10\`) — page then aliases it: \`listEvents: events\` |
| \`*State\` | grouped state object | \`filterState\`, \`sortState\` (\`pages/events/index.vue\`) |
| \`use<Domain><Op>\` | composable, ไม่มีคำว่า "Service" ต่อท้าย | \`useEventList\`, \`useSystemAdminDeleteEvent\` |

**จุดที่โค้ดจริงไม่ตรงกับกฎ 100% เมื่ออ่านเร็วๆ** กฎบอกไฟล์ composable ตัวอย่างคือ \`event/useEventService.ts\` เอง (ชื่อไฟล์มีคำว่า "Service") ในขณะที่กฎ Function Naming บอกให้ composable function ห้ามมีคำ "Service" — โค้ดจริงทำถูกทั้งคู่พร้อมกัน: ไฟล์ชื่อ \`useEventService.ts\` (กลุ่มไฟล์ตาม service) แต่ function ที่ export ชื่อ \`useEventList\`, \`useEventDetail\`, \`useThaiEventList\` ไม่มีคำ "Service" เลยสักตัว — ไม่ใช่ข้อขัดแย้ง แค่เป็นคนละกฎ (ไฟล์ vs. function) ที่อ่านเร็วๆ อาจเข้าใจผิดว่าขัดกัน

## สรุป

หก prefix จริงพร้อมตัวอย่างจริง: \`handle*\`, \`fetch*\`, \`is*\`, \`list*\`, \`*State\`, \`use<Domain><Op>\` จุดเดียวที่อ่านเร็วๆ แล้วดูเหมือนขัดแย้งกัน — ไฟล์ composable ชื่อ \`useEventService.ts\` อยู่ข้างๆ กฎที่ห้ามคำว่า "Service" ใน function ของ composable — คลี่คลายได้ทันทีที่สังเกตว่ากฎพูดถึง function ไม่ใช่ไฟล์ที่จัดกลุ่มมันไว้`,
      },
      {
        slug: "use-graphify-instead-of-grep-ui",
        titleEn: "Use graphify Instead of grep",
        titleTh: "ใช้ graphify แทน grep",
        order: 7,
        contentEn: `\`secinsight-ui\` ships \`graphify-out/\` just like \`secinsight-api\` — same command set, per the org-shared convention.

| You want | Run |
| --- | --- |
| Who calls this component / what does it call | \`graphify explain "EventTable"\` |
| Trace a page → composable → service chain | chain \`explain\` per hop — **not** \`graphify path\` |
| Find files by pattern | \`graphify query "<pattern>"\` |

## Conclusion

Same tool, same reasoning as the sibling API guide: \`graphify explain\` answers "who calls this / what does it call" faster than grepping blind, across both repos in this org.`,
        contentTh: `\`secinsight-ui\` มี \`graphify-out/\` เหมือน \`secinsight-api\` — คำสั่งชุดเดียวกันตาม org-shared convention

| ต้องการ | คำสั่ง |
| --- | --- |
| ใครเรียกคอมโพเนนต์นี้ / เรียกอะไรต่อ | \`graphify explain "EventTable"\` |
| ไล่ page → composable → service | ไล่ \`explain\` ทีละ hop — **ไม่ใช้** \`graphify path\` |
| หาไฟล์ตาม pattern | \`graphify query "<pattern>"\` |

## สรุป

เครื่องมือเดียวกัน เหตุผลเดียวกันกับคู่มือฝั่ง API — \`graphify explain\` ตอบคำถาม "ใครเรียกสิ่งนี้ / สิ่งนี้เรียกอะไร" ได้เร็วกว่าการ grep แบบเดาสุ่ม ใช้ได้ทั้งสอง repo ในองค์กรนี้`,
      },
      {
        slug: "the-reusable-method-ui",
        titleEn: "The Reusable Method",
        titleTh: "วิธีการที่ใช้ซ้ำได้",
        order: 8,
        contentEn: `Apply this to any page in the project, front to back.

1. Find the folder under \`pages/\` matching the URL — folder path IS the URL, \`[id]\` is a dynamic segment.
2. Open the page's \`<script setup>\` — find the composable(s) destructured near the top; skip the template on the first pass.
3. Go back to the page's template — which component actually renders (often a \`v-if\` switching by role) — then check whether that component emits an event up to the page or calls a composable directly itself (both real patterns coexist).
4. Open the composable file (\`composables/<domain>/use<Domain>Service.ts\`) — read the specific hook used; see which refs it owns and which Service method it calls.
5. Open the Service class (\`services/<Domain>Service.ts\`) — confirm the real URL prefix + HTTP verb; that's the actual endpoint contract.
6. Skip \`plugins/api.ts\` unless debugging the auth header or error shape — it's identical for every call.
7. If it's a write/destructive action, check whether the handler has a \`useAppModal().open(...)\` gate before the composable call — confirmation/password UI usually lives at the component or page layer, not the composable.
8. Check for \`try/finally\` (not \`try/catch\`) around the service call — the signal that \`$api\`'s global error handling is being trusted correctly.
9. Backend behavior (validation, authz, password verify) is out of scope for this repo — cross-reference the sibling SecInsight API course.

Everything below this lesson is the advanced tier — assumes lessons 1-8 have been read.

## Conclusion

Nine steps, applied identically to every page in this repo: folder-as-URL → page composables → template component pattern → composable → Service → (skip \`$api\` unless debugging) → modal-gate check for writes → \`try/finally\` check → cross-reference the backend course for anything server-side. This closes out the onboarding tier — the remaining lessons cover architecture decisions specific to this app, not the general method.`,
        contentTh: `ใช้ขั้นตอนนี้กับหน้าไหนก็ได้ในโปรเจกต์

1. หาโฟลเดอร์ใน \`pages/\` ที่ตรง URL — folder path = URL ตรงตัว, \`[id]\` = dynamic segment
2. เปิด \`<script setup>\` ของ page — หา composable ที่ destructure ไว้ต้นไฟล์ ข้าม template ไปก่อนรอบแรก
3. กลับไปดู template ของ page — component ไหน render จริง (มักมี \`v-if\` สลับตาม role) แล้วเช็กว่า component นั้น emit event ขึ้นมาให้ page หรือเรียก composable เองตรงๆ (2 pattern จริง อยู่คู่กัน)
4. เปิดไฟล์ composable (\`composables/<domain>/use<Domain>Service.ts\`) — อ่าน hook ที่ใช้จริง ดูว่าถือ ref อะไรบ้างและเรียก Service method ไหน
5. เปิด Service class (\`services/<Domain>Service.ts\`) — ยืนยัน URL prefix + HTTP verb จริง นั่นคือ endpoint contract ตัวจริง
6. ข้าม \`plugins/api.ts\` ได้ถ้าไม่ได้ debug auth header/error shape — มันเหมือนกันทุก call อยู่แล้ว
7. ถ้าเป็น write/destructive action เช็กว่า handler มี \`useAppModal().open(...)\` คั่นก่อน composable call ไหม — UI ยืนยัน/รหัสผ่านมักอยู่ที่ component หรือ page layer ไม่ใช่ composable
8. เช็ก \`try/finally\` (ไม่ใช่ \`try/catch\`) รอบ service call — เป็นสัญญาณว่า global error handling ของ \`$api\` ถูกใช้ถูกทาง
9. พฤติกรรม backend (validate/authz/verify password) อยู่นอกขอบเขต repo นี้ — ดูคู่ฉบับคอร์ส SecInsight API แทน

ต่อจากนี้คือระดับ advanced — สมมุติว่าอ่านบทเรียนที่ 1–8 มาแล้ว

## สรุป

เก้าขั้นตอน ใช้แบบเดียวกันกับทุกหน้าใน repo นี้: folder-คือ-URL → composable ของ page → pattern ของ component ใน template → composable → Service → (ข้าม \`$api\` ถ้าไม่ได้ debug) → เช็ก modal-gate สำหรับ write → เช็ก \`try/finally\` → อ้างอิงคอร์ส backend สำหรับสิ่งที่เกิดฝั่ง server บทเรียนนี้ปิดท้ายระดับ onboarding — บทเรียนที่เหลือพูดถึงการตัดสินใจด้านสถาปัตยกรรมเฉพาะของแอปนี้ ไม่ใช่วิธีการทั่วไปอีกต่อไป`,
      },
      {
        slug: "csr-only-ssr-false",
        titleEn: "The App Is CSR-Only — ssr: false",
        titleTh: "แอปนี้เป็น CSR-Only — ssr: false",
        order: 9,
        contentEn: `Before assuming this is a typical SSR app (Nuxt's default) — check first. This repo sets \`ssr: false\` directly. Everything in the onboarding lessons (Component → Page → Composable → Service → \`$api\` → Backend) runs entirely client-side — there's no real server render.

\`\`\`ts
// nuxt.config.ts:16
export default defineNuxtConfig({
  // ...
  ssr: false,
  // ...
});
\`\`\`

**The consequence — confirmed by grep, not assumed.** \`useAsyncData\`/\`useFetch\` (Nuxt's SSR-aware data-fetching APIs) have zero real usages across \`pages/\` — consistent with \`ssr: false\`, since there's no server-side hydration to actually sync. Every page instead uses a plain composable + \`onMounted\` (see the worked-example lessons). This is a deliberate architectural choice, not an incomplete one.

Meaning: SEO/first-paint content never comes from a server here. If new code starts reaching for \`useAsyncData\`, that's a signal someone assumed this was an SSR app — worth asking before following it.

## Conclusion

\`ssr: false\` is set directly in \`nuxt.config.ts\`, and a zero-usage grep for \`useAsyncData\`/\`useFetch\` across the whole \`pages/\` directory confirms the app actually behaves that way — no page secretly relies on server hydration. Any new code reaching for those APIs is worth questioning before merging, since it would contradict a confirmed, deliberate architectural choice.`,
        contentTh: `ก่อนเชื่อว่าเป็น SSR app ทั่วไป (Nuxt default) เช็กก่อน — repo นี้ตั้ง \`ssr: false\` ตรงๆ ทุกอย่างในบทเรียน onboarding (Component → Page → Composable → Service → \`$api\` → Backend) รันฝั่ง client ล้วน ไม่มี server-side render จริง

\`\`\`ts
// nuxt.config.ts:16
export default defineNuxtConfig({
  // ...
  ssr: false,
  // ...
});
\`\`\`

**ผลที่ตามมา — ยืนยันด้วย grep จริง** \`useAsyncData\`/\`useFetch\` (Nuxt's SSR-aware data-fetching APIs) มี 0 จุดใช้งาน ทั่ว \`pages/\` — สอดคล้องกับ \`ssr: false\` เพราะไม่มี server-side hydration ให้ต้อง sync ด้วยจริง ทุกหน้าจึงใช้ composable ธรรมดา + \`onMounted\` (ดูบทเรียน worked example) แทน — นี่คือทางเลือกทางสถาปัตยกรรมที่ตั้งใจ ไม่ใช่ความไม่สมบูรณ์

แปลว่า: SEO/first-paint content ไม่ได้มาจาก server เลย ถ้าเห็นโค้ดใหม่เริ่มใช้ \`useAsyncData\` นั่นคือสัญญาณว่าใครบางคนคิดว่านี่เป็น SSR app — ควรถามก่อนทำตาม

## สรุป

\`ssr: false\` ถูกตั้งตรงๆ ใน \`nuxt.config.ts\` และการ grep หา \`useAsyncData\`/\`useFetch\` ทั่ว \`pages/\` แล้วเจอ 0 จุด ยืนยันว่าแอปทำงานตามนั้นจริง — ไม่มีหน้าไหนแอบพึ่งพา server hydration โค้ดใหม่ที่เริ่มใช้ API เหล่านั้นควรถูกตั้งคำถามก่อน merge เพราะมันขัดกับทางเลือกทางสถาปัตยกรรมที่ยืนยันแล้วว่าตั้งใจ`,
      },
      {
        slug: "state-management-advanced-single-modal",
        titleEn: "State Management, Advanced — The Single In-Flight Modal",
        titleTh: "State Management ขั้นสูง — Modal ที่เปิดได้ทีละอันเท่านั้น",
        order: 10,
        contentEn: `\`useAppModal\` is not just an open/close wrapper — it enforces "only one modal can be in-flight for the whole app" through a single module-level resolver, not store state.

\`\`\`ts
// composables/useAppModal.ts:1-36
type TModalResolver<T> = (result: TModalResult<T>) => void;
let resolver: TModalResolver<unknown> | null = null; // module-level, not inside useAppModal()
const CANCEL_RESULT: TModalResult<never> = { confirmed: false, data: null };

export const useAppModal = () => {
  const store = useModalStore();
  function open<T>(config): Promise<TModalResult<T>> {
    return new Promise((resolve) => {
      resolver?.(CANCEL_RESULT); // cancel whatever modal was still open
      resolver = resolve;
      store.open(config.component, config.props ?? {});
    });
  }
  const submit = <T>(data: T): void => {
    resolver?.({ confirmed: true, data });
    resolver = null;
  };
  // cancel/close both resolve CANCEL_RESULT then null the resolver
};
\`\`\`

**What this one line prevents:** \`resolver?.(CANCEL_RESULT);\`. If code path A opens a modal and it's still unresolved (user hasn't clicked yet), then code path B opens another modal on top — A's promise would otherwise hang forever (a leaked, never-resolving \`await\`). It gets resolved to \`CANCEL_RESULT\` immediately when B opens, because the resolver is one module-level variable, not per-modal — opening a new one always auto-cancels the old one.

**Why it must be module-level, not a ref inside \`useAppModal()\`:** every component calling \`useAppModal()\` needs to share the exact same resolver, not get its own per-instance one — the same pattern as \`scriptLoaded\` in \`useRecaptcha.ts\` (see the next lesson).

## Conclusion

A single module-level \`resolver\` variable — not a ref, not store state — is what guarantees at most one modal's promise is ever pending at a time. Opening a second modal auto-cancels the first rather than leaving its promise to hang forever, and this only works because every caller of \`useAppModal()\` shares the same module-scoped variable instead of getting a private one.`,
        contentTh: `\`useAppModal\` ไม่ใช่แค่ wrapper เปิด/ปิด modal — มันคุม "มี modal ได้ทีละ 1 อันเท่านั้นทั้งแอป" ผ่าน resolver ตัวเดียวระดับ module ไม่ใช่ store state

\`\`\`ts
// composables/useAppModal.ts:1-36
type TModalResolver<T> = (result: TModalResult<T>) => void;
let resolver: TModalResolver<unknown> | null = null; // module-level, not inside useAppModal()
const CANCEL_RESULT: TModalResult<never> = { confirmed: false, data: null };

export const useAppModal = () => {
  const store = useModalStore();
  function open<T>(config): Promise<TModalResult<T>> {
    return new Promise((resolve) => {
      resolver?.(CANCEL_RESULT); // cancel whatever modal was still open
      resolver = resolve;
      store.open(config.component, config.props ?? {});
    });
  }
  const submit = <T>(data: T): void => {
    resolver?.({ confirmed: true, data });
    resolver = null;
  };
  // cancel/close both resolve CANCEL_RESULT then null the resolver
};
\`\`\`

**สิ่งที่บรรทัดเดียวนี้ป้องกัน:** \`resolver?.(CANCEL_RESULT);\` ถ้า code path A เปิด modal แล้วยังไม่ resolve (user ยังไม่กด) แล้ว code path B เปิด modal อีกอันทับ — promise ของ A จะไม่ค้างตลอดไป (memory leak / await ที่ไม่มีวัน resolve) มันถูก resolve เป็น \`CANCEL_RESULT\` ทันทีตอน B เปิด เพราะ resolver เป็นตัวแปรเดียวระดับ module ไม่ใช่ per-modal — เปิดอันใหม่ = auto-cancel อันเก่าเสมอ

**เหตุผลที่ต้องเป็น module-level ไม่ใช่ ref ภายใน \`useAppModal()\`:** ทุก component ที่เรียก \`useAppModal()\` ต้องแชร์ resolver ตัวเดียวกัน ไม่ใช่คนละตัวต่อ instance — เหมือน pattern เดียวกับ \`scriptLoaded\` ใน \`useRecaptcha.ts\` (ดูบทเรียนถัดไป)

## สรุป

ตัวแปร \`resolver\` เดียวระดับ module — ไม่ใช่ ref ไม่ใช่ store state — คือสิ่งที่การันตีว่ามี promise ของ modal ค้างอยู่ได้อย่างมากทีละหนึ่งตัว การเปิด modal ที่สองจะ auto-cancel ตัวแรกแทนที่จะปล่อยให้ promise ของมันค้างตลอดไป และมันทำงานได้เพราะทุกคนที่เรียก \`useAppModal()\` แชร์ตัวแปรเดียวกันระดับ module ไม่ได้รับตัวส่วนตัวของตัวเอง`,
      },
      {
        slug: "browser-integration-recaptcha",
        titleEn: "Browser Integration, Advanced — reCAPTCHA Enterprise Load Sequence",
        titleTh: "Browser Integration ขั้นสูง — ลำดับการโหลด reCAPTCHA Enterprise",
        order: 11,
        contentEn: `The 5 pages most exposed to bot abuse (login, forgot-password, reset, mfa enroll/verify) all call \`useRecaptcha()\` before real use — trace how vanilla script injection mixes with the Vue lifecycle.

**Sequence:** \`onMounted\` → \`installStub\` → \`loadScript\` → \`scriptLoaded\` → \`getRecaptchaToken\`

**Real call sites — verified.** \`pages/login/index.vue:30\`, \`pages/account/forgot-password/index.vue:22\`, \`pages/account/reset/index.vue:30\`, \`pages/account/mfa/enroll/index.vue:45\`, \`pages/account/mfa/verify/index.vue:24\` — all 5 call \`useRecaptcha()\` directly in \`setup\`, not through another wrapper.

## Conclusion

Every bot-exposed page in the app calls \`useRecaptcha()\` directly in its own \`setup()\`, not through a shared wrapper component — the five real call sites are the actual, verified source of truth for where reCAPTCHA gets wired in, not an assumption from the feature list.`,
        contentTh: `endpoint ที่เสี่ยง bot abuse ที่สุด 5 หน้า (login, forgot-password, reset, mfa enroll/verify) เรียก \`useRecaptcha()\` ก่อนใช้งานจริง — ไล่ทีละสเต็ปว่า vanilla script injection ผสมกับ Vue lifecycle ยังไง

**ลำดับ:** \`onMounted\` → \`installStub\` → \`loadScript\` → \`scriptLoaded\` → \`getRecaptchaToken\`

**real call sites — ตรวจแล้ว** \`pages/login/index.vue:30\`, \`pages/account/forgot-password/index.vue:22\`, \`pages/account/reset/index.vue:30\`, \`pages/account/mfa/enroll/index.vue:45\`, \`pages/account/mfa/verify/index.vue:24\` — ทั้ง 5 จุดเรียก \`useRecaptcha()\` ตรงๆ ใน setup ไม่ใช่ผ่าน wrapper อื่น

## สรุป

ทุกหน้าที่เสี่ยง bot ในแอปเรียก \`useRecaptcha()\` ตรงๆ ใน \`setup()\` ของตัวเอง ไม่ได้ผ่าน wrapper component ที่ใช้ร่วมกัน — ห้า call site จริงคือแหล่งความจริงที่ตรวจสอบแล้วว่า reCAPTCHA ถูกต่อเข้าไปตรงไหน ไม่ใช่การเดาจากรายการฟีเจอร์`,
      },
      {
        slug: "security-boundary-debt-audit",
        titleEn: "Security Boundary + An Exhaustive Debt Audit",
        titleTh: "Security Boundary + การ Audit หนี้ทางเทคนิคแบบละเอียด",
        order: 12,
        contentEn: `The final onboarding-adjacent lesson: the one real place raw HTML enters the app, followed by two real audits — not just theory from \`security.md\`.

### The one v-html in the whole repo — and it follows the rule

Grepping \`v-html\` across \`components/\` + \`pages/\` finds exactly one: \`EventDetailCard.vue\` — rendering an event's markdown description as HTML.

\`\`\`ts
// components/Shared/Event/EventDetailCard.vue:89-112
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
const md = new MarkdownIt({ breaks: true, linkify: true });
const descriptionHtml = computed(() => {
  if (!props.eventDetail.description) return '';
  return DOMPurify.sanitize(md.render(props.eventDetail.description));
});
\`\`\`

This matches the pattern \`security.md\` sanctions exactly: sanitized inside a \`computed\`, never inline in the template, never binding raw markdown directly — the HTML originates from a MISP event description (data from an external threat-intel feed, so it must be treated as untrusted).

### Audit 1 — modal pattern migration, quantified

\`CLAUDE.md\` bans per-modal \`isOpen*\` refs, mandating \`useAppModal()\` instead — the real repo-wide grep:

| Pattern | Files found |
| --- | --- |
| \`useAppModal()\` (compliant) | 9 |
| \`isOpen*Modal = ref(...)\` (legacy) | 4 — \`OrgAdminFormUserUpdate.vue\`, \`SystemAdminFormUserMultiple.vue\`, \`SystemAdminFormUserSingle.vue\`, \`EventDetailCard.vue\` |

69% (9/13) already migrated to the new pattern — the remaining 4 aren't "silently breaking the rule," they're debt not yet touched under rename-on-touch (whoever next touches these files should migrate them then).

### Audit 2 — a getter with zero callers

\`authStore.getRefreshToken\` (\`stores/auth.ts:58\`) really exists, really persists (\`refreshToken\` is in the \`pick\` list) — but grepping \`getRefreshToken\` across the whole repo (outside its own definition) finds zero call sites.

**What this actually means:** a refresh token is captured and persisted to \`localStorage\` on every login — but no logic in the app ever reads it back. When a token expires (401), \`plugins/api.ts\` responds with a direct \`authStore.logout()\` (see the error-propagation lesson), not a silent refresh — so the stored refresh token is dead data. Not a bug that breaks anything, but an attack surface (a secret sitting in \`localStorage\`) paying for zero functionality.

## Conclusion

The one real \`v-html\` in the codebase follows the security rule exactly — sanitized inside a \`computed\`, on genuinely untrusted external data. Two honest audits went further than that single check: the modal-pattern migration is 69% complete with 4 named files still owing the rename-on-touch debt, and a persisted \`refreshToken\` is captured on every login but read by zero lines of code — a real attack surface earning nothing in return. Auditing what the code actually does beats trusting what the docs claim it does.`,
        contentTh: `บทเรียนสุดท้ายในกลุ่มใกล้เคียง onboarding: จุดเดียวที่ HTML ดิบเข้าแอปจริงๆ แล้วตามด้วยการ audit สองเรื่อง ไม่ใช่แค่ทฤษฎีจาก \`security.md\`

### v-html จุดเดียวในทั้ง repo — และมันทำถูกตามกฎ

grep \`v-html\` ทั่ว \`components/\` + \`pages/\` เจอที่เดียว: \`EventDetailCard.vue\` — render markdown description ของ event เป็น HTML

\`\`\`ts
// components/Shared/Event/EventDetailCard.vue:89-112
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
const md = new MarkdownIt({ breaks: true, linkify: true });
const descriptionHtml = computed(() => {
  if (!props.eventDetail.description) return '';
  return DOMPurify.sanitize(md.render(props.eventDetail.description));
});
\`\`\`

ตรงตาม pattern ที่ \`security.md\` อนุญาต 100%: sanitize อยู่ใน \`computed\`, ไม่ inline ใน template, ไม่ bind markdown ดิบตรงๆ — HTML ที่มาจาก MISP event description (ข้อมูลจาก threat intel feed ภายนอก จึงต้องถือว่า untrusted)

### Audit 1 — modal pattern migration, วัดผลจริง

\`CLAUDE.md\` บอกห้าม per-modal \`isOpen*\` ref แล้วให้ใช้ \`useAppModal()\` เท่านั้น — grep จริงทั้ง repo:

| Pattern | ไฟล์ที่เจอ |
| --- | --- |
| \`useAppModal()\` (ตามกฎ) | 9 |
| \`isOpen*Modal = ref(...)\` (legacy) | 4 — \`OrgAdminFormUserUpdate.vue\`, \`SystemAdminFormUserMultiple.vue\`, \`SystemAdminFormUserSingle.vue\`, \`EventDetailCard.vue\` |

69% (9/13) migrated ไปที่ pattern ใหม่แล้ว — 4 ไฟล์ที่เหลือไม่ได้ "ผิดกฎเงียบๆ" มันคือ debt ที่ยังไม่ถูก touch ตาม rename-on-touch (touch ไฟล์นี้เมื่อไหร่ ต้อง migrate ไปด้วย)

### Audit 2 — getter ที่ไม่มีใครเรียกเลย

\`authStore.getRefreshToken\` (\`stores/auth.ts:58\`) มีอยู่จริง, persist จริง (\`refreshToken\` อยู่ใน \`pick\` list) — แต่ grep \`getRefreshToken\` ทั้ง repo (นอกไฟล์ definition) เจอ 0 จุดเรียกใช้

**แปลว่าอะไรจริงๆ:** refresh token ถูกเก็บและ persist ลง \`localStorage\` ทุกครั้งที่ login — แต่ไม่มี logic ไหนในแอปเคยอ่านมันไปใช้จริง เมื่อ token หมดอายุ (401) \`plugins/api.ts\` ตอบด้วย \`authStore.logout()\` ตรงๆ (ดูบทเรียนเรื่อง error propagation) ไม่ใช่ silent refresh — refresh token ที่เก็บไว้จึงเป็น dead data ไม่ใช่ bug ที่พังอะไร แต่เป็นพื้นผิวโจมตี (attack surface) ที่ไม่มีประโยชน์อะไรตอบแทน — เก็บ secret ไว้เฉยๆ โดยไม่มีใครใช้

## สรุป

\`v-html\` จุดเดียวจริงในโค้ดทำตามกฎ security เป๊ะ — sanitize ใน \`computed\` บนข้อมูลภายนอกที่ untrusted จริงๆ การ audit สองเรื่องไปไกลกว่าการเช็กจุดเดียวนั้น: modal-pattern migration เสร็จไปแล้ว 69% เหลือ 4 ไฟล์ที่ยังติดหนี้ rename-on-touch และ \`refreshToken\` ที่ persist ทุกครั้งที่ login แต่ไม่มีโค้ดบรรทัดไหนอ่านมันเลย — เป็นพื้นผิวโจมตีจริงที่ไม่ได้อะไรตอบแทนมา การ audit ว่าโค้ดทำอะไรจริงๆ ดีกว่าการเชื่อว่าเอกสารพูดถูก`,
      },
      {
        slug: "end-to-end-first-login",
        titleEn: "End-to-End — First Login to a Protected Page",
        titleTh: "End-to-End — จาก Login ครั้งแรกถึงหน้าที่ป้องกันไว้",
        order: 13,
        contentEn: `Every lesson before this traced one piece in isolation — one chain, one middleware, one composable. This is the whole picture: a user who's never logged in pastes the \`/events\` URL directly — how many real files does that hit before the actual page renders? Traced hop by hop across 11 real files.

**1 - Blocked at the target page** — \`pages/events/index.vue:45-47\` → \`middleware/auth.ts\`. The route requires \`middleware: 'auth'\` first — \`authStore.accessToken\` is empty (never logged in) → immediately bounced to \`/login\`. Nothing in the events page ever renders.

\`\`\`ts
if (!authStore.accessToken) {
  return navigateTo('/login');
}
\`\`\`

**2 - The login page has its own gate, too** — \`pages/login/index.vue:19-22\` → \`middleware/unauthenticated.ts\`. \`/login\` is not a wide-open page — it carries its own \`middleware: ['unauthenticated']\`. If the user already had every token (a redundant login), they'd be bounced straight back to \`/\`. In this case (no token at all), it just lets the login form render.

\`\`\`ts
if (!authStore.accessToken) {
  await authStore.logout(); // clears any stale partial state
  return; // let the login page render
}
// ...else: already has a token -> bounce to mfa-enroll / mfa-verify / '/' depending on state
\`\`\`

**3 - Submit credentials** — \`pages/login/index.vue:34-40\` → \`composables/auth/useAuthService.ts:12-26\`. Login succeeds → \`authStore.setInitialToken(result)\` stores the token — it doesn't go straight to \`/\`, it always routes through \`/account/mfa/verify\` via \`useGuardRedirect\` (it doesn't yet know if this user has MFA enrolled).

\`\`\`ts
const handleLogin = async (formUserLogin) => {
  const result = await login(formUserLogin);
  await authStore.setInitialToken(result);
  toast.success(/*...*/);
  await useGuardRedirect('/account/mfa/verify');
};
\`\`\`

**4 - mfa-verify gate detours a first-timer** — \`middleware/mfaVerify.ts\`. This user never enrolled MFA (\`isMfaEnrolled === false\`) — the verify page's own middleware catches this and redirects to \`/account/mfa/enroll\` instead, rather than showing a verify form that couldn't work anyway.

\`\`\`ts
if (!authStore.isMfaEnrolled) {
  return navigateTo('/account/mfa/enroll');
}
\`\`\`

**5 - Enroll — QR code, then one OTP does double duty** — \`pages/account/mfa/enroll/index.vue:44-66\` → \`composables/auth/useAuthService.ts:62-98\`. On mount it fetches the QR code (\`getEnrollMfa\`); the user scans it and submits the first OTP — one response sets both \`mfaVerified\` and \`mfaEnrolled\` at once (first-time enroll counts as verify too, no second OTP needed).

\`\`\`ts
const handleVerifyMfaEnroll = async (enrollOtp) => {
  const result = await enrollVerifyMfa({ otp: enrollOtp });
  if (result) {
    authStore.setMfaVerified(result.mfaVerified);
    authStore.setMfaEnabled(result.mfaEnabled); // note: sets state.mfaEnrolled -- method name says "Enabled"
  }
  await useGuardRedirect('/');
};
\`\`\`

A small real detail: the method is named \`setMfaEnabled\` but mutates the \`state.mfaEnrolled\` field — the name doesn't fully sync with the field. No behavior impact, just real naming drift found while tracing.

**6 - Back through the gate — this time it passes** — \`middleware/auth.ts\` (re-run on the redirected navigation). \`useGuardRedirect('/')\` sends the user to \`/\` (or the original blocked path, if a \`?redirect=\` query survived the whole chain) — \`authMiddleware\` runs again: \`accessToken\` ✓, \`isMfaEnrolled\` ✓, \`isMfaVerified\` ✓ — every check now passes.

**7 - One more gate before content — the consent dialog** — \`layouts/default.vue:10-24\`. \`authMiddleware\`'s own comment says it directly: "consent dialog will overlay if needed" — \`layouts/default.vue\` calls \`checkConsent()\` from \`useUserServiceConsent()\` on mount, showing \`<AppConsentDialog>\` if the user hasn't accepted yet — only after that does the real events page appear.

**The 11 real files this journey touches:** \`pages/events/index.vue\` · \`middleware/auth.ts\` · \`pages/login/index.vue\` · \`middleware/unauthenticated.ts\` · \`composables/auth/useAuthService.ts\` · \`composables/auth/useGuardRedirect.ts\` · \`middleware/mfaVerify.ts\` · \`pages/account/mfa/enroll/index.vue\` · \`stores/auth.ts\` · \`layouts/default.vue\` · the \`useUserServiceConsent\` composable — no single file "knows" the whole journey. Each one only knows its own rule, checked against \`authStore\`'s current state. The full journey is an emergent result of several small independent rules firing in sequence, not one script driving every step.

## Conclusion

A first-time visit to a protected page touches 11 real files and crosses 7 distinct gates — none of which knows about the others. \`middleware/auth.ts\` checks session + MFA status only; role gating, consent, and the MFA enrollment flow all live in separate files, each checking \`authStore\`'s current state independently. The user's actual journey is what emerges when all of them fire in sequence, not a single controller orchestrating the whole thing — which is exactly the same "no single file knows the whole picture" property this course's fixed-chain lessons kept demonstrating one layer at a time.`,
        contentTh: `ทุกบทเรียนก่อนหน้าคือชิ้นส่วนแยกกัน — chain เดียว, middleware ตัวเดียว, composable ตัวเดียว บทเรียนนี้คือภาพเต็ม: user ที่ไม่เคย login มาก่อน กด URL หน้า \`/events\` ตรงๆ ต้องผ่านกี่ไฟล์จริงกว่าจะเห็นหน้าจริง — ไล่ทีละ hop ข้าม 11 ไฟล์จริง

**1 · Blocked at the target page** — \`pages/events/index.vue:45-47\` → \`middleware/auth.ts\` route ต้องผ่าน \`middleware: 'auth'\` ก่อน — \`authStore.accessToken\` ว่างเปล่า (ไม่เคย login) → เด้งไป \`/login\` ทันที ไม่มีอะไรใน events page render เลย

\`\`\`ts
if (!authStore.accessToken) {
  return navigateTo('/login');
}
\`\`\`

**2 · The login page has its own gate, too** — \`pages/login/index.vue:19-22\` → \`middleware/unauthenticated.ts\` \`/login\` ไม่ใช่หน้าเปิดโล่งๆ — มี \`middleware: ['unauthenticated']\` เอง ถ้า user มี token ครบทุกอย่างอยู่แล้ว (login ซ้ำ) จะเด้งกลับ \`/\` ทันที ในเคสนี้ (ไม่มี token เลย) มันแค่ปล่อยให้ฟอร์ม login render

\`\`\`ts
if (!authStore.accessToken) {
  await authStore.logout(); // clears any stale partial state
  return; // let the login page render
}
// ...else: already has a token -> bounce to mfa-enroll / mfa-verify / '/' depending on state
\`\`\`

**3 · Submit credentials** — \`pages/login/index.vue:34-40\` → \`composables/auth/useAuthService.ts:12-26\` login สำเร็จ → \`authStore.setInitialToken(result)\` เก็บ token — ไม่ไปหน้า \`/\` ตรงๆ แต่ส่งไป \`/account/mfa/verify\` ผ่าน \`useGuardRedirect\` เสมอ (ยังไม่รู้ว่า user เคย enroll MFA รึยัง)

\`\`\`ts
const handleLogin = async (formUserLogin) => {
  const result = await login(formUserLogin);
  await authStore.setInitialToken(result);
  toast.success(/*...*/);
  await useGuardRedirect('/account/mfa/verify');
};
\`\`\`

**4 · mfa-verify gate detours a first-timer** — \`middleware/mfaVerify.ts\` user คนนี้ไม่เคย enroll MFA มาก่อน (\`isMfaEnrolled === false\`) — middleware ของหน้า verify เองตรวจแล้วเด้งไป \`/account/mfa/enroll\` แทน ไม่ให้เห็นฟอร์ม verify ที่ใช้งานไม่ได้

\`\`\`ts
if (!authStore.isMfaEnrolled) {
  return navigateTo('/account/mfa/enroll');
}
\`\`\`

**5 · Enroll — QR code, then one OTP does double duty** — \`pages/account/mfa/enroll/index.vue:44-66\` → \`composables/auth/useAuthService.ts:62-98\` \`onMounted\` ดึง QR code (\`getEnrollMfa\`) user scan แล้วกรอก OTP ครั้งแรก — response เดียวตั้งค่าทั้ง \`mfaVerified\` และ \`mfaEnrolled\` พร้อมกัน (enroll ครั้งแรกนับเป็น verify ไปในตัว ไม่ต้องกรอกซ้ำ)

\`\`\`ts
const handleVerifyMfaEnroll = async (enrollOtp) => {
  const result = await enrollVerifyMfa({ otp: enrollOtp });
  if (result) {
    authStore.setMfaVerified(result.mfaVerified);
    authStore.setMfaEnabled(result.mfaEnabled); // note: sets state.mfaEnrolled -- method name says "Enabled"
  }
  await useGuardRedirect('/');
};
\`\`\`

รายละเอียดเล็กๆ ที่จริง: method ชื่อ \`setMfaEnabled\` แต่แก้ field \`state.mfaEnrolled\` — ชื่อไม่ sync กับ field 100% ไม่กระทบ behavior แต่เป็น naming drift จริงที่เจอระหว่างไล่โค้ด

**6 · Back through the gate — this time it passes** — \`middleware/auth.ts\` (re-run on the redirected navigation) \`useGuardRedirect('/')\` พา user กลับไป \`/\` (หรือ path เดิมที่โดนบล็อกครั้งแรก ถ้ามี \`?redirect=\` ติดมาตลอดทาง) — \`authMiddleware\` รันใหม่: \`accessToken\` ✓, \`isMfaEnrolled\` ✓, \`isMfaVerified\` ✓ — ผ่านหมดแล้ว

**7 · One more gate before content — the consent dialog** — \`layouts/default.vue:10-24\` \`authMiddleware\`'s comment เองบอกไว้ตรงๆ: "consent dialog will overlay if needed" — \`layouts/default.vue\` เรียก \`checkConsent()\` จาก \`useUserServiceConsent()\` ตอน mount แสดง \`<AppConsentDialog>\` ถ้ายังไม่เคยกด accept — แล้วถึงจะเห็นหน้า events จริงๆ

**11 ไฟล์จริงที่ journey นี้แตะ:** \`pages/events/index.vue\` · \`middleware/auth.ts\` · \`pages/login/index.vue\` · \`middleware/unauthenticated.ts\` · \`composables/auth/useAuthService.ts\` · \`composables/auth/useGuardRedirect.ts\` · \`middleware/mfaVerify.ts\` · \`pages/account/mfa/enroll/index.vue\` · \`stores/auth.ts\` · \`layouts/default.vue\` · composables ของ \`useUserServiceConsent\` — ไม่มีสักไฟล์เดียวที่ "รู้" journey ทั้งเส้น แต่ละไฟล์รู้แค่กติกาของตัวเอง (เทียบกับ state ปัจจุบันของ \`authStore\`) journey ทั้งหมดคือผลลัพธ์ที่โผล่ขึ้นเองจากกติกาเล็กๆ หลายอันทำงานพร้อมกัน ไม่ใช่ script เดียวที่ควบคุมทุกก้าว

## สรุป

การเข้าหน้าที่ป้องกันไว้ครั้งแรกแตะไฟล์จริง 11 ไฟล์ และผ่านด่านที่แยกกัน 7 จุด — ไม่มีด่านไหนรู้จักด่านอื่นเลย \`middleware/auth.ts\` เช็กแค่ session + สถานะ MFA เท่านั้น; role gating, consent, และ flow การ enroll MFA ต่างอยู่คนละไฟล์ แต่ละไฟล์เช็ก state ปัจจุบันของ \`authStore\` แยกกันเอง journey จริงของ user คือสิ่งที่โผล่ขึ้นเองเมื่อทุกด่านทำงานเรียงกัน ไม่ใช่ controller ตัวเดียวคุมทั้งหมด — ซึ่งเป็นคุณสมบัติ "ไม่มีไฟล์ไหนรู้ภาพรวม" แบบเดียวกับที่บทเรียนเรื่อง fixed chain ของคอร์สนี้แสดงให้เห็นทีละ layer มาตลอด`,
      },
    ],
  };

export default course;
