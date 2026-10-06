import type { SeedCourse } from "./types";

const course: SeedCourse = {
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
  };

export default course;
