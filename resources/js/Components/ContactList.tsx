import { Contact, PropsListContacts } from "@/types";
import { router, Link } from "@inertiajs/react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const ContactList = ({contacts, onEdit}: PropsListContacts) => {

  const handleDelete = (contact: Contact) => {
    if (confirm('Etes-vous sur de vouloir supprimer ce contact ?')) {
      router.delete(route('contacts.destroy', contact.id))
    }
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-max w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead className="w-[100px]">Téléphone</TableHead>
            <TableHead className="w-[100px]">Ville</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">
                {contact.first_name} {contact.last_name}
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.city}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:[&>svg]:text-light-white"
                    asChild
                  >
                    <Link href={route('contacts.show', contact.id)}>
                      <Eye className="w-4 h-4 text-main-color" />
                    </Link>
                  </Button>

                  <Button
                    className="cursor-pointer hover:[&>svg]:text-light-white"
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(contact)}
                  >
                      <Edit className="w-4 h-4 text-white" />
                  </Button>

                  <Button
                    className="cursor-pointer hover:[&>svg]:text-light-white"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(contact)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default ContactList
