const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/hxu296/leetcode-company-wise-problems-2022/master/companies/';

const COMPANY='Google';

async function fetchAndStroreProblems() {
    try{
        const response=await fetch(`${GITHUB_RAW_BASE_URL}${COMPANY}.md`);
        if(!response.ok){
            console.error(`Failed to fetch data for ${COMPANY}: ${response.statusText}`);
        }
    }
    catch (error) {
    console.error('Error fetching or parsing problems:', error);
  }
}