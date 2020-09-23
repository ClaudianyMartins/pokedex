import React, { Component } from "react";
import pokeApi from "../../services/apiPoke";

export default class Pokemon extends Component {
  state = {
    pokemons: []
  };

  componentDidMount() {
    this.carregarListaPokemons();
  }

  getId(urlOrigem) {
    let idSplit = urlOrigem.split("pokemon/");
    if (idSplit.length === 2) {
      let isSplit2 = idSplit[1].split("/");
      return isSplit2[0];
    }
    return 0;
  }

  async carregarListaPokemons() {
    let response = await pokeApi.get("/pokemon");
    let arrayPokemon = [];

    let listaPokemons = response.data["results"];

    for (let poke of listaPokemons) {
      let { name, url } = poke;
      let id = this.getId(url);

      arrayPokemon.push({
        name: name,
        url: url,
        id: id
      });
    }

    this.setState({ pokemons: arrayPokemon });
  }

  render() {
    return (
      <div>
        {this.state.pokemons ? (
          <div className="row">
            {this.state.pokemons.map((pokemon, index) => (
              <div key={index}>
                {pokemon.name}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
              </div>
            ))}
          </div>
        ) : (
          console.log("Error ao carregar pokemons na página")
        )}
      </div>
    );
  }
}
