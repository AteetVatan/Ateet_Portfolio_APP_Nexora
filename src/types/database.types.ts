export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    title: string
                    description: string
                    content: string
                    technologies: string[]
                    images: string[]
                    github_url: string | null
                    live_url: string | null
                    featured: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title: string
                    description: string
                    content: string
                    technologies: string[]
                    images: string[]
                    github_url?: string | null
                    live_url?: string | null
                    featured?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title?: string
                    description?: string
                    content?: string
                    technologies?: string[]
                    images?: string[]
                    github_url?: string | null
                    live_url?: string | null
                    featured?: boolean
                }
            }
            blog_posts: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string
                    cover_image: string
                    tags: string[]
                    published: boolean
                    published_at: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string
                    cover_image: string
                    tags: string[]
                    published?: boolean
                    published_at?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title?: string
                    slug?: string
                    content?: string
                    excerpt?: string
                    cover_image?: string
                    tags?: string[]
                    published?: boolean
                    published_at?: string | null
                }
            }
            cv_data: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    experiences: Json
                    education: Json
                    skills: Json
                    certifications: Json
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    experiences: Json
                    education: Json
                    skills: Json
                    certifications: Json
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    experiences?: Json
                    education?: Json
                    skills?: Json
                    certifications?: Json
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
} 