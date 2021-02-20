// instanciate the classes
const ui = new UI();
const cocktail = new CocktailAPI();
const cocktailDB = new CocktailDB();


// create the event listeners
function eventListeners(){

    //Document Ready
    document.addEventListener("DOMContentLoaded", documentReady);

    //add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    
    //searchForm does not exist in "My favorites" page. If statement is used to execute getCocktails
    if(searchForm){
    searchForm.addEventListener('submit', getCocktails);
    }


    // the results div listeners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv){
        resultsDiv.addEventListener('click', resultsDelegation);
    }


}


eventListeners();




//getCocktails function
function getCocktails(e){
    e.preventDefault();
    
    const searchTerm = document.querySelector('#search').value;

    //check search input
    if(searchTerm === ""){
        //call user interface print message
        ui.printMessage("Please add something into the form", "danger");
    } else {
        // Server response from promise
        let serverResponse;

        //Type of search (ingredients, cocktails, or name)
        const type = document.querySelector('#type').value;

        //evaluate the type of method and then execute the query

        switch(type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                break;
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinkByAlcohol(searchTerm);
                break;
            }

        ui.clearResults();
        // Query by the name of the drink
        
        serverResponse.then(cocktails => {
            if(cocktails.cocktails.drinks === null){
                //nothing exist
                ui.printMessage("There're no results, try a different term", "danger");
            } else{
                if(type === 'name'){
                    ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);


                }else{
                    //display without ingredients (category, alcohol, ingredient)
                    ui.displayDrinks(cocktails.cocktails.drinks);
                }
            }
        })
    }

}


// Delegation for the results area
function resultsDelegation(e){

e.preventDefault();
    if(e.target.classList.contains('get-recipe')){

        //can also use e.target.getAttribute('data-id')
        cocktail.getSingleRecipe(e.target.dataset.id)
        .then(recipe => {
            
            //displays single recipe into a modal
            ui.displaySingleRecipe(recipe.recipe.drinks[0])
        })
    } 

    //When favorite btn is clicked
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            //remove the class
            e.target.classList.remove('is-favorite')
            e.target.textContent = "+";

             //remove from storage
             cocktailDB.removeFromDB(e.target.dataset.id);



        }else{
          
            //add the class
            e.target.classList.add('is-favorite')
            e.target.textContent = "-";

            //get info
            const cardBody = e.target.parentElement;
            const drinkInfo = {
                id: e.target.dataset.id,
                image: cardBody.querySelector(".card-img-top").src,
                name: cardBody.querySelector('.card-img-top').alt
            }

            //Add into the storage
            cocktailDB.saveIntoDB(drinkInfo);

        }
    
    
    }


}


//Document ready
function documentReady(){
    //Display on load the favorites from storage
    ui.isFavorite();

    //select the search category
    const searchCategory = document.querySelector('.search-category')
    if(searchCategory){
        ui.displayCategories();
    }

    //when favorites page
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable){
        //get the favorites from storage and display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);
    }

    //when view or delete are clicked
    favoritesTable.addEventListener('click', (e) =>{
        e.preventDefault();
        
        //delegation
        if(e.target.classList.contains('get-recipe')){

        //can also use e.target.getAttribute('data-id')
        cocktail.getSingleRecipe(e.target.dataset.id)
        .then(recipe => {
            
            //displays single recipe into a modal
            ui.displaySingleRecipe(recipe.recipe.drinks[0])
                 })
    
        }
        
        //when remove button is clicked
        if(e.target.classList.contains('remove-recipe')){

            //remove from DOM
            ui.removeFavorite(e.target.parentElement.parentElement)


            //remvoe from local storage
            cocktailDB.removeFromDB(e.target.dataset.id);
        }
    })

}