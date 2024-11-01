const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

let todos = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "lorem ipsum dolor",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "the perfect espresso",
    "completed": true
  },
];
/* HTTP 요청 : GET, POST, PUT, DELETE, PATCH */
/* RESTful API : 서버의 자원을 URL로 표현하고, HTTP METHOD로 자원을 요청, 처리 */
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});
app.get("/todos/:id", (req, res) => {  
  // 파라미터 변수 : 문자(string) 타입
  const foundOne = todos.find(todo => todo.id === parseInt(req.params.id))
  res.status(200).json(foundOne);
});
app.post("/todos", (req, res) => {
  const {userId, id, title, completed} = req.body;
  todos = [...todos, {
    "userId": userId,
    "id": id,
    "title": title,
    "completed": completed
  }];
  console.log(todos);
  res.status(200).send("ok")
})

app.put("/todos", (req, res) => {
  const { id, title, completed } = req.body;
  const foundOne = todos.find(todo => todo.id === id);
  // update field
  foundOne.title = title;
  foundOne.completed = completed;
  res.status(200).json(todos)
})

app.delete("/todos", (req, res) => {
  let {id} = req.body;
  todos.splice(--id, 1);
  res.status(200).json(todos);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});