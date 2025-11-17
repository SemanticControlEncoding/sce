# Contributing — SCE (Semantic Communication Encoding)

This document defines the contribution and change process for the SCE standard, associated ontology files, tooling, and supporting documentation.

Contributions to SCE MUST adhere to the requirements specified herein. By submitting a contribution, the contributor acknowledges and agrees to the licensing terms defined in `LICENSE.md`.

---

## 1. Governance Model

SCE operates under a **Hybrid Transition Governance Model**:

1. **Foundational Phase (Current Phase)**

   - A designated Maintainer has final decision authority over changes.
   - Community feedback MAY be submitted but is not binding.

2. **Transitional Phase (Triggered by Adoption Thresholds)**

   - A Working Group SHALL be established once the following conditions are met:
     - At least two independent external implementations exist.
     - At least five independent contributors participate in active development.
   - The Maintainer MAY delegate authority to the Working Group.

3. **Stewardship Phase (Maturity Stage)**
   - Once governance is formally transitioned, decision-making authority SHALL follow Working Group governance rules.
   - The Maintainer role becomes advisory.

Transition timing SHALL be documented publicly once initiated.

---

## 2. Contribution Requirements

Contributions MAY include:

- Ontology updates or new symbol proposals
- Specification language improvements
- Tooling enhancements (validation, interpreter, schema utilities)
- Documentation corrections
- New test cases or compliance examples
- Translation or accessibility improvements

Each contribution MUST include:

1. A clear purpose statement
2. The affected domains or files
3. A justification demonstrating alignment with SCE goals
4. Test or usage examples where applicable

---

## 3. Proposal Standards

Substantive changes — including ontology additions, semantic rule modifications, or backwards-incompatible behavior — MUST be submitted through a formal proposal using the format:

SCE-RFC-XXXX: <Title>
Revision: <0.y or 1.0 if proposal stabilizing>
Status: Draft / Review / Accepted / Rejected / Withdrawn

The RFC MUST include:

- Motivation
- Specification text
- Examples
- Backward compatibility impact
- Alternatives considered
- Security and ethical impact assessment

RFCs SHALL be stored under `/rfcs`.

---

## 4. Versioning and Compatibility

SCE uses semantic versioning:

MAJOR.MINOR.PATCH

- **MAJOR** increments indicate breaking changes.
- **MINOR** increments indicate additions that are backwards compatible.
- **PATCH** increments indicate non-semantic corrections.

Breaking changes SHOULD be avoided unless necessary for clarity, safety, or correctness.

---

## 5. Review and Acceptance

During the Foundational Phase:

- The Maintainer reviews all submissions.
- The Maintainer MAY request modifications or reject proposals.

During the Transitional or Stewardship phases:

- A Working Group vote SHALL determine acceptance.
- Approval threshold defaults to **simple majority**, unless process amendments define otherwise.

---

## 6. Ethical Compliance

All contributions MUST align with the ethical principles defined in the SCE Ethical Use License.

Proposed contributions that enable or simplify prohibited use cases SHALL be rejected.

---

## 7. Attribution

Substantial contributors MAY be listed in a public CONTRIBUTORS file.

Listing is not automatic and SHALL be determined by governance.

---

## 8. Communication Channels

Temporary communication channels:

- GitHub issue tracker (pending repository publication)

Permanent governance communication structure SHALL be defined during transition to the Working Group phase.

---

## 9. Document Status

This document is a **living governance instrument**. Amendments SHALL follow the RFC process.

Current Status: **Foundational Phase — Active**
