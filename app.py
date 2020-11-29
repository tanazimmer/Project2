from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello Worl!"

@app.route("/htmlw")
def index():    
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)