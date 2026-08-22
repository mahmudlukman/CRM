export interface Contact {
  _id?: string;
  id?: string;

  name: string;
  title?: string;
  company: string;

  email?: string;
  phone?: string;

  notes?: string;
  tags?: string[];

  favorite?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface ContactPayload {
  name: string;
  title?: string;
  company: string;
  email?: string;
  phone?: string;
  notes?: string;
  tags: string[];
}
