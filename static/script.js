try {
    // checkboxes and radio buttons
    let presetNone = document.getElementById("preset-none")
    let presetVegan = document.getElementById("preset-vegan");
    let presetPescatarian = document.getElementById("preset-pescatarian");
    let presetMeatLover = document.getElementById("preset-meat-lover");

    let resPork = document.getElementById("res-pork");
    let resBeef = document.getElementById("res-beef");
    let resChicken = document.getElementById("res-chicken");
    let resFish = document.getElementById("res-fish");
    let resSugar = document.getElementById("res-sugar");
    let resNone = document.getElementById("res-none");

    let aleEggs = document.getElementById("ale-eggs");
    let aleMilk = document.getElementById("ale-milk");
    let alePeanuts = document.getElementById("ale-peanuts");
    let aleTreeNuts = document.getElementById("ale-tree-nuts");
    let aleCrustaceanShellfish = document.getElementById("ale-crustacean-shellfish");
    let aleSoybeans = document.getElementById("ale-soybeans");
    let aleGluten = document.getElementById("ale-gluten");
    let aleSesame = document.getElementById("ale-sesame");
    let aleFish = document.getElementById("ale-fish");
    let aleMollusks = document.getElementById("ale-mollusks");
    let aleNone = document.getElementById("ale-none");

    let othDiabetic = document.getElementById("oth-diabetic");
    let othLactose = document.getElementById("oth-lactose");
    let othNone = document.getElementById("oth-none");

    let checkBoxArray = [
        resBeef,
        resChicken,
        resFish,
        resPork,
        resSugar,
        aleEggs,
        aleMilk,
        alePeanuts,
        aleTreeNuts,
        aleSoybeans,
        aleGluten,
        aleSesame,
        aleFish,
        aleCrustaceanShellfish,
        aleMollusks,
        othDiabetic,
        othLactose
    ];

    const body = document.body;
    body.classList.toggle(sessionStorage.getItem("mode"));

    const submitButton = document.getElementById("submit-button");
    const imageForm = document.getElementById("image-form");
    const inputFile = document.querySelector("#file");
    const imgArea = document.querySelector(".img-area");
    const pageModeToggle = document.querySelector(".page-mode-toggle");
    const snapSection = document.querySelector(".snap-section");
    const diarySection = document.querySelector(".diary-section");

    window.addEventListener("load", function() {
        submitButton.disabled = true;
        inputFile.reset();
    });

    function toggleDarkModeHome() {
        try {
            let popup = document.getElementsByClassName("popup")[0];
            popup.classList.toggle("dark-mode");
        } catch (error) {
            console.error("move to results page first");
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

    function uncheckNone(col) {
        switch (col) {
            case 1: resNone.checked = false; break;
            case 2: aleNone.checked = false; break;
            case 3: othNone.checked = false; break;
            default: console.log("none specified");
        }
    }

    function uncheckOtherCheckboxes(col) {
        if (col == 1) {
            resPork.checked = false;
            resBeef.checked = false;
            resChicken.checked = false;
            resFish.checked = false;
            resSugar.checked = false;
            resNone.checked = true;
        } else if (col == 2) {
            aleEggs.checked = false;
            aleMilk.checked = false;
            aleTreeNuts.checked = false;
            aleCrustaceanShellfish.checked = false;
            aleSoybeans.checked = false;
            aleGluten.checked = false;
            aleNone.checked = true;
        } else if (col == 3) {
            othDiabetic.checked = false;
            othLactose.checked = false;
            othNone.checked = true;
        }
    }

    function toggleSections() {
        body.classList.toggle("diary-mode");
        const toggleIcon = pageModeToggle.querySelector(".toggle-icon");
        const modeText = pageModeToggle.querySelector(".mode-text");
        const isDiaryMode = body.classList.contains("diary-mode");

        if (isDiaryMode) {
            toggleIcon.innerHTML = "📖";
            modeText.innerHTML = "<b>Diary　</b>";
            snapSection.style.display = "none";
            diarySection.style.display = "flex";
        } else {
            toggleIcon.innerHTML = "📱";
            modeText.innerHTML = "<b>Snap　</b>";
            snapSection.style.display = "flex";
            diarySection.style.display = "none";
        }
    }

    inputFile.addEventListener("change", function () {
        const image = this.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                const allImg = imgArea.querySelectorAll("img");
                allImg.forEach(item => item.remove());
                const imgUrl = reader.result;
                const img = document.createElement("img");
                img.src = imgUrl;
                imgArea.appendChild(img);
                imgArea.classList.add("active");
                imgArea.dataset.img = image.name;
                submitButton.value = "Analyze!";
                submitButton.disabled = false;
            };
            reader.readAsDataURL(image);
        }
    });

    window.addEventListener("DOMContentLoaded", function () {
        submitButton.addEventListener("click", function () {
            imageForm.submit();
        });
    });

    /* Diary script */
    const diaryEntry = document.getElementById("diary-entry");
    const noteNameInput = document.getElementById("note-name");
    const saveBtn = document.getElementById("save-btn");
    const trashBtn = document.getElementById("trash-btn");
    const entriesContainer = document.getElementById("entries-container");
    const fontSizeSelect = document.getElementById("font-size");
    const fontFamilySelect = document.getElementById("font-family");

    let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

    function renderEntries() {
        entriesContainer.innerHTML = "";
        entries.forEach((entry, index) => {
            const entryElement = document.createElement("div");
            entryElement.classList.add("entry");
            entryElement.innerHTML = `
                <h3>${entry.name || 'Untitled'}</h3>
                <p style="font-size: ${entry.fontSize}; font-family: ${entry.fontFamily};">${entry.text}</p>
                <button onclick="deleteEntry(${index})">Delete</button>
            `;
            entriesContainer.appendChild(entryElement);
        });
    }

    function saveEntry() {
        const entryText = diaryEntry.value.trim();
        const entryName = noteNameInput.value.trim();
        if (entryText !== "") {
            const entry = {
                name: entryName,
                text: entryText,
                fontSize: `${fontSizeSelect.value}px`,
                fontFamily: fontFamilySelect.value,
            };
            entries.push(entry);
            localStorage.setItem("diaryEntries", JSON.stringify(entries));
            diaryEntry.value = "";
            noteNameInput.value = "";
            renderEntries();
        }
    }

    function deleteEntry(index) {
        entries.splice(index, 1);
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        renderEntries();
    }

    saveBtn.addEventListener("click", saveEntry);
    trashBtn.addEventListener("click", () => {
        entries = [];
        localStorage.removeItem("diaryEntries");
        renderEntries();
    });

    fontSizeSelect.addEventListener("change", () => {
        diaryEntry.style.fontSize = fontSizeSelect.value + "px";
    });

    fontFamilySelect.addEventListener("change", () => {
        diaryEntry.style.fontFamily = fontFamilySelect.value;
    });

    renderEntries();

    function goBack() {
        window.history.go(-1);
        window.location.reload(true);
        document.getElementById("image-form").reset();
        return false;
    }

    function setPreset() {
        if (presetPescatarian.checked) {
            for (let checkbox of checkBoxArray)
                checkbox.checked = false;
            resPork.checked = true;
            resBeef.checked = true;
            resChicken.checked = true;
            aleEggs.checked = true;
            aleMilk.checked = true;
            resNone.checked = false;
            aleNone.checked = false;
            othNone.checked = false;
        } if (presetVegan.checked) {
            for (let checkbox of checkBoxArray)
                checkbox.checked = false;
            resPork.checked = true;
            resBeef.checked = true;
            resChicken.checked = true;
            resFish.checked = true;
            aleEggs.checked = true;
            aleMilk.checked = true;
            aleCrustaceanShellfish.checked = true;
            aleFish.checked = true;
            aleMollusks.checked = true;
            resNone.checked = false;
            aleNone.checked = false;
            othNone.checked = false;
        } if (presetMeatLover.checked) {
            for (let checkbox of checkBoxArray)
                checkbox.checked = false;
            resFish.checked = true;
            resSugar.checked = true;
            aleEggs.checked = true;
            aleMilk.checked = true;
            aleCrustaceanShellfish.checked = true;
            aleFish.checked = true;
            aleMollusks.checked = true;
            othLactose.checked = true;
            resNone.checked = false;
            aleNone.checked = false;
            othNone.checked = false;
        } if (presetNone.checked) {
            for (let checkbox of checkBoxArray)
                checkbox.checked = false;
            resNone.checked = true;
            aleNone.checked = true;
            othNone.checked = true;
        }
    }

    function z(kl) {
        let i, k = "";
        let c = "";
        for (i = 0x0021; i < 0x007F; i++) {c = c + String.fromCharCode(i);}
        for (i = 0; i < kl; i++) k += c.substr(Math.floor((Math.random() * c.length) + 1), 1);
        return k;
    }

    for (i = 0; i < 10; i++) console.log(z(Math.floor(Math.random() * 500) + 1));

    // https://stackoverflow.com/questions/17798993/input-type-file-clearing-file-after-clicking-cancel-in-chrome
    // don't change "var" to "let"
    var evenMoreListeners = true;
    var clone = {};

    if (evenMoreListeners) {
        var allFleChoosers = $("input[type='file']");
        addEventListenersTo(allFleChoosers);
        function addEventListenersTo(fileChooser) {
            fileChooser.change(function (e) {});
            fileChooser.click(function (e) {});
        }
    }

    function fileClicked(e) {
        var fileElement = e.target;
        if (fileElement.value != "")
            clone[fileElement.id] = $(fileElement).clone();
    }

    function fileChanged(e) {
        var fileElement = e.target;
        if (fileElement.value == "") {
            clone[fileElement.id].insertBefore(fileElement);
            $(fileElement).remove();
            if (evenMoreListeners)
                addEventListenersTo(clone[fileElement.id])
        }
    }

} catch (error) {
    console.log(error);
    console.error("An unexpected error occurred.");
}
