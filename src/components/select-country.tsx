// "use client";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// import { getCountries } from "@countrystatecity/countries";

// export function SelectCountry() {
//     const [countries, setCountries] = useState();
//     async function getCountiresFunction(){
//         const cour = await getCountries()
//         setCountries(cour)
//     }
//   console.log("countries: ", countries);
//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select your Country" />
//       </SelectTrigger>
//       <span className="text-xs text-neutral-400">
//         *currently we work only in India
//       </span>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Countries</SelectLabel>
//           {countries.map((country) => (
//             <SelectItem key={country.isoCode} value={country.isoCode}>
//               {country.name}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }
