$(function () {
  fetchTodos();
  createTodo();
});
function createTodo(){
  // + : 등록 버튼 누를때,
  const todosForm = $("#todos-form");
  const todoText = $("#todo-text");
  todosForm.on("submit", function(e){  
    e.preventDefault(); // 화면 새로고침 금지
    if (todoText.val() == "") {
      alert("할일 항목이 비어있습니다.");  
      return;    
    }
    $.ajax({
      url: "http://localhost:3000/todos",
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        title: $("#todo-text").val(),
        completed: false
      }),
      success: async function(result) {
        await fetchTodos();        
        clearInputAndFocus()
      }
    })
  })
  // 입력값이 있는지 확인 ==> 없다면 경고! 작성요청, 있다면 서버에 등록요청
}
function clearInputAndFocus(){
  $("#todo-text").val("") // 입력막대 초기화
  $("#todo-text").focus(); // 입력막대 포커스 적용
}
async function fetchTodos () {
  $.ajax({
    url: "http://localhost:3000/todos",
    method: "get",
    success: function (rows) {
      const todoUL = $("#todos");
      let strArr = []; // 배열로 만들고
      rows.forEach((row, i) => {
        strArr.push(`<li class="d-flex gap-1" data-id="${row._id}">
            <input type="checkbox" ${row.completed ? "checked" : ""}>
            <p>${row.title}</p>
            <input type="button" value="수정" class="modify-btn">
            <input type="button" value="삭제" class="remove-btn">
        </li>`);
      });
      strArr.reverse(); // 배열의 원소를 뒤집기(앞-뒤 바꿈)
      strArr.join(""); // 배열의 원소를 구분자로 연결하는 메소드
      todoUL.html(strArr);
      removeTodo();
      callModal();
    },
  });
}
function callModal(){
  const editTodo = $(".modify-btn");
  let todoId; // global var
  editTodo.on("click", function(){
    const edit = $(this);
    todoId = edit.parent().attr("data-id"); // 수정버튼의 부모 li의 data-id 값
    const todoTitle = edit.siblings("p").text(); // 수정버튼의 형제 p의 내용 텍스트
    // console.log(todoId, todoTitle);
    const modal = $("#modal");
    modal.find("#prev-todo").val(todoTitle); // 수정버튼 누를때 항목 타이틀을 기존 항목에 저장
    modal.fadeIn("fast") // modal 요소의 class 속성을 빈값
    modal.find("#next-todo").focus(); // 포커스 적용
  });
  $("#edit-form").on("submit", function(e){
    e.preventDefault();
    if($("#next-todo").val() == "") {
      alert("변경할 내용을 입력하세요");
      $("#next-todo").focus();
      return;
    }
    // 완료 값이 체크되어 있으면, true를 전송 | 아니라면 false 전송
    
    $.ajax({
      url: `http://localhost:3000/todos/${todoId}`,
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        title: $("#next-todo").val(),
        completed: $("#next-complete").is(":checked")
      }),
      success: function(){
        alert("업데이트 되었습니다.");
        location.reload();
      }
    });
    

  })
  $("#hide-modal").on("click", function(){
    $("#modal").fadeOut("fast")
  })
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