export interface PolicySection {
  title: string;
  content: string;
  subsections?: PolicySection[];
}

export interface PolicyData {
  title: string;
  subtitle: string;
  lastUpdated: boolean;
  htmlContent: string;
}

export const privacyPolicyData: PolicyData = {
  title: "Privacy Policy",
  subtitle: "Liko Dental",
  lastUpdated: true,
  htmlContent: `
    <h3>1. Introduction</h3>
    <p>At Liko Dental, we are committed to protecting your privacy and maintaining the confidentiality of your personal and health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our dental services.</p>

    <h3>2. Information We Collect</h3>
    <h4>2.1 Personal Information</h4>
    <p>We may collect the following types of personal information:</p>
    <ul>
      <li>Contact information (name, address, phone number, email)</li>
      <li>Demographic information (age, gender, date of birth)</li>
      <li>Insurance information</li>
      <li>Emergency contact information</li>
      <li>Payment and billing information</li>
    </ul>

    <h4>2.2 Health Information</h4>
    <p>As a dental practice, we collect and maintain:</p>
    <ul>
      <li>Medical and dental history</li>
      <li>Treatment records and notes</li>
      <li>Diagnostic information and test results</li>
      <li>X-rays and other imaging</li>
      <li>Prescription and medication information</li>
    </ul>

    <h4>2.3 Website Information</h4>
    <p>When you visit our website, we may collect:</p>
    <ul>
      <li>IP address and browser information</li>
      <li>Pages visited and time spent on site</li>
      <li>Cookies and similar tracking technologies</li>
    </ul>

    <h3>3. How We Use Your Information</h3>
    <p>We use your information for the following purposes:</p>
    <ul>
      <li>Providing dental care and treatment</li>
      <li>Scheduling appointments and sending reminders</li>
      <li>Processing insurance claims and billing</li>
      <li>Communicating about your treatment</li>
      <li>Maintaining accurate medical records</li>
      <li>Improving our services and website</li>
      <li>Complying with legal and regulatory requirements</li>
    </ul>

    <h3>4. Information Sharing and Disclosure</h3>
    <p>We may share your information in the following circumstances:</p>
    <ul>
      <li><strong>Healthcare Providers:</strong> With other healthcare professionals involved in your care</li>
      <li><strong>Insurance Companies:</strong> For claims processing and pre-authorization</li>
      <li><strong>Legal Requirements:</strong> When required by law or court order</li>
      <li><strong>Business Associates:</strong> With vendors who assist in our operations (under strict confidentiality agreements)</li>
      <li><strong>Emergency Situations:</strong> To protect your health and safety</li>
    </ul>

    <h3>5. Data Security</h3>
    <p>We implement appropriate technical, administrative, and physical safeguards to protect your information, including:</p>
    <ul>
      <li>Encrypted data transmission and storage</li>
      <li>Access controls and user authentication</li>
      <li>Regular security assessments and updates</li>
      <li>Staff training on privacy and security</li>
      <li>Secure disposal of records</li>
    </ul>

    <h3>6. Your Rights</h3>
    <p>You have the right to:</p>
    <ul>
      <li>Access and review your personal information</li>
      <li>Request corrections to inaccurate information</li>
      <li>Request restrictions on use or disclosure</li>
      <li>Receive a copy of your health records</li>
      <li>File a complaint about our privacy practices</li>
      <li>Opt-out of marketing communications</li>
    </ul>

    <h3>7. Retention of Information</h3>
    <p>We retain your information for as long as necessary to provide services and comply with legal requirements. Dental records are typically maintained for a minimum of 7 years after your last visit, or longer as required by state law.</p>

    <h3>8. Children's Privacy</h3>
    <p>We provide dental services to patients of all ages. For patients under 18, we obtain parental consent before collecting or using their information, except in emergency situations or as otherwise permitted by law.</p>

    <h3>9. Website Cookies</h3>
    <p>Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. Some features may not function properly if cookies are disabled.</p>

    <h3>10. Changes to This Policy</h3>
    <p>We may update this Privacy Policy periodically. We will notify you of significant changes by posting the updated policy on our website and updating the "Last Updated" date.</p>

    <h3>11. Contact Us</h3>
    <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
    <p><strong>Liko Dental</strong><br/>
    740 NEW SOUTH HEAD RD, TRIPLE BAY SWFW 3108, NEW YORK<br/>
    Phone: + 725 214 456<br/>
    Email: contact@liko.com</p>
  `
};

