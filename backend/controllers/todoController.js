const Todo = require("../models/todoModel")

// 화살표 함수 (ES6)
const getAllTodos = async (req, res) => {
    res.status(200).json(todos);
  }
const addTodo = async (req, res) => {
    const { title, completed } = req.body;
    try {
      const todo = await Todo.create({
        title,
        completed
      })
    } catch (error) {
      console.log("addTodo is Fail : ", error)
    } 
    res.status(200).send("add Todo");
  }
const getTodo = async (req, res) => {
    // 파라미터 변수 : 문자(string) 타입
    const foundOne = todos.find((todo) => todo.id === parseInt(req.params.id));
    res.status(200).json(foundOne);
  }
const updateTodo = async (req, res) => {
    const { id, title, completed } = req.body;
    const foundOne = todos.find((todo) => todo.id === id);
    // update field
    foundOne.title = title;
    foundOne.completed = completed;
    res.status(200).json(todos);
  }
const removeTodo = async (req, res) => {
    let { id } = req.body;
    todos.splice(--id, 1);
    res.status(200).json(todos);
  }

module.exports = {getAllTodos, addTodo, getTodo, updateTodo, removeTodo}