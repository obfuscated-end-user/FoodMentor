# Introduction
FoodSnap is a web application that tries to predict food recipes and ingredients, based on the image you give it to. Machine learning concepts and natural language processing techniques are used to accomplish this.  
It uses HTML, JavaScript and CSS for the website, and Python 3.11.5 for the backend, with the help of [Flask](https://flask.palletsprojects.com/en/3.0.x), [PyTorch](https://pytorch.org), [spaCy](https://spacy.io) and [HuggingFace's Transformers](https://huggingface.co/docs/transformers) libraries.  

You can visit the working web application [here](https://tinyurl.com/foodsnap2023).
# Instructions
1. Open the command line in the current directory:
	- If you're on Windows, right click, then select "Open in terminal".
2. Enter the following. This will create a [virtual environment](https://docs.python.org/3/library/venv.html).
```bat
python -m venv venv
venv\Scripts\activate
```
3. To install the necessary dependencies, enter the following in the terminal:
```bat
pip install -r requirements.txt
```
4. Open Visual Studio Code by typing:
```
code .
```
5. **DO NOT** open `index.html` or run `main.py` directly, instead, enter the following commands into VS Code, in this specific order:
```bat
$env:FLASK_APP=".\main.py"
set FLASK_ENV=development
flask run
```
6. To close the application, go to the terminal and press `CTRL + C`.
7. If you want to run the website again, enter:
```bat
flask run
```
# TBD
* obvious code refactoring is obvious and that needs to be done ASAP
* all code in the jupyter notebooks are not guaranteed to run, maybe do something?