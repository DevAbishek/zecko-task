# Zecko: Zoey got OCD

Task is to read all the websites from an input Google Sheet and append one more column “Category” to the sheet. Each value in the “Category” column should be one of { SHOPIFY, WOOCOMMERCE, BIGCOMMERCE, MAGENTO, OTHERS, NOT_WORKING }.

## Tech Used

- [NodeJs](https://nodejs.org/en/)
- [axios](https://www.npmjs.com/package/axios)
- [googleapis](https://www.npmjs.com/package/googleapis)
- [wappalyzer](https://www.wappalyzer.com/)


## Google API Credentials
1. Get your credentials from Google API console
2. Go to console.cloud.google.com
3. Create a new project
4. Enable the Google Sheets API
5. Create credentials (Service Account)
6. Copy the Email in the created service account
7. Add a JSON Key in the service account
8. Included the downloaded JSON file in application as 'credentials.json' in the root directory 
9. Share your spreadsheet with the copied eamail address as an editor

## Installation
1. Clone this repo on your local machine.

```bash
    https://github.com/DevAbishek/zecko-task.git
```

2. Install the packages in the project directory using
```bash
    npm install
```

3. Create a Wappalyzer account and store your API Key in the 'index.js' file. Also, store your Google Sheets ID in the 'index.js' file.
```bash
    const wappalyzerAPIKey = <Your API Key>;
    const spreadsheetId = <Google Sheets ID>;
```

4. Run the application using
```bash
    npm run start
```