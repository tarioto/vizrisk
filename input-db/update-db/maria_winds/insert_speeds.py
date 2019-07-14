# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Wind = db.maria_winds

# Find distinct damage names to count from buildings
speedNames = Building.distinct("wind_speed")
nSpeed = len(speedNames)

# # Update parish collection
def insert(wind):

    try:

        # Insert empty doc with wind name
        wind_id = str(int(wind))
        Wind.insert_one({"_id" : wind_id})

        # Print out excepted id
        print("inserted: " + wind_id)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + wind)
        print(e)

#  Iterate through each doc and call update function
for speedName in speedNames:
    # Call update function on each object
    insert(speedName)
