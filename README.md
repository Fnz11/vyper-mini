<a id="readme-top"></a> 

<!-- PROJECT SHIELDS -->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Fnz11">
    <!-- Replace with your actual logo path when available -->
    <!-- <img src="public/logo.svg" alt="Logo" width="80" height="80"> -->
  </a>

  <h3 align="center">Vyper Mini</h3>

  <p align="center" width="80">
   A lightweight showcase of the Vyper Dex Trenches page, demonstrating high-performance real-time updates and virtualized lists in React.
    <br />
    <a href="https://github.com/Fnz11/vyper-mini"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Fnz11/vyper-mini/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Fnz11/vyper-mini/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
      <ul>
        <li><a href="#file-structure">File Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

[![vyper-mini Screen Shot][product-screenshot]](https://github.com/Fnz11/vyper-mini)

Vyper Mini is a performance-focused, scaled-down version of Vyper Dex. It specifically showcases the "Trenches" page to demonstrate how to efficiently handle very fast, real-time batch-processed data updates on a massive virtualized card list in React. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![Zustand][Zustand]][Zustand-url]
* [![Radix UI][Radix]][Radix-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
### Features
- **High-Performance List Virtualization**: Uses `react-window` to render hundreds of fast-updating token cards smoothly at 60 FPS without DOM bloat.
- **Batch-Processed Updates**: A dedicated `useBatchUpdater` interval hook fetches and applies price and liquidity updates in batches (e.g. every 250ms/500ms) to avoid layout thrashing and unnecessary re-renders.
- **Micro-Component Architecture**: Extreme separation of concerns, utilizing small atomic components (e.g. separate `TokenImage`, `ContractAddress`, `PoolStat`) to ensure maximum React rendering efficiency.
- **Diff-Gating via Zustand**: Components subscribe to a specific `changesCount` field and use refs to access data, ensuring they only re-render when their exact pool data mutates rather than on every state change.
- **Optimized Rendering with `React.memo`**: Row components and individual statistics are heavily memoized to prevent re-renders when parent lists update.
- **Real-Time Marquee Animation**: High-frequency updates on the marquee elements without blocking the main UI thread.

### File Structure
```
public/                  # Static assets
src/
├── app/                 # Next.js app directory
│   ├── api/             # API routes (e.g. mock data endpoints)
│   ├── trenches/        # Main trenches showcase page
│   │   ├── _components/ # Route-level privacy for domain components
│   │   ├── _constants/  # Hardcoded values and magic numbers
│   │   ├── _data/       # Mock data generation
│   │   ├── _hooks/      # Custom hooks (e.g., useBatchUpdater, usePerfMetrics)
│   │   ├── _stores/     # Zustand state management
│   │   └── _types/      # TypeScript definitions
│   ├── globals.css      # Design tokens and tailwind base
│   └── layout.tsx       # Root layout
├── components/          # Global reusable UI components
│   ├── customs/         # Custom complex components (Logo, BuyButton)
│   ├── icons/           # SVG icon components
│   ├── layouts/         # Shared layout wrappers (Navbar, Footer, etc.)
│   └── ui/              # Base UI components (Radix primitives, Buttons)
├── lib/                 # Shared utility functions (formatting, class merging)
├── stores/              # Global state management
└── styles/              # Global style configurations
```

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to get your project up and running locally.

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed:
* Bun CLI
  ```sh
  curl -fsSL https://bun.sh/install | bash
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Fnz11/vyper-mini
   cd vyper-mini
   ```
2. Install dependencies with Bun
   ```sh
   bun install
   ```
3. Run the development server
   ```sh
   bun run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser. It will automatically redirect to the `/trenches` page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Fikri Nurdiansyah

[![gmail][gmail]][gmail-url]
[![tele][tele]][tele-url]
[![linkedin][linkedin-shield]][linkedin-url]

Project Link: [https://github.com/Fnz11/vyper-mini](https://github.com/Fnz11/vyper-mini)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[forks-shield]: https://img.shields.io/github/forks/Fnz11/vyper-mini.svg?style=for-the-badge
[forks-url]: https://github.com/Fnz11/vyper-mini/network/members
[stars-shield]: https://img.shields.io/github/stars/Fnz11/vyper-mini.svg?style=for-the-badge
[stars-url]: https://github.com/Fnz11/vyper-mini/stargazers
[issues-shield]: https://img.shields.io/github/issues/Fnz11/vyper-mini.svg?style=for-the-badge
[issues-url]: https://github.com/Fnz11/vyper-mini/issues
[license-shield]: https://img.shields.io/github/license/Fnz11/vyper-mini.svg?style=for-the-badge
[license-url]: https://github.com/Fnz11/vyper-mini/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/fikri-nurdiansyah-214387286/
[tele]: https://img.shields.io/badge/Telegram-2CA5E0?style=flat-squeare&logo=telegram&logoColor=white
[tele-url]: https://t.me/ysfik
[gmail]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: https://mail.google.com/mail/u/finz1112@gmail.com/#compose 
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/ 
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Zustand]: https://img.shields.io/badge/zustand-433E38?style=for-the-badge&logo=react&logoColor=white
[Zustand-url]: https://zustand-demo.pmnd.rs/
[Radix]: https://img.shields.io/badge/radix%20ui-161618?style=for-the-badge&logo=radix-ui&logoColor=white
[Radix-url]: https://www.radix-ui.com/
[product-screenshot]: public/screenshot.png
