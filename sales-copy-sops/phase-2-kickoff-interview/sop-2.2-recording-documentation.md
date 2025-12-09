# SOP 2.2: Recording & Documentation

## Purpose
Ensure all kick-off call content is properly recorded and documented for reference throughout the project.

---

## Recording Setup

### Primary Recording Options

| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Zoom (built-in)** | Easy, auto-transcript | May need plan upgrade | Most calls |
| **Loom** | Easy sharing | Need separate call platform | Presentations |
| **Otter.ai** | Best AI transcript | Subscription cost | Heavy users |
| **Fathom** | Free, great for meetings | Limited customization | Budget option |
| **Rev.com** | Human transcripts available | Cost per minute | High accuracy needs |
| **QuickTime/OBS** | Free, local storage | Manual upload needed | Privacy conscious |

### Recommended Setup
```
Primary: Zoom cloud recording (with transcript enabled)
Backup: Phone voice memo app (just in case)
Transcript: Zoom AI or Otter.ai
```

---

## Step-by-Step Procedure

### Step 1: Pre-Call Recording Setup
**[TIME: 5 minutes before call]**

#### Zoom Setup
1. Open Zoom settings → Recording
2. Enable "Record to cloud" (preferred) or local
3. Enable "Audio transcript"
4. Enable "Record separate audio for each participant" (optional)
5. Test recording in a test meeting

#### Backup Recording
1. Have phone ready with voice memo app
2. Position phone near your microphone
3. Do NOT start backup unless primary fails

### Step 2: Start Recording at Call Start
**[TIME: During call opening]**

#### Permission Script
```
"Before we dive in, I'd like to record this call so I can
reference it later when writing. The recording will only be
used for this project. Is that okay with you?"
```

Wait for explicit "yes" before starting.

#### Start Recording Checklist
- [ ] Client gave verbal permission
- [ ] Click Record button
- [ ] Confirm recording indicator is visible
- [ ] Note start time in your notes

### Step 3: During-Call Documentation
**[TIME: Throughout call]**

While recording handles the audio, take selective notes:

#### What to Note Live
| Priority | Type | Example |
|----------|------|---------|
| 1 | **Exact quotes** | "I was so frustrated I wanted to throw my laptop out the window" |
| 2 | **Specific numbers** | "Lost $50K trying other solutions" |
| 3 | **Unique insights** | Never heard this perspective before |
| 4 | **Story details** | Names, timelines, specific situations |
| 5 | **Follow-up ideas** | Things to research later |

#### Live Notes Format
```markdown
## Call Notes - [Client Name] - [Date]

### Section: Customer Deep-Dive
[Timestamp approx: 0:05]

- Pain point: "_______________" (exact quote)
- Follow-up: [question to ask]
- Insight: [your observation]

### Section: Mechanism
[Timestamp approx: 0:25]

- Key phrase: "_______________"
- Their system name: [name if mentioned]
- Why it works: [summary]

[Continue for each section...]

### Hot Quotes (Don't lose these!)
1. "_______________"
2. "_______________"
3. "_______________"

### Follow-up Needed
- [ ] [Item 1]
- [ ] [Item 2]
```

### Step 4: End-of-Call Recording
**[TIME: End of call]**

- [ ] Stop recording before goodbyes/casual chat
- [ ] Confirm recording saved
- [ ] Note total duration
- [ ] Thank client again

### Step 5: Immediate Post-Call (within 15 minutes)
**[TIME: 15 minutes post-call]**

Do this immediately while fresh:

#### Recording Verification
- [ ] Recording file exists
- [ ] Recording is complete (check duration)
- [ ] Audio quality is acceptable
- [ ] File properly named and saved

#### File Naming Convention
```
[CLIENT]-[PROJECT]-kickoff-[DATE].[ext]

Examples:
acme-course-launch-kickoff-2024-01-15.mp4
smith-coaching-kickoff-2024-01-15.m4a
```

#### Backup Copy
- [ ] Download recording to local drive
- [ ] Upload to project folder
- [ ] Consider cloud backup (Google Drive, Dropbox)

#### Quick Brain Dump
Before you forget, add to your notes:
```markdown
## Immediate Impressions (Brain Dump)

### Biggest Insights
- [Insight 1]
- [Insight 2]
- [Insight 3]

### Best Story Moment
[Brief description of most compelling story]

### The Mechanism (My Understanding)
[Quick summary in your words]

### Things That Surprised Me
- [Surprise 1]
- [Surprise 2]

### Red Flags / Concerns
- [If any]

### Energy Level / Confidence
[How confident did they seem about their product/claims?]
```

---

## Transcript Generation

### Step 6: Generate Transcript
**[TIME: 5-30 minutes depending on tool]**

#### Option A: Zoom Built-in (Automatic)
1. Wait for Zoom to process (usually 30-60 min)
2. Download from Zoom portal
3. Review and clean up speaker labels

