




function getCharacterDetails(character)
{
    const publicKey = 'bc5cf50cbc5636e486646166beb3cb1c';
    const hashKey = '845542f6fc6cd5e3ef361b072605f084';
    const ts = new Date().getTime();
    console.log(ts);

    
    const api = `https://gateway.marvel.com/v1/public/characters?name=${character}&apikey=38e1ffdaeaa9b9bef76cae16bc306f07&hash=50b69e3db7031ec68231ea6c05198f40&ts=1684993946733`;
    fetch(api)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            displaySuperHerosOfAvengersTeam(data);

        }
        )
        .catch(err => console.log(err))
}


// function getRandomCharacters(){
//     let api_key_for_rand_characters = `https://gateway.marvel.com/v1/public/characters?apikey=38e1ffdaeaa9b9bef76cae16bc306f07&hash=50b69e3db7031ec68231ea6c05198f40&ts=1684993946733`;
//     fetch(api_key_for_rand_characters)
//         .then(res=>res.json())
//         .then(data=>{
//             console.log(data.data.results);
//             // data.data.results.forEach(character => {
//             //     displaySuperHerosOfAvengersTeam(character);
//             // });
//         })
//         .catch(err=>console.log(err))
// }

// function displaySuperHerosOfAvengersTeam(res){
        
//         console.log("character details : " , res?.data?.results[0]?.name);
//         const characterCard = document.createElement('div');
//         characterCard.setAttribute('id',"character_card");
//         const characterName = document.createElement('h1');
//         characterName.textContent = res?.data?.results[0]?.name;
//         const characterDescription = document.createElement('p');
//         characterDescription.textContent = res?.data?.results[0]?.description;

//         characterCard.appendChild(characterName);
//         characterCard.appendChild(characterDescription);

//         const imgSrc = `${res?.data?.results[0].thumbnail?.path}.${res?.data?.results[0].thumbnail?.extension}`;
//         console.log(imgSrc);
//         const profileImage = document.createElement("img");
//         profileImage.src = imgSrc;
//         characterCard.appendChild(profileImage);
//         document.getElementById("avengers_members_container").appendChild(characterCard);

    
// }
function displaySuperHerosOfAvengersTeam(res) {
    console.log("character details: ", res?.data?.results[0]?.name);
  
    // Create the card container
    const characterCard = document.createElement('div');
    characterCard.classList.add('card', 'mb-3');
    characterCard.style.maxWidth = '30rem';
  
    // Create card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    // Add character name
    const characterName = document.createElement('h2');
    characterName.classList.add('card-title');
    characterName.textContent = res?.data?.results[0]?.name;
    cardBody.appendChild(characterName);
  
    // Add character description
    const characterDescription = document.createElement('p');
    characterDescription.classList.add('card-text');
    if(res?.data?.results[0]?.description){
    characterDescription.textContent = res?.data?.results[0]?.description;
    }else{
    characterDescription.textContent = "The man who would become known as Hawkeye was born Clint Barton. Orphaned at an early age, he joined the circus and apprenticed himself to the Swordsman, a performer who specialized in tricks with blades. After he discovered the Swordsman stealing from the circus, the two fought, and Barton was left for dead. Barton recovered, and he continued his martial training with the circus’s resident archer, Trickshot. Barton excelled with the bow, and he decided to use his skills to embark on a career as a costumed crime fighter named Hawkeye. After some initial misadventures, Hawkeye proved his worth to the Avengers, and he was a regular member of that group’s rotating cast throughout the 1960s. At the end of that decade, he used a growth serum developed by fellow Avenger Hank Pym and became the giant-sized Goliath, a role he kept for the next several years.";

    }
    cardBody.appendChild(characterDescription);
  
    // Add character image
    const imgSrc = `${res?.data?.results[0].thumbnail?.path}.${res?.data?.results[0].thumbnail?.extension}`;
    const profileImage = document.createElement('img');
    profileImage.classList.add('card-img-top');
    profileImage.src = imgSrc;
    cardBody.appendChild(profileImage);
  
    // Append card body to card container
    characterCard.appendChild(cardBody);
  
    // Append card container to the avengers_members_container element
    document.getElementById('avengers_members_container').appendChild(characterCard);

    //instead of doing like this i can create a div container and set its innerHTML with the html code 
  }
  

getCharacterDetails('hulk');
getCharacterDetails('thor');
getCharacterDetails('iron man');
getCharacterDetails('captain america');
getCharacterDetails('Falcon');
getCharacterDetails('Hawkeye');
