import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { titleState, addTodoSelector } from '../atoms/atoms';
import { Input, Box, Paragraph } from 'theme-ui';

export const TodoForm = () => {
  const [, setTodoList] = useRecoilState(addTodoSelector);
  const [title, setTitle] = useRecoilState(titleState);
  const resetTitle = useResetRecoilState(titleState);

  const addItem = (e) => {
    e.preventDefault();
    try {
      setTodoList(title);
      resetTitle();
    } catch (e) {
      console.error(e);
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
