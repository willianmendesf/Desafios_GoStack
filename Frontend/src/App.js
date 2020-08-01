import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [repositories])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repository ${Date.now()}`,
      techs: [ 'Angular1','VueJS1','Java1' ]
    })

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
  }

  async function handleAddLikes (id) {
    api.post(`/repositories/${id}/like`)
  }
  

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => <li key={repository.id}><p>Title: { repository.title } <span>Likes: { repository.likes } <button onClick={()=>handleAddLikes(repository.id)}>Curtir</button> </span> </p> <button onClick={()=>handleRemoveRepository(repository.id)}>Apagar</button></li>) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
