<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// La route home
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Les routes pour les contacts
Route::middleware(['auth', 'verified'])->group(function () {
  // Dashboard
  Route::get('/dashboard', function() {
    $user = Auth::user();
    return Inertia::render('Dashboard', [
      'contacts' => User::find($user->id)->contacts()->orderBy('first_name')->get()
    ]);
  })->name('dashboard');

  // Contacts APIs Rest Full
  Route::resource('contacts', ContactController::class);

  // Les routes profile
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
