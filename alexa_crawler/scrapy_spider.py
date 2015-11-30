__author__ = 'taejoon'

import scrapy, csv
from scrapy.selector import Selector


def alexa_top(min, max):
    csvf = open('top-1m.csv', 'r')
    reader = csv.reader(csvf, delimiter=',')
    i = 1
    wlist = []  # website list
    for row in reader:
        if i > max:
            break
        elif i < min:
            continue
        wlist.append('http://' + row[1])
        i += 1
    csvf.close()
    return wlist[(min - 1):]


class LSpider(scrapy.Spider):
    name = 'link spider'

    start_urls = alexa_top(1, 500)

    def parse(self, response):
        print(response.url)
        # extract 'rel' value in <link> tag
        rels = Selector(response=response).xpath('//link/@rel').extract()
        # encode them into utf-8
        rels_set = {rel.encode('utf-8') for rel in rels}
        print(rels_set)
        # a set of tag values to match
        match_set = {'prerender', 'prefetch', 'next', 'dns-prefetch'}
        if set.intersection(*[match_set, rels_set]):
            # if any element in the match_set exists in the rels_set
            rels_set &= match_set
            yield {'url': response.url, 'link_rels': list(rels_set)}
