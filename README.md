# Risk Visualization - Hurricanes in the Caribbean

An interactive, scroll-through map story about Hurricane Maria's impact on the
island nation of Dominica, built for the World Bank / GFDRR
[Understanding Risk VizRisk challenge](https://understandrisk.org/vizrisk/).

- **Live site:** https://vizrisk.timarioto.com/
- **Write-up:** [Visualizing Hurricane Maria's impacts in Dominica for the VizRisk challenge](https://medium.com/@kjbarns/visualizing-hurricane-marias-impacts-in-dominica-for-the-vizrisk-challenge-623f0b19dc33) (Medium)

## What it shows

On September 18, 2017, Hurricane Maria made landfall on Dominica as a
Category 5 storm, damaging or destroying roughly 90% of the country's buildings
and causing losses equal to 226% of its GDP. The app walks through that story in
a series of scenes, each pairing a map view with narrative text, a Highcharts
chart, and source citations:

1. Hurricanes in the Caribbean and the trend toward stronger, more southerly storms
2. Maria's track and peak wind gusts as it crossed Dominica
3. Economic damage and losses relative to GDP
4. Damage to the national housing stock
5. A closer look at building damage in Roseau, the capital
6. Correlating observed building damage with the modeled wind hazard
7. Future hurricane exposure
8. Dominica's plan to "build back better" as a climate-resilient nation
9. Summary

Users can step forward and back through the scenes or toggle individual map
layers (storm track, peak gusts, population, displaced population, Red Cross
damage assessment, building footprints, damaged buildings, and wind hazard).

## Data sources

- **Building damage** — Copernicus EMS and UNOSAT satellite damage assessments
  for Dominica (`input-db/initialize-db/dominica-damage/data/`), merged and
  geocoded into `building_data.csv`
- **Storm track and wind gusts** — Hurricane Maria GeoJSON products (track,
  current position/intensity, gust history, peak gusts) in
  `map-app/src/assets/`
- Additional layers (population, displacement, Red Cross needs assessment,
  wind hazard, roads, hurricane shelters) are hosted as Mapbox tilesets in the
  map's Mapbox Studio style; the source shelter data is in
  `map-app/src/app/data/hurricaneshelters.json`

Full citations for each scene are shown in the app and defined in
`map-app/src/app/map/scenes.ts`.

## Tech stack

- [Angular 22](https://angular.dev/) + Angular Material
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) for the map
- [Highcharts](https://www.highcharts.com/) for the per-scene charts
- Static hosting on AWS S3 + CloudFront, provisioned with OpenTofu

## Repository layout

| Path | Contents |
| ---- | -------- |
| `map-app/` | The Angular front end. Scenes, charts, and citations live in `src/app/map/scenes.ts`; map and layer logic in `src/app/map/map.component.ts` |
| `input-db/` | Python scripts used to load and update the building damage data in a local MongoDB (`viz_risk` database) |
| `building_data.csv` | Processed building-level damage dataset |
| `infra/` | OpenTofu config for S3, CloudFront, ACM, and Route53. See [`infra/README.md`](infra/README.md) |
| `.github/workflows/` | CI/CD: build and deploy, infra plan/apply, and secret scanning |

## Running locally

Requires Node.js 24 (see `map-app/.nvmrc`; `nvm use` picks it up).

```bash
cd map-app
npm install
npm start    # dev server at http://localhost:4200
npm test     # unit tests (Vitest)
npm run build  # production build to map-app/dist/vizrisk/
```

The Mapbox public access token is set in `map-app/src/environments/`. It is
URL-restricted to the production domain, so the map won't load on
`localhost` unless `localhost` is added to the token's allowed URLs in the
Mapbox account.

### Optional: data pipeline

The scripts in `input-db/` need Python 3 with `pandas` and `pymongo`, and a
MongoDB instance on `localhost`:

```bash
cd input-db/initialize-db/dominica-damage
python insert_buildings.py
```

## Deployment

- **App:** every push to `master` builds the app and syncs it to S3, then
  invalidates the CloudFront cache (`.github/workflows/main.yml`). Pull
  requests run the build only. AWS access uses GitHub OIDC, so no long-lived
  keys are stored.
- **Infrastructure:** changes under `infra/` get a `tofu plan` posted as a PR
  comment and are applied on merge to `master` (`.github/workflows/infra.yml`).
- **Secret scanning:** TruffleHog runs in CI, and a
  [gitleaks](https://github.com/gitleaks/gitleaks) pre-commit hook is
  available locally (`pre-commit install`).
