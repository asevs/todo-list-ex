import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { titleState, addTodoSelector } from '../atoms/atoms';
import { Input, Box, Paragraph } from 'theme-ui';
import { ACCESS_TOKEN, API_URL, USER_ID } from '../api';

export const TodoForm = () => {
  const [, setTodoList] = useRecoilState(addTodoSelector);
  const [title, setTitle] = useRecoilState(titleState);
  const resetTitle = useResetRecoilState(titleState);

  const addItem = async (e) => {
    e.preventDefault();
    if (title) {
      const response = await fetch(`${API_URL}/users/${USER_ID}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ACCESS_TOKEN,
        },
        body: JSON.stringify({
          user_id: USER_ID,
          title: title,
          completed: false,
        }),
      })
        .then((res) => res.json())
        .then(resetTitle());
      setTodoList(response.data);
    }
  };

  return (
    <Box as="form" onSubmit={addItem}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
      />
      <Paragraph
        sx={{
          margin: '10px 0 0 0',
        }}
      >
        Length: {title.length}
      </Paragraph>
    </Box>
  );
};

TodoForm.propTypes = { title: PropTypes.string };
