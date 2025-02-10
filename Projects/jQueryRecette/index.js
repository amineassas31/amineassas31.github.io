$(document).ready(function () {
    const API_URL = "https://www.themealdb.com/api/json/v1/1/";


    fetchCategories();
    fetchAreas();
    fetchIngredients();

    $("#searchBtn").click(function () {
        let query = $("#searchInput").val().trim();
        if (query) {
            fetchMeals(`${API_URL}search.php?s=${query}`);
        }
    });


    $("#randomBtn").click(function () {
        fetchMeals(`${API_URL}random.php`);
    });


    $("#categorySelect").change(function () {
        let category = $(this).val();
        if (category) {
            fetchMeals(`${API_URL}filter.php?c=${category}`);
        }
    });


    $("#areaSelect").change(function () {
        let area = $(this).val();
        if (area) {
            fetchMeals(`${API_URL}filter.php?a=${area}`);
        }
    });


    $("#ingredientSelect").change(function () {
        let ingredient = $(this).val();
        if (ingredient) {
            fetchMeals(`${API_URL}filter.php?i=${ingredient}`);
        }
    });


    function fetchMeals(url) {
        $.getJSON(url, function (data) {
            if (data.meals) {
                displayMeals(data.meals);
            } else {
                $("#recipeContainer").html("<p class='text-center text-danger'>No recipes found.</p>");
            }
        });
    }


    function displayMeals(meals) {
        let html = "";
        meals.forEach(meal => {
            html += `
                <div class="col-md-4">
                    <div class="card mb-3">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h4 class="card-title">${meal.strMeal}</h4>
                            <h5 class="card-title">Country: ${meal.strArea}</h5>
                            <h5 class="card-title"><b>Instructions:</b></h5>
                            <p class="card-title">${meal.strInstructions}</p>
                            <button class="btn btn-info" onclick="viewRecipe(${meal.idMeal})">View Recipe</button>
                        </div>
                    </div>
                </div>`;
        });
        $("#recipeContainer").html(html);
    }


    function fetchCategories() {
        $.getJSON(`${API_URL}list.php?c=list`, function (data) {
            let options = '<option value="">Select a category</option>';
            data.meals.forEach(category => {
                options += `<option value="${category.strCategory}">${category.strCategory}</option>`;
            });
            $("#categorySelect").html(options);
        });
    }


    function fetchAreas() {
        $.getJSON(`${API_URL}list.php?a=list`, function (data) {
            let options = '<option value="">Select a cuisine</option>';
            data.meals.forEach(area => {
                options += `<option value="${area.strArea}">${area.strArea}</option>`;
            });
            $("#areaSelect").html(options);
        });
    }


    function fetchIngredients() {
        $.getJSON(`${API_URL}list.php?i=list`, function (data) {
            let options = '<option value="">Select an ingredient</option>';
            data.meals.forEach(ingredient => {
                options += `<option value="${ingredient.strIngredient}">${ingredient.strIngredient}</option>`;
            });
            $("#ingredientSelect").html(options);
        });
    }
});

function viewRecipe(mealId) {
    window.open(`https://www.themealdb.com/meal/${mealId}`, "_blank");
}
