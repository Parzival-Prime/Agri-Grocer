
// data/india-states-complete.ts
export interface City {
  label: string;
  value: string;
}

export interface State {
  label: string;
  value: string;
  citiesList: City[];
}


// // Andhra Pradesh (13+ cities)
// const apCities: City[] = [
//   { label: "Adoni", value: "ADI" }, { label: "Amaravati", value: "AMT" }, { label: "Anantapur", value: "ATP" },
//   { label: "Chandragiri", value: "CDG" }, { label: "Chittoor", value: "CTR" }, { label: "Ddowdlepalem", value: "DPL" },
//   { label: "Dharmavaram", value: "DVM" }, { label: "Eluru", value: "ELU" }, { label: "Guntur", value: "GNT" },
//   { label: "Kadapa", value: "KDP" }, { label: "Kakinada", value: "KAK" }, { label: "Kurnool", value: "KRK" },
//   { label: "Machilipatnam", value: "MCT" }, { label: "Madhurawada", value: "MDW" }, { label: "Nandyal", value: "NDL" },
//   { label: "Narasaraopet", value: "NSP" }, { label: "Nellore", value: "NLR" }, { label: "Nidadavole", value: "NVD" },
//   { label: "Rajahmundry", value: "RJY" }, { label: "Rajampet", value: "RJP" }, { label: "Ramachandrapuram", value: "RCP" },
//   { label: "Srikakulam", value: "SKM" }, { label: "Srikalahasti", value: "SKH" }, { label: "Suryapet", value: "SPT" },
//   { label: "Tadpatri", value: "TDP" }, { label: "Tadepalligudem", value: "TPG" }, { label: "Tanuku", value: "TNK" },
//   { label: "Tenali", value: "TNL" }, { label: "Tirupati", value: "TIR" }, { label: "Vijayawada", value: "VJA" },
//   { label: "Visakhapatnam", value: "VIZ" }, { label: "Vizianagaram", value: "VZM" }
// ];

// // Arunachal Pradesh (5+ cities)
// const arCities: City[] = [
//   { label: "Anini", value: "ANI" }, { label: "Bomdila", value: "BMD" }, { label: "Changlang", value: "CLG" },
//   { label: "Itanagar", value: "ITA" }, { label: "Pasighat", value: "PSG" }, { label: "Seppa", value: "SEP" },
//   { label: "Tezu", value: "TEZ" }, { label: "Ziro", value: "ZRO" }
// ];

// // Assam (20+ cities)
// const asCities: City[] = [
//   { label: "Barpeta", value: "BPT" }, { label: "Bongaigaon", value: "BGG" }, { label: "Dibrugarh", value: "DBG" },
//   { label: "Dispur", value: "DIS" }, { label: "Diphu", value: "DIP" }, { label: "Goalpara", value: "GLP" },
//   { label: "Golaghat", value: "GLH" }, { label: "Guwahati", value: "GHY" }, { label: "Haflong", value: "HFL" },
//   { label: "Jogighopa", value: "JGP" }, { label: "Karimganj", value: "KRM" }, { label: "Kokrajhar", value: "KJR" },
//   { label: "Mankachar", value: "MNK" }, { label: "Mariani", value: "MRN" }, { label: "North Lakhimpur", value: "NLP" },
//   { label: "Nagaon", value: "NGO" }, { label: "Sibsagar", value: "SBS" }, { label: "Silchar", value: "SIL" },
//   { label: "Tezpur", value: "TPR" }, { label: "Tinsukia", value: "TSK" }
// ];

