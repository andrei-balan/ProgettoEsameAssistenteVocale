let _speechSynth;
let _voices = [];

let voiceSelect = document.querySelector("select");
let recognizedText = document.getElementById("recognizedText");
let startListeningButton = document.getElementById("startListening");
let risDomanda = document.getElementById("risDomanda");
let divRisultato = document.getElementById("risultato");
let numeroRnd1, numeroRnd2;
let transcriptp = document.getElementById("transcript");
let long, lat;
let CityCoords = [];
const board = document.getElementById('board');
let currentPlayer = 'X';
const cells = [];
let countdown;
let calendarContainer = document.getElementById("calendar");
let boxCalendario = document.getElementById("boxCalendario");

// function loadVoicesWhenAvailable(onComplete = () => {}) {
//   _speechSynth = window.speechSynthesis;
//   const voices = _speechSynth.getVoices();

//   if (voices.length != 0) {
//     _voices = voices;
//     onComplete();
//   } else {
//     return setTimeout(function () {
//       loadVoicesWhenAvailable(onComplete);
//     }, 100);
//   }
// }

window.onload = async function () {
  let icSole = document.getElementById("icSole");
  let icLuna = document.getElementById("icLuna");
  let closeCal = document.getElementById("closeCal");
  let closeNot = document.getElementById("closeNot");
  let icMail = document.getElementById("icMail");
  let icCalendar = document.getElementById("icCalendario");
  //alert di sweetalert
  
  // loadVoicesWhenAvailable(() => {
  //   //alert("Voci caricate");
  //   startListeningButton.disabled = false; // Abilita il pulsante quando le voci sono caricate
  // });
  // alert("Benvenuto! Sono il tuo assistente vocale. Prova a chiedermi qualcosa!");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mia_posizione);
  } else {
    alert("La geo-localizzazione NON Ã¨ possibile");
  }
  icLuna.addEventListener("click", temaScuro);
  icSole.addEventListener("click", temaChiaro);
  icMail.addEventListener("click", apriNotifiche);
  icCalendar.addEventListener("click", apriCalendario);
  closeNot.addEventListener("click", apriNotifiche);
  closeCal.addEventListener("click", apriCalendario);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const calendar = await generateCalendar(currentMonth, currentYear);
 




 
  boxCalendario.appendChild(calendar);
  
 

  addPromemoria("Prova Prom");
  //addPromemoria("Promemoria 2");
  
  
  
  
  
};

startListeningButton.addEventListener("click", () => {
  recognition.start();
  //divRisultato.style.display = "none";
  document.getElementById("tris").style.display = "none";
  risDomanda.innerHTML = "";
  

  document.getElementById("testacroce").style.display = "none";
  document.getElementById("impiccato").style.display = "none";
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  recognizedText.textContent = "Sto ascoltando...";
};

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;

  recognizedText.textContent = transcript;
  //transcriptp.innerHTML = transcript;
  console.log(transcript.toLowerCase());
  addPromemoria("DOMANDA -> " + transcript.toLowerCase());
  handleVoiceCommand(transcript.toLowerCase());
};

recognition.onend = () => {
  recognizedText.textContent = "";
};

