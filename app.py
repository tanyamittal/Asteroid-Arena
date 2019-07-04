from flask import Flask, render_template, request
import requests
app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/asteroidalert')
def asteroidalert():
    return render_template("asteroidalert.html")


@app.route('/lookupforanasteroid')
def lookup():
    return render_template("lookupforanasteroid.html")


@app.route('/asteroidfeed')
def asteroidfeed():
    return render_template("asteroidfeed.html")


if __name__ == "__main__":
    app.run(debug=True)