// // Bihar (25+ cities)
// const brCities: City[] = [
//   { label: "Arrah", value: "ARR" }, { label: "Arwal", value: "AWL" }, { label: "Aurangabad", value: "ABD" },
//   { label: "Bagaha", value: "BGH" }, { label: "Begusarai", value: "BSR" }, { label: "Bettiah", value: "BTH" },
//   { label: "Bhabua", value: "BHB" }, { label: "Bhagalpur", value: "BHP" }, { label: "Bhojpur", value: "BHP" },
//   { label: "Banka", value: "BNK" }, { label: "Buxar", value: "BXR" }, { label: "Chhapra", value: "CHR" },
//   { label: "Darbhanga", value: "DBG" }, { label: "Dehri", value: "DHR" }, { label: "Gaya", value: "GAY" },
//   { label: "Gopalganj", value: "GPG" }, { label: "Jamui", value: "JMU" }, { label: "Jehanabad", value: "JHD" },
//   { label: "Katihar", value: "KTH" }, { label: "Kishanganj", value: "KSJ" }, { label: "Madhepura", value: "MDP" },
//   { label: "Madhubani", value: "MBD" }, { label: "Munger", value: "MNG" }, { label: "Muzaffarpur", value: "MZP" },
//   { label: "Nalanda", value: "NLD" }, { label: "Purnia", value: "PRN" }, { label: "Patna", value: "PAT" },
//   { label: "Saharsa", value: "SHR" }, { label: "Samastipur", value: "SMP" }, { label: "Saran", value: "SRN" },
//   { label: "Sheikhpura", value: "SKP" }, { label: "Sheohar", value: "SHO" }, { label: "Vaishali", value: "VSH" }
// ];

// // Chhattisgarh (15+ cities)
// const cgCities: City[] = [
//   { label: "Ambikapur", value: "AMB" }, { label: "Bastar", value: "BST" }, { label: "Bhilai", value: "BHI" },
//   { label: "Bijapur", value: "BJP" }, { label: "Bilaspur", value: "BLP" }, { label: "Chirimiri", value: "CHR" },
//   { label: "Dhamtari", value: "DMT" }, { label: "Durg", value: "DUR" }, { label: "Jagdalpur", value: "JGD" },
//   { label: "Janjgir", value: "JNJ" }, { label: "Kanker", value: "KNK" }, { label: "Korba", value: "KRB" },
//   { label: "Koriya", value: "KRY" }, { label: "Mahasamund", value: "MSU" }, { label: "Raigarh", value: "RGD" },
//   { label: "Raipur", value: "RAI" }, { label: "Rajnandgaon", value: "RNJ" }
// ];

// // Goa (8+ cities)
// const gaCities: City[] = [
//   { label: "Baga", value: "BGA" }, { label: "Calangute", value: "CLG" }, { label: "Candolim", value: "CDL" },
//   { label: "Colva", value: "CLV" }, { label: "Mapusa", value: "MAP" }, { label: "Margao", value: "MRG" },
//   { label: "Panaji", value: "PNJ" }, { label: "Vasco da Gama", value: "VGA" }
// ];

// // Gujarat (40+ cities)
// const gjCities: City[] = [
//   { label: "Ahmedabad", value: "AHM" }, { label: "Amreli", value: "AML" }, { label: "Anand", value: "ANJ" },
//   { label: "Anjar", value: "ANJ" }, { label: "Bharuch", value: "BHC" }, { label: "Bhavnagar", value: "BHV" },
//   { label: "Bhuj", value: "BHU" }, { label: "Botad", value: "BTD" }, { label: "Dahod", value: "DHD" },
//   { label: "Gandhidham", value: "GDM" }, { label: "Gandhinagar", value: "GAN" }, { label: "Jamnagar", value: "JAM" },
//   { label: "Junagadh", value: "JUN" }, { label: "Porbandar", value: "PBD" }, { label: "Rajkot", value: "RKT" },
//   { label: "Surat", value: "STU" }, { label: "Vadodara", value: "VAD" }, { label: "Vapi", value: "VPI" }
// ];

// // Haryana (20+ cities)
// const hrCities: City[] = [
//   { label: "Ambala", value: "AMB" }, { label: "Bhiwani", value: "BHI" }, { label: "Faridabad", value: "FAR" },
//   { label: "Fatehabad", value: "FTB" }, { label: "Gurugram", value: "GGN" }, { label: "Hisar", value: "HSR" },
//   { label: "Jind", value: "JND" }, { label: "Karnal", value: "KRL" }, { label: "Panipat", value: "PNP" },
//   { label: "Panchkula", value: "PCK" }, { label: "Rewari", value: "RWR" }, { label: "Rohtak", value: "RTK" },
//   { label: "Sirsa", value: "SRS" }, { label: "Sonipat", value: "SNP" }, { label: "Yamunanagar", value: "YNJ" }
// ];

