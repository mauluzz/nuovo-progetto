// JavaScript Document

/*
 Esempio di server scritto in Node.js
*/

// Definisco la variabile che ottiene un nuovo protocollo http
var http = require( "http" );
// Aggiungo una variabile globale che calcola i collegamenti soddisfatti dal server
var globalcount = 0;

// Funzione per la gestione del server ( verrà richiamata al momento della creazione del server)
function gestioneServer( richiesta, risposta ){
	var corpo =  "Grazie per la connessione, conteggio attuale utenti connessi: " + ++globalcount;
	console.log( "Metodo: " + richiesta.method + "/n Lunghezza dati: " + corpo.length + " " + globalcount );
	risposta.writeHead( 200, {
		'Content-Length' : corpo.length,
		'Content-Type' : 'java/json'
	});
	risposta.end( corpo );
}

//Creo il server e come callback utilizzo la funzione che si preoccupa di gestirlo
var s = http.createServer( gestioneServer );

// Metto il server in ascolto della porta 8080 per eventuali connessioni
s.listen( 8080 ); 