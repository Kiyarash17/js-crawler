// npm install axios cheerio
const axios = require('axios');
const cheerio = require('cheerio');

// specify the URL of the site to crawl
const targetUrl = 'https://www.scrapingcourse.com/ecommerce/';

// add the target URL to an array of URLs to visit
let urlsToVisit = [targetUrl];

// define the desired crawl limit
const maxCrawlLength = 20;

// define a crawler function
const crawler = async () => {
    // track the number of crawled URLs
    let crawledCount = 0;
    

    for (; urlsToVisit.length > 0 && crawledCount <= maxCrawlLength;) {
        // get the next URL from the list
        const currentUrl = urlsToVisit.shift();
        // increment the crawl count
        crawledCount++;

        try {
            // request the target website
            const response = await axios.get(currentUrl);
            // parse the website's HTML
            const $ = cheerio.load(response.data);
            

            // find all links on the page
            const linkElements = $('a[href]');
            console.log(linkElements);
            
            linkElements.each((index, element) => {
                let url = $(element).attr('href');

                // check if the URL is a full link or a relative path
                if (!url.startsWith('http')) {
                    // remove leading slash if present
                    url = targetUrl + url.replace(/^\//, '');
                }

                // follow links within the target website
                if (url.startsWith(targetUrl) && !urlsToVisit.includes(url)) {
                    // update the URLs to visit
                    urlsToVisit.push(url);
                }
            });
        } catch (error) {
            // handle any error that occurs during the HTTP request
            console.error(`Error fetching ${currentUrl}: ${error.message}`);
        }
    }
    // console.log(urlsToVisit);
};

// execute the crawler function
crawler();
