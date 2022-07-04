import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css'
import api from './services/api.js'

function App() {




const [ input, setInput ] = useState('') //input é o valor do estado, setInput é para passar o novo valor do estado

const [poke, setPoke] = useState({});

async function Pesquisar(){ //função assincrona
  if (input === ""){
    alert("Preencha algum nome")
    return;
  }

  try{ //o que quer fazer, mas pode dar errado
      const response = await api.get(`${input}`)
      setPoke(response.data)
      setInput("")// deixa o input vazio
  }

  catch{
    alert("Ops, não foi possível encontrar o Pokémon.")
    setInput("")
  }
}

  return (
    <div className="container">
      <h1 className="title">Pokémon</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite um nome de pokémon"
        value={input}
        onChange={(evento) => setInput(evento.target.value.toLowerCase()) } // evento.target.value é o valor do input que está sendo mandado para o setInput
        />

        <div className="botao">
        <button className="buttonSearch" onClick={Pesquisar}>
          <FiSearch size={25} color="#FFF"/>
        </button>
        </div>
    </div>

        {Object.keys(poke).length > 0 && (
           <main className="main">
          <h2>{poke.name}</h2>
          
          <img src={poke.sprites.other.dream_world.front_default}/>
          <span><strong>Tipo: </strong>{poke.types.map(typeInfo => typeInfo.type.name)}</span>
          <span><strong>Habilidades: </strong>{poke.abilities.map(typeInfo => typeInfo.ability.name).join(' | ')}</span>

        </main>
        )
        
        }

       

    
<div className="footer">Desenvolvido por: Gabriela Ramires | Para mais aplicações: <a href="https://portfolio-gabi.herokuapp.com/">www.portfolio-gabi.herokuapp.com</a></div>
      
    </div>
    
  );
}

export default App;
