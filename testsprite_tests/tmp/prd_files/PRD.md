# PetHub Project Specification

PetHub is a complete pet care application designed for pet owners (tutors), veterinarians, and pet service businesses. This document provides the context needed for TestSprite AI to perform comprehensive testing.

## Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase
- **Offline Storage**: LocalStorage (using a custom `OfflineService`)
- **Gamification**: Built-in points and leveling system

## Core Features to Test

### 1. Pet Management
- **Flow**: Add a new pet -> Select type (dog/cat) -> Fill details (name, breed, birth date) -> Save.
- **Verification**: The pet should appear in "Meus Pets" and on the Home screen.
- **Persistence**: Verify the pet is saved to LocalStorage and attempts to sync with Supabase.

### 2. Vaccine Records
- **Flow**: Open a pet's details -> Expand "Caderneta de Vacinas" -> Click "Adicionar" -> Fill vaccine details -> Save.
- **Verification**: The vaccine should appear in the pet's history tab and the global "Vacinas" page.
- **Rules**: Users earn gamification points for recording vaccines.

### 3. Gamification System
- **Actions**: Award points for adding pets, recording vaccines, reading tips, etc.
- **Levels**: Users should level up as points accumulate (Levels: Filhote, Adulto I, Adulto II, Sênior I, Sênior II, Pet Lenda).
- **Feedbacks**: Toast notifications on points earned and Level Up modals.

### 4. Navigation & UI/UX
- Verified responsive design across Home, My Pets, Vaccines, and Profile screens.
- Smooth transitions and modern aesthetics (glassmorphism/gradients).

## Test Environment
- **Local URL**: http://localhost:3000
- **Database Access**: Supabase (configured in .env)

## Key Testing Scenarios for TestSprite
- **Functional**: Can a user complete the full "Add Pet + Record Vaccine" loop?
- **UI Consistency**: Do the gradients and components render correctly on mobile widths?
- **Data Integrity**: Does the `OfflineService` maintain data across refreshes?
- **API Robustness**: How does the app handle Supabase sync failures?
