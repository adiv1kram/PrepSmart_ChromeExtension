document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');
    const container = document.getElementById('problems-container');
    const companyName = 'Accenture';

    chrome.storage.local.get([companyName, 'status'], (result) => {
        const problemsCSV = result[companyName];
        const fetchStatus = result.status;

        if (chrome.runtime.lastError) {
            statusDiv.textContent = 'Error reading storage.';
            console.error(chrome.runtime.lastError);
            return;
        }

        if (fetchStatus && fetchStatus.startsWith('Error')) {
            statusDiv.textContent = `Failed to fetch data. ${fetchStatus}`;
        } else if (problemsCSV) {
            statusDiv.style.display = 'none';
            displayProblems(problemsCSV);
        } else {
            statusDiv.textContent = 'Data not available. The background script may still be fetching.';
        }
    });

    function displayProblems(csvText) {
        container.innerHTML = '';
        const rows = csvText.trim().split('\n').slice(1);

        if (rows.length === 0) {
            statusDiv.textContent = 'No problems found in the data.';
            statusDiv.style.display = 'block';
            return;
        }
        
        rows.forEach(row => {
            const columns = row.split(',');

            if (columns.length < 2) {
                console.warn('Skipping malformed row:', row);
                return;
            }
            
            const problemURL = columns[0].trim();
            const problemTitle = columns[1].trim();

            if (problemURL.startsWith('http')) {
                const problemDiv = document.createElement('div');
                problemDiv.className = 'problem';

                const problemLink = document.createElement('a');
                problemLink.href = problemURL;
                problemLink.textContent = problemTitle;
                problemLink.target = '_blank';
                problemLink.rel = 'noopener noreferrer';

                problemDiv.appendChild(problemLink);
                container.appendChild(problemDiv);
            } else {
                console.error('Invalid URL detected:', problemURL, 'from row:', row);
            }
        });
    }
});
