import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, MapPin, Linkedin, Github, Briefcase } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CVProfileProps {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
  work_authorization: string;
  onDownload: (e: React.MouseEvent) => void;
}

const CVProfile: React.FC<CVProfileProps> = ({
  name, title, location, phone, email, linkedin, github, twitter, work_authorization, onDownload
}) => {
  return (
    <Card className="monolith-card relative z-10">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-2xl md:text-3xl" style={{ color: 'var(--mono-text)' }}>
            {name || "Developer"}
          </CardTitle>
          <p className="mt-1" style={{ color: 'var(--mono-muted)' }}>{title || "Full Stack Developer"}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4">
          <Avatar className="w-24 h-24 overflow-hidden" style={{ border: '2px solid var(--mono-primary)' }}>
            <AvatarImage src="/profile.jpeg" alt="Profile" className="w-full h-full object-cover object-top" />
            <AvatarFallback style={{ color: 'var(--mono-primary)' }}>
              {name ? name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2) : 'CV'}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="sm"
            className="transition-colors"
            style={{ color: 'var(--mono-primary)', borderColor: 'var(--mono-border)' }}
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
              <MapPin className="w-4 h-4 mr-2" style={{ color: 'var(--mono-primary)' }} />
              <p>
                <strong className="mr-2" style={{ color: 'var(--mono-muted)' }}>Location:</strong>
                <span style={{ color: 'var(--mono-text)' }}>{location || "San Francisco, CA"}</span>
              </p>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" style={{ color: 'var(--mono-primary)' }} />
              <p>
                <strong className="mr-2" style={{ color: 'var(--mono-muted)' }}>Email:</strong>
                <span style={{ color: 'var(--mono-text)' }}>{email || "developer@example.com"}</span>
              </p>
            </div>
            <div className="flex items-center">
              <Linkedin className="w-4 h-4 mr-2" style={{ color: 'var(--mono-primary)' }} />
              <p style={{ color: 'var(--mono-muted)' }}>
                <strong className="mr-2">LinkedIn:</strong>
                <a href={linkedin || "#"} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--mono-primary)]" style={{ color: 'var(--mono-text)' }}>
                  {linkedin || "linkedin.com/in/developer"}
                </a>
              </p>
            </div>
            <div className="flex items-center">
              <Github className="w-4 h-4 mr-2" style={{ color: 'var(--mono-primary)' }} />
              <p style={{ color: 'var(--mono-muted)' }}>
                <strong className="mr-2">GitHub:</strong>
                <a href={github || "#"} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--mono-primary)]" style={{ color: 'var(--mono-text)' }}>
                  {github || "github.com/developer"}
                </a>
              </p>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" style={{ color: 'var(--mono-primary)' }} />
              <p>
                <strong className="mr-2" style={{ color: 'var(--mono-muted)' }}>Work Authorization:</strong>
                <span style={{ color: 'var(--mono-text)' }}>{work_authorization || "German Citizen – EU Work Rights"}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVProfile;
