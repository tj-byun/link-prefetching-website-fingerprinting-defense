# this code is no longer of use
__author__ = 'taejoon'

import re, csv, requests, threading, datetime, time
from bs4 import BeautifulSoup

running = 0
total = 1000
current = 0

file_lock = threading.Lock()
ofile = open('prefetching-site.txt', 'w')
ofile.truncate()


def log(msg: str):
    print(datetime.datetime.now().strftime(' %m/%d %H:%M:%S') + ' : ' + msg)


def fetch(addr: str) -> str:
    content = ''
    trial = 0
    while trial < 2:
        try:
            trial += 1
            content = requests.get(addr, stream=True).content
            repeat = False
        except Exception:
            log(' retry..')
            continue
    return content


def find_pattern(result: [], addr: str, rank=0):
    """find prefetch tag from a given site"""
    global running, total, current
    running += 1
    log('fetching ' + addr)
    content = fetch(addr)

    soup = BeautifulSoup(content, 'lxml')
    log('matching ' + addr)
    links = soup.find_all('link')

    found = False
    for link in links:
        if ('prefetch' in link.__str__() or 'prerender' in link.__str__()) \
                and 'dns-prefetch' not in link.__str__():
            found = True
    if found:
        log('found from ' + addr)
        result.append(addr)
        file_lock.acquire()
        ofile.write(addr)
        ofile.write('\n')
        file_lock.release()
    else:
        log('not found in ' + addr)

    current += 1
    print(str(current) + ' out of ' + str(total) + ' done')
    running -= 1


def alexa_parse(n: int) -> []:
    with open('top-1m.csv', 'r') as csvf:
        reader = csv.reader(csvf, delimiter=',')
        i = 0
        wlist = {}  # website list
        for row in reader:
            wlist[row[0]] = 'http://' + row[1]
            i += 1
            if i >= n:
                break
        return wlist


def run_threads():
    w_list = alexa_parse(total)
    matched = []
    threads = [threading.Thread(target=find_pattern, args=(matched, addr, rank)) \
               for rank, addr in w_list.items()]

    for t in threads:
        while True:
            if running < 10:
                t.start()
                time.sleep(5)
                break
    for t in threads:
        t.join()
    return matched


matched = run_threads()
print(matched)
"""
for item in matched:
    ofile.write(item)
    ofile.write('\n')
ofile.close()
"""
