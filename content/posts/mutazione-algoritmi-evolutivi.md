---
date: 2023-01-03
title: "La mutazione negli algoritmi evolutivi: come ottenere il giusto equilibrio tra diversificazione e ottimizzazione"
description: "La mutazione è uno dei pilastri degli algoritmi evolutivi. Scopri come funziona e come scegliere la probabilità di mutazione e le tecniche di mutazione più adatte ai problemi che vuoi risolvere."
template: post
thumbnail: '../images/mutazione-algoritmi-evolutivi/thumbnail.jpg'
slug: mutazione-algoritmi-evolutivi
categories:
  - Intelligenza Artificiale
tags:
  - intelligenza-artificiale
  - algoritmi-evolutivi
---

## Cos'è la mutazione

La mutazione è uno dei meccanismi di variabilità genetica alla base degli algoritmi evolutivi e consiste in una modifica casuale di uno o più geni di un individuo, impattando sulla sua adattabilità al problema da risolvere.

La mutazione viene utilizzata insieme alla selezione e al crossover per generare nuove soluzioni (o individui) che possono essere più adatti al problema da risolvere.

Nell'ambito degli [algoritmi evolutivi](/articoli/introduzione-algoritmi-evolutivi), la mutazione viene solitamente applicata con una certa **probabilità** ad ogni individuo della popolazione, in modo da introdurre **nuova variabilità** e evitare che la popolazione vada incontro ad un "blocco evolutivo".

La probabilità di mutazione viene solitamente fissata in modo da garantire un **buon equilibrio tra stabilità e innovazione nella popolazione**.
Infatti, se la probabilità di mutazione è **troppo alta**, si potrebbero introdurre troppe modifiche casuali che potrebbero portare a soluzioni peggiori di quelle attualmente disponibili.
Se, al contrario, la probabilità di mutazione è **troppo bassa**, la popolazione potrebbe diventare "troppo stabile" e non evolvere più in modo efficiente, precludendo la possibilità di ottenere soluzioni migliori.

## Come viene applicata la mutazione

Nel contesto degli algoritmi evolutivi, la mutazione consiste in un processo che modifica in modo casuale uno o più elementi di un individuo.
Essa viene utilizzata per introdurre nuove idee e diversificare la popolazione di soluzioni, al fine di **evitare di restare bloccati in un minimo locale o in una soluzione subottimale**.

La mutazione viene solitamente applicata agli individui di una popolazione di soluzioni in modo casuale, utilizzando una probabilità di mutazione predefinita.
Ci sono **diverse tecniche** comunemente utilizzate per effettuare la mutazione in un algoritmo genetico, come il **Bit Flip** o il **Random Resetting** di un valore. Il Bit Flip consiste nell'invertire il valore di un bit, cioè da 0 a 1 o viceversa. Il Random Resetting di un valore consiste nella modifica di un valore scelto in modo casuale all'interno di un determinato intervallo.

## Effetti della mutazione

In generale, la mutazione ha lo scopo di generare degli individui che si distinguono da quelli attualmente presenti,
portare diversità all'interno della popolazione e poter cercare soluzioni in uno spazio ancora inesplorato dall'algoritmo.

Tuttavia, non sempre la mutazione ha effetti positivi sulla popolazione.

Infatti, la mutazione può anche avere l'effetto di peggiorare la qualità di una soluzione, soprattutto se applicata in modo eccessivo o non opportuno.

Per questo motivo, è **importante scegliere attentamente la probabilità di mutazione** e le **tecniche di mutazione** da utilizzare in un algoritmo evolutivo,
in modo da ottenere un **buon equilibrio tra diversificazione e ottimizzazione**.

## Scelta della probabilità di mutazione

La probabilità di mutazione viene solitamente scelta in base alla **difficoltà del problema che si sta affrontando** e alle **caratteristiche della popolazione di soluzioni**.

In generale, per **problemi di difficoltà media o elevata**, si può utilizzare una **probabilità di mutazione più alta**, al fine di introdurre nuove idee e diversificare la popolazione di soluzioni.

Al contrario, per **problemi di difficoltà bassa**, si può utilizzare una **probabilità di mutazione più bassa**, in modo da evitare di introdurre troppe "novità" e mantenere un buon livello di ottimizzazione.

