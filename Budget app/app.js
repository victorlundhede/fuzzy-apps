
//BUDGET CONTROLLER
let budgetController = (function() {
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: [],
            inc: []
        }
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
        inputBtn: '.add__btn'
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstring.inputType).value, //Will be either inc or exp
                description: document.querySelector(DOMstring.inputDescription).value,
                value: document.querySelector(DOMstring.inputValue).value
            }
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

        document.querySelector(DOM.inputBtn).addEventListener('click', ctnAddItem);

        document.addEventListener('keypress', (event) => {
            if(event.key === "Enter"){
                ctnAddItem();
            }
        });
    };

    let ctnAddItem = function(){
        let input, newItem;
        //Get field input data
        input = UIController.getInput();

        //Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //Add the item to the UI
        //Calculate the budget
        //Display the budget
    };

    return {
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();