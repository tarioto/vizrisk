# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Suburb = db.suburbs

# Find all buildings to be quantified
bldgObjs = Building.find({"$and":[{"main_damage":{"$ne":"Damaged"}},{"suburb":{"$ne":"None"}}]}) # query to retrieve relevant building docs from db
nBldg = bldgObjs.count()

# Find distinct suburbs
burbNames = Building.distinct("suburb")


# Update building database
def insert(burb):

    try:

        # Update with parsed address before it is modified
        Suburb.insert_one({"_id": burb})

        # Print out excepted id
        print("updated: " + burb)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + burb)
        print(e)

#  Iterate through each doc and call update function
for burbName in burbNames:
    # Call insert function on each object
    insert(burbName)
