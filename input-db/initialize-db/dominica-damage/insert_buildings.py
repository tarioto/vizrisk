# Load in dependencies
from pymongo import MongoClient
import pandas

# Connect to database collection
url = 'mongodb://localhost' # connection url
client = MongoClient(url)
db = client.viz_risk # database name
Building = db.buildings # collection of interest

# Read in provided csv
dat = pandas.read_csv('data/dominica_damage_buildings_Rev.csv')
# Keys: record_id,lon,lat,site_id,sensor_date,sensor_id,confidence_level,field_valid,settlement,notes,main_damage,grouped_damage,staff_id,event_code,image_id,agency_id
uniqueBuilding = dat['record_id']
numBuilding = uniqueBuilding.count()

# Insert building into collection to initialize
def insert(df, i):

    # Get building id
    bldg = df.loc[i,'record_id']
    lat = df.loc[i,'lat']
    lng = df.loc[i,'lon']
    main_damage = df.loc[i,'main_damage']
    grouped_damage = df.loc[i,'grouped_damage']
    confidence_level = df.loc[i,'confidence_level']

    # Use try-catch to handle and print out errors
    try:

        # Attempt to insert new building document
        bldgobj = Building.insert_one({"_id": bldg,
                                        "lat": float(lat),
                                        "lng": float(lng),
                                        "main_damage": str(main_damage),
                                        "grouped_damage": str(grouped_damage),
                                        "confidence_level": str(confidence_level)})

        # Print inserted id
        print("inserted: " + bldg)

    except Exception as e: # Store error as variable e

        # Print out excepted id
        print("skipping: " + bldg)
        print(e)

# Iterate through buildigns provided in CSV
for indBuilding in range(0,numBuilding):
    # Call insert function defined above
    insert(dat, indBuilding)
