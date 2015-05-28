import json
import sys


townlist = []
templist = []
faillist = []
if len(sys.argv) is not 5:
    sys.exit("Wrong number of parameters. Must be 4.")
monotowns = sys.argv[1]
towntaxonomi = sys.argv[2]
outfile = sys.argv[3]
failfile = sys.argv[4]
with open(monotowns, 'r') as data:
    towns = json.loads(data.read())
with open(towntaxonomi, 'r') as types:
    for line in types:
        towninfo = [x.strip() for x in ' '.join(line.split()).split('#')]
        towninfo[2] = int(towninfo[2].replace(" ", ""))
        for i, town in enumerate(towns):
            if town[0] == towninfo[0] and town[2] == towninfo[2]:
                town.append(int(towninfo[3]))
                townlist.append(town)
                break
        else:
            faillist.append(towninfo)
for town in towns:
    if len(town) < 7:
        town.append(0)
        townlist.append(town)
print("{}/{}".format(len(townlist), len(towns)))
with open(outfile, 'w') as of:
    json.dump(townlist, of)
if len(faillist) > 0:
    with open(failfile, 'w') as ff:
        json.dump(faillist, ff)
