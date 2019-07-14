# Load in dependencies
from pymongo import MongoClient
import pandas

# Connect to database collection
url = 'mongodb://localhost' # connection url
client = MongoClient(url)
db = client.viz_risk # database name
Building = db.buildings # collection of interest

# Read in provided csv
dat = pandas.read_csv('bldg_peak_gusts.csv')
# Keys: record_id,Latitude,Longitude,main_damag,grouped_da,confidence,geo_result,occupancy,address,parsed_add,address_di,country,parish,town,suburb,street,place,wind_speed
uniqueBuilding = dat['record_id']
numBuilding = uniqueBuilding.count()

# Insert building into collection to initialize
def update(df, i):

    # Get building id
    bid = df.loc[i,'record_id']
    wind_speed = df.loc[i, 'wind_speed']


    # Use try-catch to handle and print out errors
    try:

        # Update with parsed address before it is modified
        Building.update_one({"_id": bid}, {"$set":{
                "wind_speed": int(wind_speed),
                "active" : int(1) # add active for future queries
                }})

        # Print inserted id
        print("updated: " + bid)

    except Exception as e: # Store error as variable e

        # Print out excepted id
        print("skipping: " + bid)
        print(e)

# Iterate through buildigns provided in CSV
for indBuilding in range(0,numBuilding):
    # Call insert function defined above
    update(dat, indBuilding)
