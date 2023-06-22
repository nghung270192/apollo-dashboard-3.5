export interface ReportParamsI {
  total: number;
  used: number;
  remain: number;
  disconnect: number;
}


export class ReportParams implements ReportParamsI {
  disconnect: number;
  remain: number;
  total: number;
  used: number;


  constructor(params: ReportParamsI) {
    this.disconnect = params?.disconnect;
    this.remain = params?.remain;
    this.total = params?.total;
    this.used = params?.used;
  }

  toData(): ReportParamsI {
    return {disconnect: this.disconnect, remain: this.remain, total: this.total, used: this.used};
  }
}
