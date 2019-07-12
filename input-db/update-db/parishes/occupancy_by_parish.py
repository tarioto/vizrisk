# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Parish = db.parishes

# Find all parishes to be quantified
parObjs = Parish.find() # query to retrieve relevant building docs from db
nPar = parObjs.count()

# Find distinct damage names to count from buildings
occNames = Building.distinct("occupancy")
nOcc = len(occNames)

# # Update building database
def update(parish):

    try:

        # Get suburb id
        pid = parish["_id"]

        # Query all buildings within that suburb
        parBldgs = Building.find({"parish":pid})

        # Count number of buildings in each damage category
        occ_dict = dict.fromkeys(occNames)

        # For each damage category, store result in dictionary and update field in db dynamically
        for occKey in occNames:
            # Get relevant building objects in db
            retrievedOccs = Building.distinct("geo_result", {"$and":[{"parish":pid},{"occupancy":occKey}]}) # restrict what is returned to geo_result
            countOcc = len(retrievedOccs)
            # Update damage dictionary
            occ_dict[occKey] = countOcc
            # Update dynamic field
            # Parish.update_one({"_id": pid}, {"$set":{
            #         dmgKey : int(countOcc)
            #         }})

        # Update building document with entire damage dictionary
        Parish.update_one({"_id": pid}, {"$set":{
                "occupancy_dict" : dict(occ_dict)
                }})

        # Print out excepted id
        print("updated: " + pid)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + pid)
        print(e)

#  Iterate through each doc and call update function
for parObj in parObjs:
    # Call update function on each object
    update(parObj)
