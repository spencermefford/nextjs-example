import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Task from './Task';

class TasksContainer extends React.Component {
  render() {
    const { loading, error, data } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>ERROR!</div>;
    }

    if (data.tasks) {
      const tasks = data.tasks.map(task => <Task key={task.id} task={task} />);
      return tasks;
    }
    console.log('data', data);

    return null;
  }
}

const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
    }
  }
`;

export default graphql(TASKS_QUERY)(TasksContainer);
