from pathlib import Path

vd = Path("src/pages/CaseVD.tsx").read_text(encoding="utf-8")
vd = vd.replace("        </motion.div>\n      </section>", "        </div>\n      </section>", 1)
Path("src/pages/CaseVD.tsx").write_text(vd, encoding="utf-8")

for name in ["CaseRoomCost.tsx", "CaseAeronis.tsx"]:
    p = Path(f"src/pages/{name}")
    t = p.read_text(encoding="utf-8")
    if "Back to cases\n          </p>" in t:
        t = t.replace(
            """        <div className="mt-12">
          <p className="mb-6 text-[clamp(26px,2.4vw,34px)] leading-[1.45] text-white/88">
            Back to cases
          </p>

          <MetalButton""",
            """        <div className="mt-12 flex flex-wrap gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
          <MetalButton""",
            1,
        )
    p.write_text(t, encoding="utf-8")

print("ok")
