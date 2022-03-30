from flask import Flask, render_template, jsonify, redirect, request
from sudoku import generate_sudoku
app = Flask(__name__)

@app.before_request
def before_request():
    if not request.is_secure:
        url = request.url.replace('http://', 'https://', 1)
        return redirect(url, code=301)

@app.route('/',methods = ['GET'])
def index():
    return render_template("index.html")

@app.route("/sudoku", methods = ["POST"])
def sudoku():
    return jsonify(generate_sudoku())

if __name__ == '__main__':
   app.run(debug = True)