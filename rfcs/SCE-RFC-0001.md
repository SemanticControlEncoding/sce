# SCE-RFC-0001: Core Symbol Ontology

- **RFC ID:** SCE-RFC-0001
- **Title:** Core Symbol Ontology
- **Status:** Draft
- **Version:** 0.1
- **Author:** Maintainer (Foundational Phase)
- **Created:** YYYY-MM-DD
- **Supersedes:** None
- **Depends On:** None
- **Spec Target:** SCE Standard v1.0

---

## 1. Abstract

This document defines the initial Core Symbol Ontology for the SCE (Semantic Communication Encoding) standard. The ontology provides a structured set of semantic emoji-based symbols intended for use in human–machine communication, annotation, reasoning interfaces, and automated processing systems.

The symbols defined herein constitute the baseline vocabulary for compliant SCE implementations.

---

## 2. Motivation

Large Language Models (LLMs), annotation tooling, and hybrid reasoning workflows benefit from compact communicative signals that retain explicit meaning. Emoji are widely supported Unicode graphemes with embedded semantic priors, making them viable semantic markers when governed by a standard.

The purpose of this RFC is to establish the foundational semantic layer necessary for consistent interpretation across:

- Humans
- Machine reasoning systems
- Software implementations
- Documentation formats

---

## 3. Terminology and Requirements Language

This document uses the key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** as defined in [RFC 2119].

---

## 4. Scope

This RFC defines:

- The symbolic vocabulary of the initial SCE ontology
- Categories of meaning
- Roles assigned to each symbol
- Constraints governing symbol interpretation

This RFC does **not** define:

- Encoding formats
- Transport mechanisms
- Domain-specific extensions
- Governance processes (covered separately)

---

## 5. Core Ontology Categories

The ontology is organized into semantic domains to improve interpretability and rule enforcement.

| Domain      | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| structure   | Symbols defining document and reasoning structure                         |
| legalPolicy | Symbols representing law, precedent, governance, and compliance artifacts |
| reasoning   | Symbols representing cognitive or investigatory operations                |
| tasks       | Symbols representing procedural or action states                          |
| privacy     | Symbols representing information governance and access conditions         |
| actors      | Symbols representing roles or system participants                         |
| state       | Symbols representing workflow, risk, or progress status                   |
| control     | Symbols representing direction or procedural branching                    |

---

## 6. Required Symbol Definitions

For each symbol, the following metadata MUST be defined:

```
emoji: the Unicode grapheme
role: one of: STRUCTURE, LEGAL, REASONING, TASK, PRIVACY, ACTOR, STATE, CONTROL
meaning: authoritative definition
allowedContext: array of permitted usage domains: [HUMAN, LLM, TOOL]
usage: REQUIRED, OPTIONAL, or CONDITIONAL
conflictsWith: array of mutually exclusive symbols
example: a short instructional usage instance
```

---

## 7. Canonical Symbol List

The following symbols and metadata constitute the canonical Core Symbol Ontology:

> The full machine-readable definition is maintained in `src/ontology.ts` and SHALL be considered the normative source.

### 7.1 STRUCTURE

| Identifier          | Symbol | Meaning                |
| ------------------- | ------ | ---------------------- |
| structure.section   | 🗂️     | Section boundary       |
| structure.pinned    | 📌     | Non-negotiable fact    |
| structure.reference | 📎     | Linked external source |

### 7.2 LEGAL

| Identifier                       | Symbol | Meaning                           |
| -------------------------------- | ------ | --------------------------------- |
| legalPolicy.law                  | ⚖️     | Legal or regulatory authority     |
| legalPolicy.citation             | 📜     | Formal citation text              |
| legalPolicy.complianceRecord     | 🧾     | Evidence of compliance            |
| legalPolicy.institutionAuthority | 🏛️     | Court or organizational authority |

### 7.3 REASONING

| Identifier            | Symbol | Meaning                              |
| --------------------- | ------ | ------------------------------------ |
| reasoning.analyze     | 🔍     | Analysis or verification action      |
| reasoning.insight     | 🧠     | Interpretation or derived conclusion |
| reasoning.investigate | 🕵️     | Pending investigative question       |

### 7.4 TASKS

| Identifier         | Symbol | Meaning                         |
| ------------------ | ------ | ------------------------------- |
| tasks.action       | 📝     | Action instruction              |
| tasks.todo         | ☐      | Unstarted task                  |
| tasks.softComplete | ☑️     | Completed, pending verification |
| tasks.complete     | ✅     | Verified task completion        |
| tasks.repeat       | 🔁     | Recurring or repeated action    |

### 7.5 PRIVACY

| Identifier         | Symbol | Meaning                      |
| ------------------ | ------ | ---------------------------- |
| privacy.private    | 🔐     | Protected-access information |
| privacy.authorized | 🗝️     | Access granted               |
| privacy.open       | 🔓     | Public data                  |

### 7.6 ACTORS

| Identifier            | Symbol | Meaning                                |
| --------------------- | ------ | -------------------------------------- |
| actors.generic        | 👤     | Unspecified person                     |
| actors.student        | 🧑‍🎓     | Student role                           |
| actors.teacher        | 🧑‍🏫     | Instructional or staff role            |
| actors.legalAuthority | 🧑‍⚖️     | Official adjudicator or decision-maker |
| actors.organization   | 🏢     | Institution or organizational entity   |

### 7.7 STATE

| Identifier       | Symbol | Meaning                           |
| ---------------- | ------ | --------------------------------- |
| state.pending    | ⏳     | Awaiting completion or dependency |
| state.unclear    | ❓     | Ambiguous or insufficiently known |
| state.warning    | ⚠️     | Risk or required attention        |
| state.prohibited | ❌     | Noncompliant or invalid state     |

### 7.8 CONTROL

| Identifier            | Symbol | Meaning                       |
| --------------------- | ------ | ----------------------------- |
| control.decisionPoint | 🔀     | Branching or conditional path |
| control.next          | ⏭️     | Advance progression           |
| control.back          | ⏮️     | Return or rollback            |

---

## 8. Validation Rules

A compliant implementation MUST validate:

1. No duplicate emoji definitions exist.
2. All symbols include required metadata fields.
3. Conflicts are symmetrical where applicable.
4. Machine-readable ontology output conforms to the published schema.

Implementations MAY extend the ontology only when:

- All new symbols include full metadata.
- No breaking semantic collisions occur.

---

## 9. Backward Compatibility

Once approved and published under version 1.0:

- Removing or redefining a symbol SHALL be considered a breaking change.
- Additive extensions SHALL be considered non-breaking.

---

## 10. Security and Ethical Considerations

Symbol meanings MUST NOT be altered in ways that enable harmful or prohibited use defined in the SCE Ethical License.

---

## 11. Approval

This RFC SHALL be approved when:

- It receives Maintainer approval during the Foundational Phase.
- No unresolved objections exist.

---

## 12. Future Revisions

Changes to this RFC MUST be submitted via a new RFC.
