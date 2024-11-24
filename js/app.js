const players = [
  {
    name: 'Ege',
    position: 'Şutör-Gard',
    image: 'img/placeholder.png',
    speed: 75,
    shooting: 70,
    passing: 85,
    dribbling: 77,
    defense: 90,
    physical: 90
  },
  {
    name: 'Kerem',
    position: 'Oyun Kurucu',
    image: 'img/placeholder.png',
    speed: 76,
    shooting: 84,
    passing: 88,
    dribbling: 80,
    defense: 83,
    physical: 80
  },
  {
    name: 'Kaan',
    position: 'Uzun-Forvet',
    image: 'img/placeholder.png',
    speed: 82,
    shooting: 87,
    passing: 84,
    dribbling: 82,
    defense: 88,
    physical: 88
  },
  {
    name: 'Emir',
    position: 'Kısa-Forvet',
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
    position: 'Uzun-Forvet',
    image: 'img/placeholder.png',
    speed: 86,
    shooting: 87,
    passing: 89,
    dribbling: 86,
    defense: 82,
    physical: 80
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
    position: 'Şutör-Gard',
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
    position: 'Oyun Kurucu',
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
    position: 'Kısa-Forvet',
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
    position: 'Şutör-Gard',
    image: 'img/placeholder.png',
    speed: 82,
    shooting: 83,
    passing: 75,
    dribbling: 77,
    defense: 86,
    physical: 83
  }
]

function calculateAverageRating (player) {
  return (
    (player.speed +
      player.shooting +
      player.passing +
      player.dribbling +
      player.defense +
      player.physical) /
    6
  )
}

players.forEach(player => {
  player.averageRating = calculateAverageRating(player)
})

function generatePlayerSelect () {
  const playersSelectDiv = document.getElementById('playersSelect')

  players.forEach((player, index) => {
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = `player_${index}`
    checkbox.value = index
    checkbox.addEventListener('change', updateSelectedPlayerCount);
    label.appendChild(checkbox)
    label.appendChild(
      document.createTextNode(`${player.name} - ${player.position}`)
    )

    playersSelectDiv.appendChild(label)
  })
}

generatePlayerSelect()

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function distributeTeams () {
  const selectedPlayers = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(checkbox => players[checkbox.value])

  if (selectedPlayers.length !== 6) {
    alert('Lütfen tam olarak 6 oyuncu seçin!')
    return
  }

  const team1 = []
  const team2 = []

  const tallForward = selectedPlayers.filter(
    player => player.position === 'Uzun-Forvet'
  )

  if (tallForward.length === 2) {
    team1.push(tallForward[0])
    team2.push(tallForward[1])
  } else if (tallForward.length > 2 || tallForward.length < 2) {
    alert('2 Uzun-Forvet seçiniz!')
    return
  }

  const nontallForward = selectedPlayers.filter(
    player => player.position !== 'Uzun-Forvet'
  )

  const shuffledPlayers = shuffleArray(nontallForward)
// burada takımların kaçar  kişiye bölüneceğini yazdırıyoruz
  shuffledPlayers.forEach(player => {
    if (team1.length < 3) {
      team1.push(player)
    } else {
      team2.push(player)
    }
  })

  displayTeams(team1, team2)
}

function displayTeams (team1, team2) {
  const team1List = document.getElementById('team1').querySelector('ul')
  const team2List = document.getElementById('team2').querySelector('ul')

  team1List.innerHTML = ''
  team2List.innerHTML = ''

  let team1TotalRating = 0
  let team2TotalRating = 0

  team1.forEach(player => {
    const li = document.createElement('li')
    li.textContent = `${player.name} - ${
      player.position
    } (Rating: ${player.averageRating.toFixed(2)})`
    team1List.appendChild(li)
    team1TotalRating += player.averageRating
  })

  team2.forEach(player => {
    const li = document.createElement('li')
    li.textContent = `${player.name} - ${
      player.position
    } (Rating: ${player.averageRating.toFixed(2)})`
    team2List.appendChild(li)
    team2TotalRating += player.averageRating
  })

  const team1AvgRating = team1TotalRating / team1.length || 0
  const team2AvgRating = team2TotalRating / team2.length || 0

  document.getElementById('team1AvgRating').textContent =
    team1AvgRating.toFixed(2)
  document.getElementById('team2AvgRating').textContent =
    team2AvgRating.toFixed(2)
}
function updateSelectedPlayerCount() {
  const selectedPlayerCountElement = document.getElementById('selectedPlayerCount');
  const selectedPlayersCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
  document.getElementById('selectedPlayerCount').textContent = "Seçilen oyuncu sayısı: "+  selectedPlayersCount + "/6";

  if (selectedPlayersCount < 6) {
    selectedPlayerCountElement.classList.add('kirmizi');

  } else {   
    selectedPlayerCountElement.classList.remove('kirmizi');
  }
 
}

function renderPlayerSelection(players) {
  const playersSelectDiv = document.getElementById('playersSelect');
  players.forEach((player, index) => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = index; 
    checkbox.addEventListener('change', updateSelectedPlayerCount);
    
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(player.name)); 
    
    playersSelectDiv.appendChild(label);
    playersSelectDiv.appendChild(document.createElement('br'));
  });
}