"""Turn the parsed catalogue into the Explore tab's dataset (js/catalogue.js).

Confidentiality rule: the public build ships PRICE BANDS ONLY. Real per-tonne
quotes are written to js/prices.local.js, which is gitignored and therefore
absent from the deployed site. app.js shows real prices when that file is
present (local/internal use) and bands when it is not (public demo).
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
DEMO = os.path.dirname(HERE)
SRC = os.path.join(HERE, "catalogue_projects.json")

VALUE_CHAIN_STATES = {
    "Montana": "MT", "North Carolina": "NC", "Michigan": "MI", "Virginia": "VA",
    "Colorado": "CO", "Idaho": "ID", "Washington": "WA",
}
STATES = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
    "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
    "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
    "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA",
    "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT",
    "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
    "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI",
    "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX",
    "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA",
    "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY",
}

# Slide tech strings -> the category shown in Explore filters.
CATEGORY = {
    "HFC Replacement": "Industrial gases",
    "Advanced Refrigeration Systems": "Refrigeration",
    "Landfill Gas Capture/Combustion": "Methane capture",
    "Landfill Gas Capture": "Methane capture",
    "Organic Waste Composting": "Waste & circularity",
    "Grassland Restoration": "Soil & grassland",
    "Sustainable Grazing Management": "Soil & grassland",
    "Avoided Conversion": "Soil & grassland",
    "IFM Removals": "Forestry",
    "IFM": "Forestry",
    "Improved forest management (IFM)": "Forestry",
    "Agriculture Forestry": "Forestry",
    "N2O Abatement": "Industrial gases",
    "Energy demand": "Energy demand",
    "Recycling road, transport, construction": "Materials & infrastructure",
    "Plugging Orphan Oil and Gas Wells": "Methane capture",
}

BANDS = [(0, 5), (5, 10), (10, 15), (15, 20), (20, 25), (25, 30), (30, 40)]


def prices_in(text):
    """Only dollar-prefixed figures are prices. Volume tiers in these strings look
    like numbers too ("0-10kt: $3.0"), so an unanchored number match reads 0 and 10
    as prices and produces nonsense bands. Fall back to bare numbers only when the
    slide quotes vintages without dollar signs ("V19: 11 V20: 12"), never for tiers."""
    dollar = [float(x) for x in re.findall(r"\$\s*(\d+(?:\.\d+)?)", text or "")]
    bare = [float(x) for x in re.findall(r"V\d+:\s*(\d+(?:\.\d+)?)", text or "")]
    vals = [v for v in dollar + bare if 0 < v < 200]
    return vals


def band_for(lo, hi):
    if lo is None:
        return "Not quoted"
    lo_b = next((b for b in BANDS if b[0] <= lo < b[1]), BANDS[-1])
    hi_b = next((b for b in BANDS if b[0] <= (hi or lo) < b[1]), lo_b)
    return f"${lo_b[0]}–{hi_b[1]}/t" if lo_b != hi_b else f"${lo_b[0]}–{lo_b[1]}/t"


def credit_type_of(raw, removal_flag):
    t = (raw or "").lower()
    has_rem = "removal" in t or "removal" in (removal_flag or "").lower()
    has_avo = "avoidance" in t
    if has_rem and has_avo:
        return "Mixed"
    if has_rem:
        return "Removal"
    return "Avoidance"


def states_in(text):
    found = []
    for name, abbr in STATES.items():
        if re.search(rf"\b{re.escape(name)}\b", text or ""):
            found.append(abbr)
    return sorted(set(found))


def quality_flags(ratings):
    r = (ratings or "").lower()
    flags = []
    if "ccp" in r:
        flags.append("ICVCM CCP")
    if "bezero" in r:
        m = re.search(r"\b(AAA|AA|A|BBB|BB|B)\b\s*\(bezero", r, re.I) or re.search(r"\b(AAA|AA|A|BBB|BB|B)\b", (ratings or ""))
        flags.append(f"BeZero {m.group(1)}" if m else "BeZero rated")
    if "sylver" in r:
        m = re.search(r"\b(AAA|AA|A|BBB|BB|B)\b", ratings or "")
        flags.append(f"Sylvera {m.group(1)}" if m else "Sylvera rated")
    if "ccb" in r:
        flags.append("CCB Gold")
    if "sd vista" in r:
        flags.append("SD VISta")
    return flags


def main():
    rows = json.load(open(SRC, encoding="utf-8"))
    out, prices = [], {}

    for r in rows:
        p = prices_in(r["price"])
        lo, hi = (min(p), max(p)) if p else (None, None)
        loc = f"{r['location']} {r['country']}".strip()
        st = states_in(loc)
        vc = [s for s in st if s in VALUE_CHAIN_STATES.values()]
        country = "Canada" if "canada" in loc.lower() else ("Mexico" if "mexico" in loc.lower() or " MX" in loc else "United States")
        key = f"s{r['slide']}"

        prices[key] = r["price"]
        out.append({
            "key": key,
            "name": r["name"],
            "registry": r["registry_id"],
            "vintage": r["vintage"],
            "creditType": credit_type_of(r["credit_type"], r["removal_flag"]),
            "category": CATEGORY.get(r["tech"], r["tech"] or "Other"),
            "tech": r["tech"],
            "location": r["location"] or r["country"],
            "country": country,
            "states": st,
            "valueChainStates": vc,
            "methodology": r["methodology"],
            "verifier": r["verifier"],
            "quality": quality_flags(r["ratings"]),
            "volume": r["volume"],
            "priceBand": band_for(lo, hi),
            "priceLow": lo,
            "description": r["description"],
        })

    out.sort(key=lambda x: (x["category"], x["name"]))

    with open(os.path.join(DEMO, "js", "catalogue.js"), "w", encoding="utf-8", newline="\n") as f:
        f.write("// Explore dataset: CarbonBetter's real June 2026 catalogue for New Belgium (26 projects).\n")
        f.write("// Generated by extract/build_catalogue_js.py. PRICE BANDS ONLY - real quotes are\n")
        f.write("// in js/prices.local.js, which is gitignored and absent from the public deploy.\n")
        f.write("window.CATALOGUE = " + json.dumps(out, indent=2, ensure_ascii=False) + ";\n")

    with open(os.path.join(DEMO, "js", "prices.local.js"), "w", encoding="utf-8", newline="\n") as f:
        f.write("// CONFIDENTIAL - real quoted prices. Gitignored; never deployed.\n")
        f.write("// Present locally => the app shows real prices. Absent => bands only.\n")
        f.write("window.PRICES = " + json.dumps(prices, indent=2, ensure_ascii=False) + ";\n")

    cats = sorted({o["category"] for o in out})
    print(f"projects: {len(out)}")
    print(f"categories: {cats}")
    print(f"with quality flags: {sum(1 for o in out if o['quality'])}")
    print(f"removal or mixed: {sum(1 for o in out if o['creditType'] != 'Avoidance')}")
    print(f"value-chain-state projects: {sum(1 for o in out if o['valueChainStates'])}")
    print(f"bands: {sorted({o['priceBand'] for o in out})}")


if __name__ == "__main__":
    main()
