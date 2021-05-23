import PropTypes from 'prop-types';
import { TodoItem } from './';

export const TodoListMap = ({ todoList }) =>
  todoList.map((todo) => <TodoItem key={todo.id} todo={todo} />);

TodoListMap.proptypes = { todoList: PropTypes.arrayOf(Object) };
