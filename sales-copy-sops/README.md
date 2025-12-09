# Sales Copywriting System: Complete SOPs & AI Agents

## Overview

This documentation contains ultra-detailed Standard Operating Procedures (SOPs) and multi-layered AI agent configurations for a professional sales copywriting system. The system covers the complete workflow from client onboarding to final copy delivery.

## Supported Copy Types

- **Long-form Sales Pages**
- **Video Sales Letters (VSLs)**
- **Webinars**
- **Email Sequences**
- **Ads** (text, image, video)

## Supported Industries

- **Digital Products** (courses, SaaS, memberships)
- **Nutritional Supplements**
- **Service Providers** (coaches, consultants, agencies)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SALES COPY SYSTEM                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   PHASE 1   │───▶│   PHASE 2   │───▶│   PHASE 3   │───▶│   PHASE 4   │  │
│  │  Onboarding │    │  Kick-off   │    │  Research   │    │  Synthesis  │  │
│  │  & Review   │    │  Interview  │    │             │    │             │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                                    │        │
│                                                                    ▼        │
│  ┌─────────────┐                                         ┌─────────────┐   │
│  │   PHASE 6   │◀────────────────────────────────────────│   PHASE 5   │   │
│  │    Copy     │                                         │  Strategic  │   │
│  │  Creation   │                                         │  Planning   │   │
│  └─────────────┘                                         └─────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase Directory

| Phase | Name | Description |
|-------|------|-------------|
| 1 | [Client Onboarding & Product Review](./phase-1-onboarding/) | Initial product assessment and intake |
| 2 | [Kick-off Call & Client Interview](./phase-2-kickoff-interview/) | Deep-dive interview with client |
| 3 | [Market Research](./phase-3-market-research/) | Reddit, Quora, Amazon, YouTube, Scientific research |
| 4 | [Research Synthesis](./phase-4-research-synthesis/) | Analyzing and organizing all research |
| 5 | [Strategic Planning](./phase-5-strategic-planning/) | Journey mapping and offer design |
| 6 | [Copy Creation](./phase-6-copy-creation/) | Writing using frameworks (SLA, Wormhole) |

---

## AI Agents Directory

| Agent | Purpose | Location |
|-------|---------|----------|
| Master Orchestrator | Coordinates all phases and agents | [ai-agents/00-master-orchestrator.md](./ai-agents/00-master-orchestrator.md) |
| Product Analyst | Analyzes products and extracts features | [ai-agents/01-product-analyst.md](./ai-agents/01-product-analyst.md) |
| Interview Conductor | Guides kick-off calls and extracts insights | [ai-agents/02-interview-conductor.md](./ai-agents/02-interview-conductor.md) |
| Research Hunter | Scrapes and analyzes market research | [ai-agents/03-research-hunter.md](./ai-agents/03-research-hunter.md) |
| Synthesis Engine | Processes research into actionable insights | [ai-agents/04-synthesis-engine.md](./ai-agents/04-synthesis-engine.md) |
| Strategy Architect | Designs journey maps and offers | [ai-agents/05-strategy-architect.md](./ai-agents/05-strategy-architect.md) |
| Copy Generator | Writes copy using frameworks | [ai-agents/06-copy-generator.md](./ai-agents/06-copy-generator.md) |
| Quality Controller | Reviews and refines copy | [ai-agents/07-quality-controller.md](./ai-agents/07-quality-controller.md) |

---

## Core Frameworks

### SLA Framework (Long-form Copy)
**Story → Logic → Action**

Used for: Sales pages, VSLs, Webinars

### Wormhole Email Framework
**Curiosity Hook → Story → Pivotal Point → Transition → Pitch**

Used for: Email sequences, promotional emails

---

## Quick Start

1. Start with Phase 1 to onboard a new client
2. Follow each phase sequentially
3. Use the AI agents to automate repetitive tasks
4. Reference the frameworks during copy creation
5. Use the Quality Controller for final review

---

## Key Deliverables Per Phase

| Phase | Key Deliverables |
|-------|------------------|
| 1 | Product Assessment Document, Initial Brief |
| 2 | Interview Transcript, Client Insights Document |
| 3 | Research Database, Voice-of-Customer Library |
| 4 | Research Synthesis Report, Unique Mechanism Definition |
| 5 | Journey Map, Irresistible Offer Blueprint |
| 6 | Final Copy (Sales Page/VSL/Emails/Ads) |

---

## Document Conventions

Throughout these SOPs, you'll see:

- **[INPUT]** - Required input for the task
- **[OUTPUT]** - Expected deliverable from the task
- **[TOOL]** - Recommended tool or resource
- **[TIME]** - Estimated time for manual execution
- **[AGENT]** - Which AI agent handles this task
- **[CHECKPOINT]** - Quality check before proceeding

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial documentation |
