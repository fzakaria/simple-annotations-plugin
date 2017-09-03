import * as moment from "moment";

export class AnnotationDatasource {

  constructor() {
  }

  public annotationQuery(options) {
    console.debug("annotationQuery() was called with options: %o", options);
    const { annotation } = options;

    return annotation.queries.map((query) => {
      const m = moment.isMoment(query.date) ? query.date : moment(query.date, moment.ISO_8601);
      return {
        annotation,
        title: annotation.name,
        time: m.valueOf(),
        text: query.text,
      };
    });
  }

  
}
