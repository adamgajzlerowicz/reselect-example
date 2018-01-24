import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { createSelector } from 'reselect';

const calculateSelector = data => {
  console.log('calculating important data', data);
  return data + data;
};

const getCounter = state => state.staticCounter;

const defaultState = {
  staticCounter: 50,
  counter: 0
};

const reducer = (store = defaultState, action) => {
  return {
    staticCounter: 50,
    counter: store.counter + 1
  };
};

const store = createStore(reducer);

setInterval(() => {
  store.dispatch({ type: 'f' });
}, 1000);

class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { foo: props.foo };
  }

  render() {
    console.log('rendering');
    return (
      <div>
        counter is: {this.props.counter} staticCounter is:{' '}
        {this.props.staticCounter}
      </div>
    );
  }
}

const s = createSelector(getCounter, calculateSelector);

const mapState = state => {
  return {
    staticCounter: s(state),
    counter: state.counter
  };
};

const Connected = connect(mapState)(Foo);

ReactDOM.render(
  <Provider store={store}>
    <Connected />
  </Provider>,
  document.getElementById('root')
);
