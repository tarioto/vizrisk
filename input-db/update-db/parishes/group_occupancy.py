# Load in dependencies
from pymongo import MongoClient

# Connect to database collection
url = 'mongodb://localhost/'
client = MongoClient(url)
db = client.viz_risk
Building = db.buildings
Parish = db.parishes

# Find all parishes to be quantified
parishObjs = Parish.find() # query to retrieve relevant building docs from db
nPar = parishObjs.count()

# Determine mapping of occupancy classifications to be more generalized
occupancy_map = dict()
occupancy_map["businesses"] = ["alcohol","bakery","bank","bar","beauty","books","boutique","cafe","car","car_parts","car_repair","clothes","company","convenience","distillery","electronics_repair","estate_agent","fast_food","hairdresser","hardware","insurance","jewelry","marketplace","musical_instrument","nightclub","paint","pawnbroker","restaurant","service","shoes","supermarket","ticket","tyres"]
occupancy_map["community"] = ["art","library","pitch","place_of_worship","public_building","social_facility","stadium","studio","museum"]
occupancy_map["emergency"] = ["fire_station","police"] # note: couldn't we also map to hurricane shelters?
occupancy_map["government"] = ["government","embassy"]
occupancy_map["healthcare"] = ["clinic","hospital","pharmacy"]
occupancy_map["housing"] = ["apartment","house","residential","suburb"]
occupancy_map["schools"] = ["childcare","school","university","college"]
occupancy_map["lifelines"] = ["bus_stop","fuel","pier","post_office","telecommunication","terminal","works"]
occupancy_map["tourism"] = ["attraction","beach","car_rental","cave_entrance","guest_house","hostel","hotel","information","travel_agency","viewpoint"]
occupancy_map["unknown"] = ["footway","hamlet","hunting_stand","industrial","island","locality","path","pedestrian","primary","secondary","tertiary","track","unclassified","unknown","village","yes"]
reduced_occupancies = occupancy_map.keys()

# # Update building database
def update(parish):

    try:

        # Get parish id
        sid = parish["_id"]

        # Extract occupancy dictionary
        occupancy_dict = parish["occupancy_dict"]

        # Initialize reduced occupancy dictionary with zeros
        reduced_occ_dict = dict.fromkeys(reduced_occupancies, 0)

        # For each reduced occupancy category, aggregate the number of suboccupancies to get total
        for red_key in reduced_occupancies:
            for key in occupancy_map[red_key]:
                reduced_occ_dict[red_key] += occupancy_dict[key]

        # Update reduced occupancy dictionary
        Parish.update_one({"_id": sid}, {"$set":{
                "reduced_occ_dict" : dict(reduced_occ_dict)
                }})

        # Update with each individual key
        for red_key in reduced_occupancies:
            # Update reduced occupancy field
            Parish.update_one({"_id": sid}, {"$set":{
                    red_key : int(reduced_occ_dict[red_key])
                    }})

        # Print out excepted id
        print("updated: " + sid)

    # Catch any errors and print out id
    except Exception as e:

        # Print out excepted id
        print("skipping: " + sid)
        print(e)

#  Iterate through each doc and call update function
for parishObj in parishObjs:
    # Call update function on each object
    update(parishObj)
