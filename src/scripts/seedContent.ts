export interface SeedLesson {
  slug: string;
  title: string;
  order: number;
  content: string;
}

export interface SeedCourse {
  slug: string;
  title: string;
  description: string;
  lessons: SeedLesson[];
}

export const seedCourses: SeedCourse[] = [
  {
    slug: "typescript-for-js-programmers",
    title: "TypeScript for JS Programmers",
    description: "A fast on-ramp to TypeScript for developers who already know JavaScript.",
    lessons: [
      {
        slug: "why-typescript",
        title: "Why TypeScript",
        order: 1,
        content: `TypeScript is a superset of JavaScript that adds a static type system. Every valid JavaScript program is (almost) valid TypeScript — you opt in to types incrementally rather than rewriting your codebase.

The core value is catching a class of bugs — wrong argument types, typos in property names, calling a function with too few arguments, forgetting to handle a null case — at compile time instead of at runtime in production. The TypeScript compiler (tsc) reads your code, infers or checks types, and reports errors before the code ever runs.

TypeScript also powers editor tooling: autocomplete, inline documentation, "go to definition", and safe renames all rely on the type information TypeScript computes. This is often the biggest day-to-day win — better tooling, not just fewer bugs.

Crucially, types are erased at compile time. TypeScript emits plain JavaScript with no runtime type-checking overhead — the type system is a development-time tool only.`,
      },
      {
        slug: "basic-types",
        title: "Basic Types",
        order: 2,
        content: `TypeScript's basic types mirror JavaScript's primitives: string, number, boolean, null, undefined, bigint, and symbol. You annotate a variable's type with a colon: let age: number = 30;.

Arrays are written as type[] or Array<type>, e.g. let names: string[] = ["Ada", "Grace"];. Tuples are fixed-length arrays with known types per position: let pair: [string, number] = ["x", 1];.

The any type disables type checking for a value — useful as an escape hatch, but it defeats the purpose of TypeScript if overused. unknown is the type-safe counterpart: you can assign anything to an unknown value, but you must narrow it (with a type guard) before using it.

void describes a function that returns nothing meaningful. never describes a value that can never occur — e.g. the return type of a function that always throws or loops forever. TypeScript can often infer types without explicit annotations; this is called type inference, and relying on it for local variables is idiomatic.`,
      },
      {
        slug: "interfaces-and-type-aliases",
        title: "Interfaces & Type Aliases",
        order: 3,
        content: `Interfaces describe the shape of an object: interface User { id: string; name: string; age?: number }. The ? marks age as optional. A value satisfies an interface if it has at least those properties with compatible types — TypeScript uses structural typing, not nominal typing, so unrelated types with the same shape are interchangeable.

Type aliases (type User = { id: string; name: string }) can describe the same object shapes, plus unions, tuples, and primitives that interfaces cannot: type ID = string | number;. In practice, use interface for object shapes you expect to be extended or implemented by classes, and type for unions, tuples, or mapped/utility types.

Interfaces support declaration merging — declaring the same interface twice merges their members — and extends for inheritance: interface Admin extends User { role: string }. Type aliases use intersection (&) instead: type Admin = User & { role: string };.

readonly properties (readonly id: string) prevent reassignment after creation, which is useful for immutable data structures.`,
      },
      {
        slug: "functions",
        title: "Functions",
        order: 4,
        content: `Function parameters and return values can be typed explicitly: function add(a: number, b: number): number { return a + b; }. TypeScript infers the return type from the function body when omitted, so explicit return types are mostly for documentation and to catch unintended type changes.

Optional parameters use ?: function greet(name: string, title?: string) {}. Default parameters (function greet(name: string, title = "Friend")) are automatically treated as optional.

Function types can be written as a standalone type: type BinaryOp = (a: number, b: number) => number;. This is how you type callbacks and higher-order functions, e.g. function apply(op: BinaryOp, a: number, b: number) { return op(a, b); }.

Overloads let a function have multiple valid call signatures with different parameter/return types, useful when a function's behavior genuinely varies by input shape rather than by a simple union type.`,
      },
      {
        slug: "generics",
        title: "Generics",
        order: 5,
        content: `Generics let you write reusable code that works over a variety of types while preserving type information, instead of falling back to any. A generic function identity<T>(value: T): T { return value; } returns exactly the type it was given — identity(5) is typed number, identity("x") is typed string.

Generic constraints (extends) restrict what a type parameter can be: function getLength<T extends { length: number }>(item: T) { return item.length; } — this accepts arrays, strings, or any object with a numeric length property.

Generics apply to interfaces, type aliases, and classes too: interface Box<T> { value: T }, class Stack<T> { push(item: T): void {} }. This is how built-in types like Array<T>, Promise<T>, and Map<K, V> are defined.

Default type parameters (function wrap<T = string>(value: T)) let callers omit the generic argument when a sensible default exists.`,
      },
      {
        slug: "union-types-and-narrowing",
        title: "Union Types & Narrowing",
        order: 6,
        content: `A union type (type Id = string | number;) means a value can be one of several types. TypeScript only allows operations that are valid for every member of the union until you narrow it to a more specific type.

Narrowing happens through control flow: typeof checks (if (typeof id === "string")), instanceof checks, Array.isArray, truthiness checks, and equality checks against literal types all narrow a union within the branch where the check holds.

Discriminated unions use a shared literal-typed field to distinguish variants: type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };. Switching on shape.kind lets TypeScript narrow to the exact variant inside each case, and exhaustiveness checking (via a never-typed default case) catches missing cases at compile time.

Type predicates (function isString(x: unknown): x is string { return typeof x === "string"; }) let you encapsulate a narrowing check in a reusable function that TypeScript understands as a type guard.`,
      },
    ],
  },
  {
    slug: "typescript-tooling",
    title: "TypeScript Tooling",
    description: "Configuring and running the TypeScript compiler, editors, and linters effectively.",
    lessons: [
      {
        slug: "tsconfig-essentials",
        title: "tsconfig.json Essentials",
        order: 1,
        content: `tsconfig.json configures the TypeScript compiler for a project. Running tsc --init generates a starter file. The most important field is compilerOptions.

target sets which JS version tsc compiles down to (e.g. "ES2020"); module sets the module system ("ESNext", "CommonJS", "NodeNext"). strict: true enables the full set of strict type-checking flags (strictNullChecks, noImplicitAny, strictFunctionTypes, etc.) and is strongly recommended for new projects — it's far easier to start strict than to retrofit strictness later.

outDir and rootDir control where compiled output goes and what the source root is. include and exclude (top-level, not inside compilerOptions) control which files are part of the program — exclude commonly lists node_modules and dist.

For projects that only use TypeScript for type-checking (with bundlers like esbuild, swc, or Bun handling actual compilation), noEmit: true tells tsc to check types without writing output files.`,
      },
      {
        slug: "the-typescript-compiler",
        title: "The TypeScript Compiler (tsc)",
        order: 2,
        content: `tsc is the TypeScript compiler CLI. Run it with no arguments in a project with a tsconfig.json to type-check and compile the whole project according to that config. tsc --noEmit type-checks without producing output — commonly used as a CI step or pre-commit check.

tsc --watch re-runs type-checking incrementally whenever a file changes, which is much faster than a full re-check on large projects because tsc caches information between runs.

tsc file.ts compiles a single file directly, ignoring tsconfig.json unless you also pass config-relevant flags. This is rarely used in real projects — prefer the project-wide config-driven mode.

Project references (composite: true plus "references": [{ "path": "../otherPackage" }] in tsconfig.json) let you split a large codebase into independently type-checked, incrementally built sub-projects — useful in monorepos.`,
      },
      {
        slug: "editor-integration",
        title: "Editor Integration & the Language Server",
        order: 3,
        content: `TypeScript ships a language server (tsserver) that editors talk to over a JSON-based protocol to provide autocomplete, hover types, inline errors, "go to definition", "find all references", and automated refactors like renaming a symbol project-wide.

VS Code bundles a version of TypeScript and uses tsserver out of the box; other editors (Neovim, JetBrains IDEs, Sublime) use it via a Language Server Protocol (LSP) adapter. The editor's TypeScript version can differ from the project's — mismatches show up as inconsistent errors between the editor and a manual tsc run, so pinning and using the workspace's local TypeScript version is recommended.

Inline errors from the editor come directly from the same type checker tsc uses, so "no red squiggles" is a reasonable (though not complete) proxy for "tsc --noEmit would pass" — background compilation errors and stricter batch-mode checks can still differ slightly from live editor state.`,
      },
      {
        slug: "linting-with-eslint",
        title: "Linting with ESLint + typescript-eslint",
        order: 4,
        content: `TypeScript's compiler catches type errors, but not style or correctness issues like unused variables, inconsistent naming, or unsafe patterns (e.g. floating promises). ESLint fills that gap, and typescript-eslint provides the parser and rule set needed to lint TypeScript syntax and use type information in rules.

A typical setup installs eslint, typescript-eslint, and configures eslint.config.js (flat config) to extend typescript-eslint's recommended rule sets. Type-aware rules (e.g. no-floating-promises, no-unsafe-assignment) require pointing ESLint at your tsconfig.json so it can build a full type-checked program — these rules are slower but catch real bugs that non-type-aware linting can't.

Formatting (indentation, quote style, line length) is usually delegated to Prettier rather than ESLint, since ESLint's style rules and Prettier can conflict; eslint-config-prettier disables ESLint's formatting rules so the two tools don't fight.`,
      },
    ],
  },
];
