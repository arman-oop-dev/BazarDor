export const unitToBangla = (unit: string) => {
  const unitMap: Record<string, string> = {
    kg: "কেজি",
    gm: "গ্রাম",
    g: "গ্রাম",
    litre: "লিটার",
    liter: "লিটার",
    ml: "মিলিলিটার",
    pcs: "টি",
    piece: "টি",
    dozen: "ডজন",
  };

  return unitMap[unit.toLowerCase()] || unit;
};
