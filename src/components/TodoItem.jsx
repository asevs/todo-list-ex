import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { todoListState } from '../atoms/atoms';
import {
  Grid,
  Checkbox,
  Paragraph,
  IconButton,
  Image,
  Input,
  Box,
} from 'theme-ui';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import editIcon from '../assets/icons/editIcon.svg';
import { ACCESS_TOKEN, API_URL } from '../api';

export const TodoItem = ({ todo }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [title, setTitle] = useState(todo.title);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const history = useHistory();
  const toggleTodoCompletion = async () => {
    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ACCESS_TOKEN,
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
          updated_at: new Date(),
        }),
      }).then((res) => res.json());

      setTodoList(
        replaceItemAtIndex(todoList, getIndex(todoList, response.data), {
          ...todo,
          completed: !todo.completed,
          updated_at: new Date(),
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const toggleEditTodo = () => {
    setIsEditTodo(!isEditTodo);
  };

  const editTodo = async (e) => {
    e.preventDefault();
    if (title) {
      try {
        const response = await fetch(`${API_URL}/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESS_TOKEN,
          },
          body: JSON.stringify({
            ...todo,
            title: title,
            updated_at: new Date(),
          }),
        }).then((res) => res.json());

        setTodoList(
          replaceItemAtIndex(todoList, getIndex(todoList, response.data), {
            ...todo,
            title: title,
            updated_at: new Date(),
          })
        );
        toggleEditTodo();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const redirectToDetailsPage = () => {
    history.push(`/details/${todo.id}`);
  };

  const deleteTodo = async () => {
    await fetch(`${API_URL}/todos/${todo.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then(setTodoList(removeItemAtIndex(todoList, getIndex(todoList, todo))));
  };

  return (
    <Grid
      gap={2}
      columns={[4, '0fr 1fr 0fr 0fr']}
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
          onClick={toggleTodoCompletion}
        />
      </label>
      {isEditTodo ? (
        <Box as="form" onSubmit={editTodo}>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit todo"
          />
        </Box>
      ) : (
        <Paragraph onClick={redirectToDetailsPage} sx={{ textAlign: 'left' }}>
          {todo.title}
        </Paragraph>
      )}
      <IconButton
        sx={{
          width: '25px',
          height: '25px',
          padding: '5px',
          '&:hover': {
            cursor: 'pointer',
            padding: '0',
          },
        }}
        onClick={toggleEditTodo}
      >
        <Image src={editIcon} />
      </IconButton>
      <IconButton
        sx={{
          width: '25px',
          height: '25px',
          padding: '5px',
          '&:hover': {
            cursor: 'pointer',
            padding: '0',
          },
        }}
        onClick={deleteTodo}
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
  return todoList.findIndex((listItem) => listItem.id === todo.id);
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  todoList: PropTypes.arrayOf(Object),
  completed: PropTypes.bool,
  updated_at: PropTypes.instanceOf(Date),
  id: PropTypes.number,
};
