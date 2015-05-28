import sys
import json

if len(sys.argv) is 2:
    data = []
    with open(sys.argv[1], 'r') as infile:
        data = json.load(infile)
    data.sort(key=lambda elem: elem[2], reverse=True)
    with open(sys.argv[1][:sys.argv[1].rfind('.')] + '_sorted.json', 'w') as outfile:
        json.dump(data, outfile)
else:
    print("Wrong number of arguments. Must be 1.")
