import shutil, sys

argv = sys.argv[1:]
original_filename = argv[0]
splitted = argv[0].split('.')
filename = splitted[0]
extension = splitted[1]

for i in range(100):
	copyfilename = '%s_%d.%s' % (filename, i, extension)
	shutil.copy2(original_filename, copyfilename)
