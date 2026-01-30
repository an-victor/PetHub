
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: string;
  tags: string[];
  image: string;
  category: 'dog' | 'cat';
  premium?: boolean;
}

export interface Vaccine {
  id: string;
  name: string;
  status: 'applied' | 'upcoming';
  date: string;
  description?: string;
}

export interface Clinic {
  id: string;
  name: string;
  distance: string;
  rating: number;
  status: string;
  image: string;
}

export interface AdoptionPet {
  id: string;
  name: string;
  breed: string;
  location: string;
  distance: string;
  description: string;
  image: string;
  type: 'dog' | 'cat';
  urgent?: boolean;
  featured?: boolean;
  donor: {
    name: string;
    avatar: string;
  };
}

export interface Breed {
  id: string;
  name: string;
  energy: number;
  size: 'P' | 'M' | 'G';
  friendliness: number;
  image: string;
  traits: string[];
  weight: string;
  life: string;
  height: string;
  history: string;
  temperament: string;
  needs: string;
}
