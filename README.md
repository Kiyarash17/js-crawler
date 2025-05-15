# PubMed Article Crawler

A simple Node.js web crawler that extracts article information from PubMed search results and saves them to a CSV file.

## Features

- Scrapes article titles, authors, journal names, and URLs
- Saves data in CSV format
- Handles PubMed's HTML structure
- Simple and easy to use
- Proper error handling

## Prerequisites

Before running this crawler, make sure you have:

- Node.js installed (version 12 or higher recommended)
- npm (Node Package Manager) installed

## Installation

1. Clone this repository or download the files
2. Navigate to the project directory
3. Install the required dependencies:

```bash
npm install axios cheerio
```

## Usage

1. Open `crawler.js` in your code editor
2. (Optional) Modify the search URL by changing the `targetUrl` variable:
   ```javascript
   const targetUrl = "https://pubmed.ncbi.nlm.nih.gov/?term=cancer&filter=dates.2023-2024";
   ```
   You can customize the search by:
   - Changing the search term (replace 'cancer' with your term)
   - Modifying the date filter
   - Adding additional search parameters

3. Run the crawler:
   ```bash
   node crawler.js
   ```

4. The results will be saved in `pubmed_articles.csv` in the same directory

## Customizing the Search

You can modify the PubMed search URL to suit your needs. Here are some examples:

- Basic search: `?term=diabetes`
- Multiple terms: `?term=cancer+AND+therapy`
- Date range: `?term=covid&filter=dates.2020-2024`
- Author search: `?term=smith+j[author]`
- Journal search: `?term=cell[journal]`

## Output Format

The crawler generates a CSV file with the following columns:
- Title: Article title
- Authors: List of authors
- Journal: Journal name
- URL: Full PubMed article URL

## Error Handling

The crawler includes basic error handling for:
- Network issues
- Invalid URLs
- Missing data
- File system errors

## Limitations

- Currently only scrapes the first page of results
- No pagination support
- No rate limiting (use responsibly)
- May need updates if PubMed changes their HTML structure

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Disclaimer

This crawler is for educational purposes only. Please respect PubMed's terms of service and robots.txt when using this tool. Consider using PubMed's official API for production use.

## Troubleshooting

If you encounter any issues:

1. Check your internet connection
2. Verify that all dependencies are installed
3. Ensure you have write permissions in the directory
4. Check if PubMed's HTML structure has changed
5. Try running with a different search term

## Support

For questions or issues, please open an issue in the repository. 