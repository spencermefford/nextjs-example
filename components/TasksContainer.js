import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
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
      return data.tasks.map(task => <Task key={task.id} task={task} />);
    }

    return null;
  }
}

TasksContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.shape({
    tasks: PropTypes.array,
  }),
};

TasksContainer.defaultProps = {
  loading: false,
  error: null,
  data: null,
};

const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
    }
  }
`;

export default graphql(TASKS_QUERY)(TasksContainer);
