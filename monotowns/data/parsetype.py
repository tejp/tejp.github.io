import json
import sys


townlist = []
faillist = []
if len(sys.argv) is not 5:
    sys.exit("Wrong number of parameters. Must be 4.")
monotowns = sys.argv[1]
towntypes = sys.argv[2]
outfile = sys.argv[3]
failfile = sys.argv[4]
with open(monotowns, 'r') as data:
    towns = json.loads(data.read())
with open(towntypes, 'r') as types:
    for line in types:
        towninfo = [x.strip() for x in ''.join(line.split('\t')).split('#')]
        query = towninfo[0] + " " + towninfo[1]
        for i, town in enumerate(towns):
            if town[0] == query:
                townlist.append([
                    towninfo[0],
                    towninfo[1],
                    towns[i][1],
                    towns[i][2],
                    towns[i][3],
                    [x.strip() for x in towninfo[2].split(',')]])
                break
        else:
            faillist.append(towninfo)

print("{}/{}".format(len(townlist) - len(faillist), len(townlist)))
with open(outfile, 'w') as of:
    json.dump(townlist, of)
if len(faillist) > 0:
    with open(failfile, 'w') as ff:
        for town in faillist:
            ff.write(town)