export const termsOfServiceData: PolicyData = {
  title: "Terms of Service",
  subtitle: "Liko Dental",
  lastUpdated: true,
  htmlContent: `
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing our website or using our dental services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.</p>

    <h3>2. Dental Services</h3>
    <h4>2.1 Professional Relationship</h4>
    <p>Liko Dental provides professional dental services. A doctor-patient relationship is established only after an in-person consultation and examination. Online communications do not constitute a doctor-patient relationship.</p>

    <h4>2.2 Treatment Plans</h4>
    <p>All treatment plans are recommendations based on clinical examination and diagnostic findings. Patients have the right to accept, refuse, or seek alternative treatment options.</p>

    <h3>3. Appointments and Scheduling</h3>
    <h4>3.1 Appointment Booking</h4>
    <ul>
      <li>Appointments can be scheduled online, by phone, or in person</li>
      <li>Confirmation is required for all appointments</li>
      <li>We reserve the right to confirm insurance coverage before treatment</li>
    </ul>

    <h4>3.2 Cancellation Policy</h4>
    <ul>
      <li>24-hour notice is required for appointment cancellations</li>
      <li>Late cancellations or no-shows may result in a fee</li>
      <li>Repeated no-shows may result in dismissal from the practice</li>
    </ul>

    <h3>4. Payment and Insurance</h3>
    <h4>4.1 Payment Terms</h4>
    <ul>
      <li>Payment is due at the time of service unless other arrangements are made</li>
      <li>We accept cash, credit cards, and dental insurance</li>
      <li>Payment plans may be available for extensive treatment</li>
    </ul>

    <h4>4.2 Insurance</h4>
    <ul>
      <li>Insurance coverage verification is the patient's responsibility</li>
      <li>We will file insurance claims as a courtesy</li>
      <li>Patients are responsible for all charges not covered by insurance</li>
    </ul>

    <h3>5. Patient Responsibilities</h3>
    <p>Patients are expected to:</p>
    <ul>
      <li>Provide accurate and complete medical and dental history</li>
      <li>Follow pre and post-treatment instructions</li>
      <li>Maintain good oral hygiene</li>
      <li>Attend scheduled appointments and follow-up visits</li>
      <li>Inform us of any changes in health status or medications</li>
      <li>Treat staff and other patients with respect</li>
    </ul>

    <h3>6. Treatment Outcomes</h3>
    <p>While we strive for the best possible outcomes, dental treatment results cannot be guaranteed. Factors affecting treatment success include:</p>
    <ul>
      <li>Patient compliance with instructions</li>
      <li>Individual healing responses</li>
      <li>Underlying health conditions</li>
      <li>Oral hygiene maintenance</li>
    </ul>

    <h3>7. Emergency Care</h3>
    <p>For dental emergencies during office hours, contact our office immediately. After-hours emergency instructions are provided on our voicemail. For life-threatening emergencies, call 911.</p>

    <h3>8. Privacy and Confidentiality</h3>
    <p>We are committed to protecting your privacy in accordance with HIPAA regulations and our Privacy Policy. Patient information will only be disclosed with written consent or as required by law.</p>

    <h3>9. Website Use</h3>
    <h4>9.1 Permitted Use</h4>
    <p>Our website is intended for informational purposes and appointment scheduling. You may not use our website for any unlawful purpose or in any way that could damage our reputation or services.</p>

    <h4>9.2 Content Accuracy</h4>
    <p>While we strive to provide accurate information, website content is for general information only and should not replace professional dental advice.</p>

    <h3>10. Limitation of Liability</h3>
    <p>To the fullest extent permitted by law, Liko Dental shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or website.</p>

    <h3>11. Termination of Services</h3>
    <p>We reserve the right to terminate the doctor-patient relationship for reasons including but not limited to:</p>
    <ul>
      <li>Non-compliance with treatment recommendations</li>
      <li>Abusive behavior toward staff</li>
      <li>Repeated missed appointments</li>
      <li>Non-payment of fees</li>
    </ul>

    <h3>12. Governing Law</h3>
    <p>These terms are governed by the laws of New York State. Any disputes will be resolved in the courts of New York.</p>

    <h3>13. Changes to Terms</h3>
    <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.</p>

    <h3>14. Contact Information</h3>
    <p>For questions about these Terms of Service, please contact us:</p>
    <p><strong>Liko Dental</strong><br/>
    740 NEW SOUTH HEAD RD, TRIPLE BAY SWFW 3108, NEW YORK<br/>
    Phone: + 725 214 456<br/>
    Email: contact@liko.com</p>
  `
};

