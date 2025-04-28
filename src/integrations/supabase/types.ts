export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_content: {
        Row: {
          bio: string | null
          created_at: string | null
          cta_footer: string | null
          expertise: string[] | null
          id: string
          name: string | null
          tagline: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          cta_footer?: string | null
          expertise?: string[] | null
          id?: string
          name?: string | null
          tagline?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          cta_footer?: string | null
          expertise?: string[] | null
          id?: string
          name?: string | null
          tagline?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin: {
        Row: {
          created_at: string
          id: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      appraisals: {
        Row: {
          content: string
          created_at: string
          email: string
          id: string
          name: string
          reviewed_at: string | null
          status: string | null
        }
        Insert: {
          content: string
          created_at?: string
          email: string
          id?: string
          name: string
          reviewed_at?: string | null
          status?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          reviewed_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          published: boolean | null
          slug: string
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug: string
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug?: string
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          message: string
          name: string
          read: boolean | null
          referrer: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          message: string
          name: string
          read?: boolean | null
          referrer?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          message?: string
          name?: string
          read?: boolean | null
          referrer?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      cv: {
        Row: {
          certifications: Json | null
          created_at: string
          education: Json | null
          email: string | null
          experience: Json | null
          github: string | null
          id: string
          is_active: boolean | null
          languages: Json | null
          linkedin: string | null
          location: string | null
          name: string
          phone: string | null
          skills: Json | null
          summary: string | null
          title: string | null
          twitter: string | null
          updated_at: string
          version: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          email?: string | null
          experience?: Json | null
          github?: string | null
          id?: string
          is_active?: boolean | null
          languages?: Json | null
          linkedin?: string | null
          location?: string | null
          name: string
          phone?: string | null
          skills?: Json | null
          summary?: string | null
          title?: string | null
          twitter?: string | null
          updated_at?: string
          version?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          email?: string | null
          experience?: Json | null
          github?: string | null
          id?: string
          is_active?: boolean | null
          languages?: Json | null
          linkedin?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          skills?: Json | null
          summary?: string | null
          title?: string | null
          twitter?: string | null
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      masx_ai: {
        Row: {
          architecture: string
          architecture_snapshot: string | null
          call_to_action: string | null
          challenges: string | null
          created_at: string
          demo_url: string | null
          description: string | null
          diagram_url: string | null
          doctrine_index: Json | null
          github_url: string | null
          id: string
          impact: string | null
          key_innovations: Json | null
          mission: string
          modules: Json | null
          problem_statement: string | null
          role_description: string | null
          tagline: string | null
          tech_stack: string[] | null
          timeframe: string | null
          title: string
          updated_at: string
        }
        Insert: {
          architecture: string
          architecture_snapshot?: string | null
          call_to_action?: string | null
          challenges?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          diagram_url?: string | null
          doctrine_index?: Json | null
          github_url?: string | null
          id?: string
          impact?: string | null
          key_innovations?: Json | null
          mission: string
          modules?: Json | null
          problem_statement?: string | null
          role_description?: string | null
          tagline?: string | null
          tech_stack?: string[] | null
          timeframe?: string | null
          title?: string
          updated_at?: string
        }
        Update: {
          architecture?: string
          architecture_snapshot?: string | null
          call_to_action?: string | null
          challenges?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          diagram_url?: string | null
          doctrine_index?: Json | null
          github_url?: string | null
          id?: string
          impact?: string | null
          key_innovations?: Json | null
          mission?: string
          modules?: Json | null
          problem_statement?: string | null
          role_description?: string | null
          tagline?: string | null
          tech_stack?: string[] | null
          timeframe?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          status: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          status?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          status?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          created_at: string
          description: string
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          project_url: string | null
          slug: string
          tags: string[] | null
          tech_stack: string[] | null
          title: string
          type: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          slug: string
          tags?: string[] | null
          tech_stack?: string[] | null
          title: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          slug?: string
          tags?: string[] | null
          tech_stack?: string[] | null
          title?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_metrics: {
        Row: {
          created_at: string
          id: string
          page_path: string
          referrer: string | null
          updated_at: string
          user_agent: string | null
          visit_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          page_path: string
          referrer?: string | null
          updated_at?: string
          user_agent?: string | null
          visit_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          page_path?: string
          referrer?: string | null
          updated_at?: string
          user_agent?: string | null
          visit_count?: number
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
