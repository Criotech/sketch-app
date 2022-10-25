export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sketches: string[];
  color: string;
  dp?: {
    url: string;
    id: string;
  };
}
