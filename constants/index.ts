export const countryList = [
  { name: "Angola", image: "/images/angola.webp", code: "ao" },
  { name: "Benin", image: "/images/benin.png", code: "bj" },
  { name: "Burkina Faso", image: "/images/burkina-faso.webp", code: "bf" },
  { name: "Botswana", image: "/images/botswana.png", code: "bw" },
  { name: "Burundi", image: "/images/burundi.png", code: "bi" },
  { name: "Cape Verde", image: "/images/cape-verde.webp", code: "cv" },
  { name: "Cameroon", image: "/images/cameroon.png", code: "cm" },
  {
    name: "Central African Republic",
    image: "/images/central-african-republic.png",
    code: "cf",
  },
  { name: "Chad", image: "", code: "td" },
  { name: "Comoros", image: "/images/comoros.webp", code: "km" },
  { name: "Côte d'Ivoire", image: "/images/cote-d-ivoire.webp", code: "ci" },
  { name: "Djibouti", image: "/images/djibouti.webp", code: "dj" },
  { name: "Algeria", image: "/images/algeria.webp", code: "dz" },
  { name: "Egypt", image: "/images/egypt.png", code: "eg" },
  { name: "Ethiopia", image: "/images/ethiopia.png", code: "et" },
  { name: "Gabon", image: "/images/gabon.webp", code: "ga" },
  { name: "Ghana", image: "/images/ghana.webp", code: "gh" },
  { name: "Guinea", image: "/images/guinea.png", code: "gn" },
  { name: "Gambia, The", image: "/images/gambia.webp", code: "gm" },
  { name: "Gambia", image: "/images/gambia.webp", code: "gm" }, // Duplicate entry
  { name: "Guinea-Bissau", image: "/images/guinea-bissau.png", code: "gw" },
  { name: "Equatorial Guinea", image: "", code: "gq" },
  { name: "Kenya", image: "/images/kenya.webp", code: "ke" },
  { name: "Liberia", image: "/images/liberia.png", code: "lr" },
  { name: "Lesotho", image: "/images/lesotho.webp", code: "ls" },
  { name: "Morocco", image: "/images/morocco.png", code: "ma" },
  { name: "Madagascar", image: "/images/madagascar.png", code: "mg" },
  { name: "Mali", image: "/images/mali.webp", code: "ml" },
  { name: "Mozambique", image: "/images/mozambique.png", code: "mz" },
  { name: "Mauritania", image: "/images/mauritania.webp", code: "mr" },
  { name: "Mauritius", image: "/images/mauritius.png", code: "mu" },
  { name: "Malawi", image: "/images/malawi.png", code: "mw" },
  { name: "Namibia", image: "/images/namibia.png", code: "na" },
  { name: "Niger", image: "/images/niger.png", code: "ne" },
  { name: "Nigeria", image: "/images/nigeria.png", code: "ng" },
  { name: "Rwanda", image: "/images/rwanda.jpg", code: "rw" },
  { name: "Sudan", image: "/images/sudan.png", code: "sd" },
  { name: "Senegal", image: "/images/senegal.webp", code: "sn" },
  { name: "Sierra Leone", image: "/images/sierra-leone.png", code: "sl" },
  { name: "South-Sudan", image: "/images/south-sudan.webp", code: "ss" },
  {
    name: "São Tomé and Príncipe",
    image: "/images/sao-tome-and-principe.webp",
    code: "st",
  },
  { name: "Eswatini", image: "/images/eswatini.webp", code: "sz" },
  { name: "Togo", image: "/images/togo.webp", code: "tg" },
  { name: "Tunisia", image: "/images/tunisia.png", code: "tn" },
  { name: "Tanzania", image: "/images/tanzania.png", code: "tz" },
  { name: "Uganda", image: "/images/uganda.webp", code: "ug" },
  { name: "South Africa", image: "/images/south-africa.png", code: "za" },
  { name: "Zambia", image: "/images/zambia.png", code: "zm" },
  { name: "Zimbabwe", image: "/images/zimbabwe.png", code: "zw" },
  { name: "Congo, Dem. Rep. of", image: "/images/drc.jpg", code: "cd" },
  { name: "Congo, Republic of", image: "/images/congo.png", code: "cg" },
];

export const regionColors = {
  "Africa wide": "#FFF",
  "Western Africa": "#4CAF50", // Green
  "Southern Africa": "#2196F3", // Blue
  "Northern Africa": "#F44336", // Red
  "Eastern Africa": "#9C27B0", // Purple
  "Central Africa": "#FFEB3B", // Yellow
};

