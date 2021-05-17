
import React from "react";
import { hot } from 'react-hot-loader/root';
import {Button} from '../es'
import '../components/button/style'

class App extends React.Component {
  render() {
    return (
      <>
        <h1>
          sdk
        </h1>
        <Button />
      </>
    );
  }
}

export default hot(App);
