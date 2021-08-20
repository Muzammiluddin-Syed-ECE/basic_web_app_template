import re
from types import new_class

class Translator:
    def __init__ (self, options):
        self.options = options
        print(options)
        self.translations = {
            "model": options["model"],
            "model_cap": self.to_cap(options["model"]),
            "key": "",
            "related_field":""
        }
        self.actions = {
            "repeat_related_field":self.repeat_related_field,
            "schema_props":self.schema_props,
            "repeat_model":self.repeat_model,
        }

    def findall(self, start, end, obj):
        start_index = obj.find(start)
        end_index = obj.find(end) + len(end)
        bound = end_index + 1
        count = 0
        while(start_index != -1 and end_index != -1 and count < 10 and start_index < end_index):
            print(count,"-->",start_index,"--->",end_index,"->", bound)
            yield obj[start_index:end_index]
            count = count + 1
            start_index = obj.find(start, bound + 1)
            end_index = obj.find(end, bound + 1) + len(end)
            bound = end_index

    def find_actions(self, lines):
        new_lines = lines
        for key, action in self.actions.items():
            start_marker = "<"+key+"<"
            end_marker = ">"+key+">"
            txt = "<"+key+"<"+".*?"+ ">"+key+">"

            for match in self.findall(start_marker, end_marker, new_lines):
                new_lines = new_lines.replace(match, action(match))
                
        return new_lines

    def to_cap(self, word):
        return word[0].upper() + word[1:]

    def to_reg_ex(self, line):
        return line.replace("(", "\(")

    def regex_to_string(self, line):
        return line.replace("\(", "(")

    def repeat_related_field(self, lines):
        new_lines = lines
        res = ""
        for related_field in self.options["related_fields"]:
            res += self.specific_translate(new_lines, {"related_field": related_field, "related_field_cap": self.to_cap(related_field)})
            
        res = re.sub("<repeat_related_field<", "", res)
        res = re.sub(">repeat_related_field>", "", res)
        return res

    def schema_props(self, lines):
        new_lines = lines
        new_lines = re.sub("<schema_props<", "", new_lines)
        new_lines = re.sub(">schema_props>", "", new_lines)
        res = ""
        for prop in self.options["props"]:
            res += self.specific_translate(new_lines, {"key": prop['key'], "key_cap": self.to_cap(prop['key']), "key_description": prop['key_description']})
        return res

    def repeat_model(self, lines):
        new_lines = lines
        res = ""
        for model in self.options["models"]:
            res += self.specific_translate(new_lines, {"model": model, "model_cap": self.to_cap(model)})
            
        res = re.sub("<repeat_model<", "", res)
        res = re.sub(">repeat_model>", "", res)
        return res
        
    def specific_translate(self, lines, ammendment={"ignore":True}):
        new_lines = lines
        if "ignore" not in ammendment:
            for key, value in ammendment.items():
                self.translations[key] = value
        print(">>>",self.translations)
        for key, value in self.translations.items():
            if "<" + key + ">" in new_lines:
                print(key, value)
                new_lines = re.sub(r"<"+key+">", value, new_lines)
        print("model done")
        return new_lines

    def translate(self, lines):
        print(self.options)
        new_lines = lines
        new_lines = self.find_actions(new_lines)
        new_lines = self.specific_translate(new_lines)
        return new_lines
