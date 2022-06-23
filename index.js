const axios = require('axios');
const { google } = require('googleapis');

// Enter WappAlyzer API key and Google Sheet ID in the following two variables
const wappalyzerAPIKey = "";
const spreadsheetId = "";

const givenCategories = ['BigCommerce', 'Shopify', 'WooCommerce', 'Magento']
let websiteCategories = [ ['Category'] ];

// get the technologies present in the website provided with the help of WappalyzerAPI
const getTechnologies = async (websiteURL) => {
    try {
        const res = await axios.get(`https://api.wappalyzer.com/v2/lookup?urls=${websiteURL}`, {
            headers: {
                "x-api-key": wappalyzerAPIKey
            }
        })
        return { status: res.status, siteTechnologies: res.data[0].technologies };
    } catch (error) {
        return { status: 400, siteTechnologies: null };
    }
}

// get the category which the website provided belongs to.
const getSiteCategory = async (websiteURL) => {

    // call getTechnologies() to get the status and technologies present in the website
    const { status, siteTechnologies } = await getTechnologies(websiteURL);

    if (status === 200) {
        const numOfTechnologies = siteTechnologies.length
        for (let index = 0; index < numOfTechnologies; index++ ) {
            let siteTechnology = siteTechnologies[index].name
            if (givenCategories.includes(siteTechnology)) {
                return siteTechnology.toUpperCase();
            }
        }
        return 'OTHERS';
    } else {
        return 'NOT_WORKING';
    }
}

const task = async () => {

    console.log("Zoey's task running")

    // authenticate Google Sheets
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // get spreadsheet data
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Pre program run"
    })

    // iterate over the websites provided in the spreadsheet data
    const numOfWebsites = getRows.data.values.length;
    for (let index = 1; index < numOfWebsites; index++) {
        const ans = await getSiteCategory(getRows.data.values[index][0])
        websiteCategories.push([ans]);

    }


    // update Google Sheets with the website categories in Column B
    googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Post program run!B:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: websiteCategories
        }
    })

    console.log("Hooray! Zoey's task finished!")
}

task();

