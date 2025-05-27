<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ContactService
{
  /**
   * Récupère tous les contacts appartenant à l'utilisateur authentifié.
   *
   * @return Collection|array Renvoie une collection de contacts ou un tableau vide si l'utilisateur n'est pas authentifié.
   */
  public function getAllContacts(): Collection|array
  {
    $user = Auth::user();

    if (!$user) {
      return [];
    }

    return Contact::where('user_id', $user->id)->orderBy('first_name')->get();
  }

  /**
   * Crée un nouvel enregistrement de contact associé à l'utilisateur authentifié.
   *
   * @param array $data Les données de contact à sauvegarder.
   * @return Model|null Le modèle de contact créé ou null si l'utilisateur n'est pas authentifié.
   */
  public function createContact(array $data): ?Model
  {
    $user = Auth::user();

    if (!$user) {
      return null;
    }

    $data['user_id'] = $user->id;

    return Contact::create($data);
  }

  /**
   * Met à jour un enregistrement de contact associé à l'utilisateur authentifié.
   *
   * @param Contact $contact Le modèle de contact à mettre à jour.
   * @param array $data Les nouvelles données de contact.
   * @return bool|null True si la mise à jour a réussi, null si l'utilisateur n'est pas authentifié.
   */
  public function updateContact(Contact $contact, array $data): ?bool
  {
    $user = Auth::user();

    if (!$user) {
      return null;
    }

    return $contact->update($data);
  }

  /**
   * Supprime un contact associé à l'utilisateur authentifié.
   *
   * @param Contact $contact L'instance du contact à supprimer.
   * @return bool Indique si la suppression a été effectuée avec succès ou false si l'utilisateur n'est pas authentifié ou n'est pas propriétaire du contact.
   */
  public function deleteContact(Contact $contact): bool
  {
    $user = Auth::user();

    if (!$user || $contact->user_id !== $user->id) {
      return false;
    }

    return $contact->delete();
  }

}












