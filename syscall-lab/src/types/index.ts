export interface Theme {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryHover: string;
  accent: string;
  accentHover: string;
  cardBg: string;
  cardBorder: string;
  shadow: string;
  blockquote_bg: string;
  th_bg: string;
  table_bg: string;
  border_table: string;
  highlight: string;
  table_warm: string;
  table_cool: string;
}

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: string;
}