export interface Assignment {
  id: String,
  deadLine: Date,
  rendered: Boolean,
  name: String,
  author: String,
  course: {
    name: String,
    coursePhoto: String,
    teacherPhoto: String
  },
  mark: number,
  comment: String
}
