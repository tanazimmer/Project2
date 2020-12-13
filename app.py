import numpy as np
import os 
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2
from flask import Flask, jsonify , render_template 
TEMPLATE_DIR = os.path.abspath('templates')
STATIC_DIR = os.path.abspath('static')
#################################################
# Database Setup
#################################################
engine = create_engine("postgres+psycopg2://postgres:project2group2@database-1.ctvycruujmkn.us-east-2.rds.amazonaws.com:5432/Project_2")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save reference to the Bar table
Main = Base.classes.hate_crimes
Bar = Base.classes.bar_graph

#################################################
# Flask Setup
#################################################
app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)
#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/hatecrimes<br/>"
        f"/api/bar-chart-data<br/>"
        f"/api/pie-chart<br/>"
        f"/api/map-graph<br/>"
        f"/api/victim_by_term<br/>"
        f"/home.html<br>"
    )
@app.route("/api/hatecrimes")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)
        # Query all hate crimes
    results = session.query(Main.bias_desc).all()
    session.close()
    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))
    return jsonify(all_names)
@app.route("/api/bar-chart-data")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Query all Administration Years from the grouped data
    bar_results = session.query(Bar.data_year, Bar.num_of_crimes).all()
    session.close()
    # Dictionary from the row data in the Bar Table 
    # Appended to a list of bar_grouped
    bar_grouped = []
    for data_year, num_of_crimes in bar_results:
        bar_dict = {}
        bar_dict["data_year"] = data_year
        bar_dict["num_of_crimes"] = num_of_crimes
        bar_grouped.append(bar_dict)
    return jsonify(bar_grouped)
@app.route("/home.html")
def home():
    return render_template('home.html')
@app.route("/map2.html")
def map2():
    return render_template('map2.html')
@app.route("/pie2.html")
def pie2():
    return render_template('pie2.html')
@app.route("/bar2.html")
def bar2():
    return render_template('bar2.html')
@app.route("/team2.html")
def team2():
    return render_template('team2.html')
@app.route("/data2.html")
def data2():
    return render_template('data2.html')

@app.route("/api/victim_by_term")
def victims():
    # Create our session (link) from Python to the DB
    session = Session(engine)
        # Query all hate crimes
    victim_results = session.query(Main.administration, func.count(Main.total_individual_victims)).group_by(Main.administration).all()
    session.close()
    # Convert list of tuples into normal list
    victim_count = list(np.ravel(victim_results))
    return jsonify(victim_count)
if __name__ == '__main__':
    app.run(debug=True)