from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
from whatsapp_cleaner import clean_corpus
from cleanup_custom_data import myset_cleaner
from joblib import Parallel, delayed
from cleanup_yml import yml_cleaner

CORPUS_FILE = "datasets/archive/humor.yml"

chatbot = ChatBot("testbot")

trainer = ListTrainer(chatbot)

custom_data_cleaner = yml_cleaner(CORPUS_FILE)
trainer.train(custom_data_cleaner)

# Train based on the english corpus
trainer.train("chatterbot.corpus.english")

# Train based on english greetings corpus
trainer.train("chatterbot.corpus.english.greetings")

# Train based on the english conversations corpus
trainer.train("chatterbot.corpus.english.conversations")

exit_conditions = (":q" ,"quit", "exit")

while True:
    query = input("> ")
    if query in exit_conditions:
        break
    else:
        print(f"🤖 {chatbot.get_response(query)}")

