export interface Sector {
  id: number;
  name: string;
  colorTheme: string;
}

export interface Course {
  name: string;
  imageUrl: string;
  sector: Sector;
}

export interface Inscription {
  courseId: number;
  inscripcionDate: string;
  certificationDate: string | null;
  advance: number;
  scoreCourse: number;
  folioCertificate: string | null;
  anyTest: boolean;
  course: Course;
}

export interface Person {
  name: string;
  lastName: string;
}

export interface UserProfileResponse {
  email: string;
  people: Person[];
  inscriptions: Inscription[];
}