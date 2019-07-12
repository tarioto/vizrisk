# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Parish = db.parishes

# Find all buildings to be quantified
bldgObjs = Building.find({"$and":[{"main_damage":{"$ne":"Damaged"}},{"parish":{"$ne":"None"}}]}) # query to retrieve relevant building docs from db
nBldg = bldgObjs.count()

# Find distinct parishes
parNames = Building.distinct("parish")


# Update building database
def insert(parish):

    try:

        # Update with parsed address before it is modified
        Parish.insert_one({"_id": parish})

        # Print out excepted id
        print("updated: " + parish)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + parish)
        print(e)

#  Iterate through each doc and call update function
for parName in parNames:
    # Call insert function on each object
    insert(parName)
