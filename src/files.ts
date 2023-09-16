
// 读文件
const file = Bun.file("package.json")
const contents = await file.json()

console.log('package.json\n', contents)

/* if (contents.scripts) {
  contents.scripts.start = "bun run src/files.ts"
} */

// 写文件
Bun.write("package.json", JSON.stringify(contents, null,2))


/**
 *  bun 不推荐使用 fs 模块, __dirname, __filename
 *  如果需要获取文件信息，可以使用 import.meta
*/

// 文件源信息
const { file: theFile, path, dir, main, url } = import.meta

console.log({
  /* 文件名 -> file.ts */
  file: theFile,
  /* 文件路径 -> /Users/xxx/xxx/bun-study/src/files.ts */
  path,
  /* 文件目录 -> /Users/xxx/xxx/bun-study/src */
  dir,
  /* 是否为文件主目录 -> true */
  main,
  /* 文件 url -> file:///Users/xxx/xxx/bun-study/src/files.ts */
  url
})

/* 使用源信息读取文件并写入 */
const txt = `${import.meta.dir}/test.txt`

// open writer
const file2 = Bun.file(txt)
const  writer = file2.writer()

// write some stuff
writer.write("Something \n")

// do some stuff
console.log("Still writing");


// write some more stuff
writer.write("Something else \n")
console.log("Wrote some more stuff");
console.log("Finishing..");

// flush writer
writer.flush();
// close
writer.end();

// 直接写入会覆盖 package.json 文件
// Bun.write(file, "Some content to stdout")

// 执行后，命令行最左侧显示 "Bun ❤️"
Bun.write(Bun.stdout, "Bun ❤️")
