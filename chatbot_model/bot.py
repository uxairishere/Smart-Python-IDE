from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
from cleanup_custom_data import custom_data_cleaner
from cleanup_yml import reading

CORPUS_FILE = "datasets/myset.txt"

chatbot = ChatBot("fypbotv10")

# trainer = ListTrainer(chatbot)
trainer = ListTrainer(chatbot)

# Train based on the english corpus
trainer.train("chatterbot.corpus.english")

# Train based on english greetings corpus
trainer.train("chatterbot.corpus.english.greetings")

# Train based on the english conversations corpus
trainer.train("chatterbot.corpus.english.conversations")

# Train custom smart web data 
custom_data_cleaner = custom_data_cleaner(CORPUS_FILE)
trainer.train(custom_data_cleaner)

# Train kaggle data 
kaggle_data = reading()
trainer.train(kaggle_data)

exit_conditions = (":q" ,"quit", "exit")

while True:
    query = input("> ")
    if query in exit_conditions:
        break
    else:
        print(f"🤖 {chatbot.get_response(query)}")