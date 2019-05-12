import argparse

parser = argparse.ArgumentParser(prog='ordering and indexing program')
parser.add_argument("-i",'--input',help='file path for incoming text file',nargs=1)
parser.add_argument("-o",'--output',help='file path for the destination text file',nargs=1)
args = parser.parse_args()



chars = ["-",".","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
organised = [];
re = open(args.input[0], "r")
arr = re.read().splitlines()
arr.sort()
re.close()

count = 0;
for x in chars:
    for y in chars:
        code = x+y;
        subarr = [];
        while count < len(arr) and arr[count][0:2] == code:
            subarr.append(arr[count]);
            count = count+1;
        organised.append(subarr);




wr = open(args.output[0], "w")
wr.write("var knownSites = ")
wr.write(str(organised))
wr.write(";")
wr.close()

# CREATION OF SINGLE NON-OPTIMIZED ARRAY FOR TESTING PURPOSES
# re = open(args.input[0], "r")
# arr = re.read().splitlines()
# arr.sort()
# re.close()
#
# wr = open(args.output[0], "w")
# wr.write("var knownSites = ")
# wr.write(str(arr))
# wr.write(";")
# wr.close()
