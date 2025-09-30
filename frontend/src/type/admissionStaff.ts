export interface AdmissionStaffData{
  _id:string;
  teacherName:string;
  email:string;
//   password:string;
  age:number;
  gender:string;
  phone:string;
  dob:string;
  role:string;
  Status:string;
  empId:string;
}

export interface FetchAdmissionStaffParams {
  query: string;
  page: number;
  limit: number;

}

export interface FetchAdmissionStaffResponse {
  AdmissionStaff: AdmissionStaffData[];
  totalPages: number;
}