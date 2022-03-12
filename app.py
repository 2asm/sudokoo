from flask import Flask, render_template, jsonify
from sudoku import generate_sudoku
app = Flask(__name__)
  
@app.route('/',methods = ['GET'])
def index():
    return render_template("index.html")

@app.route("/sudoku", methods = ["POST"])
def sudoku():
    return jsonify(generate_sudoku())

if __name__ == '__main__':
   app.run(debug = True)