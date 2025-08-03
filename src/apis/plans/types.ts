export interface IPlanEditRequest {
  place : string,
  keyword: string[],
  date : {startDate: string, endDate: string},
  plan: string,
  planId: number
}


export interface IPlanWriteRequest {
  place : string,
  date : {startDate: string, endDate: string},
  plan: string,
  keyword: string[]
}