// Funzione per gestire i comandi vocali
async function handleVoiceCommand(command) {
  if (command.includes("ciao")) {
    await respond("Ciao! Come posso aiutarti?");
  } else if (command.includes("come stai")) {
    await respond("Sto bene, grazie!");
  }
   else if (command.includes("apri google")) {
    window.open("https://www.google.com", "_blank");
    await respond("Apro Google per te.");
  } else if (command.includes("oggi") && command.includes("che giorno")) {
    const date = new Date().toLocaleString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    await respond("Oggi e' il " + date);
  }
  else if (
    command.includes("imposta una sveglia") ||
    (command.includes("timer") && command.includes("imposta"))
  ) {
    let tempo = getOreMinutiSecondi(command);
    document.getElementById("container").style.display = "flex";
    await respond("Timer impostato per " + tempo + " secondi.");

    const startButton = document.getElementById("start-button");
    const countdownTimer = document.getElementById("countdown-timer");

    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    const totalSeconds = tempo;
    let seconds = totalSeconds;
    countdown = setInterval(() => {
      const days = Math.floor(seconds / (60 * 60 * 24));
      const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      const remainingSeconds = seconds % 60;

      daysSpan.textContent = days.toString().padStart(2, "0");
      hoursSpan.textContent = hours.toString().padStart(2, "0");
      minutesSpan.textContent = minutes.toString().padStart(2, "0");
      secondsSpan.textContent = remainingSeconds.toString().padStart(2, "0");

      if (seconds === 0) {
        clearInterval(countdown);

        countdownTimer.style.backgroundColor = "#f00";
      }

      seconds--;
    }, 1000);
  }
  else if (command.includes("evento")) {
    await aggiungiEvento();
  } else if (
    (command.includes("stop") || command.includes("ferma")) &&
    command.includes("timer")
  ) {
    clearInterval(countdown);
    document.getElementById("container").style.display = "none";
    await respond("Timer fermato.");
  }
   else if (command.includes("che ore sono")) {
    const date = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    await respond("Sono le " + date);
  } else if (
    (command.includes("estrai") && command.includes("numero")) ||
    command.includes("da")
  ) {
    numeroRnd1 = parseInt(command.split("da")[1]);
    console.log(command.split("a").pop());
    numeroRnd2 = parseInt(command.split("a").pop());
    console.log(numeroRnd1, numeroRnd2);
    let numeroEstratto =
      Math.floor(Math.random() * (numeroRnd2 - numeroRnd1 + 1)) + numeroRnd1;
    risDomanda.innerHTML = "Il numero estratto \u00E8 " + numeroEstratto;
    await respond("Il numero estratto \u00E8 " + numeroEstratto.toString());
  } else if (
    (command.includes("vai") ||
      command.includes("naviga") ||
      command.includes("portami")) &&
    (command.includes("a") || command.includes("fino a"))
  ) {
    let citta = await getCitta(command);

    window.open(
      "https://www.google.com/maps/dir/" +
        lat +
        "," +
        lon +
        "/" +
        CityCoords[0].toLocaleString() +
        "," +
        CityCoords[1],
      "_blank"
    );
  } else if (
    command.includes("imposta un") ||
    command.includes("imposta una sveglia") ||
    command.includes("timer")
  ) {
  } else if (
    command.includes("che tempo fa") ||
    command.includes("previsioni") ||
    command.includes("meteo")
  ) {
    if (command.includes("a") || command.includes("in")) {
      let citta = await getCitta(command);

      let meteo = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${CityCoords[0]}&longitude=${CityCoords[1]}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&&forecast_days=3`
      );
      let meteoJson = await meteo.json();
      console.log(meteoJson);
      await respond(
        "A" +
          citta +
          "la temperatura Ã¨ di " +
          meteoJson.current.temperature_2m +
          " gradi ed il vento soffia con una velocitÃ  di " +
          meteoJson.current.wind_speed_10m +
          " kilometri orari. "
      );
    } else {
      let meteo = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&&forecast_days=3`
      );
      let meteoJson = await meteo.json();
      console.log(meteoJson);
      await respond(
        "Attualmente la temperatura Ã¨ di " +
          meteoJson.current.temperature_2m +
          " gradi ed il vento soffia con una velocitÃ  di " +
          meteoJson.current.wind_speed_10m +
          " kilometri orari. "
      );
    }
  } else if (command.includes("imposta tema")) {
    if (command.includes("scuro")) {
      temaScuro();
    } else if (command.includes("chiaro")) {
      temaChiaro();
    }
    
  }
  else if(command.includes("giochiamo") || command.includes("giocare") || command.includes("gioco")){
    // Mostro un alert per permettere di scegliere il gioco
    Swal.fire({
        title: 'Scegli il gioco',
        text: 'Quale gioco vuoi giocare?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Tris',
        cancelButtonText: 'Impiccato'
    }).then((result) => {
        // Se l'utente sceglie il Tris
        if (result.value) {
            tris(); // Funzione per avviare il gioco del Tris
        } 
        // Se l'utente sceglie l'Impiccato
        else if (result.dismiss === Swal.DismissReason.cancel) {
            impiccato(); // Funzione per avviare il gioco dell'Impiccato
        }
    });
}
  else if ((command.includes("testa") && command.includes("croce")) || (command.includes("lancia") && command.includes("moneta"))){
    testaCroce();
  }
  else if (command.includes("cerca") || command.includes("cercami") || command.includes("trova")){
    let commands = ["cerca", "cercami", "trova"];
    let search = command;
    commands.forEach((element) => {
      search = search.replace(element, "");
    });
    search = search.trim();
    window.open("https://www.google.com/search?q=" + search, "_blank");

  }else if(command.includes("mostra") && command.includes("calendario")){
    document.getElementById("calendar").style.display = "flex";
  }
  else if (command.includes("promemoria") && (command.includes("imposta") || command.includes("aggiungi"))){
    let promDaaggiungere = command.split("promemoria")[1].trim();
    addPromemoria("PROMEMORIA -> "+ promDaaggiungere);
  }
   else {
    await respond("Non ho capito. Riprova.");
  }
}

