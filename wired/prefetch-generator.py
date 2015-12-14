# 12-13-2015
# Taejoon Byun

import sys

def parse_file():
	FILENAME = './index.html'
	fp = open(FILENAME, 'r')
	lines = fp.readlines()
	index = 0
	for i in range(len(lines)):
		if 'link' in lines[i]:
			print('link found in line ' + str(i))
			index = i
			break
	fp.close()
	return lines, index


def generate_links(n, res_siz):
	assert(res_siz >= 1 and res_siz <= 3)
	fname = ''
	if res_siz == 1:
		fname = '100b'
	elif res_siz == 2:
		fname = '1kb'
	elif res_siz == 3:
		fname = '10kb'

	links = []
	for i in range(n):
		prefetch_link = '<link rel="prefetch" href="./res/' + \
			fname + '_' + str(i) + '.jpg">\n'
		links.append(prefetch_link)
	return links


def compile_html(html_lines, index, links):
	html = []
	html.extend(html_lines[:index])
	html.extend(links)
	html.extend(html_lines[index:])
	return html


def write_html_file(html, n, res_siz):
	FILENAME = './prefetch_' + str(n) + '_' + str(res_siz) + '.html'
	fp = open(FILENAME, 'w')
	for line in html:
		fp.write(line)
	fp.close()


def main(argv):
	if len(argv) != 2:
		print('2 arguments expected!')
		return
	if int(argv[1]) < 1 or int(argv[1]) > 3:
		print('p2 should be between 1 and 3 (%s given)' % argv[1])
		return

	p1 = int(argv[0])		# number of prefetches 
	p2 = int(argv[1])		# size of the resource

	lines, index = parse_file()
	links = generate_links(p1, p2)
	html = compile_html(lines, index, links)
	write_html_file(html, p1, p2)


if __name__ == '__main__':
	main(sys.argv[1:])