export const cookiePolicyData: PolicyData = {
  title: "Cookie Policy",
  subtitle: "Liko Dental",
  lastUpdated: true,
  htmlContent: `
    <h3>1. What Are Cookies?</h3>
    <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience and enable certain website features to function properly.</p>

    <h3>2. How We Use Cookies</h3>
    <p>Liko Dental uses cookies for the following purposes:</p>
    <ul>
      <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
      <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
      <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
      <li><strong>Analytics Cookies:</strong> Provide insights into website usage and performance</li>
    </ul>

    <h3>3. Types of Cookies We Use</h3>
    
    <h4>3.1 Strictly Necessary Cookies</h4>
    <p>These cookies are essential for our website to function properly. They enable basic functions like page navigation, appointment booking, and access to secure areas of the website.</p>
    <ul>
      <li>Session management cookies</li>
      <li>Security cookies</li>
      <li>Load balancing cookies</li>
    </ul>

    <h4>3.2 Performance and Analytics Cookies</h4>
    <p>These cookies help us understand how visitors interact with our website by collecting anonymous information about:</p>
    <ul>
      <li>Pages visited and time spent on each page</li>
      <li>Links clicked and forms completed</li>
      <li>Browser type and device information</li>
      <li>Geographic location (general area, not specific address)</li>
    </ul>

    <h4>3.3 Functionality Cookies</h4>
    <p>These cookies remember your preferences and provide enhanced features:</p>
    <ul>
      <li>Language preferences</li>
      <li>Font size and accessibility settings</li>
      <li>Previously entered form information</li>
      <li>Chat widget preferences</li>
    </ul>

    <h4>3.4 Marketing and Advertising Cookies</h4>
    <p>We may use these cookies to:</p>
    <ul>
      <li>Show relevant dental health content</li>
      <li>Measure the effectiveness of our advertising</li>
      <li>Prevent the same ads from being shown repeatedly</li>
    </ul>

    <h3>4. Third-Party Cookies</h3>
    <p>Our website may contain content from third-party services that may set their own cookies:</p>
    <ul>
      <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
      <li><strong>Google Maps:</strong> For location services and directions</li>
      <li><strong>Social Media Platforms:</strong> For social sharing features</li>
      <li><strong>Appointment Scheduling Tools:</strong> For online booking functionality</li>
    </ul>

    <h3>5. Managing Your Cookie Preferences</h3>
    
    <h4>5.1 Browser Settings</h4>
    <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
    <ul>
      <li>View and delete cookies</li>
      <li>Block cookies from specific websites</li>
      <li>Block third-party cookies</li>
      <li>Clear all cookies when you close the browser</li>
      <li>Set up notifications when cookies are being set</li>
    </ul>

    <h4>5.2 Browser-Specific Instructions</h4>
    <ul>
      <li><strong>Chrome:</strong> Settings > Privacy and security > Cookies and other site data</li>
      <li><strong>Firefox:</strong> Options > Privacy & Security > Cookies and Site Data</li>
      <li><strong>Safari:</strong> Preferences > Privacy > Cookies and website data</li>
      <li><strong>Edge:</strong> Settings > Cookies and site permissions</li>
    </ul>

    <h3>6. Impact of Disabling Cookies</h3>
    <p>While you can disable cookies, please note that this may affect your experience on our website:</p>
    <ul>
      <li>Some features may not work properly</li>
      <li>You may need to re-enter information repeatedly</li>
      <li>Appointment booking functionality may be limited</li>
      <li>Personalized content may not be available</li>
    </ul>

    <h3>7. Mobile Devices</h3>
    <p>If you access our website through a mobile device, you can manage cookies through your device's browser settings or through our mobile app settings if applicable.</p>

    <h3>8. Updates to This Policy</h3>
    <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by updating the "Last Updated" date.</p>

    <h3>9. Data Protection and Privacy</h3>
    <p>The information collected through cookies is handled in accordance with our Privacy Policy and applicable data protection laws. We do not use cookies to collect personal health information.</p>

    <h3>10. Consent</h3>
    <p>By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.</p>

    <h3>11. Contact Us</h3>
    <p>If you have questions about our use of cookies or this Cookie Policy, please contact us:</p>
    <p><strong>Liko Dental</strong><br/>
    740 NEW SOUTH HEAD RD, TRIPLE BAY SWFW 3108, NEW YORK<br/>
    Phone: + 725 214 456<br/>
    Email: contact@liko.com</p>

    <h3>12. Useful Resources</h3>
    <p>For more information about cookies and how to manage them:</p>
    <ul>
      <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
      <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">Your Online Choices</a></li>
    </ul>
  `
};

