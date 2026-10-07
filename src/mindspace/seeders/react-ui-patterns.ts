import type { SeedCourse } from "./types";

const course: SeedCourse = {
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
  };

export default course;
