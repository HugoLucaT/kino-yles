# Kino Rakendus

## Project Introduction

Kino Rakendus is a web application designed to provide information about movies being shown in Tallinn. The application aims to offer a centralized solution for cinema-goers to find the current and upcoming movies, ticket prices and other relevant information across various Estonian movie theatres.

## Why?

We noticed that there doesn't seem to be a place to check the current and future movies with ticket prices for different Estonian movie theatres.

## Project status

### Planning Phase
  - [ ] Define project requirements and set up project infrastructure
  - [ ] Design the project's architecture and database schema
  
### Setup Development Environment
  - [ ] Install necessary dependencies
  - [ ] Setup local Supabase
  - [ ] Configure version control
  - [ ] Configure code formatting

### Development Phase
- **Backend Development**
    - [ ] Implement authentication endpoints
    - [ ] Implement movie data endpoints
    - [ ] Integrate with the external movie data API
  
- **Frontend Development**
  - [ ] Authentication UI
  - [ ] Browsing UI
  - [ ] Search functionality
  - [ ] Movie details UI
    - [ ] Ratings
  - [ ] Profile view UI
    - [ ] Watchlists
    - [ ] Favourites
  
- **Integration**
  - [ ] Integrate backend services with the frontend

### Finalizing Phase
  - [ ] Test the project
  - [ ] Deploy the project to a production environment
  - [ ] Post-deployment testing

## Milestones
**10.11**
   - Luua või leida erinevate kinode apid.
   - Alustada projektikeskkonna seadistamisega.
   - Alustada projekti raamistiku ehitamisega.

**17.11**
   - Luua kinode ja filmide api funktsionaalsus.
   - Arendada esmane andmebaasimudel.
   - Testida ja valideerida, et kasutajad saavad edukalt filme näha.

**24.11**
   - Luua funktsioonid haldamiseks
   - Arendada seansside haldamise moodul
   - Luua administraatori paneel filmide ja seansside haldamiseks.
   - Alustada UI disainiga filmide ja seansside kuvamiseks kasutajatele.

**01.12**
   - Lisada viis kuidas kasutajad saavad hinnata filme ja kinosid.
   - Lisa kasutajate autentimise ja sisselogimise süsteem.
   - Üldine UI testimine ja parandamine.

**08.12**
   - Läbi viia testimine, parandada bugid ja optimeerida jõudlust. 
   - Teha lõplik esitlus ja arutelu tulevaste parenduste osas.
   - Viimistleda kasutajaliides ja parandada UX.
   - Valmistada ette dokumentatsioon ja kasutusjuhendid.
## Used technologies

- **Vercel** - For deploying the solution.
- **Next.js** - For the frontend framework and server-side rendering.
- **React** - For building user interfaces.
- **Supabase** - For user authentication.
- **[API Name Placeholder]** - To fetch the movie data.

## Lo-Fi Wireframe
![Wireframe](./Wireframe.png)

## Preview
_Will be added soon._

## Demo
_Will be added soon._

## Features

- **Authentication**

  - Users can create and log in to their accounts.

- **Browsing**

  - Users can see a list of upcoming movies at the cinemas.
  - Each movie has some basic information about it (e.g title, poster and release date).
  - The information will come from [API Name Placeholder] API.

- **Search**

  - Users can search for movies by:
    - Name
    - Genre
    - Ratings
    - Cast
  - Users can filter search results to refine the search.

- **Movie Details**

  - Upon clicking on a movie, there will be more detailed information.
  - The extra details include:
    - Short summary of the story
    - The cast
    - User ratings

- **Favorite Movies**

  - Users can add movies to their favorites.
  - Favorite movies are saved to the users profile on a dedicated page.

- **User Profiles**
  - Users can update their profiles.
  - The user profiles include:
    - Favourite movies
    - Username
    - Join date
    - Ratings
  
- **Ratings**

  - Users can give movies ratings on a 5-star scale.

- **Watchlists**
  - Users can add and remove movies from their watchlists.
  - Watchlist can be set to private and public.
    - Private watchlists will be only shown to the user.
    - Public watchlists can be seen by every user through the users profile.

## Ambitious goals

- **Notifications**
  - Users will get email notifications about upcoming movies.

- **Responsive for you page**
  - On homepage there will be movies that may interest the user.
  - The scale of interest will be determined by the users previously watched movies and the average score of them.

- **Professional ratings**
  - Each movie will have a score based on movie critics.
  - The scores will be separated by the organization.
  - Users can select their preferred movie critics.

- **Country wide cinemas**
  - The website will show information about all of the cinemas in Estonia.

- **Settings**
  - The user can choose between light and dark modes.

### Authors:

- Hugo Luca Tigane
- Germo Tael
- Jan-Erich Sigur
- Madis Valliste