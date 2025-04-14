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
let allergenAndContains = document.getElementById("allergen-and-contains");

// similar result
let simres1 = document.getElementById("simres-1");
let simres2 = document.getElementById("simres-2");
let simres3 = document.getElementById("simres-3");
let simres4 = document.getElementById("simres-4");
let simres5 = document.getElementById("simres-5");

// deprecated
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

let allergenSubstitutes = document.getElementById("allergen-substitutes");
let allergenSubstitutesVisibility = document.getElementById("allergen-substitutes-visibility");
let dietaryRestrictionsHeader = document.getElementById("dietary-restrictions-header");
let dietaryRestrictions = document.getElementById("dietary-restrictions");
let yourRestrictions = document.getElementById("your-restrictions");

function toggleDarkModeResults() {
    const body = document.body;

    try {
        let containerResults = document.getElementsByClassName("container-results")[0];
        let predictions = document.getElementsByClassName("predictions")[0];
        let nfTable = document.getElementsByClassName("nf")[0];
        let nfBars = document.getElementsByClassName("nf-bar");

        containerResults.classList.toggle("dark-mode");
        predictions.classList.toggle("dark-mode");
        nfTable.classList.toggle("dark-mode");
        for (let i = 0; i < nfBars.length; i++) { nfBars[i].classList.toggle("dark-mode"); }
    } catch (error) {
        console.error("NOT OK");
    }
    
    body.classList.toggle("dark-mode");
    const darkModeToggle = document.querySelector(".dark-mode-toggle");
    const toggleIcon = darkModeToggle.querySelector(".toggle-icon");
    const modeText = darkModeToggle.querySelector(".mode-text");
    const isDarkMode = body.classList.contains("dark-mode");

    if (sessionStorage.getItem("mode") == "dark-mode") {
        toggleIcon.innerHTML = "🌙";
        modeText.innerHTML = "<b>Dark　</b>";
        sessionStorage.setItem("mode", "light-mode");
    } else {
        toggleIcon.innerHTML = "🔆";
        modeText.innerHTML = "<b>Light　</b>";
        sessionStorage.setItem("mode", "light-mode");
        body.classList.toggle(sessionStorage.getItem("mode"));
        sessionStorage.setItem("mode", "dark-mode");
    }
}

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
// automatically hide this section on page load
showHideOtherPredictions();

// deprecated holdout but don't remove
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

