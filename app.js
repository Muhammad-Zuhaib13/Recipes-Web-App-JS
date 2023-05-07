(async function () {
  const response = await fetch("./recipes.json");
  const recipes = await response.json();
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const recipeList = document.getElementById("recipe-list");
  const recipeDetailsContainer = document.getElementById(
    "recipe-details-container"
  );

  const loadRecipeDetails = (recipe) => {
    console.log(recipe);
    searchInput.value = "";
    recipeDetailsContainer.innerHTML = `
    <h2 class="title">${recipe.title}</h2>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients
      .map((ingredient) => {
        return "<li>" + ingredient + "</li>";
      })
      .join(" ")}
    </ul>
    <h3>Instructions</h3>
    <div>${recipe.instructions}</div>
    `;
  };
  const displaySearchResult = (searchResult) => {
    recipeList.innerHTML = "";
    searchResult.forEach((recipe) => {
      const li = document.createElement("li");
      const liItem = `
            <div class="title">${recipe.title}</div>
            <div class="description">${recipe.description}</div>
        `;
      li.innerHTML = liItem;
      li.addEventListener("click", () => loadRecipeDetails(recipe));
      recipeList.appendChild(li);
    });
  };
  const searchRecipes = (setQuery) => {
    const userQuery = setQuery.value.toLowerCase();
    const searchReults = recipes.filter((recipe) => {
      if (
        recipe.title.toLowerCase().includes(userQuery) ||
        recipe.ingredients.join(" ").toLowerCase().includes(userQuery)
      ) {
        return true;
      } else {
        return false;
      }
    });
    displaySearchResult(searchReults);
    console.log(searchReults);
  };

  searchButton.addEventListener("click", () => searchRecipes(searchInput));
})();
