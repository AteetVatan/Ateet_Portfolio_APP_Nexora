import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { PDFDocument, StandardFonts, rgb } from 'https://esm.sh/pdf-lib@1.17.1';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/pdf'
};
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    // Get language parameter from URL
    const url = new URL(req.url);
    const lang = url.searchParams.get('lang') || 'en';
    const userName = url.searchParams.get('user_name') || 'ateet';
    console.log(`Language selected: ${lang}`);
    console.log(`User selected: ${userName}`);
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    console.log(`Supabase URL configured: ${!!supabaseUrl}`);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log(`Fetching CV data for user: ${userName} with language: ${lang}`);
    // Fetch CV data from the database using user_name and language columns
    const { data: cvData, error } = await supabase.from('cv').select('*').eq('user_name', userName).eq('language', lang).single();
    if (error) {
      console.error('Error fetching CV data:', error);
      return new Response(JSON.stringify({
        error: 'Failed to fetch CV data'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    const sanitizeText = (text) => text.replace(/[\r\n]+/g, ' ') // remove line breaks
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^\x00-\x7F]/g, '') // remove remaining non-ASCII
      .trim();
    // Sanitize all string values in cvData
    Object.keys(cvData).forEach((key) => {
      if (typeof cvData[key] === 'string') {
        cvData[key] = sanitizeText(cvData[key]);
      } else if (Array.isArray(cvData[key])) {
        cvData[key] = cvData[key].map((item) => typeof item === 'string' ? sanitizeText(item) : typeof item === 'object' && item !== null ? Object.fromEntries(Object.entries(item).map(([k, v]) => [
          k,
          typeof v === 'string' ? sanitizeText(v) : v
        ])) : item);
      }
    });
    console.log(`CV data retrieved: ${!!cvData}`);
    // Add a language identifier to the filename
    const fileName = lang === 'de' ? 'Lebenslauf.pdf' : 'CV.pdf';
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    console.log('PDF document created');
    // Add first page
    let page = pdfDoc.addPage([
      612,
      792
    ]); // US Letter size
    console.log('First page added');
    // Load fonts
    // const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    // const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);




    console.log('Fonts loaded successfully');
    // Define our styles and constants
    const margins = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    };
    const colors = {
      primary: rgb(0.0, 0.6, 0.3),
      dark: rgb(0.1, 0.1, 0.1),
      gray: rgb(0.3, 0.3, 0.3),
      lightGreen: rgb(0.5, 0.9, 0.5)
    };
    const fontSizes = {
      title: 22,
      subtitle: 14,
      heading: 12,
      subheading: 11,
      normal: 10,
      small: 9
    };
    // Current vertical position tracker
    let currentY = 750;
    // Page width excluding margins
    const pageWidth = page.getWidth() - margins.left - margins.right;
    // Function to add a new page if we're running out of space
    const ensureSpace = (spaceNeeded) => {
      if (currentY - spaceNeeded < margins.bottom) {
        page = pdfDoc.addPage([
          612,
          792
        ]);
        currentY = 750;
        return true;
      }
      return false;
    };
    // Function to draw a horizontal divider line
    const drawDivider = (y, width = pageWidth) => {
      page.drawLine({
        start: {
          x: margins.left,
          y
        },
        end: {
          x: margins.left + width,
          y
        },
        thickness: 1,
        color: colors.lightGreen
      });
      return y - 20; // Return new Y position after the divider
      
    };
    // Function to wrap text
    const wrapText = (text, font, fontSize, maxWidth) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, fontSize);
        if (width <= maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
      return lines;
    };
    // Text translations for the CV
    const translations = {
      en: {
        summary: 'PROFESSIONAL SUMMARY',
        skills: 'SKILLS',
        experience: 'PROFESSIONAL EXPERIENCE',
        education: 'EDUCATION',
        certifications: 'CERTIFICATIONS',
        languages: 'LANGUAGES',
        location: 'Location',
        phone: 'Phone',
        email: 'Email',
        web_site: 'Website',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'Github',
        authorization: 'Work Authorization',
        german_citizen: 'German Citizen – EU Work Rights'
      },
      de: {
        summary: 'BERUFLICHES PROFIL',
        skills: 'FÄHIGKEITEN',
        experience: 'BERUFSERFAHRUNG',
        education: 'AUSBILDUNG',
        certifications: 'ZERTIFIZIERUNGEN',
        languages: 'SPRACHEN',
        location: 'Standort',
        phone: 'Telefon',
        email: 'E-Mail',
        web_site: 'Website',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'Github',
        authorization: 'Arbeitserlaubnis',
        german_citizen: 'Deutscher Staatsbürger – EU-Arbeitsrechte'
      }
    };
    // Use the correct translations based on language
    let text = translations[lang] || translations.en;
    const t = Object.fromEntries(Object.entries(text).map(([key, value]) => [
      key,
      value + ": "
    ]));
    // Header Section with Name and Contact Info
    // ----------------------------------------
    // Name and Title
    page.drawText(cvData.name || 'Developer CV', {
      x: margins.left,
      y: currentY,
      size: fontSizes.title,
      font: helveticaBold,
      color: colors.dark
    });
    currentY -= 25;
    page.drawText(cvData.title || 'Full Stack Developer', {
      x: margins.left,
      y: currentY,
      size: fontSizes.subtitle,
      font: helvetica,
      color: colors.primary
    });
    if (cvData.sub_title) {
      currentY -= 25;
      page.drawText(cvData.sub_title, {
        x: margins.left,
        y: currentY,
        size: fontSizes.subtitle,
        font: helvetica,
        color: colors.primary
      });
    }
    currentY -= 30;
    // Contact information in a horizontal layout
    const contactInfoWidth = pageWidth / 2 - 10;
    let contactLeftY = currentY;
    let contactRightY = currentY;
    // Left column contact info
    if (cvData.email) {
      page.drawText(t.email, {
        x: margins.left,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.email, {
        x: margins.left + 60,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactLeftY -= 15;
    }
    if (cvData.phone) {
      page.drawText(t.phone, {
        x: margins.left,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.phone, {
        x: margins.left + 60,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactLeftY -= 15;
    }
    if (cvData.website) {
      page.drawText(t.web_site, {
        x: margins.left,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.website, {
        x: margins.left + 60,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactLeftY -= 15;
    }
    if (cvData.twitter) {
      page.drawText(t.twitter, {
        x: margins.left,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.twitter, {
        x: margins.left + 60,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactLeftY -= 15;
    }
    // work_authorization
    if (cvData.work_authorization) {
      page.drawText(t.authorization, {
        x: margins.left,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.work_authorization, {
        x: margins.left + 100,
        y: contactLeftY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactLeftY -= 15;
    }
    // Right column contact info
    if (cvData.location) {
      page.drawText(t.location, {
        x: margins.left + contactInfoWidth + 20,
        y: contactRightY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.location, {
        x: margins.left + contactInfoWidth + 80,
        y: contactRightY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactRightY -= 15;
    }
    if (cvData.linkedin) {
      page.drawText(t.linkedin, {
        x: margins.left + contactInfoWidth + 20,
        y: contactRightY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.linkedin, {
        x: margins.left + contactInfoWidth + 80,
        y: contactRightY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactRightY -= 15;
    }
    if (cvData.github) {
      page.drawText(t.github, {
        x: margins.left + contactInfoWidth + 20,
        y: contactRightY,
        size: fontSizes.normal,
        font: helveticaBold,
        color: colors.dark
      });
      page.drawText(cvData.github, {
        x: margins.left + contactInfoWidth + 80,
        y: contactRightY,
        size: fontSizes.normal,
        font: helvetica,
        color: colors.gray
      });
      contactRightY -= 15;
    }
    // Update currentY to the lowest point
    currentY = Math.min(contactLeftY, contactRightY);
    currentY = drawDivider(currentY - 10);
    // Professional Summary
    // -------------------
    if (cvData.summary) {
      ensureSpace(100);
      page.drawText(t.summary, {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: helveticaBold,
        color: colors.primary
      });
      currentY -= 20;
      const summaryLines = wrapText(cvData.summary, helvetica, fontSizes.normal, pageWidth);
      for (const line of summaryLines) {
        page.drawText(line, {
          x: margins.left,
          y: currentY,
          size: fontSizes.normal,
          font: helvetica,
          color: colors.dark
        });
        currentY -= 15;
      }
      currentY = drawDivider(currentY - 10);
    }
    // Skills
    // ------
    if (cvData.skills && Object.keys(cvData.skills).length > 0) {
      ensureSpace(100);
      page.drawText(t.skills, {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: helveticaBold,
        color: colors.primary
      });
      currentY -= 20;
      // Create a grid layout for skills
      const skillsPerRow = 2;
      const skillWidth = pageWidth / skillsPerRow;
      // Temporary array to hold skills for row-based processing
      const skillCategories = Object.entries(cvData.skills);
      for (let i = 0; i < skillCategories.length; i += skillsPerRow) {
        const rowSkills = skillCategories.slice(i, i + skillsPerRow);
        let rowHeight = 0;
        // Process each skill in this row
        for (let j = 0; j < rowSkills.length; j++) {
          const [category, skills] = rowSkills[j];
          const x = margins.left + j * skillWidth;
          let skillY = currentY;
          // Draw the category
          page.drawText(category, {
            x,
            y: skillY,
            size: fontSizes.subheading,
            font: helveticaBold,
            color: colors.dark
          });
          skillY -= 15;
          // Draw the skills
          if (Array.isArray(skills)) {
            const skillText = skills.join(', ');
            const skillLines = wrapText(skillText, helvetica, fontSizes.normal, skillWidth - 10);
            for (const line of skillLines) {
              page.drawText(line, {
                x,
                y: skillY,
                size: fontSizes.normal,
                font: helvetica,
                color: colors.gray
              });
              skillY -= 15;
            }
          }
          // Calculate height used by this skill category
          const heightUsed = currentY - skillY;
          rowHeight = Math.max(rowHeight, heightUsed);
        }
        // Move currentY down by the height of the tallest skill in this row
        currentY -= rowHeight + 10;
      }
      currentY = drawDivider(currentY - 10);
    }
    // Professional Experience
    // ---------------------
    if (cvData.experience && cvData.experience.length > 0) {
      ensureSpace(100);
      page.drawText(t.experience, {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: helveticaBold,
        color: colors.primary
      });
      currentY -= 25;
      for (const exp of cvData.experience) {
        ensureSpace(90);
        // Title
        page.drawText(exp.title, {
          x: margins.left,
          y: currentY,
          size: fontSizes.subheading,
          font: helveticaBold,
          color: colors.dark
        });
        currentY -= 15;
        // Company, Location, Dates
        const positionText = `${exp.company} | ${exp.location} | ${exp.dates}`;
        page.drawText(positionText, {
          x: margins.left,
          y: currentY,
          size: fontSizes.normal,
          font: helvetica,
          color: colors.gray
        });
        currentY -= 20;
        // Responsibilities
        if (exp.responsibilities && exp.responsibilities.length > 0) {
          for (const resp of exp.responsibilities) {
            ensureSpace(50);
            // Bullet point
            page.drawText('•', {
              x: margins.left,
              y: currentY,
              size: fontSizes.normal,
              font: helvetica,
              color: colors.dark
            });
            // Responsibility text with wrapping
            const indentedWidth = pageWidth - 15; // Account for bullet indentation
            const respLines = wrapText(resp, helvetica, fontSizes.normal, indentedWidth);
            for (let i = 0; i < respLines.length; i++) {
              ensureSpace(15);
              const line = respLines[i];
              const xPos = i === 0 ? margins.left + 15 : margins.left + 20;
              page.drawText(line, {
                x: xPos,
                y: currentY,
                size: fontSizes.normal,
                font: helvetica,
                color: colors.dark
              });
              currentY -= 15;
            }
          }
        }
        currentY -= 15; // Extra space between experiences
      }
      currentY = drawDivider(currentY - 10);
    }
    // Education
    // --------
    if (cvData.education && cvData.education.length > 0) {
      ensureSpace(100);
      page.drawText(t.education, {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: helveticaBold,
        color: colors.primary
      });
      currentY -= 25;
      for (const edu of cvData.education) {
        ensureSpace(50);
        page.drawText(edu.degree, {
          x: margins.left,
          y: currentY,
          size: fontSizes.subheading,
          font: helveticaBold,
          color: colors.dark
        });
        currentY -= 15;
        const eduDetails = `${edu.institution} | ${edu.location} | ${edu.year}`;
        page.drawText(eduDetails, {
          x: margins.left,
          y: currentY,
          size: fontSizes.normal,
          font: helvetica,
          color: colors.gray
        });
        currentY -= 20;
      }
      currentY = drawDivider(currentY - 10);
    }
    // Certifications & Languages in side-by-side layout
    // ------------------------------------------------
    const hasCerts = cvData.certifications && cvData.certifications.length > 0;
    const hasLangs = cvData.languages && Object.keys(cvData.languages).length > 0;
    if (hasCerts || hasLangs) {
      ensureSpace(100);
      // Store starting Y position
      const sectionStartY = currentY;
      let leftColumnY = currentY;
      let rightColumnY = currentY;
      // Certifications on the left
      if (hasCerts) {
        page.drawText(t.certifications, {
          x: margins.left,
          y: leftColumnY,
          size: fontSizes.heading,
          font: helveticaBold,
          color: colors.primary
        });
        leftColumnY -= 20;
        for (const cert of cvData.certifications) {
          const certLines = wrapText(cert, helvetica, fontSizes.normal, pageWidth / 2 - 30);
          for (let i = 0; i < certLines.length; i++) {
            const line = certLines[i];
            const bulletX = i === 0 ? margins.left : margins.left + 15;
            const textX = i === 0 ? margins.left + 15 : margins.left + 20;
            if (i === 0) {
              page.drawText('•', {
                x: bulletX,
                y: leftColumnY,
                size: fontSizes.normal,
                font: helvetica,
                color: colors.dark
              });
            }
            page.drawText(line, {
              x: textX,
              y: leftColumnY,
              size: fontSizes.normal,
              font: helvetica,
              color: colors.dark
            });
            leftColumnY -= 15;
          }
        }
      }
      // Languages on the right
      if (hasLangs) {
        const languageColX = margins.left + pageWidth / 2 + 10;
        page.drawText(t.languages, {
          x: languageColX,
          y: rightColumnY,
          size: fontSizes.heading,
          font: helveticaBold,
          color: colors.primary
        });
        rightColumnY -= 20;
        for (const [language, level] of Object.entries(cvData.languages)) {
          page.drawText(`${language}:`, {
            x: languageColX,
            y: rightColumnY,
            size: fontSizes.normal,
            font: helveticaBold,
            color: colors.dark
          });
          // Calculate where to place the level
          const langWidth = helveticaBold.widthOfTextAtSize(`${language}:`, fontSizes.normal);
          page.drawText(`${level}`, {
            x: languageColX + langWidth + 5,
            y: rightColumnY,
            size: fontSizes.normal,
            font: helvetica,
            color: colors.gray
          });
          rightColumnY -= 15;
        }
      }
      // Update current Y to the lowest point
      currentY = Math.min(leftColumnY, rightColumnY);
    }
    // Add a footer with page numbers
    const pageCount = pdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      page.drawText(`Page ${i + 1} of ${pageCount}`, {
        x: page.getWidth() - 100,
        y: 30,
        size: fontSizes.small,
        font: helvetica,
        color: colors.lightGreen
      });
    }
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    // Return the PDF with proper filename
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate PDF'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
