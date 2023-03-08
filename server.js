// Importeer express uit de node_modules map
import express from "express";

// Maak een nieuwe variabele aan
const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set("view engine", "ejs");
app.set("views", "./views");

// Gegevens ophalen
const url = "https://api.codingthecurbs.fdnd.nl/api/v1/smartzones";
const data = await fetch(url).then((response) => response.json());

// Gebruik de map 'public' voor statische resources
app.use(express.static("public"));

// Maak standaard waarden voor de data en een route voor de index
app.get("/", function (request, response) {
  	let smartzonesUrl = url// + "/smartzones"

	fetchJson(smartzonesUrl).then((data) => {
    // console.log(data)
    response.render('index', data)
        })
	});

// Voor latere pagina's

// app.get('/book', (request, response) => {
//   response.render('book')
// })

// app.get('/manage', (request, response) => {
//   response.render('manage')
// })

// app.get('/account', (request, response) => {
//   response.render('account')
// })

// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
	// Toon een bericht in de console en geef het poortnummer door
	console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}