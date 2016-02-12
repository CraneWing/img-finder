## ImgFinder: FreeCodeCamp API Basejump #4

This is the fourth of five FCC Full Stack API challenges to build an abstraction layer, which Wikipedia defines as "an application programming interface which unifies the communication between a computer application and databases."

This one specifically is for finding images that contain words from a search string; "lolcats funny" was the search query given in the FCC sample app. A JSON array of feline images is returned, each of which had "lolcats" and "funny" in their metadata, URL, etc.

Each object has an image URL, snippet with search terms, image thumbnail and actual URL where the image can be seen in original context. The images are "scraped" from gstatic, Google's static storage of web images.

