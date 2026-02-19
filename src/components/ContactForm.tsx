
/**
 * ContactForm — Monolith styled contact form
 * Clean inputs with warm Monolith styling
 */

import React, { useState } from 'react';
import { Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        { name: data.name, email: data.email, message: data.message, read: false }
      ]);

      if (error) throw new Error(error.message);

      const { error: emailError } = await supabase.functions.invoke('send-contact-confirmation', {
        body: { name: data.name, email: data.email, message: data.message }
      });

      if (emailError) {
        console.error('Email confirmation error:', emailError);
        toast({ title: "Form Submitted", description: "Your message was sent, but there was an issue sending the confirmation email." });
      } else {
        toast({ title: "Message Sent!", description: "Thank you for reaching out. I'll get back to you soon." });
      }

      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({ variant: "destructive", title: "Submission Failed", description: "There was an error sending your message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    borderColor: hasError ? 'hsl(var(--destructive))' : 'var(--mono-border)',
    color: 'var(--mono-text)',
    background: 'transparent',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium" style={{ color: 'var(--mono-text)' }}>
          Your Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[var(--mono-primary)] transition-colors"
          style={inputStyle(!!errors.name)}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium" style={{ color: 'var(--mono-text)' }}>
          Email Address
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[var(--mono-primary)] transition-colors"
          style={inputStyle(!!errors.email)}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium" style={{ color: 'var(--mono-text)' }}>
          Your Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[var(--mono-primary)] resize-none transition-colors"
          style={inputStyle(!!errors.message)}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
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
