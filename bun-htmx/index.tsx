import { renderToString } from "react-dom/server";
import { Database } from "bun:sqlite";
import { Todos, type Todo } from "./todos";

const todosController = new Todos(
  new Database()
)

todosController.createTable();

// 创建一个 Bun 服务器
const server = Bun.serve({
  port: 8080,
  hostname: "localhost",
  fetch: handler
});

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '' || url.pathname === '/')
    return new Response(Bun.file("index.html"))

  if (url.pathname === '/todos' && request.method === 'POST') {
    const { todo } = await request.json();

    if (!todo?.length) return new Response('Invalid input', { status: 500 })
    
    todosController.add(todo);
    const todos = todosController.list();
      
    return new Response(
      renderToString(<TodoList todos={todos} />)
    );
  }

  if (request.method === "GET" && url.pathname === "/todos") {
    const todos = todosController.list()
    

    return new Response(
      renderToString(<TodoList todos={todos} />)
    );
  }
  
  return new Response("NotFound", { status: 404 });
}

Bun.write(
  Bun.stdout,
  `Server is listening on http://${server.hostname}:${server.port}\n\n`
)


function TodoList(props: { todos: Todo[] }) {
  return <ul className="list-reset flex flex-col justify-center items-center gap-2 rounded-lg  py-4  text-lg">
    { 
      props.todos.length
        ? props.todos.map(todo => <li 
          className="flex items-center gap-3 mt-2 no-underline transition-all px-6 py-2 rounded-lg w-full  text-white
         hover:bg-gray-600
          "
          key={todo.id}>
            <span className="w-4 block h-4 bg-[#5d73e9] rounded-full"></span>
            {todo.text}</li>)
        : 'No items added'
    }
  </ul>
}
