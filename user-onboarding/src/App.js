import React, { useState } from 'react';
import Form from './Components/Form';
import List from './Components/List';
import users from './users'

function App() {
  const [post, setPost] = useState(users)
  console.log("App -> post", post)

  return (
    <div className="App">
      <Form setPost={setPost} post={post} />
      <List post={post} />
    </div>
  );
}

export default App;
