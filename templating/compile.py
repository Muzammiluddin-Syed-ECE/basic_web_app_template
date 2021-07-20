import os
import glob
import re

print("working")
# schema_props
SCHEMA_PROPS = ["_id", "name", "company", "date", "confirmed"]
# key
# model
MODEL = "sponsor"
# path
PATH = "sponsor"
# redirect_path
REDIRECT_PATH = "sponsor"

def processLine(line):
    new_line = line
    if "<schema_props>" in line:
        for newline in schemaProps(line):
            yield newline
    else :
        if "<model>" in new_line:
            new_line = re.sub(r"<model>", MODEL, new_line)
        
        if "<path>" in new_line:
            new_line = re.sub(r"<path>", PATH, new_line)
        
        if "<redirect_path>" in new_line:
            new_line = re.sub(r"<redirect_path>", REDIRECT_PATH, new_line)

        yield new_line
    
def schemaProps(line):
    newline = line
    for prop in SCHEMA_PROPS:
        new_line = re.sub("<schema_props>","", newline)
        new_line = re.sub(r"<key>", prop, new_line)
        yield new_line

path = os.getcwd()
for filename in glob.iglob(f'{path}/controllers/*'):
    extracted_fname = re.search("[a-z]+.txt", filename).group()
    extracted_fname = re.sub(".txt", ".js", extracted_fname)
    f = open(filename, "r")
    f2 = open(extracted_fname, "w")
    lines = f.readlines()
    
    new_lines = []
    
    for line in lines:
        
        for new_line in processLine(line):
            print(new_line)
            f2.write(new_line)



