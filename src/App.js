import React from 'react';
import './App.css';
import './bootstrap-social.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Placeholder from './components/Placeholder/Placeholder';


const initialState = {
  input: '',
  route: 'register',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  render(){
    const { route } = this.state;
    return (
      <div style={{'width': '100%', 'height': '100%'}}>
        { route === "signin" ? <Signin/> : '' }
        { route === "register" ? <Register/> : ''}
        { route === "placeholder" ? <Placeholder/> : ''}
      </div>
    );
  }
}

export default App;
