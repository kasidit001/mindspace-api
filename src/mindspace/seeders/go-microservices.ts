import type { SeedCourse } from "./types";

const course: SeedCourse = {
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
  };

export default course;
