export interface Theme {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  cardBg: string;
  cardBorder: string;
  shadow: string;
}

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: string;
}