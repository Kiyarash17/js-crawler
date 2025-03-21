// npm install axios cheerio
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// specify the URL of the site to crawl
const targetUrl = 'https://www.scrapingcourse.com/ecommerce/';

// add the target URL to an array of URLs to visit
let urlsToVisit = [targetUrl];

// define the desired crawl limit
const maxCrawlLength = 20;

// to store scraped product data
const productData = [];

// define a crawler function
const crawler = async () => {
    // track the number of crawled URLs
    let crawledCount = 0;
    // define a regex to match the pagination pattern
    const pagePattern = /page\/\d+/i;
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

            // extract product information from paginated product pages only
            if (pagePattern.test(currentUrl)) {
                // retrieve all product containers
                const productContainers = $('.product');

                // iterate through the product containers to extract data
                productContainers.each((index, product) => {
                    const data = {};

                    data.url =
                        $(product)
                            .find('.woocommerce-LoopProduct-link')
                            .attr('href') || 'N/A';
                    data.image =
                        $(product).find('.product-image').attr('src') || 'N/A';
                    data.name =
                        $(product).find('.product-name').text().trim() || 'N/A';
                    data.price =
                        $(product).find('.price').text().trim() || 'N/A';

                    // append the scraped data to the empty array
                    productData.push(data);
                });
            }
        } catch (error) {
            // handle any error that occurs during the HTTP request
            console.error(`Error fetching ${currentUrl}: ${error.message}`);
        }
    }
    // write productData to a CSV file
    const header = 'Url,Image,Name,Price\n';
    const csvRows = productData
        .map((item) => `${item.url},${item.image},${item.name},${item.price}`)
        .join('\n');
    const csvData = header + csvRows;

    fs.writeFileSync('products.csv', csvData);
    console.log('CSV file has been successfully created!');
};

// execute the crawler function
crawler();
