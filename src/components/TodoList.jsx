import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TodoListMap, TodoForm } from './';
import {
  filteredTodoListState,
  todoListFilterState,
  todoListStatsState,
  searchState,
} from '../atoms/atoms';
import { Box, Input, Switch, Paragraph } from 'theme-ui';

export const TodoList = () => {
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const { totalCompletedNum, totalUncompletedNum } =
    useRecoilValue(todoListStatsState);
  const [, setSearchTodo] = useRecoilState(searchState);

  const toggleHideCompletedTodos = () => {
    setFilter(!filter);
  };

  return (
    <Box
      css={{
        maxWidth: '600px',
        borderRadius: '15px',
        margin: 'auto',
      }}
      bg="white"
      padding="15px"
    >
      <Paragraph
        as="h3"
        sx={{
          margin: '0 0 10px 0',
        }}
      >
        Completed: {totalCompletedNum} Uncompleted: {totalUncompletedNum}
      </Paragraph>
      <Switch label="Hide completed tasks" onClick={toggleHideCompletedTodos} />
      <Input
        sx={{
          margin: '20px 0 0 0',
        }}
        type="text"
        placeholder="Find todo"
        onChange={(e) => setSearchTodo(e.target.value)}
      />
      <Box
        sx={{
          maxHeight: '50vh',
          overflow: 'auto',
          margin: '20px 0 20px 0',
        }}
      >
        <TodoListMap todoList={filteredTodoList} />
      </Box>
      <TodoForm />
    </Box>
  );
};
TodoList.propTypes = {
  filteredTodoList: PropTypes.arrayOf(Object),
  filter: PropTypes.bool,
  totalCompletedNum: PropTypes.number,
  totalUncompletedNum: PropTypes.number,
};
