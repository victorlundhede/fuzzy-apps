let john = {
    bills: [124, 48, 268, 180, 42],
    tipCalc: function () {
        this.tips = [];
        this.finalValue = [];
        for(let i = 0; i < this.bills.length; i++){
            let procentage;
            let bill = this.bills[i];
            if(bill < 50){
                procentage = .2;
            } else if(bill >= 50 && bill < 200){
                procentage = .15;
            }else{
                procentage = .1;
            }
            this.tips[i] = procentage*bill;
            this.finalValue[i] = bill + (bill * procentage);
        }

    }
};
let mark = {
    bills: [77, 475, 110, 45],
    tipCalc: function () {
        this.tips = [];
        this.finalValue = [];
        for(let i = 0; i < this.bills.length; i++){
            let procentage;
            let bill = this.bills[i];

            if(bill < 100){
                procentage = .2;
            } else if(bill >= 100 && bill < 300){
                procentage = .1;
            }else{
                procentage = .25;
            }
            this.tips[i] = procentage*bill;
            this.finalValue[i] = bill + (bill * procentage);
        }

    }
};

function calcAverage (array){
    let sum = 0;
    for(let i = 0; i<array.length;i++){
        sum += array[i];
    }
    sum = sum/(array.length);
    console.log(sum);
    return sum;
}
john.tipCalc();
mark.tipCalc();

john.average = calcAverage(john.tips);
mark.average = calcAverage(mark.tips);
if(john.average > mark.average){
    console.log("John has a higher average");
}else if(john.average < mark.average){
    console.log("Mark has a higher average");
}else{
    console.log("The average is the same");
}