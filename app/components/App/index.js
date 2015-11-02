import React from 'react';

import styles from './styles.scss';

export default class App extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <div className={styles.Root}>
        {children}
      </div>
    );
  }
}


