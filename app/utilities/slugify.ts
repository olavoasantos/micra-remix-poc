export function slugify(value: any) {
  const str = String(value) || '';
  return str.replace(/ /g, '-').replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, '');
}
