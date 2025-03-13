---
title: WaterCrawl node documentation
description: Learn how to use the WaterCrawl node in n8n. Follow technical documentation to integrate WaterCrawl node for web scraping and crawling in your workflows.
contentType: [integration, reference]
---

# WaterCrawl node

Use the WaterCrawl node to automate web scraping and crawling tasks in your workflows. n8n has built-in support for a wide range of WaterCrawl features, including creating crawl requests, fetching results, and directly scraping URLs with configurable options for browser behavior and content extraction.

On this page, you'll find a list of operations the WaterCrawl node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/waterCrawlApi.md).
///

## Operations

* **Create**: Create a new crawl request
* **Get**: Retrieve a specific crawl request by ID
* **Get Crawl Requests**: List multiple crawl requests with pagination
* **Get Crawl Results**: Fetch results for a specific crawl
* **Scrape URL**: Directly scrape a single URL
* **Stop**: Stop an active crawl request

## Configuration

### Scrape URL

This operation allows you to directly scrape a URL and optionally wait for the results.

#### Parameters:

* **URL**: The URL to scrape (required)
* **Wait for Results**: Whether to wait for scraping to complete or return immediately
* **Download Results**: Whether to download the result data or just get the reference URL
* **Page Options**: Configure browser behavior for page handling
  * **Wait Time**: Time to wait after page load (in milliseconds)
  * **Timeout**: Maximum time to wait for page load (in milliseconds)
  * **Include HTML**: Whether to include the HTML content in the response
  * **Include Links**: Whether to extract links from the page
  * **Only Main Content**: Whether to extract only the main content
  * **Screenshot**: Whether to take a screenshot of the page
  * **PDF**: Whether to generate a PDF of the page
  * **Include Tags**: Tags to include in content extraction
  * **Exclude Tags**: Tags to exclude from content extraction
  * **Viewport Width/Height**: Configure browser viewport dimensions
* **Plugin Options**: JSON configuration for plugins to extend scraping functionality

### Create Crawl Request

This operation creates a new crawl request that can crawl multiple pages.

#### Parameters:

* **URL**: The starting URL for crawling (required)
* **Spider Options**: Configure crawling behavior
  * **Follow Links**: Whether to follow links on the page
  * **Max Pages**: Maximum number of pages to crawl
  * **Respect Robots**: Whether to respect robots.txt directives
  * **External Domains**: Whether to follow links to external domains
  * **Crawl Depth**: Maximum depth for crawling
* **Page Options**: Same options as in Scrape URL operation
* **Plugin Options**: JSON configuration for plugins to extend crawling functionality

### Get, Get Crawl Requests, Get Crawl Results, Stop

These operations allow you to manage crawl requests:

* **Get**: Retrieve details about a specific crawl request
* **Get Crawl Requests**: List multiple crawl requests with pagination
* **Get Crawl Results**: Fetch the results of a crawl, with pagination
* **Stop**: Stop a running crawl request

## Common issues

Here are some common errors and issues with the WaterCrawl node and steps to resolve or troubleshoot them.

### Invalid JSON in plugin options

**Issue**: You receive an error message "Invalid JSON in pluginOptions"

**Solution**: Ensure that the JSON in the plugin options field is valid. Use a JSON validator if needed. The field expects a properly formatted JSON object.

### URL validation errors

**Issue**: You receive an error message about an invalid URL

**Solution**: Make sure the URL includes the protocol (http:// or https://) and is properly formatted.

### Timeouts during scraping

**Issue**: The scraping operation times out

**Solution**: Try increasing the timeout value in page options. For large pages or slow websites, you may need to increase this value significantly.

### Missing content in results

**Issue**: The scraped content is missing expected data

**Solution**: Check your page options configuration. You might need to adjust settings like:
- Increase the wait time to allow more time for dynamic content to load
- Enable the "include_html" option if you need the raw HTML
- Disable "only_main_content" if the data you need is outside the main content area
