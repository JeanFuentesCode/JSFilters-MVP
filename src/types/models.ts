export interface Profile {
  id: string;
  full_name: string;
  sector: string;
  seniority: 'Junior' | 'Mid' | 'Senior';
  country: string;
  plan: 'free' | 'pro';
}

export interface Vacancy {
  id: string;
  title: string;
  company_name: string;
  sector: string;
  seniority: string;
}

export interface UserCV {
  id: string;
  user_id: string;
  image_url: string;
  extracted_data: Record<string, any>;
  created_at: string;
}
