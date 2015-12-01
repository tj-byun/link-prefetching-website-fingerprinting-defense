_author__ = 'taejoon'

import csv


def extract_prefetching_urls():
    csvf = open('scraped.csv', 'r')
    reader = csv.reader(csvf, delimiter=',')
    wlist = []
    for row in reader:
        link_rels = set(str(row[1]).split(','))
        if {'prefetch', 'next'} & link_rels:
            wlist.append(row[0])
            print(link_rels)
    csvf.close()
    return wlist


def save_url_only(urls):
    urlf = open('prefetching_urls.csv', 'wt')
    for url in urls:
        urlf.write(url + '\n')
    urlf.close()


save_url_only(extract_prefetching_urls())
