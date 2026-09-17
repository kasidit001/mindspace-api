export interface SeedLesson {
  slug: string;
  titleEn: string;
  /** Thai translation. Optional — lessons without one fall back to English (see Lesson model). */
  titleTh?: string;
  order: number;
  contentEn: string;
  /** Thai translation. Optional — lessons without one fall back to English (see Lesson model). */
  contentTh?: string;
}

export interface SeedCourse {
  slug: string;
  title: string;
  descriptionEn: string;
  /** Thai translation. Optional — courses without one fall back to English (see Course model). */
  descriptionTh?: string;
  lessons: SeedLesson[];
}

export const seedCourses: SeedCourse[] = [
  {
    slug: "typescript-for-js-programmers",
    title: "TypeScript for JS Programmers",
    descriptionEn: "A fast on-ramp to TypeScript for developers who already know JavaScript.",
    lessons: [
      {
        slug: "why-typescript",
        titleEn: "Why TypeScript",
        order: 1,
        contentEn: `TypeScript is a superset of JavaScript that adds a static type system. Every valid JavaScript program is (almost) valid TypeScript — you opt in to types incrementally rather than rewriting your codebase.

The core value is catching a class of bugs — wrong argument types, typos in property names, calling a function with too few arguments, forgetting to handle a null case — at compile time instead of at runtime in production. The TypeScript compiler (tsc) reads your code, infers or checks types, and reports errors before the code ever runs.

TypeScript also powers editor tooling: autocomplete, inline documentation, "go to definition", and safe renames all rely on the type information TypeScript computes. This is often the biggest day-to-day win — better tooling, not just fewer bugs.

Crucially, types are erased at compile time. TypeScript emits plain JavaScript with no runtime type-checking overhead — the type system is a development-time tool only.`,
      },
      {
        slug: "basic-types",
        titleEn: "Basic Types",
        order: 2,
        contentEn: `TypeScript's basic types mirror JavaScript's primitives: string, number, boolean, null, undefined, bigint, and symbol. You annotate a variable's type with a colon: let age: number = 30;.

Arrays are written as type[] or Array<type>, e.g. let names: string[] = ["Ada", "Grace"];. Tuples are fixed-length arrays with known types per position: let pair: [string, number] = ["x", 1];.

The any type disables type checking for a value — useful as an escape hatch, but it defeats the purpose of TypeScript if overused. unknown is the type-safe counterpart: you can assign anything to an unknown value, but you must narrow it (with a type guard) before using it.

void describes a function that returns nothing meaningful. never describes a value that can never occur — e.g. the return type of a function that always throws or loops forever. TypeScript can often infer types without explicit annotations; this is called type inference, and relying on it for local variables is idiomatic.`,
      },
      {
        slug: "interfaces-and-type-aliases",
        titleEn: "Interfaces & Type Aliases",
        order: 3,
        contentEn: `Interfaces describe the shape of an object: interface User { id: string; name: string; age?: number }. The ? marks age as optional. A value satisfies an interface if it has at least those properties with compatible types — TypeScript uses structural typing, not nominal typing, so unrelated types with the same shape are interchangeable.

Type aliases (type User = { id: string; name: string }) can describe the same object shapes, plus unions, tuples, and primitives that interfaces cannot: type ID = string | number;. In practice, use interface for object shapes you expect to be extended or implemented by classes, and type for unions, tuples, or mapped/utility types.

Interfaces support declaration merging — declaring the same interface twice merges their members — and extends for inheritance: interface Admin extends User { role: string }. Type aliases use intersection (&) instead: type Admin = User & { role: string };.

readonly properties (readonly id: string) prevent reassignment after creation, which is useful for immutable data structures.`,
      },
      {
        slug: "functions",
        titleEn: "Functions",
        order: 4,
        contentEn: `Function parameters and return values can be typed explicitly: function add(a: number, b: number): number { return a + b; }. TypeScript infers the return type from the function body when omitted, so explicit return types are mostly for documentation and to catch unintended type changes.

Optional parameters use ?: function greet(name: string, title?: string) {}. Default parameters (function greet(name: string, title = "Friend")) are automatically treated as optional.

Function types can be written as a standalone type: type BinaryOp = (a: number, b: number) => number;. This is how you type callbacks and higher-order functions, e.g. function apply(op: BinaryOp, a: number, b: number) { return op(a, b); }.

Overloads let a function have multiple valid call signatures with different parameter/return types, useful when a function's behavior genuinely varies by input shape rather than by a simple union type.`,
      },
      {
        slug: "generics",
        titleEn: "Generics",
        order: 5,
        contentEn: `Generics let you write reusable code that works over a variety of types while preserving type information, instead of falling back to any. A generic function identity<T>(value: T): T { return value; } returns exactly the type it was given — identity(5) is typed number, identity("x") is typed string.

Generic constraints (extends) restrict what a type parameter can be: function getLength<T extends { length: number }>(item: T) { return item.length; } — this accepts arrays, strings, or any object with a numeric length property.

Generics apply to interfaces, type aliases, and classes too: interface Box<T> { value: T }, class Stack<T> { push(item: T): void {} }. This is how built-in types like Array<T>, Promise<T>, and Map<K, V> are defined.

Default type parameters (function wrap<T = string>(value: T)) let callers omit the generic argument when a sensible default exists.`,
      },
      {
        slug: "union-types-and-narrowing",
        titleEn: "Union Types & Narrowing",
        order: 6,
        contentEn: `A union type (type Id = string | number;) means a value can be one of several types. TypeScript only allows operations that are valid for every member of the union until you narrow it to a more specific type.

Narrowing happens through control flow: typeof checks (if (typeof id === "string")), instanceof checks, Array.isArray, truthiness checks, and equality checks against literal types all narrow a union within the branch where the check holds.

Discriminated unions use a shared literal-typed field to distinguish variants: type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };. Switching on shape.kind lets TypeScript narrow to the exact variant inside each case, and exhaustiveness checking (via a never-typed default case) catches missing cases at compile time.

Type predicates (function isString(x: unknown): x is string { return typeof x === "string"; }) let you encapsulate a narrowing check in a reusable function that TypeScript understands as a type guard.`,
      },
    ],
  },
  {
    slug: "typescript-tooling",
    title: "TypeScript Tooling",
    descriptionEn: "Configuring and running the TypeScript compiler, editors, and linters effectively.",
    lessons: [
      {
        slug: "tsconfig-essentials",
        titleEn: "tsconfig.json Essentials",
        order: 1,
        contentEn: `tsconfig.json configures the TypeScript compiler for a project. Running tsc --init generates a starter file. The most important field is compilerOptions.

target sets which JS version tsc compiles down to (e.g. "ES2020"); module sets the module system ("ESNext", "CommonJS", "NodeNext"). strict: true enables the full set of strict type-checking flags (strictNullChecks, noImplicitAny, strictFunctionTypes, etc.) and is strongly recommended for new projects — it's far easier to start strict than to retrofit strictness later.

outDir and rootDir control where compiled output goes and what the source root is. include and exclude (top-level, not inside compilerOptions) control which files are part of the program — exclude commonly lists node_modules and dist.

For projects that only use TypeScript for type-checking (with bundlers like esbuild, swc, or Bun handling actual compilation), noEmit: true tells tsc to check types without writing output files.`,
      },
      {
        slug: "the-typescript-compiler",
        titleEn: "The TypeScript Compiler (tsc)",
        order: 2,
        contentEn: `tsc is the TypeScript compiler CLI. Run it with no arguments in a project with a tsconfig.json to type-check and compile the whole project according to that config. tsc --noEmit type-checks without producing output — commonly used as a CI step or pre-commit check.

tsc --watch re-runs type-checking incrementally whenever a file changes, which is much faster than a full re-check on large projects because tsc caches information between runs.

tsc file.ts compiles a single file directly, ignoring tsconfig.json unless you also pass config-relevant flags. This is rarely used in real projects — prefer the project-wide config-driven mode.

Project references (composite: true plus "references": [{ "path": "../otherPackage" }] in tsconfig.json) let you split a large codebase into independently type-checked, incrementally built sub-projects — useful in monorepos.`,
      },
      {
        slug: "editor-integration",
        titleEn: "Editor Integration & the Language Server",
        order: 3,
        contentEn: `TypeScript ships a language server (tsserver) that editors talk to over a JSON-based protocol to provide autocomplete, hover types, inline errors, "go to definition", "find all references", and automated refactors like renaming a symbol project-wide.

VS Code bundles a version of TypeScript and uses tsserver out of the box; other editors (Neovim, JetBrains IDEs, Sublime) use it via a Language Server Protocol (LSP) adapter. The editor's TypeScript version can differ from the project's — mismatches show up as inconsistent errors between the editor and a manual tsc run, so pinning and using the workspace's local TypeScript version is recommended.

Inline errors from the editor come directly from the same type checker tsc uses, so "no red squiggles" is a reasonable (though not complete) proxy for "tsc --noEmit would pass" — background compilation errors and stricter batch-mode checks can still differ slightly from live editor state.`,
      },
      {
        slug: "linting-with-eslint",
        titleEn: "Linting with ESLint + typescript-eslint",
        order: 4,
        contentEn: `TypeScript's compiler catches type errors, but not style or correctness issues like unused variables, inconsistent naming, or unsafe patterns (e.g. floating promises). ESLint fills that gap, and typescript-eslint provides the parser and rule set needed to lint TypeScript syntax and use type information in rules.

A typical setup installs eslint, typescript-eslint, and configures eslint.config.js (flat config) to extend typescript-eslint's recommended rule sets. Type-aware rules (e.g. no-floating-promises, no-unsafe-assignment) require pointing ESLint at your tsconfig.json so it can build a full type-checked program — these rules are slower but catch real bugs that non-type-aware linting can't.

Formatting (indentation, quote style, line length) is usually delegated to Prettier rather than ESLint, since ESLint's style rules and Prettier can conflict; eslint-config-prettier disables ESLint's formatting rules so the two tools don't fight.`,
      },
    ],
  },
  {
    slug: "typescript-oop",
    title: "TypeScript OOP",
    descriptionEn:
      "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of \"objects\", which can contain data and code. TypeScript brings robust, statically-typed OOP features to JavaScript, allowing developers to build scalable and maintainable enterprise applications.",
    descriptionTh:
      "การเขียนโปรแกรมเชิงวัตถุ (Object-Oriented Programming หรือ OOP) เป็นพาราไดม์การเขียนโปรแกรมที่มีพื้นฐานอยู่บนแนวคิดของ \"อ็อบเจกต์\" (objects) ซึ่งสามารถบรรจุทั้งข้อมูลและโค้ดไว้ด้วยกัน TypeScript นำฟีเจอร์ OOP ที่มีระบบชนิดข้อมูลแบบสถิต (static-typed) และแข็งแกร่งมาสู่ JavaScript ทำให้นักพัฒนาสามารถสร้างแอปพลิเคชันระดับองค์กรที่ขยายขนาดได้และดูแลรักษาง่าย",
    lessons: [
      {
        slug: "concept-of-class-and-object",
        titleEn: "Concept of Class & Object",
        titleTh: "แนวคิดของคลาสและอ็อบเจกต์",
        order: 1,
        contentEn: `A class is a blueprint or template for creating objects: it defines structure (data + behavior). It's a logical entity — declaring a class consumes no memory on its own.

An object is a real-world instance of a class. It contains actual values (state) and is a physical entity — memory is allocated only when the object is actually created.

One class can produce many independent objects. A \`Car\` class ("blueprint") can produce an \`Object 1\` ("Red Tesla") and an \`Object 2\` ("Blue BMW") — same structure, different state.

\`\`\`mermaid
graph LR
    Car["class Car<br/>brand: string"] -- "new Car('Tesla')" --> myCar["myCar<br/>brand: 'Tesla'<br/>(real instance)"]
\`\`\`

\`\`\`ts
class Car {
  // Blueprint defined
  brand: string;

  constructor(b: string) {
    this.brand = b;
  }
}

// Memory allocated (Object Creation)
const myCar = new Car('Tesla');
console.log(myCar.brand); // Output: Tesla
\`\`\`

\`Car\` is the class — the blueprint, defining the \`brand\` property. Declaring it allocates no memory by itself; it's only a definition. \`myCar\` is the object — the \`new\` keyword is what triggers instantiation: it allocates memory and runs the constructor, producing a real instance with \`brand\` set to \`"Tesla"\`.`,
        contentTh: `คลาส (class) คือพิมพ์เขียวหรือแม่แบบสำหรับสร้างอ็อบเจกต์ (object) โดยกำหนดโครงสร้าง (ข้อมูล + พฤติกรรม) คลาสเป็นสิ่งที่มีอยู่ในเชิงตรรกะเท่านั้น — การประกาศคลาสไม่ได้ใช้หน่วยความจำแต่อย่างใด

อ็อบเจกต์คืออินสแตนซ์จริงของคลาส มันมีค่าจริง (state) และเป็นสิ่งที่มีอยู่จริงทางกายภาพ — หน่วยความจำจะถูกจัดสรรก็ต่อเมื่ออ็อบเจกต์ถูกสร้างขึ้นจริงเท่านั้น

คลาสหนึ่งตัวสามารถสร้างอ็อบเจกต์อิสระได้หลายตัว เช่น คลาส \`Car\` ("พิมพ์เขียว") สามารถสร้าง \`Object 1\` ("Red Tesla") และ \`Object 2\` ("Blue BMW") ได้ — มีโครงสร้างเหมือนกันแต่มีสถานะต่างกัน

\`\`\`mermaid
graph LR
    Car["class Car<br/>brand: string"] -- "new Car('Tesla')" --> myCar["myCar<br/>brand: 'Tesla'<br/>(real instance)"]
\`\`\`

\`\`\`ts
class Car {
  // Blueprint defined
  brand: string;

  constructor(b: string) {
    this.brand = b;
  }
}

// Memory allocated (Object Creation)
const myCar = new Car('Tesla');
console.log(myCar.brand); // Output: Tesla
\`\`\`

\`Car\` คือคลาส — พิมพ์เขียวที่กำหนด property \`brand\` การประกาศคลาสไม่ได้จัดสรรหน่วยความจำใดๆ ด้วยตัวมันเอง มันเป็นเพียงนิยามเท่านั้น \`myCar\` คืออ็อบเจกต์ — คีย์เวิร์ด \`new\` คือตัวที่ทำให้เกิดการสร้างอินสแตนซ์ (instantiation): มันจัดสรรหน่วยความจำและรันคอนสตรัคเตอร์ (constructor) เพื่อสร้างอินสแตนซ์จริงที่มี \`brand\` เป็น \`"Tesla"\``,
      },
      {
        slug: "fields-and-methods",
        titleEn: "Fields (Properties) & Methods",
        titleTh: "ฟิลด์ (พร็อพเพอร์ตี้) และเมธอด",
        order: 2,
        contentEn: `Inside a class there are two structural components: fields (properties) and methods.

Fields hold state — data mapped to an object, declared with a name and type (e.g. \`name: string;\`). In real-world terms a field is a noun: a car's color or speed.

Methods define behavior — functions that operate on those fields (e.g. \`getName(): string { }\`). A method is a verb: what an object can do, like drive or stop.

| Feature | Fields (Properties) | Methods (Functions) |
| --- | --- | --- |
| Purpose | Hold Data / State | Execute Actions / Behavior |
| Syntax Look | \`name: string;\` | \`getName(): string { }\` |
| Real World | Noun (Color, Speed) | Verb (Drive, Stop) |

\`\`\`ts
class BankAccount {
  // Field
  balance: number = 0;

  // Method
  deposit(amount: number): void {
    this.balance += amount;
  }
}
\`\`\`

\`balance\` is a field — it holds the account's state. \`deposit()\` is a method — the behavior that changes that state, using \`this\` to reference the field on the current instance.`,
        contentTh: `ภายในคลาสมีองค์ประกอบเชิงโครงสร้างอยู่สองส่วน คือ ฟิลด์ (properties) และเมธอด (methods)

ฟิลด์เก็บสถานะ (state) — คือข้อมูลที่ผูกอยู่กับอ็อบเจกต์ ประกาศด้วยชื่อและชนิดข้อมูล (เช่น \`name: string;\`) ในโลกจริง ฟิลด์เปรียบเสมือนคำนาม เช่น สีหรือความเร็วของรถ

เมธอดกำหนดพฤติกรรม — คือฟังก์ชันที่ทำงานกับฟิลด์เหล่านั้น (เช่น \`getName(): string { }\`) เมธอดเปรียบเสมือนคำกริยา คือสิ่งที่อ็อบเจกต์ทำได้ เช่น ขับหรือหยุด

| Feature | Fields (Properties) | Methods (Functions) |
| --- | --- | --- |
| Purpose | เก็บข้อมูล / สถานะ | ทำงาน / พฤติกรรม |
| Syntax Look | \`name: string;\` | \`getName(): string { }\` |
| Real World | คำนาม (สี, ความเร็ว) | คำกริยา (ขับ, หยุด) |

\`\`\`ts
class BankAccount {
  // Field
  balance: number = 0;

  // Method
  deposit(amount: number): void {
    this.balance += amount;
  }
}
\`\`\`

\`balance\` คือฟิลด์ — เก็บสถานะของบัญชี \`deposit()\` คือเมธอด — เป็นพฤติกรรมที่เปลี่ยนสถานะนั้น โดยใช้ \`this\` เพื่ออ้างอิงฟิลด์ของอินสแตนซ์ปัจจุบัน`,
      },
      {
        slug: "interview-summary-class-object",
        titleEn: "Interview & Summary",
        titleTh: "สัมภาษณ์งานและสรุป",
        order: 3,
        contentEn: `**FAANG question:** "What is the difference between a Class and an Interface in TypeScript?"

Expected answer: a class defines both the structure and the actual implementation (data & behavior), and it exists at runtime — it transpiles to real JS. An interface only defines the contract/structure, contains no implementation, and disappears completely during compilation (zero runtime impact).

**Common mistake — forgetting \`this\`:** inside a method, you MUST use \`this.fieldName\` to access a class property. Just typing the field name throws a \`ReferenceError\`.

\`\`\`ts
// WRONG ❌
log() { console.log(name); }

// RIGHT ✅
log() { console.log(this.name); }
\`\`\`

**Revision summary:**
1. Class: the blueprint. Object: an instance of that blueprint.
2. Fields define object state (data) — nouns.
3. Methods define object behavior (functions) — verbs.
4. Use \`new ClassName()\` to allocate memory and create an object.`,
        contentTh: `**คำถามสัมภาษณ์ระดับ FAANG:** "อะไรคือความแตกต่างระหว่าง Class กับ Interface ใน TypeScript?"

คำตอบที่คาดหวัง: คลาสกำหนดทั้งโครงสร้างและ implementation จริง (ข้อมูล + พฤติกรรม) และมีอยู่จริงตอน runtime (ถูก transpile เป็น JS จริง) ส่วนอินเทอร์เฟซกำหนดแค่ contract/โครงสร้างเท่านั้น ไม่มี implementation ใดๆ และหายไปทั้งหมดตอน compile (ไม่มีผลต่อ runtime เลย)

**ข้อผิดพลาดที่พบบ่อย — ลืมใช้ \`this\`:** ภายในเมธอด คุณ**ต้อง**ใช้ \`this.fieldName\` เพื่อเข้าถึง property ของคลาส การพิมพ์ชื่อ field เฉยๆ จะทำให้เกิด \`ReferenceError\`

\`\`\`ts
// WRONG ❌
log() { console.log(name); }

// RIGHT ✅
log() { console.log(this.name); }
\`\`\`

**สรุปทบทวน:**
1. Class คือพิมพ์เขียว Object คืออินสแตนซ์ของพิมพ์เขียวนั้น
2. Fields กำหนดสถานะของอ็อบเจกต์ (ข้อมูล) — เปรียบเสมือนคำนาม
3. Methods กำหนดพฤติกรรมของอ็อบเจกต์ (ฟังก์ชัน) — เปรียบเสมือนคำกริยา
4. ใช้ \`new ClassName()\` เพื่อจัดสรรหน่วยความจำและสร้างอ็อบเจกต์`,
      },
      {
        slug: "the-constructor-method",
        titleEn: "The Constructor Method",
        titleTh: "เมธอด Constructor",
        order: 4,
        contentEn: `A constructor is a special method that is automatically invoked when an object is created. Its primary purpose is to initialize an object's properties (its state). In TypeScript it's defined using the exact keyword \`constructor()\`, and it cannot return any value — not even \`void\`.

\`\`\`ts
class DatabaseConnection {
  status: string;

  // Automatically called during 'new'
  constructor() {
    console.log('Connecting to DB...');
    this.status = 'Connected';
  }
}

const db = new DatabaseConnection();
// Output: "Connecting to DB..."
\`\`\`

Object initialization flow: the \`new\` keyword triggers instantiation and allocates memory → \`constructor()\` is auto-invoked and initializes the fields (state) → the object is ready, a usable instance.

\`\`\`mermaid
graph LR
    A["new keyword<br/>Memory allocated"] --> B["constructor()<br/>Auto-invoked"] --> C["Fields initialized<br/>{State}"] --> D["Object Ready<br/>Instance usable"]
\`\`\``,
        contentTh: `คอนสตรัคเตอร์ (constructor) คือเมธอดพิเศษที่ถูกเรียกโดยอัตโนมัติเมื่อมีการสร้างอ็อบเจกต์ วัตถุประสงค์หลักคือการกำหนดค่าเริ่มต้นให้กับ property ของอ็อบเจกต์ (สถานะของมัน) ใน TypeScript จะประกาศด้วยคีย์เวิร์ด \`constructor()\` เท่านั้น และไม่สามารถ return ค่าใดๆ ได้เลย แม้แต่ \`void\`

\`\`\`ts
class DatabaseConnection {
  status: string;

  // Automatically called during 'new'
  constructor() {
    console.log('Connecting to DB...');
    this.status = 'Connected';
  }
}

const db = new DatabaseConnection();
// Output: "Connecting to DB..."
\`\`\`

ลำดับการทำงานตอนสร้างอ็อบเจกต์: คีย์เวิร์ด \`new\` ทำให้เกิดการสร้างอินสแตนซ์และจัดสรรหน่วยความจำ → \`constructor()\` ถูกเรียกโดยอัตโนมัติเพื่อกำหนดค่าเริ่มต้นให้ฟิลด์ (สถานะ) → อ็อบเจกต์พร้อมใช้งานเป็นอินสแตนซ์จริง

\`\`\`mermaid
graph LR
    A["new keyword<br/>Memory allocated"] --> B["constructor()<br/>Auto-invoked"] --> C["Fields initialized<br/>{State}"] --> D["Object Ready<br/>Instance usable"]
\`\`\``,
      },
      {
        slug: "types-of-constructors",
        titleEn: "Types of Constructors",
        titleTh: "ประเภทของ Constructor",
        order: 5,
        contentEn: `A **default constructor** takes zero arguments and initializes an object with hardcoded/default values:

\`\`\`ts
class Player {
  health: number;

  constructor() {
    this.health = 100; // Fixed
  }
}

new Player();
\`\`\`

A **parameterized constructor** takes one or more arguments and initializes an object with dynamic values passed by the caller:

\`\`\`ts
class Player {
  health: number;

  constructor(h: number) {
    this.health = h; // Dynamic
  }
}

new Player(50);
\`\`\`

**Critical interview trap — no constructor overloading:** unlike Java or C++, TypeScript does NOT allow multiple constructor implementations in a class. Writing multiple \`constructor()\` blocks throws a compile error.

\`\`\`java
// JAVA (Valid)
class User {
  User() {}
  User(String n) {}
}
\`\`\`

\`\`\`ts
// TYPESCRIPT (Error ❌)
class User {
  constructor() {}
  constructor(n: string) {}
}
\`\`\``,
        contentTh: `**Default constructor** ไม่รับ argument เลย และกำหนดค่าเริ่มต้นให้อ็อบเจกต์ด้วยค่าคงที่/ค่าเริ่มต้นที่ hardcode ไว้:

\`\`\`ts
class Player {
  health: number;

  constructor() {
    this.health = 100; // Fixed
  }
}

new Player();
\`\`\`

**Parameterized constructor** รับ argument ตั้งแต่หนึ่งตัวขึ้นไป และกำหนดค่าเริ่มต้นด้วยค่าที่ผู้เรียกส่งเข้ามาแบบไดนามิก:

\`\`\`ts
class Player {
  health: number;

  constructor(h: number) {
    this.health = h; // Dynamic
  }
}

new Player(50);
\`\`\`

**กับดักสัมภาษณ์ที่สำคัญ — ไม่มี constructor overloading:** ต่างจาก Java หรือ C++ ตรงที่ TypeScript **ไม่อนุญาต**ให้มี constructor หลาย implementation ในคลาสเดียว หากเขียน \`constructor()\` ซ้ำหลายบล็อก จะเกิด compile error ทันที

\`\`\`java
// JAVA (Valid)
class User {
  User() {}
  User(String n) {}
}
\`\`\`

\`\`\`ts
// TYPESCRIPT (Error ❌)
class User {
  constructor() {}
  constructor(n: string) {}
}
\`\`\``,
      },
      {
        slug: "parameter-properties",
        titleEn: "Parameter Properties (TS Exclusive)",
        titleTh: "Parameter Properties (เฉพาะ TypeScript)",
        order: 6,
        contentEn: `TypeScript offers a shortcut to cut boilerplate: adding an access modifier (\`public\`, \`private\`, \`protected\`, or \`readonly\`) directly to a constructor argument automatically creates the class field and initializes it for you.

Standard way (verbose):

\`\`\`ts
class Product {
  public name: string; // 1. Declare

  constructor(name: string) { // 2. Pass arg
    this.name = name; // 3. Assign
  }
}
\`\`\`

Parameter properties (magic) — replaces all 3 steps above:

\`\`\`ts
class Product {
  constructor(
    public name: string
  ) {}
}
\`\`\`

**Rule of thumb:** if you don't include an access modifier (like \`public\`, \`private\`) or \`readonly\` in the constructor signature, it remains a normal parameter and NO class property is automatically created.`,
        contentTh: `TypeScript มีทางลัดที่ช่วยลด boilerplate code: การใส่ access modifier (\`public\`, \`private\`, \`protected\`, หรือ \`readonly\`) ลงบน constructor argument โดยตรง จะทำให้ TypeScript สร้าง class field และกำหนดค่าเริ่มต้นให้อัตโนมัติ

วิธีมาตรฐาน (ยาว):

\`\`\`ts
class Product {
  public name: string; // 1. Declare

  constructor(name: string) { // 2. Pass arg
    this.name = name; // 3. Assign
  }
}
\`\`\`

Parameter properties (เวทมนตร์) — แทนที่ทั้ง 3 ขั้นตอนด้านบนได้ในบรรทัดเดียว:

\`\`\`ts
class Product {
  constructor(
    public name: string
  ) {}
}
\`\`\`

**กฎง่ายๆ ที่ต้องจำ:** ถ้าไม่ใส่ access modifier (เช่น \`public\`, \`private\`) หรือ \`readonly\` ใน constructor signature พารามิเตอร์นั้นจะยังเป็นแค่พารามิเตอร์ปกติ และ**จะไม่มี**การสร้าง class property ให้อัตโนมัติ`,
      },
      {
        slug: "interview-summary-constructors",
        titleEn: "Interview & Summary",
        titleTh: "สัมภาษณ์งานและสรุป",
        order: 7,
        contentEn: `**Placement scenario:** "How do you handle optional initialization in a constructor, since TS doesn't support constructor overloading?"

Expected answer: since only one implementation is allowed, dynamic behavior is achieved with:
- Default parameters: \`constructor(age: number = 18)\`
- Optional parameters: \`constructor(name?: string)\`
- Union types: \`constructor(id: string | number)\`

**Revision summary:**
- **Constructor purpose:** instantly initializes object properties the moment the \`new\` keyword allocates memory in the heap.
- **Parameter properties:** adding \`public\`/\`private\` to a constructor parameter automatically declares and initializes the property — an ultimate time-saver.
- **No overloading:** only ONE implementation of \`constructor()\` is allowed per class in TypeScript.`,
        contentTh: `**สถานการณ์สัมภาษณ์งาน:** "คุณจัดการกับการกำหนดค่าเริ่มต้นแบบ optional ใน constructor อย่างไร ในเมื่อ TS ไม่รองรับ constructor overloading?"

คำตอบที่คาดหวัง: เนื่องจากมี implementation ได้แค่ตัวเดียว เราจึงทำให้เกิดพฤติกรรมแบบไดนามิกได้ด้วย:
- Default parameters: \`constructor(age: number = 18)\`
- Optional parameters: \`constructor(name?: string)\`
- Union types: \`constructor(id: string | number)\`

**สรุปทบทวน:**
- **จุดประสงค์ของ constructor:** กำหนดค่าเริ่มต้นให้ property ของอ็อบเจกต์ทันทีที่คีย์เวิร์ด \`new\` จัดสรรหน่วยความจำใน heap
- **Parameter properties:** การใส่ \`public\`/\`private\` ลงบน constructor parameter จะประกาศและกำหนดค่าเริ่มต้นให้ property นั้นอัตโนมัติ — ประหยัดเวลาได้มาก
- **ไม่มี overloading:** อนุญาตให้มี \`constructor()\` ได้แค่ 1 implementation ต่อคลาสเท่านั้นใน TypeScript`,
      },
      {
        slug: "access-modifiers-overview",
        titleEn: "Access Modifiers Overview",
        titleTh: "ภาพรวมของ Access Modifiers",
        order: 8,
        contentEn: `Access modifiers are keywords that set the visibility (accessibility) of classes, properties, and methods. TypeScript provides four main modifiers: \`public\`, \`private\`, \`protected\`, and \`readonly\`.

This is the core mechanism behind **encapsulation**: hiding internal state and requiring all interaction to be performed through an object's methods.

| Modifier | Inside Class | Subclass (Child) | Outside (Instance) |
| --- | --- | --- | --- |
| \`public\` | ✔ | ✔ | ✔ |
| \`protected\` | ✔ | ✔ | ✘ |
| \`private\` | ✔ | ✘ | ✘ |

**TypeScript vs JavaScript (runtime behavior):** access modifiers are a compile-time-only feature. When compiled to traditional JavaScript (ES5/ES6), the \`private\` and \`protected\` keywords are erased entirely — everything technically becomes public at runtime. (Modern JS now supports true private fields at runtime using the \`#\` prefix.)`,
        contentTh: `Access modifier คือคีย์เวิร์ดที่ใช้กำหนดการมองเห็น (การเข้าถึง) ของคลาส, property และเมธอด TypeScript มี modifier หลัก 4 ตัวคือ \`public\`, \`private\`, \`protected\` และ \`readonly\`

นี่คือกลไกหลักเบื้องหลังแนวคิด **encapsulation**: การซ่อนสถานะภายในและบังคับให้การโต้ตอบทั้งหมดต้องทำผ่านเมธอดของอ็อบเจกต์เท่านั้น

| Modifier | ภายในคลาส | Subclass (ลูก) | ภายนอก (อินสแตนซ์) |
| --- | --- | --- | --- |
| \`public\` | ✔ | ✔ | ✔ |
| \`protected\` | ✔ | ✔ | ✘ |
| \`private\` | ✔ | ✘ | ✘ |

**TypeScript กับ JavaScript (พฤติกรรมตอน runtime):** access modifier เป็นฟีเจอร์ที่มีผลแค่ตอน compile-time เท่านั้น เมื่อ compile เป็น JavaScript แบบดั้งเดิม (ES5/ES6) คีย์เวิร์ด \`private\` และ \`protected\` จะถูกลบทิ้งไปทั้งหมด — ทุกอย่างกลายเป็น public จริงๆ ตอน runtime (JS สมัยใหม่รองรับ private field จริงตอน runtime แล้วด้วยการใช้ prefix \`#\`)`,
      },
      {
        slug: "public-and-private-modifiers",
        titleEn: "Public & Private Modifiers",
        titleTh: "Public และ Private Modifier",
        order: 9,
        contentEn: `\`public\` is the default modifier — properties and methods are accessible from absolutely anywhere. If you don't specify a modifier, TypeScript assumes \`public\`.

\`\`\`ts
class User {
  // Explicitly public
  public name: string;

  constructor(n: string) {
    this.name = n;
  }
}

const user = new User('Alice');
// ✅ Valid: accessing outside the class
console.log(user.name);
\`\`\`

\`private\` restricts access purely to the inside of the class where it's declared — it cannot be accessed from outside objects, nor from child classes.

\`\`\`ts
class Bank {
  // Only accessible inside Bank
  private pin: number;

  constructor(p: number) {
    this.pin = p; // ✅ Valid
  }
}

const acc = new Bank(1234);
// ❌ Error: 'pin' is private.
console.log(acc.pin);
\`\`\``,
        contentTh: `\`public\` คือ modifier ค่าเริ่มต้น — property และเมธอดสามารถเข้าถึงได้จากทุกที่ ถ้าไม่ระบุ modifier ใดๆ TypeScript จะถือว่าเป็น \`public\` โดยอัตโนมัติ

\`\`\`ts
class User {
  // Explicitly public
  public name: string;

  constructor(n: string) {
    this.name = n;
  }
}

const user = new User('Alice');
// ✅ Valid: accessing outside the class
console.log(user.name);
\`\`\`

\`private\` จำกัดการเข้าถึงให้ทำได้แค่ภายในคลาสที่ประกาศไว้เท่านั้น — ไม่สามารถเข้าถึงได้จากอ็อบเจกต์ภายนอก หรือแม้แต่จาก child class

\`\`\`ts
class Bank {
  // Only accessible inside Bank
  private pin: number;

  constructor(p: number) {
    this.pin = p; // ✅ Valid
  }
}

const acc = new Bank(1234);
// ❌ Error: 'pin' is private.
console.log(acc.pin);
\`\`\``,
      },
      {
        slug: "protected-modifier",
        titleEn: "Protected Modifier",
        titleTh: "Protected Modifier",
        order: 10,
        contentEn: `\`protected\` behaves exactly like \`private\` (it blocks outside/instance access), with one major exception: it grants access to child classes (subclasses) — an inheritance bridge.

\`\`\`mermaid
graph TD
    Parent["Parent Class<br/>protected data"] --> Child["Child Class<br/>✅ Access Granted"]
    Parent -.-> Instance["Instance<br/>❌ No Access"]
\`\`\`

\`\`\`ts
class Employee {
  protected salary: number = 5000;
}

class Manager extends Employee {
  getSalary() {
    // ✅ Valid: child class can access protected fields
    return this.salary;
  }
}

const boss = new Manager();
// ❌ Error: Property 'salary' is protected.
boss.salary;
\`\`\`

**Interview trap — private vs protected:** interviewers often ask, "if both block instance access, why use \`protected\` over \`private\`?" Answer: use \`private\` when you want to absolutely hide data — even from your own subclasses — to prevent them from breaking core logic. Use \`protected\` when designing a base class specifically meant to be extended, where child classes need to manipulate that internal state.`,
        contentTh: `\`protected\` ทำงานเหมือน \`private\` ทุกประการ (บล็อกการเข้าถึงจากภายนอก/อินสแตนซ์) แต่มีข้อยกเว้นสำคัญข้อเดียวคือ มันเปิดให้ child class (subclass) เข้าถึงได้ — เป็นเหมือนสะพานเชื่อมของการสืบทอด (inheritance)

\`\`\`mermaid
graph TD
    Parent["Parent Class<br/>protected data"] --> Child["Child Class<br/>✅ Access Granted"]
    Parent -.-> Instance["Instance<br/>❌ No Access"]
\`\`\`

\`\`\`ts
class Employee {
  protected salary: number = 5000;
}

class Manager extends Employee {
  getSalary() {
    // ✅ Valid: child class can access protected fields
    return this.salary;
  }
}

const boss = new Manager();
// ❌ Error: Property 'salary' is protected.
boss.salary;
\`\`\`

**กับดักสัมภาษณ์ — private กับ protected:** ผู้สัมภาษณ์มักถามว่า "ถ้าทั้งคู่บล็อกการเข้าถึงจาก instance เหมือนกัน แล้วทำไมต้องใช้ \`protected\` แทน \`private\`?" คำตอบ: ใช้ \`private\` เมื่อต้องการซ่อนข้อมูลแบบเด็ดขาด — แม้แต่จาก subclass ของตัวเอง — เพื่อป้องกันไม่ให้ subclass มาทำลาย core logic ส่วนใช้ \`protected\` เมื่อออกแบบ base class ที่ตั้งใจให้ถูก extend ต่อ และ child class จำเป็นต้องเข้าถึง/แก้ไขสถานะภายในนั้นได้`,
      },
      {
        slug: "readonly-and-summary",
        titleEn: "Readonly & Summary",
        titleTh: "Readonly และสรุป",
        order: 11,
        contentEn: `The \`readonly\` modifier makes a property immutable. It can only be assigned a value during declaration or inside the constructor — after that, modifying it throws an error.

\`\`\`ts
class System {
  readonly os: string = 'Linux';

  constructor() {
    this.os = 'MacOS'; // ✅ Allowed in constructor
  }

  updateOS() {
    this.os = 'Windows'; // ❌ Error: Cannot assign
  }
}
\`\`\`

**Placement scenario:** "What is the difference between \`const\` and \`readonly\` in TypeScript?"

Expected answer:
- \`const\` applies to variables (block-scoped). It can never be reassigned.
- \`readonly\` applies exclusively to class properties. It can be dynamically assigned exactly once inside the constructor, allowing different objects to have different readonly values.

**Revision summary:**
- **PUB** \`public\`: default access — available anywhere (class, subclasses, outside instances).
- **PRO** \`protected\`: available inside the defining class AND its child classes (inheritance).
- **PRI** \`private\`: highest security — available ONLY inside the class where it's declared.
- **R/O** \`readonly\`: prevents modification after instantiation; constructor initialization is allowed.`,
        contentTh: `Modifier \`readonly\` ทำให้ property เป็น immutable (แก้ไขไม่ได้) โดยสามารถกำหนดค่าได้แค่ตอนประกาศ หรือภายใน constructor เท่านั้น — หลังจากนั้นถ้าพยายามแก้ไขจะเกิด error

\`\`\`ts
class System {
  readonly os: string = 'Linux';

  constructor() {
    this.os = 'MacOS'; // ✅ Allowed in constructor
  }

  updateOS() {
    this.os = 'Windows'; // ❌ Error: Cannot assign
  }
}
\`\`\`

**สถานการณ์สัมภาษณ์งาน:** "อะไรคือความแตกต่างระหว่าง \`const\` กับ \`readonly\` ใน TypeScript?"

คำตอบที่คาดหวัง:
- \`const\` ใช้กับตัวแปร (block-scoped) ไม่สามารถ reassign ได้เลย
- \`readonly\` ใช้กับ class property เท่านั้น สามารถกำหนดค่าแบบไดนามิกได้ครั้งเดียวภายใน constructor ทำให้แต่ละอ็อบเจกต์มีค่า readonly ที่ต่างกันได้

**สรุปทบทวน:**
- **PUB** \`public\`: การเข้าถึงเริ่มต้น — เข้าถึงได้จากทุกที่ (ในคลาส, subclass, นอกอินสแตนซ์)
- **PRO** \`protected\`: เข้าถึงได้จากภายในคลาสที่ประกาศ และ child class (การสืบทอด)
- **PRI** \`private\`: ความปลอดภัยสูงสุด — เข้าถึงได้**เฉพาะ**ภายในคลาสที่ประกาศเท่านั้น
- **R/O** \`readonly\`: ป้องกันการแก้ไขหลังจากสร้างอินสแตนซ์แล้ว แต่กำหนดค่าใน constructor ได้`,
      },
      {
        slug: "encapsulation-and-data-hiding",
        titleEn: "Encapsulation & Data Hiding",
        titleTh: "Encapsulation และ Data Hiding",
        order: 12,
        contentEn: `Encapsulation is "the shield of OOP": bundling data (properties) and the methods that operate on that data into a single unit (a class).

**Data hiding** is restricting direct access to some of an object's components, usually using the \`private\` modifier. The goal is to prevent outside code from putting the object into an invalid state.`,
        contentTh: `Encapsulation คือ "โล่ป้องกัน" ของ OOP: การรวมข้อมูล (property) และเมธอดที่ทำงานกับข้อมูลนั้นเข้าไว้เป็นหน่วยเดียวกัน (คลาส)

**Data hiding** คือการจำกัดการเข้าถึงโดยตรงต่อบางส่วนขององค์ประกอบของอ็อบเจกต์ โดยมักใช้ modifier \`private\` เป้าหมายคือป้องกันไม่ให้โค้ดภายนอกทำให้อ็อบเจกต์ตกอยู่ในสถานะที่ไม่ถูกต้อง (invalid state)`,
      },
      {
        slug: "getters-and-setters",
        titleEn: "Getters & Setters",
        titleTh: "Getter และ Setter",
        order: 13,
        contentEn: `Getters and setters are the practical mechanism for encapsulation: a "secure data flow" gatekeeper between external code and an object's private data. External code calls \`set()\` to write and \`get()\` to read, instead of touching the private field directly.

\`\`\`mermaid
graph LR
    Ext["External Code"] -- "set()" --> GK["Gatekeepers<br/>get() / set()"]
    GK -- "get()" --> Ext
    GK --> Priv["Private Data<br/>_age"]
\`\`\`

\`\`\`ts
class User {
  private _age: number = 0;

  // GETTER: Read Access
  get age(): number {
    return this._age;
  }

  // SETTER: Write Access with Validation
  set age(value: number) {
    if (value < 0) throw new Error('Invalid age');
    this._age = value;
  }
}
\`\`\`

Because the setter runs validation logic, \`user.age = -5\` throws instead of silently corrupting the object's state — something a plain public field could never enforce.`,
        contentTh: `Getter และ setter คือกลไกที่ใช้จริงสำหรับ encapsulation: เป็นเหมือน "ผู้เฝ้าประตู" (gatekeeper) ของ secure data flow ระหว่างโค้ดภายนอกกับข้อมูล private ของอ็อบเจกต์ โค้ดภายนอกจะเรียก \`set()\` เพื่อเขียน และ \`get()\` เพื่ออ่าน แทนที่จะแตะ private field โดยตรง

\`\`\`mermaid
graph LR
    Ext["External Code"] -- "set()" --> GK["Gatekeepers<br/>get() / set()"]
    GK -- "get()" --> Ext
    GK --> Priv["Private Data<br/>_age"]
\`\`\`

\`\`\`ts
class User {
  private _age: number = 0;

  // GETTER: Read Access
  get age(): number {
    return this._age;
  }

  // SETTER: Write Access with Validation
  set age(value: number) {
    if (value < 0) throw new Error('Invalid age');
    this._age = value;
  }
}
\`\`\`

เนื่องจาก setter มี validation logic อยู่ภายใน การเขียน \`user.age = -5\` จะโยน error ทันที แทนที่จะปล่อยให้สถานะของอ็อบเจกต์เสียหายไปเงียบๆ — ซึ่งเป็นสิ่งที่ public field ธรรมดาไม่สามารถบังคับได้เลย`,
      },
      {
        slug: "static-members",
        titleEn: "Static Members",
        titleTh: "Static Member",
        order: 14,
        contentEn: `The \`static\` keyword defines properties and methods that belong to the class itself, rather than to any specific object instance created from it.

**Instance members** (normal) belong to the object, are accessed via \`objectName.property\`, and memory is allocated for every new object. **Static members** belong to the class, are accessed via \`ClassName.property\`, and their memory is shared across all objects — only one copy exists, no matter how many instances are created.

\`\`\`mermaid
graph TD
    S["MathUtils Class<br/>static PI = 3.14<br/>(1 copy, shared)"] --> I1["Instance 1<br/>reads MathUtils.PI"]
    S --> I2["Instance 2<br/>reads MathUtils.PI"]
\`\`\`

\`\`\`ts
class Counter {
  static count = 0;

  constructor() {
    Counter.count++;
  }
}

new Counter();
new Counter();

// Access via Class Name directly
console.log(Counter.count); // 2
\`\`\`

**Interview trap — can you use \`this\` inside a static method?** No. \`this\` refers to the current object instance. Since static methods belong to the class (and there's no instance), using \`this\` inside one refers to the class constructor itself, not an object. Always use the class name to access static members.`,
        contentTh: `คีย์เวิร์ด \`static\` ใช้กำหนด property และเมธอดที่เป็นของ**ตัวคลาสเอง** ไม่ใช่ของอินสแตนซ์ใดอินสแตนซ์หนึ่งที่สร้างจากคลาสนั้น

**Instance member** (แบบปกติ) เป็นของอ็อบเจกต์ เข้าถึงผ่าน \`objectName.property\` และหน่วยความจำจะถูกจัดสรรใหม่ทุกครั้งที่สร้างอ็อบเจกต์ ส่วน **Static member** เป็นของคลาส เข้าถึงผ่าน \`ClassName.property\` และหน่วยความจำถูกใช้ร่วมกันในทุกอ็อบเจกต์ — มีอยู่แค่สำเนาเดียวเท่านั้น ไม่ว่าจะสร้างกี่อินสแตนซ์ก็ตาม

\`\`\`mermaid
graph TD
    S["MathUtils Class<br/>static PI = 3.14<br/>(1 copy, shared)"] --> I1["Instance 1<br/>reads MathUtils.PI"]
    S --> I2["Instance 2<br/>reads MathUtils.PI"]
\`\`\`

\`\`\`ts
class Counter {
  static count = 0;

  constructor() {
    Counter.count++;
  }
}

new Counter();
new Counter();

// Access via Class Name directly
console.log(Counter.count); // 2
\`\`\`

**กับดักสัมภาษณ์ — ใช้ \`this\` ในเมธอด static ได้ไหม?** ไม่ได้ \`this\` หมายถึงอินสแตนซ์ปัจจุบันของอ็อบเจกต์ แต่เมธอด static เป็นของคลาส (ไม่มีอินสแตนซ์) การใช้ \`this\` ในนั้นจะหมายถึงตัว constructor ของคลาสเอง ไม่ใช่อ็อบเจกต์ ให้ใช้ชื่อคลาสในการเข้าถึง static member เสมอ`,
      },
      {
        slug: "inheritance-extends",
        titleEn: "Inheritance (extends)",
        titleTh: "Inheritance (extends)",
        order: 15,
        contentEn: `Inheritance is a mechanism where a new class (child/derived) inherits the properties and methods of an existing class (parent/base). It promotes D.R.Y (Don't Repeat Yourself) and is established using the \`extends\` keyword. TypeScript supports single inheritance only — one parent class max.

\`\`\`mermaid
graph TD
    Animal["Animal<br/>Base Class"] -- extends --> Dog["Dog<br/>Derived Class"]
\`\`\``,
        contentTh: `Inheritance (การสืบทอด) คือกลไกที่คลาสใหม่ (child/derived) สืบทอด property และเมธอดจากคลาสที่มีอยู่แล้ว (parent/base) มันส่งเสริมหลักการ D.R.Y (Don't Repeat Yourself) และสร้างขึ้นด้วยคีย์เวิร์ด \`extends\` TypeScript รองรับ single inheritance เท่านั้น — มี parent class ได้สูงสุดแค่ 1 ตัว

\`\`\`mermaid
graph TD
    Animal["Animal<br/>Base Class"] -- extends --> Dog["Dog<br/>Derived Class"]
\`\`\``,
      },
      {
        slug: "the-super-keyword",
        titleEn: "The super() Keyword",
        titleTh: "คีย์เวิร์ด super()",
        order: 16,
        contentEn: `If a child class has its own constructor, it MUST call \`super()\` before using \`this\`. \`super()\` executes the parent class's constructor, ensuring the parent's properties are initialized first.

\`\`\`ts
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    // 1. MUST call parent constructor FIRST
    super(name);
    // 2. Now 'this' can be used safely
    this.breed = breed;
  }
}
\`\`\``,
        contentTh: `ถ้า child class มี constructor ของตัวเอง จะ**ต้อง**เรียก \`super()\` ก่อนใช้ \`this\` เสมอ \`super()\` คือการรัน constructor ของ parent class เพื่อให้แน่ใจว่า property ของ parent ถูกกำหนดค่าก่อน

\`\`\`ts
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    // 1. MUST call parent constructor FIRST
    super(name);
    // 2. Now 'this' can be used safely
    this.breed = breed;
  }
}
\`\`\``,
      },
      {
        slug: "polymorphism-overriding",
        titleEn: "Polymorphism (Overriding)",
        titleTh: "Polymorphism (Overriding)",
        order: 17,
        contentEn: `Polymorphism ("many forms") lets objects of different classes be treated as objects of a common parent class. The most common implementation is **method overriding**: a child class provides its own customized implementation for a method already defined in its parent.

\`\`\`mermaid
graph LR
    Animal["Animal<br/>makeSound()"] --> Dog["Dog<br/>makeSound() ⇒ 'Woof'"]
    Animal --> Cat["Cat<br/>makeSound() ⇒ 'Meow'"]
\`\`\`

\`\`\`ts
class Printer {
  print() { console.log('Basic Print'); }
}

class LaserPrinter extends Printer {
  // Replaces parent logic safely
  override print() {
    console.log('Laser High-Res Print');
  }
}
\`\`\`

**TS-exclusive safety — the \`override\` keyword:** TypeScript 4.3 introduced \`override\`. It's optional, but it explicitly tells the compiler you intend to override a base method. If you mistype the method name, or the base method is later deleted, TS throws an error instead of silently creating a new, unrelated method — preventing a class of silent bugs.`,
        contentTh: `Polymorphism ("หลายรูปแบบ") ทำให้อ็อบเจกต์ต่างคลาสกันสามารถถูกมองว่าเป็นอ็อบเจกต์ของ parent class ร่วมกันได้ วิธีที่ใช้บ่อยที่สุดคือ **method overriding**: child class เขียน implementation ของตัวเองทับเมธอดที่ parent กำหนดไว้แล้ว

\`\`\`mermaid
graph LR
    Animal["Animal<br/>makeSound()"] --> Dog["Dog<br/>makeSound() ⇒ 'Woof'"]
    Animal --> Cat["Cat<br/>makeSound() ⇒ 'Meow'"]
\`\`\`

\`\`\`ts
class Printer {
  print() { console.log('Basic Print'); }
}

class LaserPrinter extends Printer {
  // Replaces parent logic safely
  override print() {
    console.log('Laser High-Res Print');
  }
}
\`\`\`

**ความปลอดภัยเฉพาะของ TS — คีย์เวิร์ด \`override\`:** TypeScript 4.3 เพิ่มคีย์เวิร์ด \`override\` เข้ามา แม้จะเป็น optional แต่มันบอก compiler อย่างชัดเจนว่าตั้งใจจะ override เมธอดของ base class ถ้าพิมพ์ชื่อเมธอดผิด หรือเมธอดของ base ถูกลบไปภายหลัง TS จะโยน error ทันที แทนที่จะสร้างเมธอดใหม่ที่ไม่เกี่ยวข้องขึ้นมาเงียบๆ — ช่วยป้องกันบั๊กที่มองไม่เห็นได้`,
      },
      {
        slug: "abstraction-abstract",
        titleEn: "Abstraction (abstract)",
        titleTh: "Abstraction (abstract)",
        order: 18,
        contentEn: `Abstraction hides internal implementation details and shows only the essential features. In TypeScript this is achieved with **abstract classes**:
- They cannot be instantiated directly (no \`new AbstractClass()\`).
- They can contain standard methods (with logic) AND abstract methods (no logic — just a signature).
- Child classes MUST implement every abstract method.

\`\`\`ts
abstract class Shape {
  // Abstract method: No body {}
  abstract getArea(): number;
}

class Circle extends Shape {
  constructor(private r: number) { super(); }

  // MUST provide implementation
  getArea() { return Math.PI * this.r ** 2; }
}
\`\`\`

Concept vs implementation: the abstract \`Shape\` is the idea — "every shape must be able to calculate its area" — but a generic shape doesn't know how. The concrete \`Circle\` is the reality — it provides the actual formula, π × r².

\`\`\`mermaid
graph LR
    Shape["Abstract Shape (Idea)<br/>'must calculate Area'"] --> Circle["Concrete Circle (Reality)<br/>π × r²"]
\`\`\``,
        contentTh: `Abstraction คือการซ่อนรายละเอียดการ implement ภายใน และแสดงเฉพาะฟีเจอร์ที่จำเป็นเท่านั้น ใน TypeScript ทำได้ด้วย **abstract class**:
- ไม่สามารถสร้างอินสแตนซ์ได้โดยตรง (เขียน \`new AbstractClass()\` ไม่ได้)
- มีทั้งเมธอดปกติ (มี logic) และ abstract method (ไม่มี logic — แค่ signature) ได้
- child class **ต้อง** implement abstract method ทุกตัว

\`\`\`ts
abstract class Shape {
  // Abstract method: No body {}
  abstract getArea(): number;
}

class Circle extends Shape {
  constructor(private r: number) { super(); }

  // MUST provide implementation
  getArea() { return Math.PI * this.r ** 2; }
}
\`\`\`

แนวคิดเทียบกับ implementation: \`Shape\` แบบ abstract คือไอเดีย — "รูปทรงทุกแบบต้องคำนวณพื้นที่ของตัวเองได้" — แต่ shape ทั่วไปไม่รู้ว่าจะคำนวณอย่างไร ส่วน \`Circle\` ที่เป็น concrete class คือความจริง — มันให้สูตรจริงคือ π × r²

\`\`\`mermaid
graph LR
    Shape["Abstract Shape (Idea)<br/>'must calculate Area'"] --> Circle["Concrete Circle (Reality)<br/>π × r²"]
\`\`\``,
      },
      {
        slug: "oop-master-summary",
        titleEn: "OOP Master Summary",
        titleTh: "สรุปหลัก OOP ทั้งหมด",
        order: 19,
        contentEn: `The four pillars of OOP, in one page:

- **E — Encapsulation:** bundling data (variables) and methods (functions) into a single unit (a class), while restricting direct access using \`private\` modifiers. Key concepts: getters & setters, data hiding.
- **I — Inheritance:** deriving a new class from an existing class to inherit properties and behavior, promoting code reusability. Done via \`extends\`. Key concepts: parent/child, the \`super()\` keyword.
- **P — Polymorphism:** the ability of different objects to respond to the same method call in their own specific way ("many forms"). Key concepts: method overriding, \`override\`.
- **A — Abstraction:** hiding complex implementation details and showing only the necessary features — a strict contract/blueprint. Key concepts: \`abstract\` classes & methods.`,
        contentTh: `เสาหลักทั้ง 4 ของ OOP สรุปในหน้าเดียว:

- **E — Encapsulation:** การรวมข้อมูล (ตัวแปร) และเมธอด (ฟังก์ชัน) เข้าเป็นหน่วยเดียว (คลาส) พร้อมจำกัดการเข้าถึงโดยตรงด้วย \`private\` modifier แนวคิดหลัก: getter/setter, data hiding
- **I — Inheritance:** การสร้างคลาสใหม่จากคลาสที่มีอยู่เพื่อสืบทอด property และพฤติกรรม ส่งเสริมการใช้โค้ดซ้ำ ทำผ่าน \`extends\` แนวคิดหลัก: parent/child, คีย์เวิร์ด \`super()\`
- **P — Polymorphism:** ความสามารถของอ็อบเจกต์ต่างชนิดกันในการตอบสนองต่อการเรียกเมธอดชื่อเดียวกันในแบบของตัวเอง ("หลายรูปแบบ") แนวคิดหลัก: method overriding, \`override\`
- **A — Abstraction:** การซ่อนรายละเอียดการ implement ที่ซับซ้อน และแสดงเฉพาะฟีเจอร์ที่จำเป็น — เป็นเหมือน contract/พิมพ์เขียวที่เข้มงวด แนวคิดหลัก: abstract class และ abstract method`,
      },
      {
        slug: "extending-and-multiple-interfaces",
        titleEn: "Extending & Multiple Interfaces",
        titleTh: "การ Extend และ Multiple Interfaces",
        order: 20,
        contentEn: `In TypeScript (like most OOP languages), a class can \`extend\` only ONE parent class. However, a class can \`implement\` MULTIPLE interfaces — and an interface itself can \`extend\` multiple other interfaces. This gives you a highly flexible, composable architecture that bypasses the single-inheritance limit.

\`\`\`mermaid
graph LR
    P["Printer<br/>print()"] --> M["MultiFunctionDevice<br/>print() + scan()"]
    S["Scanner<br/>scan()"] --> M
\`\`\`

\`\`\`ts
interface Printer { print(): void; }
interface Scanner { scan(): void; }

// 1. A class implementing multiple interfaces
class Copier implements Printer, Scanner {
  print() { console.log('Printing...'); }
  scan() { console.log('Scanning...'); }
}

// 2. An interface extending multiple interfaces
interface AllInOne extends Printer, Scanner {
  fax(): void;
}
\`\`\`

**FAANG design question — abstract class vs interface:**

| | Abstract Class | Interface |
| --- | --- | --- |
| Logic | Can contain actual logic (method bodies) | Zero logic — signatures only |
| Extending | A class can extend only ONE | A class can implement MULTIPLE |
| Runtime | Exists at runtime (compiled to JS) | Disappears at runtime (TS only) |
| Performance | Slower, due to the prototype chain | Zero performance overhead |`,
        contentTh: `ใน TypeScript (เหมือนภาษา OOP ส่วนใหญ่) คลาสหนึ่งสามารถ \`extend\` parent class ได้แค่ **1 ตัว** เท่านั้น แต่คลาสสามารถ \`implement\` interface ได้**หลายตัว** — และตัว interface เองก็ \`extend\` interface อื่นได้หลายตัวเช่นกัน สิ่งนี้ทำให้ได้สถาปัตยกรรมที่ยืดหยุ่นและประกอบกันได้ (composable) โดยข้ามข้อจำกัดของ single inheritance

\`\`\`mermaid
graph LR
    P["Printer<br/>print()"] --> M["MultiFunctionDevice<br/>print() + scan()"]
    S["Scanner<br/>scan()"] --> M
\`\`\`

\`\`\`ts
interface Printer { print(): void; }
interface Scanner { scan(): void; }

// 1. A class implementing multiple interfaces
class Copier implements Printer, Scanner {
  print() { console.log('Printing...'); }
  scan() { console.log('Scanning...'); }
}

// 2. An interface extending multiple interfaces
interface AllInOne extends Printer, Scanner {
  fax(): void;
}
\`\`\`

**คำถามออกแบบระดับ FAANG — Abstract Class กับ Interface:**

| | Abstract Class | Interface |
| --- | --- | --- |
| Logic | มี logic จริงได้ (มี method body) | ไม่มี logic เลย — มีแค่ signature |
| การ extend | คลาส extend ได้แค่ **1 ตัว** | คลาส implement ได้**หลายตัว** |
| Runtime | มีอยู่จริงตอน runtime (compile เป็น JS) | หายไปตอน runtime (มีผลแค่ตอน TS) |
| ประสิทธิภาพ | ช้ากว่า เพราะมี prototype chain | ไม่มีผลต่อ performance เลย |`,
      },
      {
        slug: "generic-classes-and-methods",
        titleEn: "Generic Classes & Methods",
        titleTh: "Generic Class และ Method",
        order: 21,
        contentEn: `Generics let you create reusable classes and methods that work with any data type, while still maintaining strict type safety. Instead of hardcoding a type (like \`string\`) or reaching for the dangerous \`any\`, you use a placeholder type variable — conventionally \`<T>\` (T for "Type"). The actual type is decided dynamically when the class/method is instantiated or called, which prevents code duplication (the D.R.Y principle).

\`\`\`ts
// Generic Class Example
class Storage<T> {
  private items: T[] = [];

  addItem(item: T) { this.items.push(item); }
  getItems(): T[] { return this.items; }
}

const textStorage = new Storage<string>();
textStorage.addItem('Apple'); // ✅ Valid
textStorage.addItem(42); // ❌ Error: Argument of type 'number' is not assignable to 'string'
\`\`\`

Dynamic type instantiation: one generic template, \`class Box<T> { value: T }\`, produces distinct concrete shapes on demand — \`Box<string>\` (\`value: string\`), \`Box<number>\` (\`value: number\`), and so on.

\`\`\`mermaid
graph TD
    Box["class Box(T)<br/>value: T"] --> BS["Box(string)<br/>value: 'Hi'"]
    Box --> BN["Box(number)<br/>value: 42"]
\`\`\``,
        contentTh: `Generics ช่วยให้สร้างคลาสและเมธอดที่ใช้ซ้ำได้กับข้อมูลชนิดใดก็ได้ โดยยังคงความปลอดภัยของชนิดข้อมูล (type safety) แบบเข้มงวดไว้ แทนที่จะ hardcode ชนิดข้อมูล (เช่น \`string\`) หรือใช้ \`any\` ที่อันตราย เราใช้ตัวแปรชนิดข้อมูลแบบ placeholder — ตามธรรมเนียมใช้ \`<T>\` (T ย่อมาจาก "Type") ชนิดข้อมูลจริงจะถูกกำหนดแบบไดนามิกตอนที่คลาส/เมธอดถูกสร้างอินสแตนซ์หรือถูกเรียกใช้ ซึ่งช่วยป้องกันการเขียนโค้ดซ้ำ (หลักการ D.R.Y)

\`\`\`ts
// Generic Class Example
class Storage<T> {
  private items: T[] = [];

  addItem(item: T) { this.items.push(item); }
  getItems(): T[] { return this.items; }
}

const textStorage = new Storage<string>();
textStorage.addItem('Apple'); // ✅ Valid
textStorage.addItem(42); // ❌ Error: Argument of type 'number' is not assignable to 'string'
\`\`\`

การสร้างชนิดข้อมูลแบบไดนามิก: template แบบ generic ตัวเดียว \`class Box<T> { value: T }\` สามารถสร้างรูปแบบที่เจาะจงได้หลายแบบตามต้องการ เช่น \`Box<string>\` (\`value: string\`), \`Box<number>\` (\`value: number\`) และอื่นๆ

\`\`\`mermaid
graph TD
    Box["class Box(T)<br/>value: T"] --> BS["Box(string)<br/>value: 'Hi'"]
    Box --> BN["Box(number)<br/>value: 42"]
\`\`\``,
      },
      {
        slug: "generic-constraints",
        titleEn: "Generic Constraints",
        titleTh: "Generic Constraints",
        order: 22,
        contentEn: `Sometimes a generic needs to be flexible, but not *too* flexible. You can force the type variable \`T\` to contain certain properties by using \`extends\` alongside an interface — this is called a **constraint**.

\`\`\`ts
interface HasName { name: string; }

// Constraint: T MUST possess a 'name' string property
function printName<T extends HasName>(obj: T) {
  console.log(obj.name); // Safe: TS knows .name exists
}

printName({ name: 'Alice', age: 25 }); // ✅ Valid
// printName({ age: 25 }); ❌ Error: Property 'name' is missing
\`\`\`

**Advanced OOP summary:**
- **Interfaces** act as strict structural blueprints. They force classes to implement specific methods/fields, but contain no logic themselves.
- **Multi-implementation:** a class can \`extend\` only one class, but it can \`implement\` multiple interfaces — solving the diamond problem.
- **\`<T>\` generics:** dynamic type variables that let you build reusable, type-safe data structures and functions without relying on \`any\`.
- **Constraints:** appending \`extends InterfaceName\` to a generic ensures the provided type possesses the required properties.`,
        contentTh: `บางครั้ง generic ก็ต้องการความยืดหยุ่น แต่ไม่ใช่ยืดหยุ่น*เกินไป* เราสามารถบังคับให้ตัวแปรชนิดข้อมูล \`T\` ต้องมี property บางอย่างได้ด้วยการใช้ \`extends\` ร่วมกับ interface — เรียกสิ่งนี้ว่า **constraint**

\`\`\`ts
interface HasName { name: string; }

// Constraint: T MUST possess a 'name' string property
function printName<T extends HasName>(obj: T) {
  console.log(obj.name); // Safe: TS knows .name exists
}

printName({ name: 'Alice', age: 25 }); // ✅ Valid
// printName({ age: 25 }); ❌ Error: Property 'name' is missing
\`\`\`

**สรุป OOP ขั้นสูง:**
- **Interface** ทำหน้าที่เป็นพิมพ์เขียวเชิงโครงสร้างที่เข้มงวด บังคับให้คลาส implement เมธอด/ฟิลด์ที่กำหนด แต่ตัวมันเองไม่มี logic ใดๆ
- **Multi-implementation:** คลาส \`extend\` ได้แค่คลาสเดียว แต่ \`implement\` interface ได้หลายตัว — แก้ปัญหา diamond problem ได้
- **Generics \`<T>\`:** ตัวแปรชนิดข้อมูลแบบไดนามิก ช่วยสร้าง data structure และฟังก์ชันที่ใช้ซ้ำได้และปลอดภัยด้านชนิดข้อมูล โดยไม่ต้องพึ่ง \`any\`
- **Constraint:** การเติม \`extends InterfaceName\` ให้ generic ช่วยรับประกันว่าชนิดข้อมูลที่ส่งเข้ามามี property ที่จำเป็นครบถ้วน`,
      },
    ],
  },
];
