document.addEventListener("DOMContentLoaded", async () => {
    const companySelect = document.getElementById("company-select");
    const problemContainer = document.getElementById("problem-container");

    // Load company list from config.json
    const response = await fetch(chrome.runtime.getURL("config.json"));
    const companies = await response.json();

    companies.forEach(company => {
        const option = document.createElement("option");
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
    });

    // Restore last selected company
    const { selectedCompany } = await chrome.storage.local.get("selectedCompany");
    if (selectedCompany) {
        companySelect.value = selectedCompany;
        await loadProblemsIntoList(selectedCompany);
    }

    // When user changes company
    companySelect.addEventListener("change", async () => {
        const selected = companySelect.value;
        await chrome.storage.local.set({ selectedCompany: selected });
        await loadProblemsIntoList(selected);
    });

    async function loadProblemsIntoList(companyName) {
        try {
            // Ask background.js to load CSV
            await chrome.runtime.sendMessage({ action: "loadCompany", company: companyName });

            const companyKey = `problems_${companyName}`;
            const data = await chrome.storage.local.get(companyKey);
            const problems = data[companyKey] || [];

            renderProblemList(problems, companyName);
        } catch (err) {
            console.error("Error loading problems:", err);
            problemContainer.textContent = `Failed to load questions for ${companyName}.`;
        }
    }

    function renderProblemList(problems, companyName) {
        problemContainer.innerHTML = "";

        if (problems.length === 0) {
            problemContainer.textContent = `No questions found for ${companyName}.`;
            return;
        }

        const ul = document.createElement("ul");

        problems.forEach(problem => {
            const li = document.createElement("li");
            li.innerHTML = `
                <a href="${problem.url}" target="_blank">${problem.name}</a>
                <small>Asked ${problem.count} times</small>
            `;
            ul.appendChild(li);
        });

        problemContainer.appendChild(ul);
    }
});
