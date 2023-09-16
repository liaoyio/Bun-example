import {renderToString} from "react-dom/server";

const router = new Bun.FileSystemRouter({
  // 设置路由风格, 默认为 nextjs (目前唯一支持的风格)
  style: "nextjs",
  // 设置页面目录, 默认为 "./pages"
  dir: "./pages"
})

// 匹配路由,设置为根目录
const theMatch = router.match("/");

if (!theMatch) throw new Error("no match");

const App = (await import(theMatch.filePath)).default

console.log(renderToString(<App message="World!!" />))


Bun.serve({
  fetch(req) {
    const match = router.match(req)
    if (match) {
      return new Response(renderToString(<App message="World!!" />))
    }
    return new Response("Not found", {status: 404})
  }
})
