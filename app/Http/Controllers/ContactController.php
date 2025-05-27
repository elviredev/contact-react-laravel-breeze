<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ContactController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

  /**
   * @desc Afficher une liste de tous les contacts sur la vue Dashboard.
   * @route GET /contacts
   */
  public function index()
  {
    $contacts = $this->contactService->getAllContacts();

    return Inertia::render('Dashboard', [
      'contacts' => $contacts
    ]);
  }

  /**
   * @desc Afficher le formulaire de création de contact sur la vue Dashboard.
   * @route GET /contacts/create
   */
  public function create()
  {
    return Inertia::render('Dashboard', [
      'showModal' => true,
      'modalType' => 'create'
    ]);
  }

  /**
   * @desc Créer un nouveau contact et rediriger vers la vue Dashboard.
   * @route POST /contacts
   */
  public function store(StoreContactRequest $request)
  {
    $validatedData = $request->validated();
    $this->contactService->createContact($validatedData);

    return Redirect::route('dashboard')->with('success', '✅ Contact créé avec succès.');
  }

  /**
   * @desc Afficher un seul contact sur la vue SingleContact.
   * @route GET /contacts/{contact}
   */
  public function show(Contact $contact)
  {
    $this->authorize('view', $contact);

    return Inertia::render('SingleContact', [
      'contact' => $contact
    ]);
  }

  /**
   * @desc Afficher le formulaire de mise à jour de contact sur la vue du tableau de bord.
   * @route GET /contacts/{contact}/edit
   */
  public function edit(Contact $contact)
  {
    $this->authorize('update', $contact);

    return Inertia::render('Dashboard', [
      'showModal' => true,
      'modalType' => 'edit',
      'contact' => $contact
    ]);
  }

  /**
   * @desc Met à jour un contact existant et redirige vers la vue Dashboard.
   * @route PUT /contacts/{contact}
   */
  public function update(StoreContactRequest $request, Contact $contact)
  {
    $this->authorize('update', $contact);

    $validatedData = $request->validated();
    $this->contactService->updateContact($contact, $validatedData);

    return Redirect::route('dashboard')->with('success', '✅ Contact mis à jour avec succès.');
  }

  /**
   * @desc Supprimer un contact et rediriger vers la vue Dashboard.
   * @route DELETE /contacts/{contact}
   */
  public function destroy(Contact $contact)
  {
    $this->authorize('delete', $contact);

    $this->contactService->deleteContact($contact);

    return Redirect::route('dashboard')->with('success', '✅ Contact supprimé avec succès.');
  }
}







