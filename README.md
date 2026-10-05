# Savitri Rice Catalog

React + Vite product catalog for the Savitri Group rice range (SPS Agronico India LLP).

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # static site in dist/ (HashRouter, works on any static host)

## Update the catalog
Edit `data/products-catalog.xlsx`, then run `npm run data` to regenerate `src/data/products.json`.

## Variant specifications
Grain specs (broken %, moisture, milling degree...) are in `src/data/specs.js`, keyed `product-slug/Variant`.
Only Savitri Ashirvaad Bronze is filled in; other variants link to their live page on savitrigroup.in.

## Notes
- Images load from savitrigroup.in; a placeholder shows if one fails to load.
- The site publishes no pack sizes, prices or nutrition, so none are shown.
