class City {
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}
class Park extends City{
    constructor(name, buildYear, treeNumber, parkArea){
        super(name, buildYear);
        this.treeNumber = treeNumber;
        this.parkArea = parkArea;
    }

    calculateDensity() {
        console.log(`${this.name} has a tree density of ${this.treeNumber / this.parkArea} trees per square km`);
    }
}

class Street extends City{
    constructor(name, buildYear, streetLength, streetSize = 3){
        super(name, buildYear);
        this.streetLength = streetLength;
        this.streetSize = streetSize;
    }
    classifyStreet(){
        const sizeMap = new Map();
        sizeMap.set(1, 'tiny');
        sizeMap.set(2, 'small');
        sizeMap.set(3, 'normal');
        sizeMap.set(4, 'big');
        sizeMap.set(5, 'huge');
        console.log(`${this.name}, built in ${this.buildYear}, is a ${sizeMap.get(this.streetSize)} street`);

    }
}

function calc(arr){
    const sum = arr.reduce((prev, cur) => prev + cur, 0);
    return [sum, sum/arr.length];
}

let park1 = new Park('Green Park', 1996, 1500, 80);
let park2 = new Park('National Park', 2016, 700, 50);
let park3 = new Park('Oak Park', 2000, 320, 10);

let parkArr = [park1, park2, park3];

let street1 = new Street('Ocean Avenue', 1999, 1.1, 1);
let street2 = new Street('Evergreen Street', 1945, 2.7);
let street3 = new Street('4th Street', 2015, 3.1, 2);
let street4 = new Street('Sunset Boulevard', 1982, 1.6, 5);

let streetArr =[street1, street2, street3, street4];

function reportPark(parks){
    console.log(`===== PARK REPORTS =====`);

    //Density
    parks.forEach(el => el.calculateDensity());

    //Average age
    const ages = parks.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, averageAge] = calc(ages);
    console.log(`Our ${parks.length} parks have an average age of ${averageAge} years`);

    //Which park has more than 1000 trees
    const index = parks.map(el => el.treeNumber).findIndex(el => el >= 1000);
    console.log(`${parks[index].name} has more than 1000 trees`)
}

function reportStreet(streets){
    console.log(`===== STREET REPORTS =====`);

    //Total and average length of streets
    const length = streets.map(el => el.streetLength);
    const [totalLength, averageLength] = calc(length);
    console.log(`Our ${streets.length} streets have a total length of ${totalLength} km, and an average length of ${averageLength} km`);

    //Classify streets
    streets.forEach(el => el.classifyStreet());
}

reportPark(parkArr);
reportStreet(streetArr);
