---
template: post
date: 2023-09-24
title: "Come trasferire un progetto Google Cloud da un'organizzazione ad un'altra con una sola riga di comando"
description: "In questo articolo vedremo trasferire un progetto Google Cloud da un'organizzazione ad un'altra utilizzando la CLI di Google Cloud."
thumbnail: ./thumbnail.jpg
slug: come-trasferire-progetto-google-cloud
tags:
  - google-cloud
  - google-tag-manager
  - tracciamento-dati
---

In questo breve articolo vedremo come eseguire una semplice operazione che Google Cloud rende particolarmente ostica da eseguire tramite la loro interfaccia.

Sto parlando del **passaggio di un progetto Google Cloud da un organizzazione ad un’altra**.

Continua a leggere per scoprire non solo come eseguire questa operazione,
ma anche per comprendere il contesto in cui mi era necessaria,
dove ti parlerò di **tracciamento dei dati, di GDPR e di Google Analytics**.

Se invece desideri andare direttamente al sodo, puoi farlo
[cliccando qui](#come-effettuare-la-migrazione-di-un-progetto-google-cloud) e scoprire come trasferire un progetto Google Cloud da un'organizzazione all'altra utilizzando la CLI.

## Il contesto: tracciamento dati, GDPR e Google Analytics

Quest’anno, in [247X](https://247x.io), abbiamo realizzato **sistemi di tracciamento Server Side** per i nostri clienti, rendendoli non solo **GDPR compliant** ma **anonimizzando anche l’IP dell’utente al 100%**.

Come forse saprai, quest'anno è scoppiato il caso [Google Analytics Universal VS GDPR](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9782874)
e uno dei fattori che il Garante aveva evidenziato come _non conformi_ era proprio il fatto che l'indirizzo IP dell'utente veniva inviato verso gli Stati Uniti.

Google Analytics Universal aveva già una data di termine del servizio fissata al [1 Luglio 2023](https://support.google.com/analytics/answer/11583528),
tuttavia il Garante non si era ancora espresso riguardo **Google Analytics 4**.

Questo tool ha la possibilità di anonimizzare l'IP dell'utente e Google stessa [conferma di non salvare quesi dati](https://support.google.com/analytics/answer/2763052).

Tuttavia restava ancora una criticità da smarcare.

L'indirizzo IP, nonostante non venga salvato dai server di Google:

- Viaggia dall'Europa agli **USA**;
- **Arriva ai server di Google** (dove viene successivamente scartato).

Questi due punti rappresentavano un'area grigia per la privacy dell'utente e, come detto, il Garante non si era ancora espresso.

Tra le varie soluzioni a questo _potenziale problema_ c'è quella del **tracciamento Server Side**.

Utilizzando un tracciamento di questo tipo è possibile:

- Inviare i dati **prima** ad un server situato in **Europa**;
- **Anonimizzare** i dati in questo server;
- **Inviarli poi** ai vari tool di analisi e tracciamento (Google Analytics, Meta, ...).

In questo modo i dati personali dell'utente non lasceranno mai l'Europa
e non raggiungeranno nessuna terza parte.

> **Data Privacy Framework**
>
> Tutto questo dovrebbe essere risolto per tutte le società Americane che fanno parte del Data Privacy Framework (DPF) che è stato approvato dalla commissione Europea il 10 Luglio 2023.

Per realizzare il tracciamento Server Side abbiamo utilizzato:

- **Google Tag Manager** per gestire il tracciamento;
- **Google Cloud** per il server (ne hanno uno già preconfigurato per lo scopo).

In molti casi i clienti creavano un progetto Google Cloud assegnandoci poi i ruoli adeguati per eseguire il nostro lavoro, ma in un caso abbiamo dovuto creare noi il progetto e iniziare a lavorare su quello, per poi passarlo al cliente al termine dei lavori.

_“Un operazione semplice”_ pensavamo.

Ma a quanto pare Google aveva altri piani.

Tramite interfaccia utente (con tanto di apposita funzione _“Migra Progetti”_) non siamo riusciti ad effettuare il passaggio dalla nostra organizzazione a quella del cliente.

**Il motivo?**

Se un progetto è già associato ad un'organizzazione allora quella funzione non ha effetto (si, un progetto può anche **non** essere associato ad un'organizzazione).

![Funzione di trasferimento progetto](./funzione-migrazione-progetti.jpg)

Dopo aver letto decine di guide e provato tutto quello che la UI ci metteva a disposizione siamo passati alla CLI, e fortunatamente è stata questione di minuti per risolvere il problema.

## Come effettuare la migrazione di un progetto Google Cloud

### Prerequisiti

- Installa la CLI di Google Cloud. Se non l’ hai già fatto ([qui trovi la guida](https://cloud.google.com/sdk/docs/install));
- L'utente che dovrà eseguire il comando deve avere i giusti permessi su Google Cloud, sia sull'organizzazione di partenza che su quella di destinazione ([qui trovi i ruoli necessari](https://cloud.google.com/resource-manager/docs/assign-iam-roles));
- ID del progetto che vuoi spostare;
- ID dell'organizzazione di destinazione.

Entrambi gli ID puoi trovarli semplicemente aprendo **il menù in alto a sinistra di Google Cloud**.
Nel dialog appariranno la lista di progetti e organizzazioni con relativi ID.

Ovviamente devi avere accesso all'organizzazione di destinazione per poter leggere il suo ID in questo modo (e comunque hai bisogno di farne parte per poter eseguire la migrazione).

![Come trovare gli ID di progetto e organizzazione](./dove-trovare-gli-id.jpg)

### Riga di comando

A questo punto sei pronto a lanciare il comando:

`gcloud beta projects move ID_PROGETTO --organization ID_ORGANIZZAZIONE`

Et voilà, il progetto ora è nella nuova organizzazione 🎉

## Conclusioni

In questo breve articolo abbiamo visto come migrare un progetto Google Cloud da un'organizzazione ad un'altra.
Un'operazione molto semplice ma che personalmente ha causato la perdita di un pomeriggio,
quindi spero che questo articolo possa farti risparmiare tempo.

Se conosci altri modi, magari da interfaccia utente, che permettano di trasferire un progetto tra organizzazioni fammelo sapere
scrivendomi su [LinkedIn](https://linkedin.com/in/marcocianetti)!
