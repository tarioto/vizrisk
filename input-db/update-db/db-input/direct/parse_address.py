# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings

# Find all buildings to be quantified
bldgObjs = Building.find({"$and":[{"main_damage":{"$ne":"Damaged"}}]}) # query to retrieve relevant building docs from db
nBldg = bldgObjs.count()

# Update building database
def update(bldg):

    try:
        # Get building id
        bid = bldg["_id"]
        address = bldg["address"]

        # Split string
        split_address = address.split(",")
        # Get rid of trailing spaces
        parsed_address = [sa.lstrip() for sa in split_address]
        # Delete nonsensical "00109-800" if it exists in list because I don't know what it means
        rem_str = '00109-800'
        if rem_str in parsed_address: parsed_address.remove(rem_str)
        rem_str = '00152'
        if rem_str in parsed_address: parsed_address.remove(rem_str)
        # Get length of list
        n_addr = len(parsed_address)

        # Update with parsed address before it is modified
        Building.update_one({"_id": bid}, {"$set":{
                "parsed_address": list(parsed_address)
                }})

        # Set parse order (reverse)
        keynames = ["country", "parish", "town", "suburb", "street", "place"]
        nkeys = len(keynames)

        # Initialize variables for while loop
        ii = 0
        address_dict = dict.fromkeys(keynames)

        # Attempt to classify entities within address list
        while ii < nkeys and ii < n_addr:
            address_dict[keynames[ii]] = parsed_address.pop() # return last index and remove it
            ii += 1 # increment

        # If there were elements beyond what I could parse, then add them all to an additional field
        address_dict["additional"] = parsed_address

        # Update building document
        Building.update_one({"_id": bid}, {"$set":{
                "address_dict": dict(address_dict),
                "country": str(address_dict["country"]),
                "parish": str(address_dict["parish"]),
                "town": str(address_dict["town"]),
                "suburb": str(address_dict["suburb"]),
                "street": str(address_dict["street"]),
                "place": str(address_dict["place"])
                }})

        # Print out excepted id
        print("updated: " + bid)
        print(address_dict)

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
