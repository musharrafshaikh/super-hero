// "https://www.superheroapi.com/api.php/727054372039115/55

const superHero_Token = '727054372039115';
const Base_URL = `https://www.superheroapi.com/api.php/${superHero_Token}`;
const HeroImage = document.getElementById('superHero-image')
const getRandomHeroBtn = document.getElementById('random-heroBtn')
const searchButton = document.getElementById('search-hero')
const searchInput = document.getElementById('search-input')
const heroName = document.getElementById('superHero-name')
const powerstats = document.getElementById('powerStats')
const superHeroBio = document.getElementById('biography')
const searchSuggestion = document.getElementById('search-suggestion')
const list = document.getElementById('resultList');

let HeroId;

getRandomHeroBtn.onclick = ()=>{
    getSuperHero(getRandomHero());
  }
  
  const getSuperHero = (id, name) =>{
     fetch(`${Base_URL}/${id}`)
     .then(res => res.json())
     .then(json => {  
      
       const superHero = json
        // console.log(superHero)
     superHeroInfo(superHero)
     
  });
    
  }
  // emoji //
const statToEmoji = {
  intelligence :'🧠',
  strength :'💪',
  speed :'⚡',
  durability :'🏋️‍♂️',
  power :'📊 ',
  combat :'⚔️',

}

  // powerstats//
  const superHeroInfo = (character) =>{
    const img = `<img src = "${character.image.url}">`
    const name = `${character.name}`
    // console.log(name)    
    const HeroIds = `${character.id}` 
    console.log(HeroIds)
    HeroId = HeroIds;
    HeroImage.innerHTML = `${img} <p id='superHero-name'>${name} </p>
     <button class ="AddToFvrt" onclick ='favourite()'>Add To Fav</button> `
    // favHero=favlist;
   const stats = Object.keys(character.powerstats).map(stat =>{
    return `<p class ='powerStat'>${statToEmoji[stat]}${stat.toUpperCase()} : ${character.powerstats[stat]}</p>`
   }).join('')

   powerstats.innerHTML = `Power Stats:${stats} `

   const bio = Object.keys(character.biography).map(info =>{
    return ` <p class ='powerStat'>${info.toUpperCase()} :${character.biography[info]}</p>`
   }).join('')
   superHeroBio.innerHTML = `Biography:${bio}`
   
  
  }
  const getRandomHero = () => {
    const numberOfHeros = 731;
    return Math.floor(Math.random()*numberOfHeros)+1;
  }

// search

const getSearchSuperHero = (name)=>{
    
    fetch(`${Base_URL}/search/${name}`)
    .then(res => res.json())
    .then(json => {   
        const hero = json.results[0]  
        superHeroInfo(hero)   
       
   });
}

searchButton.onclick = ()=>{
    getSearchSuperHero(searchInput.value);
    searchInput.value = "";
    
  }
  
  // search suggestion //


// const showSearch = (name) => {

//   fetch(`${Base_URL}/search/${name}`)
//     .then(res => res.json())
//     .then(json => {
//       const data = json.results;
//       // console.log(data)
//       const results = data.map(element => element.name)
//       // console.log(results)
//       renderResult(results)
//     });
// }

// function renderResult(results) {
//   const list = document.getElementById('resultList') ;
//   list.innerHTML = "";
//   results.forEach(result => {
//     const element = document.createElement('li');
//     element.innerText = result;
//     list.appendChild(element);
//   })
// }

// let searchTimeOutToken = 0;
// window.onload = () => {
//   const searchString = document.getElementById('search-input')
//   searchString.onkeyup = (event) => {
//     clearTimeout(searchTimeOutToken)
//     if (searchString.value.trim().length === 0) {
//       return;
//     }
//     searchTimeOutToken = setTimeout(() => {
//       showSearch(searchString.value);
//     }, 250);
//   }
// }


    // ADD TO FAVOURITES

   function favourite(){
   // if(AddToFvrt.classlist.contains('change-color')){
      //AddToFvrt.classlist.remove('change-color')
      remove_LS(HeroId)
   // }else{
     // AddToFvrt.classlist.add('change-color')
      add_to_LS(HeroId)
    //}
    // console.log('hello')
   }

  function get_LS(){
  const HeroIds = JSON.parse(localStorage.getItem('HeroId'))
  return HeroIds === null ? [] : HeroIds
  }

  function add_to_LS(id) {
    const HeroIds  = get_LS();
    localStorage.setItem('Hero-id', JSON.stringify([...HeroIds, id]))
  }
  
  function remove_LS (id) {
    const HeroIds = get_LS()
    localStorage.setItem('Hero-id', JSON.stringify(HeroIds.filter(e => e !== id)))
  }