export const hipaaPrivacyNoticeData: PolicyData = {
  title: "HIPAA Privacy Notice",
  subtitle: "Liko Dental",
  lastUpdated: false,
  htmlContent: `
    <h3>NOTICE OF PRIVACY PRACTICES</h3>
    <p><strong>THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</strong></p>

    <h3>1. Our Commitment to Your Privacy</h3>
    <p>Liko Dental is committed to protecting the privacy of your protected health information (PHI). We are required by law to maintain the privacy of your health information and to provide you with this notice of our legal duties and privacy practices.</p>

    <h3>2. How We May Use and Disclose Your Health Information</h3>
    
    <h4>2.1 For Treatment</h4>
    <p>We may use and disclose your health information to provide you with dental treatment and services. For example:</p>
    <ul>
      <li>Sharing information with specialists we refer you to</li>
      <li>Coordinating care with your physician or other healthcare providers</li>
      <li>Discussing your treatment with dental assistants and hygienists</li>
      <li>Reviewing your medical history before procedures</li>
    </ul>

    <h4>2.2 For Payment</h4>
    <p>We may use and disclose your health information to obtain payment for services. For example:</p>
    <ul>
      <li>Submitting claims to your dental insurance company</li>
      <li>Providing information to verify insurance coverage</li>
      <li>Collecting payment for services rendered</li>
      <li>Determining eligibility for benefits</li>
    </ul>

    <h4>2.3 For Healthcare Operations</h4>
    <p>We may use and disclose your health information for healthcare operations. For example:</p>
    <ul>
      <li>Quality assessment and improvement activities</li>
      <li>Staff training and education</li>
      <li>Business planning and development</li>
      <li>Accreditation and licensing activities</li>
    </ul>

    <h3>3. Other Uses and Disclosures</h3>
    
    <h4>3.1 Appointment Reminders</h4>
    <p>We may contact you to remind you of scheduled appointments via phone, email, or text message.</p>

    <h4>3.2 Treatment Alternatives</h4>
    <p>We may contact you to provide information about treatment alternatives or health-related benefits and services.</p>

    <h4>3.3 Required by Law</h4>
    <p>We will disclose your health information when required by federal, state, or local law.</p>

    <h4>3.4 Public Health Activities</h4>
    <p>We may disclose your health information for public health activities, including:</p>
    <ul>
      <li>Reporting communicable diseases</li>
      <li>Reporting suspected abuse or neglect</li>
      <li>Reporting adverse drug reactions</li>
      <li>Public health investigations</li>
    </ul>

    <h4>3.5 Health Oversight Activities</h4>
    <p>We may disclose your health information to health oversight agencies for audits, investigations, inspections, and licensing purposes.</p>

    <h4>3.6 Judicial and Administrative Proceedings</h4>
    <p>We may disclose your health information in response to a court order, subpoena, or administrative request.</p>

    <h3>4. Your Rights Regarding Your Health Information</h3>
    
    <h4>4.1 Right to Request Restrictions</h4>
    <p>You have the right to request restrictions on how we use or disclose your health information. We are not required to agree to your request, but if we do, we will comply with your request unless the information is needed for emergency treatment.</p>

    <h4>4.2 Right to Request Confidential Communications</h4>
    <p>You have the right to request that we communicate with you about your health information in a certain way or at a certain location. For example, you may ask that we only contact you at work or by mail.</p>

    <h4>4.3 Right to Inspect and Copy</h4>
    <p>You have the right to inspect and copy your health information. To inspect and copy your health information, you must submit your request in writing. We may charge a fee for copying, mailing, and other supplies.</p>

    <h4>4.4 Right to Amend</h4>
    <p>You have the right to request that we amend your health information if you feel that the information is incorrect or incomplete. Your request must be in writing and must provide a reason for the request.</p>

    <h4>4.5 Right to an Accounting of Disclosures</h4>
    <p>You have the right to request an accounting of disclosures of your health information made by us for purposes other than treatment, payment, or healthcare operations.</p>

    <h4>4.6 Right to a Paper Copy of This Notice</h4>
    <p>You have the right to a paper copy of this notice even if you have agreed to receive the notice electronically.</p>

    <h3>5. Changes to This Notice</h3>
    <p>We reserve the right to change this notice and to make the revised notice effective for health information we already have about you as well as any information we receive in the future. We will post a copy of the current notice in our office and on our website.</p>

    <h3>6. Complaints</h3>
    <p>If you believe your privacy rights have been violated, you may file a complaint with us or with the Secretary of the Department of Health and Human Services. To file a complaint with us, contact our Privacy Officer. You will not be retaliated against for filing a complaint.</p>

    <h3>7. Contact Information</h3>
    <p><strong>Privacy Officer</strong><br/>
    Liko Dental<br/>
    740 NEW SOUTH HEAD RD, TRIPLE BAY SWFW 3108, NEW YORK<br/>
    Phone: + 725 214 456<br/>
    Email: privacy@liko.com</p>

    <p><strong>To file a complaint with the Department of Health and Human Services:</strong><br/>
    Office for Civil Rights<br/>
    U.S. Department of Health and Human Services<br/>
    200 Independence Avenue, S.W.<br/>
    Washington, D.C. 20201<br/>
    Phone: 1-877-696-6775<br/>
    Website: www.hhs.gov/ocr/privacy/hipaa/complaints/</p>

    <h3>8. Acknowledgment</h3>
    <p>By signing our acknowledgment form, you acknowledge that you have received a copy of this notice. If you have any questions about this notice, please ask to speak with our Privacy Officer.</p>
  `
}; 