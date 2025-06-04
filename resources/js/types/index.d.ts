export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PropsModal {
  showModal: boolean;
  modalType: string;
  contact?: Contact;
  onCloseModal: () => void;
}

export interface PropsListContacts {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
}

export interface PropsSinglePage {
  contact: Contact
}

export interface PropsDashboard extends PageProps {
  contacts: Contact[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
