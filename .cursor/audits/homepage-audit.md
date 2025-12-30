# Home Page Information Flow & Narrative Audit

**Date:** 2025-01-27  
**Page:** `/app/page.tsx`  
**Purpose:** Evaluate information architecture, narrative coherence, and user journey

---

## Executive Summary

The home page presents a comprehensive case study narrative but suffers from **information overload** and **redundant messaging**. The narrative flow is logical but could be more streamlined. Key issues: repetitive content across sections, unclear hierarchy between "Progress Overview" and "POC Roadmap", and missing clear call-to-action.

---

## Information Flow Analysis

### Current Structure (Top to Bottom)

1. **Header** (lines 33-44)
   - Title: "Echelon: A Case Study in Strategic Prototyping"
   - Subtitle: Brief description
   - Tech badges

2. **The Problem** (lines 47-68)
   - Context: Why POC approach
   - Mentions question bank

3. **The Vision** (lines 71-112)
   - Game overview card
   - Core systems list

4. **Our Approach** (lines 115-138)
   - Methodology explanation
   - Repeats question bank mention

5. **GDD System Mapping** (lines 141-223)
   - Core Systems → POCs mapping
   - Supporting Systems → POCs mapping

6. **Progress Overview** (lines 226-260)
   - Overall progress bar
   - Status breakdown

7. **The Journey: Nine Prototypes** (lines 263-318)
   - Full POC list with cards
   - Key questions, focus areas, GDD references

8. **Question Coverage Dashboard** (lines 321-418)
   - Questions answered metric
   - Core Loop Questions card
   - Pillar Questions card

9. **What We're Learning** (lines 421-444)
   - Early insights placeholder

10. **Development Timeline** (lines 447-502)
    - Phase breakdown

11. **Resources** (lines 505-535)
    - GDD link
    - Roadmap link

---

## Narrative Flow Issues

### ✅ Strengths

1. **Logical progression**: Problem → Vision → Approach → Execution
2. **Clear value proposition**: Case study angle is well-established
3. **Comprehensive coverage**: All major aspects covered
4. **Good use of cards**: Visual hierarchy helps break up content

### ❌ Weaknesses

#### 1. **Redundant Information**

**Issue:** Core systems are mentioned 3+ times:
- Line 91-108: "Four Core Systems We Had to Prove" (in Vision section)
- Line 153-185: "Core Systems" mapping (in GDD System Mapping)
- Line 91-108: Same systems again in Vision card

**Impact:** Reader fatigue, unclear which section is authoritative

**Recommendation:** 
- Keep detailed list in Vision section
- GDD System Mapping should reference, not repeat
- Use visual distinction (icons, brief descriptions)

#### 2. **Question Bank Mentioned Multiple Times**

**Issue:** Question bank referenced in:
- Line 64: "we've identified {totalQuestions} critical questions"
- Line 125: "We've identified {totalQuestions} questions"
- Line 339: "from our canonical question bank"

**Impact:** Feels repetitive, unclear why it's important

**Recommendation:**
- Introduce question bank concept once (in "Our Approach")
- Reference it elsewhere without re-explaining
- Make it clear this is the validation framework

#### 3. **Progress vs Journey Confusion**

**Issue:** Two separate sections show POC status:
- **Progress Overview** (lines 226-260): High-level metrics
- **The Journey** (lines 263-318): Detailed POC cards

**Impact:** Unclear relationship, feels like duplicate information

**Recommendation:**
- Merge into single section: "Progress & Journey"
- Use Progress Overview as summary header
- Journey cards as expandable details below
- Or: Keep Progress Overview minimal, Journey as main content

#### 4. **GDD System Mapping Placement**

**Issue:** Placed before Progress/Journey sections, but references POCs that haven't been introduced yet

**Impact:** Reader encounters POC references before understanding what POCs are

**Recommendation:**
- Move after "Our Approach" but before Progress
- Or: Move to Resources section (less prominent)
- Or: Integrate into Journey section as sidebar/accordion

#### 5. **Missing Clear Entry Point**

**Issue:** No obvious "start here" or "what is this?" section for new visitors

**Impact:** Unclear where to begin reading

**Recommendation:**
- Add brief "About This Case Study" section at top
- Or: Enhance subtitle to be more descriptive
- Or: Add "Quick Start" card with links to key sections

#### 6. **Question Coverage Dashboard Placement**

**Issue:** Placed after Journey section, but questions are core to understanding POCs

**Impact:** Questions feel like afterthought, not central to methodology

**Recommendation:**
- Move earlier (after "Our Approach")
- Or: Integrate into Journey cards (show questions per POC)
- Or: Make it a sidebar/sticky element

