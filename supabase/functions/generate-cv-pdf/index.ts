
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { PDFDocument, StandardFonts, rgb } from 'https://esm.sh/pdf-lib@1.17.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/pdf',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch CV data from the database
    const { data: cvData, error } = await supabase
      .from('cv')
      .select('*')
      .single();
    
    if (error) {
      console.error('Error fetching CV data:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch CV data' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add first page
    let page = pdfDoc.addPage([612, 792]); // US Letter size
    
    // Load fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    
    // Define our styles and constants
    const margins = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };
    
    const colors = {
      primary: rgb(0, 0.75, 1), // Cyan blue (#00c3ff in RGB)
      dark: rgb(0.05, 0.05, 0.15), // Dark almost black
      gray: rgb(0.4, 0.4, 0.45), // Medium gray
      lightGray: rgb(0.7, 0.7, 0.75) // Light gray
    };
    
    const fontSizes = {
      title: 24,
      subtitle: 16,
      heading: 14,
      subheading: 12,
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
        page = pdfDoc.addPage([612, 792]);
        currentY = 750;
        return true;
      }
      return false;
    };
    
    // Function to draw a horizontal divider line
    const drawDivider = (y, width = pageWidth) => {
      page.drawLine({
        start: { x: margins.left, y },
        end: { x: margins.left + width, y },
        thickness: 1,
        color: colors.lightGray
      });
      return y - 10; // Return new Y position after the divider
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
    
    // Header Section with Name and Contact Info
    // ----------------------------------------
    
    // Name and Title
    page.drawText(cvData.name || 'Developer CV', {
      x: margins.left,
      y: currentY,
      size: fontSizes.title,
      font: timesRomanBold,
      color: colors.dark,
    });
    currentY -= 25;
    
    page.drawText(cvData.title || 'Full Stack Developer', {
      x: margins.left,
      y: currentY,
      size: fontSizes.subtitle,
      font: timesRomanItalic,
      color: colors.primary,
    });
    currentY -= 30;
    
    // Contact information in a horizontal layout
    const contactInfoWidth = pageWidth / 2 - 10;
    let contactLeftY = currentY;
    let contactRightY = currentY;
    
    // Left column contact info
    if (cvData.email) {
      page.drawText('Email:', {
        x: margins.left,
        y: contactLeftY,
        size: fontSizes.normal,
        font: timesRomanBold,
        color: colors.dark,
      });
      
      page.drawText(cvData.email, {
        x: margins.left + 60,
        y: contactLeftY,
        size: fontSizes.normal,
        font: timesRoman,
        color: colors.gray,
      });
      contactLeftY -= 15;
    }
    
    if (cvData.phone) {
      page.drawText('Phone:', {
        x: margins.left,
        y: contactLeftY,
        size: fontSizes.normal,
        font: timesRomanBold,
        color: colors.dark,
      });
      
      page.drawText(cvData.phone, {
        x: margins.left + 60,
        y: contactLeftY,
        size: fontSizes.normal,
        font: timesRoman,
        color: colors.gray,
      });
      contactLeftY -= 15;
    }
    
    // Right column contact info
    if (cvData.location) {
      page.drawText('Location:', {
        x: margins.left + contactInfoWidth + 20,
        y: contactRightY,
        size: fontSizes.normal,
        font: timesRomanBold,
        color: colors.dark,
      });
      
      page.drawText(cvData.location, {
        x: margins.left + contactInfoWidth + 80,
        y: contactRightY,
        size: fontSizes.normal,
        font: timesRoman,
        color: colors.gray,
      });
      contactRightY -= 15;
    }
    
    if (cvData.linkedin) {
      page.drawText('LinkedIn:', {
        x: margins.left + contactInfoWidth + 20,
        y: contactRightY,
        size: fontSizes.normal,
        font: timesRomanBold,
        color: colors.dark,
      });
      
      page.drawText(cvData.linkedin, {
        x: margins.left + contactInfoWidth + 80,
        y: contactRightY,
        size: fontSizes.normal,
        font: timesRoman,
        color: colors.gray,
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
      
      page.drawText('PROFESSIONAL SUMMARY', {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: timesRomanBold,
        color: colors.primary,
      });
      currentY -= 20;
      
      const summaryLines = wrapText(cvData.summary, timesRoman, fontSizes.normal, pageWidth);
      for (const line of summaryLines) {
        page.drawText(line, {
          x: margins.left,
          y: currentY,
          size: fontSizes.normal,
          font: timesRoman,
          color: colors.dark,
        });
        currentY -= 15;
      }
      
      currentY = drawDivider(currentY - 10);
    }
    
    // Skills
    // ------
    if (cvData.skills && Object.keys(cvData.skills).length > 0) {
      ensureSpace(100);
      
      page.drawText('SKILLS', {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: timesRomanBold,
        color: colors.primary,
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
          const x = margins.left + (j * skillWidth);
          let skillY = currentY;
          
          // Draw the category
          page.drawText(category, {
            x,
            y: skillY,
            size: fontSizes.subheading,
            font: timesRomanBold,
            color: colors.dark,
          });
          skillY -= 15;
          
          // Draw the skills
          if (Array.isArray(skills)) {
            const skillText = skills.join(', ');
            const skillLines = wrapText(skillText, timesRoman, fontSizes.normal, skillWidth - 10);
            
            for (const line of skillLines) {
              page.drawText(line, {
                x,
                y: skillY,
                size: fontSizes.normal,
                font: timesRoman,
                color: colors.gray,
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
      
      page.drawText('PROFESSIONAL EXPERIENCE', {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: timesRomanBold,
        color: colors.primary,
      });
      currentY -= 25;
      
      for (const exp of cvData.experience) {
        ensureSpace(90);
        
        // Title
        page.drawText(exp.title, {
          x: margins.left,
          y: currentY,
          size: fontSizes.subheading,
          font: timesRomanBold,
          color: colors.dark,
        });
        currentY -= 15;
        
        // Company, Location, Dates
        const positionText = `${exp.company} | ${exp.location} | ${exp.dates}`;
        page.drawText(positionText, {
          x: margins.left,
          y: currentY,
          size: fontSizes.normal,
          font: timesRomanItalic,
          color: colors.gray,
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
              font: timesRoman,
              color: colors.dark,
            });
            
            // Responsibility text with wrapping
            const indentedWidth = pageWidth - 15; // Account for bullet indentation
            const respLines = wrapText(resp, timesRoman, fontSizes.normal, indentedWidth);
            
            for (let i = 0; i < respLines.length; i++) {
              ensureSpace(15);
              
              const line = respLines[i];
              const xPos = i === 0 ? margins.left + 15 : margins.left + 20;
              
              page.drawText(line, {
                x: xPos,
                y: currentY,
                size: fontSizes.normal,
                font: timesRoman,
                color: colors.dark,
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
      
      page.drawText('EDUCATION', {
        x: margins.left,
        y: currentY,
        size: fontSizes.heading,
        font: timesRomanBold,
        color: colors.primary,
      });
      currentY -= 25;
      
      for (const edu of cvData.education) {
        ensureSpace(50);
        
        page.drawText(edu.degree, {
          x: margins.left,
          y: currentY,
          size: fontSizes.subheading,
          font: timesRomanBold,
          color: colors.dark,
        });
        currentY -= 15;
        
        const eduDetails = `${edu.institution} | ${edu.location} | ${edu.year}`;
        page.drawText(eduDetails, {
          x: margins.left,
          y: currentY,
          size: fontSizes.normal,
          font: timesRomanItalic,
          color: colors.gray,
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
        page.drawText('CERTIFICATIONS', {
          x: margins.left,
          y: leftColumnY,
          size: fontSizes.heading,
          font: timesRomanBold,
          color: colors.primary,
        });
        leftColumnY -= 20;
        
        for (const cert of cvData.certifications) {
          const certLines = wrapText(cert, timesRoman, fontSizes.normal, pageWidth / 2 - 30);
          
          for (let i = 0; i < certLines.length; i++) {
            const line = certLines[i];
            const bulletX = i === 0 ? margins.left : margins.left + 15;
            const textX = i === 0 ? margins.left + 15 : margins.left + 20;
            
            if (i === 0) {
              page.drawText('•', {
                x: bulletX,
                y: leftColumnY,
                size: fontSizes.normal,
                font: timesRoman,
                color: colors.dark,
              });
            }
            
            page.drawText(line, {
              x: textX,
              y: leftColumnY,
              size: fontSizes.normal,
              font: timesRoman,
              color: colors.dark,
            });
            leftColumnY -= 15;
          }
        }
      }
      
      // Languages on the right
      if (hasLangs) {
        const languageColX = margins.left + pageWidth / 2 + 10;
        
        page.drawText('LANGUAGES', {
          x: languageColX,
          y: rightColumnY,
          size: fontSizes.heading,
          font: timesRomanBold,
          color: colors.primary,
        });
        rightColumnY -= 20;
        
        for (const [language, level] of Object.entries(cvData.languages)) {
          page.drawText(`${language}:`, {
            x: languageColX,
            y: rightColumnY,
            size: fontSizes.normal,
            font: timesRomanBold,
            color: colors.dark,
          });
          
          // Calculate where to place the level
          const langWidth = timesRomanBold.widthOfTextAtSize(`${language}:`, fontSizes.normal);
          
          page.drawText(`${level}`, {
            x: languageColX + langWidth + 5,
            y: rightColumnY,
            size: fontSizes.normal,
            font: timesRoman,
            color: colors.gray,
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
        font: timesRoman,
        color: colors.lightGray,
      });
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Return the PDF
    return new Response(pdfBytes, { 
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
