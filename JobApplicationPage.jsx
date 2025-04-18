// src/pages/JobApplicationPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUpload, FaCheck, FaSpinner } from 'react-icons/fa';

// Fake job data - this would normally come from your API
const jobData = {
  'senior-quantum-researcher': {
    title: 'Senior Quantum LLM Researcher',
    department: 'R&D',
    description: 'Lead groundbreaking research in quantum-resistant language models for financial applications.',
    requirements: [
      'PhD in Computer Science, AI, Quantum Computing, or related field',
      'Experience with LLM architecture design',
      'Publication history in related fields',
      'Experience with PyTorch or TensorFlow'
    ],
    salary: '$180,000 - $250,000'
  },
  'firmware-engineer': {
    title: 'Embedded Firmware Engineer',
    department: 'Engineering',
    description: 'Design and implement quantum-resistant firmware for high-frequency trading systems.',
    requirements: [
      'BS/MS in Computer Engineering, Electrical Engineering, or related field',
      '5+ years experience with embedded systems',
      'Knowledge of RTOS, C/C++, and assembly language',
      'Experience with security protocols for embedded systems'
    ],
    salary: '$150,000 - $210,000'
  },
  'market-analyst': {
    title: 'Quantum Market Analyst',
    department: 'Finance',
    description: 'Develop and apply quantum-based models to volatile market prediction and analysis.',
    requirements: [
      'MS/PhD in Economics, Finance, or Mathematical Finance',
      'Experience with financial modeling and quantitative analysis',
      'Understanding of quantum computing principles',
      'Python and R proficiency'
    ],
    salary: '$160,000 - $220,000'
  }
};

const JobApplicationPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobData[jobId];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: '',
    willingToRelocate: false,
    salaryExpectation: '',
    startDate: '',
    referralSource: '',
    // Honeypot fields
    middleName: '',  // Hidden field
    company: '',     // Hidden field
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // If job doesn't exist, redirect to careers page
  useEffect(() => {
    if (!job) {
      navigate('/careers');
    }
    
    // Log the visit
    const logVisit = async () => {
      try {
        await fetch('https://your-backend-url.com/log/visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: `job-application-${jobId}`,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (error) {
        // Silently fail
        console.error('Logging error:', error);
      }
    };
    
    logVisit();
  }, [job, jobId, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Include the file in form data
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (resumeFile) {
      data.append('resume', resumeFile);
    }
    
    // Add metadata about the job
    data.append('jobTitle', job.title);
    data.append('jobId', jobId);
    
    // Log to console (for development)
    console.log("Form data submitted:", formData);
    console.log("Resume file:", resumeFile);
    
    // In a real implementation, send this to your backend
    try {
      // This would be your actual endpoint
      // await fetch('https://your-backend-url.com/api/job-application', {
      //   method: 'POST',
      //   body: data
      // });
      
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set submission success
      setSubmitted(true);
      
      // After a delay, redirect to thank you page
      setTimeout(() => {
        navigate('/careers/thank-you');
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitting(false);
    }
  };
  
  if (!job) return null;
  
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-5xl text-green-500 mb-6">
                <FaCheck />
              </div>
              <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for applying to Ascend Quantum Research Initiative. 
                We'll review your application and contact you soon.
              </p>
              <div className="animate-pulse text-quantum-dark">
                Redirecting...
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <p className="text-quantum-dark mb-6">Department: {job.department}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h2 className="font-bold mb-2">Job Description</h2>
                <p className="mb-4">{job.description}</p>
                
                <h2 className="font-bold mb-2">Requirements</h2>
                <ul className="list-disc pl-5 mb-4">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="mb-1">{req}</li>
                  ))}
                </ul>
                
                <h2 className="font-bold mb-2">Salary Range</h2>
                <p>{job.salary}</p>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="firstName">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="lastName">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                      required
                    />
                  </div>
                </div>
                
                {/* Honeypot field - visually hidden but still in DOM */}
                <div style={{opacity: 0, position: 'absolute', top: '-999px'}}>
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="linkedin">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                
                {/* Resume Upload */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Upload Resume/CV *
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="resume"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOCX or RTF (MAX. 5MB)</p>
                      </div>
                      <input
                        id="resume"
                        type="file"
                        name="resume"
                        accept=".pdf,.docx,.rtf"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                  {resumeFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {resumeFile.name}
                    </p>
                  )}
                </div>
                
                {/* Cover Letter */}
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="coverLetter">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                    placeholder="Tell us why you're interested in this position..."
                  ></textarea>
                </div>
                
                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="salaryExpectation">
                      Salary Expectation
                    </label>
                    <input
                      type="text"
                      id="salaryExpectation"
                      name="salaryExpectation"
                      value={formData.salaryExpectation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                      placeholder="$"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="startDate">
                      Earliest Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                    />
                  </div>
                </div>
                
                {/* Another honeypot field - CSS hidden */}
                <div className="hidden">
                  <label htmlFor="company">Current Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="referralSource">
                    How did you hear about us?
                  </label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-quantum focus:border-quantum"
                  >
                    <option value="">Please select</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="indeed">Indeed</option>
                    <option value="glassdoor">Glassdoor</option>
                    <option value="referral">Employee Referral</option>
                    <option value="university">University/College</option>
                    <option value="conference">Conference/Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="willingToRelocate"
                    name="willingToRelocate"
                    checked={formData.willingToRelocate}
                    onChange={handleChange}
                    className="w-4 h-4 text-quantum border-gray-300 rounded focus:ring-quantum"
                  />
                  <label className="ml-2 block text-gray-700" htmlFor="willingToRelocate">
                    I am willing to relocate to San Francisco or New York if necessary
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    name="privacyPolicy"
                    required
                    className="w-4 h-4 text-quantum border-gray-300 rounded focus:ring-quantum"
                  />
                  <label className="ml-2 block text-gray-700" htmlFor="privacyPolicy">
                    I agree to the <a href="/privacy-policy" className="text-quantum hover:underline">Privacy Policy</a> and consent to the processing of my personal data *
                  </label>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto bg-quantum hover:bg-quantum-dark text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center transition-colors"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
