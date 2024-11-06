$(function () {
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
});
