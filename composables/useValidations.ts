// import { z } from "zod";

// const required = (fieldName: string, value: any) => {

//   let convertField = ''
//   if (fieldName.includes('_')) {
//     convertField = fieldName.replace('_', ' ')
//   } else {
//     convertField = fieldName
//   }

//   convertField = convertField.charAt(0).toUpperCase() + convertField.slice(1)

//   // if array 0 is empty, or null, undefined, or string is empty, or object is empty
//   if (Array.isArray(value) && value.length === 0) {
//     return z.string().min(1, { message: `${convertField} is required` })
//   }

//   if (value === null || value === undefined) {
//     return z.preprocess(
//       (value) => (value === null || value === undefined ? "" : value), // Convert null/undefined to empty string
//       z.string().min(1, { message: `${convertField} is required` }) // Dynamic error message
//     )
//   }

//   if (typeof value === 'string' && value.trim() === '') {
//     return z.string().min(1, { message: `${convertField} is required` })
//   }

//   if (typeof value === 'object' && Object.keys(value).length === 0) {
//     return z.string().min(1, { message: `${convertField} is required` })
//   }

//   if (typeof value === 'number' && value === 0) {
//     return z.number().min(1, { message: `${convertField} is required` })
//   }

//   if (typeof value === 'boolean' && value === false) {
//     return z.string().min(1, { message: `${convertField} is required` })
//   }

//   console.log('value', value);

//   return z.preprocess(
//     (value) => (value === null || value === undefined ? "" : value), // Convert null/undefined to empty string
//     z.string().min(1, { message: `${convertField} is required` }) // Dynamic error message
//   )
// };

// export const customRules = {
//   required
// }