import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { todoState } from '../atoms/atoms';
import { useParams } from 'react-router-dom';
import { Box, Paragraph } from 'theme-ui';
import { API_URL } from '../api';

export const DetailsPage = () => {
  const { id } = useParams();
  const [todo, setTodo] = useRecoilState(todoState);
  const fetchTodo = async (id) => {
    if (id) {
      try {
        const todo = await fetch(`${API_URL}/todos/${id}`, {
          method: 'GET',
        }).then((res) => res.json());
        console.log(todo.data);
        setTodo(todo.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchTodo(id);
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      css={{
        padding: '100px',
      }}
    >
      <Box
        css={{
          maxWidth: '600px',
          borderRadius: '15px',
          margin: 'auto',
          textAlign: 'left',
          padding: '20px',
        }}
        bg="white"
        padding="15px"
      >
        <Paragraph
          css={{
            padding: '10px 0 30px 0',
          }}
          as="h2"
        >
          {todo.title}
        </Paragraph>
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
