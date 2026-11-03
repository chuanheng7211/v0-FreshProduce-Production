# FPFC Production — Forecast-Driven Production Planning for Fresh Produce

A production planning system that connects the whole chain for a fresh-produce processing operation — **demand forecast → production plan → yield tracking → labor planning** — in one guided workflow, instead of four disconnected spreadsheets.

## The problem

In fresh-produce processing, planning usually lives in separate files: the forecast in one spreadsheet, production quantities in another, yield and labor tracked somewhere else — if at all. Every forecast change has to be re-keyed by hand into production and labor plans, so the numbers drift apart and planners spend their time copying instead of deciding.

This prototype was built to test a different shape: one system where a forecast change flows through to production quantities, yield expectations, and labor requirements automatically.

## How it works

The app is organized as the planner's actual workflow:

1. **Forecasting** — build the demand forecast, explore it by product, adjust it, and put it through a review step before it becomes the plan (`forecasting`, `forecast-explorer`, `forecast-adjustment`, `forecast-review`)
2. **Production planning** — convert the approved forecast into production plans and quantities (`production-planning`, `production-calculator`)
3. **Yield management** — a yield calculator for planning and a yield tracker for comparing planned vs. actual yield (`yield-calculator`, `yield-tracker`)
4. **Labor planning** — workforce planning and task assignment driven by the production plan, not by a separate headcount guess (`labor-planning`, `workforce`, `task-assignment`)
5. **Reporting** — product summaries and reports across the chain (`product-summary`, `reports`)

The home screen is a **guided workflow** with a dashboard summary, so a planner always knows which step the week is at. Access is role-based: pages are permission-gated (e.g. dashboard read access) behind a login.

## Tech stack

- **Next.js** (App Router) + **TypeScript** + **React**
- **Tailwind CSS** with **shadcn/ui** (Radix UI components)
- Form handling with validation (react-hook-form + resolvers)
- Built with AI-assisted development (**v0.dev**), deployed on **Vercel**

## Status

Working prototype, built in May 2025 as a self-contained demonstration of the forecast-to-labor planning chain. It runs on demo data and is intended to show the workflow design and product thinking, not to represent a live employer's system.

## Run it locally

```bash
npm install
npm run dev
```

## About the builder

Built by **Chuanheng Cheng** — Business Analyst working in fresh-produce supply chain (production coordination, data analysis, and planning workflows), now focused on AI-assisted analytics and planning tools.

- LinkedIn: https://www.linkedin.com/in/chuanhengcheng/
