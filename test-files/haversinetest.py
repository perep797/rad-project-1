import haversine as hs
from haversine import Unit
#will need to import data from API, somehow
loc1=(28.426846,77.088834) #user_location
loc2=(28.394231,77.050308) #server_location
distance = hs.haversine(loc1,loc2, unit = Unit.MILES)
distance_rounded = round(distance, 2) #rounds distance
print(distance_rounded, "miles")
#could have option to switch btwn km and miles

#I can't believe this works......



