// Type definitions mirroring the adomány DRF serializers.

export type Relationship =
  | 'student'
  | 'parent_relative'
  | 'ex_student'
  | 'teacher'
  | 'other'
  | 'undisclosed';

export type DonationType = 'one_time' | 'monthly';

export type ProjectStatus = 'draft' | 'active' | 'completed' | 'archived';

export interface Szak {
  id: number;
  nev: string;
  slug: string;
  leiras: string;
}

export interface Tagozat {
  id: number;
  nev: string;
  slug: string;
  leiras: string;
  szakok: Szak[];
}

export interface ProjectImage {
  id: number;
  image: string | null;
  caption: string;
  order: number;
  is_cover: boolean;
}

export interface ProjectListItem {
  id: number;
  nev: string;
  slug: string;
  rovid_leiras: string;
  tagozat: string | null;
  tagozat_slug: string | null;
  szak: string | null;
  szak_slug: string | null;
  goal_amount: number;
  current_amount: number;
  progress_percent: number;
  status: ProjectStatus;
  featured: boolean;
  cover_image: string | null;
}

export interface ProjectDetail extends ProjectListItem {
  leiras: string;
  start_date: string | null;
  end_date: string | null;
  images: ProjectImage[];
}

export interface DonorInput {
  name?: string;
  email?: string;
  relationship?: Relationship;
  student_name?: string;
  allow_thanks?: boolean;
}

export interface DonationCreatePayload {
  project_slug?: string;
  amount: number;
  donation_type: DonationType;
  message?: string;
  is_public?: boolean;
  donor?: DonorInput;
}

export interface DonationCreateResponse {
  donation_id: number;
  payment_id: string;
  checkout_url: string;
}

export interface DonationStatus {
  id: number;
  project: string | null;
  amount: number;
  currency: string;
  donation_type: DonationType;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded' | 'canceled';
  created_at: string;
  confirmed_at: string | null;
}
