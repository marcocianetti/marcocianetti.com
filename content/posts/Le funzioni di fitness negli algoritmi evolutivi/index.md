---
template: post
date: 2022-12-16
title: 'Le funzioni di fitness negli algoritmi evolutivi'
description: 'La funzione di fitness è un elemento chiave negli algoritmi evolutivi. Scopri come viene utilizzata per valutare le soluzioni e perché è così importante nella selezione per la riproduzione.'
thumbnail: ./thumbnail.jpg
slug: funzioni-di-fitness-algoritmi-evolutivi
tags:
  - intelligenza-artificiale
  - algoritmi-evolutivi
---

## Cos'è la funzione di fitness

No, la palestra in questo caso non c'entra nulla e scrivere centinaia di queste funzioni
non ti preparerà per la prova costume.

**La funzione di fitness è uno dei principali componenti degli algoritmi evolutivi**. Si tratta di una funzione matematica che viene utilizzata per valutare la qualità di un individuo (o soluzione) per un problema specifico.

In generale, le soluzioni vengono rappresentate da stringhe, che vengono create, modificate e selezionate in base alla loro qualità valutata proprio dalla funzione di fitness.

> Nota come i termini "individuo" e "soluzione" vengono utilizzati in modo intercambiabile.
> Questo perché un individuo **rappresenta** una soluzione al problema.

## Come viene utilizzata la funzione di fitness

La funzione di fitness **determina l'abilità di un individuo di competere con gli altri** e di sopravvivere nell'ambiente circostante.

Essa **assegna un punteggio** ad ogni individuo e la probabilità che un individuo venga selezionato per la riproduzione, e quindi di passare alla generazione successiva, è basata su questo punteggio.

Infatti sono gli individui con **punteggi più alti che hanno maggiori possibilità di essere selezionati per la riproduzione e di trasmettere i loro geni** alle generazioni successive.

Questo rende le funzioni di fitness un elemento fondamentale degli algoritmi evolutivi.

## Importanza della definizione della funzione di fitness

È importante notare che **la definizione di una funzione di fitness è specifica per ogni problema** e dipende dai criteri desiderati per la soluzione.
Pertanto, **è necessario definire attentamente la funzione di fitness** in modo che rispecchi accuratamente i criteri di ottimizzazione desiderati.

Scrivere una **funzione di fitness errata porterà l'algoritmo a cercare delle soluzioni sbagliate** e non ottimali per il problema in questione.

E quì nessuno di noi vuole addestrare un algoritmo per ore e poi ricevere una soluzione non soddisfaciente, giusto?

Bene, allora meglio che ti mostri qualche esempio.

## Esempi di utilizzo della funzione di fitness

Come abbiamo detto, la funzione di fitness viene utilizzata per ottimizzare una soluzione per un problema specifico, valutando la bontà di un individuo.

Ad esempio, in un algoritmo evolutivo per il problema del _Commesso Viaggiatore_, la funzione di fitness potrebbe valutare quanto sia breve il percorso totale per visitare tutte le città in un insieme specifico.

In questo caso, **la funzione di fitness assegna un punteggio più alto alle soluzioni che hanno percorsi più brevi e un punteggio più basso a quelle con percorsi più lunghi**.

> **Problema del Commesso Viaggiatore (o TSP, "Traveling Salesman Problem")**: è un problema di ottimizzazione che consiste nel trovare il percorso più breve che attraversa un insieme di città una sola volta, prima di tornare alla città di partenza.
> Esso è molto difficile da risolvere in modo efficiente, poiché il numero di percorsi possibili aumenta esponenzialmente con il numero di città da visitare, ed è stato dimostrato essere un problema **NP-Completo**.

Prima di scrivere la funzione di fitness per il problema facciamo delle considerazioni:

- Abbiamo un insieme di città da visitare;
- Abbiamo una "mappa" (che chiameremo "distanze") che indica quanto è distante la **città A** dalla **città B** (questo per ogni città);
- I nostri individui saranno degli array dove ogni elemento contiene la prossima città da visitare (l'elemento 0 sarà il punto di partenza).

Fatte queste considerazioni, ecco un esempio di funzione di fitness scritta per il problema del _Commesso Viaggiatore_:

```javascript
function fitness(individuo) {
  // Calcola la distanza totale percorrendo tutte le città
  let distanzaTotale = 0;
  for (let i = 0; i < individuo.length - 1; i++) {
    distanzaTotale += distanze[individuo[i]][individuo[i + 1]];
  }

  // Aggiungi la distanza per tornare alla città di partenza
  distanzaTotale +=
    distanze[individuo[individuo.length - 1]][individuo[0]];

  // Inverti il risultato per ottenere un punteggio più alto
  // per soluzioni migliori (quelle che hanno una distanza minore)
  return 1 / distanzaTotale;
}
```

La funzione è molto semplice:

- Somma tutte le distanze proposte dalla soluzione scorrendo l'array;
- Somma la distanza per tornare al punto di partenza;
- Inverte il risultato.

🚨 L'ultimo passaggio è fondamentale: **senza di esso premieremmo le soluzioni che hanno la distanza maggiore, non quella minore!**

Facciamo ora un altro esempio, stavolta sul problema dello _Zaino_, dove l'obiettivo è massimizzare il valore degli oggetti trasportati.

> **Problema dello Zaino (o Knapsack Problem)**: è un problema di ottimizzazione che consiste nello scegliere quali oggetti inserire in uno zaino con capacità massima
> e ogni oggetto ha un peso e un valore. L'obiettivo è quello di inserire nello zaino gli oggetti che diano il valore massimo. Anche questo problema, nella sua forma decisionale, è un problema **NP-Completo**.

Come prima, facciamo alcune considerazioni prima di scrivere la funzione:

- Abbiamo uno zaino con capacità massima di peso **MAX_W**;
- Abbiamo **N** oggetti, ognuno con peso e valore. I pesi e i valori sono contenuti in due array che chiameremo **values** e **weights**;
- I nostri individui saranno degli array di valori **0 e 1** dove l'elemento _i_ vale 1 se intende inserire l'elemento _i_ nello zaino, 0 altrimenti;
- Se una soluzione supera il peso massimo **MAX_W** allora applicheremo una penalità in base a quanto questo peso viene superato.

Detto questo, ecco una possibile funzione di fitness:

```javascript
function fitness(individuo) {
  // individuo è un array di 0 e 1 che indica se un
  // oggetto viene selezionato o meno
  let fitness = 0;
  let weight = 0;

  for (let i = 0; i < individuo.length; i++) {
    if (individuo[i] === 1) {
      fitness += values[i];
      weight += weights[i];
    }
  }

  // Penalizziamo le soluzioni che superano il vincolo di peso massimo
  if (weight > MAX_W) {
    fitness -= (weight - MAX_W) * PENALTY;
  }

  return fitness;
}
```

## Considerazioni finali

In sintesi, la funzione di fitness è un **fattore chiave negli algoritmi evolutivi**, poiché determina la qualità delle soluzioni e influenza la probabilità che un individuo venga selezionato per la riproduzione e trasmetta i suoi geni alle generazioni future.

In altre parole, la funzione di fitness serve a valutare l'adattamento di un individuo all'ambiente in cui vive, e a determinare quanto bene esso è in grado di sopravvivere e riprodursi.

Gli individui con un valore di fitness più alto hanno maggiori probabilità di essere scelti per la riproduzione, il che significa che i loro geni saranno trasmessi alle generazioni future. Di conseguenza, gli algoritmi evolutivi tendono a produrre soluzioni sempre migliori nel tempo, poiché selezionano gli individui più adatti all'ambiente.
