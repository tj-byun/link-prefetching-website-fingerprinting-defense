## Experience
* I first tried to implement a sequential crawler using `requests.get()`. However, the time it took for loading a website varied hugely (1 sec to >100 sec) (I/O bottleneck, i guess) that I had to looked for a different solution.
* I tried to parallelize the crawler by implementing a thread for each address or a bucket of addresses. It was neither efficient however.
* I found a python library called scrapy that is designed for crawling and parsing massive websites effectively.
* It was indeed much more efficient. It took much more time to write a code that actually does its job, however, because of my lack of proficiency in Python and environment configuration – I learnt how to set up a virtual environment to resolve python package related issues.

## The crawler
* I've uploaded the scrapy spider code for your reference. The main logic can be found in parse(self, response). This function is called for each response, and yields a dictionary of website url and prefetch tag value if the webpage does prefetching (either one of `prerender`, `prefetch`, `next`, `dns-prefetch`).
* This code can be executed by typing `scrapy runspider spider.py -o outfile.csv`.
* You can optionally specify configuration to scrapy spider through CLI, like `scrapy runspider spider.py -o outfile.csv -s DOWNLOAD_TIMEOUT=120`. The full list of configurable items can be found [here](http://doc.scrapy.org/en/latest/topics/settings.html).

## Collected dataset
* I've also uploaded a dataset collected by the crawler. Its format is a comma separated file, where the second column notes the prefetching type.
* The list of websites were obtained from Alexa. I only collected from top 500.
* The list may not be comprehensive because of timeout-ed sites. I arbitrarily set the timeout for each `GET` request to 30 seconds, and the number of trail to be 3. Sites were dropped when they timeout for 3 times, yielding a message like `2015-11-30 02:38:25 [scrapy] ERROR: Gave up retrying <GET http://zippyshare.com>: User timeout caused connection failure.`.
* As a result, I got 56 websites among 500 (or less) that does either dns-prefetch, next or prefetch. I'll modify the script to make the list to be comprehensive if needed.

## Note
Please let me know if I shall collect more data, write in different format, etc.