// // Himachal Pradesh (12+ cities)
// const hpCities: City[] = [
//   { label: "Bilaspur", value: "BLP" }, { label: "Chamba", value: "CHB" }, { label: "Dharamshala", value: "DHA" },
//   { label: "Hamirpur", value: "HMR" }, { label: "Kangra", value: "KGR" }, { label: "Kullu", value: "KUL" },
//   { label: "Mandi", value: "MND" }, { label: "Nahan", value: "NHN" }, { label: "Shimla", value: "SHI" },
//   { label: "Solan", value: "SLN" }, { label: "Una", value: "UNA" }
// ];





    // data/india-states.js


// Major 5 cities per state/UT
const apCities = [
  { label: "Amaravati", value: "AMT" },
  { label: "Visakhapatnam", value: "VIZ" },
  { label: "Vijayawada", value: "VJA" },
  { label: "Guntur", value: "GNT" },
  { label: "Tirupati", value: "TIR" }
];

const arCities = [
  { label: "Itanagar", value: "ITA" },
  { label: "Pasighat", value: "PSG" },
  { label: "Ziro", value: "ZRO" },
  { label: "Bomdila", value: "BMD" },
  { label: "Tezu", value: "TEZ" }
];

const asCities = [
  { label: "Guwahati", value: "GHY" },
  { label: "Dibrugarh", value: "DBG" },
  { label: "Silchar", value: "SIL" },
  { label: "Tezpur", value: "TPR" },
  { label: "Jorhat", value: "JRH" }
];

const brCities = [
  { label: "Patna", value: "PAT" },
  { label: "Gaya", value: "GAY" },
  { label: "Bhagalpur", value: "BHP" },
  { label: "Muzaffarpur", value: "MZP" },
  { label: "Darbhanga", value: "DBG" }
];

const cgCities = [
  { label: "Raipur", value: "RAI" },
  { label: "Bhilai", value: "BHI" },
  { label: "Durg", value: "DUR" },
  { label: "Bilaspur", value: "BLP" },
  { label: "Jagdalpur", value: "JGD" }
];

const gaCities = [
  { label: "Panaji", value: "PNJ" },
  { label: "Margao", value: "MRG" },
  { label: "Vasco da Gama", value: "VGA" },
  { label: "Mapusa", value: "MAP" },
  { label: "Ponda", value: "PON" }
];

const gjCities = [
  { label: "Ahmedabad", value: "AHM" },
  { label: "Surat", value: "STU" },
  { label: "Vadodara", value: "VAD" },
  { label: "Rajkot", value: "RKT" },
  { label: "Gandhinagar", value: "GAN" }
];

const hrCities = [
  { label: "Gurugram", value: "GGN" },
  { label: "Faridabad", value: "FAR" },
  { label: "Panipat", value: "PNP" },
  { label: "Ambala", value: "AMB" },
  { label: "Yamunanagar", value: "YNJ" }
];

const hpCities = [
  { label: "Shimla", value: "SHI" },
  { label: "Dharamshala", value: "DHA" },
  { label: "Mandi", value: "MND" },
  { label: "Solan", value: "SLN" },
  { label: "Kullu", value: "KUL" }
];

const jhCities = [
  { label: "Ranchi", value: "RAN" },
  { label: "Jamshedpur", value: "JSR" },
  { label: "Dhanbad", value: "DHN" },
  { label: "Bokaro", value: "BOK" },
  { label: "Deoghar", value: "DEO" }
];

const kaCities = [
  { label: "Bengaluru", value: "BLR" },
  { label: "Mysuru", value: "MYS" },
  { label: "Hubli", value: "HUB" },
  { label: "Mangaluru", value: "IXE" },
  { label: "Belagavi", value: "BGI" }
];

