import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from '../atoms/atoms';
import { Box, Paragraph } from 'theme-ui';

export const DetailsPage = () => {
  const todoList = useRecoilValue(filteredTodoListState);
  const { id } = useParams();
  //eslint-disable-next-line
  const todo = todoList.find((todo) => todo.id == id);

  return (
    <Box
      css={{
        padding: '50px',
      }}
    >
      <Box
        css={{
          maxWidth: '600px',
          borderRadius: '15px',
          margin: 'auto',
          textAlign: 'left',
        }}
        bg="white"
        padding="15px"
      >
        <Paragraph as="h2">{todo.title}</Paragraph>
        <Paragraph> Created: {todo.created_at}</Paragraph>
        <Paragraph>Last updated: {todo.updated_at}</Paragraph>
      </Box>
    </Box>
  );
};

DetailsPage.propTypes = {
  todoList: PropTypes.arrayOf(Object),
  id: PropTypes.number,
  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  todo: PropTypes.object,
};
