HOW TO RUN:

1. open terminal in this directory
	- right click, select "Open in terminal"

2. type the following:
	python -m venv venv
	venv\Scripts\activate

3. since you need to install the appropriate packages, type the following:
	pip install -r requirements.txt

4. open vs code by typing:
	code .

5.
DO NOT open index.html or run main.py directly, instead, 
type the following IN THIS ORDER:
	$env:FLASK_APP=".\main.py"
	set FLASK_ENV=development
	flask run

6. to close the website, go to the terminal and press CTRL+C to stop

7. if you want to run the website again, type:
	flask run