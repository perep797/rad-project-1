import folium
import os

map = folium.Map(location = (49.25, -123.12), zoom_start = 13, tiles="cartodb positron") #specifies location based on lat and long; zoom level upon opening, 13 is a good level; style of map

#should add specific variables for locations 1 and 2

folium.Marker([49.25, -123.12], #location 1
               pin = 'location 1').add_to(map)

folium.Marker([51, -125], #location 2
               pin = 'location 2').add_to(map)

folium.PolyLine(locations = [(49.25, -123.12), (51, -125)],
                line_opacity = 0.5).add_to(map) #adds line bwtn two locations

map.save("examplemap.html")

# os.remove("footprint.html")

#possible cropped map visual in extension window? might be too much trouble