import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'theme-ui';
import { theme } from '../theme/theme';
import { routes } from '../routes';
import { DetailsPage } from './DetailsPage';
import { TodoPage } from './TodoPage';
import { Spinner } from 'theme-ui';

const Root = () => {
  return (
    <div className="Root">
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path={routes.home}
                render={() => <Redirect to={routes.todoList} />}
              />
              <Route exact path={routes.todoList} component={TodoPage} />
              <React.Suspense fallback={<Spinner />}>
                <Route path={routes.todo} component={DetailsPage} />
              </React.Suspense>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
};

export default Root;
