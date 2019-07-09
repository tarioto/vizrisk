# Load in dependencies
from pymongo import MongoClient
import pandas

# Connect to database collection
url = 'mongodb://localhost' # connection url
client = MongoClient(url)
db = client.viz_risk # database name
Location = db.locations # collection of interest

# Read in provided csv
dat = pandas.read_csv('dominica_2015_2020_populations.csv')
# Keys: lid,latitude,longitude,population_2015,population_2020,abs_increase,perc_increase
uniqueBuilding = dat['lid']
numBuilding = uniqueBuilding.count()

# Insert building into collection to initialize
def update(df, i):

    # Get building id
    loci = df.loc[i,'lid']
    lat = df.loc[i,'latitude']
    lng = df.loc[i,'longitude']
    perc_increase = df.loc[i,'perc_increase']

    # Use try-catch to handle and print out errors
    try:

        # Attempt to insert new building document
        locobj = Location.update_one({"_id": loci}, {"$set":{
                "perc_increase": float(perc_increase),
                "lat": float(lat),
                "lng": float(lng)
                }})

        # Print updated id
        print("updated: " + loci)

    except Exception as e: # Store error as variable e

        # Print out excepted id
        print("skipping: " + loci)
        print(e)

# Iterate through buildigns provided in CSV
for indBuilding in range(0,numBuilding):
    # Call insert function defined above
    update(dat, indBuilding)
