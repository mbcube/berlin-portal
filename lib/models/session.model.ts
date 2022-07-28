export interface Session {
  id: string;
  courseName: string;
  sessions: {
    [key: string]: string;
  };
}
