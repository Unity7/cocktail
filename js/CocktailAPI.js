class CocktailAPI{


    //Get the receipt by the name
    async getDrinksByName(name){
    
        //search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        
        //returns the json response

        const cocktails = await apiResponse.json();

        return{
            cocktails
        }
    
    
    }



    //get recipe by ingredient
    async getDrinksByIngredient(ingredient){

        //search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    
    const cocktails = await apiResponse.json();

    return{
        cocktails
    }
    
    }

    //get single recipe
    async getSingleRecipe(id){

        //search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    const recipe = await apiResponse.json();

    return{
        recipe
    }

    }

    // retreives all the categories form the rest API
    async getCategories(){
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        //wait for the response and return JSON
        const categories = await apiResponse.json();
        return{
            categories
        }
    }


    // get drinks by category

    async getDrinksByCategory(category){

       //search by category
       const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
       const cocktails = await apiResponse.json();
   
       return{
           cocktails
       }
    }

    //get alcohol or non alcohol drinks
 async getDrinkByAlcohol(term){

       //search by category
       const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`)
       const cocktails = await apiResponse.json();
   
       return{
           cocktails
       }
 }

}