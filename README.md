# ObjectAGI — Semantic Entity & Taxonomy Framework

A Next.js application for dynamically instantiating, configuring, and organizing undefined entities into a structured, dual-taxonomy hierarchy (**Virtualized Physical Things** vs. **Abstract Things**).

---

## 🌟 Core Concepts

- **Blank-Slate Instantiation:** Entities start as completely undefined nodes with no predefined schemas, attributes, or capabilities.
- **Hierarchical Taxonomy Mapping:** Entities acquire context, properties, and behaviors dynamically based on their position in the numerical taxonomy tree (e.g., `1.1.1` for Physical Solids, `2.2.2.2.1` for Logic If-conditions).
- **Attribute & Trait Assignment:** Assign path-specific properties, spatial coordinates (`X, Y, Z`), mathematical operators, logic conditions, and execution verbs to any entity.
- **Dynamic Component Engine:** Uses dynamic component resolution and lazy-loading (`React.lazy` + `Suspense`) to render custom UI control panels matching selected taxonomy paths.

---

## 🏗️ Architecture & Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Client Components)
- **UI Library:** [Material UI (MUI v6)](https://mui.com/) & Tailwind CSS
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (Typed Hooks & Dynamic Middleware)
- **Icons & Styling:** `@mui/icons-material`, `@emotion/react`, `@emotion/styled`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.x or later
- **Package Manager:** `npm`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/CreateWebApp.git](https://github.com/YOUR_USERNAME/CreateWebApp.git)
   cd CreateWebApp