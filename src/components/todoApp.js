import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

class TodoApp extends React.Component {
  render() {
    const {todoStore, viewStore} = this.props;
    return (
      <div>
	<header className="header">
	  <h1>todos</h1>
	  <TodoEntry todoStore={todoStore} />
	</header>
	<TodoOverview todoStore={todoStore} viewStore={viewStore} />
	<TodoFooter todoStore={todoStore} viewStore={viewStore} />
      </div>
    );
  }

  componentDidMount() {
    if (__CLIENT__) {
      var { Router } = require('director/build/director');
      var viewStore = this.props.viewStore;
      var router = Router({
	'/': function() { viewStore.setTodoFilter(ALL_TODOS); },
	'/active': function() { viewStore.setTodoFilter(ACTIVE_TODOS); },
	'/completed': function() { viewStore.setTodoFilter(COMPLETED_TODOS); }
      });
      router.init('/');
    }
  }
}

TodoApp.propTypes = {
  viewStore: PropTypes.object.isRequired,
  todoStore: PropTypes.object.isRequired
};

export default observer(TodoApp);