const klCities = [
  { label: "Thiruvananthapuram", value: "TVM" },
  { label: "Kochi", value: "COK" },
  { label: "Kozhikode", value: "CCJ" },
  { label: "Thrissur", value: "TRI" },
  { label: "Kollam", value: "QLM" }
];

const mpCities = [
  { label: "Bhopal", value: "BHO" },
  { label: "Indore", value: "IDR" },
  { label: "Gwalior", value: "GWL" },
  { label: "Jabalpur", value: "JBP" },
  { label: "Ujjain", value: "UJJ" }
];

const mhCities = [
  { label: "Mumbai", value: "BOM" },
  { label: "Pune", value: "PNQ" },
  { label: "Nagpur", value: "NAG" },
  { label: "Nashik", value: "ISK" },
  { label: "Aurangabad", value: "IXU" }
];

const mnCities = [
  { label: "Imphal", value: "IMF" },
  { label: "Churachandpur", value: "CCP" },
  { label: "Thoubal", value: "TBL" },
  { label: "Bishnupur", value: "BSP" },
  { label: "Ukhrul", value: "UKL" }
];

const mlCities = [
  { label: "Shillong", value: "SHL" },
  { label: "Tura", value: "TUR" },
  { label: "Jowai", value: "JOW" },
  { label: "Nongpoh", value: "NPO" },
  { label: "Williamnagar", value: "WGN" }
];

const mzCities = [
  { label: "Aizawl", value: "AJL" },
  { label: "Lunglei", value: "LZN" },
  { label: "Serchhip", value: "SCR" },
  { label: "Champhai", value: "CHP" },
  { label: "Kolasib", value: "KLS" }
];

const nlCities = [
  { label: "Kohima", value: "KOH" },
  { label: "Dimapur", value: "DMU" },
  { label: "Mokokchung", value: "MOK" },
  { label: "Tuensang", value: "TUN" },
  { label: "Zunheboto", value: "ZBT" }
];

const odCities = [
  { label: "Bhubaneswar", value: "BBI" },
  { label: "Cuttack", value: "CTC" },
  { label: "Rourkela", value: "RKP" },
  { label: "Berhampur", value: "BAM" },
  { label: "Sambalpur", value: "SLR" }
];

const pbCities = [
  { label: "Amritsar", value: "ATQ" },
  { label: "Ludhiana", value: "LUH" },
  { label: "Jalandhar", value: "JUC" },
  { label: "Patiala", value: "PTA" },
  { label: "Bathinda", value: "BAT" }
];

const rjCities = [
  { label: "Jaipur", value: "JAI" },
  { label: "Jodhpur", value: "JDH" },
  { label: "Udaipur", value: "UDR" },
  { label: "Kota", value: "KTA" },
  { label: "Bikaner", value: "BKI" }
];

const skCities = [
  { label: "Gangtok", value: "GTO" },
  { label: "Mangan", value: "MGN" },
  { label: "Gyalshing", value: "GYS" },
  { label: "Namchi", value: "NMC" },
  { label: "Geyzing", value: "GYZ" }
];

const tnCities = [
  { label: "Chennai", value: "MAA" },
  { label: "Coimbatore", value: "CJB" },
  { label: "Madurai", value: "IXM" },
  { label: "Salem", value: "SXV" },
  { label: "Tiruchirappalli", value: "TRZ" }
];

const tsCities = [
  { label: "Hyderabad", value: "HYD" },
  { label: "Warangal", value: "WGL" },
  { label: "Nizamabad", value: "NZB" },
  { label: "Karimnagar", value: "KRM" },
  { label: "Khammam", value: "KMM" }
];

const trCities = [
  { label: "Agartala", value: "IXA" },
  { label: "Udaipur", value: "UDR" },
  { label: "Dharmanagar", value: "DMG" },
  { label: "Kailasahar", value: "KLS" },
  { label: "Ambassa", value: "AMB" }
];

