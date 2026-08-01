import{i as e,n as t,t as n}from"./jsx-runtime-bzQ4Vb5N.js";import{c as r,l as i,o as a,s as o}from"./index-B4vDfdtS.js";var s=e(t()),c=new Map;c.set(`bold`,function(e){return s.createElement(s.Fragment,null,s.createElement(`line`,{x1:`128`,y1:`40`,x2:`128`,y2:`216`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`24`}),s.createElement(`polyline`,{points:`56 144 128 216 200 144`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`24`}))}),c.set(`duotone`,function(e){return s.createElement(s.Fragment,null,s.createElement(`line`,{x1:`128`,y1:`40`,x2:`128`,y2:`216`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`16`}),s.createElement(`polyline`,{points:`56 144 128 216 200 144`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`16`}))}),c.set(`fill`,function(){return s.createElement(s.Fragment,null,s.createElement(`path`,{d:`M205.7,149.7l-72,72a8.2,8.2,0,0,1-11.4,0l-72-72a8.4,8.4,0,0,1-1.7-8.8A8,8,0,0,1,56,136h64V40a8,8,0,0,1,16,0v96h64a8,8,0,0,1,7.4,4.9A8.4,8.4,0,0,1,205.7,149.7Z`}))}),c.set(`light`,function(e){return s.createElement(s.Fragment,null,s.createElement(`line`,{x1:`128`,y1:`40`,x2:`128`,y2:`216`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`12`}),s.createElement(`polyline`,{points:`56 144 128 216 200 144`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`12`}))}),c.set(`thin`,function(e){return s.createElement(s.Fragment,null,s.createElement(`line`,{x1:`128`,y1:`40`,x2:`128`,y2:`216`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`8`}),s.createElement(`polyline`,{points:`56 144 128 216 200 144`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`8`}))}),c.set(`regular`,function(e){return s.createElement(s.Fragment,null,s.createElement(`line`,{x1:`128`,y1:`40`,x2:`128`,y2:`216`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`16`}),s.createElement(`polyline`,{points:`56 144 128 216 200 144`,fill:`none`,stroke:e,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`16`}))});var l=function(e,t){return r(e,t,c)},u=(0,s.forwardRef)(function(e,t){return s.createElement(o,Object.assign({ref:t},e,{renderPath:l}))});u.displayName=`ArrowDown`;var d=a.section`
  min-height: 100vh;
  min-width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 60px;
  background: ${({theme:e})=>e.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 20px 40px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px 30px;
    min-height: 90vh;
  }

  @media (max-width: 300px) {
    margin-top: 150px;
    padding: 0px 16px 40px;
  }
`,f=a.div`
  max-width: 900px;
  width: 100%;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`,p=a.p`
  font-size: clamp(20px, 4vw, 30px);
  font-weight: 500;
  color: ${({theme:e})=>e.accent};
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`,m=a.h1`
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  color: ${({theme:e})=>e.text};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`,h=a.p`
  font-size: clamp(16px, 2vw, 18px);
  color: ${({theme:e})=>e.textSecondary};
  margin-bottom: 16px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`,g=a.p`
  font-size: clamp(14px, 1.5vw, 16px);
  color: ${({theme:e})=>e.textSecondary};
  opacity: 0.8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`,_=a.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  border-radius: 12px;
  background: ${({theme:e})=>e.accent};
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: ${({theme:e})=>e.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108, 99, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.accent};
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 14px;
    width: 100%;
    justify-content: center;
  }
`,v=n(),y=()=>{let{t:e}=i(),t=(0,s.useMemo)(()=>({greeting:e(`hero.greeting`),title:e(`hero.title`),description:e(`hero.description`),details:e(`hero.details`),cta:e(`hero.cta`)}),[e]);return(0,v.jsx)(d,{children:(0,v.jsxs)(f,{children:[(0,v.jsxs)(p,{"aria-label":e(`hero.greeting`),children:[`👋 `,t.greeting]}),(0,v.jsx)(m,{children:t.title}),(0,v.jsx)(h,{children:t.description}),(0,v.jsx)(g,{children:t.details}),(0,v.jsxs)(_,{href:`#modules`,onClick:e=>{e.preventDefault();let t=document.querySelector(`#modules`);t&&t.scrollIntoView({behavior:`smooth`})},"aria-label":e(`hero.cta`),role:`button`,children:[t.cta,(0,v.jsx)(u,{size:20,"aria-hidden":`true`})]})]})})};export{y as Hero};