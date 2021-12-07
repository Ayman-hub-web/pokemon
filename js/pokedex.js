let currentPokemon;
let currentSingle;
let poki;
let loadPokemons = [];
let sprites_images = [];
let types = [];

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/`;
    let response = await fetch(url);
    currentPokemon = await response.json()

    for (let i = 0; i < currentPokemon['results'].length; i++) {
        let infos = await getPokemonUrl(currentPokemon['results'][i]['url']);
        loadPokemons.push(infos);
    }
    getInfo();

    console.log(loadPokemons);
    //viewSingle('charmander');
    // for (let i = 0; i < currentPokemon.results.length; i++) {
    //     //viewSingle(currentPokemon.results[i].name);
    //     loadPokemons.push(viewSingle(currentPokemon.results[i].url));
    // }

}
async function getPokemonUrl(url) {
    let response = await fetch(url);
    let pokemon = await response.json();
    return pokemon;
}

function getInfo() {

    let content = document.getElementById('poke');
    for (let i = 0; i < loadPokemons.length; i++) {
        content.innerHTML += `<div class="card pokeEle bg-card" style="width: 15rem;background-color:rgb(186, 219, 208);text-align:center;" id="card-id${i}">
        <img src="${loadPokemons[i].sprites.front_default}" class="card-img-top" alt="..." onclick="alternativSingle(${i})">
        <div class="card-body" id="card-body">
          <h5 class="card-title">${loadPokemons[i].name}</h5><h5 class="card-title" id="card-title${i}" onclick="getColor()">${loadPokemons[i].types[0].type.name}</h5></div></div>`;
        getPokemonColor(i);
    }
}

function searchPokemon() {
    sprites_images = [];
    let searchText = document.getElementById('search').value;
    for (let i = 0; i < currentPokemon.results.length; i++) {
        if (currentPokemon.results[i].name == searchText) {
            savePokeImages(i);
            document.getElementById('poke').classList.add('d-none');
            document.getElementById('onePoke').classList.remove('d-none');
            document.getElementById('onePoke').innerHTML = '';
            document.getElementById('moves').innerHTML = '';
            document.getElementById('onePoke').innerHTML = '<div class="menu-img" id="menu-img"><img src="img/menu.png" onclick="toggle()"></div>';
            document.getElementById('onePoke').innerHTML += `<div class="links_div"><ul class"links" id="links">
            <li><a href="#" onclick="showTypes(${i})">Types</a><li>
            <li><a href="#" onclick="showStats(${i})">Stats</a><li>
            <li onclick="showMoves(${i})"><a href="#">Movies</a><li>
            <li><a href="#" onclick="gameIndices(${i})">Indices</a><li>
            <li><a href="#">Sprites</a><li>
          </ul></div>`;
            document.getElementById('onePoke').innerHTML += '';
            showElementImages();
            document.getElementById('onePoke').innerHTML += `<div class="card pokeEle" style="width: 16rem;background-color:rgb(186, 219, 208);text-align:center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${i+1}.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${currentPokemon.results[i].name}</h5>
              </div>
              </div>`;
        }
    }

    document.getElementById('search').value = '';
}


function viewPokemon(key) {
    poki = viewSingle(currentPokemon.results[key].name);
    document.getElementById('poke').classList.add('d-none');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('onePoke').classList.remove('d-none');
    document.getElementById('onePoke').innerHTML += `<div class="card pokeEle" style="width: 25rem;background-color:rgb(186, 219, 208);text-align:center;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${key+1}.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${currentPokemon.results[key].name}</h5>
            </div>
          </div>`;
}
async function viewSingle(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    poki = await response.json();
    //console.log(poki);
    //return poki;
    //console.log(poki);

}

function alternativSingle(i) {
    sprites_images = [];
    savePokeImages(i);
    document.getElementById('poke').classList.add('d-none');
    document.getElementById('onePoke').classList.remove('d-none');
    document.getElementById('onePoke').innerHTML = '<div class="menu-img" id="menu-img"><img src="img/menu.png" onclick="toggle()"></div>';
    document.getElementById('onePoke').innerHTML += `<div class="links_div"><ul class"links" id="links">
    <li><a href="#" onclick="showTypes(${i})">Types</a><li>
    <li><a href="#" onclick="showStats(${i})">Stats</a><li>
    <li onclick="showMoves(${i})"><a href="#">Movies</a><li>
    <li><a href="#" onclick="gameIndices(${i})">Indices</a><li>
  </ul></div>`;
    showElementImages();
    document.getElementById('onePoke').innerHTML += `<div class="card pokeEle" style="width: 18rem;background-color:rgb(186, 219, 208);text-align:center;">
                <img src="${loadPokemons[i].sprites.back_default}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${loadPokemons[i].name}</h5>
                </div>
              </div>`;
}

function showMoves(i) {
    //document.getElementById('poke').classList.add('d-none');
    document.getElementById('onePoke').classList.add('d-none');
    document.getElementById('moves').classList.remove('d-none');
    document.getElementById('moves').innerHTML = `<div white_div>
      <ul id="moves">`;
    document.getElementById('moves').innerHTML = `<div class="singleMove space-between"><li><b>Moves</b></li><b>URL</b></li></div>`;
    for (let x = 0; x < loadPokemons.length; x++) {
        if (x % 2 == 0) {
            document.getElementById('moves').innerHTML += `<div class="singleMove bg1 moreSingleMove"><li>${loadPokemons[i].moves[x].move.name}</li><li>${loadPokemons[0].moves[x].move.url}</li></div>`;
        } else {
            document.getElementById('moves').innerHTML += `<div class="singleMove bg2 moreSingleMove"><li>${loadPokemons[i].moves[x].move.name}</li><li>${loadPokemons[0].moves[x].move.url}</li></div>`;
        }

    }
    document.getElementById('moves').innerHTML += `</ul>
    </div>`;
}

function showTypes(i) {
    //document.getElementById('poke').classList.add('d-none');
    document.getElementById('onePoke').classList.add('d-none');
    document.getElementById('moves').innerHTML = '';
    document.getElementById('moves').classList.remove('d-none');
    document.getElementById('moves').innerHTML = `<div white_div>
    <ul id="moves"><li><b>Weight</b></li>`;
    document.getElementById('moves').innerHTML += `<div class="singleMove"><li><div class="progress">
    <div class="progress-bar" role="progressbar" style="width: ${loadPokemons[i].weight}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${loadPokemons[i].weight}%</div>
  </div></li></div>`;

    for (let x = 0; x < loadPokemons[i].types.length; x++) {
        document.getElementById('moves').innerHTML += `<div class="singleMove bg1"><li class="focus">Slot: </li><li class="focus">${loadPokemons[i].types[x].slot}</li></div>`;
        // if (x % 2 == 0) {
        //     document.getElementById('moves').innerHTML += `<div class="singleMove"><li><b>Type</b></li><b>URL</b></li></div>`;
        //     document.getElementById('moves').innerHTML += `<div class="singleMove bg2"><li>${loadPokemons[i].types[x].type.name}</li><li>${loadPokemons[i].types[x].type.url}</li></div>`;
        // } else {
        document.getElementById('moves').innerHTML += `<div class="singleMove space-between"><li><b>Type</b></li><b>URL</b></li></div>`;
        document.getElementById('moves').innerHTML += `<div class="singleMove bg1 moreSingleMove"><li>${loadPokemons[i].types[x].type.name}</li><li>${loadPokemons[i].types[x].type.url}</li></div>`;
        // }

    }
    document.getElementById('moves').innerHTML += `</ul>

  </div>`;
}

function showStats(i) {
    document.getElementById('onePoke').classList.add('d-none');
    document.getElementById('moves').classList.remove('d-none');

    document.getElementById('moves').innerHTML = `<div class="white_div">
  <ul id="moves">`;
    document.getElementById('moves').innerHTML += `<div class="singleMove bg1"><li class="focus"><b>Base Stat: </b>${loadPokemons[i].stats[i].base_stat}</li><li class="focus"><b>Effort: </b>${loadPokemons[i].stats[i].effort}</li></div>`;
    document.getElementById('moves').innerHTML += `<div class="singleMove space-between"><li><b>Name</b></li><b>URL</b></li></div>`;

    for (let x = 0; x < loadPokemons[i].stats.length; x++) {
        if (x % 2 == 0) {
            document.getElementById('moves').innerHTML += `<div class="singleMove bg2 moreSingleMove"><li>${loadPokemons[i].stats[x].stat.name}</li><li>${loadPokemons[i].stats[x].stat.url}</li></div>`;
        } else {
            document.getElementById('moves').innerHTML += `<div class="singleMove bg1 moreSingleMove"><li>${loadPokemons[i].stats[x].stat.name}</li><li>${loadPokemons[i].stats[x].stat.url}</li></div>`;
        }

    }
    document.getElementById('moves').innerHTML += `</ul>

