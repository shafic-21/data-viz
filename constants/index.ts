export const countryList = [
  "Angola",
  "Burundi",
  "Benin",
  "Burkina Faso",
  "Botswana",
  "Central African Republic",
  "Côte d'Ivoire",
  "Cameroon",
  "Congo, Dem. Rep. of",
  "Congo, Republic of",
  "Comoros",
  "Cape Verde",
  "Djibouti",
  "Algeria",
  "Egypt",
  "Ethiopia",
  "Gabon",
  "Ghana",
  "Guinea",
  "Gambia, The",
  "Guinea-Bissau",
  "Kenya",
  "Liberia",
  "Libya",
  "Lesotho",
  "Morocco",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "São Tomé and Príncipe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Swaziland",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
];

export const regionList = [
  {
    id: "africa-wide",
    region: "Africa wide",
    countries: [...countryList],
  },
  {
    id: "Western Africa",
  },
  { id: "Southern Africa" },
  { id: "Northern Africa" },
  { id: "Eastern Africa" },
  { id: "Central Africa" },

  /*regions
{
  region,
  countries:[

  ]
}
*/
];
export const legendData = [
  { color: "#08519C", label: "50 or more" },
  { color: "#3182BD", label: "30 - 50" },
  { color: "#6BAED6", label: "10 - 30" },
  { color: "#BDD7E7", label: "5 - 7.5" },
  { color: "#E6EFF4", label: "0 - 5" },
  { color: "#808080", label: "no data" },
];
