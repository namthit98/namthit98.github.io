document.addEventListener("DOMContentLoaded", function() {
  class Todos {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.isCompleted = false;
      this.createdDate = Date.now();
    }
  }

  class Storage {
    getStorage() {
      if (localStorage.getItem("Todos") === null) {
        return [];
      } else {
        return JSON.parse(localStorage.getItem("Todos"));
      }
    }

    saveToStorage() {
      localStorage.setItem("Todos", JSON.stringify(arrayTodos));
    }
  }

  const btn = document.querySelector(".btn");
  const inputTodo = document.querySelector(".main__input");
  const listTodo = document.querySelector(".list-todo");

  const storage = new Storage();
  const arrayTodos = storage.getStorage();

  const showTodos = () => {
    listTodo.innerHTML = '';
    arrayTodos.forEach(el => createUI(el));
  }

  const createUI = (todo) => {
    const li = document.createElement("li");
    li.className = todo.isCompleted === false ? "item" : "item item--disabled";
    li.setAttribute("data-id", todo.id);

    const name = document.createElement("span");
    name.className = "item__name";
    name.textContent = todo.name;

    li.appendChild(name);

    const removeBtn = document.createElement("span");
    removeBtn.className = "item__remove";
    removeBtn.textContent = "X";
    li.appendChild(removeBtn);

    listTodo.insertBefore(li, listTodo.childNodes[0]); 
  }

  const addNewTodos = () => {
    const id = arrayTodos.length === 0 ? 0 : arrayTodos[arrayTodos.length - 1].id + 1;
    const name = inputTodo.value;
    const todo = new Todos(id, name);
    arrayTodos.push(todo);
    storage.saveToStorage();
    showTodos();
    resetInput();
  }

  const checkTodos = (e) => {
    if(e.target.classList.contains("item")) {
      const id = parseInt(e.target.dataset.id);
      const todoNeeded = arrayTodos.find(el => el.id === id);
      todoNeeded.isCompleted = !todoNeeded.isCompleted;
      storage.saveToStorage();
      showTodos();
    } else if (e.target.classList.contains("item__remove")) {
      const id = parseInt(e.target.parentElement.dataset.id);
      const todoNeeded = arrayTodos.findIndex(el => el.id === id);
      arrayTodos.splice(todoNeeded, 1);
      console.log(arrayTodos);
      storage.saveToStorage();
      showTodos();
    }
  }

  const resetInput = () => {
    inputTodo.value = '';
    inputTodo.focus();
  }

  const init = () => {
    btn.addEventListener("click", addNewTodos);
    
    listTodo.addEventListener("click", checkTodos);

    document.addEventListener("keypress", (event) => {
      if(event.keyCode === 13 || event.which === 13) {
        addNewTodos();
      }
    });

    showTodos();

    resetInput();
  }

  init();
});

