class CocktailDB {

    //save the receipes into local storage
    saveIntoDB(drink){
        const drinks = this.getFromDB();
    
        drinks.push(drink);

        //add the new array into the local storage

        localStorage.setItem('drinks', JSON.stringify(drinks));

    }

    //removes element from the local storage
    removeFromDB(id){
        const drinks = this.getFromDB();

        //loop
        drinks.forEach((drink, index) => {
            if(id === drink.id){
                drinks.splice(index, 1);
            }
        });
        //Set the array into local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    //return recipes from storage
    getFromDB(){
        let drinks;
        
        //check from localstorage
        if(localStorage.getItem('drinks') === null){
            drinks = [];

        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }
}