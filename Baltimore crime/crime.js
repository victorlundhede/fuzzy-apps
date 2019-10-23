//Node.js file that uses a dataset over crimes in Baltimore to perform various calculations
const fs = require('fs');
if (
	!process.argv[2] ||
	!process.argv[3] ||
	!process.argv[4] ||
	!process.argv[5] ||
	!process.argv[6] ||
	!process.argv[7]
) {
	console.log(
		'Please insert in the following format: Neighborhood(Irvington) year(16) startTime(08:00:00) endTime(18:00:00) Inside/Outside(I or O) District(EASTERN)'
	);
} else {
	run(); //Run function
}
function run() {
	//Define run function which runs every other function and insert argument
	const fileName = './baltimore-crime.csv'; //Insert dataset
	getLines(fileName);
	let data = getData(fileName); //Save return value from helperfunction

	//Create variable with chosen value and inserting them into functions Irvington 16 '08:00:00' '18:00:00' I EASTERN
	let neighborhood = process.argv[2];
	crimeInNeighborhood(neighborhood, data);
	let year = process.argv[3];
	numOfBurglary(neighborhood, year, data);
	//Define the time interval
	let startTime = String(process.argv[4]);
	let endTime = String(process.argv[5]);
	let place = process.argv[6];
	safestNeighborhood(startTime, endTime, place, data);
	let district = process.argv[7];
	districtIncident(district, data);
}
function getLines(fileName) {
	//Find first 100 lines of dataset and write them to a seperate csv file
	const file = fs.readFileSync(fileName, 'utf-8');
	let lines = file.split('\n');
	let csvArr = [];
	for (let i = 0; i < 100; i++) {
		csvArr.push(lines[i]);
	}
	let csvString = csvArr.join('\n'); //Convert array to string so it can be made into csv data
	fs.writeFileSync('./data.csv', csvString); //Write data to seperate file
}
function getData(csvData) {
	//Helperfunction that loads chosen dataset and converts it to JS objects
	const file = fs.readFileSync(csvData, 'utf-8'); //Read file in a constant variable
	let lines = file.split('\n'); //Split file so every entry is on seperate lines
	let dataArr = [];
	for (let line of lines) {
		//Loop to run though data
		let row = line.split(','); //Split at ',' since it is CSV data
		let datasaet = {
			//Make object to contain CSV data
			crimeDate: row[0],
			crimeTime: row[1],
			crimeCode: row[2],
			location: row[3],
			description: row[4],
			'inside/outside': row[5],
			weapon: row[6],
			post: row[7],
			district: row[8],
			neighborhood: row[9],
			latitude: row[10],
			longitude: row[11],
			premise: row[12],
			'total Incidents': row[13]
		};
		dataArr.push(datasaet);
	}
	return dataArr; //Return array with objects for future use
}
function crimeInNeighborhood(neighborhood, data) {
	//Show number of crimes in a chosen neighborhood
	let count = 0;
	for (let crime of data) {
		if (crime.neighborhood === neighborhood) {
			//If chosen neighborhood is equal to neighborhood in dataset
			count++; //Increase count with 1
		}
	}
	if (count === 0) {
		//If count is 0
		console.log('Invalid neighborhood');
	} else {
		console.log(`There has been a total of ${count} crimes in ${neighborhood} from 2012 to 2016`);
	}
}
function numOfBurglary(neighborhood, year, data) {
	//Show number of burglaries in chosen neighborhood
	let count = 0;
	for (let crime of data) {
		let yearArr = crime.crimeDate.split('/')[2]; //Because the date format is 12/12/12 and that only the year is needed, the data is split with '/'
		if (yearArr == year && crime.description === 'BURGLARY' && crime.neighborhood === neighborhood) {
			count++;
		}
	}
	if (count === 0) {
		//If count is 0
		console.log('Invalid neighborhood or year');
	} else {
		console.log(`There has been a total of ${count} burglaries in ${neighborhood} in 20${year}.`);
	}
}
function safestNeighborhood(startTime, endTime, place, data) {
	//Show safest neighborhood, either inside or outside
	let safeMap = new Map(); //Create empty map
	for (let crime of data) {
		//Iterate over dataset to fill map
		if (crime.crimeTime >= startTime && crime.crimeTime <= endTime && crime['inside/outside'] === place) {
			//If crimes is inside chosen time interval and place
			if (!safeMap.has(crime.neighborhood)) {
				//If neighborhood isn't in map, then add it
				safeMap.set(crime.neighborhood, 1);
			} else {
				//If neighborhood is in map, add 1 to it
				safeMap.set(crime.neighborhood, safeMap.get(crime.neighborhood) + 1);
			}
		} else if (!place === 'I' || !place === 'O') {
			//If place is not equal to 'I' or 'O'
			console.log('Invalid input');
		}
	}
	//Maps can't be sorted directly, so content is converted to an array
	let neighborhoods = Array.from(safeMap.entries()); //Make array from map
	neighborhoods.sort(function(a, b) {
		//Sort array
		return a[1] - b[1]; //[1] is used to compare values in the map, not the keys. A-B makes the lowest numbers come first
	});
	//Checks which string to print
	if (place === 'I') {
		//If 'I'
		console.log(
			`These are the 10 safest neighborhoods inside from ${startTime} to ${endTime} and the number of incidents:`
		);
	} else if (place === 'O') {
		//If 'O'
		console.log(
			`These are the 10 safest neighborhoods outside from ${startTime} to ${endTime} and the number of incidents:`
		);
	}
	//Loop to show first 10 elemets in array
	for (let i = 0; i < 10; i++) {
		console.log(neighborhoods[i]);
	}
}
function districtIncident(district, data) {
	//Show incidents in chosen district
	let crimeMap = new Map(); //Create map
	for (let crime of data) {
		//Iterate over dataset
		let yearArr = crime.crimeDate.split('/')[2]; //Because the date format is 12/12/12 and that only the year is needed, the data is split with '/'
		if (district === crime.district) {
			//If the chosen district matches a district in the dataset
			if (!crimeMap.has(yearArr)) {
				//If year is not in map, then add it
				crimeMap.set(yearArr, 1);
			} else {
				//If year is in map, add 1
				crimeMap.set(yearArr, crimeMap.get(yearArr) + 1);
			}
		}
	}
	for (let [ key, value ] of crimeMap.entries()) {
		//Iterate over entries in map to show yearly incidents in chosen district
		console.log(`There has been ${value} incidents in 20${key} in the ${district} district`);
	}
}
