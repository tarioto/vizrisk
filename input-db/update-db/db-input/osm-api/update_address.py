# Load in dependencies
from pymongo import MongoClient
from geopy.geocoders import Nominatim, GoogleV3
import sys, time

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings

# Find all buildings to be quantified
bldgObjs = Building.find({"$and":[{"main_damage":{"$ne":"Damaged"}},{"address":None}]}) # query to retrieve relevant building docs from db
nBldg = bldgObjs.count()

# Connect to OSM and Google V3 APIs
nominatim = Nominatim(timeout=100)

# Choose and order your preference for geocoders here
# I'm only using OSM here
geocoders = [nominatim] #, googlev3, bing]
geocodersstring = ["nominatim"] #, "googlev3", "bing"]

# Update building database
def update(bldg):

    try:
        # Get building id
        bid = bldg["_id"]
        lat = bldg["lat"]
        lng = bldg["lng"]

        # Use location and try and determine corresponding OSM data point and occupancy
        lnlt = (float(lat),float(lng))
        address = geocoders[0].reverse(lnlt) # use Nominatim
        print(address)

        # Update building document
        Building.update_one({"_id": bid}, {"$set":{
                "address": str(address)
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
    # time.sleep(1)
