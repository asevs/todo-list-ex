import React from 'react';
import { TodoList } from '../components';
import { Spinner, Box, Heading } from 'theme-ui';

export const TodoPage = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Heading
        sx={{
          padding: '20px',
          fontSize: '60px',
        }}
        as="h1"
      >
        Todo List
      </Heading>
      <React.Suspense fallback={<Spinner />}>
        <TodoList />
      </React.Suspense>
    </Box>
  );
};
