// JavaScript Document
/*
Esempio di server in Node.js che aprei files
*/

var fs = require( "fs" );
var http = require( "http" );
var file = "";

function gestisciConnessione( richiesta, risposta ){
	var corpo = "Connessione al server eseguita.";
	var dati = "application/json";
	fs.open( "sconto.txt" , "r" , callback );
	risposta.writeHead( 200, {
			"Content-Type" : dati,
			"Content-Length" : corpo.length
		} );
	risposta.end( corpo );
	
}

// Una volta richiamato il callback della funzione asincrona fopen, devo implementare il procedimento
// per gestire e leggere il file aperto.
// La funzione callback avrà come parametri un parametro errore che sarà NULL nel caso non ve ne siano stati
// e un parametro dati che altro non è che il puntatore al file vero e proprio aperto (viene considerato solo quando non ci sono errori)
function callback( errore, dati ){
	if ( errore ) {
		console.log( "Errore: " + errore.code + "  ( " + errore.message + " )" ); 
	} else {
		var buffer = new Buffer( 1000 );
		console.log ( "File aperto correttamente" );
		// Se non ci sono errori creo il buffer di lettura e leggo il file intero
		// la lettura del file è anchesssa asincrona, quindi devo provvedere a scrivere una funzione di 
		// callback in modo tale che la lettura possa essere eseguita quando il file è stato effettivamente aperto
		// la funzione in questo caso la dichiaro direttamente anonima 
		// I parametri sono: IL PUNTATORE AL FILE APERTO,  IL BUFFER, LA LUNGHEZZA DEI CARATTERI DA CONSIDERARE X IL BUFFER E LA FUNZIONE DI CALLBACK
		fs.read( dati, buffer, 0, 1000, null, function( errore, lunghezza){
				if ( errore ) {
					console.log( "Errore in lettura del file." );
				}else{
					console.log( buffer.toString( "utf8", 0, lunghezza ) );
					fs.close( dati, function(){} );
				}
			} )
		
	}
}

var server = http.createServer( gestisciConnessione );
server.listen( 8080 );