//Please refer to the countries in the above array
export const regionList = [
  {
    id: "africa-wide",
    name: "Africa wide",
    code: "afw",
    countries: [...countryList],
    color: "#fff",
  },
  {
    id: "western-africa",
    name: "Western Africa",
    code: "wafr",
    color: "#4CAF50",
    countries: [
      { name: "Benin", color: "#FCD116", code: "bj" }, // Yellow
      { name: "Burkina Faso", color: "#EF2B2D", code: "bf" }, // Red
      {
        name: "Côte d'Ivoire",
        color: "#FF8200", // Orange
        code: "ci",
      },
      { name: "Cape Verde", color: "#002D72", code: "cv" }, // Blue
      { name: "Ghana", color: "#006B3F", code: "gh" }, // Green
      { name: "Guinea", color: "#CE1126", code: "gn" }, // Red
      { name: "Gambia, The", color: "#3A75C4", code: "gm" }, // Blue
      { name: "Gambia", color: "#3A75C4", code: "gm" }, // Blue
      { name: "Guinea-Bissau", color: "#FFCD00", code: "gw" }, // Yellow
      { name: "Liberia", color: "#BF0A30", code: "lr" }, // Red
      { name: "Mali", color: "#14B53A", code: "ml" }, // Green
      { name: "Mauritania", color: "#007A5E", code: "mr" }, // Green
      { name: "Niger", color: "#F77F00", code: "ne" }, // Orange
      { name: "Nigeria", color: "#008751", code: "ng" }, // Green
      { name: "Senegal", color: "#00853F", code: "sn" }, // Green
      { name: "Sierra Leone", color: "#1EB53A", code: "sl" }, // Green
      { name: "Togo", color: "#006A4E", code: "tg" }, // Green
    ],
  },
  {
    id: "southern-africa",
    name: "Southern Africa",
    color: "#2196F3",
    code: "safr",
    countries: [
      { name: "Angola", color: "#000000", code: "ao" }, // Black
      { name: "Botswana", color: "#00BFFF", code: "bw" }, // Blue
      { name: "Lesotho", color: "#0033A0", code: "ls" }, // Blue
      { name: "Mozambique", color: "#007A5E", code: "mz" }, // Green
      { name: "Namibia", color: "#003580", code: "na" }, // Blue
      { name: "South Africa", color: "#007749", code: "za" }, // Green
      { name: "Eswatini", color: "#003DA5", code: "sz" }, // Blue
      { name: "Zambia", color: "#FF4F00", code: "zm" }, // Orange
      { name: "Zimbabwe", color: "#006B3F", code: "zw" }, // Green
    ],
  },
  {
    id: "northern-africa",
    name: "Northern Africa",
    code: "nafr",
    color: "#F44336",
    countries: [
      { name: "Algeria", color: "#006233", code: "dz" }, // Green
      { name: "Egypt", color: "#CE1126", code: "eg" }, // Red
      { name: "Libya", color: "#239E46", code: "ly" }, // Green
      { name: "Morocco", color: "#C1272D", code: "ma" }, // Red
      { name: "Tunisia", color: "#E70013", code: "tn" }, // Red
    ],
  },
  {
    id: "eastern-africa",
    name: "Eastern Africa",
    code: "eafr",
    color: "#9C27B0",
    countries: [
      { name: "Burundi", color: "#008000", code: "bi" }, // Green
      { name: "Comoros", color: "#FFD100", code: "km" }, // Yellow
      { name: "Djibouti", color: "#6AB2E7", code: "dj" }, // Blue
      { name: "Eritrea", color: "#C8102E", code: "er" }, // Red
      { name: "Ethiopia", color: "#FCDD09", code: "et" }, // Yellow
      { name: "Kenya", color: "#006600", code: "ke" }, // Green
      { name: "Madagascar", color: "#007A33", code: "mg" }, // Green
      { name: "Malawi", color: "#C8102E", code: "mw" }, // Red
      { name: "Mauritius", color: "#F7E400", code: "mu" }, // Yellow
      { name: "Rwanda", color: "#00A1DE", code: "rw" }, // Blue
      { name: "Seychelles", color: "#003DA5", code: "sc" }, // Blue
      { name: "Somalia", color: "#418FDE", code: "so" }, // Blue
      { name: "South-Sudan", color: "#1EB53A", code: "ss" }, // Green
      { name: "Sudan", color: "#007A5E", code: "sd" }, // Green
      { name: "Tanzania", color: "#17B169", code: "tz" }, // Green
      { name: "Uganda", color: "#FFD100", code: "ug" }, // Yellow
    ],
  },
  {
    id: "central-africa",
    name: "Central Africa",
    color: "#FFEB3B",
    code: "cafr",
    countries: [
      {
        name: "Central African Republic",
        color: "#003082", // Blue
        code: "cf",
      },
      { name: "Chad", color: "#002664", code: "td" }, // Blue
      { name: "Equatorial Guinea", color: "#418FDE", code: "gq" }, // Blue
      { name: "Cameroon", color: "#007A5E", code: "cm" }, // Green
      { name: "Congo, Dem. Rep. of", color: "#007FFF", code: "cd" }, // Blue
      { name: "Congo, Republic of", color: "#009639", code: "cg" }, // Green
      { name: "Gabon", color: "#009739", code: "ga" }, // Green
      {
        name: "São Tomé and Príncipe",
        color: "#FFCC00", // Yellow
        code: "st",
      },
    ],
  },
];

