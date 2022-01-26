// inicio: função que vai buscar os pokemons
/*o fech é uma versao moderna p/fazer requisições ajax no browser
o ajax permite requisições assincronas para que dados sejam emitidos sem que a pagina precise ser recarregada
o metodo ao ser invocado tras uma requisisao http e tras dados da url que vc especifica por argumentos

o metodo fech retorna uma promise =objeto que representa o sucesso ou falha de uma requisição assincrona
para fazer alguma coisa com o resultado dessa promisse vamos encadear o metodo then e response
o que ela retorna é a resposta da promise em json p obter o body dessa resposta
mas o retorno do then tbm resulta em uma promise
logo invoca outro then com o parametro pokemon
ja que a api nao retorna todos os dados de uma vez na url faz a interpolacao de uama id para ter os dados dinamicos
transformou a const em função id que retorna a url renomeando para getpokemon...

criado um loop para que a cada iteração ele execute o fech obtenha a resposta e retorne a promise com o json dessa resposta
dentro do loop coloca a invocação do fech com o encadeamento do then que retorna o json do pokemon e vamos substituir o argumento do fech pela invocação da getpokemon 
const fetchPokemon = () =>{
    const getpokemonUrl = id=> `https://pokeapi.co/api/v2/pokemon/${id}`

    for (let i=1; i<=150;i++) 

    fetch(url) //pedindo ao browser dados de outro lugar
        .then(response=> response.json)
        .then(pokemon => {

        } )
}

fetchPokemon() //está chamando a função

logo em seguinte
const fetchPokemon = () =>{
    const getpokemonUrl = id=> `https://pokeapi.co/api/v2/pokemon/${id}`

    for (let i=1; i<=150;i++) 

    fetch(getpokemonUrl(i)).then(response => response.json()) //pedindo ao browser dados de outro lugar
        .then(response=> response.json)
        .then(pokemon => {

        } )
}

fetchPokemon() //está chamando a função
logo em seguinte remove a parte do codigo


QUAL FOI A IDEIA DISSO?
A GENTE PODE FAZER COM QUE A CADA EXECUÇÃO DESSE LOOP A PROMISSE DA QUAL 
ESSA EXPRESSÃO : fetch(getpokemonUrl(i)).then(response => response.json()) 
ESTA RESULTANDO SEJA ADICIONADA EM UM ARRAY DE PROMISES

const fetchPokemon = () =>{
    const getpokemonUrl = id=> `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i=1; i<=150;i++) {

    fetch(getpokemonUrl(i)).then(response => response.json()) //pedindo ao browser dados de outro lugar

        }
}

fetchPokemon() //está chamando a função


 pokemonPromises .push() usada para que a cada requisição um item seja adicionado ao final do array

 adicionado     fetch(getpokemonUrl(i)).then(response => response.json()) //pedindo ao browser dados de outro lugar

 for (let i=1; i<=150;i++) {
        pokemonPromises .push(fetch(getpokemonUrl(i)).then(response => response.json()) //pedindo ao browser dados de outro lugar
        )
        }
}

e o que vai fazer com esse array de promisses?

pode invocar um metodo estatico do construtor promisse chamado all (metodo estatico nao obriga usar o new como prefixo da invocação dele o que permite encadear esse metodo diretamente em um objeto construtor no caso o promise)


 Promise.all() esse metodo vai receber um array de promisses como argumento
 e quando todas as promisses desse array estiverem resolvidas a expressao  Promise.all(pokemonPromises) 
 vai retornar uma promisse, se uma promisse for retornada a gente pode encadear um then

entao o promisse all vai permitir que todos os requestes assincronos (fetch(getpokemonUrl(i)).then(response => response.json())) sejam feitos em paralelo

e quando todos os requestes tiverem sido feitos no .then vai fazer alguma ação com a promisse que o metodo retornar

e qual o resultado resolvido? um objeto com informações do pokemom em questao

com essas informações podemos gerar um templete html que contenha essas informações e pode inserir esse template na pagina

1passo gerar o template html

no index html tem uma ul vazia vai fazer com que cada pokemom seja uma li

const lisPokemons = pokemons.reduce() a ideia aqui é quer reduzir esse array em uma string que é o template html

acumulator parametro que vai gerar a string a acada iteração e pokemon que é o objeto iterado

const fetchPokemon = () =>{
    const getpokemonUrl = id=> `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i=1; i<=150;i++) {
        pokemonPromises .push(fetch(getpokemonUrl(i)).then(response => response.json())) //pedindo ao browser dados de outro lugar
    }
            Promise.all(pokemonPromises)
            .then(pokemons =>{
                console.log(pokemons)
                const lisPokemons = pokemons.reduce((acumulator, pokemon) =>{

                }, '')
            })        
}

fetchPokemon() //está chamando a função

${pokemon.types.map(typeInfo => typeInfo.type.name)} resulta em array com os tipos dos pookemons


comentario do codigo /*   

    for (let i=1; i<=150;i++) {
        pokemonPromises .push(fetch(getpokemonUrl(i)).then(response => response.json())) //pedindo ao browser dados de outro lugar
    }
*/  


const getpokemonUrl = id=> `https://pokeapi.co/api/v2/pokemon/${id}`


 const generatePokemonPromises = () =>Array(150).fill().map((_, index) =>
  fetch(getpokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((acumulator, {name, id, types}) =>{
      const elementTypes = types.map(typeInfo => typeInfo.type.name)
      
    acumulator += ` 
          <li class ="card  ${types[0]}" >
          <img class="card-image " alt ="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/img>
           <h2 class="card-title">${id}. ${name} </h2>
           <p class="card-subtitle">${elementTypes.join(' | ')}</p>
           </li>
       `
      return acumulator
  }, '') 


const insertPokemonsIntoPage = pokemons =>{
    const ul = document.querySelector('[data-js ="pokedex"]')
    ul.innerHTML =pokemons
}


const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)   

