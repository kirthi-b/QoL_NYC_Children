# Quality of Life Index for NYC Children

A geospatial analysis project that constructs a composite **Quality of Life (QoL) Index** for children across New York City, aggregated by [Public Use Microdata Area (PUMA)](https://www.census.gov/programs-surveys/geography/guidance/geo-areas/pumas.html). The index integrates indicators from four domains — Access, Economic, Environmental, and Social — into a single normalized score (0–10) visualized as interactive choropleth maps.

## Motivation

Understanding the quality of life for children across NYC neighborhoods requires looking beyond any single metric. This project brings together infrastructure accessibility, economic conditions, environmental quality, and demographic context into one comparable framework, enabling data-driven insights into geographic disparities.

## Index Domains

| Domain | Indicators | Source |
|--------|-----------|--------|
| **Access** | Bus stops, subway stations, healthcare facilities, libraries, parks (density per PUMA area) | NYC Open Data shapefiles |
| **Economic** | Median household income, rent burden (gross rent as % of income) | 2019 ACS 5-Year Estimates |
| **Environmental** | Fine particulate matter (PM2.5), water quality (chlorine, turbidity, fluoride) | NYC Open Data Portal API |
| **Social** | Population under 18, age-group breakdowns, race/ethnicity composition | 2019 ACS 5-Year Estimates |

### Scoring Methodology

1. All indicators are normalized to a **0–10 scale** using `sklearn.preprocessing.MinMaxScaler`
2. **Infrastructure access** is measured as density (count / PUMA area)
3. **Inverse scoring** is applied where lower values are better (e.g., lower PM2.5 = higher score; rent burden >= 35% = score of 1)
4. Component scores are summed and re-scaled to produce the final **composite QoL index (0–10)**

## Project Structure

```
QoL_NYC_Children/
├── Access/                          # Infrastructure accessibility analysis
│   ├── Access.ipynb                 #   Spatial joins & density calculations
│   ├── Data/                        #   Shapefiles: bus stops, subway, healthcare,
│   │   ├── Bus Stops/               #   libraries, parks, PUMA boundaries
│   │   ├── Healthcare/
│   │   ├── NYCLibrary/
│   │   ├── Parks Properties/
│   │   ├── PUMA/
│   │   └── Subway Stations/
│   └── Output/                      #   GeoJSON outputs per infrastructure type
│
├── Economic/                        # Economic indicators
│   ├── MedIncome_RentBurden.ipynb   #   Combined analysis notebook
│   ├── Data/                        #   Census data, PUMA-CD mappings, shapefiles
│   │   ├── Economic.ipynb           #   Median income processing
│   │   └── Rent_Burden.ipynb        #   Rent burden processing
│   └── Output/                      #   econ_gdf.csv, econ_gdf.json
│
├── Environmental/                   # Environmental quality analysis
│   ├── Environments.ipynb           #   API queries for air & water quality
│   ├── Data/                        #   Air quality, water quality, parks data
│   └── Outputs/                     #   aq_gdf.csv
│
├── Social/                          # Demographic & social indicators
│   ├── Social.ipynb                 #   ACS demographic data processing
│   ├── Data/                        #   Census demographic spreadsheets
│   └── Output/                      #   soc_ult_gdf.csv, soc_ult_gdf.json
│
├── Data Visualization/              # Final synthesis & visualization
│   ├── Data Visualization.ipynb     #   Main visualization notebook
│   ├── Economic_Visualization.ipynb #   Income & rent burden choropleths
│   ├── Access_Visualization.ipynb   #   Infrastructure density heatmaps
│   ├── Index Creation/              #   Composite QoL index construction
│   ├── Outputs/                     #   HTML maps, JSON data, PNG diagrams
│   │   ├── index.html               #     Final QoL index choropleth
│   │   ├── plot_eco.html            #     Median income map
│   │   └── plot_rb.html             #     Rent burden map
│   ├── econ_gdf.csv
│   └── soc_ult_gdf.csv
│
├── nyc2010census_tabulation_equiv.xlsx  # Census-PUMA equivalency table
└── README.md
```

## Key Outputs

- **Interactive QoL Index Map** (`Data Visualization/Outputs/index.html`) — composite score by PUMA on a Viridis color scale
- **Median Income Choropleth** (`Data Visualization/Outputs/plot_eco.html`)
- **Rent Burden Choropleth** (`Data Visualization/Outputs/plot_rb.html`)
- **Infrastructure Density Heatmaps** — healthcare, bus stops, libraries, subway stations, parks
- **Population Composition Charts** — race/ethnicity and age-group bar charts

## Tech Stack

| Category | Libraries |
|----------|----------|
| Geospatial | `geopandas`, `shapely`, `fiona`, `rtree` |
| Visualization | `plotly`, `folium`, `matplotlib`, `seaborn` |
| Data | `pandas`, `numpy`, `scikit-learn` |
| APIs | `sodapy` (NYC Open Data / Socrata) |
| Environment | Google Colab, Mapbox |

## Data Sources

- [NYC Open Data Portal](https://opendata.cityofnewyork.us/) — bus stops, subway stations, healthcare facilities, libraries, parks, air quality, water quality
- [U.S. Census Bureau ACS 2019 5-Year Estimates](https://data.census.gov/) — median household income, rent burden, demographics
- [NYC PUMA Boundaries](https://www.census.gov/geographies/reference-maps/2010/geo/2010-pumas/new-york.html) — 2010 PUMA shapefiles

## Getting Started

### Prerequisites

```bash
pip install geopandas shapely pandas numpy plotly folium scikit-learn sodapy matplotlib seaborn
```

### Running the Analysis

The notebooks are designed to run in order:

1. **Domain notebooks** (can run in parallel):
   - `Access/Access.ipynb` — processes infrastructure shapefiles into density metrics
   - `Economic/Data/Economic.ipynb` + `Economic/Data/Rent_Burden.ipynb` — processes census economic data
   - `Environmental/Environments.ipynb` — queries NYC Open Data APIs for air & water quality
   - `Social/Social.ipynb` — processes ACS demographic data

2. **Visualization & Index** (depends on step 1 outputs):
   - `Data Visualization/Access_Visualization.ipynb` — generates infrastructure heatmaps
   - `Data Visualization/Economic_Visualization.ipynb` — generates economic choropleths
   - `Data Visualization/Index Creation/` — constructs the composite QoL index

## Known Limitations

- PUMA-level merges result in some data loss (~29 of 55 PUMAs matched for median income due to code mismatches between data sources)
- All domain components are equally weighted in the composite index
- Temporal mismatches exist between data sources (2019 Census vs. ongoing environmental monitoring)
- Water quality data is uniform across the city (municipal supply), limiting its geographic discriminatory power

## License

This project was developed for academic purposes.
