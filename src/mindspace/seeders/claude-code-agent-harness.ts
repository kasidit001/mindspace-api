import type { SeedCourse } from "./types";

const course: SeedCourse = {
    slug: "claude-code-agent-harness",
    title: "Claude Code — Agent Harness",
    descriptionEn: `A hands-on course on what an "agent harness" is and how one actually works, using Claude Code itself as the running example throughout: the agentic loop, CLAUDE.md as durable project memory, Plan Mode, subagents, hooks, permissions, and context management (summarization, persistent memory, the scratchpad) -- how each piece works, why it exists, and how they combine in a real multi-step task. Ends with a guided setup pass for applying all of it to your own real software project.`,
    descriptionTh: `คอร์สแบบลงมือทำจริง ว่าด้วย "agent harness" คืออะไรและทำงานอย่างไรจริงๆ โดยใช้ Claude Code เองเป็นตัวอย่างหลักตลอดทั้งคอร์ส: agentic loop, CLAUDE.md ในฐานะความจำโปรเจกต์ที่คงอยู่, Plan Mode, subagent, hook, permission, และ context management (การสรุป, memory ที่คงอยู่, scratchpad) -- แต่ละชิ้นทำงานอย่างไร ทำไมถึงมีอยู่ และรวมกันอย่างไรในงานจริงที่มีหลายขั้นตอน จบด้วยการไล่ตั้งค่าทั้งหมดนี้ให้ใช้ได้จริงกับโปรเจกต์ซอฟต์แวร์ของคุณเอง`,
    lessons: [
      {
        slug: "what-is-an-agent-harness",
        titleEn: "What Is an \"Agent Harness\"?",
        titleTh: "Agent Harness คืออะไร",
        order: 1,
        contentEn: `![What Is an Agent Harness diagram](/images/courses/claude-code-agent-harness/what-is-an-agent-harness.png)

"Agent harness" is a term of art in the AI tooling world, not a brand name -- it describes a category of software, and Claude Code (the CLI tool you're reading this lesson in, if you're following along hands-on) is one real, working example of it.

### Why a harness had to exist

Once LLMs became genuinely capable, developers ran into the same handful of pain points almost immediately:

- **No state** -- every API call started over from zero, with no memory of what had already happened.
- **Stuck "in its head"** -- the model could describe what to do next, but had no way to actually invoke a tool and make it happen.
- **No recovery** -- one failure and the whole thing just stopped, with no retry or recovery mechanism.
- **Context runs out** -- any task long enough to matter eventually exceeded what the model could hold in a single call.
- **No boundaries** -- nothing defined what the model was and wasn't allowed to do, so safety depended entirely on the prompt being well-behaved.

The real-world version of this shows up as a familiar complaint: "I asked the AI to write the code for me, but it only tells me what to do -- I still have to copy and paste every step myself." A capable model with none of these gaps closed is still, in practice, not an agent -- it's an advisor that needs a human to act as its hands. Closing exactly these five gaps is what a harness is *for*, which is why the rest of this lesson defines it as four concrete parts rather than a vague "wrapper around the model."

### A brief history: what people tried before "harness" was a concept

The pain points above didn't go unnoticed -- developers tried several approaches before the harness concept crystallized into what it is today:

1. **Manual chaining (2022)** -- write one prompt, copy its output by hand into the next prompt, repeat. It worked, barely, but was slow and extremely error-prone: one bad copy-paste and the whole chain was wrong.
2. **Early frameworks, e.g. LangChain (2023)** -- introduced abstractions like "Chains" and "Agents" to formalize that manual process, but the developer still had to wire up most of the control logic themselves. This bought structure at the cost of real complexity -- these setups became notoriously hard to debug.
3. **AutoGPT / BabyAGI (2023)** -- pushed further by letting the model loop and direct its own next steps with minimal human involvement. The demos were striking, but both were missing real guardrails and real context management, which showed up in practice as runs that looped pointlessly or drifted off task -- impressive proofs of concept, not stable enough for production work.

Each attempt solved part of the problem but exposed another gap, which is exactly what pushed the field toward treating "harness" as a first-class concept: not one clever trick, but the full, deliberate combination of state, tool execution, feedback loops, and enforced boundaries covered below.

### The compact version: Agent = Model + Harness

A useful shorthand for everything this course covers: **Agent = Model + Harness**. On its own, a model is a text generator -- it reasons about what to say next, but it has no memory of what happened earlier in a task beyond what's in its input, no way to actually touch a file or run a command, and nothing stopping it from doing something unsafe. The harness is what turns that text generator into something that can get real work done: it's what supplies state, tool execution, feedback loops, and enforced security around the model's output. If you didn't build the model yourself -- and if you're reading this, you almost certainly didn't -- the model is a given. The harness is the part you actually design, configure, and improve, and it's what the rest of this lesson (and course) is really about.

### Another common picture: the car analogy

A different way people describe this same split: think of a car. The **model** is the engine -- the raw power source. The **harness** is everything else you need to actually drive somewhere: the steering wheel, the brakes, the dashboard, the control systems. An engine by itself doesn't go anywhere useful; it needs a harness around it to be steerable, stoppable, and safe.

Under this framing, a harness's job breaks down into four functions that map directly onto the four parts below:

- **Actionable** -- lets the model actually invoke tools, not just describe what it would do. (This is the tool interface.)
- **Looping** -- drives the repeated reason-act-observe cycle (often called a "ReAct loop" in the research literature) until the task is done. (This is the agent loop.)
- **Enforcing** -- handles sandboxing and security so the model can't do something destructive or out of scope. (This is control mechanisms.)
- **Contextual** -- manages what's in the model's working memory ("RAM") versus what gets persisted to longer-term storage ("disk"). (This is context management.)

Same four ideas, different vocabulary -- which is itself worth noticing: once you know the four functions a harness has to perform, you'll recognize them under whatever names a particular write-up or product happens to use.

### The definition, broken into four parts

An agent harness is the runtime layer that sits between a language model and the real world, and it needs four things to earn the name:

1. **An agent loop** -- a cycle of "model decides what to do next, harness carries it out, result goes back to the model" that repeats until the task is done, not a single one-shot prompt/response.
2. **A tool interface** -- a defined set of actions the model can request (reading a file, running a command, searching the web) that the harness actually executes, because the model itself can't touch your filesystem or network directly.
3. **Context management** -- a way of deciding what the model actually sees at each step, since no model has an infinite window and a long task generates far more history than fits.
4. **Control mechanisms** -- rules about what the model is and isn't allowed to do unsupervised, enforced by the harness, not by the model's own judgment alone.

If a system is missing one of these four, it's something else -- a plain chatbot has an interface but no persistent tool loop; a one-shot code generator has no context management because it never runs long enough to need any. This course uses Claude Code to make each of the four concrete, lesson by lesson.

### Why this distinction matters for a software engineer

The model (Claude itself) and the harness (Claude Code) are separable, and knowing which one is responsible for a given behavior changes how you'd go about fixing or configuring it. If Claude gives a technically-correct-but-unhelpful answer, that's a model behavior. If Claude Code refuses to run a command without asking, or forgets something you told it three files ago, or spins up a helper process -- that's harness behavior, governed by the mechanisms this course covers: permissions, context management, subagents.

### A first look at the four parts in Claude Code specifically

You'll go deep on each of these in later lessons, but here's where to spot each one right now, in this very session if you're running Claude Code:

- **Agent loop**: every time you ask for something that takes more than one step (find a bug, fix it, verify the fix), you're watching the loop run -- read, edit, run tests, read the output, maybe edit again.
- **Tool interface**: the concrete actions available to Claude Code -- reading and writing files, running shell commands, searching, and more -- are each a distinct, named tool, not a vague "do anything" capability.
- **Context management**: long sessions get automatically summarized as they approach the context limit, so work can continue past what would otherwise be a hard wall.
- **Control mechanisms**: certain actions need your explicit approval before they run, and that boundary is configurable, not fixed.

### Hands-on: name the four parts in a tool you already use

Before moving to the next lesson, pick one other AI coding tool or assistant you've used (even briefly), and try to name its agent loop, tool interface, context management, and control mechanisms -- or note explicitly which of the four it's missing. If you can't name one of the four, that's informative: it likely means that tool is a different category of thing (a single-shot autocomplete, a chat window with no tools) rather than a full agent harness. Write this down; lesson 9 asks you to compare it against Claude Code directly.

## Conclusion

An agent harness is defined by four parts working together: an agent loop, a tool interface, context management, and control mechanisms. Claude Code is a real, running instance of this category -- the model and the harness are separable, and almost everything this course covers from here (CLAUDE.md, Plan Mode, subagents, hooks, permissions) is really just a deeper look at how Claude Code implements these same four parts.`,
        contentTh: `![What Is an Agent Harness diagram](/images/courses/claude-code-agent-harness/what-is-an-agent-harness.png)

"Agent harness" เป็นศัพท์เฉพาะในวงการเครื่องมือ AI ไม่ใช่ชื่อแบรนด์ -- มันอธิบายหมวดหมู่ของซอฟต์แวร์ และ Claude Code (เครื่องมือ CLI ที่คุณกำลังอ่านบทเรียนนี้อยู่ ถ้ากำลังเรียนไปด้วยลงมือทำไปด้วย) คือตัวอย่างจริงที่ทำงานได้จริงตัวหนึ่งของหมวดหมู่นี้

### ทำไม Harness ถึงต้องเกิดขึ้น

พอ LLM เริ่มมีความสามารถจริงจัง นักพัฒนาก็เจอ pain point ชุดเดียวกันนี้แทบจะทันที:

- **ไม่มี state** -- ทุก API call เริ่มใหม่จากศูนย์ ไม่มีความจำว่าเกิดอะไรขึ้นมาก่อนหน้า
- **ติดอยู่ "แค่ในหัว"** -- model บอกได้ว่าต้องทำอะไรต่อ แต่ไม่มีทางสั่งงาน tool ให้มันเกิดขึ้นจริง
- **ไม่มีการกู้คืน** -- พังครั้งเดียวก็หยุดเลย ไม่มีกลไก retry หรือ recovery
- **context หมด** -- งานที่ยาวพอจะมีความหมาย สุดท้ายก็เกินกว่าที่ model จะเก็บไว้ได้ในการเรียกครั้งเดียว
- **ไม่มีขอบเขต** -- ไม่มีอะไรกำหนดว่า model ทำอะไรได้หรือไม่ได้ ความปลอดภัยเลยขึ้นอยู่กับ prompt ที่เขียนไว้ดีพอหรือเปล่าเท่านั้น

เวอร์ชันที่เกิดขึ้นจริงมักออกมาเป็นคำบ่นที่คุ้นเคย: "ฉันให้ AI เขียนโค้ดให้ แต่มันบอกแค่ว่าต้องทำอะไร ฉันต้องนั่ง copy วางเองทุกขั้นตอน" model ที่เก่งแต่ไม่ได้ปิดช่องว่างทั้งห้านี้เลย ในทางปฏิบัติก็ยังไม่ใช่ agent -- มันคือที่ปรึกษาที่ต้องการคนมาเป็นมือไม้ให้ การปิดช่องว่างทั้งห้านี้เองคือสิ่งที่ harness มีไว้ *เพื่อ* ทำ ซึ่งเป็นเหตุผลที่บทเรียนที่เหลือนี้นิยามมันเป็นสี่ส่วนที่จับต้องได้ แทนที่จะเป็น "ตัวห่อหุ้มรอบๆ model" ที่คลุมเครือ

### ประวัติย่อ: ก่อนที่ "harness" จะกลายเป็นแนวคิดจริงจัง

pain point ข้างบนไม่ได้ถูกมองข้าม นักพัฒนาลองหลายวิธีก่อนที่แนวคิด harness จะตกผลึกมาเป็นแบบที่เห็นทุกวันนี้:

1. **Manual chaining (2022)** -- เขียน prompt หนึ่งตัว เอา output มา copy ด้วยมือใส่เป็น prompt ถัดไป ทำซ้ำไปเรื่อยๆ มันพอใช้ได้ แต่ช้าและ error ง่ายมาก copy ผิดนิดเดียวทั้งสายก็พังหมด
2. **Framework ยุคแรก เช่น LangChain (2023)** -- เริ่มมี abstraction อย่าง "Chain" และ "Agent" เพื่อทำให้กระบวนการมือนั้นเป็นทางการขึ้น แต่นักพัฒนายังต้อง wire logic ควบคุมส่วนใหญ่เองอยู่ดี ได้โครงสร้างมาแลกกับ complexity ที่สูงขึ้นจริง -- setup แบบนี้ขึ้นชื่อเรื่อง debug ยาก
3. **AutoGPT / BabyAGI (2023)** -- ไปไกลกว่านั้นด้วยการปล่อยให้ model วน loop และสั่งขั้นตอนถัดไปของตัวเองโดยมีคนเข้าไปเกี่ยวข้องน้อยที่สุด demo ดูน่าทึ่งมาก แต่ทั้งคู่ขาด guardrail จริงและการจัดการ context จริง ซึ่งแสดงออกมาในทางปฏิบัติเป็นการวน loop ที่ไม่มีความหมายหรือหลุดออกนอกงาน -- พิสูจน์แนวคิดได้น่าประทับใจ แต่ยังไม่ stable พอสำหรับงาน production

แต่ละความพยายามแก้ปัญหาได้บางส่วน แต่ก็เผยช่องว่างใหม่ขึ้นมา ซึ่งนี่แหละคือสิ่งที่ผลักดันวงการให้มอง "harness" เป็นแนวคิดหลักจริงจัง ไม่ใช่เทคนิคฉลาดอันเดียว แต่เป็นการรวมกันอย่างตั้งใจของ state, tool execution, feedback loop, และขอบเขตที่บังคับใช้จริง ตามที่จะพูดถึงต่อไปข้างล่างนี้

### แบบย่อ: Agent = Model + Harness

ตัวย่อที่ใช้ได้ดีสำหรับทุกอย่างในคอร์สนี้: **Agent = Model + Harness** ลำพังแค่ Model มันคือเครื่องผลิตข้อความ (text generator) -- มันคิดว่าจะพูดอะไรต่อ แต่ไม่มีความจำเรื่องที่เกิดขึ้นก่อนหน้าในงานเดียวกันนอกเหนือจากที่อยู่ใน input ของมัน ไม่มีทางแตะไฟล์หรือรันคำสั่งได้จริง และไม่มีอะไรหยุดมันจากการทำสิ่งที่ไม่ปลอดภัย Harness คือสิ่งที่เปลี่ยนเครื่องผลิตข้อความนั้นให้กลายเป็นสิ่งที่ทำงานจริงได้ -- มันคือสิ่งที่ให้ state, tool execution, feedback loops, และ security ที่บังคับใช้จริงรอบๆ ผลลัพธ์ของ model ถ้าคุณไม่ได้สร้าง model เอง -- และถ้ากำลังอ่านอยู่นี้ แทบจะแน่นอนว่าไม่ได้สร้าง -- model คือสิ่งที่กำหนดมาให้แล้ว ส่วน harness คือสิ่งที่คุณออกแบบ ตั้งค่า และปรับปรุงได้จริง ซึ่งคือสิ่งที่บทเรียนนี้ (และคอร์สนี้) พูดถึงจริงๆ

### อีกภาพหนึ่งที่ใช้อธิบายบ่อย: อุปมารถยนต์

อีกวิธีหนึ่งที่คนใช้อธิบายการแบ่งนี้: ลองนึกถึงรถยนต์ **Model** คือเครื่องยนต์ (engine) -- แหล่งพลังงานดิบ **Harness** คือทุกอย่างที่เหลือที่ต้องมีเพื่อขับไปไหนมาไหนได้จริง: พวงมาลัย, เบรก, แผงหน้าปัด, ระบบควบคุม เครื่องยนต์อย่างเดียวไปไหนไม่ได้อย่างมีประโยชน์ -- มันต้องมี harness ห่อหุ้มเพื่อให้บังคับทิศทางได้, หยุดได้, และปลอดภัย

ภายใต้กรอบนี้ หน้าที่ของ harness แบ่งเป็นสี่หน้าที่ ที่ตรงกับสี่ส่วนข้างล่างนี้พอดี:

- **Actionable** -- ทำให้ model สั่งงาน tool ได้จริง ไม่ใช่แค่บอกว่าจะทำอะไร (คือ tool interface)
- **Looping** -- ขับเคลื่อนวงจร reason-act-observe ที่ทำซ้ำ (มักเรียกว่า "ReAct loop" ในงานวิจัย) จนกว่างานจะเสร็จ (คือ agent loop)
- **Enforcing** -- จัดการเรื่อง sandbox และความปลอดภัย เพื่อไม่ให้ model ทำอะไรที่ทำลายหรือเกินขอบเขต (คือ control mechanisms)
- **Contextual** -- บริหารว่าอะไรอยู่ใน working memory ของ model ("RAM") เทียบกับอะไรที่เก็บแบบถาวรกว่า ("disk") (คือ context management)

สี่แนวคิดเดิม แค่คำศัพท์ต่างออกไป -- ซึ่งเป็นสิ่งที่ควรสังเกต: พอรู้สี่หน้าที่ที่ harness ต้องทำแล้ว จะจำมันได้ไม่ว่าบทความหรือผลิตภัณฑ์ไหนจะเรียกมันว่าอะไร

### นิยาม แยกเป็นสี่ส่วน

Agent harness คือ runtime layer ที่อยู่ระหว่างโมเดลภาษากับโลกจริง และต้องมีสี่อย่างนี้ถึงจะเรียกได้ว่าเป็น agent harness จริง:

1. **Agent loop** -- วงจรของ "โมเดลตัดสินใจว่าจะทำอะไรต่อไป, harness ลงมือทำจริง, ผลลัพธ์กลับไปหาโมเดล" ที่ทำซ้ำจนกว่างานจะเสร็จ ไม่ใช่ prompt/response แบบครั้งเดียวจบ
2. **Tool interface** -- ชุด action ที่ชัดเจนที่โมเดลขอให้ทำได้ (อ่านไฟล์, รันคำสั่ง, ค้นหาเว็บ) ที่ harness เป็นคนลงมือทำจริง เพราะตัวโมเดลเองแตะ filesystem หรือเครือข่ายตรงๆ ไม่ได้
3. **Context management** -- วิธีตัดสินใจว่าโมเดลเห็นอะไรจริงๆ ในแต่ละขั้น เพราะไม่มีโมเดลไหนมี window ไม่จำกัด และงานที่ยาวสร้างประวัติมากกว่าที่จะใส่พอดีเสมอ
4. **Control mechanism** -- กฎว่าโมเดลทำอะไรได้และทำอะไรไม่ได้โดยไม่มีใครดูแล บังคับใช้โดย harness ไม่ใช่แค่วิจารณญาณของโมเดลเอง

ถ้าระบบไหนขาดสี่อย่างนี้อย่างใดอย่างหนึ่ง มันก็เป็นอย่างอื่น -- chatbot ธรรมดามี interface แต่ไม่มี tool loop ที่ต่อเนื่อง; เครื่องมือสร้างโค้ดแบบครั้งเดียวจบไม่มี context management เพราะไม่เคยรันนานพอที่จะต้องการมัน คอร์สนี้ใช้ Claude Code ทำให้ทั้งสี่ส่วนเป็นรูปธรรม ทีละบทเรียน

### ทำไมความแตกต่างนี้สำคัญสำหรับวิศวกรซอฟต์แวร์

โมเดล (Claude เอง) กับ harness (Claude Code) แยกออกจากกันได้ และการรู้ว่าพฤติกรรมหนึ่งๆ เป็นความรับผิดชอบของอันไหน เปลี่ยนวิธีที่คุณจะไปแก้หรือตั้งค่ามัน ถ้า Claude ตอบถูกต้องทางเทคนิคแต่ไม่ช่วยอะไร นั่นคือพฤติกรรมของโมเดล ถ้า Claude Code ปฏิเสธที่จะรันคำสั่งโดยไม่ถามก่อน, ลืมสิ่งที่คุณบอกไว้เมื่อสามไฟล์ก่อน, หรือสร้าง helper process ขึ้นมา -- นั่นคือพฤติกรรมของ harness ที่ถูกควบคุมด้วยกลไกที่คอร์สนี้ครอบคลุม: permissions, context management, subagents

### มองสี่ส่วนนี้ใน Claude Code จริงๆ เป็นครั้งแรก

จะเจาะลึกแต่ละอันในบทเรียนถัดไป แต่ตอนนี้ลองสังเกตแต่ละอันได้เลยในเซสชันนี้ ถ้ากำลังรัน Claude Code อยู่:

- **Agent loop**: ทุกครั้งที่ขออะไรที่ต้องใช้มากกว่าหนึ่งขั้นตอน (หาบั๊ก, แก้มัน, ตรวจสอบว่าแก้ถูก) คุณกำลังดู loop ทำงานอยู่ -- อ่าน, แก้ไข, รันเทส, อ่านผลลัพธ์, อาจจะแก้อีกครั้ง
- **Tool interface**: action ที่เป็นรูปธรรมที่ Claude Code ทำได้ -- อ่านและเขียนไฟล์, รันคำสั่ง shell, ค้นหา, และอื่นๆ -- แต่ละอันเป็น tool ที่มีชื่อเจาะจง ไม่ใช่ความสามารถ "ทำอะไรก็ได้" คลุมเครือ
- **Context management**: เซสชันที่ยาวจะถูกสรุปอัตโนมัติเมื่อใกล้ถึงขีดจำกัด context ทำให้งานทำต่อได้เกินกว่าที่จะเจอกำแพงแข็งๆ
- **Control mechanism**: บาง action ต้องการการอนุมัติชัดเจนจากคุณก่อนที่จะรัน และเส้นแบ่งนั้นปรับได้ ไม่ใช่ตายตัว

### ลงมือทำ: ระบุสี่ส่วนนี้ในเครื่องมือที่คุณเคยใช้

ก่อนไปบทเรียนถัดไป เลือกเครื่องมือ AI coding หรือ assistant อื่นที่เคยใช้ (แม้จะใช้สั้นๆ) แล้วลองระบุ agent loop, tool interface, context management, และ control mechanism ของมัน -- หรือจดไว้ชัดเจนว่าขาดอันไหนในสี่อย่างนี้ ถ้าระบุอันใดอันหนึ่งไม่ได้ นั่นคือข้อมูลที่มีประโยชน์: มักแปลว่าเครื่องมือนั้นเป็นหมวดหมู่อื่น (autocomplete ครั้งเดียวจบ, หน้าต่าง chat ที่ไม่มี tool) ไม่ใช่ agent harness เต็มรูปแบบ จดไว้ -- บทเรียนที่ 9 จะให้เอามาเทียบกับ Claude Code โดยตรง

## สรุป

Agent harness นิยามด้วยสี่ส่วนที่ทำงานร่วมกัน: agent loop, tool interface, context management, และ control mechanism Claude Code คือตัวอย่างจริงที่ทำงานได้จริงของหมวดหมู่นี้ -- โมเดลกับ harness แยกออกจากกันได้ และเกือบทุกอย่างที่คอร์สนี้จะพูดถึงจากนี้ (CLAUDE.md, Plan Mode, subagent, hook, permission) จริงๆ แล้วคือการเจาะลึกว่า Claude Code implement สี่ส่วนเดียวกันนี้อย่างไร`,
      },
      {
        slug: "the-agentic-loop",
        titleEn: "The Agentic Loop — How Claude Code Actually Runs",
        titleTh: "Agentic Loop — Claude Code ทำงานจริงอย่างไร",
        order: 2,
        contentEn: `![The Agentic Loop diagram](/images/courses/claude-code-agent-harness/the-agentic-loop.png)

Lesson 1 named "an agent loop" as the first of the four required parts of a harness. This lesson is entirely about that loop -- the mechanical cycle that turns "fix this bug" into actual edited files and a passing test suite, without you supplying each individual step yourself.

### The cycle, step by step

1. **You give a goal**, not a set of instructions for each step. "Fix the failing test in \`auth.test.ts\`" is a goal; you didn't say "open the file, find the assertion, change line 42."
2. **The model decides the next single action** -- read a specific file, run a specific command, search for a specific string -- and expresses that as a tool call, not as prose.
3. **The harness executes that action for real** -- actually reading the file, actually running the command -- and captures the real result.
4. **The result goes back to the model as new information**, and the cycle repeats: decide, execute, observe, decide again.
5. **The loop ends** when the model judges the goal is met, or when a limit (a turn cap, a user interrupt) stops it first.

### Why this is fundamentally different from a single prompt/response

A plain chat response is one step: you ask, the model answers from what it already knows, done. The agentic loop's defining feature is step 4 -- the model's *next* decision is informed by the *real, current* result of its *previous* action, not by a guess about what that result probably was. This is why an agent harness can fix a bug it's never seen before: it doesn't need to already know what's wrong, it can read the actual error, form a theory, test the theory, and revise.

### Where you can actually watch this happen

If you're running Claude Code: ask for something that requires more than one step -- genuinely open-ended, like "find out why this function returns undefined sometimes." Watch the sequence of tool calls that follows. You'll typically see a read (to find the function), maybe a search (to find where it's called from), a reasoning step, and only then an edit -- each one informed by what the previous one actually turned up, not planned out in advance as a fixed script.

### The loop has to stop somewhere

An unbounded loop is a liability, not a feature -- a harness needs a way to end the cycle even if the model never "decides" it's done. In practice this shows up as things like a maximum number of steps, or a person interrupting to redirect. We'll come back to this exact concern from a different angle in the permissions lesson: stopping conditions and permission boundaries are both examples of the harness, not the model, having the final say over what keeps happening.

### Hands-on: trace a loop on a real task

Pick one small, genuinely multi-step task in your own project (not something you already know the exact fix for) and, as you run it through Claude Code, write down the actual sequence of tool calls as they happen -- not what you'd predict in advance, but what actually occurred: read, read, search, edit, run-tests, read-output, edit-again, done. Compare the real sequence to what you would have guessed beforehand. The gap between the two is exactly what the agentic loop is buying you over writing the fix yourself step by step.

## Conclusion

The agentic loop is decide → execute → observe → decide again, repeated until the goal is met or a limit stops it. Its value over a single prompt/response is entirely in that observe step: each decision is grounded in the real result of the previous action, not a guess. Everything else this course covers -- CLAUDE.md, Plan Mode, subagents, hooks, permissions, context management -- is really about shaping what happens inside and around this one loop.`,
        contentTh: `![The Agentic Loop diagram](/images/courses/claude-code-agent-harness/the-agentic-loop.png)

บทเรียนที่ 1 ระบุ "agent loop" เป็นส่วนแรกในสี่ส่วนที่จำเป็นของ harness บทเรียนนี้พูดถึง loop นั้นทั้งหมด -- วงจรเชิงกลไกที่เปลี่ยน "แก้บั๊กนี้ให้หน่อย" ให้กลายเป็นไฟล์ที่ถูกแก้ไขจริงและ test suite ที่ผ่านจริง โดยไม่ต้องให้คุณป้อนแต่ละขั้นตอนเอง

### วงจร ทีละขั้น

1. **คุณให้เป้าหมาย** ไม่ใช่ชุดคำสั่งทีละขั้น "แก้เทสที่ล้มเหลวใน \`auth.test.ts\`" คือเป้าหมาย คุณไม่ได้บอกว่า "เปิดไฟล์ หา assertion เปลี่ยนบรรทัด 42"
2. **โมเดลตัดสินใจ action ถัดไปหนึ่งอย่าง** -- อ่านไฟล์ที่เจาะจง, รันคำสั่งที่เจาะจง, ค้นหา string ที่เจาะจง -- แล้วแสดงออกมาเป็น tool call ไม่ใช่ข้อความร้อยแก้ว
3. **Harness ลงมือทำ action นั้นจริง** -- อ่านไฟล์จริงๆ, รันคำสั่งจริงๆ -- แล้วเก็บผลลัพธ์จริง
4. **ผลลัพธ์กลับไปหาโมเดลเป็นข้อมูลใหม่** แล้ววงจรทำซ้ำ: ตัดสินใจ, ลงมือทำ, สังเกต, ตัดสินใจอีกครั้ง
5. **Loop จบ** เมื่อโมเดลตัดสินว่าเป้าหมายสำเร็จแล้ว หรือเมื่อขีดจำกัด (เพดานจำนวนรอบ, ผู้ใช้ขัดจังหวะ) หยุดมันก่อน

### ทำไมสิ่งนี้ถึงต่างจาก prompt/response ครั้งเดียวโดยพื้นฐาน

การตอบ chat ธรรมดาคือหนึ่งขั้น: คุณถาม โมเดลตอบจากสิ่งที่มันรู้อยู่แล้ว จบ คุณสมบัติที่นิยาม agentic loop คือขั้นที่ 4 -- การตัดสินใจ *ถัดไป* ของโมเดล อิงกับผลลัพธ์ *จริง ปัจจุบัน* ของ action *ก่อนหน้า* ไม่ใช่การเดาว่าผลลัพธ์นั้นน่าจะเป็นอะไร นี่คือเหตุผลที่ agent harness แก้บั๊กที่ไม่เคยเห็นมาก่อนได้: มันไม่ต้องรู้ล่วงหน้าว่าอะไรผิด มันอ่าน error จริง ตั้งทฤษฎี ทดสอบทฤษฎี แล้วปรับปรุงได้

### จุดที่สังเกตเห็นสิ่งนี้เกิดขึ้นจริงได้

ถ้ากำลังรัน Claude Code อยู่: ลองขออะไรที่ต้องใช้มากกว่าหนึ่งขั้นตอน -- แบบเปิดกว้างจริงๆ เช่น "หาว่าทำไม function นี้ถึง return undefined บางครั้ง" ดูลำดับของ tool call ที่ตามมา ปกติจะเห็นการอ่าน (เพื่อหา function), อาจมีการค้นหา (เพื่อหาว่าถูกเรียกจากไหน), ขั้นตอนการคิด, แล้วค่อยแก้ไข -- แต่ละอันอิงกับสิ่งที่อันก่อนหน้าเจอจริงๆ ไม่ใช่วางแผนไว้ล่วงหน้าเป็นสคริปต์ตายตัว

### Loop ต้องหยุดที่ไหนสักแห่ง

loop ที่ไม่มีขอบเขตคือภาระ ไม่ใช่คุณสมบัติ -- harness ต้องมีวิธีจบวงจรแม้โมเดลจะไม่เคย "ตัดสินใจ" ว่าเสร็จแล้ว ในทางปฏิบัติสิ่งนี้ปรากฏเป็นสิ่งต่างๆ เช่น จำนวนขั้นตอนสูงสุด หรือคนขัดจังหวะเพื่อเปลี่ยนทิศทาง เราจะกลับมาที่ประเด็นเดียวกันนี้จากมุมต่างในบทเรียนเรื่อง permissions: เงื่อนไขการหยุดและขอบเขต permission ทั้งคู่เป็นตัวอย่างที่ harness ไม่ใช่โมเดล เป็นคนตัดสินสุดท้ายว่าอะไรจะเกิดขึ้นต่อ

### ลงมือทำ: ไล่ loop บนงานจริง

เลือกงานเล็กๆ ที่ต้องใช้หลายขั้นตอนจริงในโปรเจกต์ของคุณเอง (ไม่ใช่อะไรที่รู้วิธีแก้แน่ชัดอยู่แล้ว) แล้วขณะที่รันผ่าน Claude Code จดลำดับ tool call จริงตามที่เกิดขึ้น -- ไม่ใช่สิ่งที่คุณจะทายล่วงหน้า แต่สิ่งที่เกิดขึ้นจริง: อ่าน, อ่าน, ค้นหา, แก้ไข, รันเทส, อ่านผลลัพธ์, แก้ไขอีกครั้ง, เสร็จ เทียบลำดับจริงกับสิ่งที่คุณจะทายไว้ล่วงหน้า ช่องว่างระหว่างสองอย่างนี้คือสิ่งที่ agentic loop กำลังซื้อให้คุณ เทียบกับการเขียนการแก้ไขเองทีละขั้น

## สรุป

Agentic loop คือ ตัดสินใจ → ลงมือทำ → สังเกต → ตัดสินใจอีกครั้ง ทำซ้ำจนกว่าเป้าหมายจะสำเร็จหรือขีดจำกัดหยุดมัน คุณค่าของมันเหนือ prompt/response ครั้งเดียวอยู่ที่ขั้นตอนสังเกตทั้งหมด: แต่ละการตัดสินใจอิงกับผลลัพธ์จริงของ action ก่อนหน้า ไม่ใช่การเดา ทุกอย่างที่เหลือที่คอร์สนี้ครอบคลุม -- CLAUDE.md, Plan Mode, subagent, hook, permission, context management -- จริงๆ แล้วคือเรื่องของการกำหนดรูปร่างสิ่งที่เกิดขึ้นข้างในและรอบๆ loop เดียวนี้`,
      },
      {
        slug: "claude-md-durable-memory",
        titleEn: "CLAUDE.md — Giving the Agent Durable Project Memory",
        titleTh: "CLAUDE.md — การให้ Agent มีความจำที่คงอยู่ของโปรเจกต์",
        order: 3,
        contentEn: `![CLAUDE.md: Durable Memory diagram](/images/courses/claude-code-agent-harness/claude-md-durable-memory.png)

Lesson 2's agentic loop runs inside a single session -- it has no memory of your project before you started talking, unless something supplies that memory. \`CLAUDE.md\` is the mechanism: a plain Markdown file, read automatically at the start of a session, that gives the agent durable, project-specific context it would otherwise have to be told fresh every single time.

### What actually belongs in it

A \`CLAUDE.md\` is most useful as the answer to: "what would I have to explain to a new teammate on day one that isn't obvious from reading the code?" In practice, that tends to mean things like:

- **Commands** that aren't guessable from the file structure alone -- how to run the dev server, the test suite, a migration, a linter -- especially when they're project-specific (a custom script wrapping a more complex underlying command).
- **Architectural conventions** that span many files and wouldn't be obvious from any single one -- a layered request flow, a naming convention, a rule like "this part of the stack is deliberately different from how you'd normally do it, and here's why."
- **Workflow rules** -- a git branching convention, a rule about never committing to a specific branch directly, how pull requests should be structured.
- **Known gaps or deliberate inconsistencies** -- the kind of thing that would otherwise cause an agent (or a new human) to "fix" something that was actually intentional.

Notice what's conspicuously not on this list: anything derivable by just reading the code. A \`CLAUDE.md\` that restates what a function does, or lists every file in a directory, is wasted space -- the agent can read the actual files. The useful content is precisely the context that *isn't* in the code: the why, the convention, the gotcha.

### Why this connects back to lesson 1's definition

\`CLAUDE.md\` is a context management mechanism (one of lesson 1's four required parts) with an unusual property: it's supplied once, by a human, ahead of time, rather than generated or summarized by the harness during the session. It's the one piece of context in this whole course that you author directly, rather than one the harness manages automatically.

### Nested and scoped files

A large or multi-part project doesn't have to put everything in one root file -- a \`CLAUDE.md\` can exist in a subdirectory, scoped to just that part of the project, and both the root and nested files are read together when relevant work touches that area. This matters for a monorepo or any project with genuinely different conventions in different parts (a frontend app and a backend API living side by side, each with its own real rules).

### Hands-on: write or audit a real CLAUDE.md

For your own project:

1. If you don't already have a \`CLAUDE.md\`, write a first one now, using the "what would I tell a new teammate on day one" test above as your filter for what to include.
2. If you already have one, reread it against that same test -- find one section that's just restating what the code already says, and either cut it or replace it with the actual non-obvious reason behind the thing.
3. Write down one real gotcha from your own project history (a bug caused by someone "fixing" something that was actually intentional, a convention that looks wrong until you know why) and add it as a line in the file.

## Conclusion

\`CLAUDE.md\` gives the agentic loop from lesson 2 something it has no other way to get: durable, project-specific context that persists across sessions, authored once by a human rather than rediscovered every time. Its value is concentrated entirely in what isn't obvious from the code itself -- commands, conventions, workflow rules, and deliberate gotchas -- not in restating what a file already says.`,
        contentTh: `![CLAUDE.md: Durable Memory diagram](/images/courses/claude-code-agent-harness/claude-md-durable-memory.png)

Agentic loop จากบทเรียนที่ 2 ทำงานอยู่ข้างในเซสชันเดียว -- มันไม่มีความจำเกี่ยวกับโปรเจกต์ของคุณก่อนที่จะเริ่มคุยกัน เว้นแต่จะมีอะไรป้อนความจำนั้นให้ \`CLAUDE.md\` คือกลไกนั้น: ไฟล์ Markdown ธรรมดา ที่ถูกอ่านอัตโนมัติตอนเริ่มเซสชัน ให้ context ที่คงอยู่ เจาะจงกับโปรเจกต์ ที่ไม่งั้นต้องบอกใหม่ทุกครั้ง

### อะไรที่ควรอยู่ในนั้นจริงๆ

\`CLAUDE.md\` มีประโยชน์ที่สุดเมื่อเป็นคำตอบของ: "อะไรที่ต้องอธิบายให้เพื่อนร่วมทีมใหม่ในวันแรก ที่ไม่ชัดเจนจากการอ่านโค้ด" ในทางปฏิบัติ มักหมายถึงสิ่งแบบนี้:

- **คำสั่ง** ที่เดาไม่ได้แค่จากโครงสร้างไฟล์ -- วิธีรัน dev server, test suite, migration, linter -- โดยเฉพาะเมื่อมันเจาะจงกับโปรเจกต์ (สคริปต์ custom ที่ห่อคำสั่งที่ซับซ้อนกว่าไว้ข้างใน)
- **ข้อตกลงด้าน architecture** ที่ครอบคลุมหลายไฟล์ และไม่ชัดเจนจากไฟล์เดียวไหนเลย -- request flow แบบ layer, ข้อตกลงการตั้งชื่อ, กฎแบบ "ส่วนนี้ของ stack ตั้งใจทำต่างจากที่ปกติจะทำ และนี่คือเหตุผล"
- **กฎ workflow** -- ข้อตกลง git branch, กฎห้าม commit ลง branch ที่เจาะจงตรงๆ, pull request ควรมีโครงสร้างอย่างไร
- **ช่องว่างที่รู้อยู่แล้วหรือความไม่สอดคล้องที่ตั้งใจ** -- สิ่งที่ไม่งั้นจะทำให้ agent (หรือมนุษย์ใหม่) "แก้" อะไรบางอย่างที่จริงๆ ตั้งใจไว้แบบนั้น

สังเกตสิ่งที่หายไปจากลิสต์นี้อย่างเห็นได้ชัด: อะไรก็ตามที่ได้มาจากการอ่านโค้ดเฉยๆ \`CLAUDE.md\` ที่พูดซ้ำว่า function ทำอะไร หรือลิสต์ทุกไฟล์ในโฟลเดอร์ เป็นพื้นที่ที่เสียเปล่า -- agent อ่านไฟล์จริงได้อยู่แล้ว เนื้อหาที่มีประโยชน์คือ context ที่ *ไม่อยู่* ในโค้ดเป๊ะๆ: ทำไม, ข้อตกลง, จุดที่หลงทางบ่อย

### ทำไมสิ่งนี้เชื่อมกลับไปที่นิยามในบทเรียนที่ 1

\`CLAUDE.md\` คือกลไก context management (หนึ่งในสี่ส่วนที่จำเป็นจากบทเรียนที่ 1) ที่มีคุณสมบัติแปลกอย่างหนึ่ง: มันถูกป้อนครั้งเดียว โดยมนุษย์ ล่วงหน้า แทนที่จะถูกสร้างหรือสรุปโดย harness ระหว่างเซสชัน มันคือ context ชิ้นเดียวในคอร์สนี้ทั้งหมดที่คุณเขียนเองโดยตรง แทนที่จะเป็นชิ้นที่ harness จัดการอัตโนมัติ

### ไฟล์แบบซ้อนและมีขอบเขต

โปรเจกต์ใหญ่หรือมีหลายส่วนไม่จำเป็นต้องใส่ทุกอย่างในไฟล์ root เดียว -- \`CLAUDE.md\` อยู่ในโฟลเดอร์ย่อยได้ จำกัดขอบเขตแค่ส่วนนั้นของโปรเจกต์ และทั้งไฟล์ root กับไฟล์ที่ซ้อนอยู่ถูกอ่านรวมกันเมื่องานที่เกี่ยวข้องแตะพื้นที่นั้น เรื่องนี้สำคัญสำหรับ monorepo หรือโปรเจกต์ที่มีข้อตกลงต่างกันจริงๆ ในส่วนต่างๆ (แอป frontend กับ API backend อยู่ด้วยกัน แต่ละอันมีกฎจริงของตัวเอง)

### ลงมือทำ: เขียนหรือตรวจสอบ CLAUDE.md จริง

สำหรับโปรเจกต์ของคุณเอง:

1. ถ้ายังไม่มี \`CLAUDE.md\` เขียนไฟล์แรกตอนนี้เลย ใช้คำถาม "จะบอกอะไรเพื่อนร่วมทีมใหม่ในวันแรก" ข้างบนเป็นตัวกรองว่าจะใส่อะไร
2. ถ้ามีอยู่แล้ว อ่านซ้ำด้วยคำถามเดียวกัน หาหนึ่งส่วนที่แค่พูดซ้ำสิ่งที่โค้ดบอกอยู่แล้ว แล้วตัดทิ้งหรือแทนที่ด้วยเหตุผลจริงที่ไม่ชัดเจนเบื้องหลังสิ่งนั้น
3. จดจุดที่หลงทางบ่อยจริงหนึ่งอย่างจากประวัติโปรเจกต์ของคุณเอง (บั๊กที่เกิดเพราะมีคน "แก้" อะไรที่จริงๆ ตั้งใจไว้แบบนั้น, ข้อตกลงที่ดูผิดจนกว่าจะรู้เหตุผล) แล้วเพิ่มเป็นบรรทัดในไฟล์

## สรุป

\`CLAUDE.md\` ให้สิ่งที่ agentic loop จากบทเรียนที่ 2 ไม่มีวิธีอื่นที่จะได้: context ที่คงอยู่ เจาะจงกับโปรเจกต์ ที่อยู่ข้ามเซสชัน เขียนครั้งเดียวโดยมนุษย์ แทนที่จะค้นพบใหม่ทุกครั้ง คุณค่าของมันกระจุกอยู่ที่สิ่งที่ไม่ชัดเจนจากโค้ดเองทั้งหมด -- คำสั่ง, ข้อตกลง, กฎ workflow, และจุดที่หลงทางบ่อยที่ตั้งใจไว้ -- ไม่ใช่การพูดซ้ำสิ่งที่ไฟล์บอกอยู่แล้ว`,
      },
      {
        slug: "plan-mode",
        titleEn: "Plan Mode — Proposing Before Acting",
        titleTh: "Plan Mode — การเสนอแผนก่อนลงมือทำ",
        order: 4,
        contentEn: `![Plan Mode diagram](/images/courses/claude-code-agent-harness/plan-mode.png)

Lesson 2's agentic loop, left to run freely, goes straight from "decide" to "execute" every time -- useful for a quick fix, risky for a large or ambiguous change where the *wrong* first step might be expensive to undo. Plan Mode is a control mechanism (lesson 1's fourth required part) that inserts a checkpoint between deciding and executing: the agent researches and proposes a plan first, and nothing gets changed until a human approves it.

### What actually happens differently in Plan Mode

Outside Plan Mode, the loop from lesson 2 runs: decide, execute, observe, repeat -- edits happen as they're decided. Inside Plan Mode, the agent can still read, search, and explore freely (the research half of the loop keeps running normally), but the execute step for anything that changes the project is held back. Instead, the agent produces an actual plan -- specific enough to review, not a vague restatement of the request -- and only once that's explicitly approved does execution begin, typically picking up right where the plan left off rather than starting over.

### Why this is genuinely a different control mechanism, not just "being careful"

Compare this to the trace-explain-validate-propose shape you'd see in any well-governed coding agent: the common thread is that the proposal and the execution are two separate moments, with a human decision point between them. Plan Mode makes that separation a first-class mode of the harness rather than something you'd have to achieve purely through careful prompting. The difference matters in practice: a prompt can ask an agent to "explain before acting," but an agent that's not in a plan-first mode can still slip back into immediate execution on a later step. Plan Mode holds that line structurally.

### When it genuinely earns its cost

Plan Mode has a real cost -- it's slower than letting the loop run freely, and it asks you to actually read and evaluate a plan rather than just watching edits happen. It's worth that cost specifically when:

- The task is large enough that the *first* step matters a lot -- a refactor that touches many files, where starting from the wrong architectural assumption is expensive to unwind.
- The request is genuinely ambiguous, and you'd rather see the agent's interpretation made explicit before it commits to one.
- You want a second set of eyes (yours) on the *approach*, not just the resulting diff -- catching a wrong plan before it's executed is cheaper than catching a wrong implementation after.

It's not worth the cost for a small, well-specified fix where the plan would just restate the obvious single step.

### Hands-on: pick a real task and decide, deliberately

Think of two tasks from your own current project: one small and well-specified (you already know almost exactly what the fix looks like), and one larger or more ambiguous (a refactor, a new feature with more than one reasonable approach). For each, write one sentence explaining whether you'd use Plan Mode, using the three bullet points above as your actual reasoning -- not "bigger tasks need more care" in the abstract, but which specific risk (expensive-to-unwind first step, genuine ambiguity, wanting a second opinion on approach) applies here.

## Conclusion

Plan Mode is a control mechanism that separates proposing from executing as a structural property of the harness, not just a prompting habit -- research continues freely, but changes wait for explicit approval of an actual plan. It earns its slower pace specifically on large, ambiguous, or expensive-to-unwind tasks, and costs more than it's worth on small, well-specified ones.`,
        contentTh: `![Plan Mode diagram](/images/courses/claude-code-agent-harness/plan-mode.png)

Agentic loop จากบทเรียนที่ 2 ถ้าปล่อยให้รันอิสระ จะไปจาก "ตัดสินใจ" สู่ "ลงมือทำ" ทันทีทุกครั้ง -- มีประโยชน์สำหรับการแก้ไขเร็วๆ แต่เสี่ยงสำหรับการเปลี่ยนแปลงใหญ่หรือคลุมเครือ ที่ขั้นตอนแรกที่ *ผิด* อาจแพงที่จะย้อนกลับ Plan Mode คือ control mechanism (ส่วนที่สี่ที่จำเป็นจากบทเรียนที่ 1) ที่แทรกจุดเช็คระหว่างการตัดสินใจกับการลงมือทำ: agent ค้นคว้าและเสนอแผนก่อน และไม่มีอะไรถูกเปลี่ยนจนกว่ามนุษย์จะอนุมัติ

### อะไรที่ต่างออกไปจริงๆ ใน Plan Mode

นอก Plan Mode loop จากบทเรียนที่ 2 รัน: ตัดสินใจ, ลงมือทำ, สังเกต, ทำซ้ำ -- การแก้ไขเกิดขึ้นทันทีที่ตัดสินใจ ข้างใน Plan Mode agent ยังอ่าน, ค้นหา, สำรวจได้อิสระ (ครึ่งค้นคว้าของ loop ยังทำงานปกติ) แต่ขั้นลงมือทำสำหรับอะไรก็ตามที่เปลี่ยนโปรเจกต์ถูกกั้นไว้ แทนที่จะทำแบบนั้น agent ผลิตแผนจริงๆ ขึ้นมา -- เจาะจงพอที่จะรีวิวได้ ไม่ใช่การพูดซ้ำคำขอแบบคลุมเครือ -- และก็ต่อเมื่อได้รับการอนุมัติชัดเจนแล้วเท่านั้นที่การลงมือทำจะเริ่ม โดยปกติจะทำต่อจากจุดที่แผนจบไว้ ไม่ใช่เริ่มใหม่

### ทำไมนี่ถึงเป็น control mechanism ที่ต่างออกไปจริงๆ ไม่ใช่แค่ "ความระมัดระวัง"

เทียบกับรูปร่างไล่หา-อธิบาย-ตรวจสอบ-เสนอที่เห็นใน coding agent ที่กำกับดูแลดีๆ ตัวไหนก็ได้: เส้นด้ายร่วมคือข้อเสนอกับการลงมือทำเป็นสองช่วงเวลาแยกกัน มีจุดตัดสินใจของมนุษย์อยู่ตรงกลาง Plan Mode ทำให้การแยกนั้นเป็น mode ชั้นหนึ่งของ harness แทนที่จะเป็นสิ่งที่ต้องทำให้ได้ผ่านการเขียน prompt ระมัดระวังอย่างเดียว ความต่างสำคัญในทางปฏิบัติ: prompt ขอให้ agent "อธิบายก่อนลงมือทำ" ได้ แต่ agent ที่ไม่ได้อยู่ใน mode แผนก่อน ยังลื่นไถลกลับไปลงมือทำทันทีในขั้นตอนถัดไปได้อยู่ดี Plan Mode ยึดเส้นนั้นไว้ในเชิงโครงสร้าง

### เมื่อไหร่ที่มันคุ้มค่าจริงๆ

Plan Mode มีต้นทุนจริง -- มันช้ากว่าปล่อยให้ loop รันอิสระ และต้องให้คุณอ่านและประเมินแผนจริงๆ แทนที่จะแค่ดูการแก้ไขเกิดขึ้น มันคุ้มต้นทุนนั้นโดยเฉพาะเมื่อ:

- งานใหญ่พอที่ขั้นตอน *แรก* สำคัญมาก -- refactor ที่แตะหลายไฟล์ ที่เริ่มจากสมมุติฐาน architecture ผิดจะแพงที่จะคลี่คลาย
- คำขอคลุมเครือจริงๆ และอยากเห็นการตีความของ agent ถูกทำให้ชัดเจนก่อนที่มันจะลงมือกับตัวใดตัวหนึ่ง
- ต้องการสายตาที่สอง (ของคุณ) ดู *แนวทาง* ไม่ใช่แค่ diff ที่ได้ -- จับแผนที่ผิดก่อนลงมือทำ ถูกกว่าจับ implementation ที่ผิดหลังทำไปแล้ว

ไม่คุ้มต้นทุนสำหรับการแก้ไขเล็กๆ ที่ระบุชัดเจนแล้ว ที่แผนจะแค่พูดซ้ำขั้นตอนเดียวที่ชัดเจนอยู่แล้ว

### ลงมือทำ: เลือกงานจริงแล้วตัดสินใจอย่างตั้งใจ

นึกถึงสองงานจากโปรเจกต์ปัจจุบันของคุณเอง: อันหนึ่งเล็กและระบุชัดเจนแล้ว (รู้อยู่แล้วเกือบเป๊ะว่าการแก้ไขหน้าตาเป็นอย่างไร) และอันหนึ่งใหญ่กว่าหรือคลุมเครือกว่า (refactor, feature ใหม่ที่มีมากกว่าหนึ่งแนวทางที่สมเหตุสมผล) สำหรับแต่ละอัน เขียนหนึ่งประโยคอธิบายว่าจะใช้ Plan Mode ไหม โดยใช้สามข้อข้างบนเป็นเหตุผลจริง -- ไม่ใช่ "งานใหญ่กว่าต้องการความระมัดระวังมากกว่า" แบบนามธรรม แต่ความเสี่ยงเจาะจงอันไหน (ขั้นแรกที่แพงจะคลี่คลาย, ความคลุมเครือจริง, อยากได้ความเห็นที่สองเรื่องแนวทาง) ที่ใช้ได้กับงานนี้

## สรุป

Plan Mode คือ control mechanism ที่แยกการเสนอออกจากการลงมือทำ เป็นคุณสมบัติเชิงโครงสร้างของ harness ไม่ใช่แค่นิสัยการเขียน prompt -- การค้นคว้ายังทำได้อิสระ แต่การเปลี่ยนแปลงรอการอนุมัติชัดเจนของแผนจริง มันคุ้มจังหวะที่ช้าลงโดยเฉพาะกับงานใหญ่, คลุมเครือ, หรือแพงที่จะคลี่คลาย และมีต้นทุนมากกว่าคุ้มค่ากับงานเล็กที่ระบุชัดเจนแล้ว`,
      },
      {
        slug: "subagents",
        titleEn: "Subagents — Forking and Spawning Specialized Agents",
        titleTh: "Subagents — การ Fork และสร้าง Agent เฉพาะทาง",
        order: 5,
        contentEn: `![Subagents diagram](/images/courses/claude-code-agent-harness/subagents.png)

A single agentic loop (lesson 2) handles one thread of work at a time, in one context. Subagents are how a harness runs additional, separate instances of that same loop -- each with its own context, sometimes its own specialized configuration -- either in parallel with the main session or to handle a piece of work the main session doesn't need to see in full detail.

### Two different reasons to use a subagent

**1. Keeping the main session's context clean.** Some research is useful only as a conclusion, not as a transcript -- "search the codebase and summarize how authentication works" produces a lot of intermediate reading and false leads that would clutter the main conversation if done inline. Delegating that research to a subagent means only the *answer* comes back to the main thread; the exploration happens, and stays, somewhere else. This is a direct, practical application of lesson 1's "context management" -- deciding what the model actually needs to see.

**2. Specialization.** A subagent can be configured for a specific kind of task -- reviewing code with a particular focus, for instance -- with its own tuned instructions, separate from the general-purpose behavior of the main session. This is conceptually close to Harness's own narrowly-scoped managed agents from the sibling course on Harness Agents, if you've taken that one: a specialized subagent is easier to reason about than one general agent trying to do everything.

### Forking vs. starting fresh

There's a meaningful difference between spawning a subagent that inherits the main session's full conversation context, versus one that starts with no memory of what's happened so far and has to be briefed from scratch. The first is useful when the subagent needs to pick up exactly where the main thread left off; the second is appropriate when the task is genuinely self-contained, and in fact *should* be approached without the main session's accumulated assumptions biasing it.

### Subagents run inside the same control mechanisms, not around them

A subagent isn't a way to escape lesson 4's Plan Mode or the permissions boundaries covered in the next lesson -- it's still the same kind of agentic loop, still subject to the same category of control mechanisms (lesson 1's fourth required part), just running as a separate instance. Delegating work to a subagent changes *who* is doing the reasoning and *what context* they start with; it doesn't change *what they're allowed to do unsupervised*.

### Hands-on: decide, don't default

Think of one task from your own project that currently takes several back-and-forth turns in a single session -- something exploratory, where most of the value is in a final summary rather than the process. Write down: would this genuinely benefit from running as a subagent (keeping the exploration out of your main thread), and if so, should it inherit full context or start fresh? Then write one sentence for a *different*, simpler task where a subagent would just be unnecessary overhead -- the value of this exercise is in noticing both directions, not just reaching for subagents by default.

## Conclusion

Subagents run additional, separate instances of the same agentic loop from lesson 2 -- useful for keeping exploratory work out of the main session's context, or for handling a task with specialized, narrower instructions. Whether a subagent inherits the main session's context or starts fresh is a real design choice, not a default to ignore. And subagents don't bypass control mechanisms -- they're still bound by the same category of rules covered in the next two lessons.`,
        contentTh: `![Subagents diagram](/images/courses/claude-code-agent-harness/subagents.png)

Agentic loop เดียว (บทเรียนที่ 2) จัดการงานหนึ่งสายในหนึ่ง context ในแต่ละครั้ง Subagent คือวิธีที่ harness รัน instance เพิ่มเติม แยกต่างหากของ loop เดียวกันนั้น -- แต่ละตัวมี context ของตัวเอง บางครั้งมีการตั้งค่าเฉพาะทางของตัวเอง -- ทั้งแบบขนานไปกับเซสชันหลัก หรือจัดการงานชิ้นหนึ่งที่เซสชันหลักไม่จำเป็นต้องเห็นรายละเอียดทั้งหมด

### สองเหตุผลต่างกันที่ใช้ subagent

**1. รักษา context ของเซสชันหลักให้สะอาด** งานค้นคว้าบางอย่างมีประโยชน์แค่ตอนเป็นข้อสรุป ไม่ใช่ transcript ทั้งหมด -- "ค้นหาใน codebase แล้วสรุปว่า authentication ทำงานอย่างไร" ผลิตการอ่านระหว่างทางและเส้นทางที่ผิดเยอะ ซึ่งจะทำให้บทสนทนาหลักรกถ้าทำตรงๆ ในนั้น การ delegate การค้นคว้านั้นให้ subagent หมายความว่ามีแค่ *คำตอบ* ที่กลับมาที่สายหลัก การสำรวจเกิดขึ้น และอยู่ที่อื่น นี่คือการประยุกต์ใช้ "context management" จากบทเรียนที่ 1 โดยตรงในทางปฏิบัติ -- การตัดสินใจว่าโมเดลต้องเห็นอะไรจริงๆ

**2. ความเฉพาะทาง** subagent ตั้งค่าให้เหมาะกับงานประเภทเจาะจงได้ -- เช่นการรีวิวโค้ดด้วยจุดโฟกัสเฉพาะ -- ด้วย instruction ที่ปรับแต่งของตัวเอง แยกจากพฤติกรรมทั่วไปของเซสชันหลัก แนวคิดนี้ใกล้เคียงกับ managed agent ที่ขอบเขตแคบของ Harness เองจากคอร์สพี่น้องเรื่อง Harness Agent ถ้าเคยเรียนคอร์สนั้นแล้ว: subagent เฉพาะทางคิดตามง่ายกว่า agent ทั่วไปตัวเดียวที่พยายามทำทุกอย่าง

### Fork เทียบกับเริ่มใหม่

มีความต่างที่มีความหมายระหว่างการสร้าง subagent ที่สืบทอด context การสนทนาเต็มของเซสชันหลัก เทียบกับตัวที่เริ่มโดยไม่มีความจำว่าเกิดอะไรขึ้นมาก่อน แล้วต้องถูกบรีฟใหม่ตั้งแต่ศูนย์ แบบแรกมีประโยชน์เมื่อ subagent ต้องทำต่อจากจุดที่สายหลักทิ้งไว้พอดี แบบที่สองเหมาะเมื่องานจบในตัวเองจริงๆ และจริงๆ แล้ว *ควร* เข้าถึงโดยไม่ให้สมมุติฐานที่สะสมมาของเซสชันหลักมาอคติมัน

### Subagent ทำงานข้างในกลไกควบคุมเดียวกัน ไม่ใช่รอบๆ มัน

Subagent ไม่ใช่วิธีหนีจาก Plan Mode ในบทเรียนที่ 4 หรือขอบเขต permission ที่จะพูดถึงในบทเรียนถัดไป -- มันยังคงเป็น agentic loop ประเภทเดียวกัน ยังอยู่ภายใต้ control mechanism ประเภทเดียวกัน (ส่วนที่สี่ที่จำเป็นจากบทเรียนที่ 1) แค่รันเป็น instance แยกต่างหาก การ delegate งานให้ subagent เปลี่ยน *ใคร* เป็นคนคิด และ *context อะไร* ที่พวกมันเริ่มด้วย มันไม่เปลี่ยน *สิ่งที่พวกมันทำได้โดยไม่มีใครดูแล*

### ลงมือทำ: ตัดสินใจ ไม่ใช่ใช้ค่าเริ่มต้น

นึกถึงงานหนึ่งจากโปรเจกต์ของคุณเองที่ตอนนี้ใช้หลายรอบไปมาในเซสชันเดียว -- อะไรที่เป็นการสำรวจ ที่คุณค่าส่วนใหญ่อยู่ที่สรุปสุดท้ายมากกว่ากระบวนการ จดไว้: งานนี้จะได้ประโยชน์จริงไหมจากการรันเป็น subagent (กันการสำรวจออกจากสายหลัก) และถ้าใช่ ควรสืบทอด context เต็มหรือเริ่มใหม่ แล้วเขียนหนึ่งประโยคสำหรับงานอื่นที่ง่ายกว่า ที่ subagent จะเป็นแค่ภาระเกินจำเป็น -- คุณค่าของแบบฝึกหัดนี้อยู่ที่การสังเกตทั้งสองทิศทาง ไม่ใช่แค่เอื้อมไปหา subagent โดยค่าเริ่มต้น

## สรุป

Subagent รัน instance เพิ่มเติม แยกต่างหากของ agentic loop เดียวกันจากบทเรียนที่ 2 -- มีประโยชน์สำหรับกันงานสำรวจออกจาก context ของเซสชันหลัก หรือจัดการงานที่ต้องการ instruction เฉพาะทางที่แคบกว่า subagent สืบทอด context ของเซสชันหลักหรือเริ่มใหม่ เป็นการตัดสินใจด้านการออกแบบจริง ไม่ใช่ค่าเริ่มต้นที่มองข้ามได้ และ subagent ไม่ได้ข้าม control mechanism -- มันยังถูกผูกด้วยกฎประเภทเดียวกันที่สองบทเรียนถัดไปจะครอบคลุม`,
      },
      {
        slug: "hooks",
        titleEn: "Hooks — Intercepting and Controlling Agent Behavior",
        titleTh: "Hooks — การดักจับและควบคุมพฤติกรรมของ Agent",
        order: 6,
        contentEn: `![Hooks diagram](/images/courses/claude-code-agent-harness/hooks.png)

Lesson 2's agentic loop is: decide, execute, observe, repeat. Hooks are a control mechanism (lesson 1's fourth part) that let you attach your own shell commands to specific points in that cycle -- most usefully, around the moment a tool is about to execute -- so your own logic, not just the model's judgment, gets a say in what actually happens.

### What a hook actually is

A hook is a shell command you configure to run automatically when a specific event occurs -- before a tool runs, after a tool runs, when you submit a prompt, and similar points in the cycle. Because it's a real shell command, it can do anything a shell command can: check a condition, log something, or -- critically -- block the action it's attached to from happening at all.

### The distinction that matters: hooks vs. prompting

You could *ask* the model, in a \`CLAUDE.md\` (lesson 3) or directly in conversation, to avoid a certain action -- "please don't run destructive commands without confirming first." That's a request the model usually follows, but it's still the model's judgment call, made fresh each time, and it can be forgotten, deprioritized, or reasoned past under unusual circumstances. A hook that blocks a command matching a dangerous pattern enforces that same boundary mechanically, every single time, regardless of what the model currently believes is a good idea. This is the same structural difference you saw with Plan Mode in lesson 4: a rule enforced by the harness is more reliable than the same rule merely requested of the model.

### Treat feedback from a hook as if it came from a person

Because a hook can intervene in the middle of a loop -- blocking an action, returning an explicit message about why -- a well-behaved harness treats that message the way it would treat a human pushing back, not as a neutral tool-result to route around. If a hook blocks something, the right response is to reconsider the approach in light of *why* it was blocked, not to search for a workaround that technically avoids triggering the same hook again.

### Where this connects to the rest of the course

Hooks are one of (at least) three distinct ways this course covers controlling what an agent does: Plan Mode (lesson 4) delays execution until a plan is approved; permissions (next lesson) govern which categories of action need approval at all; hooks let you attach entirely custom logic to any point in the cycle, for cases the built-in mechanisms don't cover. They're not competing approaches -- a real project typically uses some combination of all three, each suited to a different kind of concern.

### Hands-on: identify a rule worth enforcing mechanically

Think of one rule your team already follows informally around your codebase -- "never force-push to the shared branch," "always run the linter before committing," "don't touch this specific config file without a second person's sign-off." Write down: is this currently enforced only by people remembering to follow it, or is there already tooling (a hook, a CI check, a branch protection rule) backing it up? If it's only informal, write one sentence on what a hook checking for this specific condition would actually need to detect and block.

## Conclusion

Hooks attach your own shell commands to specific points in the agentic loop, able to block an action outright rather than merely requesting the model avoid it -- the same structural upgrade from "asked nicely" to "mechanically enforced" that you saw with Plan Mode. A hook's feedback should be treated as a real signal to reconsider, not an obstacle to route around, and hooks work alongside Plan Mode and permissions as different tools for the same underlying concern: keeping a human-defined boundary reliable regardless of the model's in-the-moment judgment.`,
        contentTh: `![Hooks diagram](/images/courses/claude-code-agent-harness/hooks.png)

Agentic loop จากบทเรียนที่ 2 คือ: ตัดสินใจ, ลงมือทำ, สังเกต, ทำซ้ำ Hook คือ control mechanism (ส่วนที่สี่จากบทเรียนที่ 1) ที่ให้คุณผูกคำสั่ง shell ของตัวเองเข้ากับจุดเจาะจงในวงจรนั้น -- มีประโยชน์ที่สุดคือรอบๆ ช่วงเวลาที่ tool กำลังจะลงมือทำ -- เพื่อให้ logic ของคุณเอง ไม่ใช่แค่วิจารณญาณของโมเดล มีสิทธิ์พูดว่าอะไรจะเกิดขึ้นจริง

### Hook คืออะไรจริงๆ

Hook คือคำสั่ง shell ที่คุณตั้งค่าให้รันอัตโนมัติเมื่อ event เจาะจงเกิดขึ้น -- ก่อน tool รัน, หลัง tool รัน, ตอนส่ง prompt, และจุดคล้ายๆ กันในวงจร เพราะมันคือคำสั่ง shell จริง มันทำอะไรก็ได้ที่คำสั่ง shell ทำได้: เช็คเงื่อนไข, log อะไรบางอย่าง, หรือ -- สำคัญที่สุด -- บล็อก action ที่มันผูกอยู่ไม่ให้เกิดขึ้นเลย

### ความต่างที่สำคัญ: hook เทียบกับการเขียน prompt

คุณ *ขอ* โมเดลได้ ใน \`CLAUDE.md\` (บทเรียนที่ 3) หรือในบทสนทนาตรงๆ ให้หลีกเลี่ยง action บางอย่าง -- "กรุณาอย่ารันคำสั่งที่ทำลายล้างโดยไม่ยืนยันก่อน" นั่นคือคำขอที่โมเดลมักจะทำตาม แต่มันยังเป็นการตัดสินใจของโมเดลที่ทำใหม่ทุกครั้ง และมันลืมได้, ให้ความสำคัญน้อยลงได้, หรือหาเหตุผลข้ามไปได้ในสถานการณ์แปลกๆ Hook ที่บล็อกคำสั่งที่ตรงกับรูปแบบอันตราย บังคับใช้ขอบเขตเดียวกันนั้นเชิงกลไก ทุกครั้งไม่มีข้อยกเว้น ไม่ว่าโมเดลจะเชื่อว่าอะไรเป็นความคิดที่ดีในตอนนั้น นี่คือความต่างเชิงโครงสร้างเดียวกับที่เห็นใน Plan Mode บทเรียนที่ 4: กฎที่ harness บังคับใช้ เชื่อถือได้มากกว่ากฎเดียวกันที่แค่ขอให้โมเดลทำตาม

### ปฏิบัติต่อ feedback จาก hook เหมือนมันมาจากคน

เพราะ hook แทรกแซงกลางวงจรได้ -- บล็อก action, คืนข้อความชัดเจนว่าทำไม -- harness ที่ทำงานดีควรปฏิบัติต่อข้อความนั้นแบบเดียวกับที่จะปฏิบัติต่อมนุษย์ที่คัดค้าน ไม่ใช่แค่ tool-result เฉยๆ ที่หาทางอ้อมได้ ถ้า hook บล็อกอะไร การตอบสนองที่ถูกต้องคือทบทวนแนวทางใหม่โดยพิจารณา *ทำไม* มันถูกบล็อก ไม่ใช่หาทางเลี่ยงที่ทางเทคนิคไม่ trigger hook เดิมอีกครั้ง

### จุดที่เชื่อมกับส่วนที่เหลือของคอร์ส

Hook เป็นหนึ่งใน (อย่างน้อย) สามวิธีที่ต่างกันที่คอร์สนี้ครอบคลุมเรื่องการควบคุมสิ่งที่ agent ทำ: Plan Mode (บทเรียนที่ 4) ชะลอการลงมือทำจนกว่าแผนจะถูกอนุมัติ; permission (บทเรียนถัดไป) กำหนดว่า action ประเภทไหนต้องการการอนุมัติเลย; hook ให้คุณผูก logic แบบ custom เต็มรูปแบบเข้ากับจุดไหนก็ได้ในวงจร สำหรับกรณีที่กลไกในตัวไม่ครอบคลุม พวกมันไม่ใช่แนวทางที่แข่งกัน -- โปรเจกต์จริงมักใช้ทั้งสามแบบผสมกัน แต่ละแบบเหมาะกับความกังวลคนละแบบ

### ลงมือทำ: ระบุกฎที่ควรบังคับใช้เชิงกลไก

นึกถึงกฎหนึ่งที่ทีมคุณทำตามอยู่แล้วแบบไม่เป็นทางการรอบๆ codebase ของคุณ -- "ห้าม force-push ไปที่ branch ที่ใช้ร่วมกัน", "รัน linter ก่อน commit เสมอ", "อย่าแตะไฟล์ config เจาะจงนี้โดยไม่มีคนที่สองเซ็นอนุมัติ" จดไว้: ตอนนี้มันถูกบังคับใช้แค่โดยคนจำได้ว่าต้องทำตาม หรือมี tooling อยู่แล้ว (hook, CI check, กฎป้องกัน branch) รองรับอยู่ ถ้ายังไม่เป็นทางการ เขียนหนึ่งประโยคว่า hook ที่เช็คเงื่อนไขเจาะจงนี้ต้องตรวจจับและบล็อกอะไรจริงๆ

## สรุป

Hook ผูกคำสั่ง shell ของคุณเองเข้ากับจุดเจาะจงใน agentic loop บล็อก action ได้เลย แทนที่จะแค่ขอให้โมเดลหลีกเลี่ยง -- การยกระดับเชิงโครงสร้างเดียวกันจาก "ขอดีๆ" เป็น "บังคับใช้เชิงกลไก" ที่เห็นใน Plan Mode feedback จาก hook ควรถูกปฏิบัติเป็นสัญญาณจริงให้ทบทวนใหม่ ไม่ใช่อุปสรรคที่หาทางเลี่ยง และ hook ทำงานร่วมกับ Plan Mode กับ permission เป็นเครื่องมือต่างกันสำหรับความกังวลพื้นฐานเดียวกัน: รักษาขอบเขตที่มนุษย์กำหนดให้เชื่อถือได้ ไม่ว่าวิจารณญาณของโมเดลตอนนั้นจะเป็นอย่างไร`,
      },
      {
        slug: "permissions",
        titleEn: "Permissions — What the Agent Can and Can't Do Without Asking",
        titleTh: "Permissions — สิ่งที่ Agent ทำได้และทำไม่ได้โดยไม่ต้องถาม",
        order: 7,
        contentEn: `![Permissions diagram](/images/courses/claude-code-agent-harness/permissions.png)

Lesson 6 covered hooks as a way to attach custom, mechanical rules to the loop. Permissions are the harness's built-in version of the same underlying concern -- which categories of action require your explicit approval before they run -- without you having to write a hook for every single case yourself.

### The baseline split

Some tool calls are safe to let happen automatically -- reading a file, running a search -- because they're local and reversible. Others are either hard to reverse, affect things beyond the local project, or could otherwise be risky, and those are the ones a well-designed harness holds back for explicit approval by default: things like overwriting uncommitted work, or publishing something somewhere other people will see it. The underlying principle is the same one you'd apply to a human teammate handling something consequential: the cost of pausing to confirm is low, while the cost of an unwanted irreversible action can be very high.

### Permissions are configurable, and that's the point

This split isn't fixed -- you can configure which categories of action require approval, loosening it for a trusted, low-stakes environment, or tightening it further for something sensitive. That configurability is exactly why lesson 1 called this a "control mechanism" rather than just a hardcoded restriction: it's a policy you set, not a wall you can't move.

### Scope matters as much as the yes/no

An approval you grant isn't a blanket, permanent grant for everything going forward -- it's scoped to what was actually asked, in the context it was asked in. Approving one specific action once doesn't mean every similar-looking action from then on is pre-approved; that distinction matters because it's what keeps a single moment of trust from quietly expanding into something broader than you intended.

### Why this is the same concern as lesson 6's hooks, approached differently

Permissions and hooks both answer "what does this agent get to do without asking a human first" -- permissions do it through a built-in, configurable category system; hooks do it through custom shell logic for cases the built-in categories don't cover. Lesson 4's Plan Mode is a third angle on the same underlying concern, at a different granularity: Plan Mode gates an entire sequence of changes behind one upfront plan approval, where permissions gate individual actions one at a time as they come up.

### Hands-on: audit your own project's risk categories

For your own project, list three kinds of action an agent working on it might attempt, ranked from least to most risky by your own judgment (for example: reading a config file; editing an existing test; deleting a branch). For the riskiest one, write one sentence on why it specifically deserves a pause for confirmation rather than running automatically -- naming the actual bad outcome you're protecting against, not just "it feels risky."

## Conclusion

Permissions govern which categories of action get to run automatically versus which require your explicit, scoped approval first -- a configurable policy, not a fixed wall, built around the same principle you'd apply to any consequential decision: low cost to pause and confirm, potentially high cost to get an irreversible action wrong. Together with Plan Mode (lesson 4) and hooks (lesson 6), this is the third tool this course covers for the same underlying job: keeping a human in the loop exactly where it matters.`,
        contentTh: `![Permissions diagram](/images/courses/claude-code-agent-harness/permissions.png)

บทเรียนที่ 6 พูดถึง hook เป็นวิธีผูกกฎที่กำหนดเองเชิงกลไกเข้ากับ loop Permission คือเวอร์ชันในตัวของ harness สำหรับความกังวลพื้นฐานเดียวกัน -- action ประเภทไหนที่ต้องการการอนุมัติชัดเจนจากคุณก่อนที่จะรัน -- โดยไม่ต้องเขียน hook เองสำหรับทุกกรณี

### การแบ่งพื้นฐาน

tool call บางอย่างปล่อยให้เกิดขึ้นอัตโนมัติได้อย่างปลอดภัย -- อ่านไฟล์, รันการค้นหา -- เพราะมันเป็นแบบ local และย้อนกลับได้ อย่างอื่นที่ย้อนกลับยาก, กระทบสิ่งที่กว้างกว่าโปรเจกต์ local, หรือเสี่ยงในแบบอื่น เป็นประเภทที่ harness ที่ออกแบบมาดีจะกั้นไว้รอการอนุมัติชัดเจนเป็นค่าเริ่มต้น: สิ่งแบบการเขียนทับงานที่ยังไม่ commit หรือการเผยแพร่อะไรบางอย่างที่คนอื่นจะเห็น หลักการพื้นฐานเดียวกับที่คุณจะใช้กับเพื่อนร่วมทีมที่เป็นมนุษย์ที่จัดการอะไรที่มีผลตามมา: ต้นทุนของการหยุดเพื่อยืนยันต่ำ ในขณะที่ต้นทุนของ action ที่ย้อนกลับไม่ได้ที่ไม่ต้องการ อาจสูงมาก

### Permission ปรับได้ และนั่นคือประเด็น

การแบ่งนี้ไม่ตายตัว -- คุณปรับได้ว่า action ประเภทไหนต้องการการอนุมัติ ผ่อนคลายลงสำหรับสภาพแวดล้อมที่เชื่อถือได้ ความเสี่ยงต่ำ หรือเข้มงวดขึ้นสำหรับอะไรที่อ่อนไหว การปรับได้นั้นแหละคือเหตุผลที่บทเรียนที่ 1 เรียกสิ่งนี้ว่า "control mechanism" ไม่ใช่แค่ข้อจำกัดที่ hardcode ไว้: มันคือ policy ที่คุณตั้ง ไม่ใช่กำแพงที่ขยับไม่ได้

### ขอบเขตสำคัญพอๆ กับใช่/ไม่ใช่

การอนุมัติที่คุณให้ไม่ใช่การให้แบบครอบคลุม ถาวรสำหรับทุกอย่างต่อจากนี้ -- มันจำกัดอยู่กับสิ่งที่ถูกถามจริงๆ ใน context ที่ถูกถาม การอนุมัติ action เจาะจงหนึ่งครั้งไม่ได้แปลว่า action ที่หน้าตาคล้ายกันทุกอันจากนั้นเป็นต้นมาถูกอนุมัติไว้ล่วงหน้า ความแตกต่างนี้สำคัญเพราะมันคือสิ่งที่กันไม่ให้ช่วงเวลาแห่งความไว้วางใจครั้งเดียวขยายตัวแบบเงียบๆ ไปเป็นอะไรที่กว้างกว่าที่ตั้งใจไว้

### ทำไมนี่คือความกังวลเดียวกับ hook ในบทเรียนที่ 6 แค่เข้าหาต่างมุม

Permission กับ hook ทั้งคู่ตอบคำถาม "agent นี้ทำอะไรได้โดยไม่ต้องถามมนุษย์ก่อน" -- permission ทำผ่านระบบหมวดหมู่ในตัวที่ปรับได้ hook ทำผ่าน logic shell แบบกำหนดเองสำหรับกรณีที่หมวดหมู่ในตัวไม่ครอบคลุม Plan Mode จากบทเรียนที่ 4 คือมุมที่สามของความกังวลพื้นฐานเดียวกัน ที่ความละเอียดต่างกัน: Plan Mode กั้นลำดับการเปลี่ยนแปลงทั้งหมดไว้หลังการอนุมัติแผนล่วงหน้าหนึ่งครั้ง ขณะที่ permission กั้น action แต่ละอันทีละอันตามที่เกิดขึ้น

### ลงมือทำ: ตรวจสอบหมวดหมู่ความเสี่ยงของโปรเจกต์คุณเอง

สำหรับโปรเจกต์ของคุณเอง ลิสต์ action สามประเภทที่ agent ที่ทำงานกับมันอาจลองทำ เรียงจากเสี่ยงน้อยไปมากตามวิจารณญาณของคุณเอง (ตัวอย่าง: อ่านไฟล์ config; แก้เทสที่มีอยู่; ลบ branch) สำหรับตัวที่เสี่ยงที่สุด เขียนหนึ่งประโยคว่าทำไมมันถึงควรได้รับการหยุดเพื่อยืนยันแทนที่จะรันอัตโนมัติ -- ระบุผลลัพธ์แย่ๆ จริงที่กำลังป้องกันอยู่ ไม่ใช่แค่ "รู้สึกเสี่ยง"

## สรุป

Permission กำหนดว่า action ประเภทไหนรันอัตโนมัติได้ เทียบกับประเภทไหนต้องการการอนุมัติที่ชัดเจน มีขอบเขต จากคุณก่อน -- เป็น policy ที่ปรับได้ ไม่ใช่กำแพงตายตัว สร้างรอบหลักการเดียวกับที่จะใช้กับการตัดสินใจที่มีผลตามมาใดๆ: ต้นทุนต่ำที่จะหยุดยืนยัน ต้นทุนอาจสูงถ้า action ที่ย้อนกลับไม่ได้ผิดพลาด ร่วมกับ Plan Mode (บทเรียนที่ 4) และ hook (บทเรียนที่ 6) นี่คือเครื่องมือตัวที่สามที่คอร์สนี้ครอบคลุมสำหรับงานพื้นฐานเดียวกัน: รักษามนุษย์ไว้ใน loop ตรงจุดที่สำคัญจริงๆ`,
      },
      {
        slug: "context-management",
        titleEn: "Context Management — Memory, Compaction, and the Scratchpad",
        titleTh: "Context Management — Memory, Compaction, และ Scratchpad",
        order: 8,
        contentEn: `![Context Management diagram](/images/courses/claude-code-agent-harness/context-management.png)

Lesson 1 named context management as the third required part of an agent harness: deciding what the model actually sees at each step, since every model has a finite window and a long task generates far more history than fits. This lesson looks at the different mechanisms Claude Code uses to manage that, beyond the one you already met in lesson 3.

### CLAUDE.md is the one piece you author; the rest are managed for you

Lesson 3 covered \`CLAUDE.md\` as durable context supplied once, by a human, ahead of time. Everything in this lesson is the opposite in one key way: it's generated or managed automatically by the harness during a session, not written by you in advance.

### Automatic summarization as a session grows long

As a conversation approaches the practical limit of what the model can hold in view, the harness can automatically compress earlier parts of it into a summary, keeping the gist of what's happened while freeing up room for new work to continue. The point of this mechanism is specifically continuity: a long task doesn't have to hit a hard wall just because the raw transcript got too long -- the work can keep going past what the unmanaged conversation history alone would allow.

### Memory that persists across sessions

Separately from summarizing the current conversation, a harness can maintain a persistent memory system -- notes that survive after a session ends and get pulled back in during a later one. This is a different kind of context management than \`CLAUDE.md\`: where \`CLAUDE.md\` is written once by a human and rarely changes, a persistent memory system is built up over time, often by the agent itself, recording things like user preferences or project-specific facts learned along the way.

### A scratchpad for work that doesn't belong in the permanent record

Not everything generated during a task deserves to persist -- an intermediate file, a one-off script used to test an idea, a throwaway output. A session-specific scratchpad directory gives the agent somewhere to put exactly that kind of temporary work, separate from both the project's own files and whatever durable memory or \`CLAUDE.md\` content exists. This is context management in the other direction from summarization: not "compress what's too long to keep in full," but "don't let temporary clutter pollute the permanent project or the durable memory in the first place."

### Why all of this is still "context management," not several different things

Summarization, persistent memory, and the scratchpad all answer variations of the same question from lesson 1: given a finite window, what should the model actually be looking at right now? Summarization manages the current conversation's size. Persistent memory manages what carries forward between sessions. The scratchpad manages what shouldn't be mistaken for something worth keeping at all. \`CLAUDE.md\` from lesson 3 is the one of these you control directly; these others are largely the harness's own job, running in the background of the same agentic loop from lesson 2.

### Hands-on: identify what belongs where

Think of a real, multi-day piece of work on your own project (not a single-session task). For each of the following, name one concrete example from that work: something that belongs in \`CLAUDE.md\` because it's durable and project-wide (lesson 3); something that's genuinely temporary and belongs in a scratchpad, not committed anywhere; something you'd want a persistent memory system to remember about *you specifically* (a preference, a correction you've had to give more than once) rather than about the project in general.

## Conclusion

Context management is more than one mechanism: \`CLAUDE.md\` (lesson 3) is durable, human-authored, project-wide context; automatic summarization keeps a long session going past what the raw transcript could hold; persistent memory carries facts and preferences forward across sessions; and a scratchpad keeps genuinely temporary work from cluttering either the project or anything meant to last. All of them answer the same question from lesson 1 -- what should the model actually see right now -- just at different timescales and for different kinds of information.`,
        contentTh: `![Context Management diagram](/images/courses/claude-code-agent-harness/context-management.png)

บทเรียนที่ 1 ระบุ context management เป็นส่วนที่สามที่จำเป็นของ agent harness: การตัดสินใจว่าโมเดลเห็นอะไรจริงๆ ในแต่ละขั้น เพราะทุกโมเดลมี window จำกัด และงานที่ยาวสร้างประวัติมากกว่าที่จะใส่พอดี บทเรียนนี้ดูกลไกต่างๆ ที่ Claude Code ใช้จัดการเรื่องนี้ นอกเหนือจากตัวที่เจอไปแล้วในบทเรียนที่ 3

### CLAUDE.md คือชิ้นเดียวที่คุณเขียนเอง ที่เหลือถูกจัดการให้

บทเรียนที่ 3 พูดถึง \`CLAUDE.md\` เป็น context ที่คงอยู่ ป้อนครั้งเดียวโดยมนุษย์ ล่วงหน้า ทุกอย่างในบทเรียนนี้ตรงข้ามกันในจุดสำคัญหนึ่ง: มันถูกสร้างหรือจัดการอัตโนมัติโดย harness ระหว่างเซสชัน ไม่ใช่คุณเขียนไว้ล่วงหน้า

### การสรุปอัตโนมัติเมื่อเซสชันยาวขึ้น

เมื่อบทสนทนาเข้าใกล้ขีดจำกัดจริงของสิ่งที่โมเดลเก็บไว้ในสายตาได้ harness บีบอัดส่วนก่อนหน้าของมันเป็นสรุปอัตโนมัติได้ เก็บใจความของสิ่งที่เกิดขึ้นไว้ พร้อมเปิดพื้นที่ให้งานใหม่ทำต่อได้ ประเด็นของกลไกนี้คือความต่อเนื่องโดยเฉพาะ: งานที่ยาวไม่ต้องชนกำแพงแข็งๆ แค่เพราะ transcript ดิบยาวเกินไป -- งานทำต่อไปได้เกินกว่าที่ประวัติบทสนทนาดิบอย่างเดียวจะรองรับ

### Memory ที่คงอยู่ข้ามเซสชัน

แยกจากการสรุปบทสนทนาปัจจุบัน harness ดูแลระบบ memory ที่คงอยู่ได้ -- โน้ตที่อยู่รอดหลังเซสชันจบ แล้วถูกดึงกลับมาในเซสชันถัดไป นี่คือ context management คนละแบบจาก \`CLAUDE.md\`: ที่ \`CLAUDE.md\` เขียนครั้งเดียวโดยมนุษย์และแทบไม่เปลี่ยน ระบบ memory ที่คงอยู่สร้างขึ้นเรื่อยๆ ตามเวลา มักโดย agent เอง บันทึกสิ่งแบบความชอบของผู้ใช้หรือข้อเท็จจริงเฉพาะโปรเจกต์ที่เรียนรู้มาระหว่างทาง

### Scratchpad สำหรับงานที่ไม่ควรอยู่ในบันทึกถาวร

ไม่ใช่ทุกอย่างที่สร้างระหว่างงานควรคงอยู่ -- ไฟล์ชั่วคราว, สคริปต์ใช้ครั้งเดียวสำหรับทดสอบไอเดีย, output ที่ใช้แล้วทิ้ง โฟลเดอร์ scratchpad เฉพาะเซสชัน ให้ที่ agent วางงานชั่วคราวแบบนั้นพอดี แยกจากทั้งไฟล์ของโปรเจกต์เองและเนื้อหา memory ที่คงอยู่หรือ \`CLAUDE.md\` ที่มีอยู่ นี่คือ context management ในทิศทางตรงข้ามจากการสรุป: ไม่ใช่ "บีบอัดสิ่งที่ยาวเกินจะเก็บเต็ม" แต่คือ "อย่าให้ความรกชั่วคราวปนเปื้อนโปรเจกต์ถาวรหรือ memory ที่คงอยู่ตั้งแต่แรก"

### ทำไมทั้งหมดนี้ยังเป็น "context management" ไม่ใช่หลายเรื่องต่างกัน

การสรุป, memory ที่คงอยู่, และ scratchpad ล้วนตอบคำถามเดียวกันจากบทเรียนที่ 1 ในหลายรูปแบบ: ด้วย window จำกัด โมเดลควรดูอะไรจริงๆ ตอนนี้ การสรุปจัดการขนาดของบทสนทนาปัจจุบัน memory ที่คงอยู่จัดการสิ่งที่ส่งต่อระหว่างเซสชัน scratchpad จัดการสิ่งที่ไม่ควรถูกเข้าใจผิดว่าควรเก็บไว้เลย \`CLAUDE.md\` จากบทเรียนที่ 3 คือตัวเดียวในนี้ที่คุณควบคุมโดยตรง ที่เหลือเป็นหน้าที่ของ harness เองเป็นส่วนใหญ่ ทำงานอยู่เบื้องหลังของ agentic loop เดียวกันจากบทเรียนที่ 2

### ลงมือทำ: ระบุว่าอะไรควรอยู่ตรงไหน

นึกถึงงานจริงหลายวันในโปรเจกต์ของคุณเอง (ไม่ใช่งานเซสชันเดียว) สำหรับแต่ละข้อต่อไปนี้ ระบุตัวอย่างเจาะจงหนึ่งอันจากงานนั้น: สิ่งที่ควรอยู่ใน \`CLAUDE.md\` เพราะคงอยู่และกว้างทั้งโปรเจกต์ (บทเรียนที่ 3); สิ่งที่ชั่วคราวจริงๆ และควรอยู่ใน scratchpad ไม่ควร commit ที่ไหนเลย; สิ่งที่อยากให้ระบบ memory ที่คงอยู่จำไว้เกี่ยวกับ *คุณโดยเฉพาะ* (ความชอบ, การแก้ไขที่ต้องบอกซ้ำมากกว่าหนึ่งครั้ง) มากกว่าเกี่ยวกับโปรเจกต์ทั่วไป

## สรุป

Context management มีมากกว่าหนึ่งกลไก: \`CLAUDE.md\` (บทเรียนที่ 3) คือ context ที่คงอยู่ เขียนโดยมนุษย์ กว้างทั้งโปรเจกต์ การสรุปอัตโนมัติทำให้เซสชันที่ยาวไปต่อได้เกินกว่าที่ transcript ดิบจะรองรับ memory ที่คงอยู่พาข้อเท็จจริงและความชอบส่งต่อข้ามเซสชัน และ scratchpad กันงานชั่วคราวจริงๆ ไม่ให้รกทั้งโปรเจกต์หรืออะไรก็ตามที่ตั้งใจให้อยู่ยาว ทั้งหมดนี้ตอบคำถามเดียวกันจากบทเรียนที่ 1 -- โมเดลควรเห็นอะไรจริงๆ ตอนนี้ -- แค่คนละช่วงเวลาและคนละประเภทข้อมูล`,
      },
      {
        slug: "a-real-agent-workflow",
        titleEn: "Putting It Together: A Real Agent Workflow",
        titleTh: "ประกอบร่างทั้งหมด: Agent Workflow จริง",
        order: 9,
        contentEn: `![A Real Agent Workflow diagram](/images/courses/claude-code-agent-harness/a-real-agent-workflow.png)

Lessons 2 through 8 covered the agent loop and six distinct mechanisms around it, one at a time. In a real task, you don't reach for them one at a time -- they combine, and this lesson walks through one realistic, multi-step task end to end, naming exactly which mechanism is doing what at each point.

### A worked scenario: "add input validation to this API endpoint, and make sure it's actually tested"

**Starting context**: \`CLAUDE.md\` (lesson 3) has already told the agent this project's layered request flow, its testing conventions, and the fact that validation errors should follow a specific existing error-response shape -- none of which had to be re-explained for this task specifically.

**Deciding how to approach it**: this is more than a one-line fix -- it touches the endpoint, a new validation schema, and at least one new test -- so Plan Mode (lesson 4) is worth the slower pace here. The agent researches the existing endpoint and a similar validated one elsewhere in the codebase (reading, not yet editing), and proposes a plan: add a schema, wire it into the endpoint following the existing error-response convention from \`CLAUDE.md\`, add tests covering both a valid and an invalid request.

**Keeping the main thread clean**: as part of that research, confirming "how does validation work elsewhere in this codebase" is exactly the kind of self-contained lookup worth delegating to a subagent (lesson 5) -- the main session gets back a short answer ("here's the existing pattern, in this file"), not a long transcript of files read along the way.

**The loop runs, bounded by permissions**: once the plan is approved, the agentic loop from lesson 2 actually runs -- edit the endpoint, add the schema, write the tests, run the tests, read the output, fix what failed. Reading files and running the test suite happen without interruption; anything permissions (lesson 7) categorizes as needing approval -- say, a destructive action unrelated to this task that the agent might otherwise stumble into -- still pauses for a yes.

**A mechanical guardrail alongside all of this**: a hook (lesson 6) checking that no commit happens directly to a protected branch runs regardless of any of the above -- it doesn't care that this was a well-planned, carefully-tested change; the rule is the rule every time.

**Context stays usable throughout**: if this task runs long enough, automatic summarization (lesson 8) keeps the session from hitting a hard wall partway through. If something about this task is worth remembering next time -- a preference you stated, a convention that wasn't already in \`CLAUDE.md\` -- persistent memory (lesson 8) is what carries it forward; anything genuinely temporary from along the way belongs in the scratchpad, not the project itself.

### Why naming each mechanism matters, not just getting the result

Notice that every mechanism above showed up because of a specific property of this task -- Plan Mode because the first step mattered and the scope was multi-part, the subagent because one piece of research didn't need to clutter the main thread, permissions and the hook because some boundaries don't bend regardless of how well-planned the rest of the task was. A different task would combine these differently, or skip some entirely. The skill this course is building isn't "know that these six things exist" -- it's recognizing, for a given task, which of them actually apply.

### Hands-on: narrate your own next real task

Before your next genuinely multi-step task in your own project, pause before starting and write down, in advance: which mechanisms from lessons 3 through 8 do you expect to matter here, and why -- not after the fact, rationalizing what happened, but as a prediction. Then do the task, and compare: did you reach for Plan Mode, a subagent, anything else, the way you predicted? Where the reality diverged from the prediction is exactly the kind of judgment this lesson is asking you to build.

## Conclusion

A real task combines these mechanisms rather than using them one at a time: \`CLAUDE.md\` supplies standing context before anything starts, Plan Mode gates a multi-part change behind an approved plan, a subagent keeps self-contained research out of the main thread, permissions and hooks enforce boundaries regardless of how well-planned the task is, and context management keeps the whole thing running without hitting a hard wall. The actual skill is recognizing which of these a given task calls for -- not applying all six by rote every time.`,
        contentTh: `![A Real Agent Workflow diagram](/images/courses/claude-code-agent-harness/a-real-agent-workflow.png)

บทเรียนที่ 2 ถึง 8 ครอบคลุม agent loop และกลไกหกอย่างที่แยกกันรอบๆ มัน ทีละอัน ในงานจริง คุณไม่ได้หยิบมาใช้ทีละอัน -- มันรวมกัน และบทเรียนนี้ไล่ดูงานจริงที่สมจริง มีหลายขั้นตอน ตั้งแต่ต้นจนจบ ระบุชัดเจนว่ากลไกไหนทำอะไรตรงจุดไหน

### สถานการณ์ตัวอย่าง: "เพิ่ม input validation ให้ API endpoint นี้ และให้แน่ใจว่ามีเทสรองรับจริง"

**Context เริ่มต้น**: \`CLAUDE.md\` (บทเรียนที่ 3) บอก agent ไปแล้วว่า request flow แบบ layer ของโปรเจกต์นี้เป็นอย่างไร, ข้อตกลงการเทส, และข้อเท็จจริงว่า validation error ควรตามรูปแบบ error-response ที่มีอยู่แล้วเจาะจง -- ไม่มีอันไหนต้องอธิบายใหม่สำหรับงานนี้โดยเฉพาะ

**การตัดสินใจเข้าหา**: นี่มากกว่าการแก้ไขบรรทัดเดียว -- มันแตะ endpoint, schema validation ใหม่, และอย่างน้อยเทสใหม่หนึ่งตัว -- ดังนั้น Plan Mode (บทเรียนที่ 4) คุ้มกับจังหวะที่ช้าลงตรงนี้ agent ค้นคว้า endpoint ที่มีอยู่และอีกตัวที่ validate คล้ายกันในที่อื่นของ codebase (อ่าน ยังไม่แก้ไข) แล้วเสนอแผน: เพิ่ม schema, เชื่อมเข้า endpoint ตามข้อตกลง error-response ที่มีอยู่จาก \`CLAUDE.md\`, เพิ่มเทสที่ครอบคลุมทั้ง request ที่ถูกต้องและไม่ถูกต้อง

**รักษาสายหลักให้สะอาด**: เป็นส่วนหนึ่งของการค้นคว้านั้น การยืนยันว่า "validation ทำงานอย่างไรที่อื่นใน codebase นี้" คือการค้นหาแบบจบในตัวเองที่ควร delegate ให้ subagent (บทเรียนที่ 5) พอดี -- เซสชันหลักได้คำตอบสั้นๆ กลับมา ("นี่คือรูปแบบที่มีอยู่ ในไฟล์นี้") ไม่ใช่ transcript ยาวของไฟล์ที่อ่านระหว่างทาง

**Loop ทำงาน ถูกจำกัดด้วย permission**: เมื่อแผนถูกอนุมัติ agentic loop จากบทเรียนที่ 2 ก็ทำงานจริง -- แก้ endpoint, เพิ่ม schema, เขียนเทส, รันเทส, อ่านผลลัพธ์, แก้สิ่งที่ล้มเหลว การอ่านไฟล์และรัน test suite เกิดขึ้นโดยไม่มีการขัดจังหวะ อะไรก็ตามที่ permission (บทเรียนที่ 7) จัดว่าต้องการการอนุมัติ -- เช่น action ที่ทำลายล้างไม่เกี่ยวกับงานนี้ที่ agent อาจเผลอเจอเข้า -- ยังคงหยุดรอคำตอบรับอยู่

**Guardrail เชิงกลไกคู่ขนานไปกับทั้งหมดนี้**: hook (บทเรียนที่ 6) ที่เช็คว่าไม่มี commit เกิดขึ้นตรงๆ ไปที่ branch ที่ป้องกันไว้ ทำงานไม่ว่าจะมีอะไรข้างบนหรือไม่ -- มันไม่สนว่านี่เป็นการเปลี่ยนแปลงที่วางแผนดีและเทสรอบคอบแค่ไหน กฎก็คือกฎทุกครั้ง

**Context ใช้งานได้ตลอด**: ถ้างานนี้ยาวพอ การสรุปอัตโนมัติ (บทเรียนที่ 8) กันไม่ให้เซสชันชนกำแพงแข็งกลางทาง ถ้ามีอะไรเกี่ยวกับงานนี้ที่ควรจำไว้ครั้งหน้า -- ความชอบที่คุณบอกไว้, ข้อตกลงที่ยังไม่มีใน \`CLAUDE.md\` -- memory ที่คงอยู่ (บทเรียนที่ 8) คือสิ่งที่พามันไปต่อ อะไรก็ตามที่ชั่วคราวจริงๆ ระหว่างทางควรอยู่ใน scratchpad ไม่ใช่ตัวโปรเจกต์เอง

### ทำไมการระบุชื่อแต่ละกลไกถึงสำคัญ ไม่ใช่แค่ได้ผลลัพธ์

สังเกตว่าทุกกลไกข้างบนปรากฏขึ้นเพราะคุณสมบัติเจาะจงของงานนี้ -- Plan Mode เพราะขั้นแรกสำคัญและขอบเขตมีหลายส่วน, subagent เพราะงานค้นคว้าชิ้นหนึ่งไม่จำเป็นต้องรกสายหลัก, permission กับ hook เพราะขอบเขตบางอย่างไม่งอตามไม่ว่าส่วนที่เหลือของงานจะวางแผนดีแค่ไหน งานอื่นจะรวมสิ่งเหล่านี้ต่างออกไป หรือข้ามบางอันไปเลย ทักษะที่คอร์สนี้กำลังสร้างไม่ใช่ "รู้ว่าหกอย่างนี้มีอยู่" -- แต่คือการรู้จักว่า สำหรับงานหนึ่งๆ อันไหนที่ใช้ได้จริง

### ลงมือทำ: บรรยายงานจริงถัดไปของคุณเอง

ก่อนงานหลายขั้นตอนจริงครั้งถัดไปในโปรเจกต์ของคุณเอง หยุดก่อนเริ่มแล้วจดไว้ล่วงหน้า: กลไกไหนจากบทเรียนที่ 3 ถึง 8 ที่คาดว่าจะสำคัญตรงนี้ และทำไม -- ไม่ใช่ย้อนหลังมาอธิบายสิ่งที่เกิดขึ้น แต่เป็นการทำนายล่วงหน้า แล้วทำงานนั้น แล้วเทียบ: ใช้ Plan Mode, subagent, อย่างอื่นไหม ตรงกับที่ทายไว้ไหม จุดที่ความจริงต่างจากการทำนาย คือวิจารณญาณแบบที่บทเรียนนี้กำลังขอให้คุณสร้างพอดี

## สรุป

งานจริงรวมกลไกเหล่านี้เข้าด้วยกัน แทนที่จะใช้ทีละอัน: \`CLAUDE.md\` ให้ context ที่ยืนพื้นก่อนอะไรจะเริ่ม, Plan Mode กั้นการเปลี่ยนแปลงหลายส่วนไว้หลังแผนที่อนุมัติแล้ว, subagent กันงานค้นคว้าที่จบในตัวเองออกจากสายหลัก, permission กับ hook บังคับใช้ขอบเขตไม่ว่างานจะวางแผนดีแค่ไหน และ context management ทำให้ทั้งหมดทำงานต่อได้โดยไม่ชนกำแพงแข็ง ทักษะจริงคือการรู้จักว่างานหนึ่งๆ ต้องการอันไหนในนี้ -- ไม่ใช่การใช้ครบทั้งหกอย่างตามพิธีกรรมทุกครั้ง`,
      },
      {
        slug: "designing-a-harness-that-keeps-up-with-the-model",
        titleEn: "Designing a Harness That Keeps Up With the Model",
        titleTh: "ออกแบบ Harness ให้ตามทันโมเดลที่พัฒนาไป",
        order: 10,
        contentEn: `![Designing a Harness That Keeps Up With the Model diagram](/images/courses/claude-code-agent-harness/designing-a-harness-that-keeps-up-with-the-model.png)

Every mechanism this course has covered so far -- \`CLAUDE.md\`, Plan Mode, subagents, hooks, permissions, context management -- is scaffolding built around a model at a specific point in its capability. This lesson, grounded directly in Anthropic's own published guidance on harness design, covers a fact that's easy to miss while you're focused on getting any one of those mechanisms working: the assumptions baked into that scaffolding go stale as the model improves, and a harness that never revisits them accumulates dead weight.

### The definition, restated by Anthropic itself

Anthropic's own framing lines up almost exactly with lesson 1's four-part definition: a harness is "the software scaffolding around a model: the loop, tools, context management, and guardrails that turn raw intelligence into a working agent." The useful addition here isn't a new definition -- it's the observation that follows from it: a harness encodes assumptions about what the model *can't* yet do well, and those assumptions have a shelf life.

### The question worth asking repeatedly: what can I stop doing?

This is the single most important habit from Anthropic's own guidance, stated plainly: as the model improves, periodically ask what compensating scaffolding has become unnecessary. A concrete, documented example of this going wrong in the other direction: a context-reset mechanism built to compensate for Sonnet 4.5's limitations became "dead weight" once Opus 4.5's improved capabilities made the original problem it compensated for mostly go away. The scaffolding didn't become actively harmful -- it just kept consuming complexity and attention for a problem that no longer existed at the same scale.

### Pattern 1: Lean on what the model already knows

Reaching for a highly specialized, narrow tool feels like the safe choice, but it isn't always the right one. Anthropic's own documented result: Claude 3.5 Sonnet reached 49% on the SWE-bench coding benchmark using nothing more specialized than bash and a text editor -- general-purpose tools the model already has deep, broad familiarity with, "composed into patterns that solve different problems," rather than a purpose-built tool for each specific task. The lesson isn't "never build specialized tools" -- lesson 6's hooks and lesson 7's permissions are exactly that, and for good reason, where a boundary genuinely needs mechanical enforcement. The lesson is that defaulting to a narrow, bespoke tool out of caution, when a general one the model already understands well would do, is itself a form of unnecessary scaffolding.

### Pattern 2: Simplify the harness, in three specific ways

Anthropic's guidance names three concrete forms this simplification takes, and two of them connect directly to mechanisms already covered in this course:

- **Self-orchestration** -- letting the model express tool calls and the logic connecting them as code it writes, rather than routing every single intermediate tool result back through the model's own context window to be read and reasoned about one step at a time. This avoids paying the token cost of processing that doesn't actually need the model's attention.
- **Self-managed context** -- this is lesson 5's subagents and lesson 8's context management, from a different angle: giving the model tools like progressive-disclosure skills, context editing, and subagents for a fresh window, and letting *it* decide when to reach for them, rather than the harness rigidly pre-loading every piece of task-specific instruction whether or not this particular task needs it.
- **Self-persisting memory** -- this is lesson 8's persistent memory and compaction again, framed as a design choice rather than just a mechanism: give the model the tools (a memory folder, compaction) and let it decide what's worth carrying forward, instead of the harness hardcoding what should persist. The documented result is substantial: on the BrowseComp benchmark, Opus 4.6 reached 84% accuracy using compaction, compared to Sonnet 4.5's flat 43% -- a jump attributable in real part to the model, not just the harness, being trusted to manage more of this itself.

### Pattern 3: Set boundaries strategically, not everywhere equally

Simplifying the harness doesn't mean removing all structure -- it means being deliberate about where structure actually earns its cost:

- **Design for caching.** Ordering a prompt "static first, dynamic last" -- the parts that don't change across calls before the parts that do -- is a direct, practical way to get real efficiency out of prompt caching, not an incidental detail.
- **Keep dedicated tools for the boundaries that need them.** UX, observability, and security boundaries are the explicit exception to "prefer general tools" from Pattern 1 -- these are exactly the kind of control mechanism lessons 6 and 7 covered, and they don't go away just because the model got better at reasoning generally. A model being smarter doesn't make an unreviewed destructive action safer to leave unguarded.
- **Re-evaluate continuously, not once.** The context-reset example from earlier in this lesson is the cautionary case for exactly this: a boundary or piece of scaffolding that was the right call for one model version needs to be revisited, not assumed permanent, as the model underneath it changes.

### Hands-on: audit your own setup against "what can I stop doing?"

Go back to the \`CLAUDE.md\`, Plan Mode defaults, hooks, and permission categories you built in lesson 10's setup pass. For each one, ask directly: was this added to compensate for a specific limitation, and is that limitation still real? Name one piece of your own setup that might already be the "dead weight" this lesson describes -- a rule, a reminder in \`CLAUDE.md\`, a cautious default -- that was worth it when you added it, but that you haven't actually re-checked since. You don't have to remove it today; the exercise is building the habit of asking, on a schedule, rather than only when something breaks.

## Conclusion

A harness encodes assumptions about a model's current limitations, and those assumptions age -- the discipline worth building, straight from Anthropic's own guidance, is periodically asking what scaffolding has become unnecessary rather than only ever adding more. Lean on general tools the model already knows well before reaching for a bespoke one; simplify through self-orchestration, self-managed context, and self-persisting memory where the model can be trusted to handle more itself; and keep deliberate, dedicated boundaries specifically where UX, observability, or security genuinely require them -- re-evaluated on a schedule, not assumed permanent just because they were right once.`,
        contentTh: `![Designing a Harness That Keeps Up With the Model diagram](/images/courses/claude-code-agent-harness/designing-a-harness-that-keeps-up-with-the-model.png)

ทุกกลไกที่คอร์สนี้ครอบคลุมมาจนถึงตอนนี้ -- \`CLAUDE.md\`, Plan Mode, subagent, hook, permission, context management -- คือ scaffolding ที่สร้างขึ้นรอบโมเดล ณ จุดหนึ่งของความสามารถมัน บทเรียนนี้ อิงตรงจากคำแนะนำการออกแบบ harness ที่ Anthropic เองเผยแพร่ ครอบคลุมข้อเท็จจริงที่พลาดง่ายตอนโฟกัสอยู่กับการทำให้กลไกใดกลไกหนึ่งทำงาน: สมมุติฐานที่ฝังอยู่ใน scaffolding นั้นล้าสมัยไปตามที่โมเดลพัฒนาขึ้น และ harness ที่ไม่เคยกลับมาทบทวนมันเลย จะสะสม "น้ำหนักตาย" (dead weight) ไปเรื่อยๆ

### นิยาม ที่ Anthropic เองพูดซ้ำ

กรอบที่ Anthropic เองใช้ ตรงกับนิยามสี่ส่วนจากบทเรียนที่ 1 เกือบเป๊ะ: harness คือ "software scaffolding รอบโมเดล: loop, tools, context management, และ guardrails ที่เปลี่ยนความฉลาดดิบให้เป็น agent ที่ทำงานได้จริง" สิ่งที่มีประโยชน์ตรงนี้ไม่ใช่นิยามใหม่ -- แต่คือข้อสังเกตที่ตามมาจากมัน: harness ฝังสมมุติฐานเกี่ยวกับสิ่งที่โมเดล *ยังทำได้ไม่ดี* และสมมุติฐานนั้นมีอายุการใช้งาน

### คำถามที่ควรถามซ้ำๆ: อะไรที่เลิกทำได้แล้วบ้าง

นี่คือนิสัยที่สำคัญที่สุดอันหนึ่งจากคำแนะนำของ Anthropic เอง พูดไว้ตรงๆ: เมื่อโมเดลพัฒนาขึ้น ให้ถามเป็นระยะว่า scaffolding ที่ชดเชยอะไรบางอย่าง กลายเป็นสิ่งที่ไม่จำเป็นแล้วหรือยัง ตัวอย่างจริงที่บันทึกไว้ของเรื่องนี้ที่ผิดพลาดไปอีกทาง: กลไก context-reset ที่สร้างมาชดเชยข้อจำกัดของ Sonnet 4.5 กลายเป็น "น้ำหนักตาย" เมื่อความสามารถที่ดีขึ้นของ Opus 4.5 ทำให้ปัญหาเดิมที่มันชดเชยหายไปเกือบหมดแล้ว scaffolding นั้นไม่ได้กลายเป็นอันตรายเชิงรุก -- มันแค่ยังคงกินความซับซ้อนและความสนใจต่อไปสำหรับปัญหาที่ไม่มีอยู่ในระดับเดิมอีกแล้ว

### Pattern 1: พึ่งพาสิ่งที่โมเดลรู้อยู่แล้ว

การเอื้อมไปหา tool เฉพาะทางที่แคบมากรู้สึกเหมือนเป็นทางเลือกที่ปลอดภัย แต่ไม่ใช่ทางเลือกที่ถูกต้องเสมอไป ผลลัพธ์จริงที่ Anthropic บันทึกไว้: Claude 3.5 Sonnet ได้ 49% บน SWE-bench coding benchmark โดยใช้แค่ bash กับ text editor -- tool ทั่วไปที่โมเดลคุ้นเคยลึกและกว้างอยู่แล้ว "ประกอบเข้าด้วยกันเป็นรูปแบบที่แก้ปัญหาต่างกันได้" แทนที่จะเป็น tool ที่สร้างเฉพาะสำหรับแต่ละงาน บทเรียนนี้ไม่ได้บอกว่า "ห้ามสร้าง tool เฉพาะทางเลย" -- hook จากบทเรียนที่ 6 และ permission จากบทเรียนที่ 7 คือตัวอย่างแบบนั้นพอดี และด้วยเหตุผลที่ดี ตรงจุดที่ขอบเขตต้องการการบังคับใช้เชิงกลไกจริงๆ บทเรียนคือ การเลือก tool แคบๆ ที่สร้างเฉพาะ จากความระมัดระวังเป็นค่าเริ่มต้น ทั้งที่ tool ทั่วไปที่โมเดลเข้าใจดีอยู่แล้วก็ทำได้ ตัวมันเองก็เป็น scaffolding ที่ไม่จำเป็นรูปแบบหนึ่งเหมือนกัน

### Pattern 2: ลดความซับซ้อนของ harness ในสามวิธีที่เจาะจง

คำแนะนำของ Anthropic ระบุสามรูปแบบที่เจาะจงของการลดความซับซ้อนนี้ และสองในนั้นเชื่อมตรงกับกลไกที่คอร์สนี้ครอบคลุมไปแล้ว:

- **Self-orchestration** -- ให้โมเดลแสดง tool call และ logic ที่เชื่อมมันเข้าด้วยกันเป็นโค้ดที่มันเขียนเอง แทนที่จะส่งผลลัพธ์ tool ระหว่างทางทุกอันกลับผ่าน context window ของโมเดลเองเพื่อให้อ่านและคิดทีละขั้น วิธีนี้หลีกเลี่ยงต้นทุน token ของการประมวลผลที่จริงๆ ไม่ต้องการความสนใจของโมเดลเลย
- **Self-managed context** -- นี่คือ subagent จากบทเรียนที่ 5 และ context management จากบทเรียนที่ 8 จากมุมที่ต่างออกไป: ให้ tool แก่โมเดลอย่าง skill แบบ progressive-disclosure, context editing, และ subagent สำหรับ window ใหม่ แล้วให้ *มันเอง* ตัดสินใจว่าจะเอื้อมไปหาเมื่อไหร่ แทนที่ harness จะ pre-load ทุกชิ้นของ instruction เฉพาะงานไว้ล่วงหน้าตายตัว ไม่ว่างานนี้จะต้องการมันจริงหรือไม่
- **Self-persisting memory** -- นี่คือ memory ที่คงอยู่และ compaction จากบทเรียนที่ 8 อีกครั้ง แต่วางกรอบเป็นการตัดสินใจเชิงออกแบบ ไม่ใช่แค่กลไก: ให้ tool แก่โมเดล (memory folder, compaction) แล้วให้มันตัดสินใจว่าอะไรคุ้มที่จะพกต่อไป แทนที่ harness จะ hardcode ว่าอะไรควรคงอยู่ ผลลัพธ์ที่บันทึกไว้มีนัยสำคัญ: บน BrowseComp benchmark Opus 4.6 ได้ความแม่นยำ 84% ด้วย compaction เทียบกับ Sonnet 4.5 ที่ 43% คงที่ -- การกระโดดนี้ส่วนหนึ่งจริงๆ มาจากการที่โมเดล ไม่ใช่แค่ harness ได้รับความไว้วางใจให้จัดการส่วนนี้มากขึ้นด้วยตัวเอง

### Pattern 3: วางขอบเขตอย่างมีกลยุทธ์ ไม่ใช่เท่ากันทุกที่

การลดความซับซ้อนของ harness ไม่ได้แปลว่าตัดโครงสร้างทั้งหมดออก -- มันแปลว่าตั้งใจเลือกจุดที่โครงสร้างคุ้มต้นทุนจริงๆ:

- **ออกแบบเพื่อ caching** การเรียง prompt แบบ "static ก่อน dynamic หลัง" -- ส่วนที่ไม่เปลี่ยนในแต่ละการเรียกไว้ก่อนส่วนที่เปลี่ยน -- เป็นวิธีตรงและใช้ได้จริงที่ทำให้ prompt caching มีประสิทธิภาพจริง ไม่ใช่รายละเอียดเล็กน้อยที่บังเอิญเกิดขึ้น
- **คง dedicated tool ไว้สำหรับขอบเขตที่ต้องการมันจริง** UX, observability, และ security boundary คือข้อยกเว้นชัดเจนของ "เลือก tool ทั่วไป" จาก Pattern 1 -- นี่คือ control mechanism แบบเดียวกับที่บทเรียนที่ 6 และ 7 ครอบคลุมพอดี และมันไม่หายไปแค่เพราะโมเดลคิดได้ดีขึ้นทั่วไป โมเดลที่ฉลาดขึ้นไม่ได้ทำให้ action ที่ทำลายล้างและไม่มีใครรีวิว ปลอดภัยพอที่จะปล่อยไว้โดยไม่มีการป้องกัน
- **ทบทวนต่อเนื่อง ไม่ใช่ครั้งเดียว** ตัวอย่าง context-reset ก่อนหน้านี้ในบทเรียนคือกรณีเตือนใจสำหรับเรื่องนี้พอดี: ขอบเขตหรือ scaffoldingชิ้นหนึ่งที่เคยเป็นการตัดสินใจที่ถูกต้องสำหรับโมเดลเวอร์ชันหนึ่ง ต้องถูกทบทวนใหม่ ไม่ใช่สมมุติว่าถาวร เมื่อโมเดลข้างใต้มันเปลี่ยนไป

### ลงมือทำ: ตรวจสอบการตั้งค่าของคุณเองด้วย "อะไรที่เลิกทำได้แล้วบ้าง"

กลับไปดู \`CLAUDE.md\`, ค่าเริ่มต้น Plan Mode, hook, และหมวดหมู่ permission ที่สร้างไว้ในการตั้งค่าจริงของบทเรียนที่ 10 สำหรับแต่ละอัน ถามตรงๆ: สิ่งนี้ถูกเพิ่มเข้ามาเพื่อชดเชยข้อจำกัดเจาะจงอันหนึ่งใช่ไหม และข้อจำกัดนั้นยังจริงอยู่ไหม ระบุชื่อหนึ่งชิ้นในการตั้งค่าของคุณเองที่อาจเป็น "น้ำหนักตาย" แบบที่บทเรียนนี้อธิบายไปแล้ว -- กฎหนึ่งข้อ, คำเตือนใน \`CLAUDE.md\`, ค่าเริ่มต้นที่ระมัดระวัง -- ที่คุ้มค่าตอนที่เพิ่มเข้ามา แต่ยังไม่เคยกลับไปเช็คซ้ำเลยตั้งแต่นั้น ไม่ต้องลบมันวันนี้ แบบฝึกหัดนี้คือการสร้างนิสัยที่จะถามคำถามนี้ ตามตารางเวลา ไม่ใช่แค่ตอนมีอะไรพังเท่านั้น

## สรุป

Harness ฝังสมมุติฐานเกี่ยวกับข้อจำกัดปัจจุบันของโมเดล และสมมุติฐานเหล่านั้นมีอายุ -- วินัยที่ควรสร้าง ตรงจากคำแนะนำของ Anthropic เอง คือการถามเป็นระยะว่า scaffolding ไหนกลายเป็นสิ่งที่ไม่จำเป็นแล้ว แทนที่จะเพิ่มมันเข้าไปเรื่อยๆ อย่างเดียว พึ่งพา tool ทั่วไปที่โมเดลรู้จักดีอยู่แล้วก่อนที่จะเอื้อมไปหา tool ที่สร้างเฉพาะ ลดความซับซ้อนผ่าน self-orchestration, self-managed context, และ self-persisting memory ตรงจุดที่ไว้ใจให้โมเดลจัดการเองได้มากขึ้น และคงขอบเขตที่ตั้งใจ เฉพาะเจาะจงไว้ตรงจุดที่ UX, observability, หรือ security ต้องการมันจริงๆ -- ทบทวนตามตารางเวลา ไม่ใช่สมมุติว่าถาวรเพียงเพราะมันเคยถูกต้องครั้งหนึ่ง`,
      },
      {
        slug: "setting-up-for-your-own-project",
        titleEn: "Hands-On: Setting Up Claude Code for Your Own Project",
        titleTh: "ลงมือทำ: ตั้งค่า Claude Code สำหรับโปรเจกต์ของคุณเอง",
        order: 11,
        contentEn: `![Setting Up for Your Own Project diagram](/images/courses/claude-code-agent-harness/setting-up-for-your-own-project.png)

Every lesson in this course has ended with an exercise about your own project. This closing lesson ties those answers together into one real setup pass -- the thing you'd actually do once, for real, before using Claude Code seriously on a codebase you care about.

### Step 1: write the real CLAUDE.md

Pull together your answers from lesson 3's exercise into an actual file, if you haven't already: real commands, real architectural conventions, real workflow rules, real gotchas -- specifically the things a new teammate would need explained on day one, and specifically not a restatement of what the code already says.

### Step 2: decide your default stance on Plan Mode

From lesson 4's exercise, you already have a sense of which of your own tasks are small-and-well-specified versus large-or-ambiguous. Decide, concretely: is there a category of task on this project (a particular kind of refactor, anything touching a particular sensitive area) where you want to default to Plan Mode rather than deciding fresh each time?

### Step 3: identify your real guardrail candidates

From lesson 6's and lesson 7's exercises, you named an informally-enforced rule worth a hook, and ranked some actions by risk. Pick the single highest-value one -- the rule most likely to actually get broken by accident, or the riskiest action most likely to come up -- and treat it as the first thing worth formalizing, whether as a hook or a permission-category change, rather than trying to lock down everything at once.

### Step 4: decide your subagent and memory defaults

From lesson 5's exercise: is there a recurring kind of exploratory question on this project ("how does X work here") that's worth reaching for a subagent on by default? From lesson 8's: is there a standing preference of yours the agent should carry across sessions, rather than you repeating it?

### Step 5: the real test

Pick one genuinely multi-step task on this project -- not a toy example, something you actually need done -- and run it the way lesson 9 modeled: notice, as you go, which mechanisms you actually reached for, and whether the \`CLAUDE.md\` you wrote in step 1 held up, or needed a correction the moment real work exposed a gap in it.

### What "done" looks like for this lesson

Not a perfect setup -- a real one, with real gaps you've noticed rather than guessed at. The honest outcome of this exercise is often "my \`CLAUDE.md\` was missing X, which I only noticed once the agent got something wrong because of it" -- that's success, not failure. A \`CLAUDE.md\` (and the rest of this setup) is meant to be revised as you find its gaps, not written once and left alone.

## Conclusion

Setting up Claude Code for a real project isn't a one-time checklist you finish and forget -- it's \`CLAUDE.md\` written from genuine gaps you've noticed, a deliberate (not default) stance on Plan Mode, one real guardrail formalized before trying to cover everything, and defaults for subagents and memory based on your project's actual recurring patterns, all revised the first time real work exposes something you got wrong. That revising-as-you-go is itself the last lesson this course has to teach: the mechanisms from lessons 2 through 8 are tools, and using them well is a skill you build by actually running them against work you care about, not by reading about them once.`,
        contentTh: `![Setting Up for Your Own Project diagram](/images/courses/claude-code-agent-harness/setting-up-for-your-own-project.png)

ทุกบทเรียนในคอร์สนี้จบด้วยแบบฝึกหัดเกี่ยวกับโปรเจกต์ของคุณเอง บทเรียนปิดท้ายนี้ร้อยคำตอบเหล่านั้นเข้าด้วยกันเป็นการตั้งค่าจริงครั้งเดียว -- สิ่งที่คุณจะทำจริงครั้งหนึ่ง ก่อนใช้ Claude Code อย่างจริงจังกับ codebase ที่คุณใส่ใจ

### ขั้นที่ 1: เขียน CLAUDE.md จริง

รวบรวมคำตอบจากแบบฝึกหัดบทเรียนที่ 3 เป็นไฟล์จริง ถ้ายังไม่ได้ทำ: คำสั่งจริง, ข้อตกลง architecture จริง, กฎ workflow จริง, จุดที่หลงทางบ่อยจริง -- โดยเฉพาะสิ่งที่เพื่อนร่วมทีมใหม่ต้องการคำอธิบายในวันแรก และโดยเฉพาะไม่ใช่การพูดซ้ำสิ่งที่โค้ดบอกอยู่แล้ว

### ขั้นที่ 2: ตัดสินใจจุดยืนเริ่มต้นเรื่อง Plan Mode

จากแบบฝึกหัดบทเรียนที่ 4 คุณมีความรู้สึกอยู่แล้วว่างานไหนของคุณเล็กและระบุชัดเจนแล้ว เทียบกับใหญ่หรือคลุมเครือ ตัดสินใจให้เป็นรูปธรรม: มีงานประเภทไหนในโปรเจกต์นี้ไหม (refactor แบบเจาะจง, อะไรก็ตามที่แตะพื้นที่อ่อนไหวเจาะจง) ที่อยากให้ใช้ Plan Mode เป็นค่าเริ่มต้นแทนที่จะตัดสินใจใหม่ทุกครั้ง

### ขั้นที่ 3: ระบุตัวเลือก guardrail จริงของคุณ

จากแบบฝึกหัดบทเรียนที่ 6 และ 7 คุณระบุกฎที่บังคับใช้แบบไม่เป็นทางการที่ควรมี hook และจัดอันดับ action บางอย่างตามความเสี่ยงไว้แล้ว เลือกอันที่มีคุณค่าสูงสุดอันเดียว -- กฎที่มีโอกาสถูกละเมิดโดยไม่ตั้งใจมากที่สุดจริงๆ หรือ action ที่เสี่ยงที่สุดที่มีโอกาสเกิดขึ้นมากที่สุด -- แล้วปฏิบัติต่อมันเป็นอันดับแรกที่ควรทำให้เป็นทางการ ไม่ว่าจะเป็น hook หรือการเปลี่ยนหมวดหมู่ permission แทนที่จะพยายามล็อกทุกอย่างพร้อมกัน

### ขั้นที่ 4: ตัดสินใจค่าเริ่มต้นเรื่อง subagent และ memory

จากแบบฝึกหัดบทเรียนที่ 5: มีคำถามเชิงสำรวจประเภทที่เกิดซ้ำในโปรเจกต์นี้ไหม ("X ทำงานอย่างไรที่นี่") ที่คุ้มจะเอื้อมไปหา subagent เป็นค่าเริ่มต้น จากบทเรียนที่ 8: มีความชอบที่ยืนพื้นของคุณไหม ที่ agent ควรพกติดตัวข้ามเซสชัน แทนที่คุณจะต้องพูดซ้ำ

### ขั้นที่ 5: การทดสอบจริง

เลือกงานหลายขั้นตอนจริงหนึ่งงานในโปรเจกต์นี้ -- ไม่ใช่ตัวอย่างของเล่น แต่เป็นสิ่งที่ต้องการให้เสร็จจริงๆ -- แล้วรันมันแบบที่บทเรียนที่ 9 สาธิตไว้: สังเกตระหว่างทางว่ากลไกไหนที่เอื้อมไปหาจริงๆ และ \`CLAUDE.md\` ที่เขียนไว้ในขั้นที่ 1 ยืนหยัดได้ไหม หรือต้องการการแก้ไขทันทีที่งานจริงเผยช่องว่างในนั้น

### "เสร็จแล้ว" สำหรับบทเรียนนี้หน้าตาเป็นอย่างไร

ไม่ใช่การตั้งค่าที่สมบูรณ์แบบ -- แต่เป็นของจริง ที่มีช่องว่างจริงที่คุณสังเกตเห็น ไม่ใช่เดาไว้ล่วงหน้า ผลลัพธ์ที่ซื่อตรงของแบบฝึกหัดนี้มักเป็น "\`CLAUDE.md\` ของฉันขาด X ซึ่งสังเกตเห็นก็ต่อเมื่อ agent ทำผิดเพราะมัน" -- นั่นคือความสำเร็จ ไม่ใช่ความล้มเหลว \`CLAUDE.md\` (และการตั้งค่าที่เหลือนี้) ตั้งใจให้ถูกปรับปรุงตามที่พบช่องว่าง ไม่ใช่เขียนครั้งเดียวแล้วทิ้งไว้

## สรุป

การตั้งค่า Claude Code สำหรับโปรเจกต์จริงไม่ใช่ checklist ครั้งเดียวที่ทำเสร็จแล้วลืม -- มันคือ \`CLAUDE.md\` ที่เขียนจากช่องว่างจริงที่สังเกตเห็น, จุดยืนที่ตั้งใจ (ไม่ใช่ค่าเริ่มต้น) เรื่อง Plan Mode, guardrail จริงหนึ่งอันที่ทำให้เป็นทางการก่อนพยายามครอบคลุมทุกอย่าง, และค่าเริ่มต้นสำหรับ subagent กับ memory ที่อิงรูปแบบที่เกิดซ้ำจริงของโปรเจกต์คุณ ทั้งหมดถูกปรับปรุงตั้งแต่ครั้งแรกที่งานจริงเผยให้เห็นว่าคุณผิดตรงไหน การปรับปรุงไปเรื่อยๆ นั้นแหละคือบทเรียนสุดท้ายที่คอร์สนี้ต้องการสอน: กลไกจากบทเรียนที่ 2 ถึง 8 คือเครื่องมือ และการใช้มันให้ดีคือทักษะที่สร้างขึ้นจากการรันมันจริงกับงานที่คุณใส่ใจ ไม่ใช่จากการอ่านเกี่ยวกับมันครั้งเดียว`,
      },
    ],
  };

export default course;
