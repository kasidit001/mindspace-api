import type { SeedCourse } from "./types";

const course: SeedCourse = {
    slug: "claude-agent-skills",
    title: "Claude Agent Skills",
    descriptionEn:
      "How to package repeatable expertise for Claude as Agent Skills: SKILL.md files, progressive disclosure, bundled scripts and references, and where skills live across Claude Code, the Claude Agent SDK, and the Claude API.",
        descriptionTh:
      "วิธีแพ็กเกจความเชี่ยวชาญที่ทำซ้ำได้ให้ Claude ในรูปแบบ Agent Skills: ไฟล์ SKILL.md, progressive disclosure, การรวมสคริปต์และเอกสารอ้างอิง และตำแหน่งที่ skills อาศัยอยู่ทั้งใน Claude Code, Claude Agent SDK และ Claude API",
lessons: [
      {
        slug: "what-is-an-agent-skill",
        titleEn: "What Is an Agent Skill?",
        titleTh: "Agent Skill คืออะไร?",
        order: 1,
        contentEn: `A Skill is a packaged, reusable set of instructions that teaches Claude how to do a specific task well — a folder containing at minimum one file, \`SKILL.md\`, and optionally scripts, templates, or reference documents alongside it. Think of it as an onboarding document you'd hand a new hire for one recurring job: "here's how we file expense reports," "here's our PDF-generation checklist," "here's how this repo wants its migrations written."

Skills exist because a model's context window and system prompt are finite, but the number of tasks an organization wants an agent to do well is not. You can't paste every team's conventions, every internal API's quirks, and every file format's edge cases into one system prompt — it would blow the context budget before the conversation even starts, and most of it would be irrelevant to any given request. A Skill solves this by staying off to the side, invisible, until the specific task it covers actually comes up.

This is different from just telling Claude what to do in a single message. A Skill is discoverable and reusable: once it's saved, Claude (or a teammate, or a future you) can trigger it by name or by describing the task, without re-explaining the procedure every time. It's also different from a plain system-prompt addition, because a library of many Skills scales — adding the hundredth Skill costs the same small amount of always-loaded context as adding the first.

At the highest level, three things make a Skill work: a short *description* that Claude sees at all times so it knows the Skill exists and when to reach for it; a longer *body* with the actual instructions, only loaded into context once the Skill is triggered; and, optionally, *bundled files* — scripts, templates, reference docs — loaded only if the instructions in the body actually need them. That loading strategy is called progressive disclosure, and it's the subject of the next lesson.

## Conclusion

A Skill packages reusable instructions for one recurring task into a folder built around a single \`SKILL.md\` file, existing because a model's context budget can't hold every team's conventions at once. Its value comes from three pieces working together: a short, always-visible description, a longer body loaded only on trigger, and optional bundled files loaded only when needed — a loading strategy called progressive disclosure, covered next.`,
        contentTh: `Skill คือชุดคำสั่งที่ถูกแพ็กเกจไว้และนำกลับมาใช้ซ้ำได้ ซึ่งสอน Claude ให้ทำงานเฉพาะอย่างได้ดี — เป็นโฟลเดอร์ที่มีไฟล์อย่างน้อยหนึ่งไฟล์คือ \`SKILL.md\` และอาจมีสคริปต์ เทมเพลต หรือเอกสารอ้างอิงประกอบอยู่ด้วยก็ได้ ลองนึกภาพว่ามันคือเอกสาร onboarding ที่คุณจะมอบให้พนักงานใหม่สำหรับงานที่ต้องทำซ้ำๆ งานหนึ่ง: "นี่คือวิธีที่เราเบิกค่าใช้จ่าย" "นี่คือ checklist การสร้าง PDF ของเรา" "นี่คือวิธีที่ repo นี้ต้องการให้เขียน migration"

Skills มีอยู่เพราะ context window และ system prompt ของโมเดลนั้นมีจำกัด แต่จำนวนงานที่องค์กรต้องการให้ agent ทำได้ดีนั้นไม่มีขีดจำกัด คุณไม่สามารถแปะข้อตกลงของทุกทีม ความแปลกประหลาดของทุก internal API และ edge case ของทุกรูปแบบไฟล์ลงใน system prompt เดียวได้ — มันจะกิน context budget จนหมดก่อนที่บทสนทนาจะเริ่มด้วยซ้ำ และส่วนใหญ่ก็ไม่เกี่ยวข้องกับคำขอใดๆ ที่เกิดขึ้นจริง Skill แก้ปัญหานี้ด้วยการอยู่นิ่งๆ ข้างๆ ไม่ปรากฏตัว จนกว่างานเฉพาะที่มันครอบคลุมจะเกิดขึ้นจริง

สิ่งนี้แตกต่างจากการบอก Claude ให้ทำอะไรในข้อความเดียว Skill สามารถถูกค้นพบได้และนำกลับมาใช้ซ้ำได้: เมื่อบันทึกไว้แล้ว Claude (หรือเพื่อนร่วมทีม หรือตัวคุณในอนาคต) สามารถเรียกใช้มันได้ด้วยชื่อ หรือโดยการอธิบายงาน โดยไม่ต้องอธิบายขั้นตอนซ้ำทุกครั้ง มันยังแตกต่างจากการเพิ่มเนื้อหาลงใน system prompt ตรงๆ เพราะคลัง Skills จำนวนมากสามารถขยายได้ — การเพิ่ม Skill ที่ร้อยขึ้นไปก็ยังเสีย context ที่โหลดตลอดเวลาในปริมาณน้อยๆ เท่ากับการเพิ่ม Skill แรก

ในระดับสูงสุด มีสามสิ่งที่ทำให้ Skill ทำงานได้: *description* สั้นๆ ที่ Claude เห็นอยู่ตลอดเวลาเพื่อให้รู้ว่า Skill นี้มีอยู่และควรหยิบมาใช้เมื่อไหร่; *body* ที่ยาวกว่าซึ่งมีคำสั่งจริงๆ จะถูกโหลดเข้า context ก็ต่อเมื่อ Skill ถูกกระตุ้นเท่านั้น; และ *bundled files* ที่เป็นทางเลือก — สคริปต์ เทมเพลต เอกสารอ้างอิง — ซึ่งจะถูกโหลดก็ต่อเมื่อคำสั่งใน body ต้องการมันจริงๆ กลยุทธ์การโหลดแบบนี้เรียกว่า progressive disclosure ซึ่งเป็นหัวข้อของบทเรียนถัดไป

## สรุป

Skill คือการแพ็กเกจคำสั่งที่นำกลับมาใช้ซ้ำได้สำหรับงานหนึ่งที่เกิดซ้ำๆ ไว้ในโฟลเดอร์ที่มีไฟล์ \`SKILL.md\` เป็นแกนหลัก มันมีอยู่เพราะ context budget ของโมเดลไม่สามารถบรรจุข้อตกลงของทุกทีมไว้พร้อมกันได้ คุณค่าของมันมาจากสามส่วนที่ทำงานร่วมกัน: description สั้นๆ ที่มองเห็นได้ตลอดเวลา, body ที่ยาวกว่าซึ่งโหลดเมื่อถูกกระตุ้นเท่านั้น และ bundled files ที่เป็นทางเลือกซึ่งโหลดเมื่อจำเป็นเท่านั้น — กลยุทธ์การโหลดนี้เรียกว่า progressive disclosure ซึ่งจะพูดถึงในบทถัดไป`,
      },
      {
        slug: "progressive-disclosure",
        titleEn: "Progressive Disclosure: The Three Levels",
        titleTh: "Progressive Disclosure: สามระดับของการโหลด",
        order: 2,
        contentEn: `Progressive disclosure is the mechanism that lets an agent have access to hundreds of Skills without paying the context cost of all of them at once. It works in three levels, each loaded only when the previous level justifies it.

**Level 1 — metadata.** The \`name\` and \`description\` from every available Skill's YAML frontmatter are loaded into context up front, for every conversation. This is deliberately cheap: a sentence or two per Skill. It's how Claude knows a Skill exists and roughly when it applies, without knowing anything about how it actually works yet.

**Level 2 — the SKILL.md body.** Only once Claude decides a Skill is relevant to the current task does the full body of \`SKILL.md\` get loaded into context — the actual step-by-step instructions, conventions, and examples. A Skill that's never triggered in a session never costs more than its one-line description.

**Level 3 — bundled files.** The body itself can point to additional files in the Skill's folder — a reference doc, a data schema, a script — and Claude reads or runs those only if the instructions call for that specific step. A 2,000-line API reference bundled with a Skill costs nothing unless the task actually needs that section of it.

\`\`\`mermaid
graph LR
    A["Level 1: name + description<br/>always in context"] -->|"Skill looks relevant"| B["Level 2: SKILL.md body<br/>loaded on trigger"]
    B -->|"instructions reference a file"| C["Level 3: bundled scripts/docs<br/>loaded on demand"]
\`\`\`

The practical upshot: write the \`description\` to be the thing Claude decides on, write the body to be the thing Claude executes with, and push anything long, rarely needed, or mechanical (boilerplate scripts, exhaustive references) into bundled files rather than the body. Skills that respect this stay cheap to keep around even when most of them go unused in any given conversation.

## Conclusion

Progressive disclosure lets an agent hold hundreds of Skills without paying their full context cost at once, by loading in three levels: always-on metadata (\`name\` + \`description\`), the \`SKILL.md\` body loaded only once a Skill triggers, and bundled files read only when the body's instructions actually call for them. The practical takeaway is to keep the description decision-worthy, the body execution-ready, and push anything long or rarely needed into bundled files.`,
        contentTh: `Progressive disclosure คือกลไกที่ทำให้ agent เข้าถึง Skills ได้นับร้อยโดยไม่ต้องเสียค่าใช้จ่ายด้าน context ของทั้งหมดพร้อมกัน มันทำงานเป็นสามระดับ แต่ละระดับจะถูกโหลดก็ต่อเมื่อระดับก่อนหน้ามีเหตุผลเพียงพอ

**ระดับ 1 — metadata** \`name\` และ \`description\` จาก YAML frontmatter ของทุก Skill ที่มีอยู่จะถูกโหลดเข้า context ล่วงหน้า สำหรับทุกบทสนทนา สิ่งนี้ถูกออกแบบให้มีต้นทุนต่ำโดยเจตนา: หนึ่งหรือสองประโยคต่อ Skill นี่คือวิธีที่ Claude รู้ว่า Skill หนึ่งมีอยู่และคร่าวๆ ว่าควรใช้เมื่อไหร่ โดยยังไม่รู้อะไรเลยว่ามันทำงานอย่างไรจริงๆ

**ระดับ 2 — body ของ SKILL.md** เมื่อ Claude ตัดสินใจแล้วว่า Skill นั้นเกี่ยวข้องกับงานปัจจุบันเท่านั้น body ทั้งหมดของ \`SKILL.md\` ถึงจะถูกโหลดเข้า context — คำสั่งแบบทีละขั้นตอน ข้อตกลง และตัวอย่างจริงๆ Skill ที่ไม่เคยถูกกระตุ้นในเซสชันหนึ่งจะไม่มีต้นทุนมากไปกว่า description บรรทัดเดียวของมัน

**ระดับ 3 — bundled files** ตัว body เองสามารถชี้ไปยังไฟล์อื่นๆ ในโฟลเดอร์ของ Skill ได้ — เอกสารอ้างอิง สคีมาข้อมูล สคริปต์ — และ Claude จะอ่านหรือรันไฟล์เหล่านั้นก็ต่อเมื่อคำสั่งเรียกร้องขั้นตอนนั้นๆ จริงๆ เอกสารอ้างอิง API ยาว 2,000 บรรทัดที่แนบมากับ Skill จะไม่มีต้นทุนใดๆ เลย เว้นแต่งานจะต้องการส่วนนั้นจริงๆ

\`\`\`mermaid
graph LR
    A["Level 1: name + description<br/>always in context"] -->|"Skill looks relevant"| B["Level 2: SKILL.md body<br/>loaded on trigger"]
    B -->|"instructions reference a file"| C["Level 3: bundled scripts/docs<br/>loaded on demand"]
\`\`\`

สรุปในเชิงปฏิบัติ: เขียน \`description\` ให้เป็นสิ่งที่ Claude ใช้ตัดสินใจ เขียน body ให้เป็นสิ่งที่ Claude ใช้ลงมือทำ และผลักดันสิ่งที่ยาว ไม่ค่อยได้ใช้ หรือเป็นกลไกล้วนๆ (สคริปต์ boilerplate เอกสารอ้างอิงแบบละเอียดยิบ) ไปไว้ใน bundled files แทนที่จะอยู่ใน body Skills ที่เคารพหลักการนี้จะยังคงมีต้นทุนต่ำแม้ Skill ส่วนใหญ่จะไม่ได้ถูกใช้เลยในบทสนทนาใดบทสนทนาหนึ่ง

## สรุป

Progressive disclosure ทำให้ agent ถือ Skills ได้นับร้อยโดยไม่ต้องเสียค่าใช้จ่ายด้าน context เต็มจำนวนพร้อมกัน ด้วยการโหลดเป็นสามระดับ: metadata (\`name\` + \`description\`) ที่เปิดอยู่ตลอด, body ของ \`SKILL.md\` ที่โหลดก็ต่อเมื่อ Skill ถูกกระตุ้นเท่านั้น และ bundled files ที่อ่านก็ต่อเมื่อคำสั่งใน body ต้องการมันจริงๆ ข้อสรุปเชิงปฏิบัติคือให้ description ใช้ตัดสินใจได้ดี ให้ body พร้อมลงมือทำได้ทันที และผลักสิ่งที่ยาวหรือไม่ค่อยได้ใช้ไปไว้ใน bundled files`,
      },
      {
        slug: "anatomy-of-skill-md",
        titleEn: "Anatomy of SKILL.md",
        titleTh: "โครงสร้างของ SKILL.md",
        order: 3,
        contentEn: `Every Skill's entry point is a single Markdown file named \`SKILL.md\`, sitting at the root of the Skill's own folder (e.g. \`pdf-filling/SKILL.md\`). It has two parts: YAML frontmatter, then a Markdown body.

\`\`\`
---
name: pdf-filling
description: Fills out PDF form fields programmatically and flattens the result. Use this skill when the user needs to fill in a PDF form (tax forms, applications, contracts) with provided data.
---

# Filling PDF Forms

1. Inspect the form fields with \`pdftk form.pdf dump_data_fields\`.
2. Map each field name to the value the user provided...
\`\`\`

The frontmatter has two required fields. \`name\` is a short, unique, kebab-case identifier — it's how the Skill is invoked directly and how it's referenced from elsewhere. \`description\` is a one-to-three sentence summary that states both *what the Skill does* and *when to use it* — this is the only part of the Skill visible before it triggers, so its wording carries the whole discovery mechanism (the next lesson covers writing it well).

The body is ordinary Markdown: numbered steps, code blocks, tables, whatever communicates the procedure clearly. It's written the same way you'd write instructions for a competent person who doesn't know your specific workflow yet — explicit about the order of operations, explicit about edge cases you've hit before, and explicit about what "done" looks like. Anthropic's own guidance is to keep this body reasonably short — roughly under 500 lines is a common rule of thumb — since progressive disclosure only pays off if the body itself stays lean; anything longer belongs in a bundled reference file the body links to instead.

A Skill folder can contain nothing but \`SKILL.md\` — that's a complete, valid Skill. Everything past that (scripts, templates, references) is optional and only added when the task genuinely benefits from it.

## Conclusion

Every Skill starts with one \`SKILL.md\` file made of YAML frontmatter (the required \`name\` and \`description\` fields) followed by an ordinary Markdown body of instructions. Anthropic's own guidance is to keep that body lean — roughly under 500 lines — since a Skill can be valid with nothing but this one file, and everything past it is optional.`,
        contentTh: `จุดเริ่มต้นของทุก Skill คือไฟล์ Markdown เดียวชื่อ \`SKILL.md\` ซึ่งอยู่ที่รากของโฟลเดอร์ของ Skill นั้นเอง (เช่น \`pdf-filling/SKILL.md\`) มันมีสองส่วน: YAML frontmatter ตามด้วย Markdown body

\`\`\`
---
name: pdf-filling
description: Fills out PDF form fields programmatically and flattens the result. Use this skill when the user needs to fill in a PDF form (tax forms, applications, contracts) with provided data.
---

# Filling PDF Forms

1. Inspect the form fields with \`pdftk form.pdf dump_data_fields\`.
2. Map each field name to the value the user provided...
\`\`\`

Frontmatter มีฟิลด์ที่จำเป็นสองฟิลด์ \`name\` คือตัวระบุแบบสั้น ไม่ซ้ำใคร และเป็น kebab-case — มันคือสิ่งที่ใช้เรียก Skill โดยตรงและใช้อ้างอิงจากที่อื่น \`description\` คือบทสรุปหนึ่งถึงสามประโยคที่ระบุทั้ง *สิ่งที่ Skill ทำ* และ *เมื่อไหร่ควรใช้มัน* — นี่คือส่วนเดียวของ Skill ที่มองเห็นได้ก่อนที่มันจะถูกกระตุ้น ดังนั้นถ้อยคำของมันจึงแบกรับกลไกการค้นพบทั้งหมด (บทเรียนถัดไปจะพูดถึงวิธีเขียนมันให้ดี)

Body เป็น Markdown ธรรมดา: ขั้นตอนที่มีตัวเลข code block ตาราง อะไรก็ตามที่สื่อสารขั้นตอนได้อย่างชัดเจน มันถูกเขียนในแบบเดียวกับที่คุณจะเขียนคำสั่งให้คนที่มีความสามารถแต่ยังไม่รู้จัก workflow เฉพาะของคุณ — ชัดเจนเรื่องลำดับการทำงาน ชัดเจนเรื่อง edge case ที่คุณเคยเจอมาก่อน และชัดเจนว่า "เสร็จแล้ว" หน้าตาเป็นอย่างไร คำแนะนำของ Anthropic เองคือให้ body นี้สั้นพอสมควร — ประมาณไม่เกิน 500 บรรทัดเป็นกฎคร่าวๆ ที่ใช้กันทั่วไป — เพราะ progressive disclosure จะคุ้มค่าก็ต่อเมื่อตัว body เองยังคงกระชับ อะไรที่ยาวกว่านั้นควรอยู่ในไฟล์อ้างอิงที่แนบมาซึ่ง body ลิงก์ไปหาแทน

โฟลเดอร์ของ Skill สามารถมีแค่ \`SKILL.md\` เพียงอย่างเดียวได้ — นั่นคือ Skill ที่สมบูรณ์และใช้งานได้แล้ว ทุกอย่างที่มากกว่านั้น (สคริปต์ เทมเพลต เอกสารอ้างอิง) เป็นทางเลือก และเพิ่มเข้ามาก็ต่อเมื่องานนั้นได้ประโยชน์จริงๆ เท่านั้น

## สรุป

ทุก Skill เริ่มต้นด้วยไฟล์ \`SKILL.md\` เพียงไฟล์เดียว ซึ่งประกอบด้วย YAML frontmatter (ฟิลด์ที่จำเป็นคือ \`name\` และ \`description\`) ตามด้วย Markdown body ที่เป็นคำสั่งธรรมดา คำแนะนำของ Anthropic เองคือให้ body นั้นกระชับ — ประมาณไม่เกิน 500 บรรทัด — เพราะ Skill หนึ่งจะสมบูรณ์ได้ด้วยไฟล์เดียวนี้เท่านั้น และทุกอย่างที่มากกว่านั้นเป็นทางเลือกทั้งหมด`,
      },
      {
        slug: "writing-an-effective-description",
        titleEn: "Writing an Effective Description",
        titleTh: "การเขียน Description ให้มีประสิทธิภาพ",
        order: 4,
        contentEn: `The \`description\` field is the single highest-leverage sentence in a Skill, because it's the only part of the Skill that's always in context. If it's vague, Claude either never triggers the Skill when it should, or triggers it when it shouldn't — and unlike a body full of wrong instructions, a bad description fails silently, since nothing ever surfaces the mismatch to you.

Write it in the third person, as if documenting the Skill for someone browsing a list of capabilities — not as an instruction to Claude ("You should...") and not as a first-person pitch ("I can help you..."). State two things explicitly: what the Skill does, and when it should be used.

\`\`\`
# Too vague — Claude can't tell when this applies
description: Helps with documents.

# Specific — states the capability and the trigger
description: Extracts tables from scanned PDF invoices into structured
  JSON. Use this skill when the user shares a PDF invoice or receipt and
  wants the line items pulled out as data.
\`\`\`

Include concrete trigger words a real request would contain — file types, task verbs, domain terms — rather than only abstract category names. "Use this skill when the user needs to fill in a PDF form" fires on the phrase "fill in this form"; "Helps with forms" doesn't give Claude much to match against.

Also disambiguate from Skills that sound similar. If a codebase has both \`pdf-filling\` (writing into existing form fields) and \`pdf-generation\` (creating a new PDF from scratch), each description should make the boundary obvious, so Claude doesn't have to guess between them mid-task.

## Conclusion

The \`description\` field is a Skill's highest-leverage sentence because it's the only part always in context, so it should be written in the third person and state plainly both what the Skill does and when to use it, using concrete trigger words rather than abstract category names. A description also needs to disambiguate a Skill from similarly named ones so Claude doesn't have to guess between them mid-task.`,
        contentTh: `ฟิลด์ \`description\` คือประโยคที่ทรงพลังที่สุดเพียงประโยคเดียวใน Skill เพราะมันคือส่วนเดียวของ Skill ที่อยู่ใน context ตลอดเวลา ถ้ามันคลุมเครือ Claude จะไม่กระตุ้น Skill เมื่อควรจะทำ หรือไม่ก็กระตุ้นมันเมื่อไม่ควรทำ — และต่างจาก body ที่เต็มไปด้วยคำสั่งผิดๆ description ที่แย่จะล้มเหลวแบบเงียบๆ เพราะไม่มีอะไรมาเผยให้เห็นความไม่ตรงกันนี้กับคุณเลย

เขียนมันในบุรุษที่สาม ราวกับกำลังบันทึกเอกสารของ Skill ไว้ให้ใครสักคนที่กำลังเลื่อนดูรายการความสามารถ — ไม่ใช่เขียนเป็นคำสั่งถึง Claude ("คุณควร...") และไม่ใช่การเสนอตัวในบุรุษที่หนึ่ง ("ฉันช่วยคุณได้...") ระบุสองสิ่งให้ชัดเจน: Skill ทำอะไร และควรใช้เมื่อไหร่

\`\`\`
# Too vague — Claude can't tell when this applies
description: Helps with documents.

# Specific — states the capability and the trigger
description: Extracts tables from scanned PDF invoices into structured
  JSON. Use this skill when the user shares a PDF invoice or receipt and
  wants the line items pulled out as data.
\`\`\`

ใส่คำกระตุ้นที่เป็นรูปธรรมซึ่งคำขอจริงๆ จะมี — ประเภทไฟล์ คำกริยาของงาน คำศัพท์เฉพาะด้าน — แทนที่จะใช้แค่ชื่อหมวดหมู่ที่เป็นนามธรรม "Use this skill when the user needs to fill in a PDF form" จะทำงานเมื่อเจอวลี "fill in this form"; ส่วน "Helps with forms" ไม่ได้ให้อะไรกับ Claude มากพอที่จะจับคู่ได้

นอกจากนี้ยังต้องแยกความแตกต่างจาก Skills ที่ฟังดูคล้ายกันด้วย ถ้า codebase หนึ่งมีทั้ง \`pdf-filling\` (การเขียนลงในฟิลด์ฟอร์มที่มีอยู่แล้ว) และ \`pdf-generation\` (การสร้าง PDF ใหม่ตั้งแต่ต้น) description ของแต่ละอันควรทำให้เส้นแบ่งนั้นชัดเจน เพื่อที่ Claude จะได้ไม่ต้องเดาระหว่างสองอย่างนี้กลางงาน

## สรุป

ฟิลด์ \`description\` คือประโยคที่ทรงพลังที่สุดของ Skill เพราะเป็นส่วนเดียวที่อยู่ใน context ตลอดเวลา จึงควรเขียนในบุรุษที่สามและระบุตรงๆ ทั้งว่า Skill ทำอะไรและควรใช้เมื่อไหร่ โดยใช้คำกระตุ้นที่เป็นรูปธรรมแทนชื่อหมวดหมู่ที่เป็นนามธรรม description ยังต้องแยกความแตกต่างจาก Skill ที่มีชื่อคล้ายกันด้วย เพื่อที่ Claude จะได้ไม่ต้องเดาระหว่างสองอย่างนี้กลางงาน`,
      },
      {
        slug: "bundling-scripts-and-references",
        titleEn: "Bundling Scripts & Reference Files",
        titleTh: "การรวมสคริปต์และไฟล์อ้างอิง",
        order: 5,
        contentEn: `\`SKILL.md\` doesn't have to carry the entire task by itself. A Skill's folder can include any other files the instructions need, and the body references them by their relative path.

Two kinds of bundled file cover most real Skills:

**Reference files** hold material that's necessary but too long or too rarely needed to justify inlining into the body — a full API schema, a style guide, a table of error codes. The body says something like "see \`reference/api-schema.json\` for the full field list" and Claude only opens that file once the current step actually calls for it, keeping the common path through the Skill short.

**Scripts** hold logic that's more reliable as code than as prose instructions — especially anything mechanical, deterministic, or fiddly to get exactly right from a natural-language description each time (parsing a binary format, running a multi-step CLI pipeline, validating a file against a schema). Instead of asking Claude to regenerate that logic from scratch on every run — with a chance of a subtly different bug each time — the Skill bundles a tested script, and the body just says to run it.

\`\`\`
pdf-filling/
├── SKILL.md
├── scripts/
│   └── fill_form.py
└── reference/
    └── field-types.md
\`\`\`

A body instruction like "run \`scripts/fill_form.py --input form.pdf --data values.json\`" is both more reliable and cheaper than describing the equivalent logic in prose for Claude to reimplement each time. The rule of thumb: prose for things that need judgment or vary by request, a script for the parts that don't.

## Conclusion

A Skill folder can bundle two kinds of extra file beyond \`SKILL.md\`: reference files for material too long to inline into the body, and scripts for logic that's more reliable as tested code than as prose Claude has to reimplement each run. The rule of thumb is prose for judgment calls that vary by request, and a script for the mechanical parts that don't.`,
        contentTh: `\`SKILL.md\` ไม่จำเป็นต้องแบกรับงานทั้งหมดด้วยตัวมันเองเพียงลำพัง โฟลเดอร์ของ Skill สามารถมีไฟล์อื่นๆ ที่คำสั่งต้องการได้ และ body จะอ้างอิงถึงไฟล์เหล่านั้นด้วยเส้นทางแบบสัมพัทธ์

ไฟล์ที่แนบมาสองประเภทครอบคลุม Skills จริงส่วนใหญ่:

**Reference files** เก็บเนื้อหาที่จำเป็นแต่ยาวเกินไปหรือถูกใช้น้อยเกินไปที่จะฝังไว้ใน body โดยตรง — สคีมา API เต็มรูปแบบ style guide ตารางรหัสข้อผิดพลาด body จะบอกประมาณว่า "ดู \`reference/api-schema.json\` สำหรับรายการฟิลด์ทั้งหมด" และ Claude จะเปิดไฟล์นั้นก็ต่อเมื่อขั้นตอนปัจจุบันต้องการมันจริงๆ ทำให้เส้นทางทั่วไปผ่าน Skill นั้นสั้น

**Scripts** เก็บ logic ที่เชื่อถือได้มากกว่าเมื่อเป็นโค้ดแทนที่จะเป็นคำสั่งแบบร้อยแก้ว — โดยเฉพาะอะไรก็ตามที่เป็นกลไก แน่นอนตายตัว หรือยุ่งยากที่จะทำให้ถูกต้องเป๊ะๆ จากคำอธิบายภาษาธรรมชาติทุกครั้ง (การแยกวิเคราะห์รูปแบบไบนารี การรัน CLI pipeline หลายขั้นตอน การตรวจสอบไฟล์กับสคีมา) แทนที่จะขอให้ Claude สร้าง logic นั้นขึ้นมาใหม่ตั้งแต่ต้นทุกครั้งที่รัน — ซึ่งมีโอกาสเกิดบั๊กที่ต่างกันเล็กน้อยในแต่ละครั้ง — Skill จะแนบสคริปต์ที่ผ่านการทดสอบแล้วมาด้วย และ body ก็แค่บอกให้รันมัน

\`\`\`
pdf-filling/
├── SKILL.md
├── scripts/
│   └── fill_form.py
└── reference/
    └── field-types.md
\`\`\`

คำสั่งใน body แบบ "run \`scripts/fill_form.py --input form.pdf --data values.json\`" นั้นทั้งเชื่อถือได้มากกว่าและมีต้นทุนต่ำกว่าการอธิบาย logic ที่เทียบเท่ากันเป็นร้อยแก้วให้ Claude ต้อง implement ใหม่ทุกครั้ง กฎง่ายๆ ที่ใช้จำ: ร้อยแก้วสำหรับสิ่งที่ต้องใช้วิจารณญาณหรือแตกต่างกันไปตามคำขอ สคริปต์สำหรับส่วนที่ไม่ต้องใช้

## สรุป

โฟลเดอร์ของ Skill สามารถแนบไฟล์เพิ่มเติมนอกเหนือจาก \`SKILL.md\` ได้สองประเภท: reference files สำหรับเนื้อหาที่ยาวเกินไปที่จะฝังใน body และ scripts สำหรับ logic ที่เชื่อถือได้มากกว่าเมื่อเป็นโค้ดที่ผ่านการทดสอบแล้ว แทนที่จะเป็นร้อยแก้วที่ Claude ต้อง implement ใหม่ทุกครั้ง กฎง่ายๆ คือใช้ร้อยแก้วสำหรับสิ่งที่ต้องใช้วิจารณญาณและแตกต่างกันไปตามคำขอ ส่วนสคริปต์ใช้สำหรับส่วนที่เป็นกลไกตายตัว`,
      },
      {
        slug: "where-skills-live",
        titleEn: "Where Skills Live: Personal, Project & Plugin Skills",
        titleTh: "Skills อาศัยอยู่ที่ไหน: Personal, Project และ Plugin Skills",
        order: 6,
        contentEn: `A Skill's location determines who it's available to, which is the main design decision when creating one.

**Personal skills** live in a user-level directory (in Claude Code, \`~/.claude/skills/<name>/SKILL.md\`). They follow you across every project on your machine but aren't shared with anyone else — the right place for your own workflow shortcuts, not for anything a teammate needs.

**Project skills** live inside the repository itself (\`.claude/skills/<name>/SKILL.md\`), get committed to version control, and are available to anyone working in that codebase. This is the right home for anything specific to the project's own conventions — "how this repo writes migrations," "how this monorepo's release process works" — since checking it in means the whole team (and any agent working in the repo) gets it automatically, no separate install step.

**Plugin skills** ship bundled inside a plugin, distributed and installed as a unit alongside whatever tools or commands the plugin also provides. This is the right shape for a Skill meant to be shared across many unrelated projects or teams, versioned and updated independently of any one codebase.

| Scope | Location | Shared with |
| --- | --- | --- |
| Personal | \`~/.claude/skills/\` | Just you, across all projects |
| Project | \`.claude/skills/\` (in repo) | Everyone working in that repo |
| Plugin | Bundled in a plugin package | Everyone who installs the plugin |

When more than one Skill with the same name is available at once, precedence and disambiguation rules can vary by environment — plugin skills are typically referenced as \`plugin-name:skill-name\` specifically to avoid colliding with a personal or project Skill of the same short name.

## Conclusion

A Skill's location — personal (\`~/.claude/skills/\`), project (\`.claude/skills/\`, committed to the repo), or plugin (bundled and distributed with a plugin) — determines who can use it, from just you, to everyone in that codebase, to everyone who installs the plugin. Plugin skills are typically referenced as \`plugin-name:skill-name\` to avoid colliding with a personal or project Skill of the same short name.`,
        contentTh: `ตำแหน่งที่ตั้งของ Skill เป็นตัวกำหนดว่ามันจะใช้งานได้กับใครบ้าง ซึ่งเป็นการตัดสินใจด้านการออกแบบหลักเมื่อสร้าง Skill หนึ่งขึ้นมา

**Personal skills** อาศัยอยู่ในไดเรกทอรีระดับผู้ใช้ (ใน Claude Code คือ \`~/.claude/skills/<name>/SKILL.md\`) มันจะติดตามคุณไปในทุกโปรเจกต์บนเครื่องของคุณ แต่จะไม่ถูกแชร์กับใครเลย — เป็นที่ที่เหมาะสำหรับทางลัดใน workflow ของตัวคุณเอง ไม่ใช่สำหรับสิ่งที่เพื่อนร่วมทีมต้องใช้

**Project skills** อาศัยอยู่ภายใน repository เอง (\`.claude/skills/<name>/SKILL.md\`) ถูก commit เข้า version control และใช้งานได้กับทุกคนที่ทำงานใน codebase นั้น นี่คือที่ที่เหมาะสมสำหรับอะไรก็ตามที่เฉพาะเจาะจงกับข้อตกลงของโปรเจกต์เอง — "repo นี้เขียน migration อย่างไร" "กระบวนการ release ของ monorepo นี้ทำงานอย่างไร" — เพราะการ commit มันเข้าไปหมายความว่าทั้งทีม (และ agent ใดๆ ที่ทำงานใน repo) จะได้รับมันโดยอัตโนมัติ ไม่ต้องมีขั้นตอนติดตั้งแยกต่างหาก

**Plugin skills** ถูกส่งมาพร้อมกับ plugin หนึ่ง แจกจ่ายและติดตั้งเป็นหน่วยเดียวกันกับเครื่องมือหรือคำสั่งอื่นๆ ที่ plugin นั้นให้มาด้วย นี่คือรูปแบบที่เหมาะสมสำหรับ Skill ที่ตั้งใจจะแชร์ข้ามหลายโปรเจกต์หรือหลายทีมที่ไม่เกี่ยวข้องกัน มีการกำหนดเวอร์ชันและอัปเดตแยกอิสระจาก codebase ใดๆ

| Scope | Location | Shared with |
| --- | --- | --- |
| Personal | \`~/.claude/skills/\` | Just you, across all projects |
| Project | \`.claude/skills/\` (in repo) | Everyone working in that repo |
| Plugin | Bundled in a plugin package | Everyone who installs the plugin |

เมื่อมี Skill ที่ชื่อเดียวกันมากกว่าหนึ่งตัวพร้อมใช้งานในเวลาเดียวกัน กฎเรื่องลำดับความสำคัญและการแยกแยะความกำกวมอาจแตกต่างกันไปตามสภาพแวดล้อม — plugin skills มักถูกอ้างอิงในรูปแบบ \`plugin-name:skill-name\` โดยเฉพาะเพื่อหลีกเลี่ยงการชนกับ personal หรือ project Skill ที่มีชื่อสั้นเดียวกัน

## สรุป

ตำแหน่งที่ตั้งของ Skill — personal (\`~/.claude/skills/\`), project (\`.claude/skills/\` ที่ commit เข้า repo) หรือ plugin (แนบมาพร้อม plugin) — เป็นตัวกำหนดว่าใครใช้งานมันได้บ้าง ตั้งแต่ตัวคุณเองคนเดียว ไปจนถึงทุกคนใน codebase นั้น หรือทุกคนที่ติดตั้ง plugin plugin skills มักถูกอ้างอิงในรูปแบบ \`plugin-name:skill-name\` เพื่อหลีกเลี่ยงการชนกับ personal หรือ project Skill ที่มีชื่อสั้นเดียวกัน`,
      },
      {
        slug: "skills-vs-tools-vs-subagents-vs-mcp",
        titleEn: "Skills vs. Tools vs. Subagents vs. MCP",
        titleTh: "Skills เทียบกับ Tools, Subagents และ MCP",
        order: 7,
        contentEn: `These four pieces of the agent ecosystem are easy to conflate because they all extend what an agent can do, but they solve different problems and are frequently used together.

**A tool** gives Claude a new *capability* it didn't have before — the ability to read a file, run a shell command, query a database. Tools are typically implemented in code (natively, or via MCP) and are what actually performs an action in the world.

**MCP (Model Context Protocol)** is a standard way to expose tools (and other context) from an external server to any compatible agent — it's the plumbing for *connecting* new tools and data sources, not a packaging format for instructions.

**A Skill** doesn't add a new capability by itself — it teaches Claude how to use capabilities it already has (tools, MCP servers, its own reasoning) more effectively for one specific, recurring kind of task. A Skill for filling PDF forms doesn't invent PDF-writing ability; it tells Claude which existing tool to call, with what arguments, in what order, and what to watch out for. This is why Skills are cheap: they're instructions plus optional bundled files, not new machinery.

**A subagent** is a separate agent invocation — its own context window, its own tool access, run either in-process or in isolation — used to keep a large or noisy piece of work (a big search, a long investigation) out of the main conversation's context. A Skill can be the thing that tells an agent *how* to do a task; a subagent is a way of *where* that task's work happens. A Skill's instructions can direct Claude to delegate part of the work to a subagent, and a subagent can itself have access to the same Skills as the parent conversation.

Put together: MCP and native tools give Claude things it can *do*; Skills give Claude knowledge of *how* to do a specific task well with those things; subagents give Claude a place to *do large pieces of work* without crowding the main conversation.

## Conclusion

Tools and MCP give Claude new capabilities and a way to connect to them; a Skill doesn't add capability but teaches Claude how to use what it already has for one recurring task; and a subagent is a separate context for doing large pieces of work without crowding the main conversation. The four are complementary rather than substitutes, and are frequently combined — a Skill's instructions can even direct Claude to delegate part of a task to a subagent.`,
        contentTh: `ทั้งสี่องค์ประกอบนี้ในระบบนิเวศของ agent นั้นสับสนกันได้ง่าย เพราะทั้งหมดขยายความสามารถของ agent แต่ละอย่างแก้ปัญหาคนละแบบ และมักถูกใช้ร่วมกันบ่อยๆ

**Tool** มอบ *ความสามารถ* ใหม่ให้ Claude ที่ไม่เคยมีมาก่อน — ความสามารถในการอ่านไฟล์ รันคำสั่ง shell สอบถามฐานข้อมูล Tools มักถูก implement เป็นโค้ด (โดยตรง หรือผ่าน MCP) และเป็นสิ่งที่ลงมือทำการกระทำจริงในโลกจริง

**MCP (Model Context Protocol)** คือวิธีมาตรฐานในการเปิดเผย tools (และ context อื่นๆ) จาก server ภายนอกให้ agent ที่รองรับตัวใดก็ได้ — มันคือระบบท่อสำหรับ *เชื่อมต่อ* tools และแหล่งข้อมูลใหม่ๆ ไม่ใช่รูปแบบการแพ็กเกจคำสั่ง

**Skill** ไม่ได้เพิ่มความสามารถใหม่ด้วยตัวมันเอง — มันสอน Claude ให้ใช้ความสามารถที่มีอยู่แล้ว (tools, MCP servers, การให้เหตุผลของตัวมันเอง) ได้อย่างมีประสิทธิภาพมากขึ้นสำหรับงานเฉพาะอย่างที่เกิดซ้ำๆ หนึ่งอย่าง Skill สำหรับการกรอกแบบฟอร์ม PDF ไม่ได้สร้างความสามารถในการเขียน PDF ขึ้นมาใหม่ มันบอก Claude ว่าควรเรียก tool ที่มีอยู่แล้วตัวไหน ด้วยอาร์กิวเมนต์อะไร ตามลำดับใด และต้องระวังอะไรบ้าง นี่คือเหตุผลที่ Skills มีต้นทุนต่ำ: มันคือคำสั่งบวกกับ bundled files ที่เป็นทางเลือก ไม่ใช่กลไกใหม่

**Subagent** คือการเรียก agent แยกต่างหาก — มี context window ของตัวเอง มีการเข้าถึง tool ของตัวเอง รันได้ทั้งแบบ in-process หรือแยกต่างหาก — ใช้เพื่อกันงานที่ใหญ่หรือมีเสียงรบกวนมาก (การค้นหาขนาดใหญ่ การสืบสวนที่ยาวนาน) ออกจาก context ของบทสนทนาหลัก Skill สามารถเป็นสิ่งที่บอก agent ว่า *ทำอย่างไร* กับงานหนึ่ง ในขณะที่ subagent เป็นวิธีที่บอกว่า *ที่ไหน* ที่งานนั้นจะถูกทำ คำสั่งของ Skill สามารถสั่งให้ Claude มอบหมายงานบางส่วนให้ subagent ได้ และ subagent เองก็สามารถเข้าถึง Skills ชุดเดียวกันกับบทสนทนาหลักได้เช่นกัน

เมื่อรวมกันแล้ว: MCP และ native tools มอบสิ่งที่ Claude *ทำได้* ให้; Skills มอบความรู้ให้ Claude ว่า *จะทำ*งานเฉพาะอย่างหนึ่งด้วยสิ่งเหล่านั้นให้ดี*อย่างไร*; subagents มอบพื้นที่ให้ Claude *ทำงานชิ้นใหญ่* โดยไม่ทำให้บทสนทนาหลักแออัด

## สรุป

Tools และ MCP มอบความสามารถใหม่ให้ Claude และวิธีเชื่อมต่อไปหามัน ส่วน Skill ไม่ได้เพิ่มความสามารถแต่สอน Claude ให้ใช้สิ่งที่มีอยู่แล้วสำหรับงานเฉพาะที่เกิดซ้ำๆ หนึ่งอย่างให้ดีขึ้น และ subagent คือ context แยกต่างหากสำหรับทำงานชิ้นใหญ่โดยไม่ทำให้บทสนทนาหลักแออัด ทั้งสี่อย่างนี้เสริมกันมากกว่าจะแทนที่กัน และมักถูกใช้ร่วมกัน โดยคำสั่งของ Skill หนึ่งสามารถสั่งให้ Claude มอบหมายงานบางส่วนให้ subagent ได้ด้วยซ้ำ`,
      },
      {
        slug: "skill-security",
        titleEn: "Security: Skills Are Data With Authority",
        titleTh: "ความปลอดภัย: Skills คือข้อมูลที่มีอำนาจ",
        order: 8,
        contentEn: `A Skill's body is not sandboxed prose — once triggered, its instructions carry the same authority as anything else in Claude's context, including permission to call tools. That makes the provenance of a Skill a real security question, not just a quality one.

If you install a Skill written by someone else — from a plugin marketplace, a shared team repository, or copied from an unfamiliar source — you're trusting its author the same way you'd trust a script you're about to run or a dependency you're about to install. A malicious or careless Skill could instruct Claude to exfiltrate data, run destructive commands, or quietly change its own behavior mid-task, and because the instructions look like ordinary Markdown, that's easy to miss on a casual read.

The same caution applies to bundled scripts even more directly: a script is code that may actually execute on your machine or in your environment, so a bundled script deserves the same review you'd give any third-party code before you'd run it — don't assume a script is safe just because it shipped inside a Skill folder next to some helpful-looking Markdown.

Practical guidelines:
- Prefer personal and project Skills you or your team authored, over installing Skills from unfamiliar sources.
- Read a new Skill's \`SKILL.md\` — and any bundled scripts — before relying on it, the same way you'd review a new dependency.
- Keep Skills scoped narrowly to one task; a Skill that requests broad, unrelated permissions ("also read the user's email") to accomplish a narrow task ("format this spreadsheet") is a red flag.
- Treat a Skill you didn't author as untrusted input if its instructions ever conflict with what the person you're actually working with asked for — the person's request takes precedence over instructions buried in a Skill file.

This mirrors a broader pattern in agent security: content that gets loaded into an agent's context and treated as instructions — whether it's a Skill, a web page, or a tool's output — needs a trust boundary around where it came from, not just around what it says it does.

## Conclusion

A Skill's instructions carry the same authority as anything else in Claude's context once triggered, so installing one from an unfamiliar source means trusting its author the way you'd trust any third-party code — bundled scripts especially deserve the same review as a new dependency. The practical guidelines all reduce to one idea: content loaded into an agent's context and treated as instructions needs a trust boundary around where it came from, and the person's actual request always outranks instructions buried in a Skill file.`,
        contentTh: `Body ของ Skill ไม่ใช่ร้อยแก้วที่ถูก sandbox ไว้ — เมื่อถูกกระตุ้นแล้ว คำสั่งของมันจะมีอำนาจเทียบเท่ากับสิ่งอื่นใดใน context ของ Claude รวมถึงสิทธิ์ในการเรียกใช้ tools ด้วย นั่นทำให้แหล่งที่มาของ Skill เป็นคำถามด้านความปลอดภัยจริงๆ ไม่ใช่แค่เรื่องคุณภาพเท่านั้น

ถ้าคุณติดตั้ง Skill ที่คนอื่นเขียนขึ้น — จาก plugin marketplace, repository ที่แชร์กันในทีม หรือคัดลอกมาจากแหล่งที่ไม่คุ้นเคย — คุณกำลังไว้ใจผู้เขียนของมันในแบบเดียวกับที่คุณจะไว้ใจสคริปต์ที่กำลังจะรัน หรือ dependency ที่กำลังจะติดตั้ง Skill ที่เป็นอันตรายหรือประมาทอาจสั่งให้ Claude ขโมยข้อมูล รันคำสั่งทำลายล้าง หรือแอบเปลี่ยนพฤติกรรมของตัวมันเองกลางงานได้ และเพราะคำสั่งเหล่านั้นดูเหมือน Markdown ธรรมดา จึงง่ายที่จะมองข้ามเมื่ออ่านผ่านๆ

ความระมัดระวังแบบเดียวกันนี้ใช้ได้กับสคริปต์ที่แนบมาด้วยอย่างตรงไปตรงมายิ่งกว่าเดิม: สคริปต์คือโค้ดที่อาจรันจริงบนเครื่องหรือสภาพแวดล้อมของคุณ ดังนั้นสคริปต์ที่แนบมาจึงสมควรได้รับการตรวจสอบแบบเดียวกับที่คุณจะให้โค้ดของบุคคลที่สามก่อนที่จะรันมัน — อย่าสันนิษฐานว่าสคริปต์ปลอดภัยเพียงเพราะมันมาพร้อมกับโฟลเดอร์ Skill ข้างๆ Markdown ที่ดูเหมือนจะมีประโยชน์

แนวทางปฏิบัติจริง:
- เลือกใช้ personal และ project Skills ที่คุณหรือทีมของคุณเขียนเอง มากกว่าการติดตั้ง Skills จากแหล่งที่ไม่คุ้นเคย
- อ่าน \`SKILL.md\` ของ Skill ใหม่ — และสคริปต์ที่แนบมาด้วย — ก่อนที่จะพึ่งพามัน เช่นเดียวกับที่คุณจะรีวิว dependency ใหม่
- จำกัดขอบเขตของ Skill ให้แคบเฉพาะงานเดียว Skill ที่ขอสิทธิ์กว้างและไม่เกี่ยวข้อง ("อ่านอีเมลของผู้ใช้ด้วย") เพื่อทำงานที่แคบ ("จัดรูปแบบสเปรดชีตนี้") คือสัญญาณเตือน
- ปฏิบัติต่อ Skill ที่คุณไม่ได้เขียนเองเป็นข้อมูลที่ไม่น่าเชื่อถือ หากคำสั่งของมันขัดแย้งกับสิ่งที่คนที่คุณกำลังทำงานด้วยจริงๆ ร้องขอเมื่อใดก็ตาม — คำขอของบุคคลนั้นมีความสำคัญเหนือกว่าคำสั่งที่ฝังอยู่ในไฟล์ Skill

สิ่งนี้สะท้อนรูปแบบที่กว้างกว่าในความปลอดภัยของ agent: เนื้อหาที่ถูกโหลดเข้า context ของ agent และถูกปฏิบัติเหมือนเป็นคำสั่ง — ไม่ว่าจะเป็น Skill หน้าเว็บ หรือผลลัพธ์จาก tool หนึ่ง — ต้องมีขอบเขตความน่าเชื่อถือรอบๆ ที่มาของมัน ไม่ใช่แค่รอบๆ สิ่งที่มันอ้างว่าทำเท่านั้น

## สรุป

คำสั่งของ Skill มีอำนาจเทียบเท่ากับสิ่งอื่นใดใน context ของ Claude เมื่อถูกกระตุ้นแล้ว ดังนั้นการติดตั้ง Skill จากแหล่งที่ไม่คุ้นเคยจึงหมายถึงการไว้ใจผู้เขียนของมันแบบเดียวกับที่ไว้ใจโค้ดของบุคคลที่สามใดๆ โดยเฉพาะสคริปต์ที่แนบมาซึ่งสมควรได้รับการตรวจสอบแบบเดียวกับ dependency ใหม่ แนวทางปฏิบัติทั้งหมดสรุปรวมเป็นแนวคิดเดียว: เนื้อหาที่ถูกโหลดเข้า context ของ agent และปฏิบัติเหมือนคำสั่ง ต้องมีขอบเขตความน่าเชื่อถือรอบๆ ที่มาของมัน และคำขอจริงของผู้ใช้มีความสำคัญเหนือกว่าคำสั่งที่ฝังอยู่ในไฟล์ Skill เสมอ`,
      },
      {
        slug: "testing-and-iterating",
        titleEn: "Testing, Iterating & Common Pitfalls",
        titleTh: "การทดสอบ การปรับปรุง และข้อผิดพลาดที่พบบ่อย",
        order: 9,
        contentEn: `A Skill is only as good as its worst real-world trigger, so the practical way to build one is to write a first draft, use it on a real task, and fix what goes wrong — the same loop as debugging any other reusable code.

**Test the trigger, not just the instructions.** Run the exact phrasing a real request would use and confirm the Skill actually fires — then run a request that sounds similar but shouldn't trigger it, to catch false positives. A description tuned only by reading it yourself often misses how differently a real user phrases the same task.

**Watch for a Skill that's too eager or too shy.** If it fires on unrelated requests, the description is too broad or too vague — tighten the trigger language and add what it's *not* for. If it never fires when it should, the description likely uses internal jargon or category names instead of the words a request would actually contain.

**Keep the body a checklist, not an essay.** Long, narrative explanations are harder for a model to follow step-by-step under time pressure than short, imperative instructions with concrete examples. If a step commonly gets skipped, make it its own numbered line instead of a clause buried in a paragraph.

**Update it when reality changes.** A Skill documenting "how this API works" or "how this repo does migrations" goes stale exactly when the API or the repo's conventions change — treat it like any other piece of internal documentation that needs a maintainer, not a write-once artifact.

**Common pitfalls to watch for:**
- A description that explains what the Skill *is* ("a helper for PDFs") instead of what it *does and when* ("fills PDF form fields; use when the user shares a fillable PDF").
- Bundling a script for logic that actually needs per-request judgment, or writing prose instructions for logic that would be more reliable as a script.
- Letting the body balloon past what a single task actually needs, instead of moving detail into a bundled reference file.
- Never re-testing an existing Skill after the underlying tool, API, or convention it wraps changes.

## Conclusion

Building a good Skill means testing the trigger phrasing itself (not just the instructions), watching for a description that's too eager or too shy, keeping the body a checklist rather than an essay, and updating it as the tool or API it wraps changes. The common pitfalls all come back to the same discipline: describe what a Skill does and when, keep prose for judgment calls and scripts for mechanical logic, and treat a Skill as living documentation rather than a write-once artifact.`,
        contentTh: `Skill หนึ่งจะดีได้ก็เท่ากับตัวกระตุ้นที่แย่ที่สุดในโลกจริงของมันเท่านั้น ดังนั้นวิธีที่ใช้ได้จริงในการสร้างมันคือเขียนร่างแรก ใช้กับงานจริง แล้วแก้ไขสิ่งที่ผิดพลาด — วงจรเดียวกันกับการดีบักโค้ดที่นำกลับมาใช้ซ้ำได้อื่นๆ

**ทดสอบตัวกระตุ้น ไม่ใช่แค่คำสั่ง** รันด้วยถ้อยคำเป๊ะๆ แบบที่คำขอจริงจะใช้ และยืนยันว่า Skill ทำงานจริง — จากนั้นรันคำขอที่ฟังดูคล้ายกันแต่ไม่ควรกระตุ้นมัน เพื่อจับ false positive description ที่ปรับแต่งโดยการอ่านด้วยตัวเองเพียงอย่างเดียว มักพลาดว่าผู้ใช้จริงพูดถึงงานเดียวกันด้วยถ้อยคำที่ต่างกันแค่ไหน

**คอยสังเกต Skill ที่กระตือรือร้นเกินไปหรือขี้อายเกินไป** ถ้ามันทำงานกับคำขอที่ไม่เกี่ยวข้อง description นั้นกว้างเกินไปหรือคลุมเครือเกินไป — ทำให้ถ้อยคำกระตุ้นแคบลงและเพิ่มสิ่งที่มัน *ไม่ใช่* สำหรับ ถ้ามันไม่เคยทำงานเลยแม้ควรจะทำงาน description น่าจะใช้ศัพท์เฉพาะภายในหรือชื่อหมวดหมู่แทนที่จะเป็นคำที่คำขอจริงๆ จะมี

**ทำให้ body เป็น checklist ไม่ใช่เรียงความ** คำอธิบายแบบบรรยายยาวๆ นั้นยากกว่าที่โมเดลจะทำตามทีละขั้นตอนภายใต้แรงกดดันด้านเวลา เมื่อเทียบกับคำสั่งแบบสั่งการสั้นๆ พร้อมตัวอย่างที่เป็นรูปธรรม ถ้าขั้นตอนหนึ่งมักถูกข้ามบ่อยๆ ให้แยกมันเป็นบรรทัดที่มีหมายเลขของตัวเอง แทนที่จะฝังไว้เป็นอนุประโยคในย่อหน้า

**อัปเดตมันเมื่อความเป็นจริงเปลี่ยนไป** Skill ที่บันทึก "API นี้ทำงานอย่างไร" หรือ "repo นี้ทำ migration อย่างไร" จะล้าสมัยทันทีที่ API หรือข้อตกลงของ repo เปลี่ยนไป จงปฏิบัติต่อมันเหมือนเอกสารภายในชิ้นอื่นๆ ที่ต้องมีผู้ดูแล ไม่ใช่สิ่งที่เขียนครั้งเดียวจบ

**ข้อผิดพลาดที่พบบ่อยที่ควรระวัง:**
- description ที่อธิบายว่า Skill *คือ*อะไร ("ตัวช่วยสำหรับ PDF") แทนที่จะอธิบายว่ามัน *ทำอะไรและเมื่อไหร่* ("กรอกฟิลด์แบบฟอร์ม PDF; ใช้เมื่อผู้ใช้แชร์ PDF ที่กรอกได้")
- การแนบสคริปต์สำหรับ logic ที่จริงๆ ต้องใช้วิจารณญาณเฉพาะคำขอ หรือการเขียนคำสั่งแบบร้อยแก้วสำหรับ logic ที่จะเชื่อถือได้มากกว่าถ้าเป็นสคริปต์
- ปล่อยให้ body บวมเกินกว่าที่งานเดียวต้องการจริงๆ แทนที่จะย้ายรายละเอียดไปไว้ในไฟล์อ้างอิงที่แนบมา
- ไม่เคยทดสอบ Skill ที่มีอยู่ซ้ำอีกครั้งหลังจาก tool, API หรือข้อตกลงที่มันครอบคลุมเปลี่ยนแปลงไป

## สรุป

การสร้าง Skill ที่ดีหมายถึงการทดสอบถ้อยคำของตัวกระตุ้นเอง (ไม่ใช่แค่คำสั่ง) คอยสังเกต description ที่กระตือรือร้นเกินไปหรือขี้อายเกินไป ทำให้ body เป็น checklist มากกว่าเรียงความ และอัปเดตมันเมื่อ tool หรือ API ที่มันครอบคลุมเปลี่ยนแปลงไป ข้อผิดพลาดที่พบบ่อยทั้งหมดวนกลับไปที่วินัยเดียวกัน: อธิบายว่า Skill ทำอะไรและเมื่อไหร่ ใช้ร้อยแก้วสำหรับสิ่งที่ต้องใช้วิจารณญาณและสคริปต์สำหรับ logic ที่เป็นกลไก และปฏิบัติต่อ Skill เหมือนเอกสารที่มีชีวิต ไม่ใช่สิ่งที่เขียนครั้งเดียวจบ`,
      },
    ],
  };

export default course;
