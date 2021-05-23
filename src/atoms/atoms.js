import { atom, selector } from 'recoil';
export const fetchTodosSelector = selector({
  key: 'fetchTodosSelector',
  get: async () => {
    const response = await fetch('https://gorest.co.in/public-api/todos').then(
      (response) => response.json()
    );
    return response.data;
  },
});

export const todoListState = atom({
  key: 'todoListState',
  default: fetchTodosSelector,
});

export const titleState = atom({
  key: 'titleState',
  default: '',
});

export const searchState = atom({
  key: 'searchState',
  default: '',
});

export const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: false,
});

export const addTodoSelector = selector({
  key: 'addTodoSelector',
  get: ({ get }) => get(todoListState),
  set: ({ get, set }, newValue) =>
    set(todoListState, [
      ...get(todoListState),
      {
        id: getId(),
        title: newValue,
        completed: false,
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]),
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const search = get(searchState);
    const todoList = get(todoListState).filter(searchingFor(search));
    if (filter) {
      return todoList.filter((item) => !item.completed);
    } else {
      return todoList;
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.completed).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;

    return {
      totalCompletedNum,
      totalUncompletedNum,
    };
  },
});

let id = 1000;
function getId() {
  return id++;
}

function searchingFor(searchTodo) {
  return function (todo) {
    return (
      todo.title.toLowerCase().includes(searchTodo.toLowerCase()) || !searchTodo
    );
  };
}
