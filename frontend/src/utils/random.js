const colors = [
  '#9d39c5',
  '#f293b1',
  '#70d22d',
  '#2abfb0',
  '#653ff8',
  '#ce9318',
  '#b313b1',
  '#81575e',
  '#b313b1',
  '#129b35',
  '#4474c0',
  '#d32f08',
  '#e819aa',
  '#a44014',
  '#0817a4',
  '#75786b',
];

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
