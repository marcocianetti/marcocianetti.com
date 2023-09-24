---
template: post
date: 2020-08-17
title: "AlaJS, libreria JavaScript per l'attribuzione automatica dei contenuti"
description: "AlaJS è una libreria JavaScript che permette di aggiungere l'URL della pagina sorgente ad un testo copiato sulla pagina. Utile per la tua SEO e per essere giustamente accreditato per il tuo lavoro."
thumbnail: ./thumbnail.jpg
slug: alajs-libreria-javascript-attribuzione-automatica-contenuti
tags:
  - javascript
  - seo
---

Qualche tempo mi sono imbattuto in un articolo interessante.
C'era una parte che mi interessava molto e che poteva interessare anche ai miei colleghi, quindi ho deciso di copiarla e incollarla sulla nostra conversazione.

Ma al momento dell'incolla, come per magia, si è aggiunta una piccola parte di testo in fondo:

```text
...
...
(Source: nome-sito/url-pagina)
```

Certamente mi ha colto di sorpresa, ma ho trovato giusto dare il giusto "credito" a quel sito e lasciare il link alla pagina dell'articolo.

Qualche giorno dopo ho ricevuto in una newsletter di <a href="https://indieletters.com/" rel="nofollow">Indie Letters</a> uno snippet molto interessante: 3 righe di JavaScript che permettono di **aggiungere l'URL della pagina al testo copiato da un utente**.

Incredibile, in un lasso di tempo così breve ho incontrato per due volte lo stesso snippet che non avevo mai incontrato prima.

Pensi che sia finita qui?

Beh 6 giorni fa (11 Agosto 2020), nella newsletter di <a href="https://www.producthunt.com/" rel="nofollow">Product Hunt</a> uno dei prodotti che aveva ricevuto più upvote nella settimana era proprio un tool che ti permette di fare la stessa identica cosa.

C'era solo un dettaglio: _costava 49$/mese_.

Certamente ognuno decide il pricing che vuole per i propri prodotti, ma 49$ al mese per un prodotto così mi sembrano eccessivi (e molti utenti su Product Hunt lo hanno fatto notare al suo sviluppatore).

Tornando a noi.

Visto il susseguirsi di queste coincidenze ho deciso che avrei implementato quello snippet anche sul mio sito.

Per prima cosa ho fatto qualche ricerca ma non ho trovato librerie per farlo.

Sicuramente i termini di ricerca che ho utilizzato non erano il massimo dell'accuratezza, ma visto l'effort basso richiesto per implementarla da zero ho deciso di procedere così.

## AlaJS - Automated Link Attribution

AlaJS (da _Automated Link Attribution_) è il nome che ho deciso di dare allo snippet che permette di aggiungere il link alla pagina da cui è preso il testo copiato.

L'implementazione, come detto, è molto semplice:

```javascript
document.addEventListener('copy', function (event) {
  event.preventDefault();

  var clipboardData = event.clipboardData || window.clipboardData;
  if (!clipboardData) {
    return;
  }

  clipboardData.setData(
    'text/plain',
    window.getSelection().toString() +
      ' [Source: ' +
      window.location.href +
      ']'
  );
});
```

Puoi trovare il codice qui: [Source AlaJS](https://github.com/marcocianetti/alajs/)

Il suo funzionamento è altrettanto semplice.

Quando l'utente esegue il comando di "copia" allora al testo selezionato
viene aggiunta la stringa contenente l'URL della pagina corrente:

```javascript
clipboardData.setData(
  'text/plain',
  window.getSelection().toString() +
    ' [Source: ' +
    window.location.href +
    ']'
);
```

### Installazione

Per installarlo sul tuo sito ti basta utilizzare il CDN di <a href="https://www.jsdelivr.com/" rel="nofollow">jsDelivr</a>:

**Link per la versione specifica**

```javascript
https://cdn.jsdelivr.net/gh/marcocianetti/alajs@1.0.0/lib/index.min.js
```

**Link per l'ultima versione** (_non dovresti usarlo per la production_)

```javascript
https://cdn.jsdelivr.net/gh/marcocianetti/alajs/lib/index.min.js
```

### Perché dovresti utilizzarlo

Uno snippet di questo tipo ti da alcuni **vantaggi lato SEO** in quanto ti da la possibilità di avere dei **backlink** e di avere **più visitatori**.

È molto semplice da installare.

È leggero, AlaJS pesa **meno di 750B**.

Senza dimenticare l'aspetto più importante: **il tuo lavoro viene giustamente accreditato**.

_"Cosa succede se l'utente cancella l'URL dal testo una volta incollato?"_

Beh ovviamente nulla, e la citazione andrebbe persa.

Lo snippet non garantisce in alcun modo di ricevere la citazione, sta al buon senso (e alla pigrizia) degli utenti se lasciarla o meno.
