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
      rows.forEach((row, i) => {
        str += `<li class="d-flex gap-1" data-id="${row._id}">
            <input type="checkbox" ${row.completed ? "checked" : ""}>
            <p>${row.title}</p>
            <input type="button" value="수정" class="modify-btn">
            <input type="button" value="삭제${i}" class="remove-btn">
        </li>`;
      });
      todoUL.html(str);
      removeTodo();
    },
  });
}

function removeTodo() {
  const removeBtns = $(".remove-btn");
  removeBtns.on("click", function(){
    const currBtn = $(this); // 현재 누른, 버튼이 무엇인지
    $.ajax({
      url: `http://localhost:3000/todos/${currBtn.parent().attr("data-id")}`,
      method: "delete",
      success: function() {
        alert("선택항목이 삭제되었습니다");        
      }
    }).done(() => {
      fetchTodos(); // 그럼, 다시 전체 할일목록을 가져와
    })
  })
  // [삭제]버튼 누를때 서버에 있는 데이터 삭제 요청
  // 서버에 있는 데이터 가져오기 (fetch)
  // 화면에 표시하기
}