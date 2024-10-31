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

let ex1JSONString = document.getElementById("ex1");
let ex2JSONString = document.getElementById("ex2");
let ex3JSONString = document.getElementById("ex3");
let ex4JSONString = document.getElementById("ex4");
let ex5JSONString = document.getElementById("ex5");

let dietaryRestrictions = document.getElementById("dietary-restrictions");
let yourRestrictions = document.getElementById("your-restrictions");

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
        yourRestrictions.style.display = "block";
        showHidedietaryRestrictions.innerHTML = "(hide)";
    } else {
        dietaryRestrictions.style.display = "none";
        yourRestrictions.style.display = "none";
        showHidedietaryRestrictions.innerHTML = "(show)";
    }
}
showHideDietaryRestrictions();

function containsProperty(prop, pred) {
    return (res.hasOwnProperty(prop) && resJSON[pred.innerHTML.replaceAll(" ", "_")].includes(prop));
}

function viewRestrictions(pred, res) {
    let resJSON = JSON.parse(resJSONString.innerHTML.replaceAll("'", '"'));
    let resultList = document.createElement("ul");
    resultList.style = "list-style-type: none;";
    let predString = pred.innerHTML.replaceAll(" ", "_");
    let resKeys = Object.keys(res);

    // clear this every time the button is clicked/tapped
    dietaryRestrictions.innerHTML = "";

    function containsProperty(prop) {
        return res.hasOwnProperty(prop) && resJSON[predString].includes(prop);
    }

    let yourAge = "";

    if (res["user-age"]) {
        // REWRITE THE INGREDIENTS AND STEPS AS AN ORDERED LIST
        yourAge = yourAge + `<b>Your age</b>: <span style='color: #3cbd44;'><b>${res["user-age"]}</b></span>`;
    } else {
        yourAge = yourAge + `<b>Your age</b>: <span style='color: red;'><b>none provided</b></span>`;
    }

    let allergiesString = "";
    let restrictionsString = "";
    let othersString = "";

    for (key in resKeys) {
        if (resKeys[key].startsWith("res-")) {
            restrictionsString = restrictionsString + resKeys[key].substring(4) + ", ";
        } if (resKeys[key].startsWith("ale-")) {
            allergiesString = allergiesString + resKeys[key].substring(4) + ", ";
        } if (resKeys[key].startsWith("oth-")) {
            if (resKeys[key] == "oth-lactose") {
                othersString = othersString + "lactose intolerant, ";
            } else {
                othersString = othersString + resKeys[key].substring(4) + ", ";
            }
        }
    }

    try {
        restrictionsString = restrictionsString.slice(0, -2);
        allergiesString = allergiesString.slice(0, -2);
        othersString = othersString.slice(0, -2);
    } catch (error) {
        console.log(error);
    }

    if (restrictionsString === "") {
        restrictionsString = "none";
    } if (allergiesString === "") {
        allergiesString = "none";
    } if (othersString === "") {
        othersString = "none";
    }

    yourRestrictions.innerHTML = `${yourAge}<br><b>Your restrictions</b>: <span style='color: #3cbd44;'><b>${restrictionsString}</b></span><br><b>Your allergies</b>: <span style='color: #3cbd44;'><b>${allergiesString}</b></span><br>Others: <span style='color: #3cbd44;'><b>${othersString}</b></span><br><br>`

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
            e.innerHTML = `<b><span style="color: #3cbd44;">${resArray[prop].substring(4)}</span></b>`;
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
            let e = document.createElement("li");
            e.innerHTML = `<b><span style="color: #3cbd44;">${aleArray[prop].substring(4)}</span></b>`;
            allergenUl.append(e);
            showAllergenBool = true;
        }
    }

    if (showAllergenBool) {
        let allergenHeader = document.createElement("li");
        allergenHeader.innerHTML = "<h3>Allergen information:</h3>";
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
                e.innerHTML = "<br><ul><li>This food is not suitable for individuals with <b>diabetes</b> due to its <b>high content of refined carbohydrates and sugars</b>, which can lead to significant spikes in blood glucose levels. Consuming such foods may interfere with blood sugar management and increase the risk of complications associated with diabetes.</li><li>Individuals with diabetes should consider opting for whole grains, non-starchy vegetables, and lean proteins that have a lower glycemic index and provide more sustained energy without causing drastic changes in blood sugar levels. Always consult with a healthcare provider or nutritionist for personalized dietary advice.</li></ul>";
                resultList.append(e);
            } else if (othArray[prop] === "oth-lactose") {
                let e = document.createElement("li");
                e.innerHTML = "<br><ul><li>This food contains <b>lactose</b>, a natural sugar <b>found in milk and dairy products</b>, which may cause adverse reactions in individuals who are lactose intolerant. Consumption of this food can lead to discomfort and digestive issues for those affected.</li><li>Individuals who are lactose intolerant should seek lactose-free options or dairy substitutes such as almond milk, soy milk, coconut yogurt, or other plant-based products. Always check ingredient labels for hidden sources of lactose and consult with a healthcare provider for personalized dietary recommendations.</li></ul>";
                resultList.append(e);
            } else {
                let e = document.createElement("li");
                e.innerHTML = `<br><b>Default others: ${othArray[prop].substring(4)}</b>`;
                resultList.append(e);
            }
        }
    }

    if (resultList.hasChildNodes()) {
        dietaryRestrictions.appendChild(resultList);
    } else {
        noResultsSpan = document.createElement("span");
        noResultsSpan.innerHTML = "<b>There are no options provided by the user.</b><br>";
        dietaryRestrictions.appendChild(noResultsSpan);
    }
}

