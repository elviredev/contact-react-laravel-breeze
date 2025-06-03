import React, { useEffect } from 'react'
import { PropsModal } from "@/types";
import * as yup from 'yup'
import { router, useForm } from "@inertiajs/react";
import { ContactFormData, schemaModal } from "@/Schemas";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {Textarea} from "@/Components/ui/textarea";
import {Button} from "@/Components/ui/button";

const ContactModal = ({ showModal, modalType, contact, onCloseModal }: PropsModal) => {

  const { data, setData, post, put, errors, processing, reset } = useForm<ContactFormData>({
    // Définir les champs du formulaire
    first_name: contact?.first_name || '',
    last_name: contact?.last_name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    address: contact?.address || '',
    city: contact?.city || '',
    postal_code: contact?.postal_code || '',
    country: contact?.country || '',
    notes: contact?.notes || '',
  })

  // Définir le type de modale et actions en fonction du type
  useEffect(() => {
    if (contact && modalType === 'edit') {
      setData({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        city: contact.city,
        postal_code: contact.postal_code,
        country: contact.country,
        notes: contact.notes,
      })
    } else if(modalType === 'create') {
      reset()
    }
  }, [contact, modalType, showModal])


  /**
   * Valide de manière asynchrone les données du formulaire par rapport à un schéma fourni.
   * Utilise la bibliothèque de validation « yup » pour vérifier la conformité des données aux règles définies
   * dans le schéma.
   * En cas d'échec de validation, gère les erreurs et renvoie « false ».
   *
   * @function
   * @async
   * @returns {Promise<boolean>} Promesse qui se résout en « true » si les données passent la validation ou en
   * « false » si la validation échoue.
   */
  const validateForm = async (): Promise<boolean> => {
    try {
      await schemaModal.validate(data, { abortEarly: false })
      return true
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message
          }
        })
        return false
      }
      return false
    }
  }

  /**
   * Gère le processus de soumission du formulaire pour la création ou la mise à jour d'un contact.
   *
   * Cette fonction est déclenchée lorsque l'utilisateur soumet le formulaire. Elle exécute les étapes suivantes:
   * 1. Empêche le comportement de soumission par défaut.
   * 2. Valide le formulaire de manière asynchrone à l'aide de la fonction « validateForm »
   * 3. Si la validation du formulaire échoue, la fonction s'arrête prématurément.
   * 4. Si le formulaire est en mode « création », une requête POST est envoyée pour créer un nouveau contact.
   * 5. Si le formulaire est en mode « édition », une requête PUT est envoyée pour mettre à jour un contact existant.
   * 6. En cas de soumission réussie, la modale est fermée et la page est rechargée.
   * 7. Si une erreur survient lors de la soumission en mode « édition », les erreurs sont enregistrées dans la console.
   *
   * @param {React.FormEvent} e - The form event triggered on submission.
   */
  const onSubmit = async (e: React.FormEvent)=> {
    e.preventDefault()
    const isValid = await validateForm()
    if (!isValid) return;

    if (modalType === 'create') {
      post(route('contacts.store'), {
        preserveScroll: true,
        onSuccess: () => {
          handleCloseModal()
          router.reload()
        }
      })
    } else { // Mode édition
      put(route('contacts.update', contact?.id), {
        preserveScroll: true,
        onSuccess: () => {
          handleCloseModal()
          router.reload()
        },
        onError: (errors) => {
          console.error(errors)
        }
      })
    }
  }

  /**
   * Fonction permettant de gérer la fermeture d'une modale.
   *
   * Cette fonction vérifie le type de modale actuellement ouvert.
   * Si le type de modale est « create », elle déclenche une opération de réinitialisation.
   * Quel que soit le type de modale, elle garantit la fermeture de la modale en appelant
   * le gestionnaire onCloseModal.
   */
  const handleCloseModal = () => {
    if (modalType === 'create') {
      reset()
    }
    onCloseModal()
  }

  return (
    <Dialog open={showModal} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-main-color text-xl uppercase text-center mb-4">
            {modalType === 'create' ? 'Nouveau contact' : 'Modifier contact'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                value={data.first_name}
                onChange={(e) => setData('first_name', e.target.value)}
                className={errors.first_name && "border-red-500"}
              />
              {errors.first_name && (
                <span className="text-red-500 text-xs">{errors.first_name}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                value={data.last_name}
                onChange={(e) => setData('last_name', e.target.value)}
                className={errors.last_name && "border-red-500"}
              />
              {errors.last_name && (
                <span className="text-red-500 text-xs">{errors.last_name}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email || ''}
                onChange={(e) => setData('email', e.target.value)}
                className={errors.email && "border-red-500"}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={data.phone || ''}
                onChange={(e) => setData('phone', e.target.value)}
                className={errors.phone && "border-red-500"}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">{errors.phone}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={data.address || ''}
                onChange={(e) => setData('address', e.target.value)}
                className={errors.address && "border-red-500"}
              />
              {errors.address && (
                <span className="text-red-500 text-xs">{errors.address}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Code Postal</Label>
              <Input
                id="postal_code"
                value={data.postal_code || ''}
                onChange={(e) => setData('postal_code', e.target.value)}
                className={errors.postal_code && "border-red-500"}
              />
              {errors.postal_code && (
                <span className="text-red-500 text-xs">{errors.postal_code}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={data.city || ''}
                onChange={(e) => setData('city', e.target.value)}
                className={errors.city && "border-red-500"}
              />
              {errors.city && (
                <span className="text-red-500 text-xs">{errors.city}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={data.country || ''}
                onChange={(e) => setData('country', e.target.value)}
                className={errors.country && "border-red-500"}
              />
              {errors.country && (
                <span className="text-red-500 text-xs">{errors.country}</span>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={data.notes || ''}
                onChange={(e) => setData('notes', e.target.value)}
                className={errors.notes && "border-red-500"}
              />
              {errors.notes && (
                <span className="text-red-500 text-xs">{errors.notes}</span>
              )}
            </div>

          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={handleCloseModal}
            >
              Annuler
            </Button>
            <Button
              disabled={processing}
              type="submit"
              className="bg-main-color hover:bg-light-white"
            >
              {modalType === 'create' ? 'Créer' : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ContactModal
