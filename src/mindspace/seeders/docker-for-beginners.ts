import type { SeedCourse } from "./types";

const course: SeedCourse = {
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
  };

export default course;
