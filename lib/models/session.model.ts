export interface Session {
  id: string;
  sessions: {
    [key: string]: string;
  };
}
