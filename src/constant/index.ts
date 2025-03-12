export const templates = [
  { id: "blank", label: "Blank Document", imageUrl: "./blank-document.svg" },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "./business-letter.svg",
    initialContent: `
    <h2>Business Proposal</h2>
    <p><strong>Date:</strong> March 12, 2025</p>
    
    <p><strong>To:</strong> [Recipient's Name]</p>
    <p><strong>Company:</strong> [Recipient's Company]</p>
    <p><strong>Subject:</strong> Proposal for [Business Opportunity]</p>
    <br/>
    <p>Dear [Recipient's Name],</p>
    
    <p>I hope this letter finds you well. I am writing to propose a business opportunity that I believe will be mutually beneficial for both our companies. At [Your Company Name], we specialize in [briefly describe your company’s expertise or service].</p>
    
    <p>We have identified a significant opportunity to collaborate on [describe business opportunity]. Our proposal includes [key details about the proposal, such as pricing, timeline, benefits, etc.].</p>
    
    <p>We would love to schedule a meeting at your earliest convenience to discuss this in greater detail. Please let us know a suitable time for you.</p>
    
    <p>Thank you for your time and consideration. We look forward to working together and creating a successful partnership.</p>
    
    <p>Sincerely,</p>
    <p>
        <strong>[Your Name]</strong><br>
        [Your Position]<br>
        [Your Company Name]<br>
        [Your Contact Information]
    </p>
   
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "./cover-letter.svg",
    initialContent: `
    <h1>Cover Letter</h1>
    <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email Address]</p>
    <p>[Phone Number]</p>

    <p>[Date]</p>

    <p>[Recipient's Name]</p>
    <p>[Recipient's Title]</p>
    <p>[Recipient's Company]</p>
    <p>[Recipient's Address]</p>
    <p>[City, State, ZIP Code]</p>

    <h2>Subject: [Subject of the Letter]</h2>

    <p>Dear [Recipient's Name],</p>

    <p>I am writing to express my interest in the [Job Title] position at [Company Name] as advertised on [Where You Found the Job Posting]. With my background in [Your Field] and experience in [Relevant Experience], I am confident in my ability to contribute effectively to your team.</p>

    <p>In my previous role at [Previous Company], I [describe a key responsibility or achievement]. This experience has equipped me with [mention any skills or knowledge relevant to the job]. I am particularly drawn to [Company Name] because [mention something you admire about the company or its values].</p>

    <p>I have attached my resume for your review. I look forward to the opportunity to discuss how my skills and experiences align with the needs of your team. Thank you for considering my application.</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "./letter.svg",
    initialContent: `
    <h1>Letter</h1>
    <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email Address]</p>
    <p>[Phone Number]</p>

    <p>[Date]</p>

    <p>[Recipient's Name]</p>
    <p>[Recipient's Title]</p>
    <p>[Recipient's Company]</p>
    <p>[Recipient's Address]</p>
    <p>[City, State, ZIP Code]</p>

    <p>Dear [Recipient's Name],</p>

    <p>I hope this letter finds you well. I am writing to [state the purpose of your letter]. [Provide any necessary details or context].</p>

    <p>[Include any additional information or requests].</p>

    <p>Thank you for your time and consideration. I look forward to your response.</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "./project-proposal.svg",
    initialContent: `
    <h1>Project Proposal</h1>
    <h2>Executive Summary</h2>
    <p>Brief overview of the project, its objectives, and expected outcomes.</p>

    <h2>Project Description</h2>
    <p>Detailed explanation of the project, including its scope and goals.</p>

    <h2>Timeline</h2>
    <p>Proposed schedule for project milestones and deliverables.</p>

    <h2>Budget</h2>
    <p>Estimated costs and resource requirements for the project.</p>

    <h2>Team</h2>
    <p>Key personnel involved and their roles in the project.</p>

    <h2>Expected Outcomes</h2>
    <p>Anticipated results and benefits of the project upon completion.</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "./resume.svg",
    initialContent: `
    <h1>Your Name</h1>
    <p>Email: your.email@example.com | Phone: (123) 456-7890 | Location: City, State</p>

    <h2>Professional Summary</h2>
    <p>Experienced professional with a strong background in [Your Field]. Skilled in [Key Skill 1], [Key Skill 2], and [Key Skill 3]. Committed to delivering high-quality results and driving team success.</p>

    <h2>Work Experience</h2>
    <h3>Job Title, Company Name</h3>
    <p>Month Year - Present</p>
    <ul>
      <li>Key responsibility or achievement</li>
      <li>Another significant accomplishment</li>
      <li>Notable contribution to the team or company</li>
    </ul>

    <h3>Previous Job Title, Previous Company Name</h3>
    <p>Month Year - Month Year</p>
    <ul>
      <li>Relevant responsibility or achievement</li>
      <li>Significant project or initiative led</li>
    </ul>

    <h2>Education</h2>
    <p>Degree Name, Major</p>
    <p>University Name, Graduation Year</p>

    <h2>Skills</h2>
    <ul>
      <li>Skill 1</li>
      <li>Skill 2</li>
      <li>Skill 3</li>
      <li>Skill 4</li>
    </ul>
    `,
  },

  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "./software-proposal.svg",
    initialContent: `
    <h1>Software Proposal</h1>
    <h2>Project overview</h2>
    <p>Describe the purpose and functionality of the software project.</p>

    <h2>Scope of work</h2>
    <p>Detailed breakdown of project deliverables and requirements</p>

    <h2>Timeline</h2>
    <p>Project milestones and delivery schedules.</p>

    <h2>Budget</h2>
    <p>Cost breakdown and payment terms</p>
    `,
  },
];
