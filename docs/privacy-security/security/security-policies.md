---
contentType: reference
---

# Summary of security policies

This page provides summaries of n8n's corporate security policies.

--8<-- "_snippets/privacy-security/contacts.md"

## Acceptable use policy

n8n's Acceptable Use Policy applies to all personnel and covers use of company IT assets. It requires comprehensive interviews during hiring, agreement to terms and conditions, structured onboarding and offboarding procedures, and ongoing security training. Employees must take measures to prevent corporate data transmission through digital communications. The policy also outlines procedures for remote access, device security, protection against malware, and use of personal devices. Breaches of security may result in disciplinary action, including termination.

## Asset management policy

The Asset Management Policy of n8n defines requirements for managing and tracking assets throughout their lifecycle. The policy includes maintaining a detailed asset inventory, associating each significant asset with an identifier, license, or tag, and tracking the disposal/replacement of assets. The policy also outlines standards for physical and virtual assets, asset inventory, asset retirement, and system hardening. The People Team and Security Officer have specific roles and responsibilities in implementing this policy.

## Backup policy

n8n's backup policy ensures the confidentiality, integrity, and availability of data through daily backups. The policy requires compliance with laws, contractual agreements, and business requirements for cloud data retention. All business data should be stored or replicated into a company-controlled repository, and data retention periods must comply with regulatory and contractual requirements. Customer data is stored in Azure, with automatic backups performed to protect against catastrophic loss. Source code is stored in GitHub and is backed up to n8n’s GitLab account daily.

## Business continuity plan

The Business Continuity Plan outlines procedures for recovering n8n following a disruption, including backup and recovery of systems and data. The plan is to be tested annually. The policy outlines roles and responsibilities, lines of succession, response teams, and operational resilience strategies. It also includes a Business Impact Analysis and strategies for work site recovery and application service event recovery. Key actions include backing up key documents and ensuring key personnel have each other's contact information.

## Code of conduct

The code of conduct includes a section on individual responsibility to be familiar with n8n's security policies, and follow good practices.

## Data protection policy

The Data Protection Policy outlines procedures and controls to protect n8n customer data. All production systems must follow the policy, which includes handling data according to its classification, disabling unnecessary services, logging all access, and enabling security monitoring. Customer data is hosted on Microsoft Azure in the Germany West Central region, stored on encrypted volumes, and segmented for access only by authorized customers. Employee access to production is granted on a need basis and monitored. Confidentiality is maintained through legally enforceable non-disclosure agreements. All databases, data stores, and file systems are encrypted, and data transfer is minimized and encrypted.

## Disaster recovery plan

The Disaster Recovery Plan outlines procedures to recover n8n following a disruption resulting from a disaster. The plan includes phases for notification/activation, recovery, and reconstitution. It identifies critical and non-critical systems, assesses potential threats, and outlines testing and maintenance procedures. The plan also details procedures for each phase, including notification sequences, damage assessment, recovery goals, and restoration of the original or new site. The goal is to restore full operations within 24 hours of a disaster or outage.

## Encryption policy

The Encryption Policy outlines the organizational requirements for cryptographic controls and key requirements to protect the confidentiality, integrity, authenticity, and non-repudiation of information. It applies to all systems, equipment, facilities, and information within n8n’s information security program. The policy specifies the use of cryptographic algorithms and keys, key management and protection, and the use of cryptography in cloud environments. It also details the roles and responsibilities of the Security Officer, Engineering Manager/Tech Lead, and Key owners. The policy mandates the use of specific cryptographic controls for different systems or types of information and outlines the requirements for key management.

## Incident response plan

The Incident Response Plan outlines the procedures for detecting, reacting to, and resolving security breaches and service outages. It applies to all users of n8n's information systems and requires immediate reporting of any perceived or actual security vulnerability or incident. The plan also details the roles and responsibilities of various stakeholders, including the Security Officer, Incident Response Team, and Incident Lead. It emphasizes the importance of preserving forensic evidence and conducting a post-mortem after resolving an incident. The plan is reviewed annually for effectiveness and is tested through annual training of all staff.

## Information security policy

