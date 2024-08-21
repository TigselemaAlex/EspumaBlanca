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
      ? 'bg-purple-500 text-white rounded-full border border-solid border-purple-600 text-center py-1 px-3 text-xs shadow-sm max-w-40'
      : 'bg-zinc-500 text-white rounded-full border border-solid border--600 text-center py-1 px-3 text-xs shadow-sm max-w-40';
  }

  if (def === 'category') {
    return 'text-yellow-700 rounded-lg font-bold';
  }
  return '';
};
