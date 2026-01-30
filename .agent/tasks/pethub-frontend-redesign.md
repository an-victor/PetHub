# PetHub Frontend Redesign - Task Plan

> **Objetivo:** Redesign ousado do frontend com layouts assimétricos, animações premium, dark mode completo e elementos únicos.

---

## 🎨 DESIGN COMMITMENT: WARM PET LIFESTYLE PREMIUM

```markdown
- **Topological Choice:** Layouts assimétricos, cards sobrepostos, tipografia massiva
- **Risk Factor:** Bottom nav com pill animada, header hero com mascote overlay
- **Cliché Liquidation:** 
  ✅ Eliminar grid 2x2 uniforme
  ✅ Adicionar stagger animations em todas as seções
  ✅ Bottom nav premium com indicador deslizante
  ✅ Dark mode completo com paleta dedicada
- **Color Strategy:** Laranja quente + Teal secundário + Gradients dinâmicos
```

---

## 📋 TASK BREAKDOWN

### PHASE 1: Foundation (index.css + index.html)
- [ ] **1.1** Dark mode CSS variables completas
- [ ] **1.2** Animações keyframes (stagger, slide, spring physics)
- [ ] **1.3** Custom scrollbar para dark mode
- [ ] **1.4** Utility classes para depth/layering
- [ ] **1.5** Tailwind config dark mode colors

### PHASE 2: Bottom Navigation Premium (App.tsx)
- [ ] **2.1** Pill indicator animada que desliza entre tabs
- [ ] **2.2** Dark mode styling
- [ ] **2.3** Micro-interactions (haptic-like feedback visual)

### PHASE 3: Home Screen Redesign (Home.tsx)
- [ ] **3.1** Hero section com tipografia massiva + heading stagger
- [ ] **3.2** Pet cards assimétricos (70/30 split em vez de 50/50)
- [ ] **3.3** Banner de vacina com overlay decorativo melhorado
- [ ] **3.4** Services com hover premium
- [ ] **3.5** Adoção card com gradient border

### PHASE 4: Profile Screen Polish (Profile.tsx)
- [ ] **4.1** Dark mode complete
- [ ] **4.2** Stats card com subtle animation
- [ ] **4.3** Menu items com stagger entrance

### PHASE 5: Encyclopedia Fix (Encyclopedia.tsx)
- [ ] **5.1** Corrigir imagens quebradas (Labrador/Poodle)
- [ ] **5.2** Grid assimétrico (featured + grid)
- [ ] **5.3** Dark mode support

### PHASE 6: Other Screens Polish
- [ ] **6.1** Chat.tsx - Dark mode + bubble animations
- [ ] **6.2** Donation.tsx - Dark mode + progress bar animation
- [ ] **6.3** Vaccines.tsx - Dark mode review
- [ ] **6.4** Remaining screens consistency

### PHASE 7: Final Polish
- [ ] **7.1** Verificar reduced-motion support
- [ ] **7.2** Dark mode toggle persistence
- [ ] **7.3** Performance check (transform/opacity only)

---

## 🎨 Color Palette

### Light Mode
- Primary: `#E67E22` (Warm Orange)
- Primary Dark: `#D35400`
- Primary Light: `#F39C12`
- Accent: `#FFE8C2`
- Background: `#F9F8F4`
- Surface: `#FFFFFF`
- Text: `#2D2D2D`

### Dark Mode (NEW)
- Background: `#121212`
- Surface: `#1E1E1E`
- Surface Elevated: `#2A2A2A`
- Text Primary: `#F5F5F5`
- Text Secondary: `#A0A0A0`
- Primary: `#FF9F43` (Lighter for contrast)
- Accent: `#3D2F1F` (Dark warm)

---

## ⏱️ Estimated Time
- Phase 1-2: 15 min
- Phase 3-4: 20 min
- Phase 5-6: 15 min
- Phase 7: 5 min

**Total: ~55 minutes**

---

## 📝 Notes
- Manter acessibilidade WCAG AA
- Animações respeitam prefers-reduced-motion
- Mobile-first sempre (max-width: 480px container)