The Information Security Policy outlines the responsibility of every individual to protect information in all forms from unauthorized modification, destruction, or disclosure. The policy aims to maintain confidentiality, integrity, and availability of data and IT systems. It outlines roles and responsibilities, policy review procedures, accessibility, and exceptions. It also details training requirements, clean desk/work area policies, internet/intranet use, teleworking, intellectual property rights, employment terms and conditions, and disciplinary processes. Non-compliance with the policy may result in disciplinary actions including verbal and/or written warnings, suspension, termination, and/or other legal remedies.

## Password policy

The password policy at n8n applies to all employees and contractors with access to sensitive data. Passwords should be complex, at least 10 characters long, and not reused across services. Multi-Factor Authentication (MFA) should be enabled where possible. Passwords are confidential and should not be shared. If a password is suspected of being compromised, it should be changed immediately and the Security Officer notified. Violation of this policy may result in disciplinary action.

## Physical security policy

The Physical Security Policy of n8n establishes requirements to protect the company's information assets from physical tampering, damage, theft, or unauthorized access. This includes defining physical security perimeters, controlling personnel and visitor access, and protecting off-site equipment. The policy applies to all n8n facilities and users, including employees, contractors, and any external parties with physical access to the company's information systems. The People Team is responsible for maintaining this policy and managing physical access to the facility. The policy also outlines general security practices, access requirements, building standards per location, and data center security.

## Responsible disclosure policy

n8n's Responsible Disclosure Policy outlines the process for reporting and disclosing vulnerabilities discovered by external entities, as well as anonymous reporting of information security policy violations by internal entities. The policy covers n8n’s core platform, its information security infrastructure, and applies to both internal and external employees or third parties. It ensures the safety and security of customers and employees, fostering an environment of trust with the security community. The policy also includes a whistleblower program for reporting information security program violations.

## Risk assessment policy

The Risk Assessment Policy at n8n outlines a systematic approach to identify and treat information security risks. It includes identifying threats and vulnerabilities related to company assets, assessing the likelihood and impact of these risks, and determining treatment for each unacceptable risk. The risk level is calculated by multiplying the impact score and the likelihood score. The company has defined its risk appetite in different areas such as engineering, security, finance, HR, and legal. The Risk Assessment Report must be updated at least once per year.

## Software development life cycle policy

The Software Development Life Cycle Policy outlines the requirements for the development, testing, and implementation of n8n software systems. Key phases include determining system need, defining system requirements, designing system components, building system components, evaluating system readiness, and system deployment. The policy also outlines project management approaches, security control guidelines, and the roles and responsibilities of the engineering teams.

n8n is working towards the following: all software deployed on Corporate or Hosted infrastructure should prevent security issues including but not limited to those covered by SAN and OWASP.

## System access control policy

The System Access Control Policy at n8n limits access to systems and applications to necessary users only. Access requests are formally made and granted based on the employee's role and job title. Regular reviews ensure proper authorizations are in place. Security levels are assigned based on job responsibilities and regulated by the role-based access control (RBAC) method. Unique user identification is required, with strong password controls in place. Automatic logoff and workstation use policies are enforced. Termination procedures are in place to revoke access rights promptly. High-risk users' accounts can be disabled based on the specific risk they pose.

## Vendor management policy

The Vendor Management Policy of n8n establishes requirements for third-party service providers to preserve and protect n8n information. It applies to all IT vendors and partners who can impact the confidentiality, integrity, and availability of n8n’s technology and sensitive information. The policy prescribes minimum security standards, including security clauses, risk assessments, service level agreements, and incident management. IT vendors must comply with n8n’s Information Security Program and ensure that records are protected, safeguarded, and securely disposed of. n8n may audit IT vendors and performs an annual review of critical third-party vendors.

## Vulnerability management policy

The Vulnerability Management Policy mandates annual scanning of all product systems for vulnerabilities, with findings reported, tagged, and tracked to resolution. The policy also outlines roles and responsibilities, including the VP of Engineering's responsibility for maintaining the policy, the Cloud Team Lead's role in conducting testing, and the Engineering Manager's duty to remediate vulnerabilities. The policy also details guidelines for information systems audits, vulnerability scanning, penetration testing, and reporting, tracking, and remediation of security findings. It also provides a framework for resolving and closing findings, and for requesting exceptions when a direct fix to a vulnerability is not available.
