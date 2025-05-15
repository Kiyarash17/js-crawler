const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// PubMed search URL (you can modify the search term)
const targetUrl =
  "https://pubmed.ncbi.nlm.nih.gov/?term=cancer&filter=dates.2023-2024";

// Store scraped article data
const articles = [];

// Main crawler function
const crawler = async () => {
  try {
    // Get the page content
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    // Find all article entries
    $(".docsum-wrap").each((index, element) => {
      const article = {
        title: $(element).find(".docsum-title").text().trim(),
        authors: $(element).find(".docsum-authors").text().trim(),
        journal: $(element).find(".docsum-journal").text().trim(),
        url:
          "https://pubmed.ncbi.nlm.nih.gov" + $(element).find("a").attr("href"),
      };

      // Only add if we have a title
      if (article.title) {
        articles.push(article);
        console.log(`Found article: ${article.title}`);
      }
    });

    // Save to CSV
    if (articles.length > 0) {
      const header = "Title,Authors,Journal,URL\n";
      const csvRows = articles
        .map(
          (article) =>
            `"${article.title}","${article.authors}","${article.journal}","${article.url}"`
        )
        .join("\n");

      fs.writeFileSync("pubmed_articles.csv", header + csvRows);
      console.log(
        `\nSuccessfully saved ${articles.length} articles to pubmed_articles.csv`
      );
    } else {
      console.log("No articles found.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Run the crawler
crawler();
