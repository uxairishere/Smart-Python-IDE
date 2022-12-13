import re

def custom_data_cleaner(chat_export_file):
    with open(chat_export_file, "r") as corpus_file:
        content = corpus_file.read()
    return tuple(content.split("\n"))