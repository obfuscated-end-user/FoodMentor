// DECLARE ALL OF THESE UP HERE OR EVERYTHING BREAKS
// names of the predicted food items, e.g. "ice cream", "tapa", "adobo", etc.
let pred1 = document.getElementById("pred-1");
let pred2 = document.getElementById("pred-2");
let pred3 = document.getElementById("pred-3");
let pred4 = document.getElementById("pred-4");
let pred5 = document.getElementById("pred-5");

// recipes of the predictions, hidden from view
let recipe1 = document.getElementById("recipe-1");
let recipe2 = document.getElementById("recipe-2");
let recipe3 = document.getElementById("recipe-3");
let recipe4 = document.getElementById("recipe-4");
let recipe5 = document.getElementById("recipe-5");

let ingredientsAndRecipeHeader = document.getElementById("ingredients-and-recipe-header");
let ingredientsAndRecipe = document.getElementById("ingredients-and-recipe");

// similar result (nlp)
let simres1 = document.getElementById("simres-1");
let simres2 = document.getElementById("simres-2");
let simres3 = document.getElementById("simres-3");
let simres4 = document.getElementById("simres-4");
let simres5 = document.getElementById("simres-5");

let similarFoodsHeader = document.getElementById("similar-foods-header");
let similarFoods = document.getElementById("similar-foods");

let similar1 = document.getElementById("similar-1");
let similar2 = document.getElementById("similar-2");
let similar3 = document.getElementById("similar-3");
let similar4 = document.getElementById("similar-4");
let similar5 = document.getElementById("similar-5");

function showHideOtherPredictions() {
    var otherPredictions = document.getElementById("other-predictions");
    var showHideOtherPredictionsAnchor = document.getElementById("show-hide-other-predictions");
    if (otherPredictions.style.display == "none") {
        otherPredictions.style.display = "block";
        showHideOtherPredictionsAnchor.innerHTML = "(hide)";
    } else {
        otherPredictions.style.display = "none";
        showHideOtherPredictionsAnchor.innerHTML = "(show)";
    }
}
showHideOtherPredictions();

function showHideSimilarFoods() {
    var similarFoods = document.getElementById("similar-foods");
    var showHideSimilarFoodsAnchor = document.getElementById("show-hide-similar-foods");
    if (similarFoods.style.display == "none") {
        similarFoods.style.display = "block";
        showHideSimilarFoodsAnchor.innerHTML = "(hide)";
    } else {
        similarFoods.style.display = "none";
        showHideSimilarFoodsAnchor.innerHTML = "(show)";
    }
}
showHideSimilarFoods();

function csfp(pos, simres) {
    // compute similar foods percentages
    let lf = 100000000; // large factor
    let sf = 1000000;   // small factor
    return Math.round((simres["scores"][pos] + Number.EPSILON) * lf) / sf;
}

function fsfp(pos, simres) {
    // format similar foods percentages
    y = pos - 1;
    return `<h3>${pos}. ${simres["food"][y]}</h3>similarity: ${csfp(y, simres)}%`;
}

function viewDetails(prediction, recipe, simres) {
    // you can use `prediction` as key for the JSON?

    // name of the food
    // replaceAll() is needed to actually render it as HTML
    ingredientsAndRecipe.innerHTML = recipe.innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    // header for the list of ingredients and recipe
    ingredientsAndRecipeHeader.innerHTML = `Ingredients and recipe for: ${prediction.innerHTML}</b>`;

    // similar food (nlp)
    similarFoodsHeader.innerHTML = `Foods similar to ${prediction.innerHTML} (based on the similarity of the recipes):`;

    s = JSON.parse(simres.innerHTML);

    similar1.innerHTML = fsfp(1, s);
    similar2.innerHTML = fsfp(2, s);
    similar3.innerHTML = fsfp(3, s);
    similar4.innerHTML = fsfp(4, s);
    similar5.innerHTML = fsfp(5, s);
}

viewDetails(pred1, recipe1, simres1);
