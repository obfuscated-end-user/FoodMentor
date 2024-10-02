try {
    console.log("If the page doesn't work as intended, it may be your browser acting up.");

    // checkboxes and radio buttons
    let presetNone = document.getElementById("preset-none")
    let presetVegan = document.getElementById("preset-vegan");
    let presetPescatarian = document.getElementById("preset-pescatarian");
    let resPork = document.getElementById("res-pork");
    let resBeef = document.getElementById("res-beef");
    let resChicken = document.getElementById("res-chicken");
    let resFish = document.getElementById("res-fish");
    let resSugar = document.getElementById("res-sugar");
    let aleMilk = document.getElementById("ale-milk");
    let aleNuts = document.getElementById("ale-nuts");
    let aleWheat = document.getElementById("ale-wheat");
    let aleShellfish = document.getElementById("ale-shellfish");
    let othDiabetic = document.getElementById("oth-diabetic");
    let othLactose = document.getElementById("oth-lactose");

    let checkBoxArray = [
        resPork,
        resBeef,
        resChicken,
        resFish,
        resSugar,
        aleMilk,
        aleNuts,
        aleWheat,
        aleShellfish,
        othDiabetic,
        othLactose
    ];

    const body = document.body;
    body.classList.toggle(sessionStorage.getItem("mode"));

    const submitButton = document.getElementById("submit-button");
    const imageForm = document.getElementById("image-form");
    // const selectImage = document.querySelector(".select-image"); // related to the double prompt problem
    const inputFile = document.querySelector("#file");
    const imgArea = document.querySelector(".img-area");
    const pageModeToggle = document.querySelector(".page-mode-toggle");
    const snapSection = document.querySelector(".snap-section");
    const diarySection = document.querySelector(".diary-section");

    window.addEventListener("load", function() {
        submitButton.disabled = true;
        inputFile.reset();
    });

    function toggleDarkMode(){
        body.classList.toggle("dark-mode");
        const darkModeToggle = document.querySelector(".dark-mode-toggle");
        const toggleIcon = darkModeToggle.querySelector(".toggle-icon");
        const modeText = darkModeToggle.querySelector(".mode-text");
        const isDarkMode = body.classList.contains("dark-mode");

        if (sessionStorage.getItem("mode") == "dark-mode") {
            toggleIcon.innerHTML = "🌙";
            modeText.innerHTML = "<strong>Dark Mode</strong>";
            sessionStorage.setItem("mode", "light-mode");
        } else {
            toggleIcon.innerHTML = "🌞";
            modeText.innerHTML = "<strong>Light Mode</strong>";
            sessionStorage.setItem("mode", "light-mode");
            body.classList.toggle(sessionStorage.getItem("mode"));
            sessionStorage.setItem("mode", "dark-mode");
        }
    }

    function toggleSections() {
        body.classList.toggle("diary-mode");
        const toggleIcon = pageModeToggle.querySelector(".toggle-icon");
        const modeText = pageModeToggle.querySelector(".mode-text");
        const isDiaryMode = body.classList.contains("diary-mode");

        if (isDiaryMode) {
            toggleIcon.innerHTML = "📖";
            modeText.innerHTML = "<strong>Diary Page</strong>";
            snapSection.style.display = "none";
            diarySection.style.display = "flex";
        } else {
            toggleIcon.innerHTML = "📱";
            modeText.innerHTML = "<strong>Snap Page</strong>";
            snapSection.style.display = "flex";
            diarySection.style.display = "none";
        }
    }

    // this part causes the image input form to prompt twice, at least in
    // chromium-based browsers like edge
    /*
    selectImage.addEventListener("click", function () {
        inputFile.click();
    });
    */

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
    }

    function setPreset() {
        if (presetPescatarian.checked) {
            for (let checkbox of checkBoxArray) {
                checkbox.checked = false;
            }
            resFish.checked = true;
            aleShellfish.checked = true;
        } if (presetVegan.checked) {
            for (let checkbox of checkBoxArray) {
                checkbox.checked = false;
            }
            resPork.checked = true;
            resBeef.checked = true;
            resChicken.checked = true;
            resFish.checked = true;
            aleShellfish.checked = true;
        } if (presetNone.checked) {
            for (let checkbox of checkBoxArray) {
                checkbox.checked = false;
            }
        }
    }
} catch (error) {
    console.error("An unexpected error occurred.");
}
