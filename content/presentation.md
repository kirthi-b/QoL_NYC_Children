# Urban Mobility Index

**Authors:** Kit Nga Chou | Kirthi Balakrishnan | Michelle Chen | Lizzie Lee

## Exploring Urban Data with Machine Learning

### Introduction

## Why Mobility?
#### The Need for Better Walkability & Transit

One of the most pressing issues in urban mobility today is the dependency on vehicular transportation.

Cities are slowly but surely understanding the importance of walkable cities, not only for sustainability concerns, but also as a solution for the growing congestion and shortening commute for a better quality of life.

[Image 0]

A tool that can look at the street characteristics of a city and assess its walkability score can be a useful analytical tool for urban planners, especially planners who are working on a city that neither have metrics pre-calculated nor the capacity to produce and work with raw data.

[Image 1]

# Research Question

##### How can we utilize Walkscore.com’s pre-existing datasets of major cities to build a training model that can predict the efficiency of any city and/or neighborhood based on their street connectivity & transit density?

### Methodology

## Framework + Pipeline

[Image 2]

## Datasets

##### Three open-source API-based datasets to attempt reverse-engineering Walkscore.com's methodology

[Image 3]

# 1. Road Maps

Image classification with Keras to identify correlation between visual street network & Walk Scores.

[Image 4]

# 2. Bus Stops

Neighborhood-wise bus stop location identification & occurance calculations.

[Image 5]

# 3. Intersection Nodes

Extracting intersection nodes from openstreetmap plots & calculating densities for each neighborhood.

### Cities

## Training Data
##### Boulder, CO | Ann Arbor, MI | Chicago, IL | Washington D.C. | New York, NY | San Francisco, SF

[Image 6] [Image 7] [Image 8] [Image 9] [Image 10] [Image 11]

## Validation Data
##### Madison, WI | Seattle, WA | Tulsa, OK

[Image 12] [Image 13] [Image 14]

[Image 15]

### Data Preparation

## Webscrapping for Existing Walkscores
### using Beautiful Soup

## Extracting Boundaries
##### using regex & javascript via js2py

Python code that accepts URL input (of a neighborhood) to find the encoded polygon in the page source, decode it, and return vertices.

[Image 16]

Javascript function to reverse-engineer Google Maps dynamic API's encoded polygon decoder.

[Image 17]

### Image Classification with Keras

## URL → EnPath → Polygon

[Image 18]
[Image 19]
[Image 20]

# 1. Dynamic Google Maps API to Static Image
##### Static images do not accept overlaid polygons with holes, which was necessary to extract street data of only a specific boundary

Replace parameters in HTML file & write.

[Image 21]

The PNG image is a raw screenshot.

Convert written HTML file to PNG.

[Image 22]

Use Pillow (PIL) package to clean up image.

[Image 23]

### Keras image classifier: categorical model
## Two Types of Images Compared

The PNG image is a raw screenshot.

[Image 24]

Use Pillow (PIL) package to clean up image.

[Image 25]

### Issues Faced

## Overfitting + Low Validation Accuracy
##### Dropped from methodology

[Image 26]

Unprocessed Image
#### Accuracy

Training accuracy increases. Validation accuracy is fickle.

[Image 27]

Unprocessed Image
#### Loss

Training loss decreases. Validation loss is fickle.

[Image 28]

Processed Image
#### Accuracy

Training accuracy increases. Validation accuracy is stagnant.

[Image 29]

Processed Image
#### Loss

Training loss decreases. Validation loss increases.

### Linear Regression Data Preparation

# 2. Bus Stop Density Mapping

##### Static images do not accept overlaid polygons with holes, which was necessary to extract street data of only a specific boundary

[Image 30]

#### Step 1 — Query
Use Overpass Turbo wizard to generate query.

[Image 31]

#### Step 2 — Extract
Use Overpass API to extract points to Python.

[Image 32]

#### Step 3 — Count
Use bounding box + count to find number of bus stops.

[Image 33]

#### Step 4 — Get Density
By area & population/1000 of the neighborhood.

# 3. Intersection Density Mapping

##### Extracting line plots from Open Street Maps via the osmnx package in Python
##### OSMNX → Street Graph → Graph Nodes

[Image 34] [Image 35] [Image 36] [Image 37] [Image 38] [Image 39] [Image 40] [Image 41] [Image 42] [Image 43] [Image 44] [Image 45] [Image 46] [Image 47] [Image 48] [Image 49]

The entire city's nodal geodata points are extracted and saved to a geodataframe, which is later spatial-joined to the polygon geodataframe created from the decoded Google Maps API javascript file.

The sum of nodes within a boundary is used to calculate the density of nodes within a neighborhood by area and by population/1000.

The dataframe containing density data for both bus stops and intersections is then put through a pred model to predict the range of the Walkscore of a neighborhood.

[Image 50]
[Image 51]

### Application + Algorithm

## Prediction Models
### 3 Clustering Models Attempted

Three different clustering methods were used after splitting the data into 10 classes based on Walkscore.

#### K-MEANS
[Image 52]
Clearly split up based on intersection density.

#### AGGLOMERATIVE CLUSTERING
[Image 53]
Clearly split up based on intersection density.

#### Gaussian Mixture
[Image 54]
Clustering seems more realistic.

### Predictive Models

## Linear Regression
##### Diagonal Correlation in raw data pattern

##### Parameters
Bus Stop and Intersection Densities by Sq. Km. and 1000 capita are used as predictors for the Walk Scores.

(hover to see error difference)

##### Model Metrics
- Mean Walk Score: 71.07
- Root Mean Squared Error: 17.04
- R-Squared: 0.38

### Bus Stop & Intersection densities form 38% of the parameters used in evaluation of Walk Scores.

[Image 55]

### Research Findings

## Results + Implications

We are confident that if we were able to increase the parameters, for instance, strengthening the datasets by adding cities that have diverse neighborhoods with differences in walkability, then we could more accurately predict city’s Walkscores.

## Limitations

#### Disparity in distribution of training and test datasets and their Walkscores

Training Set
[Image 56]

Test Set
[Image 57]

## Improvement Gaps

# 1 — Accuracy
Insufficient; needs more data points; needs more computing power.

# 2 — Parameters
Parameters' r-squared is not enough; more parameters can be added.

# 3 — Scalability
Front-end development to accept different kinds of input to return walkscore.

[Image 58]

### Conclusion

## Next Steps

Our ultimate goal behind creating a predictive Walkscore is to encourage planners to create dynamic and walkable neighborhoods, which provides health and sustainability benefits, and also increases neighborhood connectivity to the disadvantaged populations who might not have access to vehicles.

For the next steps, we would hope to devote more time into classifying each neighborhoods by their streets patterns, such as grid patterns vs. loops pattern, then we can compare if streets patterns have any correlation to a higher or lower Walk Score.
