const players = [
  {
    name: 'Ege',
    position: 'ŞutG.',
    image: 'img/placeholder.png',
    speed: 85,
    shooting: 70,
    passing: 85,
    dribbling: 83,
    defense: 87,
    physical: 90
  },
  {
    name: 'Kerem',
    position: 'OyunK.',
    image: 'img/placeholder.png',
    speed: 83,
    shooting: 84,
    passing: 88,
    dribbling: 82,
    defense: 83,
    physical: 80
  },
  {
    name: 'Kaan',
    position: 'UzunF.',
    image: 'img/placeholder.png',
    speed: 80,
    shooting: 87,
    passing: 84,
    dribbling: 82,
    defense: 87,
    physical: 88
  },
  {
    name: 'Emir',
    position: 'KısaF.',
    image: 'img/placeholder.png',
    speed: 90,
    shooting: 88,
    passing: 85,
    dribbling: 90,
    defense: 80,
    physical: 76
  },
  {
    name: 'Yiğit',
    position: 'UzunF.',
    image: 'img/placeholder.png',
    speed: 86,
    shooting: 85,
    passing: 87,
    dribbling: 86,
    defense: 82,
    physical: 83
  },
  {
    name: 'Cihat',
    position: 'Pivot',
    image: 'img/placeholder.png',
    speed: 74,
    shooting: 85,
    passing: 84,
    dribbling: 84,
    defense: 86,
    physical: 87
  },
  {
    name: 'Yağız',
    position: 'ŞutG.',
    image: 'img/placeholder.png',
    speed: 82,
    shooting: 84,
    passing: 86,
    dribbling: 84,
    defense: 81,
    physical: 85
  },
  {
    name: 'Alperen',
    position: 'OyunK.',
    image: 'img/placeholder.png',
    speed: 86,
    shooting: 85,
    passing: 83,
    dribbling: 80,
    defense: 76,
    physical: 77
  },
  {
    name: 'Taner',
    position: 'KısaF.',
    image: 'img/placeholder.png',
    speed: 87,
    shooting: 72,
    passing: 73,
    dribbling: 85,
    defense: 86,
    physical: 70
  },
  {
    name: 'Mehmet Can',
    position: 'ŞutG.',
    image: 'img/placeholder.png',
    speed: 82,
    shooting: 83,
    passing: 80,
    dribbling: 77,
    defense: 86,
    physical: 83
  }
  ]

const playerSelect = document.getElementById('playerSelect');
const createCardButton = document.getElementById('createCardButton');
const cardContainer = document.getElementById('cardContainer');

players.forEach(player => {
    const option = document.createElement('option');
    option.value = player.name;
    option.textContent = player.name;
    playerSelect.appendChild(option);
});

createCardButton.addEventListener('click', () => {
    const selectedPlayerName = playerSelect.value;
    const selectedPlayer = players.find(player => player.name === selectedPlayerName);

    if (selectedPlayer) {
        let card = document.querySelector('.player-card');

        if (!card) {
            card = document.createElement('div');
            card.classList.add('player-card');
            cardContainer.appendChild(card);
        }

        card.innerHTML = ''; 

        const image = document.createElement('img');
        image.src = selectedPlayer.image; 
        image.alt = selectedPlayer.name;
        image.classList.add('player-image');

        const playerName = document.createElement('h1');
        playerName.textContent = selectedPlayer.name;
        playerName.classList.add('name');

        const playerInfo = document.createElement('div');
        playerInfo.innerHTML = `
            <div class='position'> ${selectedPlayer.position}</div>
            <div class='country'><img src='img/turkey.png'></div>
            <div class='pace'>${selectedPlayer.speed}</div>
            <div class='shoot'>${selectedPlayer.shooting}</div>
            <div class='pas'>${selectedPlayer.passing}</div>
            <div class='dripling'>${selectedPlayer.dribbling}</div>
            <div class='defance'>${selectedPlayer.defense}</div>
            <div class='physics'>${selectedPlayer.physical}</div>
        `;

        const average = (
            selectedPlayer.speed +
            selectedPlayer.shooting +
            selectedPlayer.passing +
            selectedPlayer.dribbling +
            selectedPlayer.defense +
            selectedPlayer.physical
        ) / 6;

        const averageInfo = document.createElement('div');
        averageInfo.classList.add('average');
        averageInfo.innerHTML = `${average.toFixed(0)}`;

        card.appendChild(image);
        card.appendChild(playerName);
        card.appendChild(playerInfo);
        card.appendChild(averageInfo); 
    } else {
        alert('Lütfen bir oyuncu seçin.');
    }
});
