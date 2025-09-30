

export interface Studentdata {
  _id?: string;
  studentName: string;
  email: string;
  role?:string;
  dob?:string;
  // dateOfJoining?: string; 
 
  studentClass: string;
  age: number;
  gender: string;
  phone: string;
  guardian: string;
}

export interface FetchStudentsParams {
  query: string;
  page: number;
  limit: number;

}

export interface FetchStudentsResponse {
  students: Studentdata[];
  totalPages: number;
}

///////////////////////
