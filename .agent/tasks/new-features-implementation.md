# New Features Implementation Plan

## Overview
Implementation of three high-engagement features for PetHub:
1. **Nutritional Calculator**: Daily food intake estimator.
2. **AI Breed Identifier**: Client-side breed detection using TensorFlow.js.
3. **Barcode Scanner**: Vaccine data autofill tool.

## Phases

### Phase 1: Nutritional Calculator 🥗
- [ ] Create `NutritionCalculator.tsx` screen
- [ ] Implement RER (Resting Energy Requirement) formula
- [ ] Create interactive UI (sliders, toggles for activity level)
- [ ] Add visual feedback (bowl visualization)

### Phase 2: AI Breed Identifier 🧠
- [ ] Install `@tensorflow/tfjs` and `@tensorflow-models/mobilenet`
- [ ] Create `BreedScanner.tsx` screen
- [ ] Implement Camera access and Frame processing
- [ ] Add scanning animation and result overlay

### Phase 3: Barcode Scanner 💉
- [ ] Install `react-zxing`
- [ ] Create `BarcodeScanner` component (modal/sheet)
- [ ] Integrate into `VaccineForm.tsx`
- [ ] Logic to parse common vaccine barcodes (mock db for demo)

## Design Guidelines
- Use "Glassmorphism" for overlays
- Smooth transitions between states
- Haptic feedback (if possible/visual equivalents)
