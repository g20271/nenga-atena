export interface Sender {
  familyName: string;
  personalName: string;
  postalCode: string;
  prefecture: string;
  municipalities: string;
  address: string;
  building: string;
  consecutiveName1: string;
  consecutiveName2: string;
  consecutiveName3: string;
}

export const senderFields: { key: keyof Sender; label: string }[] = [
  { key: 'familyName', label: '姓' },
  { key: 'personalName', label: '名' },
  { key: 'postalCode', label: '郵便番号' },
  { key: 'prefecture', label: '都道府県' },
  { key: 'municipalities', label: '市区町村' },
  { key: 'address', label: '番地' },
  { key: 'building', label: '建物名等' },
  { key: 'consecutiveName1', label: '連名1' },
  { key: 'consecutiveName2', label: '連名2' },
  { key: 'consecutiveName3', label: '連名3' },
];

export const createEmptySender = (): Sender => ({
  familyName: '',
  personalName: '',
  postalCode: '',
  prefecture: '',
  municipalities: '',
  address: '',
  building: '',
  consecutiveName1: '',
  consecutiveName2: '',
  consecutiveName3: '',
});

export const readSenderCsv = (csv: string): Sender | null => {
  const lines = csv.split('\n');
  if (lines.length < 2) {
    return null;
  }

  const headers = lines[0].split(',');
  const bodies = lines[1].split(',');
  const reversedLabels: { [key in string]: string } = senderFields.reduce(
    (previous, current) => ({ [current.label]: current.key, ...previous }),
    {},
  );

  const sender: { [key in string]: string } = {};
  for (let x = 0; x < Math.min(bodies.length, headers.length); x++) {
    if (headers[x] in reversedLabels) {
      sender[reversedLabels[headers[x]]] = bodies[x];
    }
  }

  for (const { key } of senderFields) {
    if (!(key in sender)) {
      sender[key] = '';
    }
  }

  return sender as unknown as Sender;
};

export const senderToCsv = (sender: Sender): string => {
  const delimiter = ',';
  const header = senderFields.map((item) => item.label).join(delimiter);
  const body = senderFields.map(({ key }) => sender[key] ?? '').join(delimiter);
  return [header, body].join('\n');
};

export const saveSenderCsv = (sender: Sender): void => {
  const blob = new Blob([senderToCsv(sender)], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'sender.csv';
  link.click();
};

export const saveSenderToLocalStorage = (sender: Sender): void => {
  const json = JSON.stringify(sender);
  localStorage.setItem('sender', json);
};

export const isSenderEmpty = (sender: Sender): boolean =>
  sender.familyName.length === 0 &&
  sender.personalName.length === 0 &&
  sender.postalCode.length === 0 &&
  sender.prefecture.length === 0 &&
  sender.municipalities.length === 0 &&
  sender.address.length === 0 &&
  sender.building.length === 0 &&
  sender.consecutiveName1.length === 0 &&
  sender.consecutiveName2.length === 0 &&
  sender.consecutiveName3.length === 0;
