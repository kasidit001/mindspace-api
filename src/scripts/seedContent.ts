export interface SeedLesson {
  slug: string;
  titleEn: string;
  /** Thai translation. Optional — lessons without one fall back to English (see Lesson model). */
  titleTh?: string;
  order: number;
  contentEn: string;
  /** Thai translation. Optional — lessons without one fall back to English (see Lesson model). */
  contentTh?: string;
  /**
   * Code Lab exercises (see mindspace-web's CodeLab.vue) — a lesson can
   * carry several. Each `testCode` runs after the learner's `starterCode`
   * in a sandboxed Web Worker; it calls the injected `check(actual,
   * expected, label)` for each assertion. `hint`, if set, costs real
   * points to reveal (see mindspace-web's progress store) — not shown for
   * free. Most lessons have no labs at all.
   */
  labs?: SeedLab[];
}

export interface SeedLab {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  testCode: string;
  hint?: string;
}

export interface SeedCourse {
  slug: string;
  title: string;
  descriptionEn: string;
  /** Thai translation. Optional — courses without one fall back to English (see Course model). */
  descriptionTh?: string;
  /**
   * Defaults to true (published) when omitted — every course seeded here is
   * normally finished catalog content. Set false for a draft only meant for
   * an admin's own reference, not the public catalog (see Course model's
   * `published` column).
   */
  published?: boolean;
  lessons: SeedLesson[];
}

