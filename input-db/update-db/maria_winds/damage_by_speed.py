# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Wind = db.maria_winds

# Find distinct damage names to count from buildings
dmgNames = Building.distinct("main_damage", {"active": 1}) # filter to be only 'active' buildings
nDmg = len(dmgNames)

# Grab all relevant wind speeds
windObjs = Wind.find()
nWind = windObjs.count()

# # Update parish collection
def update(wind):

    try:

        # Get suburb id
        wid = wind["_id"]
        wid_num = int(wid)

        # Query all buildings within that suburb
        parBldgs = Building.find({"wind_speed" : wid_num})

        # Count number of buildings in each damage category
        damage_dict = dict.fromkeys(dmgNames)

        # For each damage category, store result in dictionary and update field in db dynamically
        for dmgKey in dmgNames:
            # Get relevant building objects in db
            retrievedBldgs = Building.find({"$and":[{"wind_speed": wid_num},{"main_damage":dmgKey}]})
            countBldgs = retrievedBldgs.count()
            # Update damage dictionary
            damage_dict[dmgKey] = countBldgs
            # Update dynamic field
            Wind.update_one({"_id": wid}, {"$set":{
                    dmgKey : int(countBldgs)
                    }})

        # Update building document with entire damage dictionary
        Wind.update_one({"_id": wid}, {"$set":{
                "damage_dict" : dict(damage_dict)
                }})

        # Print out excepted id
        print("updated: " + wid)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + wid)
        print(e)

#  Iterate through each doc and call update function
for windObj in windObjs:
    # Call update function on each object
    update(windObj)
