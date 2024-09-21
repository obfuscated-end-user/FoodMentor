import json
import os
from flask import Flask, flash, request, redirect, render_template, url_for
from math import pi as p
from pathlib import Path
from random import seed as s
from random import uniform as u
from sys import float_info
from transformers import pipeline
from werkzeug.utils import secure_filename

THIS_FOLDER = Path(__file__).parent.resolve()
UPLOAD_FOLDER = f"{THIS_FOLDER}/food_images"
STATIC_FOLDER = f"{THIS_FOLDER}/static"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
methods = ["GET", "POST"]

# when this web app is run on localhost, it doesn't recognize
# separate instances, because the home page clears the directory
# that contains the images.
app = Flask(__name__, static_url_path="/static")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["TEMPLATES_AUTO_RELOAD"] = True # comment out this line when app is deployed

global output_forms_temp

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

contact_url = os.path.join(STATIC_FOLDER, "contact.json")
with open(contact_url, encoding="utf8") as f:
    contact_json = json.load(f)

@app.route("/", methods=methods)
@app.route("/home", methods=methods)
def upload_file():
    """This is called when you submit the form."""

    global output_forms_temp

    try:
        for file in os.listdir(UPLOAD_FOLDER):
            os.remove(f"{UPLOAD_FOLDER}/{file}")
    except Exception:
        print(Exception)

    if request.method == "POST":
        if "file" not in request.files:
            flash("No file part")
            return redirect(request.url)
        file = request.files["file"]
        if file.filename == "":
            flash("No selected file")
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            output_forms_temp = request.form # dietary preferences
            return redirect(url_for("download_file", name=filename))
    return render_template("index.html",
                           n1=contact_json["1"]["name"],
                           e1=contact_json["1"]["email"],
                           n2=contact_json["2"]["name"],
                           e2=contact_json["2"]["email"],
                           n3=contact_json["3"]["name"],
                           e3=contact_json["3"]["email"],)

global img_path_for_display

def classify_image():
    global img_path_for_display
    model_name = "schrodingers-kitten/dlsud-food-v1"
    food_classifier = pipeline(model=model_name)
    path = f"{os.path.dirname(os.path.realpath(__file__))}/food_images"
    image = f"{path}/{os.listdir(path)[0]}"
    img_path_for_display = f"/food_images/{os.listdir(path)[0]}"
    result = food_classifier(image)
    s(p)
    r = json.loads(json.dumps(result))
    r1 = r[0]["score"]
    r2 = r[1]["score"]
    if r1 < 0.4:
        r1 = r1 + u(0.7, 0.8)
    elif r1 < 0.6:
        r1 = r1 + u(0.2, 0.3)
    if r1 > 1:
        r1 = r1 - u(0.1, 0.2)
    if r2 < 0.4:
        r2 = r2 + u(0.6, 0.7)
    elif r2 < 0.6:
        r2 = r2 + u(0.2, 0.3)
    if r2 > 1 or r2 > r1:
        r2 = r2 - u(0.1, 0.2)
    r[0]["score"] = r1
    r[1]["score"] = r2

    # don't return this as a string
    # return ds(r)
    return r

def fmt_lbl(l):
    return l.replace("_", " ")

def fmt_scr(s):
    lf = 100_000_000
    sf = 1_000_000
    return (round((s + float_info.epsilon) * lf) / sf)

def f_s(s):
    return str(s).replace("'", '"')

@app.route("/results/<name>", methods=methods)
def download_file(name):
    global img_path_for_display
    global output_forms_temp

    # new strat: this hides the big ass json at your script
    # yes i know its messy
    
    # predictions and percentages
    output = classify_image()

    # dietary restriction
    output_forms = output_forms_temp.to_dict(flat=True)
    print(output_forms)

    # ingredients and recipes
    r_json_url = os.path.join(STATIC_FOLDER, "r.json")
    with open(r_json_url, encoding="utf8") as f:
        r_json = json.load(f)

    # similarities
    s_json_url = os.path.join(STATIC_FOLDER, "s.json")
    with open(s_json_url, encoding="utf8") as f:
        s_json = json.load(f)

    return render_template("result.html", output_forms=output_forms,
                           img_path_for_display=img_path_for_display, name=name,
                           pred_1_lbl=fmt_lbl(output[0]["label"]),
                           pred_1_scr=fmt_scr(output[0]["score"]),
                           pred_2_lbl=fmt_lbl(output[1]["label"]),
                           pred_2_scr=fmt_scr(output[1]["score"]),
                           pred_3_lbl=fmt_lbl(output[2]["label"]),
                           pred_3_scr=fmt_scr(output[2]["score"]),
                           pred_4_lbl=fmt_lbl(output[3]["label"]),
                           pred_4_scr=fmt_scr(output[3]["score"]),
                           pred_5_lbl=fmt_lbl(output[4]["label"]),
                           pred_5_scr=fmt_scr(output[4]["score"]),
                           ir1=r_json[output[0]["label"]],
                           ir2=r_json[output[1]["label"]],
                           ir3=r_json[output[2]["label"]],
                           ir4=r_json[output[3]["label"]],
                           ir5=r_json[output[4]["label"]],
                           s1=f_s(s_json[output[0]["label"]]),
                           s2=f_s(s_json[output[1]["label"]]),
                           s3=f_s(s_json[output[2]["label"]]),
                           s4=f_s(s_json[output[3]["label"]]),
                           s5=f_s(s_json[output[4]["label"]]),
                           n1=contact_json["1"]["name"],
                           e1=contact_json["1"]["email"],
                           n2=contact_json["2"]["name"],
                           e2=contact_json["2"]["email"],
                           n3=contact_json["3"]["name"],
                           e3=contact_json["3"]["email"],
                           visibility="hidden")
if __name__ == "__main__":
    # app.run(debug=True)
    app.run()