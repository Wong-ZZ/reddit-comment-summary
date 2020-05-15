import React from 'react';
import NavigationBar from './NavigationBar';
import Main from './searchDisplay/Main';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Main />
    </div>
  );
};

export default App;
