import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Contact, PropsDashboard } from "@/types";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import ContactList from "@/Components/ContactList";
import ContactModal from "@/Components/ContactModal";

export default function Dashboard({contacts}: PropsDashboard) {

  const [showModal, setShowModal] = useState(false)
  const [modalTypes, setModalTypes] = useState<'create' | 'edit'>('create')
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>()


  const handleCreate = () => {
    setModalTypes('create')
    setSelectedContact(undefined)
    setShowModal(true)
  }

  const handleEdit = (contact: Contact) => {
    setModalTypes('edit')
    setSelectedContact(contact)
    setShowModal(true)
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl font-semibold leading-tight text-main-color">
            Tableau de bord
        </h2>
      }
    >
    <Head title="Tableau de bord" />

    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-light-black shadow-sm sm:rounded-lg">
          <div className="p-4 sm:p-6 text-white flex items-center justify-between">
            <h2 className="text-md sm:text-2xl font-semibold text-light-white uppercase">Mes contacts</h2>
            <Button onClick={handleCreate} className="cursor-pointer" >
              <Plus className="h-5 w-5" />
              Nouveau contact
            </Button>
          </div>

          {/* Liste des contacts */}
          <ContactList
            contacts={contacts}
            onEdit={handleEdit}
          />

        {/* Modale */}
          <ContactModal
            showModal={showModal}
            modalType={modalTypes}
            contact={selectedContact}
            onCloseModal={() => setShowModal(false)}
          />

        </div>
      </div>
    </div>
    </AuthenticatedLayout>
  );
}