function showHideAllergenSubstitutes() {
    var showHideAllergenSubstitutes = document.getElementById("show-hide-allergen-substitutes");
    if (allergenSubstitutes.style.display == "none") {
        allergenSubstitutes.style.display = "block";
        showHideAllergenSubstitutes.innerHTML = "(hide)";
    } else {
        allergenSubstitutes.style.display = "none";
        showHideAllergenSubstitutes.innerHTML = "(show)";
    }
}
showHideAllergenSubstitutes();

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

    if (res["user-age"])
        yourAge = yourAge + `<b>Your age</b>: <span style='color: #3cbd44;'><b>${res["user-age"]}</b></span>`;
    else
        yourAge = yourAge + `<b>Your age</b>: <span style='color: red;'><b>none provided</b></span>`;

    let allergiesString = "";
    let restrictionsString = "";
    let othersString = "";

    for (key in resKeys) {
        if (resKeys[key].startsWith("res-"))
            restrictionsString = restrictionsString + resKeys[key].substring(4) + ", ";
        if (resKeys[key].startsWith("ale-")) {
            if (resKeys[key].includes("n-s"))
                allergiesString = allergiesString + resKeys[key].substring(4).replace("n-s", "n s") + ", ";
            else if (resKeys[key].includes("e-n"))
                allergiesString = allergiesString + resKeys[key].substring(4).replace("e-n", "e n") + ", ";
            else
                allergiesString = allergiesString + resKeys[key].substring(4) + ", ";
        }
        if (resKeys[key].startsWith("oth-")) {
            if (resKeys[key] == "oth-lactose")
                othersString = othersString + "lactose intolerant, ";
            else
                othersString = othersString + resKeys[key].substring(4) + ", ";
        }
    }

    try {
        restrictionsString = restrictionsString.slice(0, -2);
        allergiesString = allergiesString.slice(0, -2);
        othersString = othersString.slice(0, -2);
    } catch (error) {
        console.log(error);
    }

    if (restrictionsString === "")
        restrictionsString = "none";
    if (allergiesString === "")
        allergiesString = "none";
    if (othersString === "")
        othersString = "none";

    yourRestrictions.innerHTML = `${yourAge}<br><b>Your restrictions</b>: <span style='color: #3cbd44;'><b>${restrictionsString}</b></span><br><b>Your allergies</b>: <span style='color: #3cbd44;'><b>${allergiesString}</b></span><br><b>Others</b>: <span style='color: #3cbd44;'><b>${othersString}</b></span><br><br>`

    let resArray = [
        "res-beef",
        "res-chicken",
        "res-fish",
        "res-pork",
        "res-sugar"
    ];

    let aleArray = [
        "ale-crustacean-shellfish",
        "ale-eggs",
        "ale-fish",
        "ale-gluten",
        "ale-milk",
        "ale-mollusks",
        "ale-peanuts",
        "ale-sesame",
        "ale-soybeans",
        "ale-tree-nuts",
    ];

    let othArray = [
        "oth-diabetic",
        "oth-lactose"
    ];

    let aleSubstitutesDict = {
        "ale-eggs": "<h2 style='list-style-type:none'>Egg Substitutes</h2><ul><li>Applesauce</li><li>Mashed banana</li><li>Ground flaxseed</li><li>Yogurt (contains milk)</li><li>Silken tofu (contains soy)</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://www.pccmarkets.com/taste/2013-03/egg_substitutes' target='_blank' rel='noreferrer'>PCC Markets</a></li></ul><br>",
        "ale-milk": "<h2 style='list-style-type:none'>Milk Substitutes</h2><ul><li>Coconut milk</li><li>Oat milk</li><li>Rice milk</li><li>Cashew milk</li><li>Quinoa milk</li><li>Soy milk (contains soy)</li><li>Almond milk (contains nuts)</li><li>Cashew milk (contains nuts)</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://www.healthline.com/nutrition/best-milk-substitutes#TOC_TITLE_HDR_11' target='_blank' rel='noreferrer'>Healthline</a></li><li><a href='https://www.nhs.uk/live-well/eat-well/food-types/milk-and-dairy-nutrition/#:~:text=soya%2C%20rice%2C%20oat%2C%20almond,alternatives%20to%20yoghurt%20and%20cheese' target='_blank' rel='noreferrer'>NHS UK</a></li></ul><br>",
        "ale-peanuts": "<h2 style='list-style-type:none'>Peanut Substitutes</h2><ul><li>Seeds</li><li>Beans</li><li>Pretzels (may contain gluten)</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://kidswithfoodallergies.org/recipes-diet/recipe-substitutions/substitutions-for-peanuts-and-tree-nuts/#:~:text=Seeds%20%E2%80%93%20nut%2Dfree%20source,Updated%20December%202022.' target='_blank' rel='noreferrer'>Kids With Food Allergies</a></li><li><a href='https://www.allergyclinical.com/blog/safe-substitutes-for-nut-allergies/#:~:text=Sunflower%20or%20Pumpkins%20Seeds,for%20those%20with%20peanut%20allergies.' target='_blank' rel='noreferrer'>Allergy Clinical</a></li></ul><br>",
        "ale-tree-nuts": "<h2 style='list-style-type:none'>Tree Nut Substitutes</h2><ul><li>Beans</li><li>Pretzels</li><li>Dried fruit</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://kidswithfoodallergies.org/recipes-diet/recipe-substitutions/substitutions-for-peanuts-and-tree-nuts/#:~:text=Seeds%20%E2%80%93%20nut%2Dfree%20source,Updated%20December%202022.' target='_blank' rel='noreferrer'>Kids With Food Allergies</a></li><li><a href='https://www.allergyclinical.com/blog/safe-substitutes-for-nut-allergies/#:~:text=Sunflower%20or%20Pumpkins%20Seeds,for%20those%20with%20peanut%20allergies.' target='_blank' rel='noreferrer'>Allergy Clinical</a></li></ul><br>",
        "ale-soybeans": "<h2 style='list-style-type:none'>Soybeans/Soy Substitutes</h2><ul><li>Olive brine/balsamic vinegar/soy-free miso sauce FOR soy sauce</li><li>Canola oil/olive oil FOR soy oil</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://www.webmd.com/allergies/food-substitutes-soy-allergy' target='_blank' rel='noreferrer'>WebMD</a></li></ul><br>",
        "ale-gluten": "<h2 style='list-style-type:none'>Gluten Substitutes</h2><ul><li>Amaranth</li><li>Arrowroot</li><li>Buckwheat</li><li>Corn</li><li>Flaxseed</li><li>Millet</li><li>Quinoa</li><li>Sorghum</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/gluten-free-diet/art-20048530' target='_blank' rel='noreferrer'>Mayo Clinic</a></li></ul><br>",
        "ale-sesame": "<h2 style='list-style-type:none'>Sesame Substitutes</h2><ul><li>Other seeds such as flaxseed, pumpkin seeds, sunflower seeds, chia, poppy seeds/chia seeds</li><li>Olive oil, avocado oil, grapeseed oil, walnut oil (contains nuts), peanut oil (contains nuts) FOR sesame oil</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://www.webmd.com/allergies/sesame-allergy' target='_blank' rel='noreferrer'>WebMD</a></li><li><a href='https://www.healthline.com/nutrition/sesame-oil-substitute' target='_blank' rel='noreferrer'>Healthline</a></li></ul><br>",
        "ale-fish": "<h2 style='list-style-type:none'>Fish Substitutes</h2><ul><li>Tofu/tempeh (might contain soy)</li><li>Jackruit</li><li>Hearts of palm/banana blossom</li><li>Grains (might contain gluten)</li><li>Beans</li><li>Lentils</li><li>Chickpeas</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://www.mylittlepiccolo.com/weaning-hub-post/fish-and-shellfish-allergy-awareness-what-parents-need-to-know-alternatives/#:~:text=If%20your%20child%20has%20a,plan%20that%20meets%20these%20needs.' target='_blank' rel='noreferrer'>My Little Piccolo</a></li><li><a href='https://www.medicalnewstoday.com/articles/fish-substitute#summary' target='_blank' rel='noreferrer'>Medical News Today</a></li></ul><br>",
        "ale-crustacean-shellfish": "<h2 style='list-style-type:none'>Shellfish Substitutes</h2><ul><li>Lean meats such as chicken/beef/pork</li><li>Tofu/tempeh (plant-based, may contain soy)</li><li>Grains (may contain gluten)</li><li>Beans</li><li>Peas</li><li>Lentils</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://lacrosseallergy.com/resources/diet-and-nutrition-counseling/allergen-free-diets/shellfish-free-diet/#:~:text=Nutrition%20Swap,%2C%20fin%20fish%2C%20eggs%2C%20dairy' target='_blank' rel='noreferrer'>La Crosse Allergy</a></li><li><a href='https://www.chla.org/sites/default/files/atoms/files/CHLA-Shellfish-Free-Diet-2016.pdf' target='_blank' rel='noreferrer'>Children's Hospital Los Angeles</a></li></ul><br>",
        "ale-mollusks": "<h2 style='list-style-type:none'>Mollusk Substitutes</h2><ul><li>Teriyaki/fish sauce/worcestershire sauce (contains fish) FOR oyster sauce</li><li>Oyster mushrooms</li></ul><h2 style='list-style-type:none'>Sources</h2><ul><li><a href='https://erudus.com/editorial/the-food-agenda/allergen-deep-dive-molluscs#:~:text=What%27s%20an%20alternative%20for%20Molluscs,makes%20them%20incredibly%20similar%20looking.' target='_blank' rel='noreferrer'>Erudus</a></li></ul><br>",
    };

    // ale
    // as suggested, should be prioritized first and be visible immediately on results display
    let allergenUl = document.createElement("ul");
    let allergenSubstitutesSpan = document.createElement("span");
    allergenUl.style = "list-style-type: none;";
    let showAllergenBool = false;
    
    for (var prop in aleArray) {
        if (containsProperty(aleArray[prop])) {
            let e = document.createElement("li");
            e.innerHTML = `<b><span style="color: #3cbd44;">${aleArray[prop].substring(4)}</span></b>`;
            allergenUl.append(e);

            allergenSubstitutesVisibility.style.display = "block";
            let f = document.createElement("span");
            f.innerHTML = aleSubstitutesDict[aleArray[prop]];
            allergenSubstitutesSpan.append(f);

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
        allergenAndContains.appendChild(resultList);
    }

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
        allergenAndContains.appendChild(resultList);
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
        allergenAndContains.innerHTML = "";
        allergenSubstitutes.innerHTML = "";
        allergenAndContains.appendChild(resultList);
        allergenSubstitutes.appendChild(allergenSubstitutesSpan);
    } else {
        noResultsSpan = document.createElement("span");
        noResultsSpan.innerHTML = "";
        allergenAndContains.innerHTML = "";
        allergenSubstitutes.innerHTML = "";
        allergenAndContains.appendChild(noResultsSpan);
        allergenSubstitutes.appendChild(noResultsSpan);
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
    if (res["user-age"] < 17)
        exDiv.innerHTML = `<b>There are no exercise recommendations for your age.</b><br><br>`;
    else if (res["user-age"] <= 29)
        exDiv.innerHTML = fs(`${exList[exnumViewEx - 1]["young"]}`);
    else if (res["user-age"] >= 30 && res["user-age"] <= 45)
        exDiv.innerHTML = fs(`${exList[exnumViewEx - 1]["middle"]}`);
    else if (res["user-age"] >= 46 && res["user-age"] <= 60)
        exDiv.innerHTML = fs(`${exList[exnumViewEx - 1]["old"]}`);
    else if (res["user-age"] > 60)
        exDiv.innerHTML = `<b>There are no exercise recommendations for your age.</b><br><br>`;
    else
        exDiv.innerHTML = `<b>No age provided.</b><br><br>`;

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

    detailsButtons = document.getElementsByClassName("details-button");

    for (let i = 0; i < detailsButtons.length; i++)
        detailsButtons[i].style.visibility = "visible";
    detailsButtons[exnum - 1].style.visibility = "hidden";

    // name of the food
    // replaceAll() is needed to actually render it as HTML
    ingredientsAndRecipe.innerHTML = recipe.innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    // header for the list of ingredients and recipe
    ingredientsAndRecipeHeader.innerHTML = `Ingredients and recipe for: ${prediction.innerHTML}</b>`;

    // similar food
    // sselesu
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

    detailsButtons = document.getElementsByClassName("details-button");
    for (let i = 0; i < detailsButtons.length; i++)
        detailsButtons[i].style.visibility = "visible";
    detailsButtons[exnum - 1].style.visibility = "hidden";

    if (prediction.innerHTML == "none") {
        let containerResults = document.getElementsByClassName("container-results")[0];
        let predictions = document.getElementsByClassName("predictions")[0];
        predictions.style.display = "none";
        let solid = document.getElementsByClassName("solid");
        for (let i = 0; i < solid.length; i++)
            solid[i].style.display = "none";
        allergenAndContains.style.display = "none";
        ingredientsAndRecipeHeader.style.display = "none";
        ingredientsAndRecipe.style.display = "none";
        allergenSubstitutesVisibility.style.display = "none";
        dietaryRestrictionsHeader.style.display = "none";
        yourRestrictions.style.display = "none";
        dietaryRestrictions.style.display = "none";

        let goBackAnchor = document.getElementById("go-back-anchor");
        goBackAnchor.remove();

        let noFood = document.createElement("p");
        noFood.innerHTML = "<br><br><b style='color: red;'>No food detected in the image.</b><br><br>It seems that the image you provided does not contain any recognizable food items.<br>Please go back and try again with a different image that shows food.<br><br><br><br>";
        noFood.style.textAlign = "justify";
        containerResults.append(noFood);
        containerResults.appendChild(goBackAnchor);
    }
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
