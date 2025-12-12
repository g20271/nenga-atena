export type Part = 'postalCode' | 'address' | 'name' | 'senderPostalCode' | 'senderAddress' | 'senderName';

export type Positions = { [key in Part]: [number, number] };
export type FontSizes = { [key in Part]: number };
export type LineHeights = { [key in Part]: number };

export const saveStylesToLocalStorage = (
  positions: Positions,
  fontSizes: FontSizes,
  lineHeights: LineHeights,
  addressMaxChars: number,
  postalCodeAdvance: number,
  senderAddressMaxChars: number,
  senderPostalCodeAdvance: number,
) => {
  const json = JSON.stringify({
    positions,
    fontSizes,
    lineHeights,
    addressMaxChars,
    postalCodeAdvance,
    senderAddressMaxChars,
    senderPostalCodeAdvance,
  });
  localStorage.setItem('styles', json);
};
