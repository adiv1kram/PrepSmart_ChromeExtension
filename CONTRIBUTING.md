# 🤝 Contributing to PrepSmart Chrome Extension

First off, thank you for considering contributing to **PrepSmart** 🎉  
This project is built for learners, by learners — and your contributions will help the community practice better for coding interviews 🚀  

---

## 📜 Code of Conduct

Please note that this project follows a **Code of Conduct**.  
By participating, you are expected to uphold this code.  
Be respectful, constructive, and collaborative at all times.  

---

## 🛠️ How Can You Contribute?

There are several ways to contribute:

1. **Add New Questions** – Help expand the company-wise problem set.  
2. **Fix Errors** – If you spot incorrect links or typos, fix them.  
3. **Improve UI/UX** – Suggest or implement improvements to the extension’s design.  
4. **Enhance Functionality** – Add features like filters, difficulty tags, or progress tracking.  
5. **Documentation** – Improve or update README, CONTRIBUTING, or attribution files.  

---

## 📂 Repository Structure

```
PrepSmart_ChromeExtension/
├── manifest.json # Chrome Extension config
├── background.js # Handles CSV file parsing & storage
├── popup.html # Extension popup UI
├── popup.js # Logic for rendering problems
├── config.json # List of companies
├── companies/ # Company-wise question CSVs
│ ├── Google.csv
│ ├── Amazon.csv
│ └── ...
├── assets/ # Icons, images, etc.
├── README.md
├── CONTRIBUTING.md
└── ATTRIBUTION.md # Credits to original sources
```

---

## 📄 Adding/Updating Questions

All company-wise question data is stored in the `companies/` folder.  
Each company has its own **CSV file** named after the company. Example:

```
companies/
├── Amazon.csv
├── Google.csv
└── Microsoft.csv
```
---

### CSV Format

Each row in the CSV should follow this format:

```

name,url,count
Two Sum,https://leetcode.com/problems/two-sum/,5
Add Two Numbers,https://leetcode.com/problems/add-two-numbers/,3
Longest Substring Without Repeating Characters,https://leetcode.com/problems/longest-substring-without-repeating-characters/,7

```
Field Explanation

name → Problem title (exactly as on LeetCode).

url → Direct link to the LeetCode problem.

count → Number of times the problem is reported/asked in interviews.

⚠️ Guidelines:

Do not remove existing problems unless they are duplicates.

Ensure URLs are valid LeetCode links.

Keep the file properly formatted (commas separating values).

Add new questions at the end of the CSV file.

---

🔧 Step-by-Step Contribution Guide

1. Fork this repository.

2. Clone your fork:
    ```bash
    git clone https://github.com/adiv1kram/PrepSmart_ChromeExtension.git

3. Create a new branch for your feature/fix:
    ```bash
    git checkout -b add-amazon-questions


4. Navigate to the companies/ folder and edit the relevant CSV file.

Follow the CSV format and add your new questions.

5. Commit your changes:
```bash
git add .
git commit -m "Added 3 new questions for Amazon"
```
6. Push your branch:
```bash
git push origin add-amazon-questions
```

Open a Pull Request (PR) from your fork to this repo’s main branch.

---

🔍 Reviewing PRs

- Each PR will be reviewed manually.

- Please keep changes focused (don’t mix multiple companies in one PR).

- Ensure CSV files remain valid (no broken formatting).

---

🎉 Final Note

Every contribution — no matter how small — makes a big difference ❤️
Let’s build the best Interview Problem Bank together!

If you like this project, don’t forget to ⭐ the repo!

