const todosEl = document.getElementById("todos");
const todosList = document.getElementById("todos__list")!;
const todosForm = document.getElementById("todos__form") as HTMLFormElement;
const todosFormInput = todosForm.todo as HTMLInputElement;
const todosItems = document.getElementsByClassName("todos__item");
let localStorageTodos: localStorageTodosObject[] = [];

type localStorageTodosObject = {
  text: string;
  completed: boolean;
};

const getTodos = () => {
  if (localStorage.getItem("todos")) {
    localStorageTodos = JSON.parse(localStorage.getItem("todos")!);
  }
};

const setTodos = () => {
  if (localStorageTodos.length > 0) {
    for (const todo of localStorageTodos) {
      const listItem = document.createElement("li");
      listItem.classList.add("todos__item");
      todo.completed ? listItem.classList.add("todos__item--completed") : null;
      listItem.innerText = todo.text;
      todosList.appendChild(listItem);
    }
  }
};

const isTodosListEmpty = () => {
  if (todosItems.length === 0) {
    todosList.innerHTML = "";
    const todosEmpty = document.createElement("span");
    todosEmpty.classList.add("todos__none");
    todosEmpty.innerText = "No Todos";
    todosList.appendChild(todosEmpty);
  }
};

const handleTodoItemClick = (todo: Element) => {
  todo.addEventListener("click", () => {
    if (todo.classList.contains("todos__item--completed")) {
      todo.classList.remove("todos__item--completed");
      localStorageTodos = localStorageTodos.map(todoObject => {
        if (todoObject.text === todo.innerHTML) {
          return { ...todoObject, completed: false };
        }
        return todoObject;
      });

      localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    } else {
      todo.classList.add("todos__item--completed");
      localStorageTodos = localStorageTodos.map(todoObject => {
        if (todoObject.text === todo.innerHTML) {
          return { ...todoObject, completed: true };
        }
        return todoObject;
      });

      localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    }
  });

  todo.addEventListener("dblclick", () => {
    for (const todoObject in localStorageTodos) {
      if (localStorageTodos[todoObject].text === todo.innerHTML) {
        localStorageTodos.splice(parseInt(todoObject), 1);
        localStorage.setItem("todos", JSON.stringify(localStorageTodos));
        break;
      }
    }

    todo.remove();
    isTodosListEmpty();
  });
};

getTodos();
setTodos();
isTodosListEmpty();
for (const todo of todosItems) {
  handleTodoItemClick(todo);
}

todosForm.addEventListener("submit", event => {
  event.preventDefault();

  if (todosFormInput.value.trim() !== "") {
    if (todosItems.length === 0) {
      todosList.innerHTML = "";
    }

    const listItem = document.createElement("li");
    listItem.classList.add("todos__item");
    listItem.innerText = todosFormInput.value;
    todosList.appendChild(listItem);
    localStorageTodos.push({ text: todosFormInput.value, completed: false });
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    todosForm.reset();

    handleTodoItemClick(listItem);
  }
});
