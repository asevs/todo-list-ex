import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { todoListState } from '../atoms/atoms';
import { Grid, Checkbox, Paragraph, IconButton, Image } from 'theme-ui';
import deleteIcon from '../assets/icons/deleteIcon.svg';

export const TodoItem = ({ todo }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const history = useHistory();
  const toggleItemCompletion = (todo) => {
    setTodoList(
      replaceItemAtIndex(todoList, getIndex(todoList, todo), {
        ...todo,
        completed: !todo.completed,
        updated_at: new Date(),
      })
    );
  };

  const redirectToDetailsPage = (id) => {
    history.push(`/details/${id}`);
  };

  const deleteItem = (todo) => {
    setTodoList(removeItemAtIndex(todoList, getIndex(todoList, todo)));
  };

  return (
    <Grid
      gap={2}
      columns={[3, '0fr 1fr 0fr']}
      padding="8px"
      sx={{
        alignItems: 'center',
        '&:hover': {
          background: 'lightgray',
          cursor: 'pointer',
        },
      }}
    >
      <label>
        <Checkbox
          sx={{
            '&:hover': {
              cursor: 'pointer',
              background: '#CA96C5',
            },
          }}
          defaultChecked={todo.completed}
          onClick={() => toggleItemCompletion(todo)}
        />
      </label>
      <Paragraph
        onClick={() => redirectToDetailsPage(todo.id)}
        sx={{ textAlign: 'left' }}
      >
        {todo.title}
      </Paragraph>
      <IconButton
        sx={{
          margin: '0 0 0 auto',
          width: '25px',
          height: '25px',
          padding: '5px',
          '&:hover': {
            cursor: 'pointer',
            padding: '0',
          },
        }}
        onClick={() => deleteItem(todo)}
      >
        <Image src={deleteIcon} />
      </IconButton>
    </Grid>
  );
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function getIndex(todoList, todo) {
  return todoList.findIndex((listItem) => listItem === todo);
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  todoList: PropTypes.arrayOf(Object),
  completed: PropTypes.bool,
  updated_at: PropTypes.instanceOf(Date),
  id: PropTypes.number,
};
