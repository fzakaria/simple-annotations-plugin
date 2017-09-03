import * as moment from "moment";
import * as angular from "angular";

export class AnnotationsQueryCtrl {
  public static templateUrl = "partials/annotations.editor.html";

  private annotation: any;
  private firstDayOfWeek: number;
  private isUtc: boolean;
  private dateDisplays: string[];
  private openPickers: boolean[];

  constructor(private timeSrv, dashboardSrv) {
    const dashboard = dashboardSrv.getCurrent();

    this.isUtc = dashboard.isTimezoneUtc();
    this.firstDayOfWeek = moment.localeData().firstDayOfWeek();

    this.annotation.queries = this.annotation.queries || [];
    this.dateDisplays = [];
    this.openPickers = [];

    if (this.annotation.queries.length === 0) {
      this.addDate();
    }

    this.annotation.queries.forEach((_, idx) => this.dateChanged(idx));
  }

  public addDate() {
    const time = angular.copy(this.timeSrv.timeRange());
    if (!this.isUtc) {
      time.from.local();
    }

    this.annotation.queries.push({ date: time.from });
    this.dateChanged(this.annotation.queries.length - 1);
  }

  public removeDate(index) {
    this.annotation.queries = this.annotation.queries.filter((_, idx) => idx !== index);
    this.annotation.queries.forEach((_, idx) => this.dateChanged(idx));
  }

  public dateChanged(index) {
    const query = this.annotation.queries[index];
    const date = this.getMomentFunction()(query.date, moment.ISO_8601);

    this.annotation.queries[index] = { ...query, date };
    this.dateDisplays[index] = date.format();
  }

  public displayChanged(index) {
    const display = this.dateDisplays[index];
    this.annotation.queries[index].date = this.getMomentFunction()(display, moment.ISO_8601);
    this.dateChanged(index);
  }

  public togglePicker(index) {
    this.openPickers[index] = !this.openPickers[index];
  }

  private getMomentFunction = () => this.isUtc ? moment.utc : moment;
}
