import type { SeedCourse } from "./types";

const course: SeedCourse = {
    slug: "typescript-tooling",
    title: "TypeScript Tooling",
    descriptionEn: "Configuring and running the TypeScript compiler, editors, and linters effectively.",
        descriptionTh:
      "การตั้งค่าและใช้งานคอมไพเลอร์ของ TypeScript, editor และ linter อย่างมีประสิทธิภาพ",
lessons: [
      {
        slug: "tsconfig-essentials",
        titleEn: "tsconfig.json Essentials",
        titleTh: "พื้นฐานของ tsconfig.json",
        order: 1,
        contentEn: `tsconfig.json configures the TypeScript compiler for a project. Running tsc --init generates a starter file. The most important field is compilerOptions.

target sets which JS version tsc compiles down to (e.g. "ES2020"); module sets the module system ("ESNext", "CommonJS", "NodeNext"). strict: true enables the full set of strict type-checking flags (strictNullChecks, noImplicitAny, strictFunctionTypes, etc.) and is strongly recommended for new projects — it's far easier to start strict than to retrofit strictness later.

outDir and rootDir control where compiled output goes and what the source root is. include and exclude (top-level, not inside compilerOptions) control which files are part of the program — exclude commonly lists node_modules and dist.

For projects that only use TypeScript for type-checking (with bundlers like esbuild, swc, or Bun handling actual compilation), noEmit: true tells tsc to check types without writing output files.

## Conclusion

tsconfig.json centralizes a project's compiler settings, with compilerOptions like target, module, and strict controlling how code is checked and compiled, and include/exclude controlling which files are part of the program. noEmit lets projects that rely on a separate bundler use tsc purely for type-checking.`,
        contentTh: `tsconfig.json คือไฟล์ที่ใช้ตั้งค่าคอมไพเลอร์ของ TypeScript สำหรับโปรเจกต์หนึ่งๆ การรัน tsc --init จะสร้างไฟล์เริ่มต้นให้ โดย field ที่สำคัญที่สุดคือ compilerOptions

target กำหนดว่า tsc จะ compile ลงไปเป็น JavaScript เวอร์ชันไหน (เช่น "ES2020") ส่วน module กำหนดระบบ module ที่ใช้ ("ESNext", "CommonJS", "NodeNext") การตั้งค่า strict: true จะเปิดใช้งาน flag การตรวจสอบชนิดข้อมูลแบบเข้มงวดทั้งชุด (strictNullChecks, noImplicitAny, strictFunctionTypes ฯลฯ) และเป็นสิ่งที่แนะนำอย่างยิ่งสำหรับโปรเจกต์ใหม่ — เพราะเริ่มต้นแบบ strict ตั้งแต่แรกนั้นง่ายกว่าการย้อนกลับมาทำให้ strict ทีหลังมาก

outDir และ rootDir ใช้ควบคุมว่าผลลัพธ์ที่ compile แล้วจะไปอยู่ที่ไหน และอะไรคือ root ของ source code ส่วน include และ exclude (อยู่ระดับบนสุด ไม่ได้อยู่ใน compilerOptions) ใช้ควบคุมว่าไฟล์ไหนบ้างที่นับเป็นส่วนหนึ่งของโปรแกรม — exclude มักจะระบุ node_modules และ dist ไว้เป็นปกติ

สำหรับโปรเจกต์ที่ใช้ TypeScript แค่เพื่อตรวจสอบชนิดข้อมูลเท่านั้น (โดยให้ bundler อย่าง esbuild, swc หรือ Bun เป็นตัวจัดการการ compile จริงๆ) การตั้งค่า noEmit: true จะบอกให้ tsc ตรวจสอบชนิดข้อมูลโดยไม่ต้องเขียนไฟล์ผลลัพธ์ออกมา

## สรุป

tsconfig.json รวมการตั้งค่าคอมไพเลอร์ของโปรเจกต์ไว้ในที่เดียว โดย compilerOptions อย่าง target, module และ strict ควบคุมว่าโค้ดจะถูกตรวจสอบและ compile อย่างไร ส่วน include/exclude ควบคุมว่าไฟล์ไหนบ้างที่นับเป็นส่วนหนึ่งของโปรแกรม noEmit ช่วยให้โปรเจกต์ที่พึ่งพา bundler แยกต่างหากสามารถใช้ tsc เพื่อตรวจสอบชนิดข้อมูลได้อย่างเดียวเท่านั้น`,
      },
      {
        slug: "the-typescript-compiler",
        titleEn: "The TypeScript Compiler (tsc)",
        titleTh: "TypeScript Compiler (tsc)",
        order: 2,
        contentEn: `tsc is the TypeScript compiler CLI. Run it with no arguments in a project with a tsconfig.json to type-check and compile the whole project according to that config. tsc --noEmit type-checks without producing output — commonly used as a CI step or pre-commit check.

tsc --watch re-runs type-checking incrementally whenever a file changes, which is much faster than a full re-check on large projects because tsc caches information between runs.

tsc file.ts compiles a single file directly, ignoring tsconfig.json unless you also pass config-relevant flags. This is rarely used in real projects — prefer the project-wide config-driven mode.

Project references (composite: true plus "references": [{ "path": "../otherPackage" }] in tsconfig.json) let you split a large codebase into independently type-checked, incrementally built sub-projects — useful in monorepos.

## Conclusion

tsc is the TypeScript compiler CLI, most commonly run project-wide via tsconfig.json rather than on single files — with --noEmit for type-checking only and --watch for fast incremental re-checks. Project references extend this to large codebases, letting independently built sub-projects share one monorepo.`,
        contentTh: `tsc คือ CLI ของคอมไพเลอร์ TypeScript การรันมันโดยไม่ใส่ argument ใดๆ ในโปรเจกต์ที่มี tsconfig.json จะเป็นการตรวจสอบชนิดข้อมูลและ compile ทั้งโปรเจกต์ตามการตั้งค่านั้น ส่วน tsc --noEmit จะตรวจสอบชนิดข้อมูลโดยไม่สร้างผลลัพธ์ออกมา — มักใช้เป็นขั้นตอนหนึ่งใน CI หรือเป็น pre-commit check

tsc --watch จะรันการตรวจสอบชนิดข้อมูลใหม่แบบ incremental ทุกครั้งที่มีไฟล์เปลี่ยนแปลง ซึ่งเร็วกว่าการตรวจสอบใหม่ทั้งหมดในโปรเจกต์ขนาดใหญ่มาก เพราะ tsc จะแคชข้อมูลไว้ระหว่างการรันแต่ละครั้ง

tsc file.ts จะ compile ไฟล์เดียวโดยตรง โดยไม่สนใจ tsconfig.json เลย เว้นแต่คุณจะใส่ flag ที่เกี่ยวข้องกับการตั้งค่าเพิ่มเข้าไปด้วย วิธีนี้แทบไม่ถูกใช้ในโปรเจกต์จริง — ควรใช้โหมดที่ขับเคลื่อนด้วย config ทั้งโปรเจกต์แทน

Project references (การตั้งค่า composite: true ร่วมกับ "references": [{ "path": "../otherPackage" }] ใน tsconfig.json) ช่วยให้คุณแบ่งโค้ดเบสขนาดใหญ่ออกเป็นโปรเจกต์ย่อยที่ตรวจสอบชนิดข้อมูลและ build แบบ incremental ได้อย่างอิสระจากกัน — มีประโยชน์มากในโปรเจกต์แบบ monorepo

## สรุป

tsc คือ CLI ของคอมไพเลอร์ TypeScript ซึ่งมักถูกรันแบบทั้งโปรเจกต์ผ่าน tsconfig.json มากกว่าจะรันทีละไฟล์ — โดยใช้ --noEmit เมื่อต้องการแค่ตรวจสอบชนิดข้อมูล และ --watch เพื่อตรวจสอบใหม่แบบ incremental ที่รวดเร็ว Project references ต่อยอดแนวคิดนี้ไปสู่โค้ดเบสขนาดใหญ่ ทำให้โปรเจกต์ย่อยที่ build แยกจากกันสามารถอยู่ร่วมกันใน monorepo เดียวได้`,
      },
      {
        slug: "editor-integration",
        titleEn: "Editor Integration & the Language Server",
        titleTh: "Editor Integration และ Language Server",
        order: 3,
        contentEn: `TypeScript ships a language server (tsserver) that editors talk to over a JSON-based protocol to provide autocomplete, hover types, inline errors, "go to definition", "find all references", and automated refactors like renaming a symbol project-wide.

VS Code bundles a version of TypeScript and uses tsserver out of the box; other editors (Neovim, JetBrains IDEs, Sublime) use it via a Language Server Protocol (LSP) adapter. The editor's TypeScript version can differ from the project's — mismatches show up as inconsistent errors between the editor and a manual tsc run, so pinning and using the workspace's local TypeScript version is recommended.

Inline errors from the editor come directly from the same type checker tsc uses, so "no red squiggles" is a reasonable (though not complete) proxy for "tsc --noEmit would pass" — background compilation errors and stricter batch-mode checks can still differ slightly from live editor state.

## Conclusion

The TypeScript language server (tsserver) powers editor features like autocomplete, inline errors, and project-wide renames over a shared JSON protocol, with most editors connecting to it via an LSP adapter. Since inline errors come from the same type checker tsc uses, a clean editor is a reasonable — though not perfect — proxy for a clean tsc --noEmit run.`,
        contentTh: `TypeScript มาพร้อมกับ language server (tsserver) ที่ editor จะสื่อสารด้วยผ่านโปรโตคอลแบบ JSON เพื่อให้บริการ autocomplete, การแสดงชนิดข้อมูลเมื่อ hover, error แบบ inline, ฟีเจอร์ "go to definition", "find all references" และการ refactor อัตโนมัติ เช่น การ rename symbol ทั้งโปรเจกต์

VS Code มาพร้อมกับ TypeScript เวอร์ชันหนึ่งในตัวและใช้ tsserver ได้ทันทีโดยไม่ต้องตั้งค่าเพิ่ม ส่วน editor อื่นๆ (Neovim, JetBrains IDE, Sublime) จะใช้งานผ่าน adapter ของ Language Server Protocol (LSP) เวอร์ชัน TypeScript ที่ editor ใช้อาจแตกต่างจากเวอร์ชันของโปรเจกต์ได้ — ความไม่ตรงกันนี้จะแสดงออกมาเป็น error ที่ไม่สอดคล้องกันระหว่าง editor กับการรัน tsc ด้วยมือ ดังนั้นจึงแนะนำให้ pin และใช้เวอร์ชัน TypeScript ในเครื่องของ workspace นั้นๆ

Error แบบ inline ที่ editor แสดงมาจาก type checker ตัวเดียวกับที่ tsc ใช้โดยตรง ดังนั้น "ไม่มีขีดหยักสีแดง" จึงเป็นตัวชี้วัดที่พอใช้ได้ (แม้จะไม่สมบูรณ์แบบ) ว่า "tsc --noEmit จะผ่าน" — error จากการ compile เบื้องหลังและการตรวจสอบแบบ batch-mode ที่เข้มงวดกว่ายังคงอาจแตกต่างไปจากสถานะของ editor สดๆ ได้เล็กน้อย

## สรุป

Language server ของ TypeScript (tsserver) เป็นตัวขับเคลื่อนฟีเจอร์ต่างๆ ใน editor เช่น autocomplete, error แบบ inline และการ rename ทั้งโปรเจกต์ ผ่านโปรโตคอล JSON ที่ใช้ร่วมกัน โดย editor ส่วนใหญ่เชื่อมต่อผ่าน adapter ของ LSP เนื่องจาก error แบบ inline มาจาก type checker ตัวเดียวกับที่ tsc ใช้ editor ที่ไม่มี error ใดๆ จึงเป็นตัวชี้วัดที่พอใช้ได้ — แม้จะไม่สมบูรณ์แบบ — ว่าการรัน tsc --noEmit จะผ่าน`,
      },
      {
        slug: "linting-with-eslint",
        titleEn: "Linting with ESLint + typescript-eslint",
        titleTh: "Linting ด้วย ESLint + typescript-eslint",
        order: 4,
        contentEn: `TypeScript's compiler catches type errors, but not style or correctness issues like unused variables, inconsistent naming, or unsafe patterns (e.g. floating promises). ESLint fills that gap, and typescript-eslint provides the parser and rule set needed to lint TypeScript syntax and use type information in rules.

A typical setup installs eslint, typescript-eslint, and configures eslint.config.js (flat config) to extend typescript-eslint's recommended rule sets. Type-aware rules (e.g. no-floating-promises, no-unsafe-assignment) require pointing ESLint at your tsconfig.json so it can build a full type-checked program — these rules are slower but catch real bugs that non-type-aware linting can't.

Formatting (indentation, quote style, line length) is usually delegated to Prettier rather than ESLint, since ESLint's style rules and Prettier can conflict; eslint-config-prettier disables ESLint's formatting rules so the two tools don't fight.

## Conclusion

ESLint with typescript-eslint fills the gap tsc's type checker leaves open — style and correctness issues like unused variables or floating promises — with type-aware rules that need ESLint pointed at the project's tsconfig.json to work. Formatting is usually left to Prettier instead, with eslint-config-prettier keeping the two tools from fighting over style rules.`,
        contentTh: `คอมไพเลอร์ของ TypeScript จะดักจับ error เกี่ยวกับชนิดข้อมูล แต่ไม่ได้ดักจับปัญหาเรื่อง style หรือความถูกต้องของโค้ด เช่น ตัวแปรที่ไม่ได้ใช้, การตั้งชื่อที่ไม่สอดคล้องกัน หรือ pattern ที่ไม่ปลอดภัย (เช่น floating promise) ESLint จะมาเติมเต็มช่องว่างตรงนี้ และ typescript-eslint จะให้ parser และชุด rule ที่จำเป็นสำหรับ lint syntax ของ TypeScript รวมถึงใช้ข้อมูลชนิดข้อมูลใน rule ต่างๆ ได้ด้วย

การตั้งค่าทั่วไปคือติดตั้ง eslint, typescript-eslint แล้วตั้งค่าไฟล์ eslint.config.js (flat config) ให้ extend ชุด rule ที่ typescript-eslint แนะนำไว้ Rule ที่ต้องพึ่งพาข้อมูลชนิดข้อมูล (type-aware) เช่น no-floating-promises, no-unsafe-assignment จำเป็นต้องชี้ ESLint ไปที่ tsconfig.json ของคุณ เพื่อให้มันสร้างโปรแกรมที่ผ่านการตรวจสอบชนิดข้อมูลแบบเต็มรูปแบบได้ — rule กลุ่มนี้จะทำงานช้ากว่า แต่สามารถดักจับบั๊กจริงๆ ที่การ lint แบบไม่รู้จัก type ทำไม่ได้

เรื่องการจัดรูปแบบโค้ด (formatting) เช่น การเว้นวรรค, สไตล์ของเครื่องหมายคำพูด, ความยาวบรรทัด มักจะถูกส่งต่อให้ Prettier จัดการแทนที่จะใช้ ESLint เพราะ rule ด้าน style ของ ESLint อาจขัดแย้งกับ Prettier ได้ eslint-config-prettier จะปิด rule ด้านการจัดรูปแบบของ ESLint เพื่อไม่ให้เครื่องมือทั้งสองตัวทำงานขัดกันเอง

## สรุป

ESLint ร่วมกับ typescript-eslint เข้ามาเติมเต็มช่องว่างที่ type checker ของ tsc ไม่ได้ครอบคลุม — ปัญหาด้าน style และความถูกต้องของโค้ด เช่น ตัวแปรที่ไม่ได้ใช้ หรือ floating promise — โดย rule แบบ type-aware ต้องการให้ ESLint ชี้ไปที่ tsconfig.json ของโปรเจกต์จึงจะทำงานได้ ส่วนการจัดรูปแบบโค้ดมักปล่อยให้ Prettier จัดการแทน โดย eslint-config-prettier ช่วยไม่ให้เครื่องมือทั้งสองขัดแย้งกันเรื่อง style rule`,
      },
    ],
  };

export default course;
