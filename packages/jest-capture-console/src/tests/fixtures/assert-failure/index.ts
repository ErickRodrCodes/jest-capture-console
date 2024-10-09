const a = 1;
const b = 2;
export default () => {
  console.assert((a as number) === (b as number), 'test message');
};
