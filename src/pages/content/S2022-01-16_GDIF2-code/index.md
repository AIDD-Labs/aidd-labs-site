---
slug: "GDIF2-code" # match folder label name
createdDate: 2022-01-16
date: 2022-01-16
status: "published"
topics: ["impact", "statistical-modeling"] # "recovery", "impact", "statistical-modeling"
locations: [] # "nepal", "new-zealand", "haiti", "italy"
type: "software" # "blog", "report", "journal-article", "visualization"
section: ["contents"]
members: ["sabine-loos"] # insert your slug here, e.g., "sabine-loos"
project: "all" # associate this with the slug for a project
is_featured: false
url: "https://sabineloos.github.io/GDIF-Gen/Diagnostics.html" # include link to open pdf file
thumbnail: "img/content-s-gdif2-software.png" # upload square version of the content to img folder and add source here, e.g., "img/content-b-ier-nepal.png"
title: "Geostatistical Data Integration Framework Diagnostics Software" # insert title here
authors: "Sabine Loos" # insert full author list here, to be listed publicly
publication: "Github" # insert publication location here (like the journal)
description: "Code to accompany Efficacy of Damage Data Integration: A Comparative Analysis of Four Major Earthquakes published in Natural Hazards Review" # insert a one sentence description here
citation: "Sabine Loos. (2022). sabineloos/GDIF-Gen: Submission Release (v1.0.0). Zenodo." # add the citation here, in APA format
citationLink: "https://doi.org/10.5281/zenodo.5857694"
abstract: "" # add the abstract here
---

We created an interactive R notebook to accompany the Recommendations section of our article “Efficacy of Damage Data Integration: A Comparative Analysis of Four Major Earthquakes” published in Natural Hazards Review in 2022 (find that article <Link doOpenInNewTab to="gdif-efficacy"> here </Link>).

![](./content-s-gdif2-software.png)
<Link is-button doOpenInNewTab to="https://sabineloos.github.io/GDIF-Gen/Diagnostics.html"> Interactive Code </Link>

The source code and some of the data used to produce this notebook is located in a Github repository. The main script in this repository is Diagnostics.Rmd in the /code folder. This produces the interactive script that mainly supports the "Recommendations" section of the above paper. Unfortunately, due to data privacy requirements, we are unable to share the data that was used to develop this code. However, if you are interested in running this with your own data, please contact me. In the interactive script, you will still be able to see all the results from running this Diagnostics.Rmd file with the input data. You also have access to all the necessary functions to run this code.

<Link is-button doOpenInNewTab to="https://github.com/sabineloos/GDIF-Gen/tree/main"> Github Repository </Link>