import{n as e,o as t}from"./index-B4vDfdtS.js";var n=t.div`
  padding: 120px 24px 80px;
  max-width: 900px;
  margin: 0 auto;
  background: ${({theme:e})=>e.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 100px 16px 60px;
  }

  @media (max-width: 480px) {
    padding: 80px 12px 40px;
  }
`,r=t(e)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({theme:e})=>e.textSecondary};
  font-size: 14px;
  margin-bottom: 32px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({theme:e})=>e.accent};
  }
`,i=t.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${({theme:e})=>e.text};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`,a=t.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`,o=t.span`
  font-size: 13px;
  color: ${({theme:e})=>e.textSecondary};
  background: ${({theme:e})=>e.cardBorder};
  padding: 4px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
`,s=t.div`
  font-size: 16px;
  line-height: 1.8;
  color: ${({theme:e})=>e.textSecondary};
  text-align: justify;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: ${({theme:e})=>e.text};
    margin: 32px 0 16px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${({theme:e})=>e.text};
    margin: 24px 0 12px;
  }

  p {
    margin-bottom: 16px;
  }

  ul,
  ol {
    margin: 12px 0 16px 24px;
  }

  li {
    margin-bottom: 8px;
  }

  code {
    background: ${({theme:e})=>e.cardBorder};
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: ${({theme:e})=>e.accent};
  }

  pre {
    background: ${({theme:e})=>e.cardBorder};
    padding: 16px 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0;

    code {
      background: transparent;
      padding: 0;
      color: ${({theme:e})=>e.textSecondary};
      font-size: 14px;
    }
  }

  img[src$='.svg'] {
    display: block;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    height: auto;
    filter: ${({theme:e})=>e.background===`#0b1120`?`invert(1) brightness(0.9)`:`invert(0)`};
    transition: filter 0.3s ease;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    background: ${({theme:e})=>e.table_bg};
    border: 1px solid ${({theme:e})=>e.border_table};
    border-radius: 8px;
    overflow: hidden;
  }

  th,
  td {
    border: 1px solid ${({theme:e})=>e.border_table};
    padding: 10px 14px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background-color: ${({theme:e})=>e.th_bg};
    font-weight: 600;
  }

  blockquote {
    background: ${({theme:e})=>e.blockquote_bg};
    border-left: 6px solid #2c6b9c;
    margin: 20px 0;
    padding: 12px 20px;
    border-radius: 0 8px 8px 0;
  }

  .highlight {
    background-color: ${({theme:e})=>e.highlight};
  }

  .table-warm {
    background-color: ${({theme:e})=>e.table_warm};
  }

  .table-cool {
    background-color: ${({theme:e})=>e.table_cool};
  }

  .image-zoom {
    display: block;
    margin: 20px auto;
    max-width: 100%;
    transition: transform 0.3s ease;
    cursor: zoom-in;

    img {
      display: block;
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      filter: ${({theme:e})=>e.background===`#0b1120`||e.background===`#141d2b`?`invert(1) brightness(0.9)`:`invert(0)`};
    }

    &:hover {
      transform: scale(1.05);

      img {
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
      }
    }
  }

  .video-wrapper {
    position: relative;
    width: 100%;
    margin: 20px 0;
    border-radius: 12px;
    overflow: hidden;
  }

  .file-download-wrapper {
    display: block !important;
    width: 100% !important;
    margin: 16px 0 !important;
  }
`;export{i as a,a as i,o as n,n as o,s as r,r as t};