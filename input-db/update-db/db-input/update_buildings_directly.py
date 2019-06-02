# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/test-db'
client = MongoClient(url)
db = client.db_training
Building = db.buildings

# Find all buildings to be quantified
bldgObjs = Building.find({}) # query to retrieve relevant building docs from db
nBldg = bldgObjs.count()

# Update building database
def update(bldg):

    try:
        # Get building id
        bid = bldg["_id"]

        # Extract number of stories
        n_story = bldg["n_story"]

        # Estimate period based on n_story
        period_estimate = 0.10*n_story

        # Update building document
        Building.update_one({"_id": bid}, {"$set":{
                "period": float(period_estimate)
                }})

        # Print out excepted id
        print("updated: " + bid)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + bid)
        print(e)

#  Iterate through each doc and call update function
for bldgObj in bldgObjs:
    # Call update function on each object
    update(bldgObj)