Inoltre, la probabilità di mutazione può essere **modificata dinamicamente** durante l'esecuzione dell'algoritmo genetico, in base al livello di **diversificazione o di ottimizzazione** raggiunto dalla popolazione di soluzioni.

## Esempi di mutazione

Ecco alcuni esempi di tecniche di mutazione applicabili negli algoritmi evolutivi.

### Bit Flip (flip di bit)

Consiste nell'invertire il valore di un bit scelto in modo casuale all'interno di una soluzione.

Ad esempio, se la soluzione è rappresentata da una stringa di bit _01010101_ e viene selezionato il terzo bit (quello con indice 2 e valore 0), il valore del bit viene invertito e la soluzione diventa _01110101_.

Ed ecco un esempio di funzione JavaScript per eseguirla:

```javascript
// solution è un array di booleani
function mutation(solution, probability) {

  // Controlla se la mutazione deve essere eseguita
  if (Math.random() > probability) {
    return solution;
  }
  
  // Esegue il bit flip su un bit scelto in modo casuale
  var mutationIndex = Math.floor(Math.random() * solution.length);
  solution[mutationIndex] = !solution[mutationIndex];
  
  return solution;
}
```

### Random Resetting (cambiamento causale)

Consiste nella sostituzione di un valore di una soluzione con un valore causale tra quelli che possiamo assegnare.

Ad esempio, supponiamo che il nostro range di valori possibili è l'insieme di _numeri interi che vanno da 1 a 10_ e la soluzione scelta per la mutazione sia rappresentata dal vettore _[1, 2, 3, 4, 5]_.
Se viene selezionato il terzo elemento (quello con indice 2 e valore 3), il valore viene sostituito con un nuovo valore scelto in modo casuale, ad esempio _6_.

La soluzione diventa quindi _[1, 2, 6, 4, 5]_.

Di seguito una semplice funzione in JavaScript per eseguire questo tipo di mutazione:

```javascript
// solution è un array di interi
function mutation(solution, probability) {

  // Controlla se la mutazione deve essere eseguita
  if (Math.random() > probability) {
    return solution;
  }
  
  // Sceglie in modo casuale un elemento della soluzione e lo sostituisce con un nuovo valore scelto in modo casuale
  var mutationIndex = Math.floor(Math.random() * solution.length);
  solution[mutationIndex] = Math.floor(Math.random() * 10) + 1;
  
  return solution;
}
```

### Swap (scambio)

Consiste nello scambio di due elementi scelti in modo casuale all'interno di una soluzione.

Ad esempio, se la soluzione è rappresentata da una stringa di caratteri _"Hello, World!"_, e vengono selezionati il primo (H) e il quinto (o) elemento, gli elementi vengono scambiati e la soluzione diventa _"oellH, World!"_.

```javascript
// solution è una stringa
function mutation(solution, probability) {

  // Controlla se la mutazione deve essere eseguita
  if (Math.random() > probability) {
    return solution;
  }

  // Trasforma la soluzione in array perché le stringhe sono immutabili
  // e in questo modo facilitiamo lo swap
  var arrSolution = solution.split('');
  
  // Sceglie in modo casuale due elementi della soluzione e li scambia tra loro
  var mutationIndex1 = Math.floor(Math.random() * arrSolution.length);
  var mutationIndex2 = Math.floor(Math.random() * arrSolution.length);
  var temp = arrSolution[mutationIndex1];
  arrSolution[mutationIndex1] = arrSolution[mutationIndex2];
  arrSolution[mutationIndex2] = temp;
  
  return arrSolution.join('');
}
```

## Considerazioni finali

L'utilizzo della mutazione negli algoritmi evolutivi è fondamentale per introdurre nuova variabilità e diversificare la popolazione di soluzioni.

Tuttavia, è importante scegliere accuratamente la **probabilità di mutazione** e le **tecniche di mutazione** da utilizzare,
poiché la mutazione può anche avere effetti negativi e portare l'algoritmo "fuori strada".

Bisogna quindi trovare il giusto bilanciamento tra stabilità e innovazione nella popolazione,
attraverso un uso strategico della mutazione.
