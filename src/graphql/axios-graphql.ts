// import { interceptors } from '@/utils/storage';
// import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

// class AxiosGraphQL {
//   private static axiosInstance: AxiosInstance;
//   private constructor() {}

//   static instance(config?: CreateAxiosDefaults) {
//     if (!this.axiosInstance) {
//       this.axiosInstance = axios.create({
//         baseURL: import.meta.env.VITE_BACKEND_URL + '/graphql',
//         withCredentials: true,
//         ...config,
//       });
//       interceptors(this.axiosInstance);
//     }

//     return this.axiosInstance;
//   }
// }

// // interface GraphQLVariables {
// //   query: string;
// //   variables?: object;
// // }

// // interface GraphQLQueryData  extends GraphQLVariables {
// //   query: string;
// // }



// // const axGraphQL = AxiosGraphQL.instance();

// // export const axGqlQuery = async (query: string, variables?: object) => {
// //   const data: GraphQLData = {
// //     query,
// //     variables,
// //   };

// //   return await axGraphQL({
// //     method: 'post',
// //     data,
// //   });
// // };

// // export const axGqlMutate = async (query: string, variables?: object) => {
// //   const data: GraphQLData = {
// //     query,
// //     variables,
// //   };

// //   return await axGraphQL({
// //     method: 'post',
// //     data,
// //   });
// // };
