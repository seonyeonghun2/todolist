$(function () {
  fetchTodos();
  createTodo();
});
function createTodo(){
  // + : 등록 버튼 누를때,
  const todosForm = document.querySelector("#todos-form");
  todosForm.addEventListener("submit", function(){  
    $.ajax({
      url: "http://localhost:3000/todos",
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        title: todosForm.querySelector("#todo-text").value,
        completed: false
      }),
      success: async function(result) {
        console.log(result);
        await fetchTodos();        
        clearInputAndFocus()
      }
    })
  })
  // 입력값이 있는지 확인 ==> 없다면 경고! 작성요청, 있다면 서버에 등록요청
}
function clearInputAndFocus(){
  todosForm.querySelector("#todo-text").value = ""; // 입력막대 초기화
  todosForm.querySelector("#todo-text").focus(); // 입력막대 포커스 적용
}
async function fetchTodos () {
  $.ajax({
    url: "http://localhost:3000/todos",
    method: "get",
    success: function (rows) {
      const todoUL = $("#todos");
      let str = ""; // 자바스크립트 변수는 초기화를 하지 않으면 undefined (상태)
      rows.forEach((row) => {
        str += `<li class="d-flex gap-1">
            <input type="checkbox" ${row.completed ? "checked" : ""}>
            <p>${row.title}</p>
            <input type="button" value="modify">
            <input type="button" value="remove">
        </li>`;
      });
      todoUL.html(str);
    },
  });
}