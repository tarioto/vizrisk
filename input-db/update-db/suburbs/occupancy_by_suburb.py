# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Suburb = db.suburbs

# Find all suburbes to be quantified
burbObjs = Suburb.find() # query to retrieve relevant building docs from db
nPar = burbObjs.count()

# Find distinct damage names to count from buildings
occNames = Building.distinct("occupancy")
nOcc = len(occNames)


# # Update building database
def update(suburb):

    try:

        # Get suburb id
        sid = suburb["_id"]

        # Query all buildings within that suburb
        parBldgs = Building.find({"suburb":sid})

        # Count number of buildings in each damage category
        occ_dict = dict.fromkeys(occNames)

        # For each damage category, store result in dictionary and update field in db dynamically
        for occKey in occNames:
            # Get relevant building objects in db
            retrievedOccs = Building.distinct("geo_result", {"$and":[{"suburb":sid},{"occupancy":occKey}]}) # restrict what is returned to geo_result
            countOcc = len(retrievedOccs)
            # Update damage dictionary
            occ_dict[occKey] = countOcc
            # Update dynamic field
            # Suburb.update_one({"_id": sid}, {"$set":{
            #         dmgKey : int(countOcc)
            #         }})

        # Update building document with entire damage dictionary
        Suburb.update_one({"_id": sid}, {"$set":{
                "occupancy_dict" : dict(occ_dict)
                }})

        # Print out excepted id
        print("updated: " + sid)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + sid)
        print(e)

#  Iterate through each doc and call update function
for burbObj in burbObjs:
    # Call update function on each object
    update(burbObj)