#### Option B: Otter.ai
1. Upload recording to Otter
2. Wait for processing (usually 10-20 min)
3. Export as .txt or .docx
4. Review and correct errors

#### Option C: Rev.com (Human Transcript)
1. Upload recording
2. Select turnaround time
3. Pay per audio minute
4. Receive cleaned transcript

#### Option D: Whisper (Free, Local)
1. Install Whisper
2. Run: `whisper recording.mp4 --model medium`
3. Clean up output

### Step 7: Transcript Cleanup
**[TIME: 30-60 minutes]**

Even AI transcripts need cleaning:

#### Cleanup Checklist
- [ ] Fix speaker identification (Client vs. You)
- [ ] Correct product/company names
- [ ] Fix industry jargon
- [ ] Mark unclear sections [UNCLEAR]
- [ ] Add timestamps for key moments
- [ ] Remove false starts and filler words (optional)

#### Cleaned Transcript Format
```markdown
# Kick-off Call Transcript

## Project: [Name]
## Date: [Date]
## Participants: [Your Name] (Copywriter), [Client Name] (Client)
## Duration: [X minutes]

---

## [00:00] Opening / Rapport

**You:** [Opening dialogue]

**Client:** [Response]

---

## [05:00] Customer Deep-Dive

**You:** Let's start with your customers. Describe your ideal customer...

**Client:** Our ideal customer is typically a [description]. They're usually
dealing with [problem] and have tried [solutions] before...

[Continue with timestamps every 5-10 minutes or at section breaks]

---

## Key Quotes Index

| Timestamp | Quote | Topic |
|-----------|-------|-------|
| 12:34 | "[Exact quote]" | Pain point |
| 23:45 | "[Exact quote]" | Mechanism |
| 34:56 | "[Exact quote]" | Success story |

---
```

---

## Output Deliverables

| Deliverable | Format | Location |
|-------------|--------|----------|
| Recording file | MP4/M4A/MP3 | /00-project-management/call-recordings/ |
| Backup recording | Same | Cloud backup folder |
| Raw transcript | TXT/DOCX | /00-project-management/kick-off/ |
| Cleaned transcript | Markdown | /00-project-management/kick-off/transcript-clean.md |
| Live notes | Markdown | /00-project-management/kick-off/call-notes-live.md |
| Brain dump | Markdown | /00-project-management/kick-off/brain-dump.md |

---

## Quality Checklist

Before proceeding to Task 2.3:

- [ ] Recording verified and backed up
- [ ] Recording properly named and filed
- [ ] Transcript generated
- [ ] Transcript cleaned and formatted
- [ ] Live notes organized
- [ ] Brain dump completed
- [ ] Key quotes indexed

---

## AI Agent Instructions

### Agent: Transcript Processor

**Trigger:** Recording uploaded

**Instructions:**
```
You are a Transcript Processing Agent. Your job is to clean and format
interview transcripts for copywriting projects.

When given a raw transcript:

1. IDENTIFY speakers and label consistently:
   - "Copywriter:" or "You:"
   - "Client:" or "[Client Name]:"

2. CLEAN the transcript:
   - Fix obvious transcription errors
   - Correct proper nouns (company names, product names)
   - Fix industry-specific terms
   - Mark unclear sections as [UNCLEAR]
   - Optionally remove filler words (um, uh, like)

3. FORMAT for readability:
   - Add section headers based on topic
   - Add timestamps every 5-10 minutes
   - Use proper markdown formatting
   - Break long responses into paragraphs

4. CREATE a quote index:
   - Identify the best quotes
   - Note timestamp for each
   - Categorize by topic (pain point, desire, mechanism, story, etc.)

5. FLAG important moments:
   - Emotional peaks
   - Key insights
   - Potential headline material
   - Story moments

OUTPUT:
- Cleaned, formatted transcript (markdown)
- Quote index table
- Key moments summary

QUALITY STANDARDS:
- Speaker identification must be 100% accurate
- All proper nouns should be spelled correctly
- Timestamps should be within 30 seconds of actual
- Every usable quote should be indexed
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Recording failed | Use backup; request brief follow-up call |
| Poor audio quality | Use human transcription service |
| Multiple speakers hard to distinguish | Note who's speaking in live notes |
| Transcript has many errors | Budget extra time for cleanup |
| Recording too long | Timestamp key sections; don't transcribe everything |
| Client asked not to record | Take detailed live notes; type up immediately after |

---

## Security & Privacy

### Best Practices
- Store recordings securely (encrypted if sensitive)
- Don't share recordings without permission
- Delete recordings after project completion (per agreement)
- Don't include recording in deliverables to client
- Treat all call content as confidential

---

## Next Task

→ Proceed to [SOP 2.3: Post-Call Processing](./sop-2.3-post-call-processing.md)
