
async function loadProblemsForCompany(companyName) {
    try {
        const fileName = companyName.replace(/\s+/g, '') + '.csv';
        const response = await fetch(chrome.runtime.getURL(`companies/${fileName}`));
        if (!response.ok) throw new Error(`Failed to load CSV for ${companyName}`);

        const text = await response.text();
        const rows = text.trim().split('\n').slice(1); // skip header row

        const problems = rows.map(row => {
            const parts = row.split(',');
            if (parts.length >= 3) {
                const [url, name, num] = parts;
                return {
                    url: url.trim(),
                    name: name.trim(),
                    count: parseInt(num.trim(), 10) || 0
                };
            }
            return null;
        }).filter(Boolean);

        const companyKey = `problems_${companyName}`;
        await chrome.storage.local.set({ [companyKey]: problems });
        console.log(`Loaded ${problems.length} problems for ${companyName}`);
    } catch (error) {
        console.error(`Error loading problems for ${companyName}:`, error);
    }
}

// Listen for popup requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "loadCompany") {
        loadProblemsForCompany(request.company).then(() => sendResponse({ success: true }));
        return true; // keep the message channel open
    }
});

// Daily notification logic
chrome.alarms.create("dailyProblem", { periodInMinutes: 60 * 24 }); // once a day

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "dailyProblem") {
        const { selectedCompany } = await chrome.storage.local.get("selectedCompany");
        if (!selectedCompany) return;

        const companyKey = `problems_${selectedCompany}`;
        let { [companyKey]: problems } = await chrome.storage.local.get(companyKey);

        if (!problems || problems.length === 0) {
            await loadProblemsForCompany(selectedCompany);
            ({ [companyKey]: problems } = await chrome.storage.local.get(companyKey));
        }

        if (problems && problems.length > 0) {
            const randomIndex = Math.floor(Math.random() * problems.length);
            const problem = problems[randomIndex];
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: `Daily ${selectedCompany} Problem`,
                message: `${problem.name}\n(Asked ${problem.count} times)`,
                priority: 2
            });
        }
    }
});