"""Extract demo-candidate projects and beverage-industry peer comps from the VCM merged dataset.

READ-ONLY on the VCM Dashboard outputs. Writes only:
  extract/candidate_projects.json
  extract/peer_comps.json
"""
import csv
import json
import os
from collections import defaultdict

SRC = r"C:\Users\MattHendren\OneDrive - CarbonBetter\Claude\VCM Dashboard\outputs\merged_events_resolved.csv"
OUT_DIR = os.path.dirname(os.path.abspath(__file__))

# Themes matched to New Belgium: regenerative ag / soil, forestry / watershed, community energy & water.
THEME_KEYWORDS = {
    "regenerative_ag": ["agricult", "soil", "grassland", "cropland", "grazing"],
    "forestry": ["forest", "afforest", "reforest", "arr", "ifm", "redd", "grassland conservation"],
    "community": ["cookstove", "energy efficiency - domestic", "safe water", "water purif", "community"],
}
PREFERRED_COUNTRIES = {"United States", "USA", "United States of America", "Canada", "Mexico",
                       "Colombia", "Peru", "Brazil", "Guatemala", "Honduras", "Ecuador", "Chile", "Uruguay"}

# Beverage / brewery / consumer peer list (matched case-insensitively as substrings of the
# canonical or clean buyer name), plus any name containing "BREW".
PEERS = [
    "new belgium", "sierra nevada", "lagunitas", "athletic brewing", "allagash", "deschutes",
    "founders brewing", "boston beer", "molson coors", "heineken", "anheuser", "ab inbev",
    "constellation brands", "diageo", "pernod", "bacardi", "brown-forman", "campari",
    "pepsico", "pepsi", "coca-cola", "coca cola", "keurig", "dr pepper", "danone",
    "nestle", "nestlé", "red bull", "monster beverage", "celsius", "liquid death",
    "jackson family", "e & j gallo", "gallo winery", "treasury wine",
]


def norm(s):
    return (s or "").strip().lower()


def main():
    projects = defaultdict(lambda: {"tonnes": 0.0, "n": 0, "serials": [], "dates": [],
                                     "reasons": [], "buyers": set()})
    peer_rows = defaultdict(lambda: {"tonnes": 0.0, "n": 0, "years": set(), "types": defaultdict(float),
                                      "examples": set(), "registries": set()})
    n_in = 0
    with open(SRC, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            n_in += 1
            qty = 0.0
            try:
                qty = float(row["quantity_tonnes"] or 0)
            except ValueError:
                pass

            # --- candidate projects ---
            ptype = norm(row["project_type"])
            pname = norm(row["project_name"])
            theme = None
            for t, kws in THEME_KEYWORDS.items():
                if any(k in ptype or k in pname for k in kws):
                    theme = t
                    break
            if theme:
                key = (row["registry"], row["project_id"], row["project_name"].strip(),
                       row["project_type"].strip(), row["methodology"].strip(), row["country"].strip(), theme)
                p = projects[key]
                p["tonnes"] += qty
                p["n"] += 1
                if len(p["serials"]) < 3 and row["serial_number"]:
                    p["serials"].append(row["serial_number"])
                if row["retirement_date"]:
                    p["dates"].append(row["retirement_date"])
                if len(p["reasons"]) < 3 and row["retirement_details"]:
                    p["reasons"].append(row["retirement_details"][:200])
                if row["buyer_canonical"]:
                    p["buyers"].add(row["buyer_canonical"])

            # --- peer comps ---
            buyer = norm(row["buyer_canonical"]) or norm(row["beneficiary_clean"])
            if buyer and (("brew" in buyer) or any(p in buyer for p in PEERS)):
                pr = peer_rows[row["buyer_canonical"] or row["beneficiary_clean"].strip()]
                pr["tonnes"] += qty
                pr["n"] += 1
                if row["retirement_date"]:
                    pr["years"].add(row["retirement_date"][:4])
                pr["types"][row["project_type"].strip() or "Unknown"] += qty
                if len(pr["examples"]) < 4 and row["project_name"]:
                    pr["examples"].add(row["project_name"].strip()[:90])
                pr["registries"].add(row["registry"])

    # rank projects: recent activity + volume + preferred geography
    ranked = []
    for key, p in projects.items():
        registry, pid, pname, ptype, meth, country, theme = key
        last = max(p["dates"]) if p["dates"] else ""
        score = p["tonnes"] * (2.0 if country in PREFERRED_COUNTRIES else 1.0) * (1.5 if last >= "2025" else 1.0)
        ranked.append({
            "registry": registry, "project_id": pid, "project_name": pname, "project_type": ptype,
            "methodology": meth, "country": country, "theme": theme,
            "total_retired_tonnes": round(p["tonnes"]), "n_retirements": p["n"],
            "last_retirement": last, "sample_serials": p["serials"],
            "sample_reasons": p["reasons"], "n_distinct_buyers": len(p["buyers"]), "_score": score,
        })
    ranked.sort(key=lambda r: r["_score"], reverse=True)
    top = {"regenerative_ag": [], "forestry": [], "community": []}
    for r in ranked:
        bucket = top[r["theme"]]
        if len(bucket) < 12:
            r.pop("_score")
            bucket.append(r)

    peers_out = []
    for buyer, pr in peer_rows.items():
        types_sorted = sorted(pr["types"].items(), key=lambda kv: kv[1], reverse=True)
        peers_out.append({
            "buyer": buyer, "total_tonnes": round(pr["tonnes"]), "n_retirements": pr["n"],
            "years": sorted(pr["years"]), "registries": sorted(pr["registries"]),
            "top_types": [{"type": t, "tonnes": round(v)} for t, v in types_sorted[:4]],
            "example_projects": sorted(pr["examples"]),
        })
    peers_out.sort(key=lambda p: p["total_tonnes"], reverse=True)

    with open(os.path.join(OUT_DIR, "candidate_projects.json"), "w", encoding="utf-8") as f:
        json.dump(top, f, indent=2, ensure_ascii=False)
    with open(os.path.join(OUT_DIR, "peer_comps.json"), "w", encoding="utf-8") as f:
        json.dump(peers_out, f, indent=2, ensure_ascii=False)

    print(f"rows in: {n_in}")
    print(f"themed projects: {len(ranked)} (regen_ag {len(top['regenerative_ag'])}, forestry {len(top['forestry'])}, community {len(top['community'])} kept)")
    print(f"peer buyers matched: {len(peers_out)}")
    for p in peers_out[:15]:
        print(f"  {p['buyer']}: {p['total_tonnes']} t across {p['n_retirements']} retirements, years {p['years'][:1]}..{p['years'][-1:]}")


if __name__ == "__main__":
    main()
