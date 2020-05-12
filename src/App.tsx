import React from 'react';
import Main from './Main';
import NavigationBar from './NavigationBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Main />
    </div>
  );
};

export default App;