const upCities = [
  { label: "Lucknow", value: "LKO" },
  { label: "Kanpur", value: "KNU" },
  { label: "Ghaziabad", value: "GZB" },
  { label: "Agra", value: "AGR" },
  { label: "Varanasi", value: "VNS" }
];

const ukCities = [
  { label: "Dehradun", value: "DED" },
  { label: "Haldwani", value: "HDW" },
  { label: "Roorkee", value: "RKJ" },
  { label: "Haridwar", value: "HAR" },
  { label: "Rudrapur", value: "RUD" }
];

const wbCities = [
  { label: "Kolkata", value: "CCU" },
  { label: "Siliguri", value: "SXI" },
  { label: "Durgapur", value: "RDP" },
  { label: "Asansol", value: "ASN" },
  { label: "Burdwan", value: "BWN" }
];

// Union Territories
const dlCities = [
  { label: "New Delhi", value: "DEL" }
];

const jkCities = [
  { label: "Srinagar", value: "SXR" },
  { label: "Jammu", value: "IXJ" },
  { label: "Anantnag", value: "ANN" },
  { label: "Baramulla", value: "BRM" },
  { label: "Pulwama", value: "PLW" }
];

const laCities = [
  { label: "Leh", value: "IXL" },
  { label: "Kargil", value: "KRG" }
];

const chCities = [
  { label: "Chandigarh", value: "CHD" }
];

const pyCities = [
  { label: "Puducherry", value: "PNY" },
  { label: "Karaikal", value: "KIK" },
  { label: "Mahe", value: "MAH" },
  { label: "Yanam", value: "YAN" }
];


export const indianStates = [
  { label: "Andhra Pradesh", value: "AP", citiesList: apCities },
  { label: "Arunachal Pradesh", value: "AR", citiesList: arCities },
  { label: "Assam", value: "AS", citiesList: asCities },
  { label: "Bihar", value: "BR", citiesList: brCities },
  { label: "Chhattisgarh", value: "CG", citiesList: cgCities },
  { label: "Goa", value: "GA", citiesList: gaCities },
  { label: "Gujarat", value: "GJ", citiesList: gjCities },
  { label: "Haryana", value: "HR", citiesList: hrCities },
  { label: "Himachal Pradesh", value: "HP", citiesList: hpCities },
  { label: "Jharkhand", value: "JH", citiesList: jhCities },
  { label: "Karnataka", value: "KA", citiesList: kaCities },
  { label: "Kerala", value: "KL", citiesList: klCities },
  { label: "Madhya Pradesh", value: "MP", citiesList: mpCities },
  { label: "Maharashtra", value: "MH", citiesList: mhCities },
  { label: "Manipur", value: "MN", citiesList: mnCities },
  { label: "Meghalaya", value: "ML", citiesList: mlCities },
  { label: "Mizoram", value: "MZ", citiesList: mzCities },
  { label: "Nagaland", value: "NL", citiesList: nlCities },
  { label: "Odisha", value: "OD", citiesList: odCities },
  { label: "Punjab", value: "PB", citiesList: pbCities },
  { label: "Rajasthan", value: "RJ", citiesList: rjCities },
  { label: "Sikkim", value: "SK", citiesList: skCities },
  { label: "Tamil Nadu", value: "TN", citiesList: tnCities },
  { label: "Telangana", value: "TS", citiesList: tsCities },
  { label: "Tripura", value: "TR", citiesList: trCities },
  { label: "Uttar Pradesh", value: "UP", citiesList: upCities },
  { label: "Uttarakhand", value: "UK", citiesList: ukCities },
  { label: "West Bengal", value: "WB", citiesList: wbCities },
  // Union Territories
  { label: "Delhi", value: "DL", citiesList: dlCities },
  { label: "Jammu & Kashmir", value: "JK", citiesList: jkCities },
  { label: "Ladakh", value: "LA", citiesList: laCities },
  { label: "Chandigarh", value: "CH", citiesList: chCities },
  { label: "Puducherry", value: "PY", citiesList: pyCities }
]