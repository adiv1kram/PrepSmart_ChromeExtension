const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/hxu296/leetcode-company-wise-problems-2022/master/companies/';

const COMPANY='Google';

async function fetchAndStroreProblems() {
    try{
        const response=await fetch(`${GITHUB_RAW_BASE_URL}${COMPANY}.md`);
        if(!response.ok){
            console.error(`Failed to fetch data for ${COMPANY}: ${response.statusText}`);
            return;
        }
        const markdownText= await response.text();

        const problems=markdownText
            .split('\n')
            .filter(line => line.trim().startsWith(' | '))
            .slice(2)
            .map(line => {
                const columns =line.split('|').map(s => s.trim());

                return columns[2].replace(/\[(.*?)\]\(.*?\)/, '$1');
            })
            .filter(name=>name);
        
            chrome.storage.local.set({problems: problems});
            console.log(`Successfully stored ${problems.length} problems for ${COMPANY}`);
    }
    catch (error) {
    console.error('Error fetching or parsing problems:', error);
  }
}

async function showDailyNotification(){
    const {problems} = await chorme.storage.local.get('problems');
    if(!problems || problems==0){
        console.lof('No problems found in storage. Fetching now.');
        await fetchAndStroreProblems();

        const {problems: newProblems} =await chrome.storage.local.get('problems');
        if(!newProblems || newProblems==0){
            console.log("Still no problems after refetch. Aborting notificaiton.");
            return;
        }
        setupProblemNotificaiton(newProblems);
    }else{
        setupProblemNotificaiton(problems);
    }
}