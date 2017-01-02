import React, { Component } from 'react';

class Properties extends Component {

  // https://facebook.github.io/react/docs/lists-and-keys.html
  // http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
  // https://facebook.github.io/react/docs/react-component.html

  constructor() {
    super();
    this.state = {
      text: '',
      todos: [
        {
          id: 1,
          name: 'Attend a meeting at work'
        },
        {
          id: 2,
          name: 'Bring kids to school'
        },
        {
          id: 3,
          name: 'Go to grocery store'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        Properties Route
        <PropertiesList todos={this.state.todos} />
        <PropertiesRow />
        <PropertiesForm />
      </div>
    )
  }

  _handleClick() {
    console.log('hi');
  }
}

export default Properties;

class PropertiesList extends Component {
  render() {
    return (
      <ul>
        {
          this.props.todos.map(todo => {
            return <li key={todo.id}>{todo.name}</li>
          })
        }
      </ul>
    )
  }
}

class PropertiesRow extends Component {
  render() {
    return (
      <div>ROW</div>
    )
  }
}

class PropertiesForm extends Component {
  render() {
    return (
      <div>FORM</div>
    )
  }
}