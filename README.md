
# LAURI
##### *Creato da Balan Andrei Cristian 5^A INF*

## Introduzione

LAURI è un compagno vocale altamente avanzato, concepito con la stessa filosofia dei moderni assistenti vocali come SIRI o ALEXA. Questo innovativo sistema è stato creato per offrire agli utenti un'esperienza di interazione vocale senza precedenti, consentendo loro di comunicare in modo naturale e intuitivo con la tecnologia attraverso il semplice utilizzo della propria voce.

### Funzionalità

L'assistente vocale LAURI è in grado di ricevere in input la voce dell'utente e di processarla per fornire il risultato desiderato. Le sue funzionalità includono:

- **Riconoscimento Vocale:** LAURI è in grado di riconoscere e interpretare il linguaggio parlato dall'utente.
- **Elaborazione delle Richieste:** Una volta catturato il comando vocale, LAURI elabora la richiesta e cerca di fornire la risposta o l'azione appropriata.
- **Risposte Interattive:** LAURI può rispondere alle domande degli utenti, fornire informazioni, eseguire azioni e altro ancora.
- **Integrazione con Dispositivi:** LAURI può essere integrato con vari dispositivi e servizi per ampliare le sue funzionalità.
- **Accessibilità:** L'utilizzo dell'assistente vocale può essere particolarmente vantaggioso per gli utenti con disabilità visive o motorie, poiché consente loro di interagire con la tecnologia utilizzando la voce anziché l'input tradizionale.

### Utilità

Le persone dovrebbero considerare l'utilizzo dell'assistente vocale LAURI per diversi motivi:

1. **Comodità:** L'utilizzo della voce come interfaccia utente può essere più veloce e comodo rispetto all'immissione manuale.
2. **Efficienza:** LAURI può eseguire rapidamente varie attività, come impostare promemoria, cercare informazioni online, controllare dispositivi domestici connessi e altro ancora, riducendo il tempo e lo sforzo necessari.
3. **Assistenza Personale:** LAURI può fungere da assistente personale virtuale, aiutando gli utenti nelle attività quotidiane, come la gestione delle attività, la pianificazione degli appuntamenti e la gestione delle comunicazioni.
4. **Accessibilità:** Per gli utenti con disabilità, l'interfaccia vocale può rappresentare un modo più accessibile per interagire con la tecnologia.
5. **Innovazione:** Utilizzare un assistente vocale come LAURI può essere un modo per rimanere al passo con le ultime innovazioni tecnologiche e sfruttare al meglio le potenzialità della tecnologia moderna.

In sintesi, LAURI è un assistente vocale versatile e utile che offre numerosi vantaggi, tra cui comodità, efficienza, assistenza personale e accessibilità, che possono migliorare significativamente l'esperienza degli utenti nell'interagire con la tecnologia moderna.
 > **N.B.** Il Progetto è utilizzabile e spendibile su tutti i dispositivi purchè abbiano un browser con motore diricerca:  
`le librerie implementate non sono compatibili con firefox su android`

## DFD
[![Data-flow-diagram-physical.jpg](https://i.postimg.cc/sg9JPpC7/Data-flow-diagram-physical.jpg)](https://postimg.cc/XrqF4BJY)

## Specifiche

### Avvio del Riconoscimento Vocale
- **Descrizione:** Avvia il riconoscimento vocale per catturare i comandi dell'utente.
- **Obiettivo:** Consentire all'utente di interagire con LAURI utilizzando la voce come input.

### Elaborazione delle Richieste Vocali
- **Descrizione:** Interpretare e comprendere la richiesta dell'utente e fornire una risposta o un'azione appropriata.
- **Condizioni:** L'utente deve aver attivato il riconoscimento vocale e fornito un comando comprensibile.
- **Obiettivo:** Fornire risposte o azioni coerenti con l'input vocale ricevuto.

### Risposte Interattive
- **Descrizione:** Dopo aver elaborato la richiesta vocale dell'utente, LAURI fornisce risposte interattive che possono includere informazioni, azioni o richieste di ulteriori dettagli.
- **Obiettivo:** Comunicare in modo chiaro e interattivo con l'utente, fornendo risposte utili e contestuali.

### Integrazione con Dispositivi e Servizi
- **Descrizione:** LAURI può essere integrato con vari dispositivi e servizi per ampliare le sue funzionalità, ad esempio controllare dispositivi domestici connessi o accedere a servizi online.
- **Obiettivo:** Espandere le capacità di LAURI consentendo l'interazione con una vasta gamma di dispositivi e servizi, offrendo agli utenti un'esperienza più completa e personalizzata.

### Accessibilità
- **Descrizione:** L'utilizzo dell'assistente vocale LAURI è particolarmente vantaggioso per gli utenti con disabilità visive o motorie, consentendo loro di interagire con la tecnologia utilizzando la voce.
- **Obiettivo:** Offrire un'interfaccia accessibile e inclusiva che consenta a tutti gli utenti di sfruttare le funzionalità di LAURI in modo efficace e senza barriere.

## Tecnologie utilizzate


#### Linguaggi di Programmazione:
- **HTML, CSS e JavaScript (JS):** Ho utilizzato HTML per la struttura della pagina web, CSS per lo stile e JavaScript per la logica e l'interattività dell'applicazione.
-## Scelta di non utilizzare un Database:

Dopo un'attenta valutazione delle esigenze del progetto LAURI, ho deciso di non utilizzare un database per diversi motivi:

1. **Minima Persistenza dei Dati:** Poiché l'assistente vocale LAURI si concentra principalmente sull'interazione in tempo reale con l'utente e sulla generazione di risposte dinamiche basate sull'input vocale, non c'è stata la necessità immediata di memorizzare grandi quantità di dati in un database. Le informazioni temporanee o di stato possono essere gestite efficacemente utilizzando variabili e strutture dati in memoria.

2. **Complessità Aggiuntiva:** L'introduzione di un database avrebbe aggiunto un livello di complessità al progetto, inclusa la necessità di configurazione, gestione e manutenzione del database stesso. Poiché il focus principale del progetto era sull'implementazione dell'interfaccia vocale e sulla logica di elaborazione delle richieste, ho preferito evitare di aggiungere complessità non essenziale.

3. **Requisiti di Performance:** Per le dimensioni e la natura delle informazioni gestite da LAURI, l'accesso ai dati in tempo reale o l'uso di strutture dati in memoria erano sufficienti per soddisfare i requisiti di performance dell'applicazione. Introdurre un database avrebbe potuto comportare un overhead aggiuntivo, influenzando negativamente le prestazioni dell'applicazione.

### Motivazioni per non utilizzare altri linguaggi come C# o C:

ho scelto di non utilizzare altri linguaggi come C# o C per il seguente motivo:

1. **Esigenze Specifiche del Progetto:** Considerando le esigenze del progetto, tra cui l'interfaccia vocale e l'interazione in tempo reale con l'utente, ho ritenuto che linguaggi orientati agli oggetti come C# o linguaggi di basso livello come C non fossero la scelta ottimale. JavaScript è stato preferito per la sua flessibilità, facilità di integrazione con le API web e supporto per la programmazione asincrona, che sono essenziali per gestire l'input vocale e fornire risposte dinamiche in tempo reale.

2. **Ampia Adozione di JavaScript:** JavaScript è ampiamente utilizzato nello sviluppo web e offre una vasta gamma di librerie e framework che possono essere utilizzati per estendere le funzionalità dell'applicazione. La sua popolarità e il vasto ecosistema di sviluppatori e risorse disponibili hanno reso JavaScript una scelta naturale per il progetto LAURI.

3. **Facilità di Prototipazione e Sviluppo Rapido:** JavaScript, insieme a HTML e CSS, consente una prototipazione rapida e lo sviluppo iterativo di applicazioni web. Questa agilità è stata cruciale per il progetto LAURI, consentendo di esplorare rapidamente le idee e iterare sulle funzionalità dell'assistente vocale.


#### Per permette la realizzazione di questo progetto sono state utilizzate `librerie` e `API`
- **Web Speech API:** Utilizzata per il riconoscimento vocale. ho utilizzato `window.SpeechRecognition` per riconoscere e interpretare la voce dell'utente.
  
- **SpeechSynthesisUtterance:** Utilizzata come sintetizzatore di voce per generare le risposte dell'assistente vocale LAURI in formato audio. 

- **Geolocalizzazione:** Nel caso in cui le funzionalità di LAURI richiedessero informazioni sulla posizione dell'utente, ho utilizzato la `navigator.geolocation` per accedere alle coordinate geografiche dell'utente. Questo ci consente, ad esempio, di fornire risposte o servizi personalizzati in base alla posizione dell'utente.

```javascript
// Inizializzazione del sintetizzatore di voce
let speech = new SpeechSynthesisUtterance();
// Esempio di utilizzo della geolocalizzazione
navigator.geolocation.getCurrentPosition(function(position) {
  console.log("Posizione attuale:", position.coords.latitude, position.coords.longitude);
});
```
## Guida all’interfaccia

### Pagine dell'applicativo

Il nostro applicativo LAURI è composto dalle seguenti pagine principali:

1. **Home Page:** Introduce l'utente all'assistente vocale LAURI, fornendo una panoramica delle sue capacità e dei vantaggi dell'utilizzo.
   
2. **Interfaccia Vocale:** Pagina dedicata all'avvio del riconoscimento vocale e all'interazione diretta con LAURI. Qui gli utenti possono iniziare a utilizzare l'assistente vocale per emettere comandi e ricevere risposte.

3. **Impostazioni:** Pagina dove gli utenti possono personalizzare le preferenze di LAURI, come la lingua preferita, le opzioni di feedback vocale e altre impostazioni avanzate.

### Presentazione delle funzionalità

Le funzionalità di LAURI sono presentate agli utenti in modo chiaro e intuitivo:

- **Tutorial Iniziale:** All'avvio dell'applicazione, gli utenti vengono guidati attraverso un breve tutorial che illustra come avviare il riconoscimento vocale e interagire con LAURI.
  
- **Messaggi di Feedback:** Durante l'uso dell'applicazione, vengono forniti messaggi di feedback per informare gli utenti sullo stato del riconoscimento vocale e sulle azioni eseguite da LAURI in risposta ai loro comandi.
  
- **Guide Interne:** Ogni pagina dell'applicativo include guide interne e suggerimenti contestuali che aiutano gli utenti a scoprire nuove funzionalità e massimizzare l'efficacia dell'interazione con LAURI.

## Test

### Test Eseguiti

Abbiamo condotto diversi test per garantire la robustezza e l'affidabilità dell'applicazione LAURI:

- **Test di Usabilità:** Abbiamo coinvolto un gruppo di utenti rappresentativi per valutare l'usabilità generale dell'interfaccia vocale di LAURI. I test si sono concentrati sull'esperienza utente durante l'avvio del riconoscimento vocale, la comprensione delle risposte di LAURI e la facilità di navigazione tra le diverse funzionalità dell'applicazione.

- **Test di Performance:** Abbiamo eseguito test per valutare la velocità di risposta di LAURI durante l'elaborazione delle richieste vocali e la sintesi delle risposte. Questo ci ha permesso di ottimizzare i tempi di risposta e migliorare l'efficienza complessiva dell'applicazione.

### Risultati dei Test

Nei nostri test abbiamo rilevato diversi punti di forza e aree di miglioramento per LAURI:

- **Punti di Forza:** Gli utenti hanno apprezzato l'accuratezza del riconoscimento vocale di LAURI e la chiarezza delle risposte fornite. In particolare, la capacità di integrarsi con dispositivi esterni e servizi online è stata ben recepita dagli utenti.

- **Aree di Miglioramento:** Abbiamo identificato alcune situazioni in cui LAURI ha avuto difficoltà nel riconoscere comandi vocali complessi o in ambienti con rumore di fondo elevato. Stiamo lavorando per migliorare questi aspetti attraverso aggiornamenti software e ottimizzazioni delle API utilizzate.

