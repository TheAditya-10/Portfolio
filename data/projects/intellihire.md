# IntelliHire

IntelliHire is an AI-powered interviewer platform that automates resume screening, adaptive interviews, and recruiter reporting.

## Workflow
- Companies post roles with required skills and qualification criteria.
- Candidates apply by uploading resumes and scheduling interview slots.
- The interview engine generates dynamic follow-up questions based on performance and context.

## Architecture
- Flask backend for auth, role management, interview orchestration, and report delivery.
- LangChain + Gemini API pipeline for resume-aware and job-aware question generation.
- MySQL with SQLAlchemy for persistent candidate, interview, and report records.
- Vosk speech-to-text integration for spoken interview responses.

## Trade-offs
- Prioritized adaptive interview quality over minimal infrastructure complexity.
- Chose Gemini for deployment efficiency after trying multiple model providers.
- Accepted higher backend orchestration effort to maintain role-specific interview quality.

## Why these choices
- Hiring teams need consistent scoring and traceable candidate evidence.
- Adaptive difficulty creates more realistic interview signal than static question banks.
- Persistent reporting and logs make recruiter shortlisting faster and auditable.
