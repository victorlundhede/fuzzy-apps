import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;

    }

    async getResults(){
        const key = '123c5cbe7d84f857d0eae56e4ec5db6d';
        try{
            const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = result.data.recipes;
            //console.log(this.recipes);
        } catch(err){
            alert(err);
        }
    }
}

