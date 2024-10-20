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

// similar result
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

let hiddenOutputForms = document.getElementById("hidden-output-forms");
let resJSONString = document.getElementById("res");

let dietaryRestrictions = document.getElementById("dietary-restrictions");

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

function showHideDietaryRestrictions() {
    var showHidedietaryRestrictions = document.getElementById("show-hide-dietary-restrictions");
    if (dietaryRestrictions.style.display == "none") {
        dietaryRestrictions.style.display = "block";
        showHidedietaryRestrictions.innerHTML = "(hide)";
    } else {
        dietaryRestrictions.style.display = "none";
        showHidedietaryRestrictions.innerHTML = "(show)";
    }
}
showHideDietaryRestrictions();

// do something similar to dietary preferences
// showHideDietaryPreferences();

function containsProperty(prop, pred) {
    return (res.hasOwnProperty(prop) && resJSON[pred.innerHTML.replaceAll(" ", "_")].includes(prop));
}

function viewRestrictions(pred, res) {
    // do something like
    // if some keys exist in `res` that res.json has for the current food
    // display something

    let resJSON = JSON.parse(resJSONString.innerHTML.replaceAll("'", '"'));
    let resultList = document.createElement("list");
    let predString = pred.innerHTML.replaceAll(" ", "_");

    // clear this every time the button is clicked/tapped
    dietaryRestrictions.innerHTML = "";

    // AGE TEST
    // think of something to do with the age variable
    if (res["user-age"]) {
        console.log(res["user-age"]);
        // const spanAge = document.createTextNode();
        // let ageResult = `<b>AGE TEST ${res["user-age"]}</b>`;
        // resultList.innerHTML = resultList.innerHTML + ageResult;
    } else {
        console.log("you provided no age value");
    }

    function containsProperty(prop) {
        return res.hasOwnProperty(prop) && resJSON[predString].includes(prop);
    }

    let resArray = [
        "res-beef",
        "res-chicken",
        "res-fish",
        "res-pork",
        "res-sugar"
    ];

    let aleArray = [
        "ale-eggs",
        "ale-milk",
        "ale-nuts",
        "ale-shellfish",
        "ale-soy",
        "ale-wheat"
    ];

    let othArray = [
        "oth-diabetic",
        "oth-lactose"
    ];

    // res
    let restrictionUl = document.createElement("ul");
    restrictionUl.style = "list-style-type: none;";
    // the only time this will remain false is if the for loop matches no properties
    let showRestrictionBool = false;

    for (var prop in resArray) {
        if (containsProperty(resArray[prop])) {
            let e = document.createElement("li");
            e.innerHTML = `<b><span style="color: red;">${resArray[prop].substring(4)}</span></b>`;
            restrictionUl.append(e);
            showRestrictionBool = true;
        }
    }

    if (showRestrictionBool) {
        let restrictionHeader = document.createElement("li");
        restrictionHeader.innerHTML = "<h3>This product contains:</h3>";
        resultList.appendChild(restrictionHeader);
        let liContainingUl = document.createElement("li")
        liContainingUl.style = "list-style-type: none;";
        liContainingUl.appendChild(restrictionUl);
        resultList.appendChild(liContainingUl);
        dietaryRestrictions.appendChild(resultList);
    } else {
        console.log("NONE");
    }

    /*
    MAKE A PROPERTY THAT CONTAINS ALL OPTIONS FOR DEBUGGING PURPOSES
    DEBUG
    "ice_cream":["res-sugar", "ale-milk", "ale-eggs", "ale-wheat"],
    ORIGINAL
    "ice_cream":["res-sugar", "ale-milk"],
    */

    // ale
    let allergenUl = document.createElement("ul");
    allergenUl.style = "list-style-type: none;";
    let showAllergenBool = false;
    
    for (var prop in aleArray) {
        if (containsProperty(aleArray[prop])) {
            console.log(containsProperty(aleArray[prop]), prop);
            let e = document.createElement("li");
            e.innerHTML = `<b><span style="color: red;">${aleArray[prop].substring(4)}</span></b>`;
            allergenUl.append(e);
            showAllergenBool = true;
        }
    }

    if (showAllergenBool) {
        let allergenHeader = document.createElement("li");
        allergenHeader.innerHTML = "<h3>Allergen information. This food contains:</h3>";
        resultList.appendChild(allergenHeader);
        let liContainingUl = document.createElement("li")
        liContainingUl.style = "list-style-type: none;";
        liContainingUl.appendChild(allergenUl);
        resultList.appendChild(liContainingUl);
        dietaryRestrictions.appendChild(resultList);
    } else {
        console.log("NONE");
    }

    // others
    for (var prop in othArray) {
        if (containsProperty(othArray[prop])) {
            if (othArray[prop] === "oth-diabetic") {
                let e = document.createElement("li");
                e.innerHTML = "<b>This product is not suitable for people with diabetes.</b>";
                resultList.append(e);
            } else if (othArray[prop] === "oth-lactose") {
                let e = document.createElement("li");
                e.innerHTML = "<b>This product contains milk, and should not be consumed by people who are lactose intolerant.</b>";
                resultList.append(e);
            } else {
                let e = document.createElement("li");
                e.innerHTML = `<b>Default others: ${othArray[prop].substring(4)}</b>`;
                resultList.append(e);
            }
        }
    }

    dietaryRestrictions.appendChild(resultList);
}

function viewDetails(prediction, recipe, simres) {
    // you can use `prediction` as key for the JSON?

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

    // name of the food
    // replaceAll() is needed to actually render it as HTML
    ingredientsAndRecipe.innerHTML = recipe.innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    // header for the list of ingredients and recipe
    ingredientsAndRecipeHeader.innerHTML = `Ingredients and recipe for: ${prediction.innerHTML}</b>`;

    // similar food (nlp)
    similarFoodsHeader.innerHTML = `Foods similar to ${prediction.innerHTML} (based on the similarity of the recipes):`;

    s = JSON.parse(simres.innerHTML);

    // PREFERENCES PROTOTYPE
    // MAKE A FOOD-TAGS JSON AND LOAD IT HERE
    resUser = JSON.parse(hiddenOutputForms.innerHTML.replaceAll("'", '"'));

    viewRestrictions(prediction, resUser);

    // defenestrate r & s dot jason from torvalds-land eyes

    similar1.innerHTML = fsfp(1, s);
    similar2.innerHTML = fsfp(2, s);
    similar3.innerHTML = fsfp(3, s);
    similar4.innerHTML = fsfp(4, s);
    similar5.innerHTML = fsfp(5, s);
}

viewDetails(pred1, recipe1, simres1);