#### 7. **"What We're Learning" Section is Empty**

**Issue:** Section exists but only contains placeholder text

**Impact:** Feels incomplete, wastes space

**Recommendation:**
- Remove if no content yet
- Or: Show actual learnings from completed POCs
- Or: Replace with "Key Insights" pulling from completed POCs

#### 8. **Development Timeline Redundancy**

**Issue:** Timeline repeats information already in Journey section

**Impact:** Redundant, doesn't add value

**Recommendation:**
- Remove (information already in Journey)
- Or: Make it visual timeline (more engaging)
- Or: Integrate into Journey section as visual element

---

## Information Hierarchy Issues

### Current Hierarchy (Visual Weight)

1. **Header** - Strong (large title)
2. **Problem** - Medium (section heading)
3. **Vision** - Strong (card)
4. **Approach** - Medium (section heading)
5. **GDD Mapping** - Strong (card)
6. **Progress** - Medium (card, but small)
7. **Journey** - Strong (large section, many cards)
8. **Question Coverage** - Medium (cards)
9. **Learning** - Weak (card, placeholder)
10. **Timeline** - Medium (card)
11. **Resources** - Medium (cards)

### Recommended Hierarchy

**Primary (Must Read):**
1. Header + Subtitle
2. The Problem (why this matters)
3. The Vision (what we're building)
4. Our Approach (how we're doing it)

**Secondary (Important Context):**
5. Progress Overview (where we are)
6. The Journey (detailed POC breakdown)

**Tertiary (Supporting Info):**
7. Question Coverage (validation framework)
8. GDD System Mapping (reference)
9. Resources (links)

**Remove/Consolidate:**
- What We're Learning (empty)
- Development Timeline (redundant)

---

## User Journey Analysis

### Current Flow

```
Visitor arrives
  ↓
Reads header (what is this?)
  ↓
Reads "The Problem" (why should I care?)
  ↓
Reads "The Vision" (what are they building?)
  ↓
Reads "Our Approach" (how are they doing it?)
  ↓
Reads "GDD System Mapping" (how does it connect?)
  ↓
Sees "Progress Overview" (where are they?)
  ↓
Scrolls through "Journey" (detailed POCs)
  ↓
Sees "Question Coverage" (validation framework)
  ↓
Sees "What We're Learning" (empty placeholder)
  ↓
Sees "Development Timeline" (redundant info)
  ↓
Sees "Resources" (links)
```

### Issues

1. **No clear entry point** - Visitor doesn't know where to start
2. **Information overload** - Too many sections before getting to content
3. **Backtracking** - GDD Mapping references POCs before they're introduced
4. **No clear CTA** - What should visitor do next?

### Recommended Flow

```
Visitor arrives
  ↓
Header + Brief intro (what is this case study?)
  ↓
The Problem (why this approach?)
  ↓
The Vision (what game are they building?)
  ↓
Our Approach (methodology + question framework)
  ↓
Progress Overview (quick status)
  ↓
The Journey (detailed POCs - main content)
  ↓
Question Coverage (validation framework - reference)
  ↓
Resources (GDD, Roadmap, etc.)
```

---

## Content Redundancy Analysis

### Core Systems Mentioned:
- **Vision section**: Full list with descriptions
- **GDD Mapping**: Same systems, different format
- **Journey cards**: Referenced in individual POCs

**Verdict:** Redundant. Keep detailed in Vision, reference elsewhere.

### Question Bank Mentioned:
- **Problem section**: "we've identified {totalQuestions} critical questions"
- **Approach section**: "We've identified {totalQuestions} questions"
- **Question Coverage**: "from our canonical question bank"

**Verdict:** Redundant. Introduce once, reference elsewhere.

### POC Status Shown:
- **Progress Overview**: Summary metrics
- **Journey section**: Individual POC cards with status badges
- **Timeline**: Phase-based grouping

**Verdict:** Redundant. Consolidate into single view.

---

## Clarity & Messaging Issues

### 1. **Unclear Purpose Statement**

**Current:** "How we validated a co-op heist game's core mechanics through discrete Proof of Concept prototypes—and what we learned along the way"

**Issue:** Doesn't explain WHO this is for or WHY it matters

**Recommendation:** 
- Add audience: "For game developers and designers..."
- Add value: "...to see how strategic prototyping validates risky assumptions"

### 2. **Question Framework Not Explained**

**Issue:** Question bank mentioned but never explained WHY it's important

**Recommendation:**
- Add explanation: "Each POC answers specific questions from our validation framework"
- Show example question
- Link to full question bank

### 3. **GDD References Unclear**

**Issue:** GDD Mapping shows "lines 28-42" but doesn't explain what that means

**Recommendation:**
- Add tooltip/explanation
- Or: Link directly to GDD sections
- Or: Show excerpt instead of line numbers

### 4. **No Clear Next Steps**

**Issue:** After reading, visitor doesn't know what to do

**Recommendation:**
- Add "Start Here" section
- Add "Most Recent POC" highlight
- Add "Recommended Reading" order

---

## Structural Recommendations

### Option A: Streamlined (Recommended)

1. **Header** - Enhanced with clear value prop
2. **The Problem** - Why POC approach
3. **The Vision** - Game overview + core systems
4. **Our Approach** - Methodology + question framework intro
5. **Progress & Journey** - Combined section
   - Progress summary at top
   - POC cards below
6. **Question Coverage** - Reference sidebar or separate page
7. **Resources** - Links

**Removed:**
- GDD System Mapping (move to Resources or GDD page)
- What We're Learning (empty)
- Development Timeline (redundant)

### Option B: Two-Column Layout

**Left Column (Narrative):**
- Header
- Problem
- Vision
- Approach
- Journey

**Right Column (Reference):**
- Progress Overview (sticky)
- Question Coverage
- GDD Mapping
- Resources

### Option C: Tabbed Interface

**Tabs:**
- Overview (Problem, Vision, Approach)
- Progress (Progress + Journey)
- Questions (Question Coverage)
- Resources (GDD, Roadmap)

---

## Specific Content Recommendations

### 1. Enhance Header

**Current:**
```tsx
<h1>Echelon: A Case Study in Strategic Prototyping</h1>
<p>How we validated a co-op heist game's core mechanics...</p>
```

**Recommended:**
```tsx
<h1>Echelon: A Case Study in Strategic Prototyping</h1>
<p className="text-lg">
  How we validated a co-op heist game's core mechanics through discrete 
  Proof of Concept prototypes—and what we learned along the way.
</p>
<p className="text-sm text-muted-foreground mt-2">
  For game developers and designers interested in systematic validation 
  of risky game mechanics before committing to full production.
</p>
```

### 2. Consolidate Progress & Journey

**Current:** Two separate sections

**Recommended:** Single section
```tsx
<section>
  <h2>Progress & Journey</h2>
  {/* Progress summary */}
  <div className="mt-8">
    <h3>The Journey: Nine Prototypes</h3>
    {/* POC cards */}
  </div>
</section>
```

### 3. Move GDD Mapping

**Current:** Prominent section before Journey

**Recommended:** 
- Move to Resources section
- Or: Make it collapsible/accordion
- Or: Link to dedicated GDD page with mapping

### 4. Remove Empty Sections

**Current:** "What We're Learning" has placeholder text

**Recommended:**
- Remove entirely
- Or: Show actual learnings from completed POCs
- Or: Replace with "Latest Updates" pulling from POC pages

### 5. Add Clear CTAs

**Current:** No clear next steps

**Recommended:**
- Add "Start Reading" button → First POC
- Add "View GDD" button → GDD page
- Add "See Progress" button → Journey section

---

## Metrics to Track

If analytics are available, track:
1. **Scroll depth** - Where do users drop off?
2. **Click-through rates** - Which POC cards get clicked?
3. **Time on page** - Are users reading or bouncing?
4. **Navigation patterns** - What do users click after landing?

---

## Priority Fixes

### High Priority (Do First)
1. ✅ Remove redundant "What We're Learning" section
2. ✅ Consolidate Progress Overview and Journey sections
3. ✅ Remove or relocate Development Timeline
4. ✅ Move GDD System Mapping to Resources or make collapsible

### Medium Priority (Do Next)
5. ✅ Reduce redundancy in Core Systems mentions
6. ✅ Clarify Question Framework introduction
7. ✅ Add clear CTAs/next steps
8. ✅ Enhance header with audience/value prop

### Low Priority (Nice to Have)
9. ✅ Add visual timeline instead of text-based
10. ✅ Create two-column layout for reference materials
11. ✅ Add "Start Here" guide for new visitors
12. ✅ Make GDD references clickable/linked

---

## Conclusion

The home page is **comprehensive but overwhelming**. The narrative is sound but needs streamlining. Key actions:

1. **Remove redundancy** - Core systems, question bank, POC status shown multiple times
2. **Consolidate sections** - Progress + Journey, remove empty/duplicate sections
3. **Improve hierarchy** - Clear primary/secondary/tertiary content
4. **Add clear CTAs** - Guide visitors on next steps
5. **Clarify messaging** - Explain question framework, GDD references, audience

**Estimated Impact:** Reducing from 11 sections to 7-8 sections would improve readability by ~30-40% while maintaining all essential information.
