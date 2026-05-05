let npkData = {};

// Load npk.json data
fetch("npk.json")
    .then(response => response.json())
    .then(data => {
        npkData = data;
        populateCropDropdown();
        console.log("NPK data loaded:", npkData);
    })
    .catch(err => console.error("Error loading NPK data:", err));

// Populate crop dropdown
function populateCropDropdown() {
    const select = document.getElementById("cropSelect");
    Object.keys(npkData).forEach(crop => {
        const option = document.createElement("option");
        option.value = crop;
        option.text = crop.charAt(0).toUpperCase() + crop.slice(1);
        select.add(option);
    });
}


// Info text
const infoData = {
    n: { 
        title: "Nitrogen (N)", 
        text: "Drives all above-ground growth. Essential for protein synthesis and green leaf production." 
    },
    p: { 
        title: "Phosphorus (P)", 
        text: "Powers root establishment, energy transfer, and ensures high yields of fruits and seeds." 
    },
    k: { 
        title: "Potassium (K)", 
        text: "Improves stress tolerance, regulates water use, and increases the market quality of the harvested crop." 
    }
};

// Open info modal
function openInfo(type) {
    document.getElementById("infoTitle").innerText = infoData[type].title;
    document.getElementById("infoText").innerText = infoData[type].text;
    document.getElementById("infoModal").style.display = "flex";
}

// Close info modal
function closeInfo() {
    document.getElementById("infoModal").style.display = "none";
}

// Calculate NPK requirement
function calculateNPK() {
    const nInput = Number(document.getElementById("nitrogen").value);
    const pInput = Number(document.getElementById("phosphorus").value);
    const kInput = Number(document.getElementById("potassium").value);

    const crop = document.getElementById("cropSelect").value;
    if(!crop || !npkData[crop]) {
        alert("Please select a crop!");
        return;
    }

    const base = npkData[crop];

    const nNeed = Math.max(base.n - nInput, 0);
    const pNeed = Math.max(base.p - pInput, 0);
    const kNeed = Math.max(base.k - kInput, 0);

    const result = `
        Urea: Add ${nNeed} kg per ropani<br>
        DAP: Add ${pNeed} kg per ropani<br>
        MOP: Add ${kNeed} kg per ropani
    `;

    document.getElementById("resultText").innerHTML = result;
    document.getElementById("resultModal").style.display = "flex";
}

// Close result modal
function closeResult() {
    document.getElementById("resultModal").style.display = "none";
}
