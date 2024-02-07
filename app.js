let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let recognizedText = document.getElementById("recognizedText");
let startListeningButton = document.getElementById("startListening");
let parolaDadire;

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    recognizedText.textContent = "Sto ascoltando...";
};

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    recognizedText.textContent = transcript;
    speech.text = transcript;
    console.log(transcript, transcript.toLowerCase());
    handleVoiceCommand(transcript.toLowerCase());
    
   // window.speechSynthesis.speak(speech);
};

recognition.onend = () => {
    recognizedText.textContent = ""; // Rimuovi il testo "Sto ascoltando..." quando il riconoscimento termina
};

startListeningButton.addEventListener("click", () => {
    recognition.start();
});

// Funzione per gestire i comandi vocali
function handleVoiceCommand(command) {
    if (command.includes('ciao')) {
        respond("Ciao! Come posso aiutarti?");
    } else if (command.includes('come stai')) {
        respond("Sto bene, grazie!");
    } else if (command.includes('apri google')) {
        window.open("https://www.google.com", "_blank");
        respond("Apro Google per te.");
    } else if (command.includes('oggi') && command.includes('che giorno')) {
        const date = new Date().toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric" });
        respond("Oggi è il" + date);
    }else if (command.includes('che ore sono')) {
        const date = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", second: "numeric" });
        respond("Sono le " + date);
    } 
    else {
        respond("Non ho capito. Riprova.");
    }
}

// Funzione per rispondere vocalmente
function respond(message) {
    speech.text = message;
    window.speechSynthesis.speak(speech);
}
