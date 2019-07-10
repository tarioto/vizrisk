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
bldgObjs = Building.find({"main_damage": {"$ne":"Damaged"} }) # query to retrieve relevant building docs from db
nBldg = bldgObjs.count()

# Connect to OSM and Google V3 APIs
nominatim = Nominatim(timeout=100)

# Choose and order your preference for geocoders here
# I'm only using OSM here
geocoders = [nominatim] #, googlev3, bing]
geocodersstring = ["nominatim"] #, "googlev3", "bing"]

def geocode(address):
    i = 0
    try:
        while i < len(geocoders):
            # try to geocode using a service
            location = geocoders[i].geocode(address)
            print(location)

            # if it returns a location
            if location != None:
                print("success with: " + geocodersstring[i] + ", and type =" + location.raw['type'])
                # return those values
                return [location.latitude, location.longitude, location.raw['type']]
            else:
                # otherwise try the next one
                i += 1

    except:
        # catch whatever errors, likely timeout, and return null values
        print( sys.exc_info()[0])
        return ['null','null']

    # if all services have failed to geocode, return null values
    return ['null','null']

# Update building database
def update(bldg):

    try:
        # Get building id
        bid = bldg["_id"]
        lat = bldg["lat"]
        lng = bldg["lng"]

        # Use location and try and determine corresponding OSM data point and occupancy
        lnlt = (float(lat),float(lng))
        addr = geocoders[0].reverse(lnlt) # use Nominatim
        result = geocode(addr)

        # Arrange as list of strings
        geo_occupancy = [str(res) for res in result]

        # Parse out type of occupancy retrieved
        occupancy = "unknown"
        if len(geo_occupancy) > 2:
            occupancy = geo_occupancy[len(geo_occupancy)-1]

        # Update building document
        Building.update_one({"_id": bid}, {"$set":{
                "geo_result": list(geo_occupancy),
                "occupancy": str(occupancy)
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