</div>`;
}

function gameIndices(i) {
    document.getElementById('onePoke').classList.add('d-none');
    document.getElementById('moves').classList.remove('d-none');
    document.getElementById('moves').innerHTML = '';
    document.getElementById('moves').innerHTML += `<div class="singleMove"><li class="focus"><b>Game Index: </b>${loadPokemons[i].game_indices[i].game_index}</li></div>`;
    document.getElementById('moves').innerHTML += `<div class="singleMove space-between"><li><b>Name</b></li><b>URL</b></li></div>`;

    for (let x = 0; x < loadPokemons[i].game_indices.length; x++) {
        if (x % 2 == 0) {
            document.getElementById('moves').innerHTML += `<div class="singleMove bg2 moreSingleMove"><li>${loadPokemons[i].game_indices[x].version.name}</li><li>${loadPokemons[i].game_indices[x].version.url}</li></div>`;
        } else {
            document.getElementById('moves').innerHTML += `<div class="singleMove bg1 moreSingleMove"><li>${loadPokemons[i].game_indices[x].version.name}</li><li>${loadPokemons[i].game_indices[x].version.url}</li></div>`;
        }

    }
    document.getElementById('moves').innerHTML += `</ul>

</div>`;
}

function showElementImages() {
    document.getElementById('onePoke').innerHTML += `<div class="stories" id="story">`;
    for (let i = 0; i < sprites_images.length; i++) {
        if (sprites_images[i] != null) {
            document.getElementById('story').innerHTML += `<div class="story_element">
            <div class="stories_img" id="story_img">
                <img src="${sprites_images[i]}">
            </div>
        </div>`;
        }
    }
    document.getElementById('moves').innerHTML += `</div>`;
}

function savePokeImages(i) {
    sprites_images = [];
    sprites_images.push(loadPokemons[i].sprites.back_default);
    sprites_images.push(loadPokemons[i].sprites.back_female);
    sprites_images.push(loadPokemons[i].sprites.back_shiny);
    sprites_images.push(loadPokemons[i].sprites.back_shiny_female);
    sprites_images.push(loadPokemons[i].sprites.front_default);
    sprites_images.push(loadPokemons[i].sprites.front_female);
    sprites_images.push(loadPokemons[i].sprites.front_shiny);
    sprites_images.push(loadPokemons[i].sprites.front_shiny_female);
}

function toggle() {
    var x = document.getElementById('links');
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

function getPokemonColor(i) {
    let x = document.getElementById('card-title' + i);
    let y = document.getElementById('card-id' + i);
    if (x.innerHTML == 'fire') {
        y.style.backgroundColor = 'red';
        y.style.color = 'white';
    }
    if (x.innerHTML == 'water') {
        y.style.backgroundColor = 'blue';
        y.style.color = 'white';
    }
    if (x.innerHTML == 'grass') {
        y.style.backgroundColor = 'green';
        y.style.color = 'white';
    }
    if (x.innerHTML == 'normal') {
        y.style.backgroundColor = 'white';
    }
    if (x.innerHTML == 'bug') {
        y.style.backgroundColor = 'yellow';
        y.style.color = 'white';
    }
}