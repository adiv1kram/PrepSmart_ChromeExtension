const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/hxu296/leetcode-company-wise-problems-2022/main/companies/';

const COMPANY = 'Accenture';

async function fetchAndStoreProblems() {
    try {
        const response = await fetch(`${GITHUB_RAW_BASE_URL}${COMPANY}.csv`);
        if (!response.ok) {
            console.error(`Failed to fetch data for ${COMPANY}: ${response.statusText}`);
            chrome.storage.local.set({ status: `Error: ${response.status} ${response.statusText}` });
            return;
        }
        const csvText = await response.text();

        const problems = csvText;
        chrome.storage.local.set({ [COMPANY]: problems, status: 'Success' }, () => {
            console.log(`Successfully fetched and stored problems for ${COMPANY}.`);
        });

    } catch (error) {
        console.error(`An error occurred while fetching data for ${COMPANY}:`, error);
        chrome.storage.local.set({ status: `Error: ${error.message}` });
    }
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed. Fetching initial data...');
    fetchAndStoreProblems();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchProblems") {
        console.log('Popup requested a data fetch.');
        fetchAndStoreProblems();
        sendResponse({ status: 'Fetching started...' });
    }
});