function viewEx(exnumViewEx, res) {
    let ex1JSON = JSON.parse(ex1JSONString.innerHTML);
    let ex2JSON = JSON.parse(ex2JSONString.innerHTML);
    let ex3JSON = JSON.parse(ex3JSONString.innerHTML);
    let ex4JSON = JSON.parse(ex4JSONString.innerHTML);
    let ex5JSON = JSON.parse(ex5JSONString.innerHTML);

    let exList = [ex1JSON, ex2JSON, ex3JSON, ex4JSON, ex5JSON];

    let exDiv = document.createElement("div");

    function fs(s) {
        return s.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    }

    // AGE
    // 17-29, 30-45, and 46-60
    if (res["user-age"] < 17) {
        exDiv.innerHTML = `<b>There are no exercise recommendations for your age.</b><br><br>`;
    } else if (res["user-age"] <= 29) {
        exDiv.innerHTML = fs(`${exList[exnumViewEx - 1]["young"]}`);
    } else if (res["user-age"] >= 30 && res["user-age"] <= 45) {
        exDiv.innerHTML = fs(`${exList[exnumViewEx - 1]["middle"]}`);
    } else if (res["user-age"] >= 46 && res["user-age"] <= 60) {
        exDiv.innerHTML = fs(`${exList[exnumViewEx - 1]["old"]}`);
    } else if (res["user-age"] > 60) {
        exDiv.innerHTML = `<b>There are no exercise recommendations for your age.</b><br><br>`;
    } else {
        exDiv.innerHTML = `<b>No age provided.</b><br><br>`;
    }

    dietaryRestrictions.appendChild(document.createElement("br"))
    dietaryRestrictions.appendChild(exDiv);
}

function viewDetails(prediction, recipe, simres, exnum) {
    // you can use `prediction` as key for the JSON

    function csfp(pos, simres) {
        // compute similar foods percentages
        let lf = 100000000;
        let sf = 1000000;
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
    resUser = JSON.parse(hiddenOutputForms.innerHTML.replaceAll("'", '"'));

    viewRestrictions(prediction, resUser);
    viewEx(parseInt(exnum), resUser);

    similar1.innerHTML = fsfp(1, s);
    similar2.innerHTML = fsfp(2, s);
    similar3.innerHTML = fsfp(3, s);
    similar4.innerHTML = fsfp(4, s);
    similar5.innerHTML = fsfp(5, s);
}

function z(kl) {
    let i, k = "";
    let c = "";
    for (i = 0x0021; i < 0x007F; i++) {c = c + String.fromCharCode(i);}
    for (i = 0; i < kl; i++) k += c.substr(Math.floor((Math.random() * c.length) + 1), 1);
    return k;
}

for (i = 0; i < 100; i++) console.log(z(Math.floor(Math.random() * 500) + 1));

viewDetails(pred1, recipe1, simres1, 1);