// Funzione per rispondere vocalmente
async function respond(message) {
  let speech = new SpeechSynthesisUtterance();
  speech.voice = _voices[1]; // Imposta la voce desiderata
  speech.voiceURI = "native";
  speech.volume = 1; // 0 a 1
  speech.rate = 1.2; // 0.1 a 10
  speech.pitch = 2; // 0 a 2
  speech.lang = "it";
  speech.text = message;

  

  speech.onend = function () {
    divRisultato.style.display = "block";
  };

  window.speechSynthesis.speak(speech);
}
async function mia_posizione(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat, lon);
}
async function getCitta(inputString) {
  const commands = ["portami a", "vai fino a", "naviga a", "che tempo fa a"];

  for (const command of commands) {
    if (inputString.toLowerCase().startsWith(command)) {
      const city = inputString.split(command)[1].trim();
      await getCityCoords(city);
      return city;
    }
  }

  return null;
}
async function getCityCoords(city) {
  let req = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&city=${city}`
  );
  let json = await req.json();

  CityCoords[0] = json[0].lat.toString();
  CityCoords[1] = json[0].lon.toString();
  console.log(
    "latitudine e longitudine della citta " +
      city +
      " sono " +
      CityCoords[0] +
      " " +
      CityCoords[1]
  );
}
function temaScuro() {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  document.getElementById("gifBianca").style.display = "none";
  document.getElementById("gifNera").style.display = "";
  document.getElementById("icSole").style.color = "white";
  document.getElementById("icLuna").style.color = "white";
  document.getElementById("boxapertura").style.backgroundColor = "white";
  document.getElementById("icMail").style.color = "white";
  document.getElementById("closeNot").style.backgroundColor = "gray";
  document.getElementById("icCalendario").style.color = "white";
  document.getElementById("boxCalendario").style.color = "black";
  document.getElementById("container").style.color = "black";
 
}
function temaChiaro() {
  document.body.style.backgroundColor = "#fefcfe";
  document.body.style.color = "black";
  document.getElementById("gifNera").style.display = "none";
  document.getElementById("gifBianca").style.display = "block";
  document.getElementById("icSole").style.color = "black";
  document.getElementById("icLuna").style.color = "black";
  document.getElementById("boxapertura").style.backgroundColor = "#caf0f8";
  document.getElementById("icMail").style.color = "black";
  document.getElementById("closeNot").style.backgroundColor = "lightgray";
  document.getElementById("icCalendario").style.color = "black";
  document.getElementById("boxCalendario").style.color = "black";
  document.getElementById("container").style.color = "black";
}
function tris(){
  const tris = document.getElementById('tris');
  divRisultato.style.display = 'block';
  tris.style.display = 'flex';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => cellaCliccata(i));
    cells.push(cell);
    board.appendChild(cell);
}
}
function cellaCliccata(index) {
  if (!cells[index].textContent) {
      cells[index].textContent = currentPlayer;
      if (checkWin()) {
          //alert(`${currentPlayer} ha vinto!`);
          respond(`${currentPlayer} ha vinto!`);

          resetBoard();
      } else if (checkDraw()) {

          //alert("È un pareggio!");
          respond("È un pareggio!");
          resetBoard();
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
  }
}


function checkWin() {
  const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]              
  ];
  return winningCombos.some(combo => {
      return combo.every(index => cells[index].textContent === currentPlayer);
  });
}


function checkDraw() {
  return cells.every(cell => cell.textContent !== '');
}


function resetBoard() {
  cells.forEach(cell => {
      cell.textContent = '';
  });
  currentPlayer = 'X';
}
function testaCroce() {
  const coin = document.getElementById('coin');
  const testaCroce = document.getElementById('testacroce');
  divRisultato.style.display = 'block';
  testaCroce.style.display = 'flex';
  
  const images = ['testa.png', 'croce.png']; 
  const resultIndex = Math.random() < 0.5 ? 0 : 1;
  const result = resultIndex === 0 ? 'Testa' : 'Croce';
  const rotateDeg = Math.floor(Math.random() * 360) + 720;

  coin.style.pointerEvents = 'none'; 
  coin.innerHTML = `
        <img src="${images[resultIndex]}" style="transform: rotateY(0deg);">
        <img src="${images[resultIndex]}" style="transform: rotateY(${rotateDeg}deg);">
    `;
  
  setTimeout(() => {
      coin.querySelectorAll('img').forEach(img => {
          img.style.transform = 'rotateY(1800deg)';
      });
      setTimeout(() => {
          respond(`\u00E8 uscito ${result}`);
          risDomanda.textContent = `\u00E8 uscito ${result}`;
          coin.style.pointerEvents = 'auto'; 
      }, 1500);
  }, 1500);
}

function addPromemoria(testoProm){
  let notifica = document.getElementById('notifica');
  let div = document.createElement('div');
  div.classList.add('not');
  //let boxapertura = document.getElementById('boxapertura');
  let pProm = document.createElement('p');
  pProm.innerText = testoProm;
  div.appendChild(pProm);
  notifica.appendChild(div);
}
function getOreMinutiSecondi(inputString) {
  let ore = 0;
  let minuti = 0;
  let secondi = 0;

  const oreRegex = /(\d+)\s*ore?s?/;
  const minutiRegex = /(\d+)\s*minuti?s?/;
  const secondiRegex = /(\d+)\s*secondi?s?/;
  const unOraRegex = /un'?ora/;
  const unMinutoRegex = /un'?minuto/;
  const unSecondoRegex = /un'?secondo/;

  const oreMatch = inputString.match(oreRegex);

  const minutiMatch = inputString.match(minutiRegex);
  const secondiMatch = inputString.match(secondiRegex);
  const unOraMatch = inputString.match(unOraRegex);
  const unMinutoMatch = inputString.match(unMinutoRegex);
  const unSecondoMatch = inputString.match(unSecondoRegex);

  if (oreMatch || unOraMatch) {
    ore = oreMatch ? parseInt(oreMatch[1]) : 1;
  }
  if (minutiMatch || unMinutoMatch) {
    minuti = minutiMatch ? parseInt(minutiMatch[1]) : 1;
  }
  if (secondiMatch || unSecondoMatch) {
    secondi = secondiMatch ? parseInt(secondiMatch[1]) : 1;
  }

  let tempo = ore * 3600 + minuti * 60 + secondi;
  return tempo;
}
async function aggiungiEvento() {
  const { value: formValues } = await Swal.fire({
    title: 'Aggiungi Evento',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Data" type="date" required>' +
      '<input id="swal-input2" class="swal2-input" placeholder="Titolo" required>' +
      '<textarea id="swal-input3" class="swal2-input" placeholder="Descrizione" required></textarea>',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
        document.getElementById('swal-input3').value
      ];
    }
  });

  if (formValues) {
    const [date, title, description] = formValues;
    await addEvent(date, title, description);
    await updateCalendar(); // Aggiorna il calendario dopo aver aggiunto l'evento
    Swal.fire('Event added successfully!', '', 'success');
  }
}

async function addEvent(date, title, description) {
  const utcDate = new Date(date + "T00:00:00Z").toISOString().split("T")[0];

  events.push({ date: utcDate, title, description });
}

let events = [];

async function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}



async function generateCalendar(month, year) {
  const daysInMonth = await getDaysInMonth(month, year);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const calendarTable = document.createElement("table");
  calendarTable.classList.add("calendar");

  const headerRow = calendarTable.insertRow();
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

  // Riordina l'array dei giorni della settimana in base al primo giorno del mese
  const reorderedDaysOfWeek = [...daysOfWeek.slice(firstDayOfMonth), ...daysOfWeek.slice(0, firstDayOfMonth)];

  for (let day of reorderedDaysOfWeek) {
    const cell = headerRow.insertCell();
    cell.textContent = day;
  }

  let date = 1;
  let rowCount = 0;
  let row = calendarTable.insertRow(); 

  while (date <= daysInMonth) {
    for (let j = 0; j < 7; j++) {
      const cell = row.insertCell();
      if (date > daysInMonth) {
        break; 
      } else {
        cell.textContent = date;

        const cellDate = new Date(Date.UTC(year, month, date)).toISOString().split("T")[0];
        const cellEvents = events.filter((event) => event.date === cellDate);
        if (cellEvents.length > 0) {
          // Aggiungi i titoli degli eventi come testo visibile sotto il numero del giorno
          const eventInfo = cellEvents.map(event => `<b>${event.title}</b>: ${event.description}`).join('<br>');
          cell.innerHTML += `<br>${eventInfo}`;
          cell.classList.add('has-events'); // Aggiungi classe per indicare che la cella ha eventi
          cell.setAttribute('data-date', cellDate); // Aggiungi attributo data con la data della cella
        }

        date++;
      }
    }

    rowCount++;
    if (date <= daysInMonth) {
      row = calendarTable.insertRow(); // Passa alla riga successiva
    }
  }

  // Se la settimana non è completa, aggiungi celle vuote alla fine
  if (rowCount < 6) {
    const remainingCells = 7 - row.cells.length;
    for (let i = 0; i < remainingCells; i++) {
      row.insertCell();
    }
  }
  
  // Aggiungi gestore di eventi per mostrare i dettagli degli eventi al clic sulla cella del calendario
  calendarTable.addEventListener('click', function(event) {
    const target = event.target;
    const cellDate = target.dataset.date; // Recupera la data dalla cella
    if (cellDate && target.classList.contains('has-events')) {
      const cellEvents = events.filter(event => event.date === cellDate);
      const eventList = cellEvents.map(event => `<li><b>${event.title}</b>: ${event.description}</li>`).join('');
      Swal.fire({
        title: 'Dettagli Eventi',
        html: `<ul>${eventList}</ul>`
      });
    }
  });

  return calendarTable;
}
async function updateCalendar() {
  const calendarContainer = document.getElementById("boxCalendario");
  while (calendarContainer.firstChild) {
    calendarContainer.removeChild(calendarContainer.firstChild);
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth();
  const currentYear = currentDate.getUTCFullYear();
  calendarContainer.appendChild(
    await generateCalendar(currentMonth, currentYear)
  );
}
function apriCalendario(){
  if(document.getElementById("boxCalendario").style.display == "none" ){
    document.getElementById("boxCalendario").style.display = "block";
    document.getElementById("boxapertura").style.display = "none";

  }
  else{
    document.getElementById("boxCalendario").style.display = "none";
  }
  
}
function apriNotifiche(){

  let boxapertura = document.getElementById('boxapertura');
  if(boxapertura.style.display == 'none'){
    boxapertura.style.display = 'block';
    document.getElementById("boxCalendario").style.display = "none";
  }
  else{
    boxapertura.style.display = 'none';
  }
  }
function impiccato(){
  const words = ["javascript", "html", "css", "developer", "programming", "code"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill('_');
let remainingAttempts = 6;
let guessedLetters = [];
let impiccato = document.getElementById('impiccato');
impiccato.style.display = 'flex';
divRisultato.style.display = 'block';

// Inizializza il display della parola all'avvio del gioco
displayWord();

// Popola l'alfabeto
populateAlphabet();
function displayWord() {
  document.getElementById("word-container").innerText = guessedWord.join(" ");

}
function guessLetter(letter) {
  if (guessedLetters.includes(letter)) {
     //disabilita il pulsante se la lettera è già stata indovinata

      Swal.fire("Attenzione!", "Hai già indovinato questa lettera!", "warning");
      return;
  }

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
      for (let i = 0; i < selectedWord.length; i++) {
          if (selectedWord[i] === letter) {
              guessedWord[i] = letter;
          }
      }
  } else {
      remainingAttempts--;
      updateHangman();
  }

  displayWord();
  updateGuessedLetters();

  if (guessedWord.join('') === selectedWord) {
      Swal.fire("Hai vinto!", "Complimenti, hai indovinato la parola!", "success");
      resetGame();
  } else if (remainingAttempts === 0) {
      Swal.fire("Hai perso!", `La parola era: ${selectedWord}`, "error");
      resetGame();
  }
}

function updateHangman() {
  const hangmanIndex = 6 - remainingAttempts + 1;
  if (hangmanIndex >= 1 && hangmanIndex <= 6) {
      const hangman = document.getElementById(`hangman-${hangmanIndex}`);
      if (hangman) {
           hangman.style.display = 'inline-block';
       }
  }
}

function updateGuessedLetters() {
  document.getElementById("guessed-letters").innerText = "Lettere dette: " + guessedLetters.join(", ");
}

function resetGame() {
  // Nascondi tutti i teschi
  for (let i = 1; i <= 6; i++) {
      document.getElementById(`hangman-${i}`).style.display = 'none';
  }

  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(selectedWord.length).fill('_');
  remainingAttempts = 6;
  guessedLetters = [];
  displayWord();
  updateGuessedLetters();
  populateAlphabet();
}

function populateAlphabet() {
  const alphabetContainer = document.getElementById('alphabet-container');
  alphabetContainer.innerHTML = '';

  const rows = [];
  for (let letterCode = 97; letterCode <= 122; letterCode++) {
      const letter = String.fromCharCode(letterCode);
      const alphabetLetter = document.createElement('div');
      alphabetLetter.classList.add('alphabet-letter');
      alphabetLetter.textContent = letter.toUpperCase();
      alphabetLetter.addEventListener('click', () => guessLetter(letter));

      const rowIndex = Math.floor((letterCode - 97) / 9);
      rows[rowIndex] = rows[rowIndex] || document.createElement('div');
      rows[rowIndex].classList.add('alphabet-row');
      rows[rowIndex].appendChild(alphabetLetter);
  }

  rows.forEach(row => alphabetContainer.appendChild(row));
}
}


