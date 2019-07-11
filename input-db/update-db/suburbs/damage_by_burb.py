# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Suburb = db.suburbs

# Find all suburbs to be quantified
burbObjs = Suburb.find() # query to retrieve relevant building docs from db
nBurb = burbObjs.count()

# Find distinct damage names to count from buildings
dmgNames = Building.distinct("main_damage")
nDmg = len(dmgNames)

# # Update building database
def update(burb):

    try:

        # Get suburb id
        sid = burb["_id"]

        # Query all buildings within that suburb
        burbBldgs = Building.find({"suburb":sid})

        # Count number of buildings in each damage category
        damage_dict = dict.fromkeys(dmgNames)

        # For each damage category, store result in dictionary and update field in db dynamically
        for dmgKey in dmgNames:
            # Get relevant building objects in db
            retrievedBldgs = Building.find({"$and":[{"suburb":sid},{"main_damage":dmgKey}]})
            countBldgs = retrievedBldgs.count()
            # Update damage dictionary
            damage_dict[dmgKey] = countBldgs
            # Update dynamic field
            Suburb.update_one({"_id": sid}, {"$set":{
                    dmgKey : int(countBldgs)
                    }})

        # Update building document with entire damage dictionary
        Suburb.update_one({"_id": sid}, {"$set":{
                "damage_dict" : dict(damage_dict)
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