export const seedCourses: SeedCourse[] = [
  {
    slug: "typescript-for-js-programmers",
    title: "TypeScript for JS Programmers",
    descriptionEn: "A fast on-ramp to TypeScript for developers who already know JavaScript.",
        descriptionTh:
      "เส้นทางลัดสู่ TypeScript สำหรับนักพัฒนาที่รู้จัก JavaScript อยู่แล้ว",
lessons: [
      {
        slug: "why-typescript",
        titleEn: "Why TypeScript",
        titleTh: "ทำไมต้อง TypeScript",
        order: 1,
        contentEn: `TypeScript is a superset of JavaScript that adds a static type system. Every valid JavaScript program is (almost) valid TypeScript — you opt in to types incrementally rather than rewriting your codebase.

The core value is catching a class of bugs — wrong argument types, typos in property names, calling a function with too few arguments, forgetting to handle a null case — at compile time instead of at runtime in production. The TypeScript compiler (tsc) reads your code, infers or checks types, and reports errors before the code ever runs.

TypeScript also powers editor tooling: autocomplete, inline documentation, "go to definition", and safe renames all rely on the type information TypeScript computes. This is often the biggest day-to-day win — better tooling, not just fewer bugs.

Crucially, types are erased at compile time. TypeScript emits plain JavaScript with no runtime type-checking overhead — the type system is a development-time tool only.

## Conclusion

TypeScript adds a static type system on top of JavaScript, catching mistakes like wrong argument types or missed null cases at compile time instead of in production. It also powers editor tooling — autocomplete, inline docs, safe renames — and since types are erased at compile time, none of this costs anything at runtime.`,
        contentTh: `TypeScript คือ superset ของ JavaScript ที่เพิ่มระบบชนิดข้อมูลแบบสถิต (static type system) เข้ามา โปรแกรม JavaScript ที่ถูกต้องแทบทุกตัวถือเป็น TypeScript ที่ถูกต้องด้วยเช่นกัน (เกือบทั้งหมด) — คุณสามารถค่อยๆ เพิ่ม type เข้าไปทีละส่วนได้ โดยไม่จำเป็นต้องเขียนโค้ดทั้งหมดใหม่

คุณค่าหลักของมันคือการดักจับบั๊กบางประเภท เช่น argument ที่ชนิดข้อมูลผิด, การพิมพ์ชื่อ property ผิด, การเรียกฟังก์ชันด้วยจำนวน argument ที่ไม่ครบ, หรือการลืมจัดการกรณี null — ได้ตั้งแต่ตอน compile time แทนที่จะไปพังตอน runtime บน production จริง ตัวคอมไพเลอร์ของ TypeScript (tsc) จะอ่านโค้ดของคุณ, อนุมานหรือตรวจสอบชนิดข้อมูล, และรายงาน error ก่อนที่โค้ดจะถูกรันเสียอีก

TypeScript ยังเป็นแรงขับเคลื่อนเบื้องหลังเครื่องมือใน editor ด้วย: autocomplete, เอกสารอธิบายแบบ inline, ฟีเจอร์ "go to definition" และการ rename แบบปลอดภัย ล้วนพึ่งพาข้อมูลชนิดข้อมูลที่ TypeScript คำนวณไว้ทั้งสิ้น นี่มักเป็นประโยชน์ที่ใหญ่ที่สุดในการใช้งานจริงแต่ละวัน — เครื่องมือที่ดีขึ้น ไม่ใช่แค่บั๊กที่น้อยลง

ที่สำคัญคือ type ทั้งหมดจะถูกลบทิ้งตอน compile time เสมอ TypeScript จะสร้างเป็น JavaScript ธรรมดาออกมา โดยไม่มี overhead ในการตรวจสอบ type ตอน runtime เลย — ระบบชนิดข้อมูลนี้เป็นเครื่องมือสำหรับตอนพัฒนา (development-time) เท่านั้น

## สรุป

TypeScript เพิ่มระบบชนิดข้อมูลแบบสถิตให้กับ JavaScript ช่วยดักจับข้อผิดพลาด เช่น argument ผิดชนิด หรือลืมจัดการกรณี null ได้ตั้งแต่ตอน compile time แทนที่จะไปพังตอน production นอกจากนี้ยังเป็นแรงขับเคลื่อนเบื้องหลังเครื่องมือใน editor อย่าง autocomplete, เอกสาร inline และการ rename อย่างปลอดภัย และเนื่องจาก type ถูกลบทิ้งตอน compile time ทั้งหมดนี้จึงไม่มีค่าใช้จ่ายใดๆ ตอน runtime เลย`,
      },
      {
        slug: "basic-types",
        titleEn: "Basic Types",
        titleTh: "ชนิดข้อมูลพื้นฐาน",
        order: 2,
        contentEn: `TypeScript's basic types mirror JavaScript's primitives: string, number, boolean, null, undefined, bigint, and symbol. You annotate a variable's type with a colon: let age: number = 30;.

Arrays are written as type[] or Array<type>, e.g. let names: string[] = ["Ada", "Grace"];. Tuples are fixed-length arrays with known types per position: let pair: [string, number] = ["x", 1];.

The any type disables type checking for a value — useful as an escape hatch, but it defeats the purpose of TypeScript if overused. unknown is the type-safe counterpart: you can assign anything to an unknown value, but you must narrow it (with a type guard) before using it.

void describes a function that returns nothing meaningful. never describes a value that can never occur — e.g. the return type of a function that always throws or loops forever. TypeScript can often infer types without explicit annotations; this is called type inference, and relying on it for local variables is idiomatic.

## Conclusion

TypeScript's basic types mirror JavaScript's primitives, plus array/tuple syntax for structured data and the any/unknown pair for handling values whose type isn't known up front. void and never describe functions that return nothing meaningful or never return at all, and TypeScript's own type inference means you rarely need to annotate every local variable by hand.`,
        contentTh: `ชนิดข้อมูลพื้นฐานของ TypeScript สะท้อนมาจาก primitive ของ JavaScript ได้แก่ string, number, boolean, null, undefined, bigint และ symbol คุณสามารถกำกับชนิดข้อมูลของตัวแปรด้วยเครื่องหมายโคลอนได้ดังนี้ let age: number = 30;

Array เขียนได้ในรูปแบบ type[] หรือ Array<type> เช่น let names: string[] = ["Ada", "Grace"]; ส่วน Tuple คือ array ที่มีความยาวคงที่และรู้ชนิดข้อมูลของแต่ละตำแหน่งล่วงหน้า เช่น let pair: [string, number] = ["x", 1];

ชนิดข้อมูล any จะปิดการตรวจสอบ type ของค่านั้นๆ ไปเลย — มีประโยชน์ในฐานะทางออกฉุกเฉิน (escape hatch) แต่ถ้าใช้มากเกินไปก็จะทำลายจุดประสงค์ของ TypeScript ไปเลย ส่วน unknown คือคู่หูที่ปลอดภัยกว่า: คุณสามารถกำหนดค่าอะไรก็ได้ให้กับตัวแปรชนิด unknown แต่คุณต้อง narrow มัน (ด้วย type guard) ก่อนจะนำไปใช้งาน

void ใช้อธิบายฟังก์ชันที่ไม่ return ค่าที่มีความหมายใดๆ ส่วน never ใช้อธิบายค่าที่ไม่มีทางเกิดขึ้นได้เลย เช่น return type ของฟังก์ชันที่ throw error เสมอหรือวนลูปไม่สิ้นสุด TypeScript มักจะอนุมานชนิดข้อมูลได้เองโดยไม่ต้องกำกับไว้อย่างชัดเจน สิ่งนี้เรียกว่า type inference และการพึ่งพามันสำหรับตัวแปร local ถือเป็นแนวทางที่ idiomatic

## สรุป

ชนิดข้อมูลพื้นฐานของ TypeScript สะท้อนมาจาก primitive ของ JavaScript พร้อมด้วยไวยากรณ์ array/tuple สำหรับข้อมูลที่มีโครงสร้าง และคู่ any/unknown สำหรับจัดการค่าที่ไม่รู้ชนิดข้อมูลล่วงหน้า ส่วน void และ never ใช้อธิบายฟังก์ชันที่ไม่ return ค่าที่มีความหมาย หรือไม่มีทาง return เลย และด้วย type inference ของ TypeScript เอง ทำให้คุณแทบไม่ต้องกำกับชนิดข้อมูลให้ตัวแปร local ทุกตัวด้วยมือ`,
        labs: [
          {
            id: "sum-positive",
            title: "Sum the Positive Numbers",
            instructions: "Complete `sumPositive` so it adds up only the positive numbers in the array.",
            starterCode: `function sumPositive(nums: number[]): number {
  // TODO: implement this
  return 0;
}`,
            testCode: `check(sumPositive([1, -2, 3, 4, -5]), 8, "sums only the positive numbers");
check(sumPositive([-1, -2, -3]), 0, "returns 0 when there are no positive numbers");
check(sumPositive([]), 0, "returns 0 for an empty array");`,
            hint: "Try `.filter()` to keep only the positive numbers, then `.reduce()` to add them up.",
          },
          {
            id: "format-tuple",
            title: "Format a Tuple",
            instructions: "Complete `firstAndLast` so it turns a `[string, number]` tuple into a single `\"first-last\"` string.",
            starterCode: `function firstAndLast(pair: [string, number]): string {
  // TODO: implement this
  return "";
}`,
            testCode: `check(firstAndLast(["x", 1]), "x-1", "joins the tuple elements with a dash");
check(firstAndLast(["hello", 42]), "hello-42", "works with different values");`,
            hint: "Template literals: `${pair[0]}-${pair[1]}`.",
          },
        ],
      },
      {
        slug: "interfaces-and-type-aliases",
        titleEn: "Interfaces & Type Aliases",
        titleTh: "Interfaces และ Type Aliases",
        order: 3,
        contentEn: `Interfaces describe the shape of an object: interface User { id: string; name: string; age?: number }. The ? marks age as optional. A value satisfies an interface if it has at least those properties with compatible types — TypeScript uses structural typing, not nominal typing, so unrelated types with the same shape are interchangeable.

Type aliases (type User = { id: string; name: string }) can describe the same object shapes, plus unions, tuples, and primitives that interfaces cannot: type ID = string | number;. In practice, use interface for object shapes you expect to be extended or implemented by classes, and type for unions, tuples, or mapped/utility types.

Interfaces support declaration merging — declaring the same interface twice merges their members — and extends for inheritance: interface Admin extends User { role: string }. Type aliases use intersection (&) instead: type Admin = User & { role: string };.

readonly properties (readonly id: string) prevent reassignment after creation, which is useful for immutable data structures.

## Conclusion

Interfaces and type aliases both describe object shapes using TypeScript's structural typing, but interfaces support declaration merging and extends for inheritance, while type aliases alone can express unions, tuples, and other non-object shapes via intersection. readonly properties round this out by preventing reassignment after an object is created.`,
        contentTh: `Interface ใช้อธิบายรูปร่าง (shape) ของอ็อบเจกต์ เช่น interface User { id: string; name: string; age?: number } เครื่องหมาย ? บ่งบอกว่า age เป็น optional ค่าหนึ่งๆ จะถือว่าตรงกับ interface ก็ต่อเมื่อมี property เหล่านั้นครบอย่างน้อยพร้อมชนิดข้อมูลที่เข้ากันได้ — TypeScript ใช้ structural typing ไม่ใช่ nominal typing ดังนั้นชนิดข้อมูลที่ไม่เกี่ยวข้องกันเลยแต่มีรูปร่างเดียวกันก็สามารถใช้แทนกันได้

Type alias (type User = { id: string; name: string }) สามารถอธิบายรูปร่างอ็อบเจกต์แบบเดียวกันได้ รวมถึง union, tuple และ primitive ซึ่ง interface ทำไม่ได้ เช่น type ID = string | number; ในทางปฏิบัติ ให้ใช้ interface สำหรับรูปร่างอ็อบเจกต์ที่คุณคาดว่าจะถูก extend หรือ implement โดยคลาสในอนาคต และใช้ type สำหรับ union, tuple หรือ mapped/utility type

Interface รองรับ declaration merging — การประกาศ interface ชื่อเดียวกันซ้ำสองครั้งจะทำให้สมาชิกของทั้งคู่ถูกรวมเข้าด้วยกัน — และรองรับ extends สำหรับการสืบทอด เช่น interface Admin extends User { role: string } ส่วน type alias ใช้ intersection (&) แทน เช่น type Admin = User & { role: string };

property ที่เป็น readonly (readonly id: string) จะป้องกันไม่ให้มีการกำหนดค่าใหม่หลังจากสร้างแล้ว ซึ่งมีประโยชน์สำหรับโครงสร้างข้อมูลแบบ immutable

## สรุป

Interface และ type alias ต่างก็ใช้อธิบายรูปร่างของอ็อบเจกต์ผ่าน structural typing ของ TypeScript ได้เหมือนกัน แต่ interface รองรับ declaration merging และ extends สำหรับการสืบทอด ส่วน type alias เท่านั้นที่สามารถแสดง union, tuple และรูปร่างอื่นที่ไม่ใช่อ็อบเจกต์ได้ผ่าน intersection property ที่เป็น readonly ช่วยเสริมด้วยการป้องกันไม่ให้กำหนดค่าใหม่หลังจากสร้างอ็อบเจกต์แล้ว`,
        labs: [
          {
            id: "describe-user",
            title: "Describe a User",
            instructions: "Complete `describeUser` so it returns just the name, or `\"Name (age)\"` when age is present.",
            starterCode: `interface User {
  id: string;
  name: string;
  age?: number;
}

function describeUser(user: User): string {
  // TODO: implement this
  return "";
}`,
            testCode: `check(describeUser({ id: "1", name: "Ada" }), "Ada", "no age -> just the name");
check(describeUser({ id: "2", name: "Grace", age: 30 }), "Grace (30)", "with age -> name and age in parens");`,
            hint: "Check whether `user.age !== undefined` before deciding which string to build.",
          },
        ],
      },
      {
        slug: "functions",
        titleEn: "Functions",
        titleTh: "ฟังก์ชัน",
        order: 4,
        contentEn: `Function parameters and return values can be typed explicitly: function add(a: number, b: number): number { return a + b; }. TypeScript infers the return type from the function body when omitted, so explicit return types are mostly for documentation and to catch unintended type changes.

Optional parameters use ?: function greet(name: string, title?: string) {}. Default parameters (function greet(name: string, title = "Friend")) are automatically treated as optional.

Function types can be written as a standalone type: type BinaryOp = (a: number, b: number) => number;. This is how you type callbacks and higher-order functions, e.g. function apply(op: BinaryOp, a: number, b: number) { return op(a, b); }.

Overloads let a function have multiple valid call signatures with different parameter/return types, useful when a function's behavior genuinely varies by input shape rather than by a simple union type.

## Conclusion

Function parameters and return values can be typed explicitly or left to TypeScript's inference, with optional and default parameters covering the common case of a value that may or may not be supplied. Standalone function types make callbacks and higher-order functions type-safe, and overloads handle the rarer case where a function's behavior genuinely varies by input shape.`,
        contentTh: `พารามิเตอร์และค่า return ของฟังก์ชันสามารถกำกับชนิดข้อมูลได้อย่างชัดเจน เช่น function add(a: number, b: number): number { return a + b; } หากไม่ระบุ return type ไว้ TypeScript จะอนุมานให้จาก body ของฟังก์ชันเอง ดังนั้นการระบุ return type อย่างชัดเจนส่วนใหญ่จึงมีไว้เพื่อเป็นเอกสารอธิบายและเพื่อดักจับการเปลี่ยนแปลงชนิดข้อมูลที่ไม่ได้ตั้งใจ

พารามิเตอร์แบบ optional ใช้เครื่องหมาย ? เช่น function greet(name: string, title?: string) {} ส่วนพารามิเตอร์ที่มีค่าเริ่มต้น (function greet(name: string, title = "Friend")) จะถูกถือว่าเป็น optional โดยอัตโนมัติ

ชนิดข้อมูลของฟังก์ชันสามารถเขียนแยกเป็น type ของตัวเองได้ เช่น type BinaryOp = (a: number, b: number) => number; นี่คือวิธีที่คุณใช้กำกับชนิดข้อมูลให้กับ callback และ higher-order function เช่น function apply(op: BinaryOp, a: number, b: number) { return op(a, b); }

Overload ช่วยให้ฟังก์ชันหนึ่งมี call signature ที่ถูกต้องได้หลายแบบ โดยมีพารามิเตอร์/return type ต่างกัน ซึ่งมีประโยชน์เมื่อพฤติกรรมของฟังก์ชันเปลี่ยนแปลงไปจริงๆ ตามรูปร่างของ input มากกว่าจะเป็นแค่ union type ธรรมดา

## สรุป

พารามิเตอร์และค่า return ของฟังก์ชันสามารถกำกับชนิดข้อมูลได้อย่างชัดเจน หรือปล่อยให้ TypeScript อนุมานให้ก็ได้ โดยพารามิเตอร์แบบ optional และแบบมีค่าเริ่มต้นครอบคลุมกรณีทั่วไปที่ค่าอาจถูกส่งเข้ามาหรือไม่ก็ได้ function type แบบแยกเดี่ยวช่วยให้ callback และ higher-order function ปลอดภัยด้านชนิดข้อมูล ส่วน overload ใช้จัดการกรณีที่พบไม่บ่อยนักซึ่งพฤติกรรมของฟังก์ชันเปลี่ยนแปลงไปจริงๆ ตามรูปร่างของ input`,
        labs: [
          {
            id: "apply-callback",
            title: "Apply a Callback",
            instructions: "Complete `apply` so it calls the given `op` callback with `a` and `b` and returns the result.",
            starterCode: `function apply(op: (a: number, b: number) => number, a: number, b: number): number {
  // TODO: implement this
  return 0;
}`,
            testCode: `check(apply((a, b) => a + b, 2, 3), 5, "works with an addition callback");
check(apply((a, b) => a * b, 4, 5), 20, "works with a multiplication callback");`,
            hint: "Just call `op(a, b)` and return what it gives back.",
          },
        ],
      },
      {
        slug: "generics",
        titleEn: "Generics",
        titleTh: "Generics",
        order: 5,
        contentEn: `Generics let you write reusable code that works over a variety of types while preserving type information, instead of falling back to any. A generic function identity<T>(value: T): T { return value; } returns exactly the type it was given — identity(5) is typed number, identity("x") is typed string.

Generic constraints (extends) restrict what a type parameter can be: function getLength<T extends { length: number }>(item: T) { return item.length; } — this accepts arrays, strings, or any object with a numeric length property.

Generics apply to interfaces, type aliases, and classes too: interface Box<T> { value: T }, class Stack<T> { push(item: T): void {} }. This is how built-in types like Array<T>, Promise<T>, and Map<K, V> are defined.

Default type parameters (function wrap<T = string>(value: T)) let callers omit the generic argument when a sensible default exists.

## Conclusion

Generics let you write reusable functions, interfaces, and classes that preserve type information across a variety of inputs instead of falling back to any. Constraints restrict what a type parameter can be, and default type parameters let callers omit the generic argument when a sensible default exists — this is exactly how built-in types like Array, Promise, and Map are defined.`,
        contentTh: `Generics ช่วยให้คุณเขียนโค้ดที่นำกลับมาใช้ใหม่ได้ (reusable) และรองรับชนิดข้อมูลได้หลากหลาย โดยยังคงรักษาข้อมูลชนิดข้อมูลไว้ แทนที่จะต้องพึ่งพา any ฟังก์ชัน generic อย่าง identity<T>(value: T): T { return value; } จะ return ชนิดข้อมูลเดียวกับที่ถูกส่งเข้ามาเป๊ะๆ — identity(5) จะมีชนิดข้อมูลเป็น number ส่วน identity("x") จะมีชนิดข้อมูลเป็น string

Generic constraint (extends) ใช้จำกัดว่า type parameter สามารถเป็นอะไรได้บ้าง เช่น function getLength<T extends { length: number }>(item: T) { return item.length; } — ฟังก์ชันนี้จะรับได้ทั้ง array, string หรืออ็อบเจกต์ใดๆ ที่มี property length เป็นตัวเลข

Generics สามารถใช้กับ interface, type alias และคลาสได้ด้วยเช่นกัน เช่น interface Box<T> { value: T }, class Stack<T> { push(item: T): void {} } นี่คือวิธีที่ชนิดข้อมูลในตัวอย่าง Array<T>, Promise<T> และ Map<K, V> ถูกนิยามขึ้นมา

Default type parameter (function wrap<T = string>(value: T)) ช่วยให้ผู้เรียกใช้สามารถละ generic argument ไปได้ เมื่อมีค่าเริ่มต้นที่สมเหตุสมผลอยู่แล้ว

## สรุป

Generics ช่วยให้คุณเขียนฟังก์ชัน, interface และคลาสที่นำกลับมาใช้ใหม่ได้ โดยยังคงรักษาข้อมูลชนิดข้อมูลไว้กับ input ที่หลากหลาย แทนที่จะต้องพึ่งพา any Constraint ใช้จำกัดว่า type parameter เป็นอะไรได้บ้าง ส่วน default type parameter ช่วยให้ผู้เรียกใช้ละ generic argument ได้เมื่อมีค่าเริ่มต้นที่สมเหตุสมผล — นี่คือวิธีที่ชนิดข้อมูลในตัวอย่างอย่าง Array, Promise และ Map ถูกนิยามขึ้นมาจริงๆ`,
        labs: [
          {
            id: "first-or-default",
            title: "First or Default",
            instructions: "Complete the generic function `firstOrDefault` so it returns the array's first element, or `fallback` when the array is empty.",
            starterCode: `function firstOrDefault<T>(items: T[], fallback: T): T {
  // TODO: implement this
  return fallback;
}`,
            testCode: `check(firstOrDefault([1, 2, 3], 0), 1, "returns the first element when the array is non-empty");
check(firstOrDefault([], 0), 0, "returns the fallback when the array is empty");
check(firstOrDefault(["a", "b"], "z"), "a", "works with strings too, not just numbers");`,
            hint: "Check `items.length > 0` before returning `items[0]`.",
          },
        ],
      },
      {
        slug: "union-types-and-narrowing",
        titleEn: "Union Types & Narrowing",
        titleTh: "Union Types และ Narrowing",
        order: 6,
        contentEn: `A union type (type Id = string | number;) means a value can be one of several types. TypeScript only allows operations that are valid for every member of the union until you narrow it to a more specific type.

Narrowing happens through control flow: typeof checks (if (typeof id === "string")), instanceof checks, Array.isArray, truthiness checks, and equality checks against literal types all narrow a union within the branch where the check holds.

Discriminated unions use a shared literal-typed field to distinguish variants: type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };. Switching on shape.kind lets TypeScript narrow to the exact variant inside each case, and exhaustiveness checking (via a never-typed default case) catches missing cases at compile time.

Type predicates (function isString(x: unknown): x is string { return typeof x === "string"; }) let you encapsulate a narrowing check in a reusable function that TypeScript understands as a type guard.

## Conclusion

Union types let a value be one of several types, and narrowing — through typeof checks, instanceof, or other control-flow patterns — lets TypeScript treat it as a more specific type within a branch. Discriminated unions with a shared literal field make narrowing exhaustive and compiler-checked, and type predicates let you package a narrowing check into a reusable, TypeScript-recognized type guard.`,
        contentTh: `Union type (type Id = string | number;) หมายความว่าค่านั้นสามารถเป็นได้หนึ่งในหลายชนิดข้อมูล TypeScript จะอนุญาตให้ทำเฉพาะ operation ที่ใช้ได้กับทุกสมาชิกของ union เท่านั้น จนกว่าคุณจะ narrow มันให้แคบลงเป็นชนิดข้อมูลที่เจาะจงมากขึ้น

การ narrow เกิดขึ้นผ่าน control flow ต่างๆ ได้แก่ การตรวจสอบด้วย typeof (if (typeof id === "string")), การตรวจสอบด้วย instanceof, Array.isArray, การตรวจสอบความเป็นจริง (truthiness) และการตรวจสอบความเท่ากันกับ literal type — ทั้งหมดนี้จะ narrow union ให้แคบลงภายใน branch ที่เงื่อนไขนั้นเป็นจริง

Discriminated union ใช้ field ที่เป็น literal type ร่วมกันเพื่อแยกแยะแต่ละ variant เช่น type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number }; การ switch บน shape.kind จะทำให้ TypeScript narrow ไปยัง variant ที่ถูกต้องในแต่ละ case ได้ และการตรวจสอบ exhaustiveness (ผ่าน default case ที่มีชนิดข้อมูลเป็น never) จะช่วยดักจับ case ที่ตกหล่นไปได้ตั้งแต่ตอน compile time

Type predicate (function isString(x: unknown): x is string { return typeof x === "string"; }) ช่วยให้คุณสามารถห่อหุ้มการตรวจสอบเพื่อ narrow ไว้ในฟังก์ชันที่นำกลับมาใช้ใหม่ได้ ซึ่ง TypeScript จะเข้าใจว่าเป็น type guard

## สรุป

Union type ทำให้ค่าหนึ่งๆ เป็นได้หนึ่งในหลายชนิดข้อมูล และการ narrow — ผ่านการตรวจสอบด้วย typeof, instanceof หรือ control-flow pattern อื่นๆ — ทำให้ TypeScript มองว่าค่านั้นเป็นชนิดข้อมูลที่เจาะจงมากขึ้นภายใน branch นั้น Discriminated union ที่มี field แบบ literal ร่วมกันทำให้การ narrow ครอบคลุมทุกกรณีและตรวจสอบได้โดยคอมไพเลอร์ ส่วน type predicate ช่วยให้คุณห่อหุ้มการตรวจสอบเพื่อ narrow ไว้เป็น type guard ที่นำกลับมาใช้ใหม่ได้และ TypeScript จดจำได้`,
        labs: [
          {
            id: "shape-area",
            title: "Compute a Shape's Area",
            instructions: "Complete `area` so it returns the right formula depending on whether `shape` is a circle or a square.",
            starterCode: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  // TODO: implement this
  return 0;
}`,
            testCode: `check(area({ kind: "circle", radius: 2 }), Math.PI * 4, "computes a circle's area");
check(area({ kind: "square", side: 3 }), 9, "computes a square's area");`,
            hint: "Switch on `shape.kind` — TypeScript narrows the type inside each branch.",
          },
        ],
      },
    ],
  },
  {
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

\`Car\` is the class — the blueprint, defining the \`brand\` property. Declaring it allocates no memory by itself; it's only a definition. \`myCar\` is the object — the \`new\` keyword is what triggers instantiation: it allocates memory and runs the constructor, producing a real instance with \`brand\` set to \`"Tesla"\`.

## Conclusion

A class is a logical blueprint that costs no memory on its own; an object is the real, physical instance \`new\` creates from it, with memory allocated and the constructor run at that moment. One class can produce many independent objects, each with its own state built from the same structure.`,
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

\`Car\` คือคลาส — พิมพ์เขียวที่กำหนด property \`brand\` การประกาศคลาสไม่ได้จัดสรรหน่วยความจำใดๆ ด้วยตัวมันเอง มันเป็นเพียงนิยามเท่านั้น \`myCar\` คืออ็อบเจกต์ — คีย์เวิร์ด \`new\` คือตัวที่ทำให้เกิดการสร้างอินสแตนซ์ (instantiation): มันจัดสรรหน่วยความจำและรันคอนสตรัคเตอร์ (constructor) เพื่อสร้างอินสแตนซ์จริงที่มี \`brand\` เป็น \`"Tesla"\`

## สรุป

class คือพิมพ์เขียวเชิงตรรกะที่ไม่ใช้หน่วยความจำด้วยตัวมันเอง ส่วน object คืออินสแตนซ์จริงทางกายภาพที่ \`new\` สร้างขึ้น โดยหน่วยความจำจะถูกจัดสรรและ constructor จะถูกรันในจังหวะนั้น คลาสหนึ่งตัวสามารถสร้างอ็อบเจกต์อิสระได้หลายตัว แต่ละตัวมี state เป็นของตัวเองแม้จะมาจากโครงสร้างเดียวกัน`,
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

\`balance\` is a field — it holds the account's state. \`deposit()\` is a method — the behavior that changes that state, using \`this\` to reference the field on the current instance.

## Conclusion

Fields and methods are a class's two structural components: fields hold an object's state (the nouns), while methods define its behavior (the verbs) and use \`this\` to reach the current instance's own fields. Together they let a class bundle data and the logic that acts on it into one unit.`,
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

\`balance\` คือฟิลด์ — เก็บสถานะของบัญชี \`deposit()\` คือเมธอด — เป็นพฤติกรรมที่เปลี่ยนสถานะนั้น โดยใช้ \`this\` เพื่ออ้างอิงฟิลด์ของอินสแตนซ์ปัจจุบัน

## สรุป

field และ method คือสององค์ประกอบเชิงโครงสร้างของคลาส: field เก็บ state ของอ็อบเจกต์ (เปรียบเสมือนคำนาม) ส่วน method กำหนดพฤติกรรม (เปรียบเสมือนคำกริยา) และใช้ \`this\` เพื่อเข้าถึง field ของอินสแตนซ์ปัจจุบัน ทั้งสองอย่างรวมกันทำให้คลาสรวมข้อมูลและ logic ที่ทำงานกับข้อมูลนั้นไว้เป็นหน่วยเดียว`,
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
4. Use \`new ClassName()\` to allocate memory and create an object.

## Conclusion

The key distinction interviewers probe here is that a class carries both structure and real, runtime implementation, while an interface is a compile-time-only contract with zero implementation. The other trap to remember is that a field must always be reached through \`this\` inside a method — omitting it throws a \`ReferenceError\` rather than silently reading the field.`,
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
4. ใช้ \`new ClassName()\` เพื่อจัดสรรหน่วยความจำและสร้างอ็อบเจกต์

## สรุป

จุดที่ผู้สัมภาษณ์มักถามคือความต่างระหว่างคลาสที่มีทั้งโครงสร้างและ implementation จริงตอน runtime กับ interface ที่เป็นแค่ contract ตอน compile-time เท่านั้นและไม่มี implementation เลย อีกกับดักที่ต้องจำคือภายในเมธอดต้องเข้าถึง field ผ่าน \`this\` เสมอ ถ้าละไว้จะเกิด \`ReferenceError\` ไม่ใช่แค่อ่านค่าไม่ได้เงียบๆ`,
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
\`\`\`

## Conclusion

A constructor is the special method TypeScript invokes automatically the moment \`new\` allocates memory for an object, and its job is purely to initialize that object's fields — it can never return a value. The object-initialization flow is fixed: \`new\` allocates memory, \`constructor()\` runs and sets up state, and only then is the object ready to use.`,
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
\`\`\`

## สรุป

constructor คือเมธอดพิเศษที่ TypeScript เรียกโดยอัตโนมัติทันทีที่ \`new\` จัดสรรหน่วยความจำให้อ็อบเจกต์ หน้าที่ของมันคือกำหนดค่าเริ่มต้นให้ field เท่านั้น และไม่สามารถ return ค่าใดๆ ได้เลย ลำดับการสร้างอ็อบเจกต์คงที่เสมอ: \`new\` จัดสรรหน่วยความจำ → \`constructor()\` รันและกำหนดค่า state → อ็อบเจกต์พร้อมใช้งาน`,
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
\`\`\`

## Conclusion

A default constructor hardcodes an object's initial values, while a parameterized constructor lets the caller supply them dynamically — but unlike Java or C++, TypeScript allows only one \`constructor()\` per class, so overloading multiple constructor signatures is a compile error.`,
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
\`\`\`

## สรุป

default constructor กำหนดค่าเริ่มต้นแบบ hardcode ไว้ตายตัว ส่วน parameterized constructor ให้ผู้เรียกส่งค่าเข้ามาแบบไดนามิกได้ แต่ต่างจาก Java หรือ C++ ตรงที่ TypeScript อนุญาตให้มี \`constructor()\` ได้แค่ 1 ตัวต่อคลาสเท่านั้น การเขียน constructor หลาย signature ซ้อนกันจะเกิด compile error ทันที`,
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

**Rule of thumb:** if you don't include an access modifier (like \`public\`, \`private\`) or \`readonly\` in the constructor signature, it remains a normal parameter and NO class property is automatically created.

## Conclusion

Parameter properties are a TypeScript-only shortcut: adding an access modifier like \`public\` or \`private\` directly to a constructor parameter declares the field and assigns it in one step, replacing the usual declare-pass-assign pattern. Leave the modifier off, though, and it stays a plain parameter — no field gets created automatically.`,
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

**กฎง่ายๆ ที่ต้องจำ:** ถ้าไม่ใส่ access modifier (เช่น \`public\`, \`private\`) หรือ \`readonly\` ใน constructor signature พารามิเตอร์นั้นจะยังเป็นแค่พารามิเตอร์ปกติ และ**จะไม่มี**การสร้าง class property ให้อัตโนมัติ

## สรุป

parameter properties เป็นทางลัดเฉพาะของ TypeScript: การใส่ access modifier อย่าง \`public\` หรือ \`private\` ลงบน constructor parameter โดยตรง จะประกาศ field และกำหนดค่าให้ในขั้นตอนเดียว แทนที่รูปแบบ declare-pass-assign ตามปกติ แต่ถ้าไม่ใส่ modifier พารามิเตอร์นั้นจะยังเป็นแค่พารามิเตอร์ธรรมดา ไม่มี field ถูกสร้างให้อัตโนมัติ`,
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
- **No overloading:** only ONE implementation of \`constructor()\` is allowed per class in TypeScript.

## Conclusion

Since TypeScript never allows constructor overloading, the standard workaround is default parameters, optional parameters, or union-typed parameters inside the single allowed \`constructor()\` — combined with parameter properties, this covers most real-world initialization needs without extra boilerplate.`,
        contentTh: `**สถานการณ์สัมภาษณ์งาน:** "คุณจัดการกับการกำหนดค่าเริ่มต้นแบบ optional ใน constructor อย่างไร ในเมื่อ TS ไม่รองรับ constructor overloading?"

คำตอบที่คาดหวัง: เนื่องจากมี implementation ได้แค่ตัวเดียว เราจึงทำให้เกิดพฤติกรรมแบบไดนามิกได้ด้วย:
- Default parameters: \`constructor(age: number = 18)\`
- Optional parameters: \`constructor(name?: string)\`
- Union types: \`constructor(id: string | number)\`

**สรุปทบทวน:**
- **จุดประสงค์ของ constructor:** กำหนดค่าเริ่มต้นให้ property ของอ็อบเจกต์ทันทีที่คีย์เวิร์ด \`new\` จัดสรรหน่วยความจำใน heap
- **Parameter properties:** การใส่ \`public\`/\`private\` ลงบน constructor parameter จะประกาศและกำหนดค่าเริ่มต้นให้ property นั้นอัตโนมัติ — ประหยัดเวลาได้มาก
- **ไม่มี overloading:** อนุญาตให้มี \`constructor()\` ได้แค่ 1 implementation ต่อคลาสเท่านั้นใน TypeScript

## สรุป

เนื่องจาก TypeScript ไม่รองรับ constructor overloading เลย วิธีแก้ปัญหามาตรฐานคือใช้ default parameter, optional parameter หรือ union type parameter ภายใน \`constructor()\` ตัวเดียวที่อนุญาต — เมื่อรวมกับ parameter properties แล้วก็ครอบคลุมความต้องการ initialization ส่วนใหญ่ในงานจริงได้โดยไม่ต้องเขียนโค้ดซ้ำซ้อน`,
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

**TypeScript vs JavaScript (runtime behavior):** access modifiers are a compile-time-only feature. When compiled to traditional JavaScript (ES5/ES6), the \`private\` and \`protected\` keywords are erased entirely — everything technically becomes public at runtime. (Modern JS now supports true private fields at runtime using the \`#\` prefix.)

## Conclusion

TypeScript's four access modifiers — \`public\`, \`private\`, \`protected\`, and \`readonly\` — are the mechanism behind encapsulation, controlling exactly where a property or method can be reached from. It's worth remembering they're compile-time-only: traditional JS output erases \`private\`/\`protected\` entirely, so true runtime privacy needs the newer \`#\` field syntax instead.`,
        contentTh: `Access modifier คือคีย์เวิร์ดที่ใช้กำหนดการมองเห็น (การเข้าถึง) ของคลาส, property และเมธอด TypeScript มี modifier หลัก 4 ตัวคือ \`public\`, \`private\`, \`protected\` และ \`readonly\`

นี่คือกลไกหลักเบื้องหลังแนวคิด **encapsulation**: การซ่อนสถานะภายในและบังคับให้การโต้ตอบทั้งหมดต้องทำผ่านเมธอดของอ็อบเจกต์เท่านั้น

| Modifier | ภายในคลาส | Subclass (ลูก) | ภายนอก (อินสแตนซ์) |
| --- | --- | --- | --- |
| \`public\` | ✔ | ✔ | ✔ |
| \`protected\` | ✔ | ✔ | ✘ |
| \`private\` | ✔ | ✘ | ✘ |

**TypeScript กับ JavaScript (พฤติกรรมตอน runtime):** access modifier เป็นฟีเจอร์ที่มีผลแค่ตอน compile-time เท่านั้น เมื่อ compile เป็น JavaScript แบบดั้งเดิม (ES5/ES6) คีย์เวิร์ด \`private\` และ \`protected\` จะถูกลบทิ้งไปทั้งหมด — ทุกอย่างกลายเป็น public จริงๆ ตอน runtime (JS สมัยใหม่รองรับ private field จริงตอน runtime แล้วด้วยการใช้ prefix \`#\`)

## สรุป

access modifier ทั้ง 4 ตัวของ TypeScript — \`public\`, \`private\`, \`protected\` และ \`readonly\` — คือกลไกเบื้องหลัง encapsulation ที่ควบคุมว่า property หรือเมธอดจะถูกเข้าถึงจากที่ไหนได้บ้าง สิ่งที่ควรจำคือมันมีผลแค่ตอน compile-time เท่านั้น เมื่อ compile เป็น JS แบบดั้งเดิม \`private\`/\`protected\` จะถูกลบทิ้งไปทั้งหมด ถ้าต้องการความเป็นส่วนตัวจริงตอน runtime ต้องใช้ syntax field แบบ \`#\` แทน`,
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
\`\`\`

Why bother, when JavaScript has no such restriction at runtime? Because \`private\` is a promise to the rest of your codebase: "nothing outside this class depends on this field's shape." That promise is what lets you freely rename, restructure, or delete \`pin\` later — the compiler will flag every place inside \`Bank\` that needs updating, and guarantee nothing *outside* \`Bank\` could have been relying on it, since it was never reachable. A \`public\` field carries no such guarantee — anything, anywhere, could already depend on it.

\`private\` also combines with the parameter-property shorthand from the earlier lesson:

\`\`\`ts
class Bank {
  constructor(private pin: number) {} // declares + assigns + makes private, in one line
}
\`\`\`

## Conclusion

\`public\` is TypeScript's implicit default — accessible from anywhere unless stated otherwise — while \`private\` locks a member to only the class that declares it, blocking access from both outside instances and child classes. That restriction is what makes a private field safe to refactor later: nothing outside the class could have depended on it.`,
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
\`\`\`

แล้วทำไมต้องใช้ ในเมื่อ JavaScript ไม่มีข้อจำกัดแบบนี้ตอน runtime เลย? เพราะ \`private\` คือคำสัญญาต่อโค้ดส่วนอื่นในระบบ: "ไม่มีอะไรภายนอกคลาสนี้พึ่งพารูปร่างของ field นี้อยู่" คำสัญญานี้แหละที่ทำให้คุณ rename, ปรับโครงสร้าง หรือลบ \`pin\` ในภายหลังได้อย่างอิสระ — compiler จะแจ้งทุกจุด*ภายใน* \`Bank\` ที่ต้องแก้ไข และรับประกันว่าไม่มีอะไร*ภายนอก* \`Bank\` พึ่งพามันอยู่ เพราะมันไม่เคยเข้าถึงได้จากภายนอกตั้งแต่แรก ส่วน \`public\` field ไม่มีการรับประกันแบบนี้เลย — อะไรก็ตาม ที่ไหนก็ตาม อาจพึ่งพามันอยู่แล้วก็ได้

\`private\` ยังใช้ร่วมกับทางลัด parameter property จากบทเรียนก่อนหน้าได้ด้วย:

\`\`\`ts
class Bank {
  constructor(private pin: number) {} // declares + assigns + makes private, in one line
}
\`\`\`

## สรุป

\`public\` คือค่าเริ่มต้นโดยนัยของ TypeScript — เข้าถึงได้จากทุกที่ถ้าไม่ระบุเป็นอย่างอื่น ส่วน \`private\` จะจำกัดให้เข้าถึงได้เฉพาะภายในคลาสที่ประกาศเท่านั้น บล็อกทั้งการเข้าถึงจาก instance ภายนอกและจาก child class ข้อจำกัดนี้เองที่ทำให้ private field ปลอดภัยต่อการ refactor ในภายหลัง เพราะไม่มีอะไรภายนอกคลาสพึ่งพามันอยู่ได้`,
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

**Interview trap — private vs protected:** interviewers often ask, "if both block instance access, why use \`protected\` over \`private\`?" Answer: use \`private\` when you want to absolutely hide data — even from your own subclasses — to prevent them from breaking core logic. Use \`protected\` when designing a base class specifically meant to be extended, where child classes need to manipulate that internal state.

## Conclusion

\`protected\` behaves like \`private\` toward outside code but opens an exception for subclasses, making it the right choice for a base class designed to be extended, while \`private\` remains the right choice when internal state must stay hidden even from child classes.`,
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

**กับดักสัมภาษณ์ — private กับ protected:** ผู้สัมภาษณ์มักถามว่า "ถ้าทั้งคู่บล็อกการเข้าถึงจาก instance เหมือนกัน แล้วทำไมต้องใช้ \`protected\` แทน \`private\`?" คำตอบ: ใช้ \`private\` เมื่อต้องการซ่อนข้อมูลแบบเด็ดขาด — แม้แต่จาก subclass ของตัวเอง — เพื่อป้องกันไม่ให้ subclass มาทำลาย core logic ส่วนใช้ \`protected\` เมื่อออกแบบ base class ที่ตั้งใจให้ถูก extend ต่อ และ child class จำเป็นต้องเข้าถึง/แก้ไขสถานะภายในนั้นได้

## สรุป

\`protected\` ทำงานเหมือน \`private\` ต่อโค้ดภายนอก แต่เปิดข้อยกเว้นให้ subclass เข้าถึงได้ ทำให้มันเหมาะกับ base class ที่ออกแบบมาให้ถูก extend ต่อ ส่วน \`private\` ยังคงเหมาะกับกรณีที่ต้องการซ่อนสถานะภายในแม้แต่จาก child class ก็ตาม`,
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
- **R/O** \`readonly\`: prevents modification after instantiation; constructor initialization is allowed.

## Conclusion

\`readonly\` locks a property after its initial assignment (in the declaration or the constructor), which is distinct from \`const\` since it applies per-instance rather than to a variable binding — and together with \`public\`, \`protected\`, and \`private\`, it rounds out TypeScript's four access/mutability modifiers covered in this section.`,
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
- **R/O** \`readonly\`: ป้องกันการแก้ไขหลังจากสร้างอินสแตนซ์แล้ว แต่กำหนดค่าใน constructor ได้

## สรุป

\`readonly\` ล็อกไม่ให้แก้ไข property หลังจากกำหนดค่าครั้งแรก (ตอนประกาศหรือใน constructor) ซึ่งต่างจาก \`const\` ตรงที่มันมีผลต่ออินสแตนซ์แต่ละตัว ไม่ใช่ต่อการ bind ตัวแปร และเมื่อรวมกับ \`public\`, \`protected\`, \`private\` แล้วก็ครบทั้ง 4 modifier ด้านการเข้าถึง/การแก้ไขที่หัวข้อนี้ครอบคลุม`,
      },
      {
        slug: "encapsulation-and-data-hiding",
        titleEn: "Encapsulation & Data Hiding",
        titleTh: "Encapsulation และ Data Hiding",
        order: 12,
        contentEn: `Encapsulation is "the shield of OOP": bundling data (properties) and the methods that operate on that data into a single unit (a class).

**Data hiding** is restricting direct access to some of an object's components, usually using the \`private\` modifier. The goal is to prevent outside code from putting the object into an invalid state.

Here's the problem encapsulation solves. Without it, any field is a public field, and public fields can be set to anything:

\`\`\`ts
class BankAccount {
  balance: number = 0; // public by default — no protection
}

const acc = new BankAccount();
acc.balance = -500; // ✅ compiles fine, but a negative balance is nonsense
\`\`\`

TypeScript has no complaint here — \`balance\` is a \`number\`, and \`-500\` is a valid \`number\`. Nothing in the type system captures the *business rule* that a balance shouldn't go negative. Encapsulation fixes this by hiding the field and forcing every write through a method that can enforce the rule:

\`\`\`ts
class BankAccount {
  private balance: number = 0;

  deposit(amount: number) {
    if (amount <= 0) throw new Error('Deposit must be positive');
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.balance -= amount;
  }
}

const acc = new BankAccount();
acc.balance = -500; // ❌ compile error: 'balance' is private
acc.withdraw(100); // throws — enforces the rule at runtime too
\`\`\`

Now the class itself is the only code that can touch \`balance\` directly, so every mutation is guaranteed to go through \`deposit\`/\`withdraw\` and their validation. The next lesson (Getters & Setters) covers the pattern for still allowing controlled *reads* of a private field.

## Conclusion

Encapsulation bundles an object's data and the methods that operate on it into one class, and data hiding — usually enforced with \`private\` — is the practical technique that keeps outside code from pushing that object into an invalid state, by routing every mutation through methods that can validate it.`,
        contentTh: `Encapsulation คือ "โล่ป้องกัน" ของ OOP: การรวมข้อมูล (property) และเมธอดที่ทำงานกับข้อมูลนั้นเข้าไว้เป็นหน่วยเดียวกัน (คลาส)

**Data hiding** คือการจำกัดการเข้าถึงโดยตรงต่อบางส่วนขององค์ประกอบของอ็อบเจกต์ โดยมักใช้ modifier \`private\` เป้าหมายคือป้องกันไม่ให้โค้ดภายนอกทำให้อ็อบเจกต์ตกอยู่ในสถานะที่ไม่ถูกต้อง (invalid state)

นี่คือปัญหาที่ encapsulation แก้ให้ ถ้าไม่มีมัน field ใดๆ ก็จะเป็น public field และ public field สามารถถูกกำหนดเป็นค่าอะไรก็ได้:

\`\`\`ts
class BankAccount {
  balance: number = 0; // public by default — no protection
}

const acc = new BankAccount();
acc.balance = -500; // ✅ compiles fine, but a negative balance is nonsense
\`\`\`

TypeScript ไม่บ่นอะไรเลยตรงนี้ — \`balance\` เป็นชนิด \`number\` และ \`-500\` ก็เป็นค่า \`number\` ที่ถูกต้อง ไม่มีอะไรใน type system ที่จับ *กฎทางธุรกิจ* ได้ว่ายอดเงินไม่ควรติดลบ encapsulation แก้ปัญหานี้ด้วยการซ่อน field และบังคับให้การเขียนทุกครั้งต้องผ่านเมธอดที่บังคับใช้กฎได้:

\`\`\`ts
class BankAccount {
  private balance: number = 0;

  deposit(amount: number) {
    if (amount <= 0) throw new Error('Deposit must be positive');
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.balance -= amount;
  }
}

const acc = new BankAccount();
acc.balance = -500; // ❌ compile error: 'balance' is private
acc.withdraw(100); // throws — enforces the rule at runtime too
\`\`\`

ตอนนี้ตัวคลาสเองเท่านั้นที่แตะ \`balance\` โดยตรงได้ ทุกการเปลี่ยนแปลงจึงต้องผ่าน \`deposit\`/\`withdraw\` และ validation ของมันเสมอ บทเรียนถัดไป (Getters & Setters) จะพูดถึงรูปแบบที่ยังอนุญาตให้ *อ่าน* private field ได้แบบมีการควบคุม

## สรุป

encapsulation คือการรวมข้อมูลของอ็อบเจกต์และเมธอดที่ทำงานกับข้อมูลนั้นไว้เป็นคลาสเดียว ส่วน data hiding — ที่มักบังคับใช้ด้วย \`private\` — คือเทคนิคที่ใช้จริงในการป้องกันไม่ให้โค้ดภายนอกทำให้อ็อบเจกต์ตกอยู่ในสถานะที่ไม่ถูกต้อง ด้วยการบังคับให้ทุกการเปลี่ยนแปลงต้องผ่านเมธอดที่ตรวจสอบความถูกต้องได้`,
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

Because the setter runs validation logic, \`user.age = -5\` throws instead of silently corrupting the object's state — something a plain public field could never enforce.

## Conclusion

Getters and setters put a gatekeeper in front of a private field: \`get\` controls how it's read and \`set\` can run validation logic before allowing a write, which is exactly what lets a setter reject an invalid value instead of silently corrupting the object's state the way a plain public field would.`,
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

เนื่องจาก setter มี validation logic อยู่ภายใน การเขียน \`user.age = -5\` จะโยน error ทันที แทนที่จะปล่อยให้สถานะของอ็อบเจกต์เสียหายไปเงียบๆ — ซึ่งเป็นสิ่งที่ public field ธรรมดาไม่สามารถบังคับได้เลย

## สรุป

getter และ setter คือผู้เฝ้าประตูที่วางไว้หน้า private field: \`get\` ควบคุมวิธีการอ่านค่า ส่วน \`set\` สามารถรัน validation logic ก่อนอนุญาตให้เขียนค่าได้ ซึ่งเป็นสิ่งที่ทำให้ setter ปฏิเสธค่าที่ไม่ถูกต้องได้ แทนที่จะปล่อยให้ state ของอ็อบเจกต์เสียหายไปเงียบๆ แบบที่ public field ธรรมดาทำไม่ได้`,
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

**Interview trap — can you use \`this\` inside a static method?** No. \`this\` refers to the current object instance. Since static methods belong to the class (and there's no instance), using \`this\` inside one refers to the class constructor itself, not an object. Always use the class name to access static members.

## Conclusion

\`static\` members belong to the class itself rather than any one instance — one shared copy accessed via the class name — which is also why \`this\` inside a static method refers to the class constructor, not an object, and class-name access is always the safe way to reach one.`,
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

**กับดักสัมภาษณ์ — ใช้ \`this\` ในเมธอด static ได้ไหม?** ไม่ได้ \`this\` หมายถึงอินสแตนซ์ปัจจุบันของอ็อบเจกต์ แต่เมธอด static เป็นของคลาส (ไม่มีอินสแตนซ์) การใช้ \`this\` ในนั้นจะหมายถึงตัว constructor ของคลาสเอง ไม่ใช่อ็อบเจกต์ ให้ใช้ชื่อคลาสในการเข้าถึง static member เสมอ

## สรุป

static member เป็นของตัวคลาสเอง ไม่ใช่ของอินสแตนซ์ใดอินสแตนซ์หนึ่ง — มีสำเนาเดียวที่ใช้ร่วมกัน เข้าถึงผ่านชื่อคลาส — ซึ่งเป็นเหตุผลว่าทำไม \`this\` ภายในเมธอด static จึงหมายถึง constructor ของคลาส ไม่ใช่อ็อบเจกต์ และการเข้าถึงผ่านชื่อคลาสจึงเป็นวิธีที่ปลอดภัยเสมอ`,
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
\`\`\`

\`\`\`ts
class Animal {
  constructor(public name: string) {}

  move(distance: number) {
    console.log(\`\${this.name} moved \${distance}m.\`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(\`\${this.name} says: Woof!\`);
  }
}

const rex = new Dog('Rex');
rex.move(10); // inherited from Animal — "Rex moved 10m."
rex.bark(); // defined on Dog — "Rex says: Woof!"
\`\`\`

\`Dog\` never redefines \`name\` or \`move()\` — it gets both for free from \`Animal\` just by extending it, and adds only what's actually new (\`bark()\`). A child class can also **override** an inherited method by redeclaring it with the same name and a compatible signature; the next few lessons (starting with \`super()\`) cover how overriding interacts with the parent's own implementation.

**Interview trap — inheritance vs composition:** inheritance models an "is-a" relationship (a \`Dog\` *is an* \`Animal\`). If the relationship is really "has-a" (a \`Car\` *has a* \`Engine\`), prefer composition — giving \`Car\` an \`Engine\` property — over forcing an inheritance chain that doesn't actually fit.

## Conclusion

Inheritance via \`extends\` lets a child class reuse a parent class's properties and methods instead of duplicating them, keeping code D.R.Y — with the caveat that TypeScript only allows a single parent class per \`extends\`, and that a true "has-a" relationship is usually better modeled with composition than inheritance.`,
        contentTh: `Inheritance (การสืบทอด) คือกลไกที่คลาสใหม่ (child/derived) สืบทอด property และเมธอดจากคลาสที่มีอยู่แล้ว (parent/base) มันส่งเสริมหลักการ D.R.Y (Don't Repeat Yourself) และสร้างขึ้นด้วยคีย์เวิร์ด \`extends\` TypeScript รองรับ single inheritance เท่านั้น — มี parent class ได้สูงสุดแค่ 1 ตัว

\`\`\`mermaid
graph TD
    Animal["Animal<br/>Base Class"] -- extends --> Dog["Dog<br/>Derived Class"]
\`\`\`

\`\`\`ts
class Animal {
  constructor(public name: string) {}

  move(distance: number) {
    console.log(\`\${this.name} moved \${distance}m.\`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(\`\${this.name} says: Woof!\`);
  }
}

const rex = new Dog('Rex');
rex.move(10); // inherited from Animal — "Rex moved 10m."
rex.bark(); // defined on Dog — "Rex says: Woof!"
\`\`\`

\`Dog\` ไม่ต้องประกาศ \`name\` หรือ \`move()\` ใหม่เลย — ได้ทั้งสองอย่างมาฟรีจากการ extend \`Animal\` และเพิ่มแค่สิ่งที่ใหม่จริงๆ (\`bark()\`) child class ยังสามารถ **override** เมธอดที่สืบทอดมาได้ ด้วยการประกาศเมธอดชื่อเดียวกันซ้ำโดยมี signature ที่เข้ากันได้ — บทเรียนถัดๆ ไป (เริ่มจาก \`super()\`) จะพูดถึงว่าการ override ทำงานร่วมกับ implementation เดิมของ parent อย่างไร

**กับดักสัมภาษณ์ — inheritance กับ composition:** inheritance จำลองความสัมพันธ์แบบ "is-a" (\`Dog\` *เป็น* \`Animal\`) ถ้าความสัมพันธ์จริงๆ เป็น "has-a" (\`Car\` *มี* \`Engine\`) ควรใช้ composition แทน — ให้ \`Car\` มี property เป็น \`Engine\` — แทนที่จะฝืนใช้ inheritance ในความสัมพันธ์ที่ไม่เหมาะกับมัน

## สรุป

inheritance ผ่าน \`extends\` ทำให้ child class นำ property และเมธอดของ parent class มาใช้ซ้ำได้โดยไม่ต้องเขียนซ้ำ ช่วยรักษาหลักการ D.R.Y ไว้ — โดยมีข้อแม้ว่า TypeScript อนุญาตให้มี parent class ได้แค่ 1 ตัวต่อการ \`extends\` เท่านั้น และความสัมพันธ์แบบ "has-a" จริงๆ มักเหมาะกับ composition มากกว่า inheritance`,
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
\`\`\`

Forget the \`super(name)\` call and TypeScript refuses to compile: \`"Constructors for derived classes must contain a 'super' call."\` This isn't a style rule — the parent's fields genuinely don't exist in memory until its constructor has run, so \`this\` is unsafe to touch before that.

\`super\` isn't only for constructors, though — it's also how a child class reaches a method it has **overridden**, instead of losing access to the parent's version entirely:

\`\`\`ts
class Animal {
  describe(): string {
    return 'An animal';
  }
}

class Dog extends Animal {
  describe(): string {
    // Reuse the parent's implementation, then extend it
    return \`\${super.describe()} (specifically, a dog)\`;
  }
}

new Dog().describe(); // "An animal (specifically, a dog)"
\`\`\`

Without \`super.describe()\`, \`Dog\`'s override would have to fully reimplement whatever \`Animal.describe()\` did — \`super\` lets it build on top of the parent's logic instead of duplicating it.

## Conclusion

Whenever a child class defines its own constructor, \`super()\` must run first to execute the parent's constructor and initialize its properties — only after that call is it safe to use \`this\` inside the child. The same \`super\` keyword also lets an overriding method call the parent's version of itself (\`super.methodName()\`), so an override can extend the parent's behavior instead of fully replacing it.`,
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
\`\`\`

ถ้าลืมเรียก \`super(name)\` TypeScript จะไม่ยอม compile ให้ พร้อม error: \`"Constructors for derived classes must contain a 'super' call."\` นี่ไม่ใช่แค่กฎเรื่องสไตล์การเขียนโค้ด — เพราะ field ของ parent จะยังไม่มีอยู่จริงในหน่วยความจำจนกว่า constructor ของมันจะรันเสร็จ ดังนั้นการใช้ \`this\` ก่อนหน้านั้นจึงไม่ปลอดภัย

\`super\` ไม่ได้ใช้แค่กับ constructor เท่านั้น — มันยังเป็นวิธีที่ child class เข้าถึงเมธอดที่ตัวเอง**override**ไปแล้วได้ด้วย แทนที่จะเสียการเข้าถึง implementation เดิมของ parent ไปเลย:

\`\`\`ts
class Animal {
  describe(): string {
    return 'An animal';
  }
}

class Dog extends Animal {
  describe(): string {
    // Reuse the parent's implementation, then extend it
    return \`\${super.describe()} (specifically, a dog)\`;
  }
}

new Dog().describe(); // "An animal (specifically, a dog)"
\`\`\`

ถ้าไม่มี \`super.describe()\` การ override ของ \`Dog\` ก็ต้องเขียน implementation ของ \`Animal.describe()\` ซ้ำใหม่ทั้งหมด — \`super\` ทำให้มันต่อยอดจาก logic เดิมของ parent ได้ แทนที่จะต้องเขียนซ้ำ

## สรุป

เมื่อใดก็ตามที่ child class มี constructor ของตัวเอง \`super()\` ต้องถูกเรียกก่อนเสมอ เพื่อรัน constructor ของ parent และกำหนดค่าเริ่มต้นให้ property ของมัน หลังจากเรียกแล้วเท่านั้นจึงจะปลอดภัยที่จะใช้ \`this\` ภายใน child คีย์เวิร์ด \`super\` ตัวเดียวกันนี้ยังใช้ให้เมธอดที่ override เรียก version เดิมของ parent ได้ (\`super.methodName()\`) ทำให้การ override ต่อยอดจากพฤติกรรมเดิมของ parent ได้ แทนที่จะต้องแทนที่มันทั้งหมด`,
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

**TS-exclusive safety — the \`override\` keyword:** TypeScript 4.3 introduced \`override\`. It's optional, but it explicitly tells the compiler you intend to override a base method. If you mistype the method name, or the base method is later deleted, TS throws an error instead of silently creating a new, unrelated method — preventing a class of silent bugs.

## Conclusion

Polymorphism lets objects of different subclasses be treated through their common parent type, most commonly via method overriding — where TypeScript's \`override\` keyword adds a safety net by making the compiler verify the method actually exists on the parent, catching typos or a since-deleted base method instead of silently creating an unrelated one.`,
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

**ความปลอดภัยเฉพาะของ TS — คีย์เวิร์ด \`override\`:** TypeScript 4.3 เพิ่มคีย์เวิร์ด \`override\` เข้ามา แม้จะเป็น optional แต่มันบอก compiler อย่างชัดเจนว่าตั้งใจจะ override เมธอดของ base class ถ้าพิมพ์ชื่อเมธอดผิด หรือเมธอดของ base ถูกลบไปภายหลัง TS จะโยน error ทันที แทนที่จะสร้างเมธอดใหม่ที่ไม่เกี่ยวข้องขึ้นมาเงียบๆ — ช่วยป้องกันบั๊กที่มองไม่เห็นได้

## สรุป

polymorphism ทำให้อ็อบเจกต์จากหลาย subclass ถูกมองผ่าน parent type ร่วมกันได้ วิธีที่พบบ่อยที่สุดคือ method overriding — ซึ่งคีย์เวิร์ด \`override\` ของ TypeScript ช่วยเพิ่มความปลอดภัยด้วยการให้ compiler ตรวจสอบว่าเมธอดนั้นมีอยู่จริงใน parent จับข้อผิดพลาดจากการพิมพ์ชื่อผิดหรือเมธอด base ที่ถูกลบไปแล้ว แทนที่จะสร้างเมธอดใหม่ที่ไม่เกี่ยวข้องขึ้นมาเงียบๆ`,
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
\`\`\`

## Conclusion

An abstract class defines a contract — method signatures with no body — that can never be instantiated directly, forcing every concrete subclass to supply its own real implementation, the way \`Circle\` must supply the actual area formula that the abstract \`Shape\` only promises exists.`,
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
\`\`\`

## สรุป

abstract class กำหนด contract ไว้ — signature ของเมธอดโดยไม่มี body — ซึ่งไม่สามารถสร้างอินสแตนซ์ได้โดยตรง บังคับให้ concrete subclass ทุกตัวต้องเขียน implementation จริงของตัวเอง เหมือนที่ \`Circle\` ต้องให้สูตรคำนวณพื้นที่จริง ในขณะที่ \`Shape\` แบบ abstract เพียงแค่รับประกันว่ามันต้องมีอยู่เท่านั้น`,
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
- **A — Abstraction:** hiding complex implementation details and showing only the necessary features — a strict contract/blueprint. Key concepts: \`abstract\` classes & methods.

## Conclusion

Encapsulation, Inheritance, Polymorphism, and Abstraction are the four pillars this whole course has been building toward — bundling and hiding state, reusing structure through \`extends\`, letting subclasses respond to the same call differently, and defining contracts that concrete classes must fulfill. The remaining lessons build on top of this foundation with interfaces and generics.`,
        contentTh: `เสาหลักทั้ง 4 ของ OOP สรุปในหน้าเดียว:

- **E — Encapsulation:** การรวมข้อมูล (ตัวแปร) และเมธอด (ฟังก์ชัน) เข้าเป็นหน่วยเดียว (คลาส) พร้อมจำกัดการเข้าถึงโดยตรงด้วย \`private\` modifier แนวคิดหลัก: getter/setter, data hiding
- **I — Inheritance:** การสร้างคลาสใหม่จากคลาสที่มีอยู่เพื่อสืบทอด property และพฤติกรรม ส่งเสริมการใช้โค้ดซ้ำ ทำผ่าน \`extends\` แนวคิดหลัก: parent/child, คีย์เวิร์ด \`super()\`
- **P — Polymorphism:** ความสามารถของอ็อบเจกต์ต่างชนิดกันในการตอบสนองต่อการเรียกเมธอดชื่อเดียวกันในแบบของตัวเอง ("หลายรูปแบบ") แนวคิดหลัก: method overriding, \`override\`
- **A — Abstraction:** การซ่อนรายละเอียดการ implement ที่ซับซ้อน และแสดงเฉพาะฟีเจอร์ที่จำเป็น — เป็นเหมือน contract/พิมพ์เขียวที่เข้มงวด แนวคิดหลัก: abstract class และ abstract method

## สรุป

Encapsulation, Inheritance, Polymorphism และ Abstraction คือเสาหลักทั้ง 4 ที่คอร์สนี้ค่อยๆ สร้างขึ้นมาตลอด — การรวมและซ่อน state, การใช้โครงสร้างซ้ำผ่าน \`extends\`, การให้ subclass ตอบสนองต่อการเรียกเดียวกันต่างกันไป และการกำหนด contract ที่ concrete class ต้องทำตาม บทเรียนที่เหลือจะต่อยอดจากรากฐานนี้ด้วย interface และ generics`,
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
| Performance | Slower, due to the prototype chain | Zero performance overhead |

## Conclusion

A class is limited to \`extend\`ing one parent, but it can \`implement\` several interfaces at once — and interfaces themselves can \`extend\` multiple others — which is the composable escape hatch around single inheritance, since an interface carries zero runtime logic or performance cost compared to an abstract class.`,
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
| ประสิทธิภาพ | ช้ากว่า เพราะมี prototype chain | ไม่มีผลต่อ performance เลย |

## สรุป

คลาส \`extend\` parent ได้แค่ตัวเดียว แต่ \`implement\` interface ได้หลายตัวพร้อมกัน — และตัว interface เองก็ \`extend\` interface อื่นได้หลายตัวเช่นกัน — นี่คือทางออกที่ประกอบกันได้ (composable) สำหรับข้อจำกัดของ single inheritance เพราะ interface ไม่มี logic หรือต้นทุนด้าน performance ตอน runtime เลยเมื่อเทียบกับ abstract class`,
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
\`\`\`

## Conclusion

Generics use a placeholder type variable like \`<T>\`, resolved to a concrete type only when a class or method is actually used, so the same \`Storage<T>\` template can produce a strictly-typed \`Storage<string>\` or \`Storage<number>\` without duplicating code or falling back to \`any\`.`,
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
\`\`\`

## สรุป

generics ใช้ตัวแปรชนิดข้อมูลแบบ placeholder อย่าง \`<T>\` ซึ่งจะถูกกำหนดเป็นชนิดข้อมูลจริงก็ต่อเมื่อคลาสหรือเมธอดถูกใช้งานจริงเท่านั้น ทำให้ template \`Storage<T>\` ตัวเดียวสามารถสร้าง \`Storage<string>\` หรือ \`Storage<number>\` ที่มี type safety เข้มงวดได้โดยไม่ต้องเขียนโค้ดซ้ำหรือหันไปพึ่ง \`any\``,
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
- **Constraints:** appending \`extends InterfaceName\` to a generic ensures the provided type possesses the required properties.

## Conclusion

Adding \`extends SomeInterface\` to a generic type parameter constrains it to only types with the required shape, giving type-safe access to properties like \`.name\` inside the function — the natural capstone on this course's arc from plain classes through interfaces, multiple implementation, and now constrained generics.`,
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
- **Constraint:** การเติม \`extends InterfaceName\` ให้ generic ช่วยรับประกันว่าชนิดข้อมูลที่ส่งเข้ามามี property ที่จำเป็นครบถ้วน

## สรุป

การเติม \`extends SomeInterface\` ให้ generic type parameter จะจำกัดให้รับเฉพาะชนิดข้อมูลที่มีรูปร่างตามที่กำหนดเท่านั้น ทำให้เข้าถึง property อย่าง \`.name\` ภายในฟังก์ชันได้อย่างปลอดภัยด้าน type — เป็นบทสรุปตามธรรมชาติของเส้นทางในคอร์สนี้ ตั้งแต่คลาสธรรมดา ผ่าน interface, multi-implementation จนถึง generics ที่มี constraint`,
      },
    ],
  },
  {
    slug: "docker-for-beginners",
    title: "Docker for Beginners",
    descriptionEn:
      "Package, run, and ship applications in containers — the fundamentals of Docker for developers who've never touched it before.",
        descriptionTh:
      "แพ็กเกจ รัน และส่งมอบแอปพลิเคชันในรูปแบบ container — พื้นฐานของ Docker สำหรับนักพัฒนาที่ไม่เคยแตะต้องมันมาก่อน",
lessons: [
      {
        slug: "what-is-docker",
        titleEn: "What is Docker?",
        titleTh: "Docker คืออะไร?",
        order: 1,
        contentEn: `Docker packages an application together with everything it needs to run — code, runtime, system libraries, and settings — into a single unit called a container. Containers solve the "it works on my machine" problem: the same container runs identically on your laptop, a teammate's laptop, and a production server, because it carries its own environment with it.

Containers are often compared to virtual machines, but they're much lighter. A VM virtualizes an entire operating system, including its own kernel, which takes gigabytes of disk space and tens of seconds (or minutes) to boot. A container shares the host machine's kernel and only isolates the application's processes and filesystem, so it starts in milliseconds and takes megabytes, not gigabytes.

An image is the blueprint — a read-only template describing what should be inside the container (an OS base, your application code, its dependencies). A container is a running instance of an image, the same way an object is an instance of a class. You can start many containers from the same image, each isolated from the others.

Docker Hub is a public registry of pre-built images — official images exist for almost every language runtime, database, and tool (\`node\`, \`postgres\`, \`python\`, \`nginx\`), so you rarely build an image entirely from scratch.

## Conclusion

This lesson covered what a container actually is: an application bundled with everything it needs to run, isolated from the host but far lighter than a virtual machine because it shares the host's kernel instead of virtualizing a whole OS. You saw the distinction between an image (the read-only blueprint) and a container (a running instance of it), and how Docker Hub provides pre-built images so you rarely start from scratch.`,
        contentTh: `Docker แพ็กแอปพลิเคชันรวมกับทุกสิ่งที่มันต้องการเพื่อรัน — code, runtime, system libraries และ settings — ไว้เป็นหน่วยเดียวที่เรียกว่า container ปัญหาแบบ "it works on my machine" หมดไปด้วย container: container เดียวกันรันได้เหมือนกันทุกประการทั้งบนแล็ปท็อปของคุณ แล็ปท็อปของเพื่อนร่วมทีม และเซิร์ฟเวอร์ production เพราะมันพก environment ของตัวเองติดไปด้วย

Container มักถูกเปรียบเทียบกับ virtual machine แต่มันเบากว่ามาก VM จำลองระบบปฏิบัติการทั้งระบบ รวมถึง kernel ของตัวเอง ซึ่งกินพื้นที่ดิสก์หลายกิกะไบต์และใช้เวลาบูตหลายสิบวินาที (หรือหลายนาที) ส่วน container ใช้ kernel ร่วมกับเครื่อง host และแยกแค่ process กับ filesystem ของแอปพลิเคชันเท่านั้น จึงเริ่มทำงานได้ในเสี้ยววินาทีและกินพื้นที่แค่หลักเมกะไบต์ ไม่ใช่กิกะไบต์

Image คือพิมพ์เขียว — เทมเพลตแบบอ่านอย่างเดียวที่อธิบายว่าข้างในของ container ควรมีอะไรบ้าง (OS พื้นฐาน, โค้ดแอปพลิเคชันของคุณ, dependencies ของมัน) ส่วน container คืออินสแตนซ์ที่กำลังรันของ image เดียวกัน เปรียบเทียบได้กับที่ object เป็นอินสแตนซ์ของ class คุณสามารถสตาร์ท container ได้หลายตัวจาก image เดียวกัน โดยแต่ละตัวแยกจากกันโดยสมบูรณ์

Docker Hub คือ registry สาธารณะของ image ที่สร้างไว้ล่วงหน้า — มี official image ให้ใช้แทบทุก language runtime, database และ tool (\`node\`, \`postgres\`, \`python\`, \`nginx\`) ดังนั้นคุณแทบไม่ต้องสร้าง image ขึ้นมาเองตั้งแต่ศูนย์

## สรุป

บทเรียนนี้ครอบคลุมว่า container คืออะไรจริงๆ: แอปพลิเคชันที่แพ็กรวมกับทุกสิ่งที่มันต้องการเพื่อรัน แยกตัวจาก host แต่เบากว่า virtual machine มากเพราะใช้ kernel ร่วมกับ host แทนที่จะจำลองทั้งระบบปฏิบัติการ คุณได้เห็นความแตกต่างระหว่าง image (พิมพ์เขียวแบบอ่านอย่างเดียว) กับ container (อินสแตนซ์ที่กำลังรันของมัน) และวิธีที่ Docker Hub มี image ที่สร้างไว้ล่วงหน้าให้ใช้ ทำให้คุณแทบไม่ต้องเริ่มจากศูนย์`,
      },
      {
        slug: "your-first-dockerfile",
        titleEn: "Your First Dockerfile",
        titleTh: "Dockerfile แรกของคุณ",
        order: 2,
        contentEn: `A Dockerfile is a plain-text recipe for building an image — a sequence of instructions Docker executes in order, each one producing a new layer on top of the last.

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

\`FROM\` picks a base image to build on top of — here, a minimal ("alpine") Node.js 20 image. \`WORKDIR\` sets the working directory inside the container for every instruction after it. \`COPY\` copies files from your machine into the image; copying just the dependency manifests before the rest of the source lets Docker cache the (usually slow) install step — it only reruns if those files change. \`RUN\` executes a command at build time. \`CMD\` specifies the command that runs when a container starts from this image — unlike \`RUN\`, it doesn't execute during the build.

Build the image with \`docker build -t my-app .\` — \`-t\` tags it with a name, and \`.\` tells Docker to look for the Dockerfile (and use everything in) the current directory.

## Conclusion

You wrote your first Dockerfile and saw how each instruction — \`FROM\`, \`WORKDIR\`, \`COPY\`, \`RUN\`, and \`CMD\` — builds up a new layer on top of the last, and why copying dependency manifests before the rest of the source lets Docker cache the install step. \`docker build -t my-app .\` turns that recipe into an actual image, ready to run.`,
        contentTh: `Dockerfile คือสูตรแบบ plain-text สำหรับสร้าง image — เป็นลำดับของคำสั่งที่ Docker รันตามลำดับ แต่ละคำสั่งจะสร้าง layer ใหม่ซ้อนทับ layer ก่อนหน้า

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

\`FROM\` เลือก base image ที่จะสร้างต่อยอด — ในที่นี้คือ Node.js 20 image แบบมินิมอล ("alpine") \`WORKDIR\` กำหนด working directory ภายใน container สำหรับทุกคำสั่งที่ตามมา \`COPY\` คัดลอกไฟล์จากเครื่องของคุณเข้าไปใน image การคัดลอกแค่ dependency manifest ก่อน source code ส่วนที่เหลือทำให้ Docker cache ขั้นตอน install (ซึ่งมักจะช้า) ได้ — มันจะรันใหม่ก็ต่อเมื่อไฟล์เหล่านั้นเปลี่ยนแปลงเท่านั้น \`RUN\` รันคำสั่งตอน build time ส่วน \`CMD\` กำหนดคำสั่งที่จะรันเมื่อ container สตาร์ทขึ้นจาก image นี้ — ต่างจาก \`RUN\` ตรงที่มันไม่ได้ทำงานระหว่างขั้นตอน build

Build image ด้วย \`docker build -t my-app .\` — \`-t\` ตั้งชื่อ (tag) ให้มัน และ \`.\` บอก Docker ให้มองหา Dockerfile (และใช้ทุกอย่างใน) directory ปัจจุบัน

## สรุป

คุณได้เขียน Dockerfile แรกของคุณ และเห็นว่าแต่ละคำสั่ง — \`FROM\`, \`WORKDIR\`, \`COPY\`, \`RUN\` และ \`CMD\` — สร้าง layer ใหม่ซ้อนทับ layer ก่อนหน้าอย่างไร และทำไมการคัดลอก dependency manifest ก่อน source code ส่วนที่เหลือจึงทำให้ Docker cache ขั้นตอน install ได้ \`docker build -t my-app .\` เปลี่ยนสูตรนั้นให้กลายเป็น image จริงที่พร้อมรัน`,
      },
      {
        slug: "running-containers",
        titleEn: "Running and Managing Containers",
        titleTh: "การรันและจัดการ Container",
        order: 3,
        contentEn: `\`docker run my-app\` starts a container from an image. A few flags come up constantly: \`-p 8080:80\` maps port 80 inside the container to port 8080 on your machine (host:container), \`-d\` runs the container in the background ("detached") instead of blocking your terminal, \`-e KEY=value\` sets an environment variable, and \`--name\` gives the container a memorable name instead of a random one.

\`docker ps\` lists running containers; add \`-a\` to see stopped ones too. \`docker logs <name>\` prints a container's stdout/stderr — the first place to look when something isn't working. \`docker exec -it <name> sh\` opens an interactive shell inside a running container, useful for poking around or debugging. \`docker stop <name>\` stops a container gracefully; \`docker rm <name>\` removes a stopped container entirely.

Containers are meant to be disposable: instead of patching a running container, you rebuild the image and start a fresh container from it. Anything written to a container's own filesystem disappears when the container is removed — durable data belongs in a *volume*, a directory Docker manages outside any single container's lifecycle.

## Conclusion

This lesson covered the everyday \`docker run\` flags (\`-p\`, \`-d\`, \`-e\`, \`--name\`) and the commands for inspecting and managing running containers — \`docker ps\`, \`docker logs\`, \`docker exec\`, \`docker stop\`, and \`docker rm\`. The key idea to carry forward is that containers are disposable: you rebuild and restart rather than patch a running one, and anything that needs to survive that belongs in a volume.`,
        contentTh: `\`docker run my-app\` สตาร์ท container จาก image มี flag บางตัวที่เจอบ่อยมาก: \`-p 8080:80\` แมป port 80 ภายใน container ไปยัง port 8080 บนเครื่องของคุณ (host:container), \`-d\` รัน container แบบ background ("detached") แทนที่จะบล็อก terminal ของคุณ, \`-e KEY=value\` ตั้งค่า environment variable และ \`--name\` ตั้งชื่อ container ที่จำง่ายแทนชื่อแบบสุ่ม

\`docker ps\` แสดงรายการ container ที่กำลังรันอยู่ เพิ่ม \`-a\` เพื่อดู container ที่หยุดแล้วด้วย \`docker logs <name>\` แสดง stdout/stderr ของ container — ที่แรกที่ควรดูเมื่อมีอะไรผิดปกติ \`docker exec -it <name> sh\` เปิด interactive shell ภายใน container ที่กำลังรันอยู่ มีประโยชน์เวลาต้องเข้าไปสำรวจหรือ debug \`docker stop <name>\` หยุด container อย่างสุภาพ ส่วน \`docker rm <name>\` ลบ container ที่หยุดแล้วออกไปทั้งหมด

Container ถูกออกแบบมาให้ใช้แล้วทิ้งได้ (disposable): แทนที่จะแพตช์ container ที่กำลังรันอยู่ คุณควร rebuild image แล้วสตาร์ท container ใหม่จากมัน สิ่งใดก็ตามที่เขียนลงบน filesystem ของ container เองจะหายไปเมื่อ container ถูกลบ — ข้อมูลที่ต้องคงอยู่ถาวรควรเก็บไว้ใน *volume* ซึ่งเป็น directory ที่ Docker จัดการแยกออกจาก lifecycle ของ container ตัวใดตัวหนึ่งโดยเฉพาะ

## สรุป

บทเรียนนี้ครอบคลุม flag ของ \`docker run\` ที่ใช้บ่อยในชีวิตประจำวัน (\`-p\`, \`-d\`, \`-e\`, \`--name\`) และคำสั่งสำหรับตรวจสอบและจัดการ container ที่กำลังรันอยู่ — \`docker ps\`, \`docker logs\`, \`docker exec\`, \`docker stop\` และ \`docker rm\` แนวคิดสำคัญที่ควรจำไว้คือ container ถูกออกแบบมาให้ใช้แล้วทิ้งได้: คุณ rebuild แล้วสตาร์ทใหม่แทนที่จะแพตช์ container ที่กำลังรันอยู่ และสิ่งใดก็ตามที่ต้องคงอยู่ต่อไปควรเก็บไว้ใน volume`,
      },
      {
        slug: "docker-compose-basics",
        titleEn: "Docker Compose Basics",
        titleTh: "พื้นฐานของ Docker Compose",
        order: 4,
        contentEn: `Real applications are rarely a single container — a typical web app needs the app server, a database, and maybe a cache, all running together. Docker Compose describes that whole stack in one YAML file and starts it with one command.

\`\`\`yaml
services:
  web:
    build: .
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgres://db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
\`\`\`

Each top-level entry under \`services\` is a container Compose manages. \`web\` builds an image from the Dockerfile in the current directory; \`db\` instead pulls a ready-made Postgres image. Containers in the same Compose file can reach each other by service name — \`web\` connects to \`db\` at the hostname \`db\`, not \`localhost\`, because Compose puts them on a shared internal network. \`depends_on\` controls start order. The named \`volumes\` block persists the database's data directory across container restarts and rebuilds.

\`docker compose up\` builds (if needed) and starts every service; add \`-d\` to run in the background. \`docker compose down\` stops and removes them. This one file is usually enough to describe an entire local development environment.

## Conclusion

You saw how Docker Compose describes a multi-container stack — an app service and a database, in this case — in one YAML file, with \`depends_on\` controlling start order and a named volume persisting the database's data across restarts. \`docker compose up\` and \`docker compose down\` bring that whole stack up and tear it down with a single command, which is usually enough to describe a full local development environment.`,
        contentTh: `แอปพลิเคชันจริงแทบไม่เคยเป็น container เดียว — เว็บแอปทั่วไปต้องการทั้ง app server, database และบางทีก็ cache ให้ทำงานพร้อมกันทั้งหมด Docker Compose อธิบาย stack ทั้งหมดนั้นไว้ในไฟล์ YAML เดียว และสตาร์ทมันด้วยคำสั่งเดียว

\`\`\`yaml
services:
  web:
    build: .
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgres://db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
\`\`\`

แต่ละรายการระดับบนสุดภายใต้ \`services\` คือ container ที่ Compose จัดการ \`web\` build image จาก Dockerfile ใน directory ปัจจุบัน ส่วน \`db\` ดึง Postgres image ที่สร้างไว้พร้อมใช้งานแล้วมาใช้แทน Container ในไฟล์ Compose เดียวกันสามารถเชื่อมถึงกันได้ด้วยชื่อ service — \`web\` เชื่อมต่อไปยัง \`db\` ที่ hostname \`db\` ไม่ใช่ \`localhost\` เพราะ Compose วาง container เหล่านี้ไว้บน network ภายในที่ใช้ร่วมกัน \`depends_on\` ควบคุมลำดับการสตาร์ท ส่วน block \`volumes\` ที่ตั้งชื่อไว้ทำให้ data directory ของฐานข้อมูลคงอยู่ต่อไปแม้ container จะ restart หรือ rebuild

\`docker compose up\` build (ถ้าจำเป็น) และสตาร์ททุก service เพิ่ม \`-d\` เพื่อรันแบบ background \`docker compose down\` หยุดและลบ container ทั้งหมดออกไป ไฟล์เดียวนี้มักจะเพียงพอที่จะอธิบาย local development environment ทั้งหมด

## สรุป

คุณได้เห็นว่า Docker Compose อธิบาย stack แบบหลาย container — ในที่นี้คือ app service กับ database — ไว้ในไฟล์ YAML เดียวได้อย่างไร โดยมี \`depends_on\` ควบคุมลำดับการสตาร์ท และ volume ที่ตั้งชื่อไว้ทำให้ข้อมูลของฐานข้อมูลคงอยู่ต่อไปแม้ restart \`docker compose up\` และ \`docker compose down\` เปิดและปิด stack ทั้งหมดนั้นด้วยคำสั่งเดียว ซึ่งมักจะเพียงพอที่จะอธิบาย local development environment ทั้งหมด`,
      },
    ],
  },
  {
    slug: "react-ui-patterns",
    title: "React UI Patterns",
    descriptionEn: "Practical patterns for building React interfaces — composition, state, and reusable hooks.",
        descriptionTh:
      "แพทเทิร์นที่ใช้งานได้จริงสำหรับสร้าง React interface — composition, state และ reusable hooks",
lessons: [
      {
        slug: "component-composition",
        titleEn: "Component Composition and Props",
        titleTh: "Component Composition และ Props",
        order: 1,
        contentEn: `React interfaces are built by composing components — small, focused functions that return JSX (a syntax that looks like HTML but compiles to plain JavaScript function calls). A component receives inputs called *props* and returns what should appear on screen; the same component can be reused anywhere by passing it different props.

\`\`\`jsx
function Avatar({ src, name }) {
  return <img className="avatar" src={src} alt={name} />
}

function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatarUrl} name={user.name} />
      <h3>{user.name}</h3>
    </div>
  )
}
\`\`\`

\`UserCard\` doesn't know or care how \`Avatar\` renders internally — it just passes props down. This is *composition*: building complex UI out of small, independently testable pieces, rather than one large component that does everything.

The \`children\` prop is special — it's whatever's nested between a component's opening and closing tags in JSX (\`<Card>...</Card>\`), letting a component wrap arbitrary content it doesn't need to know about in advance. This is how generic layout components (\`Modal\`, \`Card\`, \`Panel\`) stay reusable across very different content.

Props flow one direction: parent to child. A child component can't modify the props it receives — if a user action needs to change something the parent owns, the parent passes the child a function (also just a prop) that the child calls.

## Conclusion

This lesson covered how React UIs are built by composing small, focused components that communicate through props flowing one direction — parent to child — with the special \`children\` prop letting generic wrapper components stay reusable across arbitrary content. A child can't modify the props it receives; a parent hands down a function if it wants a child's action to change something it owns.`,
        contentTh: `React interface ถูกสร้างขึ้นด้วยการประกอบ (compose) component เข้าด้วยกัน — เป็นฟังก์ชันเล็กๆ ที่โฟกัสเฉพาะเรื่องและคืนค่าเป็น JSX (syntax ที่หน้าตาเหมือน HTML แต่ compile เป็น JavaScript function call ธรรมดา) component รับ input ที่เรียกว่า *props* และคืนค่าสิ่งที่ควรแสดงบนหน้าจอ component ตัวเดียวกันสามารถนำกลับมาใช้ซ้ำได้ทุกที่โดยส่ง props ที่ต่างกันเข้าไป

\`\`\`jsx
function Avatar({ src, name }) {
  return <img className="avatar" src={src} alt={name} />
}

function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatarUrl} name={user.name} />
      <h3>{user.name}</h3>
    </div>
  )
}
\`\`\`

\`UserCard\` ไม่รู้และไม่สนใจว่า \`Avatar\` render ภายในอย่างไร — มันแค่ส่ง props ลงไป นี่คือ *composition*: การสร้าง UI ที่ซับซ้อนจากชิ้นส่วนเล็กๆ ที่ทดสอบแยกกันได้ แทนที่จะเป็น component ใหญ่ตัวเดียวที่ทำทุกอย่าง

prop \`children\` เป็นพิเศษ — มันคือทุกอย่างที่ซ้อนอยู่ระหว่าง tag เปิดและปิดของ component ใน JSX (\`<Card>...</Card>\`) ทำให้ component สามารถห่อหุ้มเนื้อหาที่ไม่จำเป็นต้องรู้ล่วงหน้าได้ นี่คือวิธีที่ generic layout component (\`Modal\`, \`Card\`, \`Panel\`) ยังคงนำกลับมาใช้ซ้ำได้กับเนื้อหาที่แตกต่างกันมาก

Props ไหลไปทิศทางเดียว: จาก parent ไปยัง child child component ไม่สามารถแก้ไข props ที่มันได้รับ — ถ้า action ของผู้ใช้ต้องเปลี่ยนแปลงบางอย่างที่ parent เป็นเจ้าของ parent จะส่งฟังก์ชัน (ซึ่งก็เป็นแค่ prop อีกตัว) ให้ child เรียกใช้

## สรุป

บทเรียนนี้ครอบคลุมว่า React UI ถูกสร้างขึ้นด้วยการประกอบ component เล็กๆ ที่โฟกัสเฉพาะเรื่องเข้าด้วยกันอย่างไร โดยสื่อสารกันผ่าน props ที่ไหลไปทิศทางเดียวคือจาก parent ไปยัง child และ prop พิเศษอย่าง \`children\` ที่ทำให้ generic wrapper component นำกลับมาใช้ซ้ำได้กับเนื้อหาใดก็ได้ child ไม่สามารถแก้ไข props ที่มันได้รับ — parent จะส่งฟังก์ชันลงไปแทนหาก action ของ child ต้องเปลี่ยนแปลงบางอย่างที่ parent เป็นเจ้าของ`,
      },
      {
        slug: "state-with-hooks",
        titleEn: "Managing State with useState and useReducer",
        titleTh: "การจัดการ State ด้วย useState และ useReducer",
        order: 2,
        contentEn: `\`useState\` is the basic way a component remembers something between renders — a value that, when changed, causes React to re-render the component with the new value.

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
\`\`\`

Calling \`setCount\` doesn't mutate \`count\` in place — it schedules a re-render where \`count\` will hold the new value. State updates based on the previous value should use the function form, \`setCount(c => c + 1)\`, to avoid bugs when multiple updates happen close together.

\`useState\` works well for independent pieces of state, but once several pieces of state change together in response to the same actions, \`useReducer\` is usually clearer. It centralizes "what changes, and how" into one function (the *reducer*) that takes the current state and an *action*, and returns the next state:

\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'reset': return { count: 0 }
    default: return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
// dispatch({ type: 'increment' })
\`\`\`

Component code calls \`dispatch\` with a plain description of *what happened* (an action); the reducer alone decides *what changes as a result* — which keeps update logic in one place instead of scattered across event handlers.

## Conclusion

You saw \`useState\` as the basic way a component remembers a value across renders, including why the function form (\`setCount(c => c + 1)\`) matters when updates depend on the previous value. For state that changes together in response to the same actions, \`useReducer\` centralizes the update logic into one reducer function instead of scattering it across event handlers.`,
        contentTh: `\`useState\` คือวิธีพื้นฐานที่ component ใช้จดจำบางสิ่งไว้ระหว่างการ render แต่ละครั้ง — เป็นค่าที่เมื่อเปลี่ยนแปลงแล้วจะทำให้ React re-render component ด้วยค่าใหม่

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
\`\`\`

การเรียก \`setCount\` ไม่ได้ mutate \`count\` โดยตรง — มันกำหนดตารางให้เกิดการ re-render ที่ \`count\` จะถือค่าใหม่ การอัปเดต state ที่อิงจากค่าก่อนหน้าควรใช้รูปแบบฟังก์ชัน \`setCount(c => c + 1)\` เพื่อหลีกเลี่ยงบั๊กเมื่อมีการอัปเดตหลายครั้งเกิดขึ้นใกล้กัน

\`useState\` เหมาะกับ state ที่เป็นอิสระจากกัน แต่เมื่อ state หลายตัวเปลี่ยนแปลงพร้อมกันจาก action เดียวกัน \`useReducer\` มักจะชัดเจนกว่า มันรวมศูนย์ "อะไรเปลี่ยน และเปลี่ยนอย่างไร" ไว้ในฟังก์ชันเดียว (*reducer*) ที่รับ state ปัจจุบันและ *action* แล้วคืนค่า state ถัดไป:

\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'reset': return { count: 0 }
    default: return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
// dispatch({ type: 'increment' })
\`\`\`

โค้ดใน component เรียก \`dispatch\` พร้อมคำอธิบายง่ายๆ ว่า *เกิดอะไรขึ้น* (action) ส่วน reducer เท่านั้นที่ตัดสินใจว่า *อะไรจะเปลี่ยนแปลงเป็นผล* — ซึ่งทำให้ logic การอัปเดตอยู่ในที่เดียวแทนที่จะกระจัดกระจายไปตาม event handler ต่างๆ

## สรุป

คุณได้เห็นว่า \`useState\` เป็นวิธีพื้นฐานที่ component ใช้จดจำค่าไว้ข้ามการ render อย่างไร รวมถึงเหตุผลที่รูปแบบฟังก์ชัน (\`setCount(c => c + 1)\`) สำคัญเมื่อการอัปเดตอิงจากค่าก่อนหน้า สำหรับ state ที่เปลี่ยนแปลงพร้อมกันจาก action เดียวกัน \`useReducer\` รวมศูนย์ logic การอัปเดตไว้ในฟังก์ชัน reducer เดียว แทนที่จะกระจัดกระจายไปตาม event handler ต่างๆ`,
      },
      {
        slug: "effects-and-data-fetching",
        titleEn: "Effects and Data Fetching with useEffect",
        titleTh: "Effects และการดึงข้อมูลด้วย useEffect",
        order: 3,
        contentEn: `Rendering a component should be a pure calculation from its props and state — no side effects like network requests, subscriptions, or manually touching the DOM. \`useEffect\` is the escape hatch for exactly that: code that needs to run *after* React has rendered, as a reaction to something changing.

\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => { if (!cancelled) setUser(data) })
    return () => { cancelled = true }
  }, [userId])

  if (!user) return <p>Loading…</p>
  return <h1>{user.name}</h1>
}
\`\`\`

The second argument — the *dependency array* — tells React when to re-run the effect: only when one of the listed values (\`userId\`) changes since the last render. An empty array (\`[]\`) means "run once, after the first render." Omitting the array entirely re-runs the effect after every render, which is rarely what you want.

The function an effect returns is its *cleanup* — React calls it before running the effect again, and when the component unmounts. The \`cancelled\` flag above prevents a slow, stale request from overwriting state with old data if \`userId\` changes again before the first request finishes — a common and easy-to-miss data-fetching bug.

For anything beyond the simplest fetches, a dedicated data-fetching library (React Query, SWR) handles caching, retries, and race conditions like this one for you — but understanding what \`useEffect\` is doing underneath is what makes those libraries' behavior make sense.

## Conclusion

This lesson covered \`useEffect\` as the escape hatch for side effects like data fetching, how the dependency array controls when it re-runs, and how a cleanup function (and the \`cancelled\` flag pattern) guards against a stale request overwriting state. Understanding this underlying behavior is what makes dedicated data-fetching libraries like React Query or SWR make sense once you reach for one.`,
        contentTh: `การ render component ควรเป็นการคำนวณล้วนๆ (pure calculation) จาก props และ state ของมัน — ไม่มี side effect อย่างการยิง network request, subscription หรือการแตะต้อง DOM โดยตรง \`useEffect\` คือทางออกสำหรับสิ่งเหล่านี้โดยเฉพาะ: โค้ดที่ต้องรัน *หลังจาก* React render เสร็จแล้ว เพื่อตอบสนองต่อบางสิ่งที่เปลี่ยนแปลง

\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => { if (!cancelled) setUser(data) })
    return () => { cancelled = true }
  }, [userId])

  if (!user) return <p>Loading…</p>
  return <h1>{user.name}</h1>
}
\`\`\`

argument ตัวที่สอง — *dependency array* — บอก React ว่าจะรัน effect ใหม่เมื่อไหร่: เฉพาะเมื่อค่าใดค่าหนึ่งในรายการ (\`userId\`) เปลี่ยนแปลงไปจากการ render ครั้งก่อน array ว่าง (\`[]\`) หมายถึง "รันครั้งเดียวหลังจาก render ครั้งแรก" การละ array ไปเลยจะทำให้ effect รันใหม่หลังทุกการ render ซึ่งแทบไม่ใช่สิ่งที่คุณต้องการ

ฟังก์ชันที่ effect คืนค่าคือ *cleanup* ของมัน — React จะเรียกมันก่อนรัน effect ใหม่อีกครั้ง และตอน component unmount ตัวแปร \`cancelled\` ด้านบนป้องกันไม่ให้ request ที่ช้าและล้าสมัยเขียนทับ state ด้วยข้อมูลเก่า หาก \`userId\` เปลี่ยนอีกครั้งก่อนที่ request แรกจะเสร็จ — เป็นบั๊กเกี่ยวกับการดึงข้อมูลที่พบบ่อยและมองข้ามได้ง่าย

สำหรับอะไรที่ซับซ้อนกว่าการ fetch ง่ายๆ ไลบรารีสำหรับดึงข้อมูลโดยเฉพาะ (React Query, SWR) จะจัดการเรื่อง caching, retry และ race condition แบบนี้ให้คุณ — แต่การเข้าใจว่า \`useEffect\` ทำอะไรอยู่เบื้องหลังคือสิ่งที่ทำให้พฤติกรรมของไลบรารีเหล่านั้นสมเหตุสมผล

## สรุป

บทเรียนนี้ครอบคลุม \`useEffect\` ในฐานะทางออกสำหรับ side effect อย่างการดึงข้อมูล วิธีที่ dependency array ควบคุมว่าจะรันมันใหม่เมื่อไหร่ และวิธีที่ cleanup function (พร้อม pattern ของ flag \`cancelled\`) ป้องกัน request ที่ล้าสมัยไม่ให้เขียนทับ state การเข้าใจพฤติกรรมเบื้องหลังนี้คือสิ่งที่ทำให้ไลบรารีดึงข้อมูลโดยเฉพาะอย่าง React Query หรือ SWR สมเหตุสมผลเมื่อคุณหยิบมันมาใช้`,
      },
      {
        slug: "custom-hooks",
        titleEn: "Building Reusable Custom Hooks",
        titleTh: "การสร้าง Custom Hooks ที่นำกลับมาใช้ซ้ำได้",
        order: 4,
        contentEn: `A custom hook is just a regular JavaScript function whose name starts with \`use\` and that calls other hooks inside it. It's the standard way to extract stateful logic out of a component so it can be reused in another one — the *logic* is shared, not the UI.

\`\`\`jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle]
}

function Accordion() {
  const [open, toggleOpen] = useToggle()
  return (
    <div>
      <button onClick={toggleOpen}>{open ? 'Hide' : 'Show'}</button>
      {open && <p>Details…</p>}
    </div>
  )
}
\`\`\`

Every component that calls \`useToggle\` gets its own independent \`value\`/\`setValue\` pair — a custom hook doesn't share state between the components that use it, it shares the *pattern* for creating that state.

\`useCallback\` above memoizes the \`toggle\` function so it isn't recreated on every render; this matters mainly when the function is passed down to a child wrapped in \`React.memo\`, where a new function reference on every render would defeat the memoization. It's an optimization, not something every function needs.

The naming convention (\`useSomething\`) isn't just style — React's linter rules use it to enforce the *Rules of Hooks* (only call hooks at the top level, only from React functions or other hooks), which is what makes hooks reliably preserve state across renders in the first place.

## Conclusion

You saw how a custom hook extracts reusable stateful *logic* — not shared state — out of a component, with every caller getting its own independent instance of that state. \`useCallback\` memoizes a function reference for cases where it matters (like a child wrapped in \`React.memo\`), and the \`use\`-prefix naming convention is what lets React's linter enforce the Rules of Hooks that make this reliable in the first place.`,
        contentTh: `Custom hook ก็เป็นแค่ฟังก์ชัน JavaScript ธรรมดาที่ชื่อขึ้นต้นด้วย \`use\` และเรียกใช้ hook อื่นๆ อยู่ภายใน มันคือวิธีมาตรฐานในการดึง stateful logic ออกจาก component เพื่อนำไปใช้ซ้ำใน component อื่น — สิ่งที่ถูกแชร์คือ *logic* ไม่ใช่ UI

\`\`\`jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle]
}

function Accordion() {
  const [open, toggleOpen] = useToggle()
  return (
    <div>
      <button onClick={toggleOpen}>{open ? 'Hide' : 'Show'}</button>
      {open && <p>Details…</p>}
    </div>
  )
}
\`\`\`

ทุก component ที่เรียก \`useToggle\` จะได้คู่ \`value\`/\`setValue\` ของตัวเองที่เป็นอิสระ — custom hook ไม่ได้แชร์ state ระหว่าง component ที่ใช้มัน มันแชร์แค่ *แพทเทิร์น* สำหรับสร้าง state นั้น

\`useCallback\` ด้านบน memoize ฟังก์ชัน \`toggle\` เพื่อไม่ให้มันถูกสร้างใหม่ทุกครั้งที่ render ซึ่งสำคัญเป็นหลักเมื่อฟังก์ชันนี้ถูกส่งลงไปยัง child ที่ห่อด้วย \`React.memo\` ซึ่ง function reference ใหม่ทุกครั้งที่ render จะทำให้ memoization นั้นไร้ประโยชน์ มันเป็นการ optimize ไม่ใช่สิ่งที่ทุกฟังก์ชันต้องการ

ข้อตกลงการตั้งชื่อ (\`useSomething\`) ไม่ใช่แค่เรื่องสไตล์ — กฎ linter ของ React ใช้มันเพื่อบังคับใช้ *Rules of Hooks* (เรียก hook ได้แค่ที่ระดับบนสุดเท่านั้น และเรียกได้แค่จากฟังก์ชันของ React หรือจาก hook อื่น) ซึ่งเป็นสิ่งที่ทำให้ hook รักษา state ข้ามการ render ได้อย่างน่าเชื่อถือตั้งแต่แรก

## สรุป

คุณได้เห็นว่า custom hook ดึง *logic* ที่มี state ออกจาก component เพื่อนำกลับมาใช้ซ้ำได้อย่างไร — ไม่ใช่การแชร์ state — โดยที่ผู้เรียกแต่ละตัวจะได้ instance ของ state นั้นเป็นของตัวเองอย่างอิสระ \`useCallback\` memoize function reference ไว้สำหรับกรณีที่สำคัญ (เช่น child ที่ห่อด้วย \`React.memo\`) และข้อตกลงการตั้งชื่อขึ้นต้นด้วย \`use\` คือสิ่งที่ทำให้ linter ของ React บังคับใช้ Rules of Hooks ที่ทำให้ทั้งหมดนี้น่าเชื่อถือได้ตั้งแต่แรก`,
      },
    ],
  },
  {
    slug: "go-microservices",
    title: "Go Microservices",
    descriptionEn:
      "Build and structure HTTP-based microservices in Go, from language fundamentals to service-to-service communication.",
        descriptionTh:
      "สร้างและจัดโครงสร้าง HTTP-based microservice ด้วย Go ตั้งแต่พื้นฐานของภาษาไปจนถึงการสื่อสารระหว่าง service",
lessons: [
      {
        slug: "go-fundamentals-for-services",
        titleEn: "Go Fundamentals for Service Development",
        titleTh: "พื้นฐาน Go สำหรับการพัฒนา Service",
        order: 1,
        contentEn: `Go compiles to a single static binary with no runtime dependency to install on the server — the same trait that makes it a natural fit for small, deployable microservices. A Go program starts in \`func main()\` inside \`package main\`; every other file in the project belongs to a named package that other files import by path.

\`\`\`go
package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func main() {
    result := add(2, 3)
    fmt.Println(result) // 5
}
\`\`\`

Go is statically typed, but \`:=\` lets you declare a variable and let the compiler infer its type from the value on the right, which is idiomatic for local variables. Functions can return multiple values — the standard library's own error handling relies on this: a call that might fail conventionally returns \`(result, error)\`, and callers check the error explicitly instead of relying on exceptions:

\`\`\`go
value, err := strconv.Atoi("42")
if err != nil {
    // handle it here, not several stack frames away
}
\`\`\`

Goroutines (\`go someFunc()\`) are Go's lightweight concurrency primitive — the runtime multiplexes many goroutines onto a small number of OS threads, so spawning thousands of them (one per incoming request, for example) is cheap. Channels (\`chan int\`) are typed pipes goroutines use to send values to each other safely, without manual locks.

## Conclusion

This lesson covered the Go fundamentals that make it a natural fit for microservices: compiling to a single static binary, \`package main\`/\`func main()\` as the entry point, and the \`(result, error)\` return pattern the standard library uses instead of exceptions. You also saw goroutines and channels — Go's lightweight, built-in tools for concurrency.`,
        contentTh: `Go compile เป็น static binary ตัวเดียวโดยไม่ต้องติดตั้ง runtime dependency บนเซิร์ฟเวอร์ — คุณสมบัตินี้เองที่ทำให้มันเหมาะกับ microservice ขนาดเล็กที่ต้อง deploy ได้ง่าย โปรแกรม Go เริ่มต้นที่ \`func main()\` ภายใน \`package main\` ส่วนไฟล์อื่นๆ ในโปรเจกต์จะอยู่ใน package ที่มีชื่อ ซึ่งไฟล์อื่นสามารถ import ผ่าน path ได้

\`\`\`go
package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func main() {
    result := add(2, 3)
    fmt.Println(result) // 5
}
\`\`\`

Go เป็นภาษาแบบ static typed แต่ \`:=\` ทำให้คุณประกาศตัวแปรและให้ compiler infer ชนิดข้อมูลจากค่าทางขวาได้ ซึ่งเป็นวิธีที่ idiomatic สำหรับตัวแปร local ฟังก์ชันสามารถคืนค่าได้หลายค่า — standard library เองก็อาศัยสิ่งนี้ในการจัดการ error: การเรียกที่อาจล้มเหลวโดยทั่วไปจะคืนค่า \`(result, error)\` และผู้เรียกจะตรวจสอบ error อย่างชัดเจนแทนที่จะพึ่งพา exception:

\`\`\`go
value, err := strconv.Atoi("42")
if err != nil {
    // handle it here, not several stack frames away
}
\`\`\`

Goroutine (\`go someFunc()\`) คือ primitive สำหรับ concurrency แบบเบาของ Go — runtime จะ multiplex goroutine จำนวนมากลงบน OS thread จำนวนน้อย ดังนั้นการสร้าง goroutine เป็นพันๆ ตัว (เช่น หนึ่งตัวต่อ request ที่เข้ามา) จึงมีต้นทุนต่ำ Channel (\`chan int\`) คือท่อที่มีชนิดข้อมูลชัดเจนที่ goroutine ใช้ส่งค่าหากันอย่างปลอดภัย โดยไม่ต้อง lock ด้วยตัวเอง

## สรุป

บทเรียนนี้ครอบคลุมพื้นฐานของ Go ที่ทำให้มันเหมาะกับ microservice: การ compile เป็น static binary ตัวเดียว, \`package main\`/\`func main()\` ในฐานะจุดเริ่มต้นของโปรแกรม และ pattern การคืนค่า \`(result, error)\` ที่ standard library ใช้แทน exception คุณยังได้เห็น goroutine และ channel ซึ่งเป็นเครื่องมือ concurrency แบบเบาที่มากับตัวภาษา`,
      },
      {
        slug: "http-service-with-net-http",
        titleEn: "Building an HTTP Service with net/http",
        titleTh: "การสร้าง HTTP Service ด้วย net/http",
        order: 2,
        contentEn: `Go's standard library includes a production-capable HTTP server — \`net/http\` — so a real service doesn't need a framework to get started.

\`\`\`go
package main

import (
    "encoding/json"
    "net/http"
)

type HealthResponse struct {
    Status string \`json:"status"\`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(HealthResponse{Status: "ok"})
}

func main() {
    http.HandleFunc("/health", healthHandler)
    http.ListenAndServe(":8080", nil)
}
\`\`\`

A *handler* is any function matching \`func(http.ResponseWriter, *http.Request)\` — \`http.HandleFunc\` registers one against a path. \`http.ResponseWriter\` is what you write the response to (headers, status code, body); \`*http.Request\` carries everything about the incoming request (method, URL, headers, body).

The backtick-quoted text after each struct field — \`json:"status"\` — is a *struct tag*. \`encoding/json\` reads it via reflection to decide what key to use when marshalling that field to JSON, letting a Go-idiomatic \`PascalCase\` field name (\`Status\`) serialize as a JSON-idiomatic \`camelCase\` or \`snake_case\` key.

\`http.ListenAndServe\` blocks forever, accepting connections and dispatching them to the registered handlers — the entire lifetime of a simple service is often just those two lines at the bottom of \`main\`.

## Conclusion

You built a minimal HTTP service using only Go's standard library — a handler function, \`http.HandleFunc\` to register it, and \`http.ListenAndServe\` to run it, no framework required. You also saw how a struct tag like \`json:"status"\` controls how \`encoding/json\` serializes a Go-idiomatic field name to a JSON-idiomatic key.`,
        contentTh: `Standard library ของ Go มี HTTP server ที่พร้อมใช้งานระดับ production อยู่แล้ว — \`net/http\` — ดังนั้น service จริงจึงไม่จำเป็นต้องมี framework เพื่อเริ่มต้น

\`\`\`go
package main

import (
    "encoding/json"
    "net/http"
)

type HealthResponse struct {
    Status string \`json:"status"\`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(HealthResponse{Status: "ok"})
}

func main() {
    http.HandleFunc("/health", healthHandler)
    http.ListenAndServe(":8080", nil)
}
\`\`\`

*handler* คือฟังก์ชันใดๆ ที่มี signature ตรงกับ \`func(http.ResponseWriter, *http.Request)\` — \`http.HandleFunc\` ลงทะเบียน handler ตัวหนึ่งกับ path หนึ่ง \`http.ResponseWriter\` คือสิ่งที่คุณเขียน response ลงไป (headers, status code, body) ส่วน \`*http.Request\` พก everything เกี่ยวกับ request ที่เข้ามา (method, URL, headers, body)

ข้อความที่อยู่ในเครื่องหมาย backtick ต่อท้ายแต่ละ struct field — \`json:"status"\` — คือ *struct tag* \`encoding/json\` อ่านมันผ่าน reflection เพื่อตัดสินใจว่าจะใช้ key อะไรตอน marshal field นั้นเป็น JSON ทำให้ชื่อ field แบบ \`PascalCase\` ที่ idiomatic กับ Go (\`Status\`) สามารถ serialize เป็น key แบบ \`camelCase\` หรือ \`snake_case\` ที่ idiomatic กับ JSON ได้

\`http.ListenAndServe\` จะ block ตลอดไป คอยรับ connection และส่งต่อไปยัง handler ที่ลงทะเบียนไว้ — อายุการทำงานทั้งหมดของ service ง่ายๆ มักจะเป็นแค่สองบรรทัดนี้ที่อยู่ท้าย \`main\`

## สรุป

คุณได้สร้าง HTTP service แบบมินิมอลโดยใช้แค่ standard library ของ Go — ฟังก์ชัน handler, \`http.HandleFunc\` เพื่อลงทะเบียนมัน และ \`http.ListenAndServe\` เพื่อรันมัน โดยไม่ต้องพึ่ง framework เลย คุณยังได้เห็นว่า struct tag อย่าง \`json:"status"\` ควบคุมวิธีที่ \`encoding/json\` serialize ชื่อ field แบบ Go-idiomatic ให้เป็น key แบบ JSON-idiomatic ได้อย่างไร`,
      },
      {
        slug: "structuring-a-microservice",
        titleEn: "Structuring a Microservice",
        titleTh: "การจัดโครงสร้าง Microservice",
        order: 3,
        contentEn: `A single \`main.go\` works for a demo, but a real service benefits from splitting responsibilities into packages the same way you'd split responsibilities into modules in any other language. A common layout:

\`\`\`
cmd/api/main.go       – wires everything together, starts the server
internal/handler/     – HTTP handlers: parse the request, call a service, write the response
internal/service/     – business logic, independent of HTTP
internal/repository/  – database access
internal/config/      – loading configuration from env vars
\`\`\`

The \`internal/\` directory is special to the Go compiler: packages under it can only be imported by code inside the same module, which is Go's way of marking "not a public API" without a separate access-control keyword.

Handlers should stay thin — parse the request, call into a service function, translate the result (or error) into an HTTP response — the same layered idea shows up across most backend stacks, including this project's own mindspace-api (Route → Controller → UseCase → Service → Repository). Keeping business logic out of the handler means it can be tested directly, as plain Go functions, without spinning up an HTTP server.

Configuration (database URLs, ports, feature flags) is conventionally read from environment variables at startup — \`os.Getenv("DATABASE_URL")\` — rather than hardcoded, so the same compiled binary runs unchanged across local, staging, and production.

## Conclusion

This lesson covered a common way to structure a real Go service — splitting \`cmd/\`, \`internal/handler\`, \`internal/service\`, and \`internal/repository\` by responsibility, the same layered idea this project's own mindspace-api follows. The \`internal/\` directory enforces "not a public API" at the compiler level, handlers should stay thin, and configuration belongs in environment variables rather than hardcoded values.`,
        contentTh: `\`main.go\` ไฟล์เดียวใช้ได้ดีสำหรับ demo แต่ service จริงจะได้ประโยชน์จากการแยกความรับผิดชอบออกเป็น package เหมือนที่คุณจะแยกความรับผิดชอบเป็น module ในภาษาอื่นๆ โครงสร้างที่พบได้ทั่วไป:

\`\`\`
cmd/api/main.go       – wires everything together, starts the server
internal/handler/     – HTTP handlers: parse the request, call a service, write the response
internal/service/     – business logic, independent of HTTP
internal/repository/  – database access
internal/config/      – loading configuration from env vars
\`\`\`

 directory \`internal/\` มีความพิเศษสำหรับ Go compiler: package ที่อยู่ภายใต้มันสามารถถูก import ได้เฉพาะจากโค้ดภายใน module เดียวกันเท่านั้น ซึ่งเป็นวิธีของ Go ในการระบุว่า "ไม่ใช่ public API" โดยไม่ต้องมี access-control keyword แยกต่างหาก

Handler ควรเบาบาง — parse request, เรียกฟังก์ชันของ service, แปลผลลัพธ์ (หรือ error) เป็น HTTP response — แนวคิดแบบเป็นชั้นเดียวกันนี้ปรากฏอยู่ใน backend stack ส่วนใหญ่ รวมถึง mindspace-api ของโปรเจกต์นี้เองด้วย (Route → Controller → UseCase → Service → Repository) การเก็บ business logic ไว้นอก handler หมายความว่ามันสามารถถูกทดสอบได้โดยตรงในฐานะฟังก์ชัน Go ธรรมดา โดยไม่ต้องรัน HTTP server ขึ้นมา

Configuration (database URL, port, feature flag) โดยทั่วไปจะถูกอ่านจาก environment variable ตอน startup — \`os.Getenv("DATABASE_URL")\` — แทนที่จะ hardcode ไว้ เพื่อให้ compiled binary ตัวเดียวกันรันได้เหมือนเดิมทั้งบน local, staging และ production

## สรุป

บทเรียนนี้ครอบคลุมวิธีทั่วไปในการจัดโครงสร้าง Go service จริง — การแยก \`cmd/\`, \`internal/handler\`, \`internal/service\` และ \`internal/repository\` ตามความรับผิดชอบ ซึ่งเป็นแนวคิดแบบเป็นชั้นเดียวกับที่ mindspace-api ของโปรเจกต์นี้เองใช้ directory \`internal/\` บังคับ "ไม่ใช่ public API" ในระดับ compiler, handler ควรเบาบาง และ configuration ควรอยู่ใน environment variable แทนที่จะ hardcode ไว้`,
      },
      {
        slug: "service-to-service-communication",
        titleEn: "Service-to-Service Communication",
        titleTh: "การสื่อสารระหว่าง Service",
        order: 4,
        contentEn: `Once an application is split into multiple services, they need a way to talk to each other. The simplest and most common approach is plain HTTP with JSON — one service is a client of another's REST API, using nothing more exotic than Go's standard \`net/http\` client:

\`\`\`go
resp, err := http.Get("http://users-service:8080/users/42")
if err != nil {
    // network error — the other service may be down
}
defer resp.Body.Close()

var user User
json.NewDecoder(resp.Body).Decode(&user)
\`\`\`

Every network call can fail in ways a local function call can't — the other service could be slow, unreachable, or returning an error status — so production code sets an explicit timeout (\`http.Client{Timeout: 2 * time.Second}\`) rather than trusting the default, and checks \`resp.StatusCode\` before assuming the body is a valid success response.

For higher-throughput or lower-latency internal communication, gRPC is a common alternative to REST/JSON: it defines a service's methods and message shapes in a \`.proto\` file, generates strongly-typed Go client and server code from it, and sends binary-encoded messages over HTTP/2 — trading REST's human-readability for a smaller wire format and compiler-checked contracts between services.

Whichever protocol is used, the calling service should treat the network itself as unreliable: retries with backoff, timeouts, and fallback behavior are what keep one slow dependency from cascading into an outage across the whole system.

## Conclusion

You saw the simplest way services talk to each other — plain HTTP with JSON, using Go's standard \`net/http\` client — and why production code needs an explicit timeout and a status-code check rather than trusting a network call to behave like a local function call. gRPC was introduced as an alternative for higher-throughput internal communication, and the broader takeaway is to treat the network itself as unreliable: retries, timeouts, and fallbacks are what keep one slow dependency from becoming a system-wide outage.`,
        contentTh: `เมื่อแอปพลิเคชันถูกแยกออกเป็นหลาย service แล้ว พวกมันต้องมีวิธีคุยกัน วิธีที่ง่ายและพบบ่อยที่สุดคือ HTTP ธรรมดาร่วมกับ JSON — service หนึ่งเป็น client ของ REST API ของอีก service หนึ่ง โดยใช้แค่ HTTP client มาตรฐานของ Go (\`net/http\`) ไม่มีอะไรพิเศษไปกว่านั้น:

\`\`\`go
resp, err := http.Get("http://users-service:8080/users/42")
if err != nil {
    // network error — the other service may be down
}
defer resp.Body.Close()

var user User
json.NewDecoder(resp.Body).Decode(&user)
\`\`\`

ทุก network call สามารถล้มเหลวได้ในแบบที่ local function call ไม่ล้มเหลว — อีก service หนึ่งอาจช้า เข้าถึงไม่ได้ หรือคืน error status มา — ดังนั้นโค้ด production จึงตั้ง timeout ไว้อย่างชัดเจน (\`http.Client{Timeout: 2 * time.Second}\`) แทนที่จะเชื่อค่า default และตรวจสอบ \`resp.StatusCode\` ก่อนที่จะสันนิษฐานว่า body เป็น response ที่สำเร็จและถูกต้อง

สำหรับการสื่อสารภายในที่ต้องการ throughput สูงกว่าหรือ latency ต่ำกว่า gRPC เป็นทางเลือกที่พบบ่อยแทน REST/JSON: มันกำหนด method และรูปแบบ message ของ service ไว้ในไฟล์ \`.proto\` สร้างโค้ด client และ server ของ Go ที่มีชนิดข้อมูลชัดเจนจากมัน และส่ง message ที่เข้ารหัสแบบ binary ผ่าน HTTP/2 — แลกความอ่านง่ายของ REST กับ wire format ที่เล็กกว่าและ contract ระหว่าง service ที่ compiler ตรวจสอบได้

ไม่ว่าจะใช้ protocol ไหน service ที่เรียกออกไปควรมองว่า network เองนั้นไม่น่าเชื่อถือ: การ retry พร้อม backoff, timeout และ fallback behavior คือสิ่งที่ป้องกันไม่ให้ dependency ตัวหนึ่งที่ช้าลุกลามกลายเป็น outage ทั้งระบบ

## สรุป

คุณได้เห็นวิธีที่ง่ายที่สุดที่ service คุยกัน — HTTP ธรรมดาร่วมกับ JSON โดยใช้ HTTP client มาตรฐานของ Go (\`net/http\`) — และเหตุผลที่โค้ด production ต้องตั้ง timeout อย่างชัดเจนและตรวจสอบ status code แทนที่จะเชื่อว่า network call จะทำงานเหมือน local function call gRPC ถูกแนะนำเป็นทางเลือกสำหรับการสื่อสารภายในที่ต้องการ throughput สูงกว่า และข้อคิดในภาพรวมคือให้มองว่า network เองนั้นไม่น่าเชื่อถือ: การ retry, timeout และ fallback คือสิ่งที่ป้องกันไม่ให้ dependency ตัวหนึ่งที่ช้ากลายเป็น outage ทั้งระบบ`,
      },
    ],
  },
  {
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
  },
  {
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
  },
  {
    slug: "secinsight-api-layers",
    title: "SecInsight API: Tracing the Codebase by Layers",
    descriptionEn: `Not a tour of every file, but a repeatable method: every request in the SecInsight API codebase crosses the same fixed chain. Learn to jump the chain by class name and import statement, and trace any endpoint in minutes without reading unrelated code. A private reference course for tracing a real work codebase by its layers -- assumes general TypeScript/backend knowledge, not knowledge of this repo going in.`,
    descriptionTh: `ไม่ใช่คู่มือไล่อ่านทุกไฟล์ แต่เป็นวิธีอ่านโค้ดที่ใช้ซ้ำได้ -- ทุก request ใน codebase ของ SecInsight API วิ่งผ่านสายเดียวกันเสมอ เรียนรู้วิธีกระโดดข้าม layer ด้วยชื่อ class กับ import statement แล้วไล่ endpoint ไหนก็ได้จบภายในไม่กี่นาที คอร์สอ้างอิงส่วนตัวสำหรับไล่อ่าน codebase งานจริงทีละ layer -- สมมุติว่ามีพื้นฐาน TypeScript/backend ทั่วไปอยู่แล้ว เพียงแต่ยังไม่รู้จัก repo นี้เป็นการเฉพาะ`,
    published: false,
    lessons: [
      {
        slug: "where-it-starts-server-app",
        titleEn: "Where It Starts — server.ts + app.ts",
        titleTh: "จุดเริ่มต้น — server.ts + app.ts",
        order: 1,
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
      },
      {
        slug: "foundations-under-the-chain",
        titleEn: "Foundations Under the Chain",
        titleTh: "รากฐานใต้สาย — abstracts, config, helper",
        order: 4,
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
      },
      {
        slug: "use-graphify-instead-of-grep-api",
        titleEn: "Use graphify Instead of grep",
        titleTh: "ใช้ graphify แทน grep",
        order: 11,
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
    ],
  },
  {
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
  },
];
