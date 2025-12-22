// "use client"


// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { useState } from "react";
// import { Country, State, City }  from 'country-state-city';


// export function SelectState() {
//     const [states, setStates] = useState(State.getAllStates())
//     console.log("states: ", states)
//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select your Country" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>States</SelectLabel>
//           {states.map((state) => (
//             <SelectItem key={state.isoCode} value={state.isoCode}>
//               {state.name}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }
