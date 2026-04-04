export type Device = {
  id: number;
  name: string;
  value: string;
  icon: string;
  serialNo: string;
  modelNo: string;
};

export const devices: Device[] = [
  { id: 1,  name: 'Sintineler',             value: 'normal',               icon: 'waves',           serialNo: '', modelNo: '' },
  { id: 2,  name: 'Duman/CO Algilayicilar', value: 'Aktif',                icon: 'smoke-detector',  serialNo: '', modelNo: '' },
  { id: 3,  name: 'Servis Akusu',           value: '13,2V',                icon: 'battery-charging',serialNo: '', modelNo: '' },
  { id: 4,  name: 'Kabin',                  value: 'Nem %38 Sicaklik 27C', icon: 'thermometer',     serialNo: '', modelNo: '' },
  { id: 5,  name: 'Buz Yapici',             value: 'Acik',                 icon: 'snowflake',       serialNo: '', modelNo: '' },
  { id: 6,  name: 'Akilli Priz',            value: '220V',                 icon: 'power-socket-eu', serialNo: '', modelNo: '' },
  { id: 7,  name: 'Ana Kapi',               value: 'Kapali',               icon: 'door-closed',     serialNo: '', modelNo: '' },
  { id: 8,  name: 'Fly Bridge',             value: 'Kapali',               icon: 'steering',        serialNo: '', modelNo: '' },
  { id: 9,  name: 'Kabin Hareket',          value: 'Aktif Degil',          icon: 'motion-sensor',   serialNo: '', modelNo: '' },
  { id: 10, name: 'Anahtarlar',             value: '',                     icon: 'toggle-switch',   serialNo: '', modelNo: '' },
  { id: 11, name: 'Motor',                  value: '600 rpm',              icon: 'engine',          serialNo: '', modelNo: '' },
  { id: 12, name: 'Start Akusu',            value: '+8,5 A 13,5 V',        icon: 'car-battery',     serialNo: '', modelNo: '' },
  { id: 13, name: 'Yakit',                  value: '300 L %75',            icon: 'gas-station',     serialNo: '', modelNo: '' },
  { id: 14, name: 'Su',                     value: '100 L %50',            icon: 'water',           serialNo: '', modelNo: '' },
  { id: 15, name: 'Derin Dondurucu',        value: '-17 C',                icon: 'fridge',          serialNo: '', modelNo: '' },
];
