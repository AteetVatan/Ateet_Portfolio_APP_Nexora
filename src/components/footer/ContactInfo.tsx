
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactInfoProps {
  email?: string;
  phone?: string;
  onDownloadCV: (e: React.MouseEvent) => void;
}

/**
 * Contact information component
 * Displays contact details and download CV button
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ email, phone, onDownloadCV }) => {
  return (
    <ul className="space-y-2">
      <li className="flex items-center">
        <span className="text-[#00c3ff] mr-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        {email ? (
          <a href={`mailto:${email}`} className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">
            {email}
          </a>
        ) : (
          <span className="text-[#4a5568] text-sm">Email not available</span>
        )}
      </li>
      <li className="flex items-center">
        <span className="text-[#00c3ff] mr-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.9167C22 17.2499 21.9182 17.5833 21.7455 17.9166C21.5727 18.2499 21.3455 18.5651 21.0545 18.8561C20.5727 19.3561 20.0364 19.7106 19.4364 19.9288C18.8455 20.1469 18.2091 20.2561 17.5273 20.2561C16.5455 20.2561 15.5 20.0197 14.4 19.5469C13.3 19.0742 12.2 18.4288 11.1 17.6106C10 16.7924 8.95454 15.8743 7.96363 14.8561C6.98181 13.838 6.09091 12.7742 5.29091 11.6651C4.49999 10.5561 3.86363 9.4561 3.39091 8.3651C2.91818 7.26509 2.68181 6.21963 2.68181 5.21963C2.68181 4.55599 2.78182 3.91963 2.99091 3.32872C3.19999 2.72872 3.54545 2.17417 4.03636 1.67417C4.62727 1.08326 5.27272 0.792358 5.95454 0.792358C6.20909 0.792358 6.46363 0.847267 6.7 0.956176C6.94545 1.06508 7.16363 1.22872 7.34545 1.46054L9.54545 4.52872C9.72727 4.77872 9.85454 5.00599 9.94545 5.22417C10.0364 5.43326 10.0909 5.64235 10.0909 5.83326C10.0909 6.07417 10.0182 6.31508 9.87272 6.54735C9.73636 6.77963 9.54545 7.02054 9.30909 7.26145L8.49999 8.11508C8.39091 8.22417 8.34545 8.35145 8.34545 8.50599C8.34545 8.58326 8.35454 8.65145 8.37272 8.72872C8.39999 8.80599 8.42727 8.86508 8.44545 8.92417C8.62727 9.24235 8.93636 9.65144 9.37272 10.1424C9.81818 10.6333 10.2909 11.1242 10.8 11.6151C11.3 12.1061 11.7818 12.5742 12.2727 13.0197C12.7545 13.456 13.1636 13.756 13.4909 13.9379C13.5409 13.956 13.6 13.9833 13.6727 14.0106C13.7545 14.0379 13.8364 14.0469 13.9273 14.0469C14.0909 14.0469 14.2182 13.9924 14.3273 13.8833L15.1364 13.0924C15.3909 12.8379 15.6364 12.6469 15.8727 12.5197C16.1091 12.3742 16.3364 12.3015 16.5909 12.3015C16.7818 12.3015 16.9818 12.347 17.2 12.4379C17.4182 12.5288 17.6545 12.656 17.9091 12.8288L21.0364 15.0742C21.2727 15.256 21.4364 15.4652 21.5364 15.7015C21.6273 15.9379 21.6818 16.1742 21.6818 16.4288C22 16.5742 22 16.7379 22 16.9167Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
          </svg>
        </span>
        {phone ? (
          <a href={`tel:${phone}`} className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">
            {phone}
          </a>
        ) : (
          <span className="text-[#4a5568] text-sm">Phone not available</span>
        )}
      </li>
      <Button asChild variant="ghost" className="mt-4 text-[#00c3ff] text-sm font-mono hover:bg-[#1291c7]/20 hover:text-[#00c3ff] flex items-center p-0 h-auto">
        <a href="#" onClick={onDownloadCV} className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Download CV
        </a>
      </Button>
    </ul>
  );
};

export default ContactInfo;
