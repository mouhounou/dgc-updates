import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formations } from '../assets'

export default function FormationGrid() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {formations.map((formation, index) => (
         <div
            key={index}
            className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-md transition"
         >
            <div className="flex items-center gap-3 mb-3">
               <FontAwesomeIcon
               icon={formation.icon}
               className="text-2xl text-blue-700"
               />
               <h2 className="text-lg font-semibold text-blue-900">
                  {formation.title}
               </h2>
            </div>
            <p className="text-gray-700 mb-3">{formation.description}</p>
            <p className="text-sm font-semibold text-gray-800">
               {formation.detailsTitle}:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-1">
               {formation.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
               ))}
            </ul>
         </div>
         ))}
      </div>
   )
}
