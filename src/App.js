import React, { useState, useEffect }  from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
     api.get('/repositories').then(({data}) => {
      setRepositories(data);  
    });
    
  },[]);

  const handleAddRepository = async () => {
    
    const  {data} = await api.post('/repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/ffdesousa',
      techs: ['ReactJs', 'NodeJs']
    });

    setRepositories([...repositories, data]);

  }

  const handleRemoveRepository = async (id) => {
    const {status} = await api.delete(`/repositories/${id}`);
  
    if(status === 204) {
      let repositoriesFilter = repositories.filter(item => item.id !== id );
      console.log(repositories);
      console.log(repositoriesFilter);


      setRepositories([...repositoriesFilter])
    }
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(({id, title}) =>
            <li key={ id }>
              { title }
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
