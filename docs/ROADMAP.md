# SCE Roadmap

This document defines the planned development progression for the SCE (Semantic Communication Encoding) standard, including milestones, dependencies, and maturity targets.

The roadmap SHALL remain aligned with the governance model and ethical licensing requirements. It is a living document and SHALL be updated as milestones are achieved or reprioritized.

---

## 1. Versioning Framework

SCE follows **semantic versioning**:

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Breaking changes to ontology structure or interpretation rules.
- **MINOR**: Additive extensions, new categories, expanded tooling, or standard clarifications.
- **PATCH**: Non-semantic corrections, documentation revisions, or validation logic improvements.

---

## 2. Project Phases

The roadmap follows the governance maturity lifecycle:

| Phase                  | Status  | Definition                                              |
| ---------------------- | ------- | ------------------------------------------------------- |
| Phase 1 — Foundational | Active  | Initial ontology, governance, tooling, adoption seeding |
| Phase 2 — Transitional | Pending | Working Group activation and multi-party stewardship    |
| Phase 3 — Stewardship  | Future  | Stable long-term standard with community governance     |

Progression between phases SHALL follow the criteria defined in `GOVERNANCE.md`.

---

## 3. Milestone Timeline

### 3.1 Phase 1 — Foundational (Current Phase)

Target Duration: Until adoption criteria are met.

| Milestone | Description                                            | Status     |
| --------- | ------------------------------------------------------ | ---------- |
| M1.1      | Establish initial ontology (Core)                      | ✔ Complete |
| M1.2      | Publish governance policy                              | ✔ Complete |
| M1.3      | Publish Ethical License                                | ✔ Complete |
| M1.4      | Publish RFC-0001 (Core Symbol Set)                     | ✔ Complete |
| M1.5      | Create validation and interpreter tooling              | ✔ Complete |
| M1.6      | Publish initial documentation (README + site scaffold) | ☐ Pending  |
| M1.7      | Publish first formal specification draft (`spec-v1`)   | ☐ Pending  |
| M1.8      | Release compliance test stub                           | ☐ Pending  |
| M1.9      | Collect external implementation feedback               | ☐ Pending  |

Completion of **M1.9** triggers evaluation for Phase 2 qualification.

---

### 3.2 Phase 2 — Transitional

Triggered once:

- At least **two independent external implementations** exist.
- At least **five unique contributors** have participated.
- Ontology stability demonstrated through at least one non-breaking release cycle.

| Milestone | Description                                              | Status    |
| --------- | -------------------------------------------------------- | --------- |
| M2.1      | Form Working Group                                       | ☐ Planned |
| M2.2      | Ratify RFC submission and review procedures              | ☐ Planned |
| M2.3      | Publish spec conformance badge and certification process | ☐ Planned |
| M2.4      | Develop extension ontologies (domain modules)            | ☐ Planned |
| M2.5      | Publish interoperability reference guide                 | ☐ Planned |

Exit condition: Working Group achieves at least one release cycle consensus with no Maintainer override.

---

### 3.3 Phase 3 — Stewardship

Triggered when governance authority transitions to Working Group.

| Milestone | Description                                             | Status   |
| --------- | ------------------------------------------------------- | -------- |
| M3.1      | Establish long-term custodial entity or foundation      | ☐ Future |
| M3.2      | Publish long-term extension governance charter          | ☐ Future |
| M3.3      | Develop internationalization and accessibility variants | ☐ Future |
| M3.4      | Publish formal version 2.0 expansion proposal           | ☐ Future |

Final state: Standard recognized as stable, governed, and interoperable.

---

## 4. Key Deliverables

| Deliverable                | Target Phase | Description                             |
| -------------------------- | ------------ | --------------------------------------- |
| `spec/sce-standard-v1.md`  | Phase 1      | First formal consolidated specification |
| Compliance Test Suite v1   | Phase 1      | Basic conformity testing utilities      |
| Extension Framework        | Phase 2      | Modular expansion support               |
| Certification Program      | Phase 2      | Optional compliance validation          |
| Internationalization Layer | Phase 3      | Cross-language symbol mapping           |

---

## 5. Dependencies and Risks

### 5.1 Technical Dependencies

- Unicode stability
- Platform emoji rendering consistency
- LLM interpretability remains feasible

### 5.2 Governance and Ethical Dependencies

- Misuse enforcement channel must remain operational
- Alignment with ethical licensing constraints is mandatory

### 5.3 Adoption Risks

- Fragmentation risk if forks diverge early
- Overextension risk if ontology grows without constraint
- Vendor capture risk mitigated through governance and licensing

---

## 6. Status Reporting

Roadmap progress SHALL be tracked through:

- Public releases
- RFC status updates
- Governance records
- Implementation reports

Progress MAY be visualized using versioned milestone boards.

---

## 7. Revision Policy

This roadmap SHALL be reviewed:

- Before each minor release
- After each phase transition
- When triggered by Working Group or Maintainer request

Revisions SHALL be recorded with version history metadata.

---

**Current Roadmap Status:** Active (Phase 1 — Foundational)
