import React from 'react';

class Placeholder extends React.Component {
    signOut = () => {
      const { changeRoute } = this.props;
      fetch('http://localhost:3000/signout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: window.sessionStorage.getItem('token')
            })
          }).then(response => response.json())
          .then(window.sessionStorage.removeItem('token'))
          .then(changeRoute('signin'));
    }
    render(){
        return(
          <div>
          <h1>Placeholder</h1>
          <button
            onClick={this.signOut}
            className="btn btn-lg btn-primary btn-block"
          >Sign Out</button>
          </div>
        )
    }
}

export default Placeholder;
