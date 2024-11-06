const express = require("express"); // express 패키지를 불러오고
const router = express.Router(); // express 라우터 클래스를 이용해서 router 객체를 생성
const {getAllTodos,getTodo,updateTodo,removeTodo,addTodo} = require("../controllers/todoController")
router
  .route("/")
  .get(getAllTodos)
  .post(addTodo);

router
  .route("/:id")
  .get(getTodo)
  .put(updateTodo)
  .delete(removeTodo);

module.exports = router; // 다른 위치의 js 파일에서 router 객체를 불러올수 있게 됨(모듈 시스템)