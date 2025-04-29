import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CVProfileProps {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  onDownload: (e: React.MouseEvent) => void;
}

/**
 * CV Profile component - displays personal info and contact details
 */
const CVProfile: React.FC<CVProfileProps> = ({
  name,
  title,
  location,
  phone,
  email,
  linkedin,
  onDownload
}) => {
  return (
    <Card className="bg-[#0c1824] border-[#1e3a4a] relative z-10 text-white">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-[#00c3ff] text-2xl md:text-3xl">
            {name || "Developer"}
          </CardTitle>
          <p className="text-[#b9dcea] mt-1">{title || "Full Stack Developer"}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4">
          <Avatar className="w-24 h-24 border-2 border-[#1291c7] overflow-hidden">
            <AvatarImage 
              src="/uploads/profile_pic.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-[#00c3ff]">
              {name ? name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2) : 'CV'}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="sm"
            className="text-[#00c3ff] border-[#1e3a4a] hover:bg-[#1291c7]/20 hover:text-[#00c3ff]"
            onClick={onDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-[#00c3ff]" />
              <p>
                <strong className="text-[#b9dcea] mr-2">Location:</strong> 
                <span className="text-white">{location || "San Francisco, CA"}</span>
              </p>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-[#00c3ff]" />
              <p>
                <strong className="text-[#b9dcea] mr-2">Phone:</strong> 
                <span className="text-white">{phone || "+1 (555) 123-4567"}</span>
              </p>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-[#00c3ff]" />
              <p>
                <strong className="text-[#b9dcea] mr-2">Email:</strong> 
                <span className="text-white">{email || "developer@example.com"}</span>
              </p>
            </div>
            <div className="flex items-center">
              <Linkedin className="w-4 h-4 mr-2 text-[#00c3ff]" />
              <p className="text-[#b9dcea]">
                <strong className="mr-2">LinkedIn:</strong> 
                <a 
                  href={`https://${linkedin || "linkedin.com/in/developer"}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00c3ff] transition-colors"
                >
                  {linkedin || "linkedin.com/in/developer"}
                </a>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVProfile;
