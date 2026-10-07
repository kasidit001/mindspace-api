import type { SeedCourse } from "./types";

const course: SeedCourse = {
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
  };

export default course;
