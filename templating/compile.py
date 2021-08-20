import os
import glob
import re
from translation import Translator

options = {
    "props":[{"key":"id","key_description":"kid"},{"key":"id1","key_description":"kid1"}],
    "model":"books",
    "related_fields":['school', 'subject'],
    "models":["book","school","subject"]
}


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



models = ["book","school","subject"]
for model in models:
    options["model"] = model
    new_obj = Translator(options)
    """controllerfile = open(f'{path}/controller.txt', "r")
    fulllines= controllerfile.read()
    for filename in glob.iglob(f'{path}/controllers/*txt'):
        extracted_fname = re.search("[a-z]+.txt", filename).group()
        extracted_fname = model+re.sub(".txt", ".js", extracted_fname)
        f = open(filename, "r")
        #f2 = open(extracted_fname, "w")
        lines = f.read()
        fulllines = fulllines.replace("<controller>", new_obj.translate(lines) + "\n\n<controller>")
        fulllines = new_obj.translate(fulllines)
    fulllines = fulllines.replace("<controller>","")
    controllerwrite = open (f'{path}/controllers/{model}Controller.js', "w")
    controllerwrite.write(fulllines)
    """
    routefile = open(f'{path}/models/model.txt', "r")
    print("1")
    mylines = routefile.read()
    print("2")
    mylines = new_obj.translate(mylines)
    print("3")
    routew = open(f'{path}/models/{model}.js', "w")
    print("4")
    routew.write(mylines)
    print("5")

routefile = open(f'{path}/routes/route.txt', "r")
print("1")
mylines = routefile.read()
print("2")
mylines = new_obj.translate(mylines)
print("3")
routew = open(f'{path}/routes/routes.js', "w")
print("4")
routew.write(mylines)
print("5")

"""new_lines = []
    
    for line in lines:
        
        for new_line in processLine(line):
            #print(new_line)
            f2.write(new_line)


"""
