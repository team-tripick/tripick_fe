export interface ILogEditRequest {
  title : string,
  date : {startDate: string, endDate: string},
  log: string,
  logId: number
}


export interface ILogWriteRequest {
  title : string,
  date : {startDate: string, endDate: string},
  log: string,
  planId: number
}
