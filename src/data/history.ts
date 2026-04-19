export type HistoryItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  type: "alert" | "info" | "warning";
};

export const history: HistoryItem[] = [
  {
    id: "1",
    icon: "engine",
    title: "Motor Çalıştırıldı",
    description: "Motor 600 rpm'de çalışmaya başladı",
    timestamp: "Bugün, 14:32",
    type: "info",
  },
  {
    id: "2",
    icon: "smoke-detector",
    title: "Duman Algılayıcı Uyarısı",
    description: "Kabin bölgesinde duman tespit edildi",
    timestamp: "Bugün, 12:15",
    type: "alert",
  },
  {
    id: "3",
    icon: "door-open",
    title: "Ana Kapı Açıldı",
    description: "Ana kapı sensörü tetiklendi",
    timestamp: "Bugün, 10:45",
    type: "info",
  },
  {
    id: "4",
    icon: "battery-charging",
    title: "Servis Aküsü Düşük",
    description: "Akü seviyesi 11.8V'a düştü",
    timestamp: "Dün, 22:10",
    type: "warning",
  },
  {
    id: "5",
    icon: "motion-sensor",
    title: "Hareket Algılandı",
    description: "Kabin bölgesinde hareket tespit edildi",
    timestamp: "Dün, 18:30",
    type: "alert",
  },
  {
    id: "6",
    icon: "thermometer",
    title: "Kabin Sıcaklığı Yüksek",
    description: "Sıcaklık 35°C'ye ulaştı",
    timestamp: "Dün, 15:20",
    type: "warning",
  },
  {
    id: "7",
    icon: "water",
    title: "Su Tankı Düşük",
    description: "Su seviyesi %20'nin altına düştü",
    timestamp: "17 Nis, 09:00",
    type: "warning",
  },
  {
    id: "8",
    icon: "gas-station",
    title: "Yakıt Dolduruldu",
    description: "Yakıt tankı %100 seviyesine ulaştı",
    timestamp: "16 Nis, 14:00",
    type: "info",
  },
  {
    id: "9",
    icon: "anchor",
    title: "Çapa Atıldı",
    description: "Konum: 40.87°N, 29.24°E",
    timestamp: "16 Nis, 11:30",
    type: "info",
  },
  {
    id: "10",
    icon: "shield-check",
    title: "Koruma Modu Aktif",
    description: "Tüm sensörler izleme moduna alındı",
    timestamp: "15 Nis, 20:00",
    type: "info",
  },
];
