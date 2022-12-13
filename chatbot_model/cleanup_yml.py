import yaml
from itertools import chain
import glob

def yml_cleaner(chat_export_file):
    with open(chat_export_file, "r") as f:
        yaml_data = yaml.safe_load(f)  
        new_data = yaml_data["conversations"]
        chaining = new_data
    return list(chain(*chaining))

def reading():
    chaining = []
    CORPUS_FILE = glob.glob("datasets/archive/*.yml")
    for files in CORPUS_FILE:
        chaining.append(yml_cleaner(files))
        final = list(chain(*chaining))
        
    return tuple(final)

print(reading())