    // event handler and fetch data
    const searchBttn = document.getElementById('searchBttn');
    searchBttn.addEventListener('click', function(){
        const mainContainer = document.getElementById('MainContainer');
        const searchingFood = document.getElementById('search-foodd').value;
        document.getElementById("search-foodd").value = "";
                
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchingFood}`)
        .then(response => response.json())
        .then(data => {
            if(searchingFood == ''){
                alert('Enter a food name for searching your desired item');
            }else{
                displayFItems(data.meals);
            }
        });
    });

       // displaying searched items using foreach loop
    const displayFItems = meals =>{
        let foodBank = document.getElementById('foodBanksss');
        foodBank.innerHTML="";
        meals.forEach(meal => {
            const foodDivB = document.createElement('div');
            foodDivB.className = 'food';
            const foodInfo = `
                <div onclick= "foodIngredients('${meal.idMeal}')">
                    <img class="food-image" src="${meal.strMealThumb}">
                    <h4>${meal.strMeal}</h4>
                </div>
            `;
            foodDivB.innerHTML = foodInfo;
            foodBank.appendChild(foodDivB);
        });
    };
    
    const foodIngredients = details => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`)
        .then(response => response.json())
        .then(data => displayFoodIngredients(data.meals[0]));
    };


    // displaying food ingredients
    const displayFoodIngredients = meal =>{
        const inGreDientsDiv = document.getElementById('ingre');
        inGreDientsDiv.innerHTML = `
            <div class= "description">
                <img class="food-image selected-Image" src="${meal.strMealThumb}">
                <h4>${meal.strMeal}</h4>
                <ul id="list-item">
                
                </ul>
            </div>
        `;
        const ul = document.getElementById('list-item');
        for (let i = 0; i < 21; i++) {
            let ingredient = 'strIngredient' + i;
            let quantity = 'strMeasure' + i;
            const li = document.createElement('li');
            li.innerHTML = `
                <li></i>${meal[quantity]} ${meal[ingredient]}</li>
            `;      
            ul.appendChild(li);  
        }
    };

    