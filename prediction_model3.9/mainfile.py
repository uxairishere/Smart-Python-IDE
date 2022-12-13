import pickle


from logging import error
import pickle
from re import L 
from fastapi import FastAPI
from numpy import take_along_axis
from pydantic import BaseModel
import sklearn
import pandas as pd
import numpy as np
import sys
import warnings

warnings.filterwarnings('ignore' )
warnings.warn('Do not show this message')

allargument=''
n =len(sys.argv)
for each in  range(1,n):
    allargument+=sys.argv[each]
    

import string
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords


#Model using with pickle
import pickle
file = open('vectorization.pkl', 'rb')
transformer = pickle.load(file)
file.close()
file = open("DessionTreeClassifier.pkl", 'rb')
model = pickle.load(file)
file.close()


import string
import re
from nltk.stem.porter import PorterStemmer
ps=PorterStemmer()
from nltk.corpus import stopwords
def text_process(x):
    """
    Takes in a string of text, then performs the following:
    1. Remove all punctuation
    2. Remove all stopwords
    3. Returns a list of the cleaned text
    
    # Check characters to see if they are in punctuation
    nopunc = [char for char in mess if char not in string.punctuation]

    # Join the characters again to form the string.
    nopunc = ''.join(nopunc)
    
    # Now just remove any stopwords
    return [word for word in nopunc.split() if word.lower() not in stopwords.words('english')]
    """
    x = x.lower()
    x = re.sub(r'[^0-9a-zA-Z]', ' ', x)
    x = re.sub(r'\s+', ' ', x)
    l = [item for item in x if item not in string.punctuation]
    processed=[ps.stem(i) for i in l if i not in stopwords.words('english')]
    processed="".join(processed)
    return processed


print(text_process(allargument))

# def taking_out_usefull_info(value,z='"'):
#     a=''
#     count=0
#     for each in value:
#         if each==z:
#             count=count+1
#             continue

#         if count==1:
#             a=a+each
#     return str(a).replace('<','').replace('>','')

# def taking_out_Error_Name(value):
#     a=''
#     found=False
#     count=0
#     for each in value:

#         if each==':':
#             count=count+1
#             continue
#         if count==2 and found==False:
#             found=True

#         if found==True:
#             a=a+each
            
    
#     return comma_remove(a)


# def comma_remove(string):
#     output=""
#     for each in string:
#         if each=="'":
#             continue
#         output=output+each
#     return output
        
# file_name=taking_out_usefull_info(allargument)
# error_statement=taking_out_Error_Name(allargument)
# user_data=pd.DataFrame(data=[[text_process('string'),text_process('name is not defined')]])
# a=transformer.transform(user_data)


# predict=model.predict(a)
# print(predict)
