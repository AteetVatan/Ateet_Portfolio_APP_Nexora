
/**
 * ContactForm Component
 * 
 * This component renders a form for users to send contact messages.
 * It supports multiple themes through the ThemeContext.
 * 
 * Features:
 * - Input validation
 * - Form submission with feedback
 * - Email confirmation
 * - Theme-aware styling
 * - Responsive design
 */

import React, { useState } from 'react';
import { Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from '@/contexts/ThemeContext';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Component definition
const ContactForm = () => {
  // Get current theme
  const { currentTheme } = useTheme();
  
  // Toast notification handler
  const { toast } = useToast();
  
  // Form loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // Submit form data to Supabase 'contact_submissions' table (corrected from 'contact_messages')
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: data.name,
          email: data.email,
          message: data.message,
          read: false,
        }
      ]);

      if (error) {
        throw new Error(error.message);
      }

      // Call the Edge Function to send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-contact-confirmation', {
        body: { 
          name: data.name,
          email: data.email,
          message: data.message
        }
      });

      if (emailError) {
        console.error('Email confirmation error:', emailError);
        // Don't throw here, we'll still show success for form submission
        // but log the email error and inform the user
        toast({
          title: "Form Submitted",
          description: "Your message was sent, but there was an issue sending the confirmation email.",
        });
      } else {
        // Success message with toast
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
      }

      // Reset form fields after successful submission
      reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Show error message with toast
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-mono text-white">
          Your Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="w-full p-3 bg-transparent border rounded focus:outline-none focus:ring-1"
          style={{ 
            borderColor: errors.name ? 'var(--destructive)' : 'var(--secondary)',
            color: 'var(--foreground)',
            // Removed invalid 'focusBorderColor' property
          }}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-mono text-white">
          Email Address
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="w-full p-3 bg-transparent border rounded focus:outline-none focus:ring-1"
          style={{ 
            borderColor: errors.email ? 'var(--destructive)' : 'var(--secondary)',
            color: 'var(--foreground)',
            // Removed invalid 'focusBorderColor' property
          }}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      
      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-mono text-white">
          Your Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          className="w-full p-3 bg-transparent border rounded focus:outline-none focus:ring-1 resize-none"
          style={{ 
            borderColor: errors.message ? 'var(--destructive)' : 'var(--secondary)',
            color: 'var(--foreground)',
            // Removed invalid 'focusBorderColor' property
          }}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>
      
      {/* Submit Button - Themed based on current skin with better contrast */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="neon-button flex items-center justify-center gap-2 w-full md:w-auto"
        style={{ 
          borderColor: currentTheme.primaryColor,
          backgroundColor: 'transparent', // Ensure transparent background
          // Ensure button text is always visible regardless of theme
          textShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
