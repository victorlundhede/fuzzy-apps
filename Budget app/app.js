
//BUDGET CONTROLLER
let budgetController = (function() {
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round ((this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let calculateTotal = function(type){
        let sum = 0;
        data.allItems[type].forEach(function(current){
            sum = sum + current.value;
        });
        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: [],
            inc: []
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, desc, val){
            let newItem, ID;

            //Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else {
                ID = 0;
            }

            //Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, desc, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, desc, val);
            }
            //Push it into our data structure
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },
        deleteItem: function(type, id){
            let ids, index;

            //Convert object to array
            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            let allPerc = data.allItems.exp.map(function(current){
                return current.getPercentage();
            });
            return allPerc;
        },

        calculateBudget: function(){
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //Calculate the budget: income - expenses
            data.budget = (data.totals.inc - data.totals.exp);

            //Calculate the percentage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function(){
            console.log(data);
        }
    }
})();



//UI CONTROLLER
let UIController = (function(){

    let DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstring.inputType).value, //Will be either inc or exp
                description: document.querySelector(DOMstring.inputDescription).value,
                value: Number(document.querySelector(DOMstring.inputValue).value)
            }
        },
        addListItem: function(obj, type){
            let html, newHTML, element;
            //Create HTML string with placeholder text
            if(type === 'inc'){
                element = document.querySelector(DOMstring.incomeContainer);
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = document.querySelector(DOMstring.expensesContainer);
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace placeholder text with actual data from object
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            //Insert HTML into the DOM
            element.insertAdjacentHTML('beforeend', newHTML);
        },
        deleteListItem: function(selectorID){
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        clearFields: function(){
            let fields, fieldsArr;
            fields = document.querySelectorAll(DOMstring.inputDescription + ', ' + DOMstring.inputValue);

            //Trick the slice method to work on a nodeList
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current) {
                current.value = '';
            });

            //Put focus back to the description field
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            document.querySelector(DOMstring.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstring.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstring.expensesLabel).textContent = obj.totalExp;

            if(obj.percentage > 0 ){
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstring.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages){
            let fields, nodeListForEach;
            fields = document.querySelectorAll(DOMstring.expensesPercLabel);

            nodeListForEach = function(list, callback){
                for(let i = 0; i < list.length; i++){
                    callback(list[i],i);
                }
            };

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }
                else{
                    current.textContent = '---';
                }
            });

        },

        getDOMstrings: function(){
            return DOMstring;
        }
    }
})();



//GLOBAL APP CONTROLLER
let controller = (function (budgetCtrl, UICtrl){

    let setupEventListeners = function(){
        let DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.addEventListener('keypress', (event) => {
            if(event.key === "Enter"){
                ctrlAddItem();
            }
        });



    };

    let updateBudget = function() {
        //Calculate the budget
        budgetCtrl.calculateBudget();

        //Return the budget
        let budget = budgetCtrl.getBudget();

        //Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    let updatePercentages = function(){
        //Calculate percentages
        budgetCtrl.calculatePercentages();

        //Read percentages from the budget controller
        let percentages = budgetCtrl.getPercentages();

        //Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    let ctrlAddItem = function(){
        let input, newItem;
        //Get field input data
        input = UIController.getInput();

        //Checks that user has filled out all input fields
        if(input.description !== '' && !isNaN(input.value) && input.value > 0){
            //Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //Clear the fields
            UICtrl.clearFields();

            //Calculate and update budget
            updateBudget();

            //Calculate and update percentages
            updatePercentages();
        }
    };

    let ctrlDeleteItem = function(event){
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = Number(splitID[1]);

            //Delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            //Delete item from UI
            UICtrl.deleteListItem(itemID);

            //Update and show new budget
            updateBudget();

            //Calculate and update percentages
            updatePercentages();
        }
    };
    return {
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    }

})(budgetController, UIController);

controller.init();