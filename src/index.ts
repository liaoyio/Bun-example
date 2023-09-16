import { type ServeOptions } from "bun"

Bun.serve({
  fetch(request: Request) {

    // 判断 request.url  是否存在 'hello'
    if(request.url.indexOf('hello')!= -1){
      return new Response("Hello Bun!")
    }
    throw new Error("bad request");
  },

  error(error) {
    console.log(error)
    return new Response("oops!!")
  },


  // tls: {
    // key: Bun.file("./key.pem"),
    // cert: Bun.file("./cert.pem")
  // }


} as ServeOptions)
