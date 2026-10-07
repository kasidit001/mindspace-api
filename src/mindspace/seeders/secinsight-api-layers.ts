import type { SeedCourse } from "./types";

const course: SeedCourse = {
    slug: "secinsight-api-layers",
    title: "SecInsight API",
    descriptionEn: `A private reference course on the SecInsight API codebase: start with a repeatable method for tracing any request across its fixed layer chain by class name and import statement, then go deep on specific parts of the stack -- Sequelize across two databases, the auth stack (bcrypt/jose/sessions/MFA), Zod validation, and external API clients + rate limiting. A private reference course -- assumes general TypeScript/backend knowledge, not knowledge of this repo going in.`,
    descriptionTh: `คอร์สอ้างอิงส่วนตัวสำหรับ codebase ของ SecInsight API เริ่มจากวิธีไล่โค้ดที่ใช้ซ้ำได้ -- ทุก request วิ่งผ่านสาย layer เดียวกันเสมอ ไล่ข้าม layer ด้วยชื่อ class กับ import statement จากนั้นเจาะลึกส่วนเฉพาะของ stack -- Sequelize ข้ามสองฐานข้อมูล, auth stack (bcrypt/jose/session/MFA), Zod validation, และ external API client + rate limiting คอร์สอ้างอิงส่วนตัว -- สมมุติว่ามีพื้นฐาน TypeScript/backend ทั่วไปอยู่แล้ว เพียงแต่ยังไม่รู้จัก repo นี้เป็นการเฉพาะ`,
    published: false,
    lessons: [
      {
        slug: "where-it-starts-server-app",
        titleEn: "Where It Starts — server.ts + app.ts",
        titleTh: "จุดเริ่มต้น — server.ts + app.ts",
        order: 1,
        sectionEn: "The Layer Chain",
        sectionTh: "ไล่โค้ดตาม Layer",
        contentEn: `Before the next lesson (the fixed chain), you need to know how a request even reaches a Route. These two files are the real starting point — nothing runs without passing through them first.

| File | What it does | Order |
| --- | --- | --- |
| \`server.ts\` | Confirms the DB connection first, only then calls \`app.listen()\` — so it never accepts a request while the DB is down. Also wires graceful shutdown (SIGTERM/SIGINT). | Runs first — the one that invokes \`app.ts\`. |
| \`app.ts\` | Creates the Express app and wires global middleware in a fixed order (helmet → cors → body-parser → request logger → \`/health\` → routes → errorHandler). | \`errorHandler\` always comes last (see the middleware table in the lesson on middleware). |

\`\`\`ts
// src/server.ts
await SequelizeConnection.connectAll(); // 1. DB must be up first
const server = app.listen(PORT, () => Logger.info('server running'));
process.on('SIGTERM', gracefulShutdown); // 3. close DB before exit
\`\`\`

\`\`\`ts
// src/app.ts
const app = express();
app.use(helmet()); // 1. security headers
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' })); // 2. body parsing
app.use(requestLogger); // 3. Winston request log
app.get('/health', (_req, res) => res.status(200).json({ status: 'healthy' }));
app.use('/api', globalRateLimit, apiRoutes); // 5. -> routes/index.ts mounts /v1 -> routes/v1/index.ts
app.use(errorHandler); // 6. MUST be last
\`\`\`

**Why this matters for reading:** these two files explain what later lessons reference loosely. \`errorHandler\` is "always last" because Express literally runs middleware in \`app.use()\` call order — and the full path \`/api/v1/events\` comes from 3 stacked mounts: \`/api\` (app.ts) → \`/v1\` (routes/index.ts) → \`/events\` (routes/v1/index.ts).

## Conclusion

\`server.ts\` guarantees the database is reachable before the process ever accepts traffic, and \`app.ts\` wires every global middleware in one fixed, non-negotiable order ending in \`errorHandler\`. Every later lesson's talk of "the chain" and "the mount path" traces back to these two files.`,
        contentTh: `ก่อนถึงบทเรียนถัดไป (fixed chain) ต้องรู้ก่อนว่า request มาถึง Route ได้อย่างไร — 2 ไฟล์นี้คือจุดเริ่มต้นจริงของทุกอย่าง ไม่มีโค้ดส่วนไหนทำงานได้เลยถ้าไม่ผ่านมันก่อน

| File | ทำอะไร | ลำดับ |
| --- | --- | --- |
| \`server.ts\` | เช็กว่า DB connection ต่อสำเร็จก่อนเสมอ แล้วค่อยเปิด \`app.listen()\` — กัน request หลุดเข้ามาตอน DB ยังไม่พร้อม พร้อมผูก graceful shutdown ไว้ด้วย (SIGTERM/SIGINT) | รันเป็นไฟล์แรก — เป็นตัวเรียก \`app.ts\` ต่อ |
| \`app.ts\` | สร้าง Express app แล้วต่อ global middleware ตามลำดับที่ตายตัว (helmet → cors → body-parser → request logger → \`/health\` → routes → errorHandler) | \`errorHandler\` ต้องอยู่ลำดับสุดท้ายเสมอ (ดูตาราง middleware ในบทเรียนเรื่อง middleware) |

\`\`\`ts
// src/server.ts
await SequelizeConnection.connectAll(); // 1. DB must be up first
const server = app.listen(PORT, () => Logger.info('server running'));
process.on('SIGTERM', gracefulShutdown); // 3. close DB before exit
\`\`\`

\`\`\`ts
// src/app.ts
const app = express();
app.use(helmet()); // 1. security headers
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' })); // 2. body parsing
app.use(requestLogger); // 3. Winston request log
app.get('/health', (_req, res) => res.status(200).json({ status: 'healthy' }));
app.use('/api', globalRateLimit, apiRoutes); // 5. -> routes/index.ts mounts /v1 -> routes/v1/index.ts
app.use(errorHandler); // 6. MUST be last
\`\`\`

**ทำไมเรื่องนี้สำคัญตอนอ่านโค้ด:** สองไฟล์นี้อธิบายสิ่งที่บทเรียนหลังๆ อ้างถึงแบบลอยๆ ไว้ก่อน: \`errorHandler\` "อยู่ท้ายสุดเสมอ" เพราะ Express เรียง middleware ตามลำดับที่ \`app.use()\` ถูกเรียกจริงๆ — และ path เต็มอย่าง \`/api/v1/events\` ก็มาจาก 3 ชั้น mount ที่ต่อกัน: \`/api\` (app.ts) → \`/v1\` (routes/index.ts) → \`/events\` (routes/v1/index.ts)

## สรุป

\`server.ts\` รับประกันว่าฐานข้อมูลเชื่อมต่อได้ก่อนที่ process จะรับ traffic ใดๆ ส่วน \`app.ts\` ต่อ global middleware ทั้งหมดตามลำดับตายตัวหนึ่งเดียว จบที่ \`errorHandler\` บทเรียนหลังๆ ที่พูดถึง "chain" และ "mount path" ล้วนย้อนกลับมาที่สองไฟล์นี้ทั้งสิ้น`,
      },
      {
        slug: "the-fixed-chain-api",
        titleEn: "The Fixed Chain",
        titleTh: "The Fixed Chain (สายที่ตายตัว)",
        order: 2,
        sectionEn: "The Layer Chain",
        sectionTh: "ไล่โค้ดตาม Layer",
        contentEn: `Every feature — auth, events, CVEs, admin actions — flows through the same six stops, always in this order, never skipped, never reversed:

**Route → Controller → UseCase → Service → Repository → Model → Database**

| Layer | Job | Why it exists | What breaks if you skip it | Directory |
| --- | --- | --- | --- | --- |
| Route | Maps URL + method → controller function | Single source of truth for verb+path — lets you grep an endpoint from one file | Endpoint discovery scatters across the codebase, no single index | \`src/routes/v1/\` |
| Controller | Parse req, Zod-validate, call UseCase, format response | Keeps malformed input out of business code — one validation boundary | Business logic couples to req/res directly — hard to unit test, tied to HTTP | \`src/controllers/\` |
| UseCase | Orchestrate one business operation: strip actor fields, re-fetch DB, authorize, act, log | The one place that knows operation order — including security logic (authorize from re-fetched DB values, never raw JWT claims) | Each Controller reinvents the business flow, duplicated and drifting | \`src/usecases/\` |
| Service | Reusable domain logic, zero HTTP concern | Lets multiple UseCases share the same domain rule (e.g. create user+credential) | The same logic gets copy-pasted into multiple UseCases — a fix in one misses the rest | \`src/services/\` |
| Repository | All DB queries via Sequelize | Only place touching raw SQL/ORM — swap DB or optimize a query without touching layers above | SQL scatters into Service/UseCase — injection risk rises, indexing gets hard to reason about | \`src/repositories/\` |
| Model | Sequelize schema / table mapping | Defines columns/types/associations once, shared by both the \`secinsight\` and \`misp\` databases | Field name/type mismatches drift between query sites | \`src/models/\` |

**Why this matters for reading:** because the direction is unidirectional and fixed, you never have to search for "where does this call go" — it always goes one stop to the right. The only skill worth building is finding which file is the next stop, fast.

## Conclusion

Six stops, one direction, no exceptions: Route → Controller → UseCase → Service → Repository → Model → Database. Once this order is memorized, tracing any endpoint stops being a search problem and becomes a lookup problem.`,
        contentTh: `ทุกฟีเจอร์ — auth, events, CVE, admin action — ไหลผ่าน 6 จุดเดียวกันเสมอ ตามลำดับนี้เท่านั้น ห้ามข้ามขั้นตอน ห้ามสลับที่:

**Route → Controller → UseCase → Service → Repository → Model → Database**

| Layer | หน้าที่ | ทำไมต้องมี layer นี้ | ถ้าข้าม layer นี้ จะพังตรงไหน | Directory |
| --- | --- | --- | --- | --- |
| Route | map URL + method → controller function | เป็นจุดเดียวในทั้ง codebase ที่รู้ว่า HTTP verb ตัวไหนคู่กับ path ตัวไหน เปิดไฟล์นี้ไฟล์เดียวก็เจอคำตอบ | การ map URL จะกระจัดกระจายอยู่ในหลายที่ ต้องไล่อ่านทั้ง codebase ถึงจะรู้ว่า API มีกี่ตัว | \`src/routes/v1/\` |
| Controller | parse req, validate ด้วย Zod, เรียก UseCase, format response | เป็น boundary เดียวที่ validate input ทั้งหมดก่อนปล่อยเข้าสู่ business logic | business logic จะต้องรู้จัก object request/response ของ Express โดยตรง ทดสอบยาก | \`src/controllers/\` |
| UseCase | ควบคุมลำดับขั้นตอนของ business operation: strip actor field, re-fetch DB, authorize, ทำ operation, log | เป็นจุดเดียวในระบบที่รู้ลำดับที่ถูกต้องของแต่ละ operation ธุรกิจ รวม security logic ไว้ที่นี่ด้วย | แต่ละ Controller ต้องเขียน business flow ของตัวเองแยกกัน logic เดียวกันถูก copy ไปหลายที่ | \`src/usecases/\` |
| Service | domain logic ที่ใช้ซ้ำได้ ไม่ขึ้นกับ HTTP เลย | ทำให้หลาย UseCase เรียกใช้ logic ชุดเดียวกันได้โดยไม่ต้อง copy-paste | logic ที่ควรใช้ร่วมกันจะถูก copy กระจายไปในหลาย UseCase | \`src/services/\` |
| Repository | query database ทั้งหมดผ่าน Sequelize | เป็นจุดเดียวในระบบที่แตะ SQL/ORM จริง ปรับ query หรือเปลี่ยน database engine ได้โดยไม่แตะ layer บน | SQL หรือ query logic จะกระจายไปอยู่ใน Service/UseCase เพิ่มความเสี่ยง SQL injection | \`src/repositories/\` |
| Model | นิยาม schema ของ Sequelize / table mapping | นิยาม column, type และ association ไว้แค่ครั้งเดียว ใช้ร่วมกันได้ทั้งฝั่ง database \`secinsight\` และ \`misp\` | field name หรือ type ไม่ตรงกันระหว่างจุดที่ query ตารางเดียวกัน | \`src/models/\` |

**ทำไมเรื่องนี้สำคัญตอนอ่านโค้ด:** เพราะทิศทางเดินทางเดียวและตายตัว จึงไม่ต้องเดาเลยว่า "call นี้ไปไหนต่อ" — มันไปสถานีถัดไปด้านขวาเสมอ ทักษะเดียวที่ต้องมีคือหาไฟล์ของสถานีถัดไปให้เจอเร็วๆ เท่านั้น

## สรุป

หกสถานี ทิศทางเดียว ไม่มีข้อยกเว้น: Route → Controller → UseCase → Service → Repository → Model → Database เมื่อจำลำดับนี้ได้แล้ว การไล่ endpoint ไหนก็ตามจะไม่ใช่ปัญหาการค้นหาอีกต่อไป แต่กลายเป็นแค่การเปิดไฟล์ตามลำดับที่รู้อยู่แล้ว`,
      },
      {
        slug: "how-to-jump-one-stop-api",
        titleEn: "How to Jump One Stop, at Each Layer",
        titleTh: "วิธีกระโดดข้ามสถานี ทีละ Layer",
        order: 3,
        sectionEn: "The Layer Chain",
        sectionTh: "ไล่โค้ดตาม Layer",
        contentEn: `Each layer hands off with a predictable, greppable signal. Learn the signal, not the file name.

| Hop | Signal |
| --- | --- |
| Route → Controller | Route file imports one controller class, wires each HTTP verb to one method on it. Grep the method name called on the controller instance. |
| Controller → UseCase | Look for \`new <Verb><Entity>UseCase(services)\` inside the controller method — the class name is a direct file name in \`src/usecases/<domain>/\`. Controller method name ≈ UseCase class name. The controller's 7-step template (validate → new UseCase → execute → sendSuccess) is identical everywhere — read it once, skip it forever after. |
| UseCase → Service | The UseCase constructor destructures \`this.XService\` off the injected registry. Every call like \`this.EventService.foo()\` names the next file directly: \`src/services/EventService.ts\`. |
| Service → Repository | Same pattern one level down — Service holds \`this.XRepository\`, method name usually unchanged or minimally reshaped. If the Service is a one-line pass-through to Repository, skip straight to Repository. If it has real logic (loop, branch, transform), that's the domain rule worth reading. |
| Repository → Model | Repository imports \`secinsightModel\` or \`mispModel\` from \`src/models/index.ts\`, destructures the entity (\`const { Event } = secinsightModel\`), then calls Sequelize methods on it. The destructured model name tells you both the table and which database. |

**The find/get name IS the contract.** \`find<X>By<Key>\` can return \`null\` (check for it). \`getAll<X>\` / \`get<X>Options\` never return \`null\`. You know the caller's obligation before opening the method body — the full table is in the naming-canon lesson.

## Conclusion

Every hand-off between layers has one predictable, greppable signal: an import, a \`new <X>UseCase(...)\` call, a \`this.<X>Service\`/\`this.<X>Repository\` reference, or a destructured model. Memorize the signal, not the file paths — the signal finds the file for you every time.`,
        contentTh: `แต่ละ layer ส่งไม้ต่อด้วยสัญญาณที่ grep เจอได้แน่นอน จำ "สัญญาณ" ไว้ ไม่ต้องจำชื่อไฟล์

| การกระโดด | สัญญาณ |
| --- | --- |
| Route → Controller | ไฟล์ route import controller class มาหนึ่งตัว แล้วผูกแต่ละ HTTP verb เข้ากับ method หนึ่งตัวบน instance นั้น grep หาชื่อ method ที่ถูกเรียกบน controller instance |
| Controller → UseCase | มองหา \`new <Verb><Entity>UseCase(services)\` ในตัว controller method — ชื่อ class ตรงกับชื่อไฟล์ใน \`src/usecases/<domain>/\` เป๊ะๆ ชื่อ method ของ controller ≈ ชื่อ class UseCase 7-step template ของ controller (validate → new UseCase → execute → sendSuccess) เหมือนกันทุกไฟล์ — อ่านให้เข้าใจครั้งเดียว ครั้งต่อไปข้ามได้เลย |
| UseCase → Service | constructor ของ UseCase destructure \`this.XService\` ออกมาจาก registry ที่ inject เข้ามา ทุก call แบบ \`this.EventService.foo()\` จึงบอกชื่อไฟล์ถัดไปตรงๆ: \`src/services/EventService.ts\` |
| Service → Repository | รูปแบบเดียวกันอีกชั้นหนึ่ง — Service ถือ \`this.XRepository\` ไว้ ชื่อ method มักไม่เปลี่ยนหรือเปลี่ยนรูปแค่เล็กน้อย ถ้า Service เป็นแค่ pass-through บรรทัดเดียวตรงไป Repository ข้ามไปดู Repository ได้เลย แต่ถ้ามี logic เพิ่ม (loop, if, transform) นั่นคือ domain rule ที่ต้องอ่านจริงๆ |
| Repository → Model | Repository import \`secinsightModel\` หรือ \`mispModel\` จาก \`src/models/index.ts\` แล้ว destructure entity ออกมา (\`const { Event } = secinsightModel\`) จากนั้นเรียก method ของ Sequelize บนตัวนั้น ชื่อ model ที่ destructure บอกทั้งชื่อตารางและ DB ที่ใช้ |

**ชื่อ find/get คือสัญญา** \`find<X>By<Key>\` คืน \`null\` ได้ (ต้องเช็กเสมอ) ส่วน \`getAll<X>\` / \`get<X>Options\` ไม่มีวันคืน \`null\` — รู้ภาระของผู้เรียกได้ตั้งแต่ก่อนเปิดอ่าน body ด้วยซ้ำ รายละเอียดเต็มดูบทเรียนเรื่อง naming canon

## สรุป

ทุกการส่งไม้ต่อระหว่าง layer มีสัญญาณที่ grep เจอได้แน่นอนหนึ่งอย่าง: import, การเรียก \`new <X>UseCase(...)\`, การอ้างอิง \`this.<X>Service\`/\`this.<X>Repository\`, หรือ model ที่ destructure ออกมา จำสัญญาณไว้ ไม่ต้องจำ path ไฟล์ — สัญญาณจะพาไปหาไฟล์ให้เองทุกครั้ง`,
        labs: [
          {
            id: "name-the-next-file",
            title: "Name the Next File",
            instructions: "Complete `nextFileFor` so it reads a `this.<X>Service.foo()` or `this.<X>Repository.foo()` reference line (the Service->Repository hop's signal, from this lesson) and returns the next file's path: `src/services/<X>Service.ts` or `src/repositories/<X>Repository.ts`.",
            starterCode: `function nextFileFor(callLine: string): string {
  // TODO: extract the "this.<X>Service" or "this.<X>Repository" reference
  // from callLine, and return the matching file path.
  return "";
}`,
            testCode: `check(nextFileFor("this.EventService.getAllWithPagination()"), "src/services/EventService.ts", "finds a Service reference");
check(nextFileFor("this.UserRepository.findByEmail(email)"), "src/repositories/UserRepository.ts", "finds a Repository reference");
check(nextFileFor("this.RoleService.getNameById(id)"), "src/services/RoleService.ts", "works for a different Service name");
check(nextFileFor("this.UserCredentialRepository.updateByUserId(id, data)"), "src/repositories/UserCredentialRepository.ts", "works for a different Repository name");`,
            hint: "A regex like `/this\\.(\\w+)(Service|Repository)\\./` captures both the name and which layer it is.",
          },
        ],
      },
      {
        slug: "foundations-under-the-chain",
        titleEn: "Foundations Under the Chain",
        titleTh: "รากฐานใต้สาย — abstracts, config, helper",
        order: 4,
        sectionEn: "The Layer Chain",
        sectionTh: "ไล่โค้ดตาม Layer",
        contentEn: `None of these three is a stop in the chain — no route runs through them directly. But every stop in the chain stands on all three. Know what each one does as a whole; no need to read file by file.

| Directory | What it does | Why it matters for tracing |
| --- | --- | --- |
| \`src/abstracts/\` | The base classes every Controller/UseCase/Service extends — gives them shared methods/plumbing (building the response, holding the services registry, the \`execute()\` contract). | Anywhere you see \`this.sendSuccess(...)\` or \`this.<X>Service\`, don't hunt for the definition in that file — it always comes from here. |
| \`src/config/\` | Infrastructure settings the app depends on, read from env once at boot, fail-fast if a value is missing. | The source of the connection pools that split \`secinsight\`/\`misp\` (see the Database row in the fixed-chain lesson) — the rest (mail, log format) is single-purpose config, skip it while tracing an endpoint. |
| \`src/helper/\` + \`src/schema/helpers/\` | The axios client class for every external API (MISP, OpenRouter, Recaptcha, Bluesky, …) in \`axiosInstance.ts\` — paired with its request/response contract types in \`schema/helpers/S*Params.ts\`. | The pattern behind \`mispAdminApi.delete(...)\` in the destructive-path worked example — its interceptor is what translates an external failure into \`UpstreamError\` / \`BadGatewayError\`. |

**Why this matters for reading:** read all three once, done — you never reopen them per endpoint. Understanding each one's job is enough; no need to memorize file details.

## Conclusion

\`abstracts/\`, \`config/\`, and \`helper/\` never appear as a named stop in the request chain, but every stop stands on top of them — shared base classes, boot-time settings, and external API clients. Read each once for what it does, then stop revisiting them per endpoint.`,
        contentTh: `ทั้งสามอย่างนี้ไม่ใช่สถานีในสาย ไม่มี route ไหนวิ่งผ่านมันตรงๆ แต่ทุกสถานีในสาย "ยืน" อยู่บนของสามอย่างนี้ทั้งหมด — รู้แค่ว่าแต่ละอย่าง "ทำหน้าที่อะไร" ก็พอ ไม่ต้องไล่อ่านทีละไฟล์

| Directory | ทำหน้าที่อะไร | ทำไมเกี่ยวกับการ trace |
| --- | --- | --- |
| \`src/abstracts/\` | base class ที่ทุกไฟล์ Controller/UseCase/Service extends เสมอ — ให้ method และกลไกที่ใช้ร่วมกัน เช่น ประกอบ response, เก็บ services registry, กำหนดสัญญา \`execute()\` | เจอ \`this.sendSuccess(...)\` หรือ \`this.<X>Service\` ที่ไหนก็ตาม ไม่ต้องเสียเวลาหาว่านิยามไว้ตรงไหนในไฟล์นั้น — มันมาจากที่นี่เสมอ |
| \`src/config/\` | ตั้งค่า infrastructure ที่แอปต้องพึ่งพา อ่านจาก env ตอน boot ครั้งเดียว แล้ว fail-fast ทันทีถ้าค่าหาย | ต้นตอของ connection pool ที่แยก DB \`secinsight\`/\`misp\` ออกจากกัน — ที่เหลือ (mail, log format) เป็น config เฉพาะจุด ไม่ต้องอ่านตอน trace endpoint |
| \`src/helper/\` + \`src/schema/helpers/\` | axios client class ของทุก external API (MISP, OpenRouter, Recaptcha, Bluesky, …) รวมไว้ใน \`axiosInstance.ts\` — คู่กับ type สัญญา request/response ใน \`schema/helpers/S*Params.ts\` | เป็น pattern เดียวกับที่อยู่เบื้องหลัง \`mispAdminApi.delete(...)\` ในบทเรียน worked example ฝั่ง write — interceptor ในนี้เองที่แปลง error จากภายนอกให้กลายเป็น \`UpstreamError\` / \`BadGatewayError\` |

**ทำไมเรื่องนี้สำคัญตอนอ่านโค้ด:** ทั้งสามอย่างนี้อ่านครั้งเดียวจบ ไม่ต้องเปิดซ้ำทุก endpoint — เข้าใจแค่ "หน้าที่" ของแต่ละอย่างก็พอแล้ว ไม่ต้องจำรายละเอียดไฟล์

## สรุป

\`abstracts/\`, \`config/\`, และ \`helper/\` ไม่เคยปรากฏเป็นสถานีที่มีชื่อในสายของ request แต่ทุกสถานียืนอยู่บนทั้งสามนี้ — base class ที่ใช้ร่วมกัน, ค่าตั้งค่าตอน boot, และ client เรียก API ภายนอก อ่านแต่ละอย่างครั้งเดียวให้เข้าใจหน้าที่ แล้วเลิกเปิดซ้ำทุก endpoint`,
      },
      {
        slug: "the-type-boundary-schema",
        titleEn: "The Type Boundary — src/schema/",
        titleTh: "ขอบเขตของ Type — src/schema/",
        order: 5,
        sectionEn: "The Layer Chain",
        sectionTh: "ไล่โค้ดตาม Layer",
        contentEn: `The same piece of data changes its type name every time it crosses a stop — \`src/schema/\` holds all of them, organized by hand-off point, not by entity.

| Directory | What it is | What it does | When it's used |
| --- | --- | --- | --- |
| \`schema/requests/<domain>/\` | A Zod schema \`S*Request\` + its inferred \`T*Request\` type — one file per operation | Validates raw HTTP input (query/body/params) — rejects malformed shapes, coerces string→number/date | In the Controller, right after destructuring \`req.query\`/\`req.body\`, before instantiating the UseCase |
| \`schema/payloads/services/\` | A plain TS type (no Zod) named \`T*Payload\` — one file per entity | Shapes the data a UseCase passes into a Service — actor fields already stripped, DB-derived values already substituted | In the UseCase, calling \`this.<X>Service.<method>(payload)\` |
| \`schema/payloads/repositories/\` | Same mechanism as above (\`T*Payload\`, plain type) — a different file, a different boundary | Shapes the data a Service passes down into a Repository | In the Service, calling \`this.<X>Repository.<method>(payload)\` |
| \`schema/models/\` | A Zod schema \`<Entity>Schema\` matching the table's columns — the Model class in \`src/models/\` implements this type | Defines what one DB row looks like to TypeScript — not validating anything, just the type contract | As the return type of Repository/Service methods (\`Promise<UserSchema \\| null>\`) — never invoked directly |
| \`src/interfaces/<domain>/\` | An interface (not \`type\`, no Zod) named \`I<Action><Entity>Response\` — one file per response shape + a barrel \`index.ts\` | Shapes the data a UseCase returns to the Controller — closes the type loop that started at the Request | As the return type of every UseCase's \`execute()\` — this is exactly what the Controller passes into \`sendSuccess(res, { data })\` next |
| \`schema/helpers/\` | Paired with \`src/helper/axiosInstance.ts\` — see the foundations lesson | | |

**A real example** — one \`Event\`, changing type 4 times, out and back:

\`\`\`ts
// schema/requests/event/SGetEventRequest.ts
export const SGetEventRequest = SEventFilterRequest.extend(SBaseActorRequest.shape);
export type TGetEventRequest = z.infer<typeof SGetEventRequest>;

// schema/payloads/services/SEventServicePayload.ts
export type TGetAllEventsPayload = TEventFilterPayload; // no actorId -- already stripped

// schema/payloads/repositories/SEventRepositoryPayload.ts
export type TGetAllPayload = TEventFilterPayload; // same shape here, different file/boundary

// schema/models/EventSchema.ts
export const EventValidation = z.object({ id: z.number(), orgId: z.number(), info: z.string() /* ... */ });

// interfaces/event/IGetAllEventsResponse.ts
export interface IGetEventResponse { id: number; info: string; tlp: ITagResponse /* ... */ }
export interface IGetAllEventResponse { rows: IGetEventResponse[]; pagination: IPaginationResult; } // <- this is what execute() returns
\`\`\`

**One-sentence teach:** Request validates once, at the boundary (has Zod) · Payload (services/repositories) just moves data along, no re-validation (no Zod) · Model schema is the DB-row contract, not a validator · Response interface is the outbound contract, closing the loop back to the Controller.

## Conclusion

\`src/schema/\` is organized by where data crosses a boundary, not by what entity it represents — Request (validated once, Zod), Payload (moved along, no re-validation), Model schema (the DB-row contract), Response interface (the outbound contract). The same \`Event\` wears four different type names on one trip through the chain, and that's by design, not accident.`,
        contentTh: `ข้อมูลชิ้นเดียวกันเปลี่ยนชื่อ type ทุกครั้งที่ข้ามสถานี — \`src/schema/\` คือที่เก็บ type เหล่านั้นทั้งหมด จัดกลุ่มตามจุดส่งต่อของแต่ละสถานี ไม่ใช่ตาม entity

| Directory | คืออะไร | ทำอะไร | ใช้ตอนไหน |
| --- | --- | --- | --- |
| \`schema/requests/<domain>/\` | Zod schema \`S*Request\` + type ที่ infer ออกมา \`T*Request\` — 1 ไฟล์ต่อ 1 operation | validate ข้อมูลดิบจาก HTTP (query/body/params) — ปฏิเสธถ้ารูปแบบผิด, coerce string→number/date | ใน Controller ทันทีหลัง destructure \`req.query\`/\`req.body\` ก่อนสร้าง UseCase |
| \`schema/payloads/services/\` | plain TS type (ไม่มี Zod) ชื่อ \`T*Payload\` — 1 ไฟล์ต่อ 1 entity | กำหนดรูปข้อมูลที่ UseCase ส่งเข้า Service — actor field ถูก strip ออกไปแล้ว | ใน UseCase ตอนเรียก \`this.<X>Service.<method>(payload)\` |
| \`schema/payloads/repositories/\` | กลไกเดียวกับข้างบน (\`T*Payload\`, plain type) แต่เป็นคนละไฟล์ คนละ boundary | กำหนดรูปข้อมูลที่ Service ส่งลง Repository | ใน Service ตอนเรียก \`this.<X>Repository.<method>(payload)\` |
| \`schema/models/\` | Zod schema \`<Entity>Schema\` ที่ตรงกับคอลัมน์ตาราง — Model class ใน \`src/models/\` implements type นี้ | นิยามรูปแถว DB หนึ่งแถวในสายตา TypeScript — ไม่ได้ validate อะไร แค่เป็นสัญญา | เป็น return type ของ Repository/Service (\`Promise<UserSchema \\| null>\`) — ไม่ได้ถูกเรียกใช้งานเอง |
| \`src/interfaces/<domain>/\` | interface (ไม่ใช่ \`type\`, ไม่มี Zod) ชื่อ \`I<Action><Entity>Response\` — 1 ไฟล์ต่อ 1 response shape + barrel \`index.ts\` | กำหนดรูปข้อมูลที่ UseCase ส่งกลับ ให้ Controller — ปิดวงจร type ที่เริ่มจาก Request | เป็น return type ของ \`execute()\` ทุก UseCase — ค่านี้แหละที่ Controller เอาไปใส่ \`sendSuccess(res, { data })\` ต่อ |
| \`schema/helpers/\` | คู่กับ \`src/helper/axiosInstance.ts\` — ดูบทเรียนเรื่อง foundations | | |

**ตัวอย่างจริง** — \`Event\` ตัวเดียวกัน เปลี่ยน type ไปแล้วกลับมารวม 4 รอบ:

\`\`\`ts
// schema/requests/event/SGetEventRequest.ts
export const SGetEventRequest = SEventFilterRequest.extend(SBaseActorRequest.shape);
export type TGetEventRequest = z.infer<typeof SGetEventRequest>;

// schema/payloads/services/SEventServicePayload.ts
export type TGetAllEventsPayload = TEventFilterPayload; // no actorId -- already stripped

// schema/payloads/repositories/SEventRepositoryPayload.ts
export type TGetAllPayload = TEventFilterPayload; // same shape here, different file/boundary

// schema/models/EventSchema.ts
export const EventValidation = z.object({ id: z.number(), orgId: z.number(), info: z.string() /* ... */ });

// interfaces/event/IGetAllEventsResponse.ts
export interface IGetEventResponse { id: number; info: string; tlp: ITagResponse /* ... */ }
export interface IGetAllEventResponse { rows: IGetEventResponse[]; pagination: IPaginationResult; } // <- นี่คือสิ่งที่ execute() คืนกลับ
\`\`\`

**จำแบบประโยคเดียว:** Request validate ครั้งเดียวตรง boundary (มี Zod) · Payload (services/repositories) แค่ส่งข้อมูลต่อ ไม่ validate ซ้ำ (ไม่มี Zod) · Model schema คือสัญญารูปแถว DB ไม่ใช่ตัว validate · Response interface คือสัญญาขาออก ปิดวงจรกลับไปหา Controller

## สรุป

\`src/schema/\` จัดกลุ่มตามจุดที่ข้อมูลข้ามขอบเขต ไม่ใช่ตาม entity — Request (validate ครั้งเดียว, มี Zod), Payload (ส่งต่อเฉยๆ ไม่ validate ซ้ำ), Model schema (สัญญารูปแถว DB), Response interface (สัญญาขาออก) \`Event\` ตัวเดียวกันสวมชื่อ type ต่างกัน 4 ชื่อในทริปเดียว และนั่นคือการออกแบบที่ตั้งใจ ไม่ใช่ความบังเอิญ`,
      },
      {
        slug: "the-gate-before-controller-middleware",
        titleEn: "The Gate Before Controller — src/middleware/",
        titleTh: "ด่านก่อนถึง Controller — src/middleware/",
        order: 6,
        sectionEn: "The Layer Chain",
        sectionTh: "ไล่โค้ดตาม Layer",
        contentEn: `Unlike \`abstracts\`/\`config\`/\`helper\`, this one sits in the actual path. Every request passes through it before reaching the Controller; it doesn't just stand underneath.

| File | Verifies | Used at |
| --- | --- | --- |
| \`auth.ts\` | \`authMiddleware\` — session JWT (cookie or Bearer) → \`requireRole(...roles)\` — role from the DB-backed auth payload | Router mount level (\`src/routes/v1/index.ts\`) — always before the Controller |
| \`auth.ts\` | \`apiKeyMiddleware\` — API key | Per-route on \`/external\` — the caller is a machine, not a person |
| \`cronAuth.ts\` | \`cronAuthMiddleware\` — Google-signed OIDC token (signature + issuer + audience + invoker email) | Per-route on \`/internal/cron\` — Cloud Scheduler calls this, not a person |
| \`rateLimit.ts\` | \`authRateLimit\` — caps request count per IP/time window | Per-route on auth endpoints (login, verify-mfa, …) |
| \`recaptcha.ts\` | \`recaptchaMiddleware\` — verifies the reCAPTCHA token | Per-route on bot-exposed endpoints (register, request-trial, …) |
| \`errorHandler.ts\` | Verifies nothing — the one place that assembles the error response (see the error-propagation lesson) | App-level, last — catches every error handed to \`next(error)\` |

The real example connecting to the destructive-path worked example — \`authMiddleware\` + \`requireRole\` are wired at the router mount, not per-route:

\`\`\`ts
// src/routes/v1/index.ts
router.use(
  '/system-admin',
  authMiddleware,                            // 1. verify session JWT, attach req.user
  requireRole(USER_ROLES.SYSTEM_ADMIN),      // 2. check role -- from DB-backed payload, not the raw claim
  systemAdminRoutes                          // 3. only now does the route file's controller run
);
\`\`\`

**Why this matters for reading:** whatever Controller method you're looking at, it was never called in isolation — \`authMiddleware\`/\`requireRole\` (human callers) or \`apiKeyMiddleware\`/\`cronAuthMiddleware\` (machine callers) always ran first. The full prefix-to-guard mapping lives in \`api-patterns.md\`.

## Conclusion

\`src/middleware/\` is the one directory in this lesson's group of "foundations" that genuinely sits in the request path — every Controller method runs after some combination of auth, role, rate-limit, or reCAPTCHA checks, wired at the router mount rather than scattered per-route.`,
        contentTh: `ต่างจาก abstracts/config/helper — อันนี้อยู่ในสายจริง ทุก request ต้องวิ่งผ่านก่อนถึง Controller เสมอ ไม่ใช่แค่ยืนอยู่ข้างล่างเฉยๆ

| File | ตรวจอะไร | ใช้ตรงไหน |
| --- | --- | --- |
| \`auth.ts\` | \`authMiddleware\` — session JWT (cookie หรือ Bearer) → \`requireRole(...roles)\` — role จาก auth payload ที่ผูกกับ DB | router mount level (\`src/routes/v1/index.ts\`) — ก่อน Controller เสมอ |
| \`auth.ts\` | \`apiKeyMiddleware\` — API key | per-route ใน \`/external\` — ผู้เรียกเป็นเครื่อง ไม่ใช่คน |
| \`cronAuth.ts\` | \`cronAuthMiddleware\` — Google-signed OIDC token (signature + issuer + audience + invoker email) | per-route ใน \`/internal/cron\` — Cloud Scheduler เรียก ไม่ใช่คน |
| \`rateLimit.ts\` | \`authRateLimit\` — จำกัดจำนวนครั้งต่อ IP/หน้าต่างเวลา | per-route บน auth endpoint (login, verify-mfa, ...) |
| \`recaptcha.ts\` | \`recaptchaMiddleware\` — ตรวจ token reCAPTCHA | per-route บน endpoint ที่เสี่ยง bot (register, request-trial, ...) |
| \`errorHandler.ts\` | ไม่ตรวจอะไร — เป็นจุดเดียวที่ประกอบ error response (ดูบทเรียนเรื่อง error propagation) | app-level ตัวสุดท้าย จับทุก error ที่ \`next(error)\` ส่งมา |

ตัวอย่างจริงที่ต่อกับบทเรียน worked example ฝั่ง write — \`authMiddleware\` + \`requireRole\` ผูกไว้ที่ router mount ไม่ใช่ต่อ route:

\`\`\`ts
// src/routes/v1/index.ts
router.use(
  '/system-admin',
  authMiddleware,                            // 1. verify session JWT, attach req.user
  requireRole(USER_ROLES.SYSTEM_ADMIN),      // 2. check role -- from DB-backed payload, not the raw claim
  systemAdminRoutes                          // 3. only now does the route file's controller run
);
\`\`\`

**ทำไมเรื่องนี้สำคัญตอนอ่านโค้ด:** เจอ Controller method ไหนก็ตาม อย่าลืมว่ามันไม่เคยถูกเรียกลอยๆ — \`authMiddleware\`/\`requireRole\` (ผู้เรียกเป็นคน) หรือ \`apiKeyMiddleware\`/\`cronAuthMiddleware\` (ผู้เรียกเป็นเครื่อง) วิ่งผ่านมาก่อนเสมอ ดูตารางเต็มว่า prefix ไหนใช้ guard แบบไหนได้ใน \`api-patterns.md\`

## สรุป

\`src/middleware/\` คือ directory เดียวในกลุ่ม "รากฐาน" ที่อยู่ในเส้นทางจริงของ request — Controller method ทุกตัวรันหลังจากผ่านชุดตรวจ auth, role, rate-limit หรือ reCAPTCHA อย่างใดอย่างหนึ่งเสมอ ผูกไว้ที่ router mount ไม่ใช่กระจัดกระจายต่อ route`,
      },
      {
        slug: "worked-example-a-read-path",
        titleEn: "Worked Example A — Read Path GET /api/v1/events",
        titleTh: "ตัวอย่างจริง A — เส้นทางอ่าน GET /api/v1/events",
        order: 7,
        sectionEn: "Worked Examples",
        sectionTh: "ตัวอย่างจริง (Worked Examples)",
        contentEn: `One real endpoint, traced stop by stop. Same method works for any route in the repo.

**1 - Mount** — \`src/routes/v1/index.ts\`. Find the prefix first — every mount lives in one file.

\`\`\`ts
router.use('/events', authMiddleware, eventRoutes);
\`\`\`

**2 - Route** — \`src/routes/v1/event.routes.ts\`. \`GET /\` under that prefix → one controller method.

\`\`\`ts
router.get('/', eventController.getAllEvents);
\`\`\`

**3 - Controller** — \`src/controllers/EventController.ts\`. Destructures query params, Zod-validates, then instantiates the UseCase — its class name is the next stop.

\`\`\`ts
getAllEvents = async (req, res, next) => {
  const actorId = req.user?.actorId;
  const { searchString, threatLevel, tags, tlp, startDate, endDate, page, limit, sortBy, sort } = req.query;
  const payload = SGetEventRequest.safeParse({ actorId, searchString, /* ... */ });
  if (!payload.success) throw new ValidationError(/* first Zod issue */);
  const useCase = new GetAllEventsUseCase(services);
  const result = await useCase.execute(payload.data);
  this.sendSuccess(res, { data: result }, HTTP_STATUS.OK);
};
\`\`\`

**4 - UseCase** — \`src/usecases/event/GetAllEventsUseCase.ts\`. Strips \`actorId\`, calls one Service method — \`this.EventService\` names \`EventService.ts\` directly.

\`\`\`ts
async execute(request) {
  const { actorId, ...payload } = request;
  const result = await this.EventService.getAllWithPagination(payload);
  // reshape rows: split TLP tag, format Thai date, ...
  this.logger.info('...');
  return { rows, pagination: result.pagination };
}
\`\`\`

**5 - Service → Repository → Model** — \`src/services/EventService.ts\` → \`src/repositories/EventRepository.ts\` → \`src/models/Event.ts\`. \`EventService.getAllWithPagination\` (\`EventService.ts:77\`) passes straight through to \`EventRepository.getAllWithPagination\` (\`EventRepository.ts:38\`), which queries the \`Event\` model via \`mispModel\` — the \`misp\` database, confirmed, not \`secinsight\`.

## Conclusion

Five hops, each one a greppable signal from the previous lesson: mount → route → controller → usecase → service/repository/model. Tracing a read endpoint is a straight, predictable walk once you know what to grep for at each stop — even the database (\`misp\`, not \`secinsight\`) is confirmed by what the Repository actually imports, not assumed from the feature name.`,
        contentTh: `endpoint จริงหนึ่งเส้น ไล่ทีละสถานีให้ดู วิธีเดียวกันนี้ใช้ได้กับทุก route ใน repo

**1 · จุด mount** — \`src/routes/v1/index.ts\` หา prefix ก่อนเสมอ — ทุก mount อยู่ในไฟล์เดียว

\`\`\`ts
router.use('/events', authMiddleware, eventRoutes);
\`\`\`

**2 · Route** — \`src/routes/v1/event.routes.ts\` \`GET /\` ใต้ prefix นี้ → ไปที่ method controller ตัวเดียว

\`\`\`ts
router.get('/', eventController.getAllEvents);
\`\`\`

**3 · Controller** — \`src/controllers/EventController.ts\` destructure query param, validate ด้วย Zod แล้วค่อย \`new UseCase\` — ชื่อ class ก็คือสถานีถัดไปนั่นเอง

\`\`\`ts
getAllEvents = async (req, res, next) => {
  const actorId = req.user?.actorId;
  const { searchString, threatLevel, tags, tlp, startDate, endDate, page, limit, sortBy, sort } = req.query;
  const payload = SGetEventRequest.safeParse({ actorId, searchString, /* ... */ });
  if (!payload.success) throw new ValidationError(/* first Zod issue */);
  const useCase = new GetAllEventsUseCase(services);
  const result = await useCase.execute(payload.data);
  this.sendSuccess(res, { data: result }, HTTP_STATUS.OK);
};
\`\`\`

**4 · UseCase** — \`src/usecases/event/GetAllEventsUseCase.ts\` strip \`actorId\` ออก แล้วเรียก Service method ตัวเดียว — \`this.EventService\` ก็คือชื่อไฟล์ \`EventService.ts\` ตรงตัว

\`\`\`ts
async execute(request) {
  const { actorId, ...payload } = request;
  const result = await this.EventService.getAllWithPagination(payload);
  // reshape rows: split TLP tag, format Thai date, ...
  this.logger.info('...');
  return { rows, pagination: result.pagination };
}
\`\`\`

**5 · Service → Repository → Model** — \`src/services/EventService.ts\` → \`src/repositories/EventRepository.ts\` → \`src/models/Event.ts\` \`EventService.getAllWithPagination\` (\`EventService.ts:77\`) ส่งตรงไปที่ \`EventRepository.getAllWithPagination\` (\`EventRepository.ts:38\`) ซึ่ง query model \`Event\` ผ่าน \`mispModel\` — DB ที่ใช้จริงคือ \`misp\` ไม่ใช่ \`secinsight\`

## สรุป

ห้าจุด แต่ละจุดมีสัญญาณที่ grep เจอได้จากบทเรียนก่อนหน้า: mount → route → controller → usecase → service/repository/model การไล่ endpoint ฝั่งอ่านเป็นการเดินตรงไปเรื่อยๆ ที่คาดเดาได้ทันทีที่รู้ว่าต้อง grep หาอะไรในแต่ละจุด แม้แต่ database ที่ใช้จริง (\`misp\` ไม่ใช่ \`secinsight\`) ก็ยืนยันได้จากสิ่งที่ Repository import จริงๆ ไม่ใช่เดาจากชื่อฟีเจอร์`,
      },
      {
        slug: "worked-example-b-write-destructive-path",
        titleEn: "Worked Example B — Write + Destructive Path DELETE /api/v1/system-admin/events/:eventId",
        titleTh: "ตัวอย่างจริง B — เส้นทางเขียน/ทำลาย DELETE /api/v1/system-admin/events/:eventId",
        order: 8,
        sectionEn: "Worked Examples",
        sectionTh: "ตัวอย่างจริง (Worked Examples)",
        contentEn: `Reads aren't enough — you need the "write" shape too, especially a destructive op with a password-gate and DB-only authorization (never JWT claims).

**1 - Route** — \`src/routes/v1/system-admin.routes.ts\`. This mount carries \`requireRole(SYSTEM_ADMIN)\` at router level — not per-route.

\`\`\`ts
router.delete('/events/:eventId', systemAdminController.deleteEvent);
\`\`\`

**2 - Controller** — \`src/controllers/SystemAdminController.ts\`. Route param \`:eventId\` + body \`actorPassword\` validated together — the controller has no idea about the password-gate, it just forwards.

\`\`\`ts
deleteEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const actorId = req.user?.actorId;
  const { actorPassword } = req.body;
  const payload = SDeleteEventRequest.safeParse({ id: eventId, actorId, actorPassword });
  const useCase = new DeleteEventUseCase(services);
  const result = await useCase.execute(payload.data);
  this.sendSuccess(res, { data: result }, HTTP_STATUS.OK); // 200, not 201
};
\`\`\`

**3 - UseCase — the real password-gate + authz** — \`src/usecases/event/DeleteEventUseCase.ts\`. This is where "delete" is actually guarded, 3 layers deep: (1) re-fetch credential from DB (2) \`bcrypt.compare\` the real password — never trust the JWT (3) re-fetch the event to confirm it exists before deleting.

\`\`\`ts
async execute(request) {
  const { actorId, actorPassword, id } = request;
  // 1. re-fetch credential -- never trust anything from the request
  const existsActorCredential = await this.UserCredentialService.findByUserId({ userId: actorId });
  if (!existsActorCredential) throw new NotFoundError(/*...*/);
  // 2. verify real password -- password-gate for destructive ops
  const isActorPasswordValid = await bcrypt.compare(actorPassword, existsActorCredential.value);
  if (!isActorPasswordValid) throw new ValidationError(/*...*/);
  // 3. re-fetch target -- confirm it still exists
  const existEvent = await this.EventService.getById({ id });
  if (!existEvent) throw new NotFoundError(/*...*/);
  // 4. act, then validate the mutation actually happened
  const result = await this.EventService.delete({ id });
  if (!result.success) throw new ConflictError(/*...*/);
  this.logger.info('Event deleted successfully', { id, actorId });
  return { id, message: 'Event deleted successfully' };
}
\`\`\`

Notice: no try/catch wrapping the service calls — errors propagate naturally up to the single errorHandler (see the error-propagation lesson).

**4 - Service → external MISP API (no Repository/DB here)** — \`src/services/EventService.ts:298\` → \`src/helper/axiosInstance.ts\` (\`mispAdminApi\`).

Two spots where checking the real source contradicted the "textbook" story — logged honestly: \`getById\` (\`EventService.ts:100\`) actually returns \`null\` when the event is missing — a real naming-canon gap in this file (\`get*\` should never be null); \`DeleteEventUseCase\` already guards it with its own null-check regardless. \`delete\` (\`EventService.ts:298\`) skips \`EventRepository\` entirely — it calls \`mispAdminApi.delete(...)\` straight to the external MISP API. The actual "database" for this mutation is MISP's own backend, not local MySQL.

## Conclusion

A destructive endpoint adds three things a read path never needs: a password-gate that re-verifies against a freshly-fetched credential (never the JWT), a re-fetch of the target record right before acting on it, and a check that the mutation actually happened (\`result.success\`). And real code doesn't always match the naming canon exactly — \`EventService.getById\` genuinely returns \`null\` despite its \`get*\` name; noting that gap honestly is more useful than pretending the canon is perfectly followed everywhere.`,
        contentTh: `อ่านอย่างเดียวไม่พอ ต้องเห็นเส้นทาง "เขียน" ด้วย — โดยเฉพาะ destructive operation ที่มี password-gate และ authorize จากค่าใน DB เท่านั้น ไม่ใช่จาก JWT

**1 · Route** — \`src/routes/v1/system-admin.routes.ts\` mount นี้ผ่าน \`requireRole(SYSTEM_ADMIN)\` ที่ระดับ router — ไม่ใช่ per-route

\`\`\`ts
router.delete('/events/:eventId', systemAdminController.deleteEvent);
\`\`\`

**2 · Controller** — \`src/controllers/SystemAdminController.ts\` route param \`:eventId\` + body \`actorPassword\` ถูก validate เข้าด้วยกัน — controller ไม่รู้เรื่อง password-gate เลยสักนิด รู้แค่ว่าต้อง pass ต่อไป

\`\`\`ts
deleteEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const actorId = req.user?.actorId;
  const { actorPassword } = req.body;
  const payload = SDeleteEventRequest.safeParse({ id: eventId, actorId, actorPassword });
  const useCase = new DeleteEventUseCase(services);
  const result = await useCase.execute(payload.data);
  this.sendSuccess(res, { data: result }, HTTP_STATUS.OK); // 200, not 201
};
\`\`\`

**3 · UseCase — password-gate + authz จริง** — \`src/usecases/event/DeleteEventUseCase.ts\` นี่คือจุดที่ "การลบ" ถูกป้องกันจริง 3 ชั้น: (1) re-fetch credential จาก DB (2) \`bcrypt.compare\` กับ password จริง ไม่เชื่อค่าจาก JWT (3) re-fetch event เพื่อยืนยันว่ายังอยู่จริง ก่อนสั่งลบ

\`\`\`ts
async execute(request) {
  const { actorId, actorPassword, id } = request;
  // 1. re-fetch credential -- never trust anything from the request
  const existsActorCredential = await this.UserCredentialService.findByUserId({ userId: actorId });
  if (!existsActorCredential) throw new NotFoundError(/*...*/);
  // 2. verify real password -- password-gate for destructive ops
  const isActorPasswordValid = await bcrypt.compare(actorPassword, existsActorCredential.value);
  if (!isActorPasswordValid) throw new ValidationError(/*...*/);
  // 3. re-fetch target -- confirm it still exists
  const existEvent = await this.EventService.getById({ id });
  if (!existEvent) throw new NotFoundError(/*...*/);
  // 4. act, then validate the mutation actually happened
  const result = await this.EventService.delete({ id });
  if (!result.success) throw new ConflictError(/*...*/);
  this.logger.info('Event deleted successfully', { id, actorId });
  return { id, message: 'Event deleted successfully' };
}
\`\`\`

สังเกต: ไม่มี try/catch ห่อรอบ service call เลย — error จะ "ปล่อยผ่าน" (propagate) ขึ้นไปเองให้ errorHandler จัดการที่จุดเดียว (ดูบทเรียนเรื่อง error propagation)

**4 · Service → external MISP API (ไม่มี Repository/DB ในสเต็ปนี้)** — \`src/services/EventService.ts:298\` → \`src/helper/axiosInstance.ts\` (\`mispAdminApi\`)

2 จุดที่เช็กแล้วไม่ตรงกับ "ทฤษฎี" ในเอกสาร ขอบันทึกไว้ตามจริง: \`getById\` (\`EventService.ts:100\`) คืน \`null\` ได้จริงเมื่อไม่เจอ event — ขัดกับ canon ของชื่อ \`get*\` (ที่ควรการันตีว่าไม่ null) ถือเป็นช่องโหว่ naming จริงในไฟล์นี้ (แต่ \`DeleteEventUseCase\` ก็เช็ก null เองอยู่แล้ว เป็นการป้องกันซ้ำ) ส่วน \`delete\` (\`EventService.ts:298\`) ไม่แตะ \`EventRepository\` เลยสักนิด — เรียก \`mispAdminApi.delete(...)\` ตรงไปที่ MISP API ภายนอกทันที "DB" จริงของ mutation นี้จึงอยู่ฝั่ง MISP เอง ไม่ใช่ MySQL local

## สรุป

endpoint แบบทำลายข้อมูลเพิ่ม 3 อย่างที่เส้นทางอ่านไม่มี: password-gate ที่ตรวจซ้ำกับ credential ที่ re-fetch มาใหม่ (ไม่ใช่จาก JWT), การ re-fetch record เป้าหมายก่อนลงมือทำ, และการเช็กว่า mutation เกิดขึ้นจริง (\`result.success\`) และโค้ดจริงก็ไม่ได้ตรงกับ naming canon เป๊ะๆ เสมอไป — \`EventService.getById\` คืน \`null\` ได้จริงแม้ชื่อจะเป็น \`get*\` การบันทึกช่องว่างนี้ไว้ตามจริงมีประโยชน์กว่าการแสร้งว่า canon ถูกทำตามทุกจุด`,
      },
      {
        slug: "error-and-security-propagation-api",
        titleEn: "Error & Security Propagation",
        titleTh: "การไหลของ Error และ Security",
        order: 9,
        sectionEn: "Worked Examples",
        sectionTh: "ตัวอย่างจริง (Worked Examples)",
        contentEn: `These two flow across the layers, not down the chain — worth tracing separately.

### Error: thrown anywhere, caught once

Service/Repository/UseCase throw directly, no try/catch in between. Only the Controller try/catches, purely to call \`next(error)\`. The one place that formats an error response is \`src/middleware/errorHandler.ts\`.

| AppError | HTTP | Use for |
| --- | --- | --- |
| \`ValidationError\` | 400 | malformed input / wrong password |
| \`AuthenticationError\` | 401 | login failure / expired session |
| \`AuthorizationError\` | 403 | insufficient permission |
| \`NotFoundError\` | 404 | record not found (an \`exists*\` came back null) |
| \`ConflictError\` | 409 | duplicate / mutation didn't take (affected count != 1) |
| \`RateLimitError\` | 429 | Too Many Requests |
| \`UpstreamError\` / \`BadGatewayError\` | passthrough / 502 | external dependency down (MISP, SOC monitoring, ...) |
| \`ConfigurationError\` | 500 | missing env var at boot only — never rendered to a client |

**Never:** catch-and-rethrow to mask the original error — it hides the real cause and breaks the "propagate once" rule. Let the original error bubble.

### Security: never trust JWT, always re-fetch DB

\`req.user\` (from JWT) is a pointer only — \`actorId\`, \`actorRoleId\` are never authorization proof. Every authorizing UseCase re-fetches from DB before comparing (as in the destructive-path worked example, steps 1-3). The canonical pattern:

\`\`\`ts
// canonical pattern -- security.md
// bad: trusting the JWT claim directly
if (teamId !== actorTeamId) throw new AuthorizationError(/*...*/);

// good: re-fetch from DB, \`exists\` prefix, compare persisted values
const existsActor = await this.UserService.findById({ id: actorId });
if (!existsActor) throw new NotFoundError(/*...*/);
const existsTeam = await this.TeamService.findById({ id: teamId });
if (!existsTeam || existsTeam.id !== existsActor.teamId)
  throw new AuthorizationError('Not authorized for this team');
\`\`\`

Every DB-lookup variable is prefixed \`exists\` (\`existsActor\`, \`existsTeam\`) — the name alone signals "may be null, check me."

## Conclusion

Errors and authorization both cut across every layer rather than flowing down the chain: errors throw anywhere and get caught exactly once, at \`errorHandler.ts\`; authorization never trusts a JWT claim directly, it re-fetches the real record from the database first. Both rules exist for the same reason — a single point of truth beats trusting data that traveled through an untrusted hop.`,
        contentTh: `สองเรื่องนี้ไหล "ข้าม" layer ไม่ใช่ไหล "ลง" ตามสาย — ต้องรู้แยกไว้ต่างหาก

### Error: โยนที่ไหน จับที่เดียว

Service/Repository/UseCase throw ตรงๆ ไม่มี try/catch ห่อไว้ระหว่างทางเลย มีแค่ Controller ที่ try/catch เพื่อเรียก \`next(error)\` เท่านั้น จุดเดียวที่ format error response คือ \`src/middleware/errorHandler.ts\`

| AppError | HTTP | ใช้เมื่อ |
| --- | --- | --- |
| \`ValidationError\` | 400 | input ผิดรูปแบบ / password ไม่ถูกต้อง |
| \`AuthenticationError\` | 401 | login ล้มเหลว / session หมดอายุ |
| \`AuthorizationError\` | 403 | สิทธิ์ไม่พอ |
| \`NotFoundError\` | 404 | record หาไม่เจอ (มาจาก \`exists*\` ที่เป็น null) |
| \`ConflictError\` | 409 | ค่าซ้ำ / mutation ไม่สำเร็จ (affected count ≠ 1) |
| \`RateLimitError\` | 429 | Too Many Requests |
| \`UpstreamError\` / \`BadGatewayError\` | passthrough / 502 | API ภายนอกล่ม (MISP, SOC monitoring, ...) |
| \`ConfigurationError\` | 500 | env var หายตอน boot เท่านั้น ไม่เคยถูกส่งให้ client |

**อย่าทำ:** catch แล้ว throw error ใหม่ทับของเดิม (catch-and-rethrow) — วิธีนี้ซ่อนสาเหตุจริงไว้ และขัดกับกฎ "ปล่อยผ่านครั้งเดียว" ปล่อยให้ error เดิมวิ่งขึ้นไปเองดีกว่า

### Security: ไม่เชื่อ JWT, re-fetch จาก DB เสมอ

\`req.user\` (จาก JWT) เป็นแค่ "ตัวชี้" เท่านั้น — \`actorId\`, \`actorRoleId\` ไม่ใช่ของจริงที่เอาไป authorize ได้ ทุก UseCase ที่ต้อง authorize จึงต้อง re-fetch ค่าจาก DB ก่อนเทียบเสมอ (ดังตัวอย่างในบทเรียน worked example ฝั่ง write ขั้นที่ 1–3) — pattern มาตรฐานคือ:

\`\`\`ts
// canonical pattern -- security.md
// bad: trusting the JWT claim directly
if (teamId !== actorTeamId) throw new AuthorizationError(/*...*/);

// good: re-fetch from DB, \`exists\` prefix, compare persisted values
const existsActor = await this.UserService.findById({ id: actorId });
if (!existsActor) throw new NotFoundError(/*...*/);
const existsTeam = await this.TeamService.findById({ id: teamId });
if (!existsTeam || existsTeam.id !== existsActor.teamId)
  throw new AuthorizationError('Not authorized for this team');
\`\`\`

ตัวแปรที่มาจาก DB lookup ทั้งหมดต้องขึ้นต้นด้วย \`exists\` (\`existsActor\`, \`existsTeam\`) — เห็นชื่อปุ๊บรู้ทันทีว่าอาจเป็น null ต้องเช็ก

## สรุป

Error และ authorization ทั้งคู่ตัดผ่านทุก layer แทนที่จะไหลลงตามสาย: error โยนได้จากที่ไหนก็ได้ แล้วถูกจับแค่ครั้งเดียวที่ \`errorHandler.ts\`; authorization ไม่เชื่อ JWT claim ตรงๆ เลย ต้อง re-fetch record จริงจาก database ก่อนเสมอ ทั้งสองกฎมีเหตุผลเดียวกัน — จุดความจริงเดียวดีกว่าการเชื่อข้อมูลที่เดินทางผ่านจุดที่ไม่น่าเชื่อถือมา`,
      },
      {
        slug: "full-naming-canon-find-get",
        titleEn: "Full Naming Canon (find/get)",
        titleTh: "Naming Canon ฉบับเต็ม (find/get)",
        order: 10,
        sectionEn: "Naming & Tooling Conventions",
        sectionTh: "ธรรมเนียมการตั้งชื่อและเครื่องมือ",
        contentEn: `The prefix encodes the return contract — read the name, know the null-check obligation, without opening the implementation. Same rule at every layer (Service and Repository).

| Prefix | Shape | Return contract | Caller obligation | Real example in repo |
| --- | --- | --- | --- | --- |
| \`find<X>By<Key>\` | single record | \`X \\| null\` | \`exists*\` variable + \`NotFoundError\` | \`UserCredentialService.findByUserId\` |
| \`getAll<X>\` / \`get<X>Options\` | list/aggregate | never null — data or \`[]\` | no null-check | \`EventService.getAllWithPagination\` |
| \`get<X>By<Key>\` | single record | guaranteed — throws inside if missing | no null-check | \`RoleService.getNameById\` — a real example that does not yet follow canon cleanly: the repository underneath returns \`''\` instead of throwing when missing (\`EventService.getById\` also genuinely returns \`null\`, same gap — canon is mandatory for new code; older methods aren't fully retrofitted) |
| \`create<X>\` | mutation | created record | \`!record\` → \`ConflictError\` | \`UserService.create\` |
| \`update<X>By<Key>\` / \`delete<X>By<Key>\` | mutation | affected count | \`count !== 1\` → \`ConflictError\` | \`UserCredentialRepository.updateByUserId\` |

**One-sentence teach:** find may miss → check. get never misses → don't.

## Conclusion

Four prefixes, four contracts: \`find*\` may return \`null\` and demands a check; \`get*\` (plural/aggregate) never returns \`null\`; \`get*By<Key>\` (singular) is guaranteed or throws internally; mutation prefixes (\`create*\`, \`update*By*\`, \`delete*By*\`) return either the created record or an affected count. The canon isn't retrofitted everywhere in the real codebase — \`RoleService.getNameById\` and \`EventService.getById\` are documented exceptions, not secrets to discover the hard way.`,
        contentTh: `prefix ของ method บอก "สัญญา" การคืนค่าไว้ในตัว — เห็นชื่อก็รู้ทันทีว่าต้องเช็ก null ไหม โดยไม่ต้องเปิดดู implementation เลย กฎเดียวกันนี้ใช้กับทุก layer (Service และ Repository)

| Prefix | รูปแบบ | สัญญาการคืนค่า | ภาระของผู้เรียก | ตัวอย่างจริงใน repo |
| --- | --- | --- | --- | --- |
| \`find<X>By<Key>\` | record เดียว | \`X \\| null\` | ตัวแปร \`exists*\` + \`NotFoundError\` | \`UserCredentialService.findByUserId\` |
| \`getAll<X>\` / \`get<X>Options\` | list/aggregate | ไม่มีวัน null — data หรือ \`[]\` | ไม่ต้องเช็ก null | \`EventService.getAllWithPagination\` |
| \`get<X>By<Key>\` | record เดียว | การันตีมีค่า — โยน error เองภายในถ้าไม่เจอ | ไม่ต้องเช็ก null | \`RoleService.getNameById\` — ตัวอย่างจริงที่ยังไม่ทำตาม canon เป๊ะๆ: repository ชั้นล่างคืน \`''\` แทนที่จะ throw เมื่อไม่เจอ (\`EventService.getById\` เองก็คืน \`null\` ได้จริงเหมือนกัน ขัด canon แบบเดียวกัน — canon เป็นกฎบังคับสำหรับโค้ดใหม่เท่านั้น โค้ดเก่ายังไม่ได้ retrofit ให้ครบทุกจุด) |
| \`create<X>\` | mutation | record ที่สร้างแล้ว | \`!record\` → \`ConflictError\` | \`UserService.create\` |
| \`update<X>By<Key>\` / \`delete<X>By<Key>\` | mutation | จำนวนแถวที่ถูกกระทบ | \`count !== 1\` → \`ConflictError\` | \`UserCredentialRepository.updateByUserId\` |

**จำแบบประโยคเดียว:** find อาจไม่เจอ → ต้องเช็ก · get ไม่มีวันพลาด → ไม่ต้องเช็ก

## สรุป

สี่ prefix สี่สัญญา: \`find*\` อาจคืน \`null\` และต้องเช็กเสมอ; \`get*\` (แบบ list/aggregate) ไม่มีวันคืน \`null\`; \`get*By<Key>\` (record เดียว) การันตีมีค่าหรือ throw เองข้างใน; prefix ของ mutation (\`create*\`, \`update*By*\`, \`delete*By*\`) คืน record ที่สร้างหรือจำนวนแถวที่ถูกกระทบ canon นี้ยังไม่ถูก retrofit ทุกจุดในโค้ดจริง — \`RoleService.getNameById\` และ \`EventService.getById\` เป็นข้อยกเว้นที่บันทึกไว้ตามจริง ไม่ใช่เรื่องที่ต้องไปค้นพบเอาเองแบบยากๆ`,
        labs: [
          {
            id: "classify-the-return-contract",
            title: "Classify the Return Contract",
            instructions: "Complete `classifyContract` so it reads a method name and returns which return contract it has, per this lesson's canon: `\"nullable\"` for `find<X>By<Key>`, `\"list\"` for `getAll<X>`/`get<X>Options`, `\"guaranteed\"` for `get<X>By<Key>`, `\"mutation\"` for `create<X>`/`update<X>By<Key>`/`delete<X>By<Key>`.",
            starterCode: `function classifyContract(methodName: string): string {
  // TODO: return "nullable" | "list" | "guaranteed" | "mutation"
  return "";
}`,
            testCode: `check(classifyContract("findByUserId"), "nullable", "find*By* is nullable");
check(classifyContract("getAllWithPagination"), "list", "getAll* is a list, never null");
check(classifyContract("getOptions"), "list", "get*Options is a list, never null");
check(classifyContract("getNameById"), "guaranteed", "get*By* (not getAll/Options) is guaranteed");
check(classifyContract("create"), "mutation", "create* is a mutation");
check(classifyContract("updateByUserId"), "mutation", "update*By* is a mutation");
check(classifyContract("deleteByUserId"), "mutation", "delete*By* is a mutation");`,
            hint: "Check the mutation prefixes (create/update/delete) first, then getAll/Options, then the remaining find*By*/get*By* cases.",
          },
        ],
      },
      {
        slug: "use-graphify-instead-of-grep-api",
        titleEn: "Use graphify Instead of grep",
        titleTh: "ใช้ graphify แทน grep",
        order: 11,
        sectionEn: "Naming & Tooling Conventions",
        sectionTh: "ธรรมเนียมการตั้งชื่อและเครื่องมือ",
        contentEn: `This repo ships a knowledge graph precisely so you don't hand-search for the next stop. It's the primary tool — raw grep/Read is the fallback.

| You want | Run |
| --- | --- |
| Who calls this class / what does it call | \`graphify explain "EventController"\` |
| Trace a route → controller → usecase chain | chain \`explain\` per hop — **not** \`graphify path\` (the graph has too many disconnected components) |
| Architecture overview | \`graphify-out/GRAPH_REPORT.md\` |
| Find files by pattern | \`graphify query "<pattern>"\` |
| Why a decision was made (ADR) | \`graphify explain "<X>" --graph graphify-out-docs/graph.json\` |

## Conclusion

\`graphify\` answers "who calls this / what does this call" and "why was this decided" faster than grepping blind — reach for it first, and fall back to raw grep/Read only when the graph doesn't cover the question.`,
        contentTh: `repo นี้มี knowledge graph มาให้ เพื่อไม่ต้อง grep หาสถานีถัดไปด้วยมือเอง ถือเป็นเครื่องมือหลักที่ควรใช้ก่อน — grep/Read แบบดิบๆ เป็นแค่ตัวสำรอง

| ต้องการ | คำสั่ง |
| --- | --- |
| ใครเรียก class นี้ / class นี้เรียกอะไร | \`graphify explain "EventController"\` |
| ไล่ route → controller → usecase | ไล่ \`explain\` ทีละ hop — **ห้าม** ใช้ \`graphify path\` (graph มี component แยกจากกันเยอะ) |
| ภาพรวมสถาปัตยกรรม | \`graphify-out/GRAPH_REPORT.md\` |
| หาไฟล์ตาม pattern | \`graphify query "<pattern>"\` |
| ทำไมถึงตัดสินใจแบบนี้ (ADR) | \`graphify explain "<X>" --graph graphify-out-docs/graph.json\` |

## สรุป

\`graphify\` ตอบคำถาม "ใครเรียกสิ่งนี้ / สิ่งนี้เรียกอะไร" และ "ทำไมถึงตัดสินใจแบบนี้" ได้เร็วกว่าการ grep แบบเดาสุ่ม — ใช้มันก่อนเสมอ แล้วค่อยพึ่ง grep/Read แบบดิบๆ เฉพาะตอนที่ graph ไม่ครอบคลุมคำถามนั้น`,
      },
      {
        slug: "the-reusable-method-api",
        titleEn: "The Reusable Method",
        titleTh: "วิธีการที่ใช้ซ้ำได้",
        order: 12,
        sectionEn: "Naming & Tooling Conventions",
        sectionTh: "ธรรมเนียมการตั้งชื่อและเครื่องมือ",
        contentEn: `Apply this to any endpoint in the repo, front to back.

1. Find the URL prefix's mount line in \`src/routes/v1/index.ts\` — tells you the route file and which middleware/role guards it.
2. Open that route file — match HTTP verb + path to one controller method name.
3. Open the controller — read only the Zod schema name and the \`new <X>UseCase(...)\` line. Skip the validation boilerplate, it's identical everywhere.
4. Open the UseCase — read \`execute()\`. Every \`this.<X>Service.<method>\` call is a named next stop.
5. Open the Service — usually a thin pass-through to one Repository method. If it's not thin, that's where real domain logic lives.
6. Open the Repository — the actual SQL/Sequelize query and the model it targets. Check \`secinsightModel\` vs \`mispModel\` import to know which database.
7. If it's a destructive/write op, check the extras: is there a password-gate? does authz compare DB values, not JWT? does the mutation validate affected-count/result?
8. Model file is schema only — you don't need to read it unless a field is confusing.

## Conclusion

Eight steps, applied identically to every endpoint in this repo: mount → route → controller → usecase → service → repository → (destructive-op extras) → model-as-reference-only. This is the whole method this course has been building toward — everything in the earlier lessons was learning to do each step fast.`,
        contentTh: `ใช้ขั้นตอนนี้ไล่ endpoint ไหนก็ได้ใน repo ตั้งแต่ต้นจนจบ

1. หาบรรทัด mount ของ URL prefix ใน \`src/routes/v1/index.ts\` — บอกไฟล์ route และ middleware/role guard ที่ครอบอยู่
2. เปิดไฟล์ route — จับคู่ HTTP verb + path กับ method controller หนึ่งตัว
3. เปิด controller — อ่านแค่ชื่อ Zod schema กับบรรทัด \`new <X>UseCase(...)\` ข้าม boilerplate validate ที่เหมือนกันทุกที่ไปได้เลย
4. เปิด UseCase — อ่าน \`execute()\` ทุก \`this.<X>Service.<method>\` คือสถานีถัดไปที่มีชื่อชัดอยู่แล้ว
5. เปิด Service — ส่วนใหญ่ pass-through บางๆ ไป Repository หนึ่งตัว ถ้าไม่บาง นั่นแหละคือจุดที่ domain logic จริงอยู่
6. เปิด Repository — ดู query Sequelize/SQL จริง และ model ที่มันเล็งไปหา เช็ก import \`secinsightModel\` หรือ \`mispModel\` เพื่อรู้ว่าใช้ DB ไหน
7. ถ้าเป็น destructive/write op ให้เช็กเพิ่ม: password-gate มีไหม, authorize เทียบกับค่า DB ไม่ใช่ JWT, และ mutation เช็ก affected-count/result หรือไม่
8. Model ไม่ต้องอ่าน เว้นแต่ field ไหนงงจริงๆ — เป็นแค่ schema

## สรุป

แปดขั้นตอน ใช้แบบเดียวกันกับทุก endpoint ใน repo นี้: mount → route → controller → usecase → service → repository → (ส่วนเพิ่มสำหรับ destructive op) → model-ไว้อ้างอิงเท่านั้น นี่คือวิธีการทั้งหมดที่บทเรียนก่อนหน้าทั้งคอร์สค่อยๆ สร้างขึ้นมา — ทุกอย่างที่เรียนมาก่อนหน้านี้คือการฝึกทำแต่ละขั้นตอนให้เร็วขึ้น`,
      },
      {
        slug: "the-full-stack",
        titleEn: "The Full Stack",
        titleTh: "Stack ทั้งหมดของโปรเจกต์",
        order: 13,
        sectionEn: "Naming & Tooling Conventions",
        sectionTh: "ธรรมเนียมการตั้งชื่อและเครื่องมือ",
        contentEn: `A quick reference for every major piece of secinsight-api's stack, read straight from \`package.json\` — worth having loaded before the deeper lessons that follow.

| Category | Uses | Version |
| --- | --- | --- |
| Runtime | Bun (dev: \`bun run --watch\`, prod: \`bun run dist/server.js\`) | image \`oven/bun:1-slim\` |
| Language | TypeScript | \`^5\` |
| Framework | Express | \`^5.2.1\` |
| ORM / DB client | Sequelize + mysql2 (two MySQL databases: \`secinsight\`, \`misp\`) | \`^6.37.8\` / \`^3.15.3\` |
| Migrations | sequelize-cli | \`^6.6.3\` |
| Validation | Zod | \`^4.1.13\` |
| Auth / session | JWT (HS256) via \`jose\` + a DB-backed session table (\`user_sessions\`) + bcrypt + TOTP (\`otpauth\`) | \`^6.1.3\` / \`^6.0.0\` / \`^9.4.1\` |
| External HTTP client | axios + axios-retry | \`1.18.0\` / \`^4.5.0\` |
| Rate limiting | rate-limiter-flexible (in-memory) | \`^9.0.1\` |
| Security headers | helmet, cors | \`^8.1.0\` |
| Logger | winston | \`^3.19.0\` |
| Email | mailgun.js | \`^12.9.0\` |
| Other | cron, dayjs, multer, rss-parser, cookie-parser | -- |
| Testing | Jest + ts-jest + Supertest | \`^29.7.0\` |
| Lint / format | ESLint 9 + Prettier + husky + lint-staged + commitlint | -- |

Two things worth flagging up front, both covered in depth later in this course: **auth is a JWT-plus-DB-session pair, not a JWT alone** -- the session row is what actually gates access (see the login/MFA worked example). And **this API talks to two separate MySQL databases**, \`secinsight\` (this app's own data) and \`misp\` (an external platform's data -- read directly via Sequelize, written only through its REST API) -- see the database schema and MISP integration lessons.

## Conclusion

Bun + Express + TypeScript on the runtime side, Sequelize/mysql2 across two databases for persistence, Zod at every input boundary, and a JWT-plus-DB-session pair for auth -- this is the skeleton every later lesson in this course assumes you already have in view.`,
        contentTh: `สรุป stack หลักๆ ของ secinsight-api ทั้งหมด อ่านตรงจาก \`package.json\` — เหมาะเก็บไว้ในหัวก่อนเข้าบทเรียนที่ลึกกว่านี้

| หมวด | ใช้อะไร | เวอร์ชัน |
| --- | --- | --- |
| Runtime | Bun (dev: \`bun run --watch\`, prod: \`bun run dist/server.js\`) | image \`oven/bun:1-slim\` |
| Language | TypeScript | \`^5\` |
| Framework | Express | \`^5.2.1\` |
| ORM / DB client | Sequelize + mysql2 (MySQL สองฐาน: \`secinsight\`, \`misp\`) | \`^6.37.8\` / \`^3.15.3\` |
| Migration | sequelize-cli | \`^6.6.3\` |
| Validation | Zod | \`^4.1.13\` |
| Auth / session | JWT HS256 ผ่าน \`jose\` + session เก็บใน DB (\`user_sessions\`) + bcrypt + TOTP (\`otpauth\`) | \`^6.1.3\` / \`^6.0.0\` / \`^9.4.1\` |
| HTTP client ภายนอก | axios + axios-retry | \`1.18.0\` / \`^4.5.0\` |
| Rate limit | rate-limiter-flexible (in-memory) | \`^9.0.1\` |
| Security headers | helmet, cors | \`^8.1.0\` |
| Logger | winston | \`^3.19.0\` |
| Email | mailgun.js | \`^12.9.0\` |
| อื่นๆ | cron, dayjs, multer, rss-parser, cookie-parser | -- |
| Test | Jest + ts-jest + Supertest | \`^29.7.0\` |
| Lint / format | ESLint 9 + Prettier + husky + lint-staged + commitlint | -- |

สองเรื่องที่ควรรู้ไว้ก่อน ทั้งคู่จะพูดถึงลึกๆ ในบทเรียนหลังจากนี้: **auth เป็นคู่ JWT+session ใน DB ไม่ใช่ JWT อย่างเดียว** -- session row ต่างหากที่เป็นตัวคุมสิทธิ์จริง (ดูบทเรียน worked example ของ login/MFA) และ **API ตัวนี้คุยกับ MySQL สองฐานแยกกัน** คือ \`secinsight\` (ข้อมูลของแอปเราเอง) กับ \`misp\` (ข้อมูลของแพลตฟอร์มภายนอก -- อ่านตรงผ่าน Sequelize เขียนได้แค่ผ่าน REST API ของมันเท่านั้น) ดูบทเรียนเรื่อง database schema และ MISP integration

## สรุป

Bun + Express + TypeScript ฝั่ง runtime, Sequelize/mysql2 ข้ามสองฐานข้อมูลฝั่ง persistence, Zod ที่ทุก input boundary และคู่ JWT+session ใน DB สำหรับ auth — นี่คือโครงที่บทเรียนหลังจากนี้ทั้งหมดถือว่าพี่รู้อยู่แล้ว`,
      },
      {
        slug: "worked-example-c-login-mfa-session",
        titleEn: "Worked Example C — Login, MFA, and the Session Lifecycle",
        titleTh: "ตัวอย่างจริง C — Login, MFA และวงจรชีวิตของ Session",
        order: 14,
        sectionEn: "Auth, Data & Integrations",
        sectionTh: "Auth, ข้อมูล และการเชื่อมต่อภายนอก",
        contentEn: `\`POST /api/v1/auth/login\` -- picked because it doesn't end in one trip. It needs a follow-up call to \`POST /api/v1/auth/verify-mfa\` before the returned token can actually be used elsewhere, which is exactly why newcomers get confused seeing a 401 \`MFA verification required\` right after a "successful" login. It also has two guards in front of the controller (rate limit + reCAPTCHA) that the Event example never needed.

### 0. Mount -- where the path comes from

- \`src/app.ts:49\` -> \`app.use('/api', globalRateLimit, apiRoutes);\`
- \`src/routes/index.ts:11\` -> \`router.use('/v1', apiV1Router);\`
- \`src/routes/v1/index.ts:27\` -> \`router.use('/auth', authRoutes);\` (no mount-level middleware here -- guards are attached per-route instead)

### 1. Route -- \`src/routes/v1/auth.routes.ts:13-18\`

\`\`\`ts
router.post(
  '/login',
  authRateLimit,
  recaptchaMiddleware('login'),
  authController.login
);
\`\`\`

- \`authRateLimit\` (\`src/middleware/rateLimit.ts:118-137\`) -- caps attempts per IP against \`AUTH_MAX_ATTEMPTS\` / \`AUTH_WINDOW_MINUTES\`; over the limit throws \`RateLimitError\` (429).
- \`recaptchaMiddleware('login')\` (\`src/middleware/recaptcha.ts:47-99\`) -- reads the \`x-recaptcha-token\` header, verifies the action matches and the score clears \`RECAPTCHA_MIN_SCORE\` against Google reCAPTCHA Enterprise; can be switched off entirely with \`RECAPTCHA_ENABLED=false\`.

Other routes in the same file, for context:

| Method + path | Middleware | Handler |
| --- | --- | --- |
| \`POST /password-setup\` | \`authRateLimit\` | \`passwordSetup\` |
| \`POST /forgot-password\` | \`authRateLimit\`, \`forgotPasswordEmailRateLimit\`, \`recaptchaMiddleware('forgot_password')\` | \`forgotPassword\` |
| \`POST /logout\` | \`authMiddleware\` | \`logout\` |
| \`POST /introspect\` | \`apiKeyMiddleware\`, \`authMiddleware\` | \`introspect\` |
| \`POST /verify-mfa\` | \`authRateLimit\`, \`authMiddleware\`, \`recaptchaMiddleware('login')\` | \`verifyMfa\` |

### 2. Controller -- \`src/controllers/AuthController.ts:27-54\`

\`\`\`ts
login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const payload = SLoginRequest.safeParse({ email, password });

    if (!payload.success) {
      const message = payload.error.issues[0]?.message;
      throw new ValidationError(\`Invalid payload: \${message}\`);
    }

    const ipAddress = this.getClientIp(req);
    const deviceInfo = this.getUserAgent(req);

    const useCase = new AuthLoginUseCase(services);
    const result = await useCase.execute(payload.data, ipAddress, deviceInfo);

    this.sendSuccess(res, { data: result }, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
\`\`\`

- Destructures fields off \`req.body\` before handing them to Zod -- never passes the raw body through whole.
- A failed schema -> \`ValidationError\` -> 400.
- IP and user-agent are forwarded to the UseCase to be stored on the session.

### 3. UseCase -- \`src/usecases/auth/AuthLoginUseCase.ts:61-139\`

Order of operations:
1. \`UserService.authenticate({ email, password })\` -- verifies the password.
2. \`OrganizationSubscriptionService.getAllByOrganizationId(...)\`, checked for \`ACTIVE\` -- none -> 401 \`No active subscription\`.
3. \`UserPasswordResetService.findByUserId(...)\` -- a pending reset request -> 401 \`Password reset is pending\`.
4. \`UserSessionService.revokeAll(...)\` (line 95) -- kicks out every existing session first, so only one device can be logged in at a time.
5. \`TokenService.signToken(...)\` + \`generateRefreshToken()\`.
6. \`UserSessionService.createPreAccess(createSessionPayload)\` (line 124) -- creates a session of type \`PRE_ACCESS\`, \`isMfaVerified: false\`.

\`\`\`ts
const createSessionPayload = {
  userId: user.id,
  type: SESSION_ACCESS_TYPE.PRE_ACCESS,
  accessToken: token,
  refreshTokenHash: hash,
  isMfaVerified: false,
  deviceInfo: deviceInfo ?? null,
  ipAddress: ipAddress ?? null,
  accessTokenExpiresAt: dayjs().add(ACCESS_TOKEN_EXPIRY_MS, 'ms').toDate(),
  refreshTokenExpiresAt: dayjs().add(REFRESH_TOKEN_EXPIRY_MS, 'ms').toDate(),
};

const createdUserSession =
  await this.UserSessionService.createPreAccess(createSessionPayload);

return {
  accessToken: token,
  type: createdUserSession.session.type,
  mfaEnrolled: user.mfaEnabled,
  mfaVerified: createdUserSession.session.isMfaVerified,
  refreshToken: refreshToken,
  isConsentAccepted: user.isConsent,
};
\`\`\`

### 4. Service

**\`UserService.authenticate\` -- \`src/services/UserService.ts:126-174\`**

\`\`\`ts
const user = await this.UserRepository.findByEmail({ email: payload.email });
if (!user) throw new AuthenticationError('Invalid email or password', { message: 'User not found' });
if (!user.isActive) throw new AuthenticationError('Account is inactive', { message: 'Account is inactive' });
if (user.lockedUntil && dayjs().isBefore(dayjs(user.lockedUntil))) {
  throw new AuthenticationError('Account is locked', { message: 'Account has been locked due to too many failed login attempts' });
}
const credentials = await this.UserCredentialRepository.findByUserId({ userId: user.id });
if (!credentials) throw new AuthenticationError('Invalid email or password', { message: 'Credentials not found' });

const isValid = await bcrypt.compare(payload.password, credentials.value);
if (!isValid) {
  await this.handleFailedAttempt(user);
  throw new AuthenticationError('Invalid email or password', { message: 'Invalid password' });
}
await this.resetFailedAttempts(user);
return user;
\`\`\`

- The password lives in \`user_credentials\`, not \`users\`.
- Repeated failures lock the account (\`lockedUntil\`) -- a server-side lockout, separate from the per-IP rate limit above it.
- The message returned to the client is always the same generic \`Invalid email or password\`; the real reason lives only in server-side metadata.

**\`TokenService\` -- \`src/services/TokenService.ts\`**

\`\`\`ts
// 63-67
public generateRefreshToken(): { refreshToken: string; hash: string } {
  const refreshToken = randomUUID();
  const hash = createHash('sha256').update(refreshToken).digest('hex');
  return { refreshToken, hash };
}

// 75-86
public async signToken(payload: TSignTokenPayload): Promise<string> {
  const secret = getJwtSecret();
  const jwt = await new jose.SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_ACCESS_EXPIRES_IN)
    .sign(secret);
  return jwt;
}
\`\`\`

- The DB only ever stores a hash of the refresh token -- the real value is handed to the client exactly once.

### 5. Repository -- \`src/repositories/UserSessionRepository.ts:38-43\`

\`\`\`ts
async create(payload: TCreatePayload, transaction?: Transaction): Promise<UserSessionSchema> {
  return await UserSession.create(payload, { transaction });
}
\`\`\`

### 6. After login -- \`authMiddleware\` (\`src/middleware/auth.ts:59-158\`)

Every request that needs to be logged in passes through this middleware:
1. Reads \`Authorization: Bearer <token>\` -- missing -> 401.
2. \`TokenService.verifyToken\` checks the signature.
3. \`validateSession({ accessToken })\` looks the session up in the DB -- not found / expired -> 401.
4. \`session.revokedAt\` is set -> 401 \`Session has been revoked\`.
5. The session is still \`PRE_ACCESS\` or \`isMfaVerified === false\`, and the path isn't \`/api/v1/auth/verify-mfa\` or under \`/api/v1/mfa/\` -> 401 \`MFA verification required\`. **This is the step that explains the confusing 401 right after login.**
6. Token close to expiry -> a fresh one is issued in the \`X-New-Access-Token\` response header, which the client is expected to store in place of the old one.
7. The user is re-fetched from the DB and attached to \`req.user\` -- permissions always come from the DB, never from the token's own claims.

### 7. Closing the loop -- \`AuthVerifyMfaUseCase\` (\`src/usecases/auth/AuthVerifyMfaUseCase.ts:46-150\`)

- Looks up the session -- must be \`PRE_ACCESS\`, not expired, not revoked.
- Looks up \`user_mfa.secret\` -- verifies the OTP with \`UserMfaService.validateTotp\` (wrong code -> 409 \`Invalid OTP code\`).
- \`UserSessionService.upgradeToFullAccess(sessionId)\` -- flips the session to type \`ACCESS\`, \`isMfaVerified = true\`.
- The same access token keeps working -- no new token is issued at this step.

## Conclusion

A login that "succeeds" only creates a \`PRE_ACCESS\` session -- every other authenticated endpoint keeps returning 401 \`MFA verification required\` until \`verify-mfa\` upgrades that same session to \`ACCESS\`. The token itself never changes at that step; what changes is a row in \`user_sessions\`, which is exactly why \`authMiddleware\` re-checks the DB on every request instead of trusting anything encoded in the JWT.`,
        contentTh: `\`POST /api/v1/auth/login\` -- เลือกอันนี้เพราะไม่จบในเส้นเดียว ต้องยิง \`POST /api/v1/auth/verify-mfa\` ต่อ token ที่ได้มาถึงจะใช้เรียก endpoint อื่นได้จริง ซึ่งเป็นเหตุผลตรงๆ ว่าทำไมคนใหม่มักงงว่าทำไม login "สำเร็จ" แล้วยังโดน 401 \`MFA verification required\` และยังมี guard ก่อนถึง controller สองชั้น (rate limit + reCAPTCHA) ที่ตัวอย่าง Event ไม่เคยมี

### 0. Mount -- path มาจากไหน

- \`src/app.ts:49\` -> \`app.use('/api', globalRateLimit, apiRoutes);\`
- \`src/routes/index.ts:11\` -> \`router.use('/v1', apiV1Router);\`
- \`src/routes/v1/index.ts:27\` -> \`router.use('/auth', authRoutes);\` (ไม่มี middleware ระดับ mount ตรงนี้ -- guard ติดรายเส้นแทน)

### 1. Route -- \`src/routes/v1/auth.routes.ts:13-18\`

\`\`\`ts
router.post(
  '/login',
  authRateLimit,
  recaptchaMiddleware('login'),
  authController.login
);
\`\`\`

- \`authRateLimit\` (\`src/middleware/rateLimit.ts:118-137\`) -- จำกัดจำนวนครั้งต่อ IP ตาม \`AUTH_MAX_ATTEMPTS\` / \`AUTH_WINDOW_MINUTES\` เกิน -> \`RateLimitError\` (429)
- \`recaptchaMiddleware('login')\` (\`src/middleware/recaptcha.ts:47-99\`) -- อ่าน header \`x-recaptcha-token\` ตรวจกับ Google reCAPTCHA Enterprise ว่า action ตรงและ score ผ่าน \`RECAPTCHA_MIN_SCORE\` ปิดได้ทั้งหมดด้วย \`RECAPTCHA_ENABLED=false\`

เส้นอื่นในไฟล์เดียวกัน สำหรับบริบท:

| Method + path | Middleware | Handler |
| --- | --- | --- |
| \`POST /password-setup\` | \`authRateLimit\` | \`passwordSetup\` |
| \`POST /forgot-password\` | \`authRateLimit\`, \`forgotPasswordEmailRateLimit\`, \`recaptchaMiddleware('forgot_password')\` | \`forgotPassword\` |
| \`POST /logout\` | \`authMiddleware\` | \`logout\` |
| \`POST /introspect\` | \`apiKeyMiddleware\`, \`authMiddleware\` | \`introspect\` |
| \`POST /verify-mfa\` | \`authRateLimit\`, \`authMiddleware\`, \`recaptchaMiddleware('login')\` | \`verifyMfa\` |

### 2. Controller -- \`src/controllers/AuthController.ts:27-54\`

\`\`\`ts
login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const payload = SLoginRequest.safeParse({ email, password });

    if (!payload.success) {
      const message = payload.error.issues[0]?.message;
      throw new ValidationError(\`Invalid payload: \${message}\`);
    }

    const ipAddress = this.getClientIp(req);
    const deviceInfo = this.getUserAgent(req);

    const useCase = new AuthLoginUseCase(services);
    const result = await useCase.execute(payload.data, ipAddress, deviceInfo);

    this.sendSuccess(res, { data: result }, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
\`\`\`

- แยก field จาก \`req.body\` ก่อนแล้วค่อยส่งให้ Zod (ห้ามส่ง \`req.body\` ทั้งก้อนตรงๆ)
- ผิด schema -> \`ValidationError\` -> 400
- ส่ง IP และ user-agent ต่อให้ UseCase ไปเก็บไว้ที่ session

### 3. UseCase -- \`src/usecases/auth/AuthLoginUseCase.ts:61-139\`

ลำดับงาน:
1. \`UserService.authenticate({ email, password })\` -- ตรวจรหัสผ่าน
2. \`OrganizationSubscriptionService.getAllByOrganizationId(...)\` เช็กสถานะ \`ACTIVE\` -- ไม่มี -> 401 \`No active subscription\`
3. \`UserPasswordResetService.findByUserId(...)\` -- มีคำขอรีเซ็ตค้างอยู่ -> 401 \`Password reset is pending\`
4. \`UserSessionService.revokeAll(...)\` (บรรทัด 95) -- เตะ session เก่าทั้งหมดออกก่อน ทำให้ล็อกอินได้ทีละเครื่องเท่านั้น
5. \`TokenService.signToken(...)\` + \`generateRefreshToken()\`
6. \`UserSessionService.createPreAccess(createSessionPayload)\` (บรรทัด 124) -- สร้าง session ประเภท \`PRE_ACCESS\`, \`isMfaVerified: false\`

\`\`\`ts
const createSessionPayload = {
  userId: user.id,
  type: SESSION_ACCESS_TYPE.PRE_ACCESS,
  accessToken: token,
  refreshTokenHash: hash,
  isMfaVerified: false,
  deviceInfo: deviceInfo ?? null,
  ipAddress: ipAddress ?? null,
  accessTokenExpiresAt: dayjs().add(ACCESS_TOKEN_EXPIRY_MS, 'ms').toDate(),
  refreshTokenExpiresAt: dayjs().add(REFRESH_TOKEN_EXPIRY_MS, 'ms').toDate(),
};

const createdUserSession =
  await this.UserSessionService.createPreAccess(createSessionPayload);

return {
  accessToken: token,
  type: createdUserSession.session.type,
  mfaEnrolled: user.mfaEnabled,
  mfaVerified: createdUserSession.session.isMfaVerified,
  refreshToken: refreshToken,
  isConsentAccepted: user.isConsent,
};
\`\`\`

### 4. Service

**\`UserService.authenticate\` -- \`src/services/UserService.ts:126-174\`**

\`\`\`ts
const user = await this.UserRepository.findByEmail({ email: payload.email });
if (!user) throw new AuthenticationError('Invalid email or password', { message: 'User not found' });
if (!user.isActive) throw new AuthenticationError('Account is inactive', { message: 'Account is inactive' });
if (user.lockedUntil && dayjs().isBefore(dayjs(user.lockedUntil))) {
  throw new AuthenticationError('Account is locked', { message: 'Account has been locked due to too many failed login attempts' });
}
const credentials = await this.UserCredentialRepository.findByUserId({ userId: user.id });
if (!credentials) throw new AuthenticationError('Invalid email or password', { message: 'Credentials not found' });

const isValid = await bcrypt.compare(payload.password, credentials.value);
if (!isValid) {
  await this.handleFailedAttempt(user);
  throw new AuthenticationError('Invalid email or password', { message: 'Invalid password' });
}
await this.resetFailedAttempts(user);
return user;
\`\`\`

- รหัสผ่านอยู่ที่ตาราง \`user_credentials\` ไม่ใช่ \`users\`
- ผิดหลายครั้งติด -> ล็อกบัญชี (\`lockedUntil\`) -- เป็น lockout ฝั่ง server แยกจาก rate limit ต่อ IP ข้างบน
- ข้อความที่ส่งให้ client เป็นแบบกลางๆ เหมือนกันเสมอ (\`Invalid email or password\`) เหตุผลจริงอยู่แค่ใน metadata ฝั่ง server เท่านั้น

**\`TokenService\` -- \`src/services/TokenService.ts\`**

\`\`\`ts
// 63-67
public generateRefreshToken(): { refreshToken: string; hash: string } {
  const refreshToken = randomUUID();
  const hash = createHash('sha256').update(refreshToken).digest('hex');
  return { refreshToken, hash };
}

// 75-86
public async signToken(payload: TSignTokenPayload): Promise<string> {
  const secret = getJwtSecret();
  const jwt = await new jose.SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_ACCESS_EXPIRES_IN)
    .sign(secret);
  return jwt;
}
\`\`\`

- DB เก็บแค่ hash ของ refresh token เท่านั้น -- ค่าจริงส่งให้ client แค่ครั้งเดียว

### 5. Repository -- \`src/repositories/UserSessionRepository.ts:38-43\`

\`\`\`ts
async create(payload: TCreatePayload, transaction?: Transaction): Promise<UserSessionSchema> {
  return await UserSession.create(payload, { transaction });
}
\`\`\`

### 6. หลังล็อกอิน -- \`authMiddleware\` (\`src/middleware/auth.ts:59-158\`)

ทุก request ที่ต้อง login ก่อนจะวิ่งผ่าน middleware นี้:
1. อ่าน \`Authorization: Bearer <token>\` -- ไม่มี -> 401
2. \`TokenService.verifyToken\` ตรวจลายเซ็น
3. \`validateSession({ accessToken })\` หา session ใน DB -- ไม่เจอ/หมดอายุ -> 401
4. \`session.revokedAt\` มีค่า -> 401 \`Session has been revoked\`
5. session ยังเป็น \`PRE_ACCESS\` หรือ \`isMfaVerified === false\` และ path ไม่ใช่ \`/api/v1/auth/verify-mfa\` หรือใต้ \`/api/v1/mfa/\` -> 401 \`MFA verification required\` **นี่คือขั้นตอนที่อธิบาย 401 ที่งงๆ หลัง login**
6. token ใกล้หมดอายุ -> ออก token ใหม่ให้ทาง header \`X-New-Access-Token\` ซึ่ง client ต้องเก็บไว้แทนของเดิม
7. ดึง user จาก DB ใหม่แล้วใส่ใน \`req.user\` -- สิทธิ์ทั้งหมดมาจาก DB เสมอ ไม่เคยมาจาก claim ในตัว token เอง

### 7. ปิดวงจร -- \`AuthVerifyMfaUseCase\` (\`src/usecases/auth/AuthVerifyMfaUseCase.ts:46-150\`)

- หา session -- ต้องเป็น \`PRE_ACCESS\`, ยังไม่หมดอายุ, ยังไม่ถูก revoke
- หา \`user_mfa.secret\` -- ตรวจ OTP ด้วย \`UserMfaService.validateTotp\` (ผิด -> 409 \`Invalid OTP code\`)
- \`UserSessionService.upgradeToFullAccess(sessionId)\` -- เปลี่ยน session เป็นประเภท \`ACCESS\`, \`isMfaVerified = true\`
- ใช้ access token เดิมต่อได้เลย ไม่มีการออก token ใหม่ในขั้นนี้

## สรุป

login ที่ "สำเร็จ" สร้างได้แค่ session ประเภท \`PRE_ACCESS\` เท่านั้น -- endpoint ที่ต้อง auth อื่นๆ จะยัง 401 \`MFA verification required\` อยู่จนกว่า \`verify-mfa\` จะอัปเกรด session แถวเดียวกันนั้นให้เป็น \`ACCESS\` ตัว token เองไม่เปลี่ยนในขั้นนี้เลย สิ่งที่เปลี่ยนคือแถวหนึ่งใน \`user_sessions\` ซึ่งเป็นเหตุผลตรงๆ ว่าทำไม \`authMiddleware\` ต้องเช็ก DB ใหม่ทุก request แทนที่จะเชื่อค่าที่เข้ารหัสไว้ใน JWT`,
      },
      {
        slug: "database-schema-users-orgs-subscriptions",
        titleEn: "Database Schema — Users, Organizations & Subscriptions",
        titleTh: "Database Schema — Users, Organizations และ Subscriptions",
        order: 15,
        sectionEn: "Auth, Data & Integrations",
        sectionTh: "Auth, ข้อมูล และการเชื่อมต่อภายนอก",
        contentEn: `Model registration splits into two sets in \`src/models/index.ts\`: \`misp\` via \`SequelizeConnection.getClient('mispConnection')\`, and \`secinsight\` via \`SequelizeConnection.getClient('secinsightConnection')\`. Migrations only exist on the \`secinsight\` side (\`src/sequelize/secinsight/migrations/\`, 74 files as of this writing) -- there's no \`src/sequelize/misp\` migrations folder, because those tables belong to MISP itself, not to this app (see the next lesson).

### Users & login

| Table | Key columns | Relationships |
| --- | --- | --- |
| \`users\` | \`email\` (unique), \`organizationId\`, \`teamId\` (nullable), \`roleId\`, \`isActive\`, \`mfaEnabled\`, \`failedLoginAttempts\`, \`lockedUntil\`, \`isConsent\` | belongsTo Organization, Team, Role · hasMany UserSession (\`User.ts:161-179\`) |
| \`user_credentials\` | \`userId\`, \`type\`, \`value\` (bcrypt hash) | belongsTo User |
| \`user_sessions\` | \`userId\`, \`type\` (\`PRE_ACCESS\` / \`ACCESS\`), \`accessToken\`, \`refreshTokenHash\`, \`isMfaVerified\`, \`accessTokenExpiresAt\`, \`refreshTokenExpiresAt\`, \`revokedAt\` | belongsTo User |
| \`user_mfa\` | \`userId\` (unique), \`type\` (TOTP), \`secret\`, \`isVerified\`, \`backupCodes\` | belongsTo User |
| \`user_password_resets\` | \`userId\`, \`token\`, \`expireAt\`, \`deletedAt\` | belongsTo User |
| \`roles\` | \`id\`, \`name\` | -- |
| \`api_keys\` | \`keyHash\` (unique), \`keyPrefix\`, \`scopes\`, \`rateLimit\`, \`active\`, \`expiresAt\`, \`createdBy\` | belongsTo User |

This table set is exactly what the login/MFA worked example touches -- \`users\` + \`user_credentials\` for \`UserService.authenticate\`, \`user_sessions\` for the whole \`PRE_ACCESS\` -> \`ACCESS\` lifecycle, \`user_mfa\` for the OTP check.

### Organizations, packages, and entitlements

| Table | Key columns | Relationships |
| --- | --- | --- |
| \`organizations\` | \`nameEn\`, \`nameTh\`, \`industryId\`, address fields, \`phone\` | belongsTo Industry |
| \`teams\` | \`nameEn\`, \`nameTh\`, \`organizationId\` (unique across 3 columns together) | belongsTo Organization |
| \`industries\` | \`nameEn\`, \`nameTh\` | -- |
| \`packages\` | \`code\` (unique), bilingual name/description, \`range\` | hasOne PackageDefault |
| \`package_defaults\` | \`packageId\` (PK), \`maxUser\`, \`maxTeam\`, \`usersPerTeam\`, \`price\`, \`currency\` | belongsTo Package |
| \`organization_subscriptions\` | \`organizationId\`, \`packageId\`, \`maxUser\`, \`maxTeam\`, \`price\`, \`startDate\`, \`endDate\`, \`status\` | belongsTo Organization, Package, User (creator/updater) |
| \`features\` | \`key\` (unique), \`category\`, \`valueType\`, \`resetPeriod\`, \`deletedAt\` (paranoid/soft-delete) | -- |
| \`feature_limits\` | \`featureId\`, \`packageId\`, \`valueBoolean\` / \`valueInteger\` / \`valueText\` | belongsTo Feature, Package |
| \`organization_feature_overrides\` | \`organizationId\`, \`subscriptionId\`, \`featureId\`, override value | belongsTo Organization, Subscription, Feature |
| \`feature_usage\` | \`organizationId\`, \`featureId\`, \`usedCount\`, \`resetPeriod\` | belongsTo Organization, Feature |

Two rules worth remembering here, both referenced directly in the login worked example: **an organization needs an \`ACTIVE\` row in \`organization_subscriptions\` for its users to log in at all** (step 2 of \`AuthLoginUseCase\`), and **feature access = that subscription's \`feature_limits\`, overridden per-organization by \`organization_feature_overrides\` when one exists.**

### Free-trial requests

| Table | Key columns | Relationships |
| --- | --- | --- |
| \`request_references\` | \`code\` (unique), \`packageId\`, \`status\`, \`approvedBy\`, \`rejectedBy\`, \`reason\`, \`isConsent\` | hasOne OrganizationRequest |
| \`organization_requests\` | \`requestReferenceId\` (unique), bilingual name/address, \`industryId\`, contact fields | hasMany UserRequest |
| \`user_requests\` | \`organizationRequestId\`, bilingual name/position, \`roleId\`, \`email\`, \`phone\` | belongsTo OrganizationRequest, Role |
| \`trial_feedback\` | \`token\` (unique), \`userId\`, \`organizationId\`, \`subscriptionId\`, \`rating1\`-\`rating4\`, \`requestTrialExtension\`, \`extensionSubscriptionId\` | hasMany TrialFeedbackFeature |
| \`trial_feedback_features\` | \`trialFeedbackId\`, \`featureId\` | -- |

A \`user_requests\` row only becomes a real row in \`users\` once the parent request is approved (per \`CONTEXT.md\`) -- it's a staging table, not a preview of an account that already exists.

## Conclusion

Three clusters worth keeping mentally separate: identity (\`users\` + \`user_credentials\` + \`user_sessions\` + \`user_mfa\`), entitlement (\`organizations\` + \`packages\` + \`feature_limits\` + overrides, gating both login and feature access), and the free-trial funnel (\`request_references\` through \`user_requests\`, which only graduates into a real user on approval). All three live in the \`secinsight\` database.`,
        contentTh: `การลงทะเบียน model แยกเป็นสองชุดใน \`src/models/index.ts\`: \`misp\` ผ่าน \`SequelizeConnection.getClient('mispConnection')\` และ \`secinsight\` ผ่าน \`SequelizeConnection.getClient('secinsightConnection')\` migration มีอยู่แค่ฝั่ง \`secinsight\` เท่านั้น (\`src/sequelize/secinsight/migrations/\`, 74 ไฟล์ ณ ตอนที่เขียนนี้) -- ไม่มีโฟลเดอร์ migration ของ \`misp\` เพราะตารางฝั่งนั้นเป็นของแอป MISP เอง ไม่ใช่ของเรา (ดูบทเรียนถัดไป)

### ผู้ใช้และการเข้าสู่ระบบ

| ตาราง | คอลัมน์สำคัญ | ความสัมพันธ์ |
| --- | --- | --- |
| \`users\` | \`email\` (unique), \`organizationId\`, \`teamId\` (nullable), \`roleId\`, \`isActive\`, \`mfaEnabled\`, \`failedLoginAttempts\`, \`lockedUntil\`, \`isConsent\` | belongsTo Organization, Team, Role · hasMany UserSession (\`User.ts:161-179\`) |
| \`user_credentials\` | \`userId\`, \`type\`, \`value\` (bcrypt hash) | belongsTo User |
| \`user_sessions\` | \`userId\`, \`type\` (\`PRE_ACCESS\` / \`ACCESS\`), \`accessToken\`, \`refreshTokenHash\`, \`isMfaVerified\`, \`accessTokenExpiresAt\`, \`refreshTokenExpiresAt\`, \`revokedAt\` | belongsTo User |
| \`user_mfa\` | \`userId\` (unique), \`type\` (TOTP), \`secret\`, \`isVerified\`, \`backupCodes\` | belongsTo User |
| \`user_password_resets\` | \`userId\`, \`token\`, \`expireAt\`, \`deletedAt\` | belongsTo User |
| \`roles\` | \`id\`, \`name\` | -- |
| \`api_keys\` | \`keyHash\` (unique), \`keyPrefix\`, \`scopes\`, \`rateLimit\`, \`active\`, \`expiresAt\`, \`createdBy\` | belongsTo User |

ชุดตารางนี้คือสิ่งที่บทเรียน worked example ของ login/MFA แตะโดยตรง -- \`users\` + \`user_credentials\` สำหรับ \`UserService.authenticate\`, \`user_sessions\` สำหรับวงจร \`PRE_ACCESS\` -> \`ACCESS\` ทั้งหมด, \`user_mfa\` สำหรับการตรวจ OTP

### องค์กร แพ็กเกจ และสิทธิ์ใช้งาน

| ตาราง | คอลัมน์สำคัญ | ความสัมพันธ์ |
| --- | --- | --- |
| \`organizations\` | \`nameEn\`, \`nameTh\`, \`industryId\`, ที่อยู่, \`phone\` | belongsTo Industry |
| \`teams\` | \`nameEn\`, \`nameTh\`, \`organizationId\` (unique รวมสามคอลัมน์) | belongsTo Organization |
| \`industries\` | \`nameEn\`, \`nameTh\` | -- |
| \`packages\` | \`code\` (unique), ชื่อ/คำอธิบายสองภาษา, \`range\` | hasOne PackageDefault |
| \`package_defaults\` | \`packageId\` (PK), \`maxUser\`, \`maxTeam\`, \`usersPerTeam\`, \`price\`, \`currency\` | belongsTo Package |
| \`organization_subscriptions\` | \`organizationId\`, \`packageId\`, \`maxUser\`, \`maxTeam\`, \`price\`, \`startDate\`, \`endDate\`, \`status\` | belongsTo Organization, Package, User (creator/updater) |
| \`features\` | \`key\` (unique), \`category\`, \`valueType\`, \`resetPeriod\`, \`deletedAt\` (paranoid) | -- |
| \`feature_limits\` | \`featureId\`, \`packageId\`, \`valueBoolean\` / \`valueInteger\` / \`valueText\` | belongsTo Feature, Package |
| \`organization_feature_overrides\` | \`organizationId\`, \`subscriptionId\`, \`featureId\`, ค่า override | belongsTo Organization, Subscription, Feature |
| \`feature_usage\` | \`organizationId\`, \`featureId\`, \`usedCount\`, \`resetPeriod\` | belongsTo Organization, Feature |

สองกฎที่ควรจำไว้ตรงนี้ ทั้งคู่ถูกอ้างถึงตรงๆ ในบทเรียน worked example ของ login: **องค์กรต้องมีแถวสถานะ \`ACTIVE\` ใน \`organization_subscriptions\` ผู้ใช้ถึงจะล็อกอินได้เลย** (ขั้นที่ 2 ของ \`AuthLoginUseCase\`) และ **สิทธิ์ใช้ฟีเจอร์ = \`feature_limits\` ของ subscription นั้น ทับด้วย \`organization_feature_overrides\` ถ้ามี**

### คำขอทดลองใช้ (free trial)

| ตาราง | คอลัมน์สำคัญ | ความสัมพันธ์ |
| --- | --- | --- |
| \`request_references\` | \`code\` (unique), \`packageId\`, \`status\`, \`approvedBy\`, \`rejectedBy\`, \`reason\`, \`isConsent\` | hasOne OrganizationRequest |
| \`organization_requests\` | \`requestReferenceId\` (unique), ชื่อ/ที่อยู่สองภาษา, \`industryId\`, ผู้ติดต่อ | hasMany UserRequest |
| \`user_requests\` | \`organizationRequestId\`, ชื่อ/ตำแหน่งสองภาษา, \`roleId\`, \`email\`, \`phone\` | belongsTo OrganizationRequest, Role |
| \`trial_feedback\` | \`token\` (unique), \`userId\`, \`organizationId\`, \`subscriptionId\`, \`rating1\`-\`rating4\`, \`requestTrialExtension\`, \`extensionSubscriptionId\` | hasMany TrialFeedbackFeature |
| \`trial_feedback_features\` | \`trialFeedbackId\`, \`featureId\` | -- |

แถวใน \`user_requests\` จะกลายเป็นแถวจริงใน \`users\` ก็ต่อเมื่อคำขอหลักได้รับอนุมัติแล้วเท่านั้น (ตาม \`CONTEXT.md\`) -- มันเป็นตาราง staging ไม่ใช่ตัวอย่างล่วงหน้าของ account ที่มีอยู่จริงแล้ว

## สรุป

สามกลุ่มที่ควรแยกไว้ในหัว: identity (\`users\` + \`user_credentials\` + \`user_sessions\` + \`user_mfa\`), สิทธิ์ใช้งาน (\`organizations\` + \`packages\` + \`feature_limits\` + override ซึ่งคุมทั้ง login และการเข้าถึงฟีเจอร์) และ funnel ของ free trial (\`request_references\` ไปจนถึง \`user_requests\` ที่จะกลายเป็น user จริงก็ต่อเมื่อได้รับอนุมัติเท่านั้น) ทั้งสามกลุ่มอยู่ในฐาน \`secinsight\` ทั้งหมด`,
      },
      {
        slug: "database-schema-cve-ai-insight-misp",
        titleEn: "Database Schema — CVEs, AI Insight & the MISP Tables",
        titleTh: "Database Schema — CVE, AI Insight และตารางฝั่ง MISP",
        order: 16,
        sectionEn: "Auth, Data & Integrations",
        sectionTh: "Auth, ข้อมูล และการเชื่อมต่อภายนอก",
        contentEn: `Continuing from the users/organizations tables in the previous lesson -- this one covers the \`secinsight\` database's CVE and AI Insight tables, plus the \`misp\` database tables this app actually reads.

### CVEs, in \`secinsight\`

| Table | Key columns |
| --- | --- |
| \`cves\` | \`cveId\` (unique, a string like \`CVE-2024-1234\`), \`baseScore\`, \`baseSeverity\`, \`cvssVector\`, \`kev\`, \`epss\`, trend numbers, \`lastSyncedAt\` |
| \`cve_affected_configs\` | \`cveId\`, \`vendor\`, \`product\`, \`cpe\`, version range |
| \`cve_references\`, \`cve_lab_assets\`, \`cve_trend_daily\`, \`kev_profiles\` | supporting CVE data |
| \`organization_asset_profiles\` | software an organization actually runs (\`vendor\`, \`product\`, \`version\`, \`cpe\`) |
| \`organization_cve_matches\` | which CVE matches which organization asset, plus remediation status (\`status\`, \`assignedTo\`, \`dueAt\`, \`resolvedAt\`) |

Every CVE-related table joins on \`cveId\` -- the string, not \`cves.id\` (\`sourceKey\`/\`targetKey: 'cveId'\` in \`Cve.ts:186-207\`). This is worth internalizing before writing any query that touches this cluster; reaching for the numeric \`id\` the way you would on most other tables produces a query that silently returns nothing.

### AI Insight & news

| Table | Key columns |
| --- | --- |
| \`ai_insight_items\` | \`organizationId\`, \`category\`, \`score\`, \`severity\`, bilingual title/summary/recommendation (full-text indexed) |
| \`ai_insight_tags\`, \`ai_insight_item_tags\` | tags + the join table |
| \`organization_news_filters\` | \`organizationId\`, \`tagId\` (referencing a tag that actually lives in the \`misp\` database -- a cross-database reference) |

### The \`misp\` database -- tables this app reads

| Table | Key columns | Relationships |
| --- | --- | --- |
| \`events\` | \`info\`, \`date\`, \`threatLevelId\`, \`published\`, \`distribution\`, \`timestamp\` | hasMany Attribute · belongsToMany Tags via \`event_tags\` · belongsTo ThreatLevel |
| \`attributes\` | \`eventId\`, \`objectId\`, \`category\`, \`type\`, \`value1\`, \`value2\`, \`toIds\`, \`deleted\` | belongsTo Event, Object |
| \`objects\` | \`name\`, \`metaCategory\` (mapped from the actual column \`meta-category\`), \`eventId\` | hasMany Attribute |
| \`tags\` / \`event_tags\` | tag name (TLP tags included), color | -- |
| \`threat_levels\` | \`name\`, \`description\` | -- |
| \`users\` (as \`MispUser\`) | \`id\`, \`email\` | -- |
| \`thai_threat_news\` | \`eventId\`, \`attributeId\`, \`content\`, \`link\`, \`status\`, \`publishedAt\` | belongsTo Event, Attribute |

Two things worth flagging: \`thai_threat_news\` is registered in the \`misp\` connection but configured like a normal table (\`timestamps: true\`), not like the true external MISP tables above it (which are \`timestamps: false\` and skip Sequelize's \`underscored\` convention, since every column is mapped by hand to match MISP's own naming). And \`User\` is registered on *both* connections -- there's a \`users\` table in each database, and they are not the same table.

## Conclusion

\`cveId\` (the string) is the real join key across every CVE table, not the numeric \`id\`. The \`misp\`-side tables mirror MISP's own schema exactly (manual column mapping, no timestamps, no underscoring) except for \`thai_threat_news\`, which behaves like a normal \`secinsight\`-style table despite living on the \`misp\` connection -- and \`users\` exists as two genuinely different tables depending on which connection you're looking through.`,
        contentTh: `ต่อจากตาราง users/organizations ในบทเรียนก่อนหน้า -- บทนี้พูดถึงตาราง CVE และ AI Insight ในฐาน \`secinsight\` บวกกับตารางฝั่ง \`misp\` ที่แอปนี้อ่านจริงๆ

### CVE ในฐาน \`secinsight\`

| ตาราง | คอลัมน์สำคัญ |
| --- | --- |
| \`cves\` | \`cveId\` (unique, string เช่น \`CVE-2024-1234\`), \`baseScore\`, \`baseSeverity\`, \`cvssVector\`, \`kev\`, \`epss\`, ตัวเลขเทรนด์, \`lastSyncedAt\` |
| \`cve_affected_configs\` | \`cveId\`, \`vendor\`, \`product\`, \`cpe\`, ช่วงเวอร์ชัน |
| \`cve_references\`, \`cve_lab_assets\`, \`cve_trend_daily\`, \`kev_profiles\` | ข้อมูลประกอบของ CVE |
| \`organization_asset_profiles\` | ซอฟต์แวร์ที่องค์กรใช้จริง (\`vendor\`, \`product\`, \`version\`, \`cpe\`) |
| \`organization_cve_matches\` | CVE ไหนตรงกับ asset ขององค์กรไหน + สถานะการจัดการ (\`status\`, \`assignedTo\`, \`dueAt\`, \`resolvedAt\`) |

ตารางที่เกี่ยวกับ CVE ทุกตัว join กันด้วย \`cveId\` -- ตัว string ไม่ใช่ \`cves.id\` (\`sourceKey\`/\`targetKey: 'cveId'\` ใน \`Cve.ts:186-207\`) เรื่องนี้ควรจำไว้ก่อนเขียน query ที่แตะกลุ่มนี้ -- ถ้าเผลอใช้ \`id\` แบบตัวเลขเหมือนตารางอื่นๆ ส่วนใหญ่ query จะคืนค่าว่างเปล่าแบบเงียบๆ

### AI Insight และข่าว

| ตาราง | คอลัมน์สำคัญ |
| --- | --- |
| \`ai_insight_items\` | \`organizationId\`, \`category\`, \`score\`, \`severity\`, หัวข้อ/สรุป/คำแนะนำสองภาษา (มี fulltext index) |
| \`ai_insight_tags\`, \`ai_insight_item_tags\` | แท็กและตารางกลาง |
| \`organization_news_filters\` | \`organizationId\`, \`tagId\` (อ้างถึง tag ที่อยู่ในฐาน \`misp\` จริงๆ -- เป็นการอ้างอิงข้ามฐานข้อมูล) |

### ฐาน \`misp\` -- ตารางที่แอปนี้อ่าน

| ตาราง | คอลัมน์สำคัญ | ความสัมพันธ์ |
| --- | --- | --- |
| \`events\` | \`info\`, \`date\`, \`threatLevelId\`, \`published\`, \`distribution\`, \`timestamp\` | hasMany Attribute · belongsToMany Tags ผ่าน \`event_tags\` · belongsTo ThreatLevel |
| \`attributes\` | \`eventId\`, \`objectId\`, \`category\`, \`type\`, \`value1\`, \`value2\`, \`toIds\`, \`deleted\` | belongsTo Event, Object |
| \`objects\` | \`name\`, \`metaCategory\` (map จากคอลัมน์จริง \`meta-category\`), \`eventId\` | hasMany Attribute |
| \`tags\` / \`event_tags\` | ชื่อ tag (รวม TLP), สี | -- |
| \`threat_levels\` | \`name\`, \`description\` | -- |
| \`users\` (เรียกว่า \`MispUser\`) | \`id\`, \`email\` | -- |
| \`thai_threat_news\` | \`eventId\`, \`attributeId\`, \`content\`, \`link\`, \`status\`, \`publishedAt\` | belongsTo Event, Attribute |

สองเรื่องที่ควรรู้ไว้: \`thai_threat_news\` ลงทะเบียนอยู่ใน connection ของ \`misp\` แต่ตั้งค่าเหมือนตารางปกติ (\`timestamps: true\`) ไม่เหมือนตารางฝั่ง MISP จริงๆ ข้างบนที่เป็น \`timestamps: false\` และไม่ใช้ convention \`underscored\` ของ Sequelize เพราะทุกคอลัมน์ต้อง map มือให้ตรงกับชื่อจริงฝั่ง MISP และ \`User\` ลงทะเบียนอยู่ *ทั้งสอง* connection -- มีตาราง \`users\` อยู่ในแต่ละฐานข้อมูล และมันไม่ใช่ตารางเดียวกัน

## สรุป

\`cveId\` (แบบ string) คือ join key จริงของทุกตาราง CVE ไม่ใช่ \`id\` แบบตัวเลข ตารางฝั่ง \`misp\` เลียนแบบ schema จริงของ MISP เป๊ะๆ (map คอลัมน์มือ ไม่มี timestamp ไม่ underscore) ยกเว้น \`thai_threat_news\` ที่ทำตัวเหมือนตารางสไตล์ \`secinsight\` ปกติ แม้จะอยู่ใน connection ของ \`misp\` และ \`users\` มีอยู่เป็นสองตารางที่ต่างกันจริงๆ ขึ้นอยู่กับว่ามองผ่าน connection ไหน`,
      },
      {
        slug: "misp-integration",
        titleEn: "MISP Integration",
        titleTh: "การเชื่อมต่อกับ MISP",
        order: 17,
        sectionEn: "Auth, Data & Integrations",
        sectionTh: "Auth, ข้อมูล และการเชื่อมต่อภายนอก",
        contentEn: `MISP is an external threat-intelligence platform with its own database and its own REST API. SecInsight does not own MISP's data (\`CONTEXT.md:314-327\`) -- it's a consumer, and the integration is built around one firm rule.

### The rule: read from the DB, write through the API

| Task | Channel | Where in the code |
| --- | --- | --- |
| Read (event, attribute, tag, threat level) | Sequelize straight into the \`misp\` MySQL database via \`mispConnection\` | \`src/models/index.ts\`, \`EventRepository\`, \`AttributeRepository\`, \`TagRepository\`, \`ObjectRepository\` |
| Write (create/edit/delete an event, attribute, tag) | MISP's REST API via \`mispAdminApi\` | \`src/services/EventService.ts:250-342\` |

There is no repository method for writing MISP data -- that's intentional, not an oversight (see the pitfalls lesson). Reads go straight to MySQL because it's fast and lets SecInsight join MISP data against its own tables (like \`organization_news_filters.tagId\`); writes go through the API because MISP owns validation, side effects, and its own audit trail for anything that changes its data.

### The API connection (\`src/helper/axiosInstance.ts:175-187\`)

- Base URL comes from \`MISP_API_URL\`.
- Two separate keys: \`MISP_API_KEY\` (used by \`mispReadOnlyApi\`) and \`MISP_ADMIN_API_KEY\` (used by \`mispAdminApi\`, the one \`EventService\` actually writes through).
- The key goes in an \`Authorization\` header with no \`Bearer\` prefix -- just the raw key.
- If either key is missing, the app refuses to start.
- Errors coming back from MISP are converted to \`UpstreamError\` in an axios interceptor, preserving MISP's original HTTP status rather than always returning a generic one.

Example REST endpoints actually called: \`/events/addTag/{eventId}/{tagId}/local:0\`, \`/attributes/add/{eventId}\`, \`/events/delete/{id}\`.

The DB connection itself reuses the same host/user as the \`secinsight\` database, pointed at a different database name: \`MYSQL_HOST\`, \`MYSQL_USER\`, \`MYSQL_PASSWORD\`, \`MYSQL_MISP_NAME\`.

### Every other external client in \`axiosInstance.ts\`

| Client | Purpose | Auth |
| --- | --- | --- |
| \`OpenRouterApi\` | LLM summarization/analysis for AI Insight | \`Bearer\`, retries 3x |
| \`VulnerabilityRegisterApi\` | CVE catalog | \`apiKey\` header, built-in rate limiting |
| \`FirstEpssApi\` / \`CisaKevApi\` / \`CirclCveApi\` | EPSS scores / KEV list / CVE details | none, retries 3x |
| \`CveCrowdApi\` | CVE trend data | \`Bearer\` |
| \`SpgVulnerabilityApi\` | CVE-related labs and repos | HMAC-signs every request |
| \`SocSecinsightApi\` | organization SOC dashboard | \`X-Api-Key\` |
| \`BlueskyApi\` / \`NewsFeedApi\` | threat news feeds | JWT session / none |
| \`RecaptchaApi\` | reCAPTCHA verification | API key |

## Conclusion

MISP is the one external system with a split integration: reads bypass the API entirely and go straight to MySQL for speed and cross-database joins, while every write goes through \`mispAdminApi\` so MISP retains control over validation and its own audit trail. Every other external service in this codebase is a normal REST client through \`axiosInstance.ts\`, no split -- MISP is the exception, not the pattern.`,
        contentTh: `MISP คือแพลตฟอร์ม threat intelligence ภายนอก มีฐานข้อมูลและ REST API เป็นของตัวเอง SecInsight ไม่ได้เป็นเจ้าของข้อมูล MISP (\`CONTEXT.md:314-327\`) -- มันเป็นแค่ผู้บริโภคข้อมูล และการเชื่อมต่อทั้งหมดถูกออกแบบรอบกติกาเดียว

### กติกาหลัก: อ่านจาก DB เขียนผ่าน API

| งาน | ช่องทาง | ที่อยู่ในโค้ด |
| --- | --- | --- |
| อ่าน (event, attribute, tag, threat level) | Sequelize ตรงเข้า MySQL ฐาน \`misp\` ผ่าน \`mispConnection\` | \`src/models/index.ts\`, \`EventRepository\`, \`AttributeRepository\`, \`TagRepository\`, \`ObjectRepository\` |
| เขียน (สร้าง/แก้/ลบ event, attribute, ติด tag) | MISP REST API ผ่าน \`mispAdminApi\` | \`src/services/EventService.ts:250-342\` |

ไม่มี repository method สำหรับเขียนข้อมูล MISP -- นี่เป็นความตั้งใจ ไม่ใช่ความบกพร่อง (ดูบทเรียนเรื่องจุดที่หลงทางบ่อย) การอ่านไปตรงที่ MySQL เพราะเร็วและทำให้ SecInsight join ข้อมูล MISP กับตารางของตัวเองได้ (เช่น \`organization_news_filters.tagId\`) ส่วนการเขียนต้องผ่าน API เพราะ MISP เป็นเจ้าของการ validate, side effect และ audit trail ของตัวเองสำหรับทุกอย่างที่แก้ข้อมูลมัน

### การเชื่อมต่อ API (\`src/helper/axiosInstance.ts:175-187\`)

- base URL มาจาก \`MISP_API_URL\`
- มี key สองตัวแยกกัน: \`MISP_API_KEY\` (ใช้โดย \`mispReadOnlyApi\`) และ \`MISP_ADMIN_API_KEY\` (ใช้โดย \`mispAdminApi\` ตัวที่ \`EventService\` ใช้เขียนจริง)
- key ถูกส่งใน header \`Authorization\` โดยไม่มีคำว่า \`Bearer\` นำหน้า -- ส่ง key ดิบๆ ไปเลย
- ถ้าขาด key ตัวใดตัวหนึ่ง แอปจะปฏิเสธการเริ่มทำงาน
- error ที่ตอบกลับมาจาก MISP จะถูกแปลงเป็น \`UpstreamError\` ใน axios interceptor โดยคง status code เดิมของ MISP ไว้ ไม่ใช่ตอบ status กลางๆ เสมอ

ตัวอย่าง REST endpoint ที่ถูกเรียกจริง: \`/events/addTag/{eventId}/{tagId}/local:0\`, \`/attributes/add/{eventId}\`, \`/events/delete/{id}\`

การเชื่อมต่อ DB ใช้ host/user ชุดเดียวกับฐาน \`secinsight\` แต่ชี้ไปที่ชื่อฐานข้อมูลคนละตัว: \`MYSQL_HOST\`, \`MYSQL_USER\`, \`MYSQL_PASSWORD\`, \`MYSQL_MISP_NAME\`

### บริการภายนอกอื่นใน \`axiosInstance.ts\`

| Client | ใช้ทำอะไร | Auth |
| --- | --- | --- |
| \`OpenRouterApi\` | LLM สรุป/วิเคราะห์ AI Insight | \`Bearer\`, retry 3 ครั้ง |
| \`VulnerabilityRegisterApi\` | ดึงแค็ตตาล็อก CVE | \`apiKey\` header, จำกัดความถี่ในตัว |
| \`FirstEpssApi\` / \`CisaKevApi\` / \`CirclCveApi\` | คะแนน EPSS / รายการ KEV / รายละเอียด CVE | ไม่มี, retry 3 ครั้ง |
| \`CveCrowdApi\` | ข้อมูลเทรนด์ CVE | \`Bearer\` |
| \`SpgVulnerabilityApi\` | lab และ repo ที่เกี่ยวกับ CVE | HMAC ลงลายเซ็นทุก request |
| \`SocSecinsightApi\` | แดชบอร์ด SOC ขององค์กร | \`X-Api-Key\` |
| \`BlueskyApi\` / \`NewsFeedApi\` | ดึงข่าวภัยคุกคาม | JWT session / ไม่มี |
| \`RecaptchaApi\` | ตรวจ reCAPTCHA | API key |

## สรุป

MISP เป็นระบบภายนอกตัวเดียวที่มีการเชื่อมต่อแบบแยกสองทาง: การอ่านข้ามผ่าน API ไปตรง MySQL เลยเพื่อความเร็วและ join ข้ามฐานข้อมูลได้ ส่วนการเขียนทุกอย่างต้องผ่าน \`mispAdminApi\` เพื่อให้ MISP คุม validation และ audit trail ของตัวเอง บริการภายนอกอื่นๆ ในโค้ดนี้เป็น REST client ปกติผ่าน \`axiosInstance.ts\` ไม่มีการแยกทาง -- MISP คือข้อยกเว้น ไม่ใช่รูปแบบมาตรฐาน`,
      },
      {
        slug: "testing-practices",
        titleEn: "Testing Practices",
        titleTh: "แนวทางการเทส",
        order: 18,
        sectionEn: "Operations",
        sectionTh: "งานปฏิบัติการ (Operations)",
        contentEn: `Two test suites, run separately, with a different mocking boundary each.

| Suite | Command | Config | What's mocked |
| --- | --- | --- | --- |
| Unit | \`bun run test\` | \`jest.config.cjs\` (skips \`tests/integration/\`) | Service mocked in UseCase tests, Repository mocked in Service tests |
| Integration | \`bun run test:integration\` | \`jest.integration.config.cjs\` | Mocked only at the UseCase boundary -- route, middleware, Zod, and the error handler all run for real, but nothing touches a live database |
| Both | \`bun run test:all\` / \`bun run test:ci\` | -- | -- |

\`bun run test\` passing on its own isn't enough to open a PR -- \`test:all\` is the actual bar, since a unit-test-only green run says nothing about whether the HTTP wiring (routes, middleware, error envelope) still works.

### Project-wide mocking setup

- \`jest.config.cjs\` maps \`~/utils/Logger\`, \`jose\`, and \`bcrypt\` to files under \`tests/mocks/*\`.
- \`tests/setup.ts\` fills in fake env values with \`??=\` so the app can boot in tests without any real secrets.
- \`tests/integration/setup.ts\`:
  - stubs \`~/models\` entirely, so nothing tries to connect to a database
  - automocks the whole \`~/usecases\` barrel
  - makes \`authMiddleware\` pass by default as if the caller were a SYSTEM_ADMIN
- \`tests/integration/helpers/authHarness.ts\` provides \`signTestToken()\`, \`asRole('<ROLE>')\`, \`INVALID_TOKEN\`, \`API_KEY\`, \`cronToken()\` -- there's no real login flow anywhere in the test suite, tokens are just signed directly.
- \`tests/mocks/factories.ts\` is a barrel re-exporting 22 files under \`tests/mocks/factories/\`.

### Integration test example -- \`tests/integration/request-trial.routes.test.ts\`

This test targets \`POST /api/v1/request-trial\`, a public route with no auth. The comment at the top of the real file explains something worth internalizing: \`RequestTrialController\` imports its usecase from a direct subpath (\`~/usecases/request-trial/CreateRequestTrialUseCase\`, default export) rather than through the \`~/usecases\` barrel that \`tests/integration/setup.ts\` automocks -- so the global automock doesn't cover it, and the test has to mock that exact subpath itself.

\`\`\`ts
const mockExecute = jest.fn();
jest.mock('~/usecases/request-trial/CreateRequestTrialUseCase', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ execute: mockExecute })),
}));

import app from '~/app';

describe('POST /api/v1/request-trial - Integration Tests (public)', () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  describe('Success Path', () => {
    it('should create the trial request and return 201 with the success envelope', async () => {
      expect.assertions(4);
      mockExecute.mockResolvedValue({ trackingCode: 'TRIAL-0001' });

      const response = await request(app)
        .post('/api/v1/request-trial')
        .send(validBody);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.result.data.trackingCode).toBe('TRIAL-0001');
      expect(mockExecute).toHaveBeenCalledTimes(1);
    });
  });

  describe('Business Logic', () => {
    it('should map a usecase ConflictError to a 409 error envelope', async () => {
      expect.assertions(3);
      const { ConflictError } = await import('~/errors/AppError');
      mockExecute.mockRejectedValue(
        new ConflictError('Trial request failed', {
          message: 'Email already requested a trial',
        })
      );

      const response = await request(app)
        .post('/api/v1/request-trial')
        .send(validBody);

      expect(response.status).toBe(409);
      expect(response.body.status).toBe('error');
      expect(response.body.result.message).toBe('Trial request failed');
    });
  });
});
\`\`\`

Note the pattern: mock the usecase's \`execute\` to resolve or reject, then assert on the real HTTP response -- status code, envelope shape, message. The route, Zod validation, and the error-handler middleware are all exercised for real in this one test file.

### Unit test example -- \`tests/unit/usecases/GetUserProfileUseCase.test.ts\` (abridged)

\`\`\`ts
describe('GetUserProfileUseCase', () => {
  let useCase: GetUserProfileUseCase;
  let mockUserService: ReturnType<typeof createMockUserService>;

  beforeEach(() => {
    mockUserService = createMockUserService();
    useCase = new GetUserProfileUseCase({ UserService: mockUserService });
    jest.clearAllMocks();
  });

  it('should throw NotFoundError when user is not found', async () => {
    mockUserService.findById.mockResolvedValue(null);

    await expect(useCase.execute({ actorId: 999 })).rejects.toThrow(
      new NotFoundError('Get user profile failed', { message: 'User not found' })
    );
  });
});
\`\`\`

This file predates the current standard -- it doesn't use \`expect.assertions(n)\`, which newer tests do. Useful for the general shape, not as a model of the current convention.

## Conclusion

Two suites, two boundaries: unit tests mock one layer down (Service in UseCase tests, Repository in Service tests), integration tests mock only at the UseCase edge and run everything else -- route, middleware, validation, error handling -- for real, without a live database. \`test:all\` (not \`test\`) is the actual gate before opening a PR.`,
        contentTh: `มีเทสสองชุด รันแยกกัน แต่ละชุด mock ที่ระดับต่างกัน

| ชุด | คำสั่ง | config | mock อะไร |
| --- | --- | --- | --- |
| Unit | \`bun run test\` | \`jest.config.cjs\` (ข้าม \`tests/integration/\`) | Service ถูก mock ใน UseCase test, Repository ถูก mock ใน Service test |
| Integration | \`bun run test:integration\` | \`jest.integration.config.cjs\` | mock แค่ที่ขอบ UseCase ส่วน route, middleware, Zod, error handler รันจริงหมด แต่ไม่ต่อฐานข้อมูลจริง |
| ทั้งคู่ | \`bun run test:all\` / \`bun run test:ci\` | -- | -- |

\`bun run test\` เขียวอย่างเดียวยังไม่พอที่จะเปิด PR -- \`test:all\` คือมาตรฐานจริง เพราะ unit test เขียวอย่างเดียวไม่ได้บอกอะไรเลยว่า HTTP wiring (route, middleware, error envelope) ยังทำงานถูกหรือเปล่า

### การตั้ง mock ระดับโปรเจกต์

- \`jest.config.cjs\` map \`~/utils/Logger\`, \`jose\`, \`bcrypt\` ไปที่ไฟล์ใน \`tests/mocks/*\`
- \`tests/setup.ts\` ใส่ค่า env ปลอมด้วย \`??=\` ให้แอปโหลดได้ในเทสโดยไม่ต้องมี secret จริง
- \`tests/integration/setup.ts\`:
  - stub \`~/models\` ทั้งหมด ไม่มีอะไรพยายามต่อฐานข้อมูล
  - automock ทั้ง barrel \`~/usecases\`
  - ทำให้ \`authMiddleware\` ผ่านโดยค่าเริ่มต้นเหมือนผู้เรียกเป็น SYSTEM_ADMIN
- \`tests/integration/helpers/authHarness.ts\` มี \`signTestToken()\`, \`asRole('<ROLE>')\`, \`INVALID_TOKEN\`, \`API_KEY\`, \`cronToken()\` -- ไม่มีการล็อกอินจริงเลยในชุดเทส token ถูก sign ตรงๆ
- \`tests/mocks/factories.ts\` เป็น barrel รวม 22 ไฟล์ใน \`tests/mocks/factories/\`

### ตัวอย่าง integration test -- \`tests/integration/request-trial.routes.test.ts\`

เทสนี้เล็ง \`POST /api/v1/request-trial\` เส้นสาธารณะที่ไม่มี auth คอมเมนต์ต้นไฟล์จริงอธิบายเรื่องที่ควรจำไว้: \`RequestTrialController\` import usecase จาก subpath ตรง (\`~/usecases/request-trial/CreateRequestTrialUseCase\`, default export) ไม่ผ่าน barrel \`~/usecases\` ที่ \`tests/integration/setup.ts\` automock ไว้ -- ดังนั้น automock ระดับ global ไม่ครอบมัน เทสต้อง mock subpath นั้นตรงๆ เอง

\`\`\`ts
const mockExecute = jest.fn();
jest.mock('~/usecases/request-trial/CreateRequestTrialUseCase', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ execute: mockExecute })),
}));

import app from '~/app';

describe('POST /api/v1/request-trial - Integration Tests (public)', () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  describe('Success Path', () => {
    it('should create the trial request and return 201 with the success envelope', async () => {
      expect.assertions(4);
      mockExecute.mockResolvedValue({ trackingCode: 'TRIAL-0001' });

      const response = await request(app)
        .post('/api/v1/request-trial')
        .send(validBody);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.result.data.trackingCode).toBe('TRIAL-0001');
      expect(mockExecute).toHaveBeenCalledTimes(1);
    });
  });

  describe('Business Logic', () => {
    it('should map a usecase ConflictError to a 409 error envelope', async () => {
      expect.assertions(3);
      const { ConflictError } = await import('~/errors/AppError');
      mockExecute.mockRejectedValue(
        new ConflictError('Trial request failed', {
          message: 'Email already requested a trial',
        })
      );

      const response = await request(app)
        .post('/api/v1/request-trial')
        .send(validBody);

      expect(response.status).toBe(409);
      expect(response.body.status).toBe('error');
      expect(response.body.result.message).toBe('Trial request failed');
    });
  });
});
\`\`\`

รูปแบบที่ควรสังเกต: mock \`execute\` ของ usecase ให้ resolve หรือ reject แล้ว assert กับ HTTP response จริง -- status code, รูปร่าง envelope, message ทั้ง route, Zod validation, และ error-handler middleware ล้วนถูกใช้งานจริงในไฟล์เทสไฟล์เดียวนี้

### ตัวอย่าง unit test -- \`tests/unit/usecases/GetUserProfileUseCase.test.ts\` (ย่อ)

\`\`\`ts
describe('GetUserProfileUseCase', () => {
  let useCase: GetUserProfileUseCase;
  let mockUserService: ReturnType<typeof createMockUserService>;

  beforeEach(() => {
    mockUserService = createMockUserService();
    useCase = new GetUserProfileUseCase({ UserService: mockUserService });
    jest.clearAllMocks();
  });

  it('should throw NotFoundError when user is not found', async () => {
    mockUserService.findById.mockResolvedValue(null);

    await expect(useCase.execute({ actorId: 999 })).rejects.toThrow(
      new NotFoundError('Get user profile failed', { message: 'User not found' })
    );
  });
});
\`\`\`

ไฟล์นี้เก่ากว่ากฎปัจจุบัน -- ไม่มี \`expect.assertions(n)\` ซึ่งเทสรุ่นใหม่มี ใช้ดูโครงสร้างทั่วไปได้ แต่ไม่ใช่ตัวอย่างของมาตรฐานปัจจุบัน

## สรุป

สองชุด สองขอบเขต: unit test mock ลงไปหนึ่งชั้น (Service ใน UseCase test, Repository ใน Service test), integration test mock แค่ที่ขอบ UseCase แล้วรันทุกอย่างที่เหลือจริง -- route, middleware, validation, error handling -- โดยไม่ต่อฐานข้อมูลจริง \`test:all\` (ไม่ใช่ \`test\`) คือด่านจริงก่อนเปิด PR`,
      },
      {
        slug: "observability-health-checks",
        titleEn: "Observability & Health Checks",
        titleTh: "Observability และ Health Check",
        order: 19,
        sectionEn: "Operations",
        sectionTh: "งานปฏิบัติการ (Operations)",
        contentEn: `### Logger

Winston, wrapped in a \`Logger\` class (\`src/utils/Logger.ts\`), used as \`Logger.child({ component: 'X' })\` per module -- so every log line is tagged with which component emitted it. Log levels are winston's standard syslog set (\`error\`, \`warning\`, \`info\`, \`debug\`, ...).

| Environment | Format | Minimum level |
| --- | --- | --- |
| \`NODE_ENV=development\` | Human-readable, colorized: \`[HH:mm:ss] LEVEL: [Component] Message\` | \`debug\` |
| everything else | Single-line JSON with a \`severity\` field, in the shape Google Cloud Logging expects | \`info\` |

Output goes to stdout only -- there's no direct shipping to a log aggregator. Cloud Run picks stdout up into Cloud Logging on its own.

### Per-request tracing (\`src/middleware/requestLogger.ts\`)

- Reads \`x-cloud-trace-context\` if present, or generates a new trace id.
- Reads \`x-request-id\` if present, or generates a new one.
- Stores both in \`AsyncLocalStorage\`, so every log line emitted anywhere during that request automatically carries the same trace id -- no need to thread it through function signatures manually.
- Logs \`Request received\` on the way in, and \`Request finished\` (with status code and elapsed time) on the way out.

### Error handling (\`src/middleware/errorHandler.ts\`)

The single place that shapes an error HTTP response:
- A Zod error or an \`AppError\` subclass logs at \`warn\` level.
- A Sequelize error or anything unexpected logs at \`error\` level, and the client gets a generic message in production (never the raw error).

### Health checks

Two separate surfaces, easy to mix up:
- \`GET /health\` (\`src/app.ts:39\`) -- lives outside the \`/api\` prefix, used by the Docker \`HEALTHCHECK\` instruction.
- \`GET /api/health\` and \`GET /api/health/detailed\` (\`src/routes/health.routes.ts\`) -- the app-level health endpoints.

### Monitoring / alerting

Nothing found in the codebase -- no Sentry, no equivalent. If something exists, it's configured directly in Google Cloud outside this repo; ask whoever owns infra rather than assuming it's absent just because it's not in the code.

## Conclusion

Logging is component-tagged winston with an environment-dependent format (readable in dev, GCP-shaped JSON everywhere else), tied together per-request by an \`AsyncLocalStorage\`-backed trace id that needs no manual threading. There are two health endpoints, not one, serving two different consumers (Docker vs. the app layer) -- and no in-repo evidence of alerting, which is a known gap to confirm with infra rather than a documented absence.`,
        contentTh: `### Logger

ใช้ Winston ห่อด้วยคลาส \`Logger\` (\`src/utils/Logger.ts\`) เรียกใช้แบบ \`Logger.child({ component: 'X' })\` ต่อโมดูล -- ทุกบรรทัด log จึงติดแท็กว่ามาจาก component ไหน ระดับ log เป็นชุด syslog มาตรฐานของ winston (\`error\`, \`warning\`, \`info\`, \`debug\`, ...)

| สภาพแวดล้อม | รูปแบบ | ระดับต่ำสุด |
| --- | --- | --- |
| \`NODE_ENV=development\` | ข้อความสีอ่านง่าย: \`[HH:mm:ss] LEVEL: [Component] Message\` | \`debug\` |
| อื่นๆ ทั้งหมด | JSON บรรทัดเดียว มีฟิลด์ \`severity\` ตามรูปแบบที่ Google Cloud Logging ต้องการ | \`info\` |

ส่งไปที่ stdout อย่างเดียว -- ไม่มีการส่งตรงไปยัง log aggregator ใดๆ Cloud Run จะดึง stdout เข้า Cloud Logging เอง

### การผูก log ต่อ request (\`src/middleware/requestLogger.ts\`)

- อ่าน \`x-cloud-trace-context\` ถ้ามี หรือสร้าง trace id ใหม่
- อ่าน \`x-request-id\` ถ้ามี หรือสร้างใหม่
- เก็บทั้งคู่ไว้ใน \`AsyncLocalStorage\` ทุกบรรทัด log ที่เกิดขึ้นระหว่าง request เดียวกันจะมี trace id เดียวกันโดยอัตโนมัติ -- ไม่ต้องส่งต่อผ่าน function signature เอง

- log \`Request received\` ตอนเข้า และ \`Request finished\` (พร้อม status code และเวลาที่ใช้) ตอนออก

### การจัดการ error (\`src/middleware/errorHandler.ts\`)

ที่เดียวที่จัดรูป error response:
- Zod error หรือ \`AppError\` subclass → log ระดับ \`warn\`
- Sequelize error หรือ error ที่ไม่คาดคิด → log ระดับ \`error\` และตอบ client ด้วยข้อความกลางๆ ใน production (ไม่ใช่ error ดิบ)

### Health check

มีสองจุดแยกกัน สับสนได้ง่าย:
- \`GET /health\` (\`src/app.ts:39\`) -- อยู่นอก prefix \`/api\` ใช้กับคำสั่ง \`HEALTHCHECK\` ของ Docker
- \`GET /api/health\` และ \`GET /api/health/detailed\` (\`src/routes/health.routes.ts\`) -- health endpoint ระดับแอป

### Monitoring / alerting

ไม่พบในโค้ด -- ไม่มี Sentry หรือของเทียบเท่า ถ้ามีจริง คงตั้งไว้ฝั่ง Google Cloud โดยตรงนอกเรปนี้ ควรถามคนดูแล infra แทนที่จะสรุปว่าไม่มีเพราะไม่เห็นในโค้ด

## สรุป

Logging เป็น winston ที่แท็กตาม component รูปแบบขึ้นกับ environment (อ่านง่ายตอน dev, JSON ตามฟอร์แมต GCP ที่อื่น) ผูกกันต่อ request ด้วย trace id ที่เก็บใน \`AsyncLocalStorage\` โดยไม่ต้องส่งต่อมือ มี health endpoint สองจุด ไม่ใช่จุดเดียว รับใช้ผู้บริโภคคนละกลุ่ม (Docker กับระดับแอป) -- และไม่มีหลักฐานเรื่อง alerting ในเรป ซึ่งเป็นช่องว่างที่ต้องถาม infra ยืนยัน ไม่ใช่ข้อสรุปที่บันทึกไว้แล้ว`,
      },
      {
        slug: "deployment-and-ci",
        titleEn: "Deployment & CI",
        titleTh: "การ Deploy และ CI",
        order: 20,
        sectionEn: "Operations",
        sectionTh: "งานปฏิบัติการ (Operations)",
        contentEn: `### Where it deploys

Google Cloud Run, with images stored in Artifact Registry (\`asia-southeast1\`). Cloud Build handles the pipeline -- \`cloudbuild.yaml\` for production, \`cloudbuild.staging.yaml\` for staging -- in three steps: \`docker build\` -> \`docker push\` -> \`gcloud run deploy\`.

### Dockerfile -- two stages

- \`builder\`: \`bun install --frozen-lockfile\`, then \`bun run build\`.
- \`production\`: installs only the dependencies actually needed at runtime, runs as a non-root user, listens on port 8080, and its \`HEALTHCHECK\` points at \`/health\` (the one outside \`/api\`, from the observability lesson).

**Not found anywhere in Cloud Build:** a migration step during deploy. Whether migrations run manually or somewhere else entirely is unconfirmed -- worth asking whoever owns the deploy pipeline rather than assuming either answer.

### CI (\`.github/workflows/\`)

| File | Does | Runs on |
| --- | --- | --- |
| \`lint-actions.yml\` | \`bun run typecheck\` + \`bun run lint\` | PR opened/updated |
| \`pr-title-check.yml\` | validates the PR title against \`commitlint-pr.config.mjs\` | PR opened/edited |
| \`sonarqube.yml\` | build + SonarQube scan + quality gate | push to master/develop/feature/hotfix/releases, and PRs |
| \`backup-repository.yaml\` | backs the repo up to GCS | daily at 17:00 UTC |

**Not found:** any workflow that runs \`bun run test\`. Tests exist and are enforced as a local pre-open-PR discipline (\`test:all\`), but nothing in CI currently re-runs them.

### Git hooks (\`.husky/\`)

- \`pre-commit\` -> \`lint-staged\` (eslint + prettier)
- \`commit-msg\` -> commitlint, Conventional Commits format
- \`pre-push\` -> pulls from the tracked remote and merges \`develop\` in if the branch has fallen behind
- \`post-merge\` / \`post-rewrite\` -> intended to run \`bun install\`, run migrations, and \`bun env:dev\` when relevant files change -- see the pitfalls lesson for why this doesn't actually work as written
- \`pre-rebase\` -> blocks rebasing \`main\` or \`develop\`

### Environment variables

Stored in 1Password; the files committed to the repo are just templates referencing \`op://...\` paths, never real values: \`1pw.development.env\`, \`1pw.staging.env\`, \`1pw.production.env\`. A local \`.env\` is generated with \`bun run env:dev\` (= \`op inject -i 1pw.development.env -o .env --force\`), which requires the 1Password CLI to be installed and authenticated.

Variable groups (names only, not values):

| Group | Examples |
| --- | --- |
| DB | \`MYSQL_HOST\`, \`MYSQL_PORT\`, \`MYSQL_USER\`, \`MYSQL_PASSWORD\`, \`MYSQL_SECINSIGHT_NAME\`, \`MYSQL_MISP_NAME\` |
| Auth | \`JWT_SECRET\`, \`JWT_ACCESS_EXPIRES_IN\`, \`AUTH_MAX_ATTEMPTS\`, \`AUTH_WINDOW_MINUTES\`, \`RESET_PASSWORD_TOKEN_EXPIRY\` |
| MISP | \`MISP_API_URL\`, \`MISP_API_KEY\`, \`MISP_ADMIN_API_KEY\` |
| Cron | \`CRON_OIDC_AUDIENCE\`, \`CRON_INVOKER_SERVICE_ACCOUNT\`, \`GOOGLE_OIDC_JWKS_URL\` |
| External services | \`OPENROUTER_*\`, \`BLUESKY_*\`, \`CISA_KEV_*\`, \`FIRST_EPSS_*\`, \`CIRCL_CVE_*\`, \`VULNERABILITY_REGISTER_*\`, \`SPG_VULNERABILITY_*\`, \`SOC_SECINSIGHT_*\`, \`MAILGUN_*\`, \`RECAPTCHA_*\` |
| Rate limiting | \`API_MAX_REQUESTS\`, \`PUBLIC_MAX_REQUESTS\`, \`FORGOT_PASSWORD_MAX_ATTEMPTS\`, plus a \`*_WINDOW_MINUTES\` counterpart for each |
| App | \`NODE_ENV\`, \`PORT\`, \`CORS_ORIGIN\`, \`BASE_URL\`, \`TZ\`, \`APP_VERSION\` |

## Conclusion

Deploy is Cloud Run via a two-stage Docker build and a three-step Cloud Build pipeline, with no visible migration step -- confirm that separately before assuming it's handled. CI runs lint, typecheck, PR-title validation, SonarQube, and a daily backup, but notably never runs the test suite -- \`test:all\` passing locally is currently the only gate that exists for tests. All real secrets live in 1Password, never in the repo.`,
        contentTh: `### Deploy ที่ไหน

Google Cloud Run image เก็บใน Artifact Registry (\`asia-southeast1\`) Cloud Build เป็นตัวจัดการ pipeline -- \`cloudbuild.yaml\` สำหรับ production, \`cloudbuild.staging.yaml\` สำหรับ staging -- สามขั้นตอน: \`docker build\` -> \`docker push\` -> \`gcloud run deploy\`

### Dockerfile -- สองขั้น

- \`builder\`: \`bun install --frozen-lockfile\` แล้ว \`bun run build\`
- \`production\`: ติดตั้งเฉพาะ dependency ที่ใช้จริงตอน runtime รันด้วย user ที่ไม่ใช่ root ฟัง port 8080 และ \`HEALTHCHECK\` ชี้ไปที่ \`/health\` (ตัวที่อยู่นอก \`/api\` จากบทเรียน observability)

**ไม่พบใน Cloud Build เลย:** ขั้นตอนรัน migration ตอน deploy ยังไม่ยืนยันว่ารันเองมือหรือรันที่อื่น -- ควรถามคนดูแล deploy pipeline แทนที่จะสรุปเอาเอง

### CI (\`.github/workflows/\`)

| ไฟล์ | ทำอะไร | ทำงานเมื่อ |
| --- | --- | --- |
| \`lint-actions.yml\` | \`bun run typecheck\` + \`bun run lint\` | เปิด/อัปเดต PR |
| \`pr-title-check.yml\` | ตรวจชื่อ PR ด้วย \`commitlint-pr.config.mjs\` | เปิด/แก้ PR |
| \`sonarqube.yml\` | build + SonarQube scan + quality gate | push เข้า master/develop/feature/hotfix/releases และ PR |
| \`backup-repository.yaml\` | สำรอง repo ขึ้น GCS | ทุกวัน 17:00 UTC |

**ไม่พบ:** workflow ที่รัน \`bun run test\` เทสมีอยู่จริงและถูกบังคับเป็นวินัยระดับ local ก่อนเปิด PR (\`test:all\`) แต่ไม่มีอะไรใน CI รันเทสซ้ำอีกที

### Git hooks (\`.husky/\`)

- \`pre-commit\` -> \`lint-staged\` (eslint + prettier)
- \`commit-msg\` -> commitlint แบบ Conventional Commits
- \`pre-push\` -> pull ตาม remote และ merge \`develop\` เข้ามาถ้าตามไม่ทัน
- \`post-merge\` / \`post-rewrite\` -> ตั้งใจจะรัน \`bun install\`, รัน migration, \`bun env:dev\` เมื่อไฟล์ที่เกี่ยวข้องเปลี่ยน -- ดูบทเรียนจุดที่หลงทางบ่อยว่าทำไมมันไม่ทำงานจริงตามที่เขียนไว้
- \`pre-rebase\` -> ห้าม rebase \`main\` หรือ \`develop\`

### Environment variables

เก็บใน 1Password ไฟล์ในเรปเป็นแค่ template อ้างถึง \`op://...\` ไม่มีค่าจริงเลย: \`1pw.development.env\`, \`1pw.staging.env\`, \`1pw.production.env\` สร้าง \`.env\` ในเครื่องด้วย \`bun run env:dev\` (= \`op inject -i 1pw.development.env -o .env --force\`) ต้องมี 1Password CLI ติดตั้งและล็อกอินไว้

กลุ่มตัวแปร (ชื่อเท่านั้น ไม่ใช่ค่า):

| กลุ่ม | ตัวอย่าง |
| --- | --- |
| DB | \`MYSQL_HOST\`, \`MYSQL_PORT\`, \`MYSQL_USER\`, \`MYSQL_PASSWORD\`, \`MYSQL_SECINSIGHT_NAME\`, \`MYSQL_MISP_NAME\` |
| Auth | \`JWT_SECRET\`, \`JWT_ACCESS_EXPIRES_IN\`, \`AUTH_MAX_ATTEMPTS\`, \`AUTH_WINDOW_MINUTES\`, \`RESET_PASSWORD_TOKEN_EXPIRY\` |
| MISP | \`MISP_API_URL\`, \`MISP_API_KEY\`, \`MISP_ADMIN_API_KEY\` |
| Cron | \`CRON_OIDC_AUDIENCE\`, \`CRON_INVOKER_SERVICE_ACCOUNT\`, \`GOOGLE_OIDC_JWKS_URL\` |
| บริการภายนอก | \`OPENROUTER_*\`, \`BLUESKY_*\`, \`CISA_KEV_*\`, \`FIRST_EPSS_*\`, \`CIRCL_CVE_*\`, \`VULNERABILITY_REGISTER_*\`, \`SPG_VULNERABILITY_*\`, \`SOC_SECINSIGHT_*\`, \`MAILGUN_*\`, \`RECAPTCHA_*\` |
| Rate limit | \`API_MAX_REQUESTS\`, \`PUBLIC_MAX_REQUESTS\`, \`FORGOT_PASSWORD_MAX_ATTEMPTS\` พร้อม \`*_WINDOW_MINUTES\` คู่กันแต่ละตัว |
| แอป | \`NODE_ENV\`, \`PORT\`, \`CORS_ORIGIN\`, \`BASE_URL\`, \`TZ\`, \`APP_VERSION\` |

## สรุป

Deploy คือ Cloud Run ผ่าน Docker แบบสองขั้นและ Cloud Build pipeline สามขั้นตอน โดยไม่เห็นขั้นตอน migration เลย -- ต้องยืนยันแยกต่างหาก อย่าสรุปเอาเองว่ามีคนจัดการแล้ว CI รัน lint, typecheck, ตรวจชื่อ PR, SonarQube และสำรองข้อมูลรายวัน แต่ไม่เคยรันชุดเทสเลย -- \`test:all\` ที่เขียวใน local ตอนนี้คือด่านเดียวที่มีอยู่สำหรับเทส secret จริงทั้งหมดอยู่ใน 1Password ไม่เคยอยู่ในเรป`,
      },
      {
        slug: "common-pitfalls",
        titleEn: "Common Pitfalls",
        titleTh: "จุดที่หลงทางบ่อย",
        order: 21,
        sectionEn: "Operations",
        sectionTh: "งานปฏิบัติการ (Operations)",
        contentEn: `A collection of specific, real gotchas from this codebase -- the kind of thing that's obvious once you know it and confusing every time before that.

1. **Got a token back but still hit 401.** The session is still \`PRE_ACCESS\` -- \`verify-mfa\` has to be called first. See step 5 of \`authMiddleware\` (\`src/middleware/auth.ts\`), covered in the login worked-example lesson.

2. **Logged in on a second device and the first one got kicked out.** \`AuthLoginUseCase\` calls \`revokeAll\` on every login (line 95) -- this is a deliberate one-session-at-a-time design, not a bug.

3. **The access token changes mid-session, seemingly on its own.** When a token is close to expiring, the server issues a new one in the \`X-New-Access-Token\` response header. The client is responsible for picking it up and using it in place of the old one -- if a client ignores this header, it'll eventually start failing with an expired-token error that looks unrelated to anything the client did.

4. **Trying to modify MISP data and can't find a repository method for it.** This is intentional, not a gap -- writes to MISP have to go through \`mispAdminApi\` in \`EventService\`, never through a repository. See the MISP integration lesson.

5. **A CVE table join returns nothing.** Every CVE-related table joins on \`cveId\` (a string like \`CVE-2024-1234\`), not the numeric \`id\` column. Reaching for \`id\` the way you would on most other tables silently returns an empty result instead of erroring.

6. **A controller imports its usecase directly from a file path** (\`RequestTrialController\` is the example) instead of through the \`~/usecases\` barrel. The global integration-test automock only covers the barrel, so a test hitting one of these controllers has to \`jest.mock('<exact path>')\` itself -- copying a working integration test from elsewhere without noticing this difference will silently fail to mock anything.

7. **There are two health endpoints, easy to confuse.** \`/health\` sits outside \`/api\` and exists for Docker's \`HEALTHCHECK\`; \`/api/health\` and \`/api/health/detailed\` are the app-level ones. Hitting the wrong one when debugging a deploy issue wastes time.

8. **\`package.json\` has \`db:misp:*\` scripts, but there's no \`src/sequelize/misp\` folder.** Running one of these scripts fails on a missing path -- migrations only exist for the \`secinsight\` side; the \`misp\` database's schema belongs to MISP itself.

9. **The \`post-merge\` / \`post-rewrite\` git hooks that are supposed to auto-run migrations don't actually work.** Two independent problems stack here: the \`post-merge\` hook checks for changes under \`server/migrations/\`, which doesn't match the real path (\`src/sequelize/secinsight/migrations/\`), so it never detects that migrations changed; and both hooks call \`bun db:migrate\` / \`bun db:seed\`, but \`package.json\` only defines \`db:secinsight:migrate\` and \`db:misp:migrate\` -- neither of those script names exists, so the commands fail outright even when they do run. In practice: after pulling or merging, run \`bun run db:secinsight:migrate\` yourself rather than trusting the hook to have done it.

## Conclusion

Most of these pitfalls share a shape: something that looks like a bug (a silent empty query result, a hook that seems to do nothing, an endpoint that 401s right after a successful login) is actually either an intentional design choice (single-session login, MISP writes forced through the API) or a small, specific, already-diagnosed break (the two mismatched migration commands in the git hooks). Knowing which one you're looking at before trying to "fix" it saves a lot of wasted debugging.`,
        contentTh: `รวมจุดที่หลงทางจริงๆ ในโค้ดนี้ -- แบบที่พอรู้แล้วจะรู้สึกชัดเจน แต่ตอนไม่รู้จะงงทุกครั้ง

1. **ได้ token กลับมาแล้วแต่ยังโดน 401** session ยังเป็น \`PRE_ACCESS\` อยู่ -- ต้องเรียก \`verify-mfa\` ก่อน ดูขั้นที่ 5 ของ \`authMiddleware\` (\`src/middleware/auth.ts\`) ซึ่งอธิบายไว้ในบทเรียน worked example ของ login

2. **ล็อกอินเครื่องที่สองแล้วเครื่องแรกหลุดออกไป** \`AuthLoginUseCase\` เรียก \`revokeAll\` ทุกครั้งที่ล็อกอิน (บรรทัด 95) -- เป็นการออกแบบให้ล็อกอินได้ทีละเครื่องโดยตั้งใจ ไม่ใช่บั๊ก

3. **access token เปลี่ยนเองกลางทาง เหมือนไม่มีสาเหตุ** เมื่อ token ใกล้หมดอายุ server จะออก token ใหม่มาทาง response header \`X-New-Access-Token\` client มีหน้าที่รับและใช้ตัวใหม่แทนตัวเดิม -- ถ้า client ไม่สนใจ header นี้ ในที่สุดจะเริ่มพังด้วย error token หมดอายุที่ดูเหมือนไม่เกี่ยวอะไรกับสิ่งที่ client ทำ

4. **จะแก้ข้อมูล MISP แล้วหาเมธอด repository ไม่เจอ** ตั้งใจให้เป็นแบบนี้ ไม่ใช่ช่องโหว่ -- การเขียนข้อมูล MISP ต้องผ่าน \`mispAdminApi\` ใน \`EventService\` เท่านั้น ไม่เคยผ่าน repository ดูบทเรียนเรื่อง MISP integration

5. **join ตาราง CVE แล้วไม่ได้ผลลัพธ์อะไรเลย** ตาราง CVE ทุกตัวเชื่อมกันด้วย \`cveId\` (string เช่น \`CVE-2024-1234\`) ไม่ใช่คอลัมน์ \`id\` แบบตัวเลข ถ้าเผลอใช้ \`id\` แบบที่ใช้กับตารางอื่นส่วนใหญ่ จะได้ผลลัพธ์ว่างเปล่าแบบเงียบๆ ไม่ error

6. **controller บางตัว import usecase ตรงจาก path ไฟล์** (ตัวอย่างคือ \`RequestTrialController\`) แทนที่จะผ่าน barrel \`~/usecases\` automock ระดับ global ของ integration test ครอบแค่ barrel เท่านั้น ดังนั้นเทสที่แตะ controller แบบนี้ต้อง \`jest.mock('<path ตรง>')\` เอง -- ถ้าก๊อปปี้ integration test ที่ใช้งานได้จากที่อื่นมาโดยไม่สังเกตความต่างนี้ mock จะไม่ทำงานแบบเงียบๆ

7. **มี health endpoint สองจุด สับสนได้ง่าย** \`/health\` อยู่นอก \`/api\` มีไว้ให้ \`HEALTHCHECK\` ของ Docker ส่วน \`/api/health\` และ \`/api/health/detailed\` เป็นระดับแอป เรียกผิดจุดตอน debug ปัญหา deploy จะเสียเวลาเปล่า

8. **มีสคริปต์ \`db:misp:*\` ใน \`package.json\` แต่ไม่มีโฟลเดอร์ \`src/sequelize/misp\`** รันสคริปต์เหล่านี้แล้วจะหา path ไม่เจอ -- migration มีเฉพาะฝั่ง \`secinsight\` เท่านั้น schema ของฐาน \`misp\` เป็นของ MISP เอง

9. **git hook \`post-merge\` / \`post-rewrite\` ที่ควรรัน migration อัตโนมัติ ไม่ทำงานจริง** มีปัญหาซ้อนกันสองเรื่อง: \`post-merge\` เช็คการเปลี่ยนแปลงที่ path \`server/migrations/\` ซึ่งไม่ตรงกับ path จริง (\`src/sequelize/secinsight/migrations/\`) จึงไม่เคยตรวจจับว่า migration เปลี่ยน และทั้งสอง hook เรียก \`bun db:migrate\` / \`bun db:seed\` แต่ \`package.json\` มีแค่ \`db:secinsight:migrate\` กับ \`db:misp:migrate\` -- ไม่มีชื่อสคริปต์เหล่านั้นจริง คำสั่งเลยล้มทันทีแม้จะรันจริง ในทางปฏิบัติ: หลัง pull หรือ merge ต้องรัน \`bun run db:secinsight:migrate\` เองเสมอ อย่าเชื่อว่า hook จัดการให้แล้ว

## สรุป

จุดที่หลงทางส่วนใหญ่มีรูปแบบคล้ายกัน: สิ่งที่ดูเหมือนบั๊ก (query ว่างเปล่าแบบเงียบๆ, hook ที่ดูเหมือนไม่ทำอะไร, endpoint ที่ตอบ 401 ทันทีหลังล็อกอินสำเร็จ) จริงๆ แล้วเป็นการออกแบบตั้งใจ (ล็อกอินได้ทีละเครื่อง, บังคับเขียน MISP ผ่าน API) หรือเป็นจุดพังเล็กๆ ที่ระบุสาเหตุไว้แล้ว (คำสั่ง migration สองชื่อที่ไม่ตรงกันใน git hook) รู้ว่ากำลังเจอแบบไหนก่อนพยายาม "แก้" มันจะประหยัดเวลา debug ไปได้เยอะ`,
      },
      {
        slug: "two-connections-one-orm",
        titleEn: "Two Connections, One ORM",
        titleTh: "สอง Connection, ORM ตัวเดียว",
        order: 22,
        sectionEn: "Deep Dive: Sequelize",
        sectionTh: "เจาะลึก: Sequelize",
        contentEn: `Sequelize and mysql2 (\`^6.37.8\` / \`^3.15.3\`) run against two separate MySQL databases from the same codebase, not one. \`src/models/index.ts\` registers every model against one of two connections:

- \`secinsight\` -- via \`SequelizeConnection.getClient('secinsightConnection')\`
- \`misp\` -- via \`SequelizeConnection.getClient('mispConnection')\`

Both connections point at the same MySQL host/user (\`MYSQL_HOST\`, \`MYSQL_USER\`, \`MYSQL_PASSWORD\`), differing only in database name (\`MYSQL_SECINSIGHT_NAME\` vs \`MYSQL_MISP_NAME\`). Two connections to the same server, not two servers.

### Why migrations only exist for one side

\`src/sequelize/secinsight/migrations/\` holds 74 migration files, run via \`sequelize-cli\` (\`^6.6.3\`). There is no \`src/sequelize/misp/migrations/\` folder at all -- and that's not an oversight. The \`misp\` database's schema belongs to the MISP application itself (see the MISP integration lesson in the layer-tracing course); this codebase reads that schema, it doesn't own or evolve it. Any script under \`package.json\` named \`db:misp:*\` that assumes a migrations folder exists on that side will fail on a missing path -- this is one of the documented pitfalls in the layer-tracing course, worth repeating here because it's specifically a Sequelize-configuration gotcha, not a business-logic one.

Practical result: if you're adding a column, only \`secinsight\`-side models get a migration. If a \`misp\`-side model looks like it needs a schema change, that's a signal you're looking at the wrong repo -- the change belongs in MISP itself, not here.

### What this means when you're not sure which database a model is in

Before writing a query against an unfamiliar model, check which connection it's registered against in \`src/models/index.ts\`. Getting this wrong doesn't necessarily error immediately -- a query against the wrong logical database can still succeed against a table that happens to share a name, which is a slower failure to catch than an import error would be.

## Conclusion

One codebase, one MySQL server, two databases, two very different ownership models: \`secinsight\` gets tracked migrations because this app owns its schema; \`misp\` gets none because it doesn't. That asymmetry -- not just "two connections exist" -- is the fact worth carrying forward into the next lesson, which covers how the \`misp\`-side models are actually written to cope with not owning their own schema.`,
        contentTh: `Sequelize กับ mysql2 (\`^6.37.8\` / \`^3.15.3\`) วิ่งเข้าฐานข้อมูล MySQL สองฐานที่แยกจากกันจริง ไม่ใช่ฐานเดียว \`src/models/index.ts\` ลงทะเบียน model แต่ละตัวเข้ากับหนึ่งในสอง connection:

- \`secinsight\` -- ผ่าน \`SequelizeConnection.getClient('secinsightConnection')\`
- \`misp\` -- ผ่าน \`SequelizeConnection.getClient('mispConnection')\`

ทั้งสอง connection ชี้ไปที่ MySQL host/user เดียวกัน (\`MYSQL_HOST\`, \`MYSQL_USER\`, \`MYSQL_PASSWORD\`) ต่างกันแค่ชื่อฐานข้อมูล (\`MYSQL_SECINSIGHT_NAME\` กับ \`MYSQL_MISP_NAME\`) เป็นสอง connection เข้า server เดียวกัน ไม่ใช่สอง server

### ทำไม migration มีแค่ฝั่งเดียว

\`src/sequelize/secinsight/migrations/\` มีไฟล์ migration 74 ไฟล์ รันผ่าน \`sequelize-cli\` (\`^6.6.3\`) ไม่มีโฟลเดอร์ \`src/sequelize/misp/migrations/\` เลย -- และนี่ไม่ใช่ความบกพร่อง schema ของฐาน \`misp\` เป็นของแอป MISP เอง (ดูบทเรียน MISP integration ในคอร์สไล่โค้ดทีละ layer) codebase นี้แค่อ่าน schema นั้น ไม่ได้เป็นเจ้าของหรือพัฒนามันต่อ สคริปต์ไหนใน \`package.json\` ที่ชื่อ \`db:misp:*\` แล้วสมมุติว่ามีโฟลเดอร์ migration อยู่ฝั่งนั้น จะรันแล้วหา path ไม่เจอ -- นี่เป็นหนึ่งในจุดที่หลงทางบ่อยที่เอกสารไว้ในคอร์สไล่โค้ดทีละ layer แล้ว แต่ควรพูดซ้ำตรงนี้เพราะมันเป็นเรื่องการตั้งค่า Sequelize โดยเฉพาะ ไม่ใช่ business logic

ผลจริง: ถ้าจะเพิ่มคอลัมน์ มีแค่ model ฝั่ง \`secinsight\` เท่านั้นที่จะได้ migration ถ้า model ฝั่ง \`misp\` ดูเหมือนต้องแก้ schema นั่นคือสัญญาณว่ากำลังดู repo ผิดตัว -- การแก้ต้องไปที่ MISP เอง ไม่ใช่ที่นี่

### ถ้าไม่แน่ใจว่า model อยู่ฐานไหน

ก่อนเขียน query กับ model ที่ไม่คุ้น ให้เช็คก่อนว่ามันลงทะเบียนกับ connection ไหนใน \`src/models/index.ts\` ถ้าเข้าใจผิดตรงนี้ ไม่จำเป็นต้อง error ทันที -- query ที่เข้าฐานข้อมูลตรรกะผิดอาจสำเร็จได้ถ้าบังเอิญมีตารางชื่อตรงกัน ซึ่งเป็นความล้มเหลวที่จับได้ช้ากว่า error ตอน import มาก

## สรุป

codebase เดียว MySQL server เดียว สองฐานข้อมูล สองรูปแบบความเป็นเจ้าของที่ต่างกันมาก: \`secinsight\` มี migration ติดตามเพราะแอปนี้เป็นเจ้าของ schema เอง \`misp\` ไม่มีเลยเพราะไม่ใช่ ความไม่สมมาตรนี้ -- ไม่ใช่แค่ "มีสอง connection" -- คือข้อเท็จจริงที่ควรจำต่อไปในบทเรียนถัดไป ซึ่งพูดถึงว่า model ฝั่ง \`misp\` เขียนยังไงเพื่อรับมือกับการไม่ได้เป็นเจ้าของ schema ตัวเอง`,
      },
      {
        slug: "modeling-across-two-databases",
        titleEn: "Modeling and Querying Across the Two Databases",
        titleTh: "การสร้าง Model และ Query ข้ามสองฐานข้อมูล",
        order: 23,
        sectionEn: "Deep Dive: Sequelize",
        sectionTh: "เจาะลึก: Sequelize",
        contentEn: `### Modeling a database you don't own

Every model registered against the \`misp\` connection is configured to match MISP's actual schema exactly, not Sequelize's usual conventions: \`timestamps: false\` (MISP doesn't have \`createdAt\`/\`updatedAt\` the way this app's own tables do), no \`underscored\` option (every column's real name is mapped by hand via \`field\`), because the table belongs to someone else's application and Sequelize has to describe it as-is, not as this codebase would design it fresh.

One exception worth remembering: \`thai_threat_news\` is registered on the \`misp\` connection, but configured like a normal \`secinsight\`-style table (\`timestamps: true\`). It's not one of the true external MISP tables even though it lives in that database and connection -- it's this app's own table that happens to be colocated there.

And \`User\` is registered on *both* connections. There's a \`users\` table in \`secinsight\` (this app's own users) and a \`users\` table in \`misp\` (MISP's own users, modeled here as \`MispUser\`) -- two genuinely different tables, not one model shared across databases.

### The join key that isn't \`id\`

Every CVE-related table (\`cves\`, \`cve_affected_configs\`, \`cve_references\`, \`cve_lab_assets\`, \`cve_trend_daily\`, \`organization_cve_matches\`) joins against \`cves\` using \`cveId\` -- a string like \`CVE-2024-1234\` -- not the numeric \`cves.id\` primary key. This is set explicitly in the association: \`sourceKey\`/\`targetKey: 'cveId'\` (\`Cve.ts:186-207\`). Writing a query or association the way you would for almost every other table here -- reaching for \`id\` -- doesn't error, it just silently returns nothing, because the join condition matches on a column that isn't populated the way you'd expect for a normal foreign key relationship.

### A repository as the ORM boundary

Every Sequelize model access goes through a repository -- nothing above that layer touches Sequelize directly. The pattern is often this thin, from \`UserSessionRepository.create\` (\`src/repositories/UserSessionRepository.ts:38-43\`):

\`\`\`ts
async create(payload: TCreatePayload, transaction?: Transaction): Promise<UserSessionSchema> {
  return await UserSession.create(payload, { transaction });
}
\`\`\`

Two things worth noticing even in three lines: the method accepts an optional \`transaction\` and passes it straight through to Sequelize -- letting a caller several layers up (a UseCase orchestrating multiple writes) decide whether this write is part of a larger atomic operation, without the repository itself needing any transaction-management logic. And the method is a pure pass-through with a typed payload and return shape -- when a repository method isn't this thin, that's usually a sign real domain logic has leaked into a layer that's supposed to be mechanical.

## Conclusion

Three concrete rules to carry forward: \`misp\`-side models describe someone else's schema literally (manual field mapping, no timestamps, no underscoring) except for the one deliberate exception (\`thai_threat_news\`); \`users\` exists as two unrelated tables depending on which connection you're looking through; and CVE tables join on the string \`cveId\`, not the numeric \`id\`, which is the single most common way a query against this cluster silently returns nothing instead of erroring.`,
        contentTh: `### การสร้าง Model ให้ฐานข้อมูลที่ไม่ได้เป็นเจ้าของ

Model ทุกตัวที่ลงทะเบียนกับ connection ของ \`misp\` ถูกตั้งค่าให้ตรงกับ schema จริงของ MISP เป๊ะๆ ไม่ใช่ตาม convention ปกติของ Sequelize: \`timestamps: false\` (MISP ไม่มี \`createdAt\`/\`updatedAt\` แบบที่ตารางของแอปนี้เองมี) ไม่ใช้ option \`underscored\` (ชื่อจริงของทุกคอลัมน์ต้อง map มือผ่าน \`field\`) เพราะตารางเป็นของแอปคนอื่น Sequelize ต้องอธิบายมันตามที่เป็นจริง ไม่ใช่ตามที่ codebase นี้จะออกแบบเองใหม่

ข้อยกเว้นหนึ่งที่ควรจำ: \`thai_threat_news\` ลงทะเบียนอยู่ใน connection ของ \`misp\` แต่ตั้งค่าเหมือนตารางสไตล์ \`secinsight\` ปกติ (\`timestamps: true\`) มันไม่ใช่ตารางฝั่ง MISP จริงแม้จะอยู่ในฐานข้อมูลและ connection นั้น -- มันเป็นตารางของแอปนี้เองที่บังเอิญอยู่ร่วมที่นั่น

และ \`User\` ลงทะเบียนอยู่ *ทั้งสอง* connection มีตาราง \`users\` ในฐาน \`secinsight\` (ผู้ใช้ของแอปนี้เอง) และตาราง \`users\` ในฐาน \`misp\` (ผู้ใช้ของ MISP เอง model เป็น \`MispUser\`) -- เป็นสองตารางที่ต่างกันจริงๆ ไม่ใช่ model เดียวที่แชร์กันข้ามฐานข้อมูล

### Join key ที่ไม่ใช่ \`id\`

ตารางที่เกี่ยวกับ CVE ทุกตัว (\`cves\`, \`cve_affected_configs\`, \`cve_references\`, \`cve_lab_assets\`, \`cve_trend_daily\`, \`organization_cve_matches\`) join กับ \`cves\` ด้วย \`cveId\` -- string เช่น \`CVE-2024-1234\` -- ไม่ใช่ primary key ตัวเลข \`cves.id\` ตั้งไว้ชัดเจนในความสัมพันธ์: \`sourceKey\`/\`targetKey: 'cveId'\` (\`Cve.ts:186-207\`) ถ้าเขียน query หรือ association แบบที่ใช้กับตารางอื่นเกือบทั้งหมดในที่นี้ -- ใช้ \`id\` -- จะไม่ error แต่จะได้ผลลัพธ์ว่างเปล่าแบบเงียบๆ เพราะเงื่อนไข join จับคู่กับคอลัมน์ที่ไม่ได้ใส่ข้อมูลแบบที่คาดหวังกับความสัมพันธ์ foreign key ปกติ

### Repository เป็นขอบเขตของ ORM

การเข้าถึง Sequelize model ทุกครั้งต้องผ่าน repository -- ไม่มี layer ไหนเหนือกว่านั้นแตะ Sequelize ตรงๆ รูปแบบมักจะบางขนาดนี้ จาก \`UserSessionRepository.create\` (\`src/repositories/UserSessionRepository.ts:38-43\`):

\`\`\`ts
async create(payload: TCreatePayload, transaction?: Transaction): Promise<UserSessionSchema> {
  return await UserSession.create(payload, { transaction });
}
\`\`\`

สองเรื่องที่ควรสังเกตแม้ในสามบรรทัด: method รับ \`transaction\` แบบ optional แล้วส่งต่อตรงไป Sequelize -- ทำให้ผู้เรียกที่อยู่สูงกว่าหลาย layer (UseCase ที่ orchestrate การเขียนหลายจุด) ตัดสินใจได้ว่าการเขียนนี้เป็นส่วนหนึ่งของ operation แบบ atomic ที่ใหญ่กว่าหรือไม่ โดย repository เองไม่ต้องมี logic จัดการ transaction เลย และ method นี้เป็น pass-through ล้วนๆ ด้วย payload และ return shape ที่มี type ชัดเจน -- เมื่อไหร่ที่ repository method ไม่บางขนาดนี้ มักเป็นสัญญาณว่ามี domain logic จริงรั่วเข้าไปใน layer ที่ควรจะเป็นแค่กลไก

## สรุป

สามกฎที่จับต้องได้ให้จำต่อไป: model ฝั่ง \`misp\` อธิบาย schema ของคนอื่นตรงตัวเป๊ะๆ (map field มือ ไม่มี timestamp ไม่ underscore) ยกเว้นข้อยกเว้นที่ตั้งใจไว้หนึ่งตัว (\`thai_threat_news\`); \`users\` มีอยู่เป็นสองตารางที่ไม่เกี่ยวกันเลยขึ้นอยู่กับว่ามองผ่าน connection ไหน; และตาราง CVE join กันด้วย string \`cveId\` ไม่ใช่ \`id\` แบบตัวเลข ซึ่งเป็นวิธีที่พบบ่อยที่สุดที่ query กับกลุ่มนี้จะคืนค่าว่างเปล่าแบบเงียบๆ แทนที่จะ error`,
      },
      {
        slug: "passwords-and-lockout-bcrypt",
        titleEn: "Passwords and Account Lockout — bcrypt in UserService",
        titleTh: "รหัสผ่านและการล็อกบัญชี — bcrypt ใน UserService",
        order: 24,
        sectionEn: "Deep Dive: Auth Stack",
        sectionTh: "เจาะลึก: Auth Stack",
        contentEn: `\`bcrypt\` (\`^6.0.0\`) is the only library responsible for passwords in this stack -- and it only ever appears in one place, \`UserService.authenticate\` (\`src/services/UserService.ts:126-174\`):

\`\`\`ts
const user = await this.UserRepository.findByEmail({ email: payload.email });
if (!user) throw new AuthenticationError('Invalid email or password', { message: 'User not found' });
if (!user.isActive) throw new AuthenticationError('Account is inactive', { message: 'Account is inactive' });
if (user.lockedUntil && dayjs().isBefore(dayjs(user.lockedUntil))) {
  throw new AuthenticationError('Account is locked', { message: 'Account has been locked due to too many failed login attempts' });
}
const credentials = await this.UserCredentialRepository.findByUserId({ userId: user.id });
if (!credentials) throw new AuthenticationError('Invalid email or password', { message: 'Credentials not found' });

const isValid = await bcrypt.compare(payload.password, credentials.value);
if (!isValid) {
  await this.handleFailedAttempt(user);
  throw new AuthenticationError('Invalid email or password', { message: 'Invalid password' });
}
await this.resetFailedAttempts(user);
return user;
\`\`\`

### The password hash lives in its own table

\`credentials.value\` -- the bcrypt hash -- comes from \`user_credentials\`, not from a column on \`users\` itself. \`UserCredentialRepository.findByUserId\` is a separate lookup from \`UserRepository.findByEmail\`. If you're tracing an unfamiliar auth bug and only checking the \`users\` table, you're looking in the wrong place for the actual credential.

### Two layers of protection, easy to conflate

There are two separate lockout mechanisms in this codebase, and they operate independently:
- **Per-account lockout**, here in \`UserService\` -- \`lockedUntil\` is a column on the user record itself, set by \`handleFailedAttempt\` after repeated bad passwords, and checked with \`dayjs().isBefore(dayjs(user.lockedUntil))\` before a password is even compared.
- **Per-IP rate limiting**, in \`authRateLimit\` middleware (\`src/middleware/rateLimit.ts:118-137\`) -- which runs *before* this code is ever reached, gating on \`AUTH_MAX_ATTEMPTS\`/\`AUTH_WINDOW_MINUTES\` regardless of which account is being targeted.

They answer different questions: the middleware asks "has this IP tried too many times," this service asks "has this specific account failed too many times." A locked account and a rate-limited IP produce different error paths and can happen independently of each other.

### The error message is deliberately generic

Every failure branch above that could reveal whether an email exists -- user not found, credentials not found, wrong password -- throws the same client-facing message: \`Invalid email or password\`. The *real* reason lives in the \`AuthenticationError\`'s metadata (\`{ message: ... }\`), for logging, never sent to the client. This is the same account-enumeration-avoidance principle used elsewhere in this codebase's auth flow: a difference in wording between "no such user" and "wrong password" would let an attacker enumerate valid emails one guess at a time.

## Conclusion

\`bcrypt.compare\` is a single call, but everything around it in \`UserService.authenticate\` is deliberate: the hash lives in a separate table from the user record, account lockout and IP rate limiting are two independent gates that happen to sit in the same request path, and every failure that could leak account existence is flattened into one generic client-facing message regardless of which branch actually failed.`,
        contentTh: `\`bcrypt\` (\`^6.0.0\`) เป็น library เดียวที่รับผิดชอบเรื่องรหัสผ่านใน stack นี้ -- และปรากฏอยู่ที่เดียวเท่านั้น คือ \`UserService.authenticate\` (\`src/services/UserService.ts:126-174\`):

\`\`\`ts
const user = await this.UserRepository.findByEmail({ email: payload.email });
if (!user) throw new AuthenticationError('Invalid email or password', { message: 'User not found' });
if (!user.isActive) throw new AuthenticationError('Account is inactive', { message: 'Account is inactive' });
if (user.lockedUntil && dayjs().isBefore(dayjs(user.lockedUntil))) {
  throw new AuthenticationError('Account is locked', { message: 'Account has been locked due to too many failed login attempts' });
}
const credentials = await this.UserCredentialRepository.findByUserId({ userId: user.id });
if (!credentials) throw new AuthenticationError('Invalid email or password', { message: 'Credentials not found' });

const isValid = await bcrypt.compare(payload.password, credentials.value);
if (!isValid) {
  await this.handleFailedAttempt(user);
  throw new AuthenticationError('Invalid email or password', { message: 'Invalid password' });
}
await this.resetFailedAttempts(user);
return user;
\`\`\`

### hash รหัสผ่านอยู่คนละตารางกับผู้ใช้

\`credentials.value\` -- hash แบบ bcrypt -- มาจากตาราง \`user_credentials\` ไม่ใช่คอลัมน์บน \`users\` เอง \`UserCredentialRepository.findByUserId\` เป็นการค้นหาแยกจาก \`UserRepository.findByEmail\` ถ้ากำลังไล่บั๊ก auth ที่ไม่คุ้นแล้วเช็คแค่ตาราง \`users\` นั่นคือมองผิดที่สำหรับ credential จริง

### สองชั้นการป้องกัน สับสนได้ง่าย

มีกลไกล็อกสองแบบแยกกันในโค้ดนี้ และทำงานเป็นอิสระต่อกัน:
- **ล็อกระดับบัญชี** ตรงนี้ใน \`UserService\` -- \`lockedUntil\` เป็นคอลัมน์บนแถวผู้ใช้เอง ตั้งค่าโดย \`handleFailedAttempt\` หลังใส่รหัสผิดซ้ำๆ และเช็คด้วย \`dayjs().isBefore(dayjs(user.lockedUntil))\` ก่อนจะเทียบรหัสผ่านด้วยซ้ำ
- **จำกัดอัตราต่อ IP** ใน middleware \`authRateLimit\` (\`src/middleware/rateLimit.ts:118-137\`) -- ซึ่งรันก่อนจะมาถึงโค้ดนี้เลย โดยคุมตาม \`AUTH_MAX_ATTEMPTS\`/\`AUTH_WINDOW_MINUTES\` ไม่สนว่ากำลังเล็งบัญชีไหน

ทั้งสองตอบคำถามคนละข้อ: middleware ถามว่า "IP นี้ลองมากไปหรือยัง" ส่วน service นี้ถามว่า "บัญชีนี้ล้มเหลวมากไปหรือยัง" บัญชีที่ถูกล็อกกับ IP ที่โดน rate limit ให้ error path ต่างกัน และเกิดขึ้นเป็นอิสระต่อกันได้

### ข้อความ error ตั้งใจให้กลางๆ

ทุก branch ที่ล้มเหลวข้างบนที่อาจเผยว่า email มีอยู่จริงหรือไม่ -- ไม่พบผู้ใช้, ไม่พบ credential, รหัสผ่านผิด -- โยนข้อความเดียวกันหมดให้ client: \`Invalid email or password\` เหตุผล *จริง* อยู่ใน metadata ของ \`AuthenticationError\` (\`{ message: ... }\`) ไว้สำหรับ log เท่านั้น ไม่ส่งให้ client เลย นี่คือหลักการป้องกัน account enumeration แบบเดียวกับที่ใช้ในที่อื่นของ auth flow นี้: ถ้าข้อความ "ไม่มี user นี้" กับ "รหัสผ่านผิด" ต่างกัน จะเปิดช่องให้คนร้ายไล่เดา email ที่มีอยู่จริงได้ทีละครั้ง

## สรุป

\`bcrypt.compare\` เป็นแค่หนึ่งบรรทัด แต่ทุกอย่างรอบๆ มันใน \`UserService.authenticate\` ตั้งใจทั้งหมด: hash อยู่คนละตารางกับแถวผู้ใช้ ล็อกระดับบัญชีกับ rate limit ระดับ IP เป็นสองด่านอิสระที่บังเอิญอยู่ใน request path เดียวกัน และทุกความล้มเหลวที่อาจรั่วไหลว่าบัญชีมีอยู่จริงถูกรวบให้เหลือข้อความกลางๆ เดียวสำหรับ client ไม่ว่า branch ไหนจะล้มเหลวจริง`,
      },
      {
        slug: "signing-verifying-jwt-jose",
        titleEn: "Signing and Verifying — JWT via jose",
        titleTh: "การ Sign และ Verify — JWT ผ่าน jose",
        order: 25,
        sectionEn: "Deep Dive: Auth Stack",
        sectionTh: "เจาะลึก: Auth Stack",
        contentEn: `JWTs in this codebase are HS256, signed and verified with \`jose\` (\`^6.1.3\`) -- no external full JWT library, and no asymmetric keys. \`TokenService\` (\`src/services/TokenService.ts\`) owns both directions.

### Issuing a token

\`\`\`ts
// 63-67
public generateRefreshToken(): { refreshToken: string; hash: string } {
  const refreshToken = randomUUID();
  const hash = createHash('sha256').update(refreshToken).digest('hex');
  return { refreshToken, hash };
}

// 75-86
public async signToken(payload: TSignTokenPayload): Promise<string> {
  const secret = getJwtSecret();
  const jwt = await new jose.SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_ACCESS_EXPIRES_IN)
    .sign(secret);
  return jwt;
}
\`\`\`

Two details worth noticing: the refresh token itself is a random UUID, not a JWT -- the client gets the raw UUID exactly once, and the database only ever stores its SHA-256 hash (\`refreshTokenHash\`). If the database were ever exposed, the stored hash alone can't be turned back into a usable refresh token. The access token, by contrast, is a real signed JWT with an expiration baked in via \`setExpirationTime(JWT_ACCESS_EXPIRES_IN)\`.

### Verifying a token isn't the end of the check

\`authMiddleware\` (\`src/middleware/auth.ts:59-158\`) runs on every request that needs a logged-in user, and \`jose\`'s signature check is only step 2 of 7:

1. Read \`Authorization: Bearer <token>\` -- missing -> 401.
2. \`TokenService.verifyToken\` checks the signature.
3. \`validateSession({ accessToken })\` looks the session up in the database -- not found or expired -> 401.
4. \`session.revokedAt\` is set -> 401 \`Session has been revoked\`.
5. Session is still \`PRE_ACCESS\` or \`isMfaVerified\` is \`false\`, and the path isn't \`/api/v1/auth/verify-mfa\` or under \`/api/v1/mfa/\` -> 401 \`MFA verification required\`.
6. If the token is close to expiring, a fresh one is issued in the \`X-New-Access-Token\` response header -- the client is responsible for picking this up and using it in place of the old one.
7. The user is re-fetched from the database and attached to \`req.user\` -- authorization decisions downstream use the current DB row, not whatever role/permissions were baked into the token at signing time.

A verified JWT signature only proves the token wasn't tampered with and hasn't technically expired -- it says nothing about whether the underlying session has been revoked, whether MFA has actually been completed, or whether the user's permissions have changed since the token was issued. Steps 3 through 7 exist precisely because a signature check alone is not enough here.

## Conclusion

\`jose\` handles signing and signature verification -- two calls, \`signToken\` and \`verifyToken\` -- but the surrounding session lookup in \`authMiddleware\` is what actually enforces revocation, MFA completion, and up-to-date permissions. Anyone treating "the JWT verified" as equivalent to "this request is fully authorized" is skipping five of the seven real checks.`,
        contentTh: `JWT ในโค้ดนี้เป็น HS256 sign และ verify ด้วย \`jose\` (\`^6.1.3\`) -- ไม่มี external JWT library เต็มรูปแบบ และไม่ใช้ asymmetric key \`TokenService\` (\`src/services/TokenService.ts\`) เป็นเจ้าของทั้งสองทิศทาง

### การออก token

\`\`\`ts
// 63-67
public generateRefreshToken(): { refreshToken: string; hash: string } {
  const refreshToken = randomUUID();
  const hash = createHash('sha256').update(refreshToken).digest('hex');
  return { refreshToken, hash };
}

// 75-86
public async signToken(payload: TSignTokenPayload): Promise<string> {
  const secret = getJwtSecret();
  const jwt = await new jose.SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_ACCESS_EXPIRES_IN)
    .sign(secret);
  return jwt;
}
\`\`\`

สองเรื่องที่ควรสังเกต: refresh token เองเป็น UUID สุ่ม ไม่ใช่ JWT -- client ได้ UUID ดิบครั้งเดียวเท่านั้น ส่วนฐานข้อมูลเก็บแค่ SHA-256 hash ของมัน (\`refreshTokenHash\`) ถ้าฐานข้อมูลรั่วขึ้นมา hash ที่เก็บไว้อย่างเดียวเอากลับไปใช้เป็น refresh token จริงไม่ได้ ส่วน access token ตรงข้ามกัน เป็น JWT ที่ sign จริง มีวันหมดอายุฝังไว้ผ่าน \`setExpirationTime(JWT_ACCESS_EXPIRES_IN)\`

### การ verify token ไม่ใช่จุดจบของการเช็ก

\`authMiddleware\` (\`src/middleware/auth.ts:59-158\`) รันทุก request ที่ต้องการผู้ใช้ล็อกอิน และการเช็กลายเซ็นของ \`jose\` เป็นแค่ขั้นที่ 2 จาก 7:

1. อ่าน \`Authorization: Bearer <token>\` -- ไม่มี -> 401
2. \`TokenService.verifyToken\` ตรวจลายเซ็น
3. \`validateSession({ accessToken })\` หา session ใน DB -- ไม่เจอหรือหมดอายุ -> 401
4. \`session.revokedAt\` มีค่า -> 401 \`Session has been revoked\`
5. session ยังเป็น \`PRE_ACCESS\` หรือ \`isMfaVerified\` เป็น \`false\` และ path ไม่ใช่ \`/api/v1/auth/verify-mfa\` หรืออยู่ใต้ \`/api/v1/mfa/\` -> 401 \`MFA verification required\`
6. ถ้า token ใกล้หมดอายุ จะออกตัวใหม่ใส่ response header \`X-New-Access-Token\` -- client มีหน้าที่รับและใช้ตัวใหม่แทนตัวเดิม
7. ดึงผู้ใช้จากฐานข้อมูลใหม่แล้วใส่ใน \`req.user\` -- การตัดสินใจเรื่อง authorization ต่อจากนี้ใช้แถว DB ปัจจุบัน ไม่ใช่ role/permission ที่ฝังไว้ตอน sign token

ลายเซ็น JWT ที่ verify ผ่าน พิสูจน์แค่ว่า token ไม่ถูกแก้ไขและยังไม่หมดอายุตามเทคนิค -- ไม่ได้บอกอะไรเลยว่า session ที่แท้จริงถูก revoke ไปหรือยัง, MFA ทำจริงหรือยัง, หรือสิทธิ์ผู้ใช้เปลี่ยนไปหรือยังตั้งแต่ตอนออก token ขั้นที่ 3 ถึง 7 มีอยู่เพราะการเช็กลายเซ็นอย่างเดียวไม่พอจริงๆ ในที่นี้

## สรุป

\`jose\` จัดการ sign กับ verify ลายเซ็น -- สองเรียก \`signToken\` กับ \`verifyToken\` -- แต่การหา session ใน \`authMiddleware\` รอบๆ มันต่างหากที่บังคับเรื่อง revocation, MFA เสร็จสมบูรณ์ และสิทธิ์ที่อัปเดตล่าสุด ใครที่คิดว่า "JWT verify ผ่านแล้ว" เท่ากับ "request นี้ authorize เต็มที่แล้ว" กำลังข้ามการเช็กจริงไปห้าจากเจ็ดขั้นตอน`,
      },
      {
        slug: "session-table-source-of-truth",
        titleEn: "The Session Table as the Source of Truth",
        titleTh: "ตาราง Session คือแหล่งความจริงหลัก",
        order: 26,
        sectionEn: "Deep Dive: Auth Stack",
        sectionTh: "เจาะลึก: Auth Stack",
        contentEn: `If \`jose\` proves a token wasn't forged, \`user_sessions\` is what actually decides whether that token is still good for anything. Every session has a \`type\` -- \`PRE_ACCESS\` or \`ACCESS\` -- and a handful of fields that together represent the session's real state independent of what's encoded in the JWT: \`accessToken\`, \`refreshTokenHash\`, \`isMfaVerified\`, \`accessTokenExpiresAt\`, \`refreshTokenExpiresAt\`, \`revokedAt\`.

### One session at a time, by design

\`AuthLoginUseCase\` (\`src/usecases/auth/AuthLoginUseCase.ts:61-139\`) calls \`UserSessionService.revokeAll(...)\` on every single login (line 95), before creating the new session. This means logging in on a second device silently revokes every session the account had elsewhere -- not a bug, a deliberate single-session-at-a-time policy. If you're debugging a report of "my session on device A died right after I logged in on device B," this is the entire explanation.

### Why login doesn't grant full access immediately

The session created at the end of login is \`PRE_ACCESS\`, not \`ACCESS\`:

\`\`\`ts
const createSessionPayload = {
  userId: user.id,
  type: SESSION_ACCESS_TYPE.PRE_ACCESS,
  accessToken: token,
  refreshTokenHash: hash,
  isMfaVerified: false,
  deviceInfo: deviceInfo ?? null,
  ipAddress: ipAddress ?? null,
  accessTokenExpiresAt: dayjs().add(ACCESS_TOKEN_EXPIRY_MS, 'ms').toDate(),
  refreshTokenExpiresAt: dayjs().add(REFRESH_TOKEN_EXPIRY_MS, 'ms').toDate(),
};
\`\`\`

Login and MFA verification are genuinely two separate steps at the data level, not just two separate HTTP calls -- the row's \`type\` and \`isMfaVerified\` are what \`authMiddleware\` step 5 actually checks to decide whether to block a request with \`MFA verification required\`.

### Upgrading, not replacing

\`AuthVerifyMfaUseCase\` (\`src/usecases/auth/AuthVerifyMfaUseCase.ts:46-150\`) doesn't create a new session when MFA succeeds -- it calls \`UserSessionService.upgradeToFullAccess(sessionId)\`, which flips the *same* row's \`type\` to \`ACCESS\` and \`isMfaVerified\` to \`true\`. The access token issued at login keeps working unchanged; no new token is minted at this step. This is worth contrasting with the near-expiry token refresh in \`authMiddleware\` (step 6 of the previous lesson), which *does* mint a new token -- two different mechanisms, one that changes the token and one that changes only the session row it points to.

### Revocation lives here, not in the token

Because \`jose\` can't "un-sign" a token that's already been issued, revocation has to be enforced somewhere else -- and that somewhere is \`revokedAt\` on the session row, checked as step 4 of \`authMiddleware\`. A JWT with a perfectly valid signature and a future expiration date is still rejected the instant its session row is marked revoked. This is exactly why \`authMiddleware\` re-checks the database on every request instead of trusting the token payload alone -- a stateless JWT-only design couldn't support this kind of immediate revocation at all.

## Conclusion

The session table, not the JWT, is the actual source of truth for whether a login is still valid, whether MFA has been completed, and whether access has been revoked. \`revokeAll\`-on-every-login is what makes multi-device login look like "getting logged out elsewhere," and MFA verification is an upgrade to an existing session row, not a new token issuance -- two facts that explain nearly every session-related surprise in this stack.`,
        contentTh: `ถ้า \`jose\` พิสูจน์ว่า token ไม่ถูกปลอม \`user_sessions\` คือตัวที่ตัดสินจริงๆ ว่า token นั้นยังใช้ได้อยู่ไหม ทุก session มี \`type\` -- \`PRE_ACCESS\` หรือ \`ACCESS\` -- และฟิลด์อีกกลุ่มที่รวมกันแทนสถานะจริงของ session โดยไม่ขึ้นกับสิ่งที่เข้ารหัสไว้ใน JWT: \`accessToken\`, \`refreshTokenHash\`, \`isMfaVerified\`, \`accessTokenExpiresAt\`, \`refreshTokenExpiresAt\`, \`revokedAt\`

### ล็อกอินได้ทีละเครื่องโดยตั้งใจ

\`AuthLoginUseCase\` (\`src/usecases/auth/AuthLoginUseCase.ts:61-139\`) เรียก \`UserSessionService.revokeAll(...)\` ทุกครั้งที่ล็อกอิน (บรรทัด 95) ก่อนจะสร้าง session ใหม่ นั่นแปลว่าล็อกอินเครื่องที่สองจะ revoke ทุก session ของบัญชีนั้นในที่อื่นแบบเงียบๆ -- ไม่ใช่บั๊ก เป็นนโยบายล็อกอินได้ทีละเครื่องที่ตั้งใจไว้ ถ้ากำลังไล่ปัญหาที่มีคนแจ้งว่า "session เครื่อง A หลุดทันทีหลังล็อกอินเครื่อง B" นี่คือคำอธิบายทั้งหมด

### ทำไมล็อกอินไม่ได้สิทธิ์เต็มทันที

session ที่สร้างตอนจบ login เป็น \`PRE_ACCESS\` ไม่ใช่ \`ACCESS\`:

\`\`\`ts
const createSessionPayload = {
  userId: user.id,
  type: SESSION_ACCESS_TYPE.PRE_ACCESS,
  accessToken: token,
  refreshTokenHash: hash,
  isMfaVerified: false,
  deviceInfo: deviceInfo ?? null,
  ipAddress: ipAddress ?? null,
  accessTokenExpiresAt: dayjs().add(ACCESS_TOKEN_EXPIRY_MS, 'ms').toDate(),
  refreshTokenExpiresAt: dayjs().add(REFRESH_TOKEN_EXPIRY_MS, 'ms').toDate(),
};
\`\`\`

login กับการยืนยัน MFA เป็นสองขั้นตอนที่แยกกันจริงในระดับข้อมูล ไม่ใช่แค่สอง HTTP call -- \`type\` กับ \`isMfaVerified\` ของแถวนี้คือสิ่งที่ขั้นที่ 5 ของ \`authMiddleware\` เช็กจริงเพื่อตัดสินว่าจะบล็อก request ด้วย \`MFA verification required\` หรือไม่

### อัปเกรด ไม่ใช่แทนที่

\`AuthVerifyMfaUseCase\` (\`src/usecases/auth/AuthVerifyMfaUseCase.ts:46-150\`) ไม่ได้สร้าง session ใหม่เมื่อ MFA สำเร็จ -- มันเรียก \`UserSessionService.upgradeToFullAccess(sessionId)\` ซึ่งเปลี่ยน \`type\` ของแถว *เดิม* เป็น \`ACCESS\` และ \`isMfaVerified\` เป็น \`true\` access token ที่ออกตอน login ยังใช้งานต่อได้เหมือนเดิม ไม่มีการออก token ใหม่ในขั้นนี้ ควรเทียบกับการรีเฟรช token ตอนใกล้หมดอายุใน \`authMiddleware\` (ขั้นที่ 6 ในบทเรียนก่อนหน้า) ซึ่ง *มี* การออก token ใหม่จริง -- สองกลไกที่ต่างกัน อันหนึ่งเปลี่ยน token อีกอันเปลี่ยนแค่แถว session ที่มันชี้ไป

### การ Revoke อยู่ตรงนี้ ไม่ใช่ใน token

เพราะ \`jose\` "ถอนลายเซ็น" token ที่ออกไปแล้วไม่ได้ การ revoke เลยต้องบังคับที่อื่น -- ที่นั้นคือ \`revokedAt\` บนแถว session เช็กเป็นขั้นที่ 4 ของ \`authMiddleware\` JWT ที่ลายเซ็นถูกต้องเป๊ะและวันหมดอายุยังไม่ถึง ก็ยังถูกปฏิเสธทันทีที่แถว session ของมันถูกทำเครื่องหมาย revoke นี่คือเหตุผลที่ \`authMiddleware\` เช็กฐานข้อมูลซ้ำทุก request แทนที่จะเชื่อ payload ของ token อย่างเดียว -- design แบบ JWT-only ไร้สถานะจะรองรับการ revoke แบบทันทีนี้ไม่ได้เลย

## สรุป

ตาราง session ไม่ใช่ JWT คือแหล่งความจริงจริงๆ ว่า login ยังใช้ได้ไหม, MFA ทำแล้วหรือยัง, และสิทธิ์ถูก revoke ไปหรือยัง \`revokeAll\` ทุกครั้งที่ login คือสิ่งที่ทำให้ล็อกอินหลายเครื่องดูเหมือน "หลุดที่อื่น" และการยืนยัน MFA คือการอัปเกรดแถว session เดิม ไม่ใช่การออก token ใหม่ -- สองข้อเท็จจริงนี้อธิบายเรื่องแปลกใจเกี่ยวกับ session ใน stack นี้ได้เกือบทั้งหมด`,
      },
      {
        slug: "totp-mfa-otpauth",
        titleEn: "TOTP / MFA — otpauth in AuthVerifyMfaUseCase",
        titleTh: "TOTP / MFA — otpauth ใน AuthVerifyMfaUseCase",
        order: 27,
        sectionEn: "Deep Dive: Auth Stack",
        sectionTh: "เจาะลึก: Auth Stack",
        contentEn: `\`otpauth\` (\`^9.4.1\`) is the library behind this codebase's TOTP-based MFA, and like \`bcrypt\`, it's concentrated in one place: the OTP-validation step inside \`AuthVerifyMfaUseCase\` (\`src/usecases/auth/AuthVerifyMfaUseCase.ts:46-150\`).

### What the use case actually checks, in order

1. Look up the session by its access token -- it must be \`PRE_ACCESS\`, not expired, and not revoked. (This is the same session-state reasoning as the previous lesson -- MFA verification can't proceed against a session that's already dead by any of the checks \`authMiddleware\` itself would apply.)
2. Look up \`user_mfa.secret\` for the user -- this is the TOTP shared secret, provisioned when the user first enabled MFA (provisioning itself isn't covered by the source material this course draws from).
3. Validate the submitted OTP code against that secret via \`UserMfaService.validateTotp\`. A wrong code throws a \`409 Invalid OTP code\` -- 409, not 401 or 400, distinguishing "your credentials were fine but this specific one-time code didn't check out" from an authentication failure or a malformed request.
4. On success, \`UserSessionService.upgradeToFullAccess(sessionId)\` flips the existing session to \`ACCESS\`, as covered in the previous lesson -- no new token is issued here.

### What isn't confirmed here

The source material behind this course captures the shape of the check (\`user_mfa.secret\` in, \`UserMfaService.validateTotp\` as the verifier, a 409 on mismatch) but not \`otpauth\`'s own configuration inside \`validateTotp\` -- things like the time-step window, how many adjacent windows are tolerated for clock drift, or backup-code handling (\`user_mfa.backupCodes\` exists as a column, per the database-schema lesson in the layer-tracing course, but its actual usage path wasn't traced). Treat those as open questions to verify directly in \`UserMfaService\`, not as settled facts from this lesson.

### Why this step exists at all, restated

Tying this back to the whole login flow: \`bcrypt\` proves you know the password, \`jose\`'s signature proves the resulting token wasn't tampered with, and \`otpauth\` here proves you also hold the TOTP device the account was enrolled with. Each library covers a different kind of proof, and \`authMiddleware\`'s step 5 (from the JWT lesson) is what refuses to treat a session as fully authenticated until all three have actually happened -- password, valid token, and OTP, in that order, gated by the session row's own state rather than anything in the token payload.

## Conclusion

\`otpauth\`'s job here is narrow and well-defined -- validate one submitted code against one stored secret, inside one use case -- but the specifics of that validation (window tolerance, backup codes) aren't part of the verified record this course is built from. What is confirmed: a failed OTP is a 409, not an auth-layer 401, and success upgrades an existing \`PRE_ACCESS\` session rather than minting anything new.`,
        contentTh: `\`otpauth\` (\`^9.4.1\`) คือ library เบื้องหลัง MFA แบบ TOTP ในโค้ดนี้ และเหมือน \`bcrypt\` มันกระจุกอยู่ที่เดียว คือขั้นตอนตรวจ OTP ข้างใน \`AuthVerifyMfaUseCase\` (\`src/usecases/auth/AuthVerifyMfaUseCase.ts:46-150\`)

### สิ่งที่ use case เช็กจริงๆ ตามลำดับ

1. หา session จาก access token -- ต้องเป็น \`PRE_ACCESS\`, ยังไม่หมดอายุ, และยังไม่ถูก revoke (เป็นตรรกะสถานะ session แบบเดียวกับบทเรียนก่อนหน้า -- การยืนยัน MFA ดำเนินต่อกับ session ที่ตายไปแล้วตามเงื่อนไขที่ \`authMiddleware\` เองจะใช้ไม่ได้)
2. หา \`user_mfa.secret\` ของผู้ใช้ -- นี่คือ shared secret ของ TOTP ที่ตั้งไว้ตอนผู้ใช้เปิด MFA ครั้งแรก (ขั้นตอนการตั้งค่าเองไม่อยู่ในเอกสารต้นทางที่คอร์สนี้อ้างอิง)
3. ตรวจ OTP ที่ส่งมากับ secret นั้นผ่าน \`UserMfaService.validateTotp\` รหัสผิดจะโยน \`409 Invalid OTP code\` -- 409 ไม่ใช่ 401 หรือ 400 แยกความหมาย "credential ถูกแล้ว แต่รหัสครั้งเดียวนี้ไม่ผ่าน" ออกจาก authentication ล้มเหลวหรือ request ผิดรูปแบบ
4. สำเร็จแล้ว \`UserSessionService.upgradeToFullAccess(sessionId)\` เปลี่ยน session เดิมเป็น \`ACCESS\` ตามที่กล่าวในบทเรียนก่อนหน้า -- ไม่มีการออก token ใหม่ในขั้นนี้

### สิ่งที่ยังไม่ยืนยันในที่นี้

เอกสารต้นทางที่คอร์สนี้อ้างอิงจับภาพรูปแบบของการเช็กได้ (\`user_mfa.secret\` เข้า, \`UserMfaService.validateTotp\` เป็นตัวตรวจ, 409 เมื่อไม่ตรง) แต่ไม่ได้บอกการตั้งค่าของ \`otpauth\` เองข้างใน \`validateTotp\` -- เช่น time-step window, ยอมรับ window ข้างเคียงกี่อันสำหรับ clock drift, หรือการจัดการ backup code (\`user_mfa.backupCodes\` มีอยู่เป็นคอลัมน์ ตามบทเรียน database schema ในคอร์สไล่โค้ดทีละ layer แต่เส้นทางการใช้งานจริงยังไม่ได้ไล่) ให้ถือว่าเป็นคำถามเปิดที่ต้องไปเช็กใน \`UserMfaService\` โดยตรง ไม่ใช่ข้อเท็จจริงที่ยืนยันแล้วจากบทเรียนนี้

### ทำไมขั้นตอนนี้ถึงมีอยู่ พูดซ้ำอีกครั้ง

ผูกกลับไปที่ flow login ทั้งหมด: \`bcrypt\` พิสูจน์ว่ารู้รหัสผ่าน, ลายเซ็นของ \`jose\` พิสูจน์ว่า token ที่ได้ไม่ถูกแก้ไข, และ \`otpauth\` ตรงนี้พิสูจน์ว่าถือ TOTP device ที่บัญชีลงทะเบียนไว้ด้วย แต่ละ library ครอบคลุมการพิสูจน์คนละแบบ และขั้นที่ 5 ของ \`authMiddleware\` (จากบทเรียนเรื่อง JWT) คือตัวที่ปฏิเสธไม่ให้ถือว่า session authenticate เต็มที่จนกว่าทั้งสามอย่างจะเกิดขึ้นจริง -- รหัสผ่าน, token ที่ valid, และ OTP ตามลำดับ คุมด้วยสถานะของแถว session เอง ไม่ใช่อะไรใน payload ของ token

## สรุป

หน้าที่ของ \`otpauth\` ตรงนี้แคบและชัดเจน -- ตรวจรหัสที่ส่งมาหนึ่งตัวกับ secret ที่เก็บไว้หนึ่งตัว ในหนึ่ง use case -- แต่รายละเอียดของการตรวจนั้น (window tolerance, backup code) ไม่ได้อยู่ในบันทึกที่ยืนยันแล้วซึ่งคอร์สนี้สร้างขึ้นมา สิ่งที่ยืนยันแล้ว: OTP ผิดคือ 409 ไม่ใช่ 401 ระดับ auth และความสำเร็จคืออัปเกรด session \`PRE_ACCESS\` เดิม ไม่ใช่ออกอะไรใหม่`,
      },
      {
        slug: "what-we-know-about-zod-here",
        titleEn: "What We Actually Know About Zod Here",
        titleTh: "สิ่งที่รู้จริงเกี่ยวกับ Zod ในที่นี้",
        order: 28,
        sectionEn: "Deep Dive: Validation",
        sectionTh: "เจาะลึก: Validation",
        contentEn: `This lesson is intentionally narrow. The only real Zod usage documented from this codebase is the \`login\` controller (\`src/controllers/AuthController.ts:27-54\`), and everything below is drawn from that one example -- not a general Zod tutorial, and not a survey of every schema in the app.

### The pattern: destructure first, validate second

\`\`\`ts
login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const payload = SLoginRequest.safeParse({ email, password });

    if (!payload.success) {
      const message = payload.error.issues[0]?.message;
      throw new ValidationError(\`Invalid payload: \${message}\`);
    }

    const ipAddress = this.getClientIp(req);
    const deviceInfo = this.getUserAgent(req);

    const useCase = new AuthLoginUseCase(services);
    const result = await useCase.execute(payload.data, ipAddress, deviceInfo);

    this.sendSuccess(res, { data: result }, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
\`\`\`

The specific fields (\`email\`, \`password\`) are pulled off \`req.body\` *before* being handed to \`SLoginRequest.safeParse(...)\` -- the whole \`req.body\` is never passed directly into a schema. This means a schema here validates exactly what a controller explicitly decided to extract, not whatever a client happened to send.

\`safeParse\` (not \`parse\`) is used, so a validation failure doesn't throw inside Zod itself -- it returns a \`{ success: false, error }\` result that the controller checks explicitly (\`if (!payload.success)\`), then converts into this codebase's own error type.

### Where a validation failure ends up

A failed \`safeParse\` becomes a \`ValidationError\`, built from \`payload.error.issues[0]?.message\` -- only the first issue's message, not the full list of every field that failed. That \`ValidationError\` is one of the \`AppError\` subclasses (see the layer-tracing course's error-propagation lesson); the catch-all error middleware maps it to a 400, and per the observability lesson, \`AppError\` instances get logged at \`warn\` level, not \`error\`.

### What isn't confirmed here

\`SLoginRequest\`'s own schema definition -- its field types, any \`.refine()\` calls, optional vs. required fields, custom error messages per field -- isn't part of the source material behind this course. Nor is whether every controller follows the destructure-then-\`safeParse\` pattern shown here, or whether some validate \`req.body\` directly. Treat this lesson as "one verified example of the pattern," not "the complete Zod contract for this codebase."

## Conclusion

One real fact, cleanly established: this codebase validates explicitly destructured fields with \`safeParse\`, never the raw request body, and converts a failure into a \`ValidationError\` using only the first Zod issue's message. Everything about actual schema shapes, and whether this pattern holds everywhere, remains open until more source material covers it.`,
        contentTh: `บทเรียนนี้ตั้งใจให้แคบ การใช้ Zod จริงที่มีบันทึกไว้จาก codebase นี้มีแค่ controller \`login\` (\`src/controllers/AuthController.ts:27-54\`) และทุกอย่างข้างล่างดึงมาจากตัวอย่างเดียวนั้น -- ไม่ใช่ tutorial Zod ทั่วไป และไม่ใช่การสำรวจทุก schema ในแอป

### รูปแบบ: แยกฟิลด์ก่อน แล้วค่อย validate

\`\`\`ts
login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const payload = SLoginRequest.safeParse({ email, password });

    if (!payload.success) {
      const message = payload.error.issues[0]?.message;
      throw new ValidationError(\`Invalid payload: \${message}\`);
    }

    const ipAddress = this.getClientIp(req);
    const deviceInfo = this.getUserAgent(req);

    const useCase = new AuthLoginUseCase(services);
    const result = await useCase.execute(payload.data, ipAddress, deviceInfo);

    this.sendSuccess(res, { data: result }, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
\`\`\`

ฟิลด์ที่ต้องการ (\`email\`, \`password\`) ถูกดึงออกจาก \`req.body\` *ก่อน* จะส่งให้ \`SLoginRequest.safeParse(...)\` -- ไม่เคยส่ง \`req.body\` ทั้งก้อนเข้า schema ตรงๆ นั่นแปลว่า schema ตรงนี้ validate เฉพาะสิ่งที่ controller ตั้งใจดึงออกมาชัดเจนเท่านั้น ไม่ใช่อะไรก็ตามที่ client บังเอิญส่งมา

ใช้ \`safeParse\` (ไม่ใช่ \`parse\`) ดังนั้นความล้มเหลวในการ validate จะไม่ throw ข้างใน Zod เอง -- มันคืนผลลัพธ์ \`{ success: false, error }\` ที่ controller เช็กเองชัดเจน (\`if (!payload.success)\`) แล้วแปลงเป็น error type ของ codebase นี้เอง

### ความล้มเหลวไปจบที่ไหน

\`safeParse\` ที่ล้มเหลวจะกลายเป็น \`ValidationError\` สร้างจาก \`payload.error.issues[0]?.message\` -- แค่ message ของ issue แรกเท่านั้น ไม่ใช่รายการทุกฟิลด์ที่ผิด \`ValidationError\` เป็นหนึ่งใน subclass ของ \`AppError\` (ดูบทเรียนเรื่อง error propagation ในคอร์สไล่โค้ดทีละ layer) error middleware กลางจะแปลงเป็น 400 และตามบทเรียน observability instance ของ \`AppError\` จะ log ที่ระดับ \`warn\` ไม่ใช่ \`error\`

### สิ่งที่ยังไม่ยืนยันในที่นี้

การนิยาม schema ของ \`SLoginRequest\` เอง -- type ของแต่ละฟิลด์, การเรียก \`.refine()\` ใดๆ, ฟิลด์ optional หรือ required, ข้อความ error เฉพาะแต่ละฟิลด์ -- ไม่ได้อยู่ในเอกสารต้นทางของคอร์สนี้ รวมถึงไม่รู้ว่าทุก controller ใช้ pattern แยกฟิลด์ก่อนแล้ว \`safeParse\` แบบนี้เหมือนกันหมดหรือบาง controller validate \`req.body\` ตรงๆ ให้ถือว่าบทเรียนนี้คือ "ตัวอย่างที่ยืนยันแล้วหนึ่งตัวอย่างของรูปแบบ" ไม่ใช่ "สัญญาครบถ้วนของ Zod ใน codebase นี้"

## สรุป

ข้อเท็จจริงจริงหนึ่งข้อที่ยืนยันชัดเจน: codebase นี้ validate ฟิลด์ที่แยกออกมาชัดเจนด้วย \`safeParse\` ไม่เคย validate request body ดิบ และแปลงความล้มเหลวเป็น \`ValidationError\` โดยใช้แค่ message ของ Zod issue แรกเท่านั้น ทุกอย่างเกี่ยวกับรูปร่าง schema จริง และว่า pattern นี้ใช้ทั่วทั้งแอปหรือไม่ ยังเป็นคำถามเปิดจนกว่าจะมีเอกสารต้นทางที่ครอบคลุมมากกว่านี้`,
      },
      {
        slug: "rate-limiting-user-facing-endpoints",
        titleEn: "Rate Limiting User-Facing Endpoints",
        titleTh: "การจำกัดอัตราสำหรับ Endpoint ที่ผู้ใช้เรียก",
        order: 29,
        sectionEn: "Deep Dive: External APIs",
        sectionTh: "เจาะลึก: External APIs",
        contentEn: `\`rate-limiter-flexible\` (\`^9.0.1\`, in-memory -- not backed by Redis or another external store in this codebase) is the library behind every rate limit in this stack. It shows up as Express middleware applied per-route, not globally, and different endpoints get different limiter instances.

### The pattern, from the login route

\`\`\`ts
router.post(
  '/login',
  authRateLimit,
  recaptchaMiddleware('login'),
  authController.login
);
\`\`\`

\`authRateLimit\` (\`src/middleware/rateLimit.ts:118-137\`) limits attempts per IP address, governed by two env vars: \`AUTH_MAX_ATTEMPTS\` and \`AUTH_WINDOW_MINUTES\`. Exceeding the limit throws a \`RateLimitError\`, mapped to HTTP 429.

### Different endpoints, different limiter instances

The same route file (\`src/routes/v1/auth.routes.ts\`) shows this isn't a single global limiter reused everywhere:

| Method + path | Middleware |
| --- | --- |
| \`POST /login\` | \`authRateLimit\` |
| \`POST /password-setup\` | \`authRateLimit\` |
| \`POST /forgot-password\` | \`authRateLimit\`, \`forgotPasswordEmailRateLimit\` |
| \`POST /verify-mfa\` | \`authRateLimit\`, \`authMiddleware\` |

\`/forgot-password\` stacks *two* limiters -- \`authRateLimit\` (the same general one) plus a dedicated \`forgotPasswordEmailRateLimit\`. The env-var groupings back this up: alongside \`AUTH_MAX_ATTEMPTS\`/\`AUTH_WINDOW_MINUTES\` there's a separate \`FORGOT_PASSWORD_MAX_ATTEMPTS\` (with its own \`*_WINDOW_MINUTES\` counterpart), plus app-wide \`API_MAX_REQUESTS\` and \`PUBLIC_MAX_REQUESTS\` for general traffic shaping outside the auth-specific endpoints. A forgot-password abuse pattern (someone hammering the email-sending endpoint specifically, as opposed to generic login brute-forcing) gets its own, separately-tunable ceiling rather than sharing a budget with ordinary login attempts.

### In-memory means per-process

Because \`rate-limiter-flexible\` is configured in-memory here rather than against a shared store, its counters live inside a single running process. Worth keeping in mind for anything about this stack that eventually runs as more than one instance behind a load balancer -- a detail the source material behind this course doesn't resolve either way, so treat it as a question to raise with whoever owns the deploy setup rather than an assumption to build on.

## Conclusion

Rate limiting here is deliberately per-concern, not one blanket rule: general auth attempts, forgot-password specifically, and general API/public traffic each have their own limiter and their own env-var-tunable ceiling, all built on the same in-memory \`rate-limiter-flexible\` library and all producing the same \`RateLimitError\` -> 429 outcome when exceeded.`,
        contentTh: `\`rate-limiter-flexible\` (\`^9.0.1\`, แบบ in-memory -- ไม่ได้ใช้ Redis หรือ store ภายนอกอื่นในโค้ดนี้) คือ library เบื้องหลังการจำกัดอัตราทุกจุดใน stack นี้ ปรากฏเป็น Express middleware ที่ใส่ต่อ route ไม่ใช่ระดับ global และแต่ละ endpoint ใช้ limiter instance คนละตัว

### รูปแบบ จาก route ของ login

\`\`\`ts
router.post(
  '/login',
  authRateLimit,
  recaptchaMiddleware('login'),
  authController.login
);
\`\`\`

\`authRateLimit\` (\`src/middleware/rateLimit.ts:118-137\`) จำกัดจำนวนครั้งต่อ IP คุมด้วย env var สองตัว: \`AUTH_MAX_ATTEMPTS\` และ \`AUTH_WINDOW_MINUTES\` เกินขีดจำกัดจะโยน \`RateLimitError\` แปลงเป็น HTTP 429

### endpoint ต่างกัน ใช้ limiter instance ต่างกัน

ไฟล์ route เดียวกัน (\`src/routes/v1/auth.routes.ts\`) แสดงให้เห็นว่านี่ไม่ใช่ limiter เดียวที่ใช้ซ้ำทุกที่:

| Method + path | Middleware |
| --- | --- |
| \`POST /login\` | \`authRateLimit\` |
| \`POST /password-setup\` | \`authRateLimit\` |
| \`POST /forgot-password\` | \`authRateLimit\`, \`forgotPasswordEmailRateLimit\` |
| \`POST /verify-mfa\` | \`authRateLimit\`, \`authMiddleware\` |

\`/forgot-password\` ซ้อน limiter *สอง* ตัว -- \`authRateLimit\` (ตัวทั่วไปเดิม) บวก \`forgotPasswordEmailRateLimit\` เฉพาะทาง กลุ่ม env var ก็ยืนยันเรื่องนี้: นอกจาก \`AUTH_MAX_ATTEMPTS\`/\`AUTH_WINDOW_MINUTES\` ยังมี \`FORGOT_PASSWORD_MAX_ATTEMPTS\` แยกต่างหาก (พร้อม \`*_WINDOW_MINUTES\` คู่กัน) บวก \`API_MAX_REQUESTS\` และ \`PUBLIC_MAX_REQUESTS\` ระดับแอปสำหรับควบคุม traffic ทั่วไปนอกเหนือจาก endpoint เฉพาะ auth รูปแบบการโจมตี forgot-password (มีคนยิง endpoint ส่ง email ถี่ๆ โดยเฉพาะ ต่างจากการ brute-force login ทั่วไป) จึงมีเพดานของตัวเองที่ปรับแยกได้ ไม่ต้องแชร์งบกับความพยายาม login ปกติ

### In-memory แปลว่าต่อ process

เพราะ \`rate-limiter-flexible\` ตั้งค่าแบบ in-memory ในที่นี้แทนที่จะใช้ store กลางที่แชร์กัน ตัวนับของมันอยู่แค่ใน process เดียวที่รันอยู่ ควรจำไว้ถ้า stack นี้จะรันมากกว่าหนึ่ง instance หลัง load balancer ในอนาคต -- รายละเอียดที่เอกสารต้นทางของคอร์สนี้ยังไม่สรุปไปทางไหน ให้ถือเป็นคำถามที่ต้องถามคนดูแล deploy แทนที่จะสรุปเอาเอง

## สรุป

การจำกัดอัตราในที่นี้ตั้งใจแยกตามเรื่อง ไม่ใช่กฎเดียวครอบคลุมหมด: ความพยายาม auth ทั่วไป, forgot-password โดยเฉพาะ, และ traffic ทั่วไป/public ต่างมี limiter และเพดานที่ปรับผ่าน env var ของตัวเอง ทั้งหมดสร้างบน \`rate-limiter-flexible\` แบบ in-memory ตัวเดียวกัน และให้ผลลัพธ์เดียวกันเมื่อเกินขีดจำกัด คือ \`RateLimitError\` -> 429`,
      },
      {
        slug: "the-external-client-roster",
        titleEn: "The External Client Roster",
        titleTh: "รายชื่อ Client ภายนอกทั้งหมด",
        order: 30,
        sectionEn: "Deep Dive: External APIs",
        sectionTh: "เจาะลึก: External APIs",
        contentEn: `Every outbound HTTP call to a third-party service in this codebase goes through \`src/helper/axiosInstance.ts\`, built on \`axios\` (\`1.18.0\`) with \`axios-retry\` (\`^4.5.0\`). MISP gets its own lesson (in the layer-tracing course) because of its unusual read-via-DB/write-via-API split -- everything else here is a normal REST client, just with nine different auth schemes.

| Client | Purpose | Auth |
| --- | --- | --- |
| \`OpenRouterApi\` | LLM summarization/analysis for AI Insight | \`Bearer\`, retries 3x |
| \`VulnerabilityRegisterApi\` | CVE catalog | \`apiKey\` header, built-in rate limiting |
| \`FirstEpssApi\` / \`CisaKevApi\` / \`CirclCveApi\` | EPSS scores / KEV list / CVE details | none, retries 3x |
| \`CveCrowdApi\` | CVE trend data | \`Bearer\` |
| \`SpgVulnerabilityApi\` | CVE-related labs and repos | HMAC-signs every request |
| \`SocSecinsightApi\` | organization SOC dashboard | \`X-Api-Key\` |
| \`BlueskyApi\` / \`NewsFeedApi\` | threat news feeds | JWT session / none |
| \`RecaptchaApi\` | reCAPTCHA verification | API key |

### No single auth pattern -- and that's expected

Six different authentication shapes across nine clients: Bearer tokens, a custom \`apiKey\` header, no auth at all, a custom \`X-Api-Key\` header, a JWT session, and per-request HMAC signing. This isn't inconsistency in this codebase's own design -- each client's auth scheme is dictated by whatever the third-party service itself requires. The useful habit is checking this table (or the real \`axiosInstance.ts\`) before assuming any two external calls share a pattern, rather than copying one client's auth handling onto another.

### The retry pattern isn't universal either

"Retries 3x" is explicitly called out for \`OpenRouterApi\`, \`FirstEpssApi\`, \`CisaKevApi\`, and \`CirclCveApi\` -- likely via \`axios-retry\`'s interceptor configuration, though the exact retry conditions (which status codes, backoff strategy) aren't part of the source material this lesson draws from. Several other clients in the table have no retry behavior noted at all. Don't assume retry-on-failure is a blanket property of every client just because the library that enables it (\`axios-retry\`) is a shared dependency -- it has to be configured per client, and evidently isn't configured identically everywhere.

### The one client that doesn't fit the "just call an API" model

\`SpgVulnerabilityApi\` signs every request with HMAC rather than sending a static credential -- a materially different integration shape from the rest of the table (a static Bearer token or API key is presented once per request as-is; an HMAC signature has to be computed fresh per request, typically over some combination of the request body, a timestamp, and a shared secret). This is worth flagging specifically because it's the one client here where "just copy how another client authenticates" would produce a client that doesn't actually work.

## Conclusion

Nine external clients, one shared \`axios\`/\`axios-retry\` foundation, and no assumption that should carry across all of them: auth scheme, retry behavior, and request-signing all vary client-by-client according to what each third-party service demands -- check the specific client before assuming it behaves like its neighbor in the table.`,
        contentTh: `ทุกการเรียก HTTP ออกไปยังบริการภายนอกในโค้ดนี้ผ่าน \`src/helper/axiosInstance.ts\` สร้างบน \`axios\` (\`1.18.0\`) กับ \`axios-retry\` (\`^4.5.0\`) MISP มีบทเรียนของตัวเอง (ในคอร์สไล่โค้ดทีละ layer) เพราะการแยกอ่านผ่าน DB/เขียนผ่าน API ที่ไม่เหมือนใคร -- ที่เหลือในนี้เป็น REST client ปกติ เพียงแต่มี auth scheme ต่างกันเก้าแบบ

| Client | ใช้ทำอะไร | Auth |
| --- | --- | --- |
| \`OpenRouterApi\` | LLM สรุป/วิเคราะห์ AI Insight | \`Bearer\`, retry 3 ครั้ง |
| \`VulnerabilityRegisterApi\` | ดึงแค็ตตาล็อก CVE | \`apiKey\` header, จำกัดความถี่ในตัว |
| \`FirstEpssApi\` / \`CisaKevApi\` / \`CirclCveApi\` | คะแนน EPSS / รายการ KEV / รายละเอียด CVE | ไม่มี, retry 3 ครั้ง |
| \`CveCrowdApi\` | ข้อมูลเทรนด์ CVE | \`Bearer\` |
| \`SpgVulnerabilityApi\` | lab และ repo ที่เกี่ยวกับ CVE | HMAC ลงลายเซ็นทุก request |
| \`SocSecinsightApi\` | แดชบอร์ด SOC ขององค์กร | \`X-Api-Key\` |
| \`BlueskyApi\` / \`NewsFeedApi\` | ดึงข่าวภัยคุกคาม | JWT session / ไม่มี |
| \`RecaptchaApi\` | ตรวจ reCAPTCHA | API key |

### ไม่มี pattern auth เดียว -- และเป็นเรื่องคาดหวังได้

หกรูปแบบ authentication ต่างกันใน 9 client: Bearer token, custom header \`apiKey\`, ไม่มี auth เลย, custom header \`X-Api-Key\`, JWT session, และการลงลายเซ็น HMAC ต่อ request นี่ไม่ใช่ความไม่สอดคล้องในดีไซน์ของ codebase นี้เอง -- auth scheme ของแต่ละ client ถูกกำหนดโดยสิ่งที่บริการภายนอกนั้นต้องการเอง นิสัยที่มีประโยชน์คือเช็คตารางนี้ (หรือ \`axiosInstance.ts\` จริง) ก่อนสมมุติว่าสอง client ภายนอกใช้ pattern เดียวกัน แทนที่จะก็อปปี้การจัดการ auth ของ client หนึ่งไปใช้กับอีกตัว

### รูปแบบ retry ก็ไม่ได้ใช้ทุกที่เหมือนกัน

"retry 3 ครั้ง" ถูกระบุไว้ชัดเจนสำหรับ \`OpenRouterApi\`, \`FirstEpssApi\`, \`CisaKevApi\`, และ \`CirclCveApi\` -- น่าจะผ่าน interceptor configuration ของ \`axios-retry\` แม้เงื่อนไข retry ที่แท้จริง (status code ไหน, backoff strategy) จะไม่ได้อยู่ในเอกสารต้นทางที่บทเรียนนี้อ้างอิง client อื่นๆ ในตารางไม่มีการระบุพฤติกรรม retry เลย อย่าสมมุติว่า retry-on-failure เป็นคุณสมบัติครอบคลุมทุก client เพียงเพราะ library ที่เปิดใช้งานได้ (\`axios-retry\`) เป็น dependency ที่ใช้ร่วมกัน -- มันต้องตั้งค่าแยกต่อ client และเห็นชัดว่าไม่ได้ตั้งเหมือนกันทุกที่

### client ที่ไม่เข้ากับโมเดล "เรียก API เฉยๆ"

\`SpgVulnerabilityApi\` ลงลายเซ็น HMAC ทุก request แทนที่จะส่ง credential แบบคงที่ -- เป็นรูปแบบการเชื่อมต่อที่ต่างจากตารางที่เหลือชัดเจน (Bearer token หรือ API key แบบคงที่ถูกส่งไปตรงๆ ทุก request; ลายเซ็น HMAC ต้องคำนวณใหม่ทุกครั้ง โดยทั่วไปคือรวม request body, timestamp, และ shared secret เข้าด้วยกัน) ควรเน้นเป็นพิเศษเพราะเป็น client เดียวในนี้ที่ "ก็อปปี้วิธี authenticate ของ client อื่นมาใช้" จะได้ client ที่ใช้งานจริงไม่ได้

## สรุป

External client เก้าตัว รากฐาน \`axios\`/\`axios-retry\` เดียวกัน แต่ไม่มีข้อสมมุติไหนที่ใช้ได้กับทุกตัว: auth scheme, พฤติกรรม retry, และการลงลายเซ็น request ต่างกันไปตาม client แต่ละตัวตามที่บริการภายนอกนั้นต้องการ -- เช็ค client เฉพาะตัวก่อนสมมุติว่ามันทำงานเหมือนตัวข้างเคียงในตาราง`,
      },
      {
        slug: "upstream-error-normalizing-failures",
        titleEn: "UpstreamError — Normalizing Failures From Services We Don't Own",
        titleTh: "UpstreamError — ทำให้ความล้มเหลวจากบริการที่ไม่ได้เป็นเจ้าของเป็นมาตรฐานเดียวกัน",
        order: 31,
        sectionEn: "Deep Dive: External APIs",
        sectionTh: "เจาะลึก: External APIs",
        contentEn: `Nine external clients with six different auth schemes still need to fail in one predictable, handleable way from the rest of this codebase's point of view. That's what the \`UpstreamError\` interceptor in \`axiosInstance.ts\` (\`:175-187\`, documented in the context of the MISP connection but applying to the shared axios setup) is for: an error coming back from any of these third-party services is converted into an \`UpstreamError\`, preserving the original service's HTTP status rather than always producing a generic one.

### Why status preservation matters

An \`UpstreamError\` that keeps MISP's or \`CisaKevApi\`'s actual status code -- a 404, a 429, a 503 -- lets the rest of the application (and its own error-handling middleware) tell the difference between "this external service is down" and "this external service says the resource doesn't exist," without every caller having to know the specifics of nine different APIs' error formats. It's the same instinct as the \`AppError\` hierarchy for this codebase's own errors (see the layer-tracing course's error-propagation lesson): one predictable shape, wrapping many different underlying causes.

### Where this connects to what's missing

The exact conditions under which \`UpstreamError\` is thrown versus when \`axios-retry\` gets a chance to retry first isn't spelled out in the source material -- a retry presumably happens before the interceptor gives up and normalizes the failure, but the ordering and interaction between "retry 3x" (noted for four of the nine clients) and this interceptor isn't confirmed. That's a legitimate thing to verify directly in \`axiosInstance.ts\` rather than assume from this lesson.

### The MISP write path is the one exception worth remembering

Every external client in the previous lesson is called for reads or one-way notifications. MISP is the only one of the nine-plus integrations in this codebase where writes also happen through this same client infrastructure (\`mispAdminApi\`, per the MISP integration lesson) -- meaning a failed MISP write surfaces as the same kind of \`UpstreamError\` as a failed read from any other service, even though creating or deleting an event is a materially riskier operation than fetching a CVE score. Whether callers of \`mispAdminApi\` do anything special to handle a write-specific \`UpstreamError\` differently from a read-specific one isn't part of the record this course is built from.

## Conclusion

Whatever the specific service, whatever its auth scheme or retry configuration, a failure from any of them lands in this codebase as the same \`UpstreamError\` shape with the original status preserved -- the point of the interceptor is that nothing above \`axiosInstance.ts\` needs to know which of the nine services it's actually talking to in order to handle a failure sensibly.`,
        contentTh: `External client เก้าตัวที่มีหก auth scheme ต่างกัน ก็ยังต้องล้มเหลวในแบบที่คาดเดาได้และจัดการได้แบบเดียวจากมุมมองของโค้ดที่เหลือทั้งหมด นั่นคือหน้าที่ของ interceptor \`UpstreamError\` ใน \`axiosInstance.ts\` (\`:175-187\` เอกสารไว้ในบริบทการเชื่อมต่อ MISP แต่ใช้กับ axios setup ที่แชร์กันทั้งหมด): error ที่ตอบกลับมาจากบริการภายนอกตัวไหนก็ตามในเก้าตัวนี้ จะถูกแปลงเป็น \`UpstreamError\` โดยคง HTTP status ของบริการต้นทางไว้ ไม่ใช่ตอบ status กลางๆ เสมอ

### ทำไมการคง status ถึงสำคัญ

\`UpstreamError\` ที่คง status จริงของ MISP หรือ \`CisaKevApi\` ไว้ -- 404, 429, 503 -- ทำให้ส่วนที่เหลือของแอป (และ error-handling middleware ของมันเอง) แยกความแตกต่างระหว่าง "บริการภายนอกนี้ล่ม" กับ "บริการภายนอกนี้บอกว่าไม่มี resource นี้" ได้ โดยไม่ต้องให้ผู้เรียกทุกคนรู้รายละเอียดรูปแบบ error ของ API เก้าตัวที่ต่างกัน เป็นสัญชาตญาณเดียวกับ hierarchy ของ \`AppError\` สำหรับ error ของ codebase นี้เอง (ดูบทเรียนเรื่อง error propagation ในคอร์สไล่โค้ดทีละ layer) รูปร่างเดียวที่คาดเดาได้ ห่อหุ้มสาเหตุที่แท้จริงหลายแบบ

### จุดที่เชื่อมกับสิ่งที่ยังขาด

เงื่อนไขที่แท้จริงว่า \`UpstreamError\` ถูกโยนเมื่อไหร่ เทียบกับตอนที่ \`axios-retry\` มีโอกาส retry ก่อน ไม่ได้ระบุไว้ชัดในเอกสารต้นทาง -- คาดว่า retry น่าจะเกิดก่อนที่ interceptor จะยอมแพ้แล้วทำให้ error เป็นมาตรฐาน แต่ลำดับและปฏิสัมพันธ์ระหว่าง "retry 3 ครั้ง" (ระบุไว้สำหรับสี่ในเก้า client) กับ interceptor ตัวนี้ยังไม่ยืนยัน เป็นเรื่องที่ควรไปเช็กใน \`axiosInstance.ts\` โดยตรง ไม่ใช่สมมุติเอาจากบทเรียนนี้

### เส้นทางเขียนของ MISP คือข้อยกเว้นที่ควรจำ

external client ทุกตัวในบทเรียนก่อนหน้าถูกเรียกเพื่ออ่านหรือแจ้งเตือนทางเดียว MISP เป็นตัวเดียวในบรรดา integration ทั้งเก้ากว่าตัวของ codebase นี้ที่การเขียนก็เกิดผ่านโครงสร้าง client เดียวกันนี้ด้วย (\`mispAdminApi\` ตามบทเรียน MISP integration) -- แปลว่าการเขียน MISP ที่ล้มเหลว จะปรากฏเป็น \`UpstreamError\` แบบเดียวกับการอ่านที่ล้มเหลวจากบริการอื่น แม้ว่าการสร้างหรือลบ event จะเป็น operation ที่เสี่ยงกว่าการดึงคะแนน CVE มาก ว่าผู้เรียก \`mispAdminApi\` จะจัดการ \`UpstreamError\` เฉพาะการเขียนต่างจากการอ่านเป็นพิเศษหรือไม่ ไม่ได้อยู่ในบันทึกที่คอร์สนี้สร้างขึ้นมา

## สรุป

ไม่ว่าจะเป็นบริการไหน auth scheme หรือการตั้งค่า retry แบบใด ความล้มเหลวจากบริการไหนก็ตามในเก้าตัวนี้จะลงเอยในโค้ดนี้เป็น \`UpstreamError\` รูปร่างเดียวกัน โดยคง status เดิมไว้ -- จุดประสงค์ของ interceptor คือไม่ต้องมีอะไรเหนือ \`axiosInstance.ts\` ที่ต้องรู้ว่ากำลังคุยกับบริการไหนในเก้าตัวนี้ เพื่อจะจัดการความล้มเหลวได้อย่างสมเหตุสมผล`,
      },
    ],
  };

export default course;
