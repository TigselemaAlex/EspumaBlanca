export const getValueFromDef = (def: string, value: any): string => {
  if (def === 'enabled') {
    return !value ? 'Inhabilitado' : 'Habilitado';
  }
  if (def === 'category') {
    return value.name;
  }
  if (def === 'price' || def === 'value') {
    return '$ ' + value;
  }

  return value;
};

export const getClassFromDef = (def: string, value: any): string => {
  if (def === 'enabled') {
    return value
      ? 'circle text-green-200 uppercase text-nowrap'
      : 'circle text-red-200 uppercase text-nowrap';
  }

  if (def === 'category') {
    return 'text-cyan-200 border-round-lg font-bold';
  }
  return '';
};
