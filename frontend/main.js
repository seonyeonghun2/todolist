$(function () {
  $.ajax({
    url: "http://localhost:3000/todos",
    method: "get",
    success: function (rows) {
      const todoUL = $("#todos");
      let str;
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