export const legendData = [
  { color: "#08519C", label: "50 or more" },
  { color: "#3182BD", label: "30 - 50" },
  { color: "#6BAED6", label: "10 - 30" },
  { color: "#BDD7E7", label: "5 - 7.5" },
  { color: "#E6EFF4", label: "0 - 5" },
  { color: "#808080", label: "no data" },
];

//resakss data excel spreadsheets
export const resakssData = {
  "Economic growth and inclusive development": [
    {
      name: "Cereal import dependency ratio (%)",
      path: "/data/resakss/economic-growth-and-inclusive-development/cereal-import-dependency-ratio.xlsx",
    },
    {
      name: "Employment rate (% of labor force, 15-64 years)",
      path: "/data/resakss/economic-growth-and-inclusive-development/employment-rate-of-labor-force-15-64-years.xlsx",
    },
    {
      name: "Employment rate (% of population, 15+ years)",
      path: "/data/resakss/economic-growth-and-inclusive-development/employment-rate-of-population-15-years.xlsx",
    },
    {
      name: "GDP per capita (constant 2015 USD)",
      path: "/data/resakss/economic-growth-and-inclusive-development/GDP-per-capita-constant-2015-USD.xlsx",
    },
    {
      name: "GINI index",
      path: "/data/resakss/economic-growth-and-inclusive-development/GINI-index.xlsx",
    },
    {
      name: "Household consumption expenditure per capita (constant 2015 USD)",
      path: "/data/resakss/economic-growth-and-inclusive-development/household-consumption-expenditure-per-capita-constant-2015-USD.xlsx",
    },
    {
      name: "Poverty Headcount Ratio at $2.15 a day (2017 PPP) (%)",
      path: "/data/resakss/economic-growth-and-inclusive-development/poverty-headcount-ratio-at-2point15-a-day-2017-PPP.xlsx",
    },
    {
      name: "Poverty gap at $2.15 a day (2017 PPP) (%)",
      path: "/data/resakss/economic-growth-and-inclusive-development/poverty-gap-at-2point15-a-day-2017-PPP.xlsx",
    },
    {
      name: "Prevalance of undernourishment (% of population)",
      path: "/data/resakss/economic-growth-and-inclusive-development/prevalance-of-undernourishment-of-population.xlsx",
    },
    {
      name: "Prevalence of stunting, height for age (% of children under 5)",
      path: "/data/resakss/economic-growth-and-inclusive-development/prevalence-of-stunting-height-for-age-of-children-under-5.xlsx",
    },
    {
      name: "Prevalence of underweight, weight for age (% of children under 5)",
      path: "/data/resakss/economic-growth-and-inclusive-development/prevalence-of-underweight-weight-for-age-of-children-under-5.xlsx", //doesnot work
    },
    {
      name: "Prevalence of wasting (% of children under 5)",
      path: "/data/resakss/economic-growth-and-inclusive-development/prevalence-of-wasting-of-children-under-5.xlsx",
    },
  ],
  "Agricultural transformation and growth": [
    {
      name: "Yield, maize (Tons per hectare)",
      path: "/data/resakss/agricultural-transformation-and-growth/yield-maize-tons-per-hectare.xlsx",
    },
    {
      name: "Yield, meat (cattle, kilograms per head)",
      path: "/data/resakss/agricultural-transformation-and-growth/yield-meat-cattle-kilograms-per-head.xlsx",
    },
    {
      name: "Yield, yams (Tons per hectare)",
      path: "/data/resakss/agricultural-transformation-and-growth/yield-yams-tons-per-hectare.xlsx",
    },
    {
      name: "Agrciulture Production Index Number (2014-2016 = 100) (Int. $)",
      path: "/data/resakss/agricultural-transformation-and-growth/agriculture-production-index-number-2014-2016=100-Int.xlsx",
    },
    {
      name: "Agriculture value added per hectare of agricultural land (constant 2015 USD)",
      path: "/data/resakss/agricultural-transformation-and-growth/agriculture-value-added-per-hectare-of-agricultural-land-constant-2015-USD.xlsx",
    },
    {
      name: "Agriculture value added per worker (constant 2015 USD)",
      path: "/data/resakss/agricultural-transformation-and-growth/agriculture-value-added-per-worker-constant-2015-USD.xlsx",
    },
    {
      name: "Domestic food price volatility (index)",
      path: "/data/resakss/agricultural-transformation-and-growth/domestic-food-price-volatility-index.xlsx",
    },
    {
      name: "Intra-African agricultural trade, exports (constant 2015 US$, billion)",
      path: "/data/resakss/agricultural-transformation-and-growth/intra-african-agricultural-trade-exports-constant-2015-US-billion.xlsx",
    },
    {
      name: "Intra-African agricultural trade, imports (constant 2015 USD, billion)",
      path: "/data/resakss/agricultural-transformation-and-growth/intra-african-agricultural-trade-imports-constant-2015-USD-billion.xlsx",
    },
    {
      name: "Yield, cassava (Tons per hectare)",
      path: "/data/resakss/agricultural-transformation-and-growth/yield-cassava-tons-per-hectare.xlsx",
    },
    {
      name: "Yield, milk (whole fresh cow, kilograms per head)",
      path: "/data/resakss/agricultural-transformation-and-growth/yield-milk-whole-fresh-cow-kilograms-per-head.xlsx",
    },
  ],
  "Systemic capacity to deliver results": [
    {
      name: "Government agriculture expenditure (% of agriculture value added)",
      path: "/data/resakss/systemic-capacity-to-deliver-results/government-agriculture-expenditure-of-agriculture-value-added.xlsx",
    },
    {
      name: "Government agriculture expenditure (% of total expenditure)",
      path: "/data/resakss/systemic-capacity-to-deliver-results/government-agriculture-expenditure-of-total-expenditure.xlsx",
    },
    {
      name: "Government agriculture expenditure (constant 2015 US$, billion)",
      path: "/data/resakss/systemic-capacity-to-deliver-results/government-agriculture-expenditure-constant-2015-US-billion.xlsx",
    },
  ],
  Other: [
    {
      name: "Agricultural ODA (% of commitements)",
      path: "/data/resakss/other/agricultural-ODA-of-commitments.xlsx",
    },
    {
      name: "Agricultural ODA (% total ODA)",
      path: "/data/resakss/other/agricultural-ODA-total-ODA.xlsx",
    },
    {
      name: "Agricultural exports (% of total merchandise exports)",
      path: "/data/resakss/other/agricultural-exports-of-total-merchandise-exports.xlsx",
    },
    {
      name: "Agricultural imports (% of total merchandise imports)",
      path: "/data/resakss/other/agricultural-imports-of-total-merchandise-imports.xlsx",
    },
    {
      name: "Agricultural value added (% GDP)",
      path: "/data/resakss/other/agricultural-value-added-GDP.xlsx",
    },
    {
      name: "Agriculture value added gowth rate (%)",
      path: "/data/resakss/other/agriculture-value-added-growth-rate.xlsx",
    },
    {
      name: "Annual inflation, GDP deflator (%)",
      path: "/data/resakss/other/annual-inflation-GDP-deflator.xlsx",
    },
    {
      name: "Emergency food aid (% total ODA)",
      path: "/data/resakss/other/emergency-food-aid-total-ODA.xlsx",
    },
    {
      name: "General government gross debt (% of GDP)",
      path: "/data/resakss/other/general-government-gross-debt-of-GDP.xlsx",
    },
    {
      name: "General government gross revenue (% of GDP)",
      path: "/data/resakss/other/general-government-gross-revenue-of-GDP.xlsx",
    },
    {
      name: "Global Hunger Index",
      path: "/data/resakss/other/global-hunger-index.xlsx",
    },
    {
      name: "Gross Domestic Product (constant 2015 US$, billion)",
      path: "/data/resakss/other/gross-domestic-product-constant-2015-US-billion.xlsx",
    },
    {
      name: "Ratio of agricultural exports to agricultural imports",
      path: "/data/resakss/other/ratio-of-agricultural-exports-to-agricultural-imports.xlsx",
    },
    {
      name: "Total fertilizer consumption (kilogram per hectare)",
      path: "/data/resakss/other/total-fertilizer-consumption-kilogram-per-hectare.xlsx",
    },
  ],
};
