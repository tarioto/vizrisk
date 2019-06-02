# Load in dependencies
from pymongo import MongoClient
import pandas

# Connect to database collection
url = 'mongodb://localhost/test-db' # connection url
client = MongoClient(url)
db = client.db_training # database name
Building = db.buildings # collection of interest

# Read in provided csv
dat = pandas.read_csv('seattle_market_data.csv')
# Keys: building_id, ...
uniqueBuilding = dat['bldg_id']
numBuilding = uniqueBuilding.count()

# Insert building into collection to initialize
def insert(df, i):

    # Get building id
    bldg = df.loc[i,'bldg_id']
    lat = df.loc[i,'lat']
    lng = df.loc[i,'lng']

    # Use try-catch to handle and print out errors
    try:

        # Attempt to insert new building document
        bldgobj = Building.insert_one({"_id": bldg,
                                        "lat": float(lat),
                                        "lng": float(lng)})

        # Print inserted id
        print("inserted: " + bldg)

    except Exception as e: # Store error as variable e

        # Print out excepted id
        print("skipping: " + bldg)
        print(e)

# Iterate through buildigns provided in CSV
for indBuilding in range(0,numBuilding):
    # Call insert function defined above
    insert(dat, indBuilding)
