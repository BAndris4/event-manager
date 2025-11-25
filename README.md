# 🎉 Event Manager

Egy modern, teljes körű eseménykezelő platform Spring Boot backend és React frontend technológiákkal.

## 🎯 Áttekintés

Az Event Manager egy átfogó webes alkalmazás, amely lehetővé teszi események létrehozását, kezelését és a résztvevők regisztrációját. A platform két fő felhasználói szintet támogat: normál felhasználók, akik regisztrálhatnak eseményekre, valamint adminisztrátorok, akik teljes körű eseménykezelési jogosultságokkal rendelkeznek.

## ✨ Funkciók

### Nyilvános Funkciók
- 📅 **Események böngészése**: Az összes közelgő és lezárult esemény megtekintése
- 🔍 **Rendezés és szűrés**: Események rendezése dátum, név vagy kapacitás szerint
- 📊 **Valós idejű státusz**: Esemény státusz megjelenítése (folyamatban, lezárult, közelgő)
- 👥 **Kapacitás követés**: Jelenlegi regisztrációk száma / maximális kapacitás megjelenítése

### Felhasználói Funkciók
- 🔐 **Biztonságos autentikáció**: JWT-alapú bejelentkezés és regisztráció
- ✍️ **Eseményekre jelentkezés**: Egyszerű regisztráció egy kattintással
- 📋 **Saját jelentkezések**: Személyes regisztrációk áttekintése
- ❌ **Regisztráció visszavonása**: Jelentkezés törlése
- 👤 **Profil kezelés**: Személyes adatok megtekintése

### Admin Funkciók
- ➕ **Esemény létrehozás**: Új események hozzáadása teljes részletekkel
- ✏️ **Esemény szerkesztés**: Meglévő események módosítása
- 🗑️ **Esemény törlés**: Események és hozzájuk tartozó regisztrációk törlése
- 👥 **Résztvevők kezelése**: 
  - Összes résztvevő megtekintése eseményenként
  - Regisztrációk törlése
  - Regisztrációk áthelyezése másik eseményre
- 📊 **Részletes statisztikák**: Kapacitás kihasználtság, résztvevői adatok

## 🛠 Technológiai Stack

### Backend
- **Framework**: Spring Boot 3.5.7
- **Nyelv**: Java 21
- **Security**: Spring Security + JWT (jjwt 0.13.0)
- **Adatbázis**: H2 (in-memory)
- **ORM**: Spring Data JPA
- **Mapping**: MapStruct 1.5.5
- **API Dokumentáció**: SpringDoc OpenAPI 2.8.14
- **Build Tool**: Maven

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.9.6
- **Styling**: TailwindCSS 3.4.18
- **Animációk**: Framer Motion 12.23.24
- **Ikonok**: Lucide React 0.554.0
- **Betűtípus**: Merriweather (Google Fonts)

## 🚀 Telepítés és Futtatás

### Előfeltételek
- Java 21 vagy újabb
- Node.js 18 vagy újabb
- npm vagy yarn

### Automatikus Indítás (Windows)
```bash
# A projekt gyökér könyvtárában:
start.bat
```

### Manuális Indítás

#### Backend indítása
```bash
cd backend
mvnw spring-boot:run
```
A backend elérhető lesz a `http://localhost:8080` címen.

#### Frontend indítása
```bash
cd frontend
npm install
npm run dev
```
A frontend elérhető lesz a `http://localhost:5173` címen.

### Alapértelmezett Teszt Felhasználók

**Admin fiók:**
- Email: `admin@admin.com`
- Jelszó: `admin`

**User fiók:**
- Email: `user@user.com`
- Jelszó: `user`

## 📚 API Dokumentáció

A backend indítása után a teljes API dokumentáció elérhető:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

### Főbb Endpoint-ok

#### Autentikáció
```
POST /api/auth/register - Regisztráció
POST /api/auth/login    - Bejelentkezés
POST /api/auth/logout   - Kijelentkezés
```

#### Események
```
GET    /api/events     - Összes esemény listázása
GET    /api/events/{id} - Esemény részletei
POST   /api/events     - Új esemény létrehozása (ADMIN)
PUT    /api/events/{id} - Esemény módosítása (ADMIN)
DELETE /api/events/{id} - Esemény törlése (ADMIN)
```

#### Regisztrációk
```
POST   /api/registrations/{eventId}        - Jelentkezés eseményre
DELETE /api/registrations/me/{eventId}     - Saját jelentkezés törlése
GET    /api/registrations/my               - Saját regisztrációk listázása
GET    /api/registrations/event/{eventId}  - Esemény résztvevői (ADMIN)
PUT    /api/registrations/{id}/move/{newEventId} - Regisztráció áthelyezése (ADMIN)
DELETE /api/registrations/{id}             - Regisztráció törlése (ADMIN)
```

#### Felhasználók
```
GET  /api/user/my      - Saját profil
GET  /api/user/{id}    - Felhasználó adatai (ADMIN)
POST /api/user/batch   - Több felhasználó lekérdezése (ADMIN)
```

## 📁 Projekt Felépítés

```
event-manager/
├── backend/
│   ├── src/main/java/inf/unideb/hu/event_manager/
│   │   ├── configuration/      # Security, CORS, adatfeltöltés
│   │   ├── controller/         # REST kontrollerek
│   │   ├── data/
│   │   │   ├── entity/         # JPA entitások
│   │   │   └── repository/     # JPA repository-k
│   │   └── service/
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── mapper/         # MapStruct mapperek
│   │       └── impl/           # Service implementációk
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Admin komponensek
│   │   │   ├── form/           # Form komponensek
│   │   │   ├── EventCard.jsx  # Esemény kártya
│   │   │   └── Navbar.jsx     # Navigációs sáv
│   │   ├── hooks/              # Custom React hooks
│   │   ├── views/              # Oldal nézetek
│   │   ├── App.jsx             # Fő alkalmazás komponens
│   │   └── index.css           # Globális stílusok
│   └── public/
│
└── start.bat                    # Automatikus indító script (Windows)
```

## 🎨 Design Rendszer

### Színpaletta
```css
--white: #FDFFFF          /* Háttér */
--ruby-red: #B10F2E       /* Primary accent */
--black-cherry: #570000   /* Sötét accent */
--rich-mahogany: #280000  /* Szöveg */
--burnt-peach: #DE7C5A    /* Secondary accent */
```

### Tipográfia
- Betűtípus: Merriweather (serif)
- Karakter: Klasszikus, elegáns megjelenés

### UI Elvek
- Minimalista, clean design
- Smooth animációk Framer Motion-nel
- Következetes színhasználat

## 🔒 Biztonság

- JWT-alapú autentikáció
- HttpOnly, Secure cookie-k
- CORS konfiguráció
- Role-based hozzáférés-szabályozás (RBAC)
- Jelszavak BCrypt titkosítása
- XSS és CSRF védelem