export interface TeachersData{
  _id:string;
  teacherName:string;
  email:string;
  // password:string;
  age:number;
  gender:string;
  phone:string;
  dob:string;
  role:string;
  Status:string;
  subject:string;
  empId:string;
}

export interface FetchTeachersParams {
  query: string;
  page: number;
  limit: number;

}

export interface FetchTeachersResponse {
  teachers: TeachersData[];
  totalPages: number;
